<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AkunTest extends TestCase
{
    use RefreshDatabase;

    public function test_daftar_membuat_akun_dan_langsung_masuk(): void
    {
        $this->postJson('/api/daftar', ['nama' => 'Dimas', 'email' => ' Dimas@Contoh.ID ', 'sandi' => 'rahasia123'])
            ->assertCreated()
            ->assertJsonPath('akun.nama', 'Dimas')
            ->assertJsonPath('akun.email', 'dimas@contoh.id')
            ->assertJsonMissingPath('akun.password');

        $this->assertAuthenticated();
        $user = User::firstWhere('email', 'dimas@contoh.id');
        $this->assertNotEquals('rahasia123', $user->password, 'kata sandi harus disimpan sebagai hash');
    }

    public function test_daftar_menolak_email_yang_sudah_ada_dengan_pesan_indonesia(): void
    {
        User::factory()->create(['email' => 'dimas@contoh.id']);

        $this->postJson('/api/daftar', ['nama' => 'Dimas', 'email' => 'dimas@contoh.id', 'sandi' => 'rahasia123'])
            ->assertStatus(422)
            ->assertJsonPath('errors.email.0', 'Email ini sudah terdaftar. Masuk saja, atau pakai email lain.');
    }

    public function test_daftar_memeriksa_nama_dan_panjang_sandi(): void
    {
        $this->postJson('/api/daftar', ['nama' => str_repeat('a', 21), 'email' => 'a@b.id', 'sandi' => 'pendek'])
            ->assertStatus(422)
            ->assertJsonPath('errors.nama.0', 'Nama panggilan maksimal 20 karakter.')
            ->assertJsonPath('errors.sandi.0', 'Kata sandi minimal 8 karakter.');
    }

    public function test_masuk_dengan_sandi_benar_mengembalikan_progres(): void
    {
        $user = User::factory()->create(['email' => 'dimas@contoh.id', 'password' => 'rahasia123']);
        $user->progres()->create(['modul' => 1, 'langkah' => 3, 'terakhir' => 9, 'terbaik' => 9, 'total' => 10]);

        $this->postJson('/api/masuk', ['email' => 'DIMAS@contoh.id', 'sandi' => 'rahasia123'])
            ->assertOk()
            ->assertJsonPath('akun.progres.1.langkah', 3)
            ->assertJsonPath('akun.progres.1.terbaik', 9);

        $this->assertAuthenticatedAs($user);
    }

    public function test_masuk_dengan_sandi_salah_ditolak(): void
    {
        User::factory()->create(['email' => 'dimas@contoh.id', 'password' => 'rahasia123']);

        $this->postJson('/api/masuk', ['email' => 'dimas@contoh.id', 'sandi' => 'Rahasia123'])
            ->assertStatus(422)
            ->assertJsonPath('errors.sandi.0', 'Email atau kata sandi belum cocok. Huruf besar dan kecil dibedakan.');

        $this->assertGuest();
    }

    public function test_masuk_dibatasi_setelah_terlalu_sering_salah(): void
    {
        User::factory()->create(['email' => 'dimas@contoh.id', 'password' => 'rahasia123']);

        for ($i = 0; $i < 6; $i++) {
            $this->postJson('/api/masuk', ['email' => 'dimas@contoh.id', 'sandi' => 'salah-'.$i])->assertStatus(422);
        }
        $this->postJson('/api/masuk', ['email' => 'dimas@contoh.id', 'sandi' => 'rahasia123'])->assertStatus(429);

        // Siswa lain di jaringan yang sama dan rute lain tidak ikut terkunci.
        User::factory()->create(['email' => 'sari@contoh.id', 'password' => 'rahasia123']);
        $this->postJson('/api/masuk', ['email' => 'sari@contoh.id', 'sandi' => 'rahasia123'])->assertOk();
        $this->postJson('/api/keluar');
        $this->postJson('/api/lupa-sandi', ['email' => 'dimas@contoh.id'])->assertOk();
    }

    public function test_keluar_mengakhiri_sesi(): void
    {
        $this->actingAs(User::factory()->create());

        $this->postJson('/api/keluar')->assertOk();
        $this->assertGuest();
    }

    public function test_ganti_sandi_memeriksa_sandi_lama(): void
    {
        $user = User::factory()->create(['password' => 'rahasia123']);
        $this->actingAs($user);

        $this->putJson('/api/sandi', ['lama' => 'salahsalah', 'baru' => 'sandibaru123'])
            ->assertStatus(422)
            ->assertJsonPath('errors.lama.0', 'Kata sandi lama belum cocok.');

        $this->putJson('/api/sandi', ['lama' => 'rahasia123', 'baru' => 'rahasia123'])
            ->assertStatus(422)
            ->assertJsonPath('errors.baru.0', 'Kata sandi baru harus berbeda dari yang lama.');

        $this->putJson('/api/sandi', ['lama' => 'rahasia123', 'baru' => 'sandibaru123'])->assertOk();

        $this->postJson('/api/keluar');
        $this->postJson('/api/masuk', ['email' => $user->email, 'sandi' => 'sandibaru123'])->assertOk();
    }
}
