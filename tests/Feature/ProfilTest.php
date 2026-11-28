<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfilTest extends TestCase
{
    use RefreshDatabase;

    public function test_ubah_nama_tanpa_kata_sandi(): void
    {
        $user = User::factory()->create(['name' => 'Dimas', 'email' => 'dimas@contoh.id']);

        $this->actingAs($user)->putJson('/api/profil', ['nama' => ' Dimas P ', 'email' => 'dimas@contoh.id'])
            ->assertOk()
            ->assertJsonPath('akun.nama', 'Dimas P')
            ->assertJsonPath('akun.email', 'dimas@contoh.id');
    }

    public function test_ganti_email_wajib_kata_sandi_yang_benar(): void
    {
        $user = User::factory()->create(['email' => 'dimas@contoh.id', 'password' => 'rahasia123']);

        $this->actingAs($user)->putJson('/api/profil', ['nama' => 'Dimas', 'email' => 'baru@contoh.id'])
            ->assertStatus(422)
            ->assertJsonPath('errors.sandi.0', 'Masukkan kata sandi untuk mengganti email.');

        $this->actingAs($user)->putJson('/api/profil', ['nama' => 'Dimas', 'email' => 'baru@contoh.id', 'sandi' => 'salah12345'])
            ->assertStatus(422)
            ->assertJsonPath('errors.sandi.0', 'Kata sandi belum cocok.');

        $this->actingAs($user)->putJson('/api/profil', ['nama' => 'Dimas', 'email' => ' Baru@Contoh.ID ', 'sandi' => 'rahasia123'])
            ->assertOk()
            ->assertJsonPath('akun.email', 'baru@contoh.id');
    }

    public function test_email_milik_akun_lain_ditolak(): void
    {
        User::factory()->create(['email' => 'sari@contoh.id']);
        $user = User::factory()->create(['email' => 'dimas@contoh.id', 'password' => 'rahasia123']);

        $this->actingAs($user)->putJson('/api/profil', ['nama' => 'Dimas', 'email' => 'sari@contoh.id', 'sandi' => 'rahasia123'])
            ->assertStatus(422)
            ->assertJsonPath('errors.email.0', 'Email ini sudah dipakai akun lain.');
    }

    public function test_ubah_profil_butuh_masuk(): void
    {
        $this->putJson('/api/profil', ['nama' => 'Dimas', 'email' => 'a@b.id'])->assertUnauthorized();
    }
}
