<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProgresTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_tamu_tidak_bisa_menyimpan_progres(): void
    {
        auth()->logout();
        $this->postJson('/api/progres/1/langkah', ['langkah' => 1])->assertUnauthorized();
    }

    public function test_langkah_hanya_naik(): void
    {
        $this->postJson('/api/progres/1/langkah', ['langkah' => 2])->assertOk()->assertJsonPath('progres.langkah', 2);
        $this->postJson('/api/progres/1/langkah', ['langkah' => 1])->assertOk()->assertJsonPath('progres.langkah', 2);
        $this->assertSame(1, $this->user->progres()->count());
    }

    public function test_langkah_tiga_hanya_dari_kuis(): void
    {
        $this->postJson('/api/progres/1/langkah', ['langkah' => 3])->assertStatus(422);
    }

    public function test_modul_di_luar_jangkauan_ditolak(): void
    {
        $this->postJson('/api/progres/11/langkah', ['langkah' => 1])->assertNotFound();
        $this->postJson('/api/progres/0/kuis', ['benar' => 1, 'total' => 10])->assertNotFound();
    }

    public function test_kuis_belum_lulus_lalu_lulus_menyimpan_nilai_terbaik(): void
    {
        $this->postJson('/api/progres/2/kuis', ['benar' => 5, 'total' => 10])
            ->assertOk()
            ->assertJson(['lulus' => false, 'baruLulus' => false, 'progres' => ['langkah' => 2, 'terakhir' => 5, 'terbaik' => 5]]);

        $this->postJson('/api/progres/2/kuis', ['benar' => 7, 'total' => 10])
            ->assertOk()
            ->assertJson(['lulus' => true, 'baruLulus' => true, 'progres' => ['langkah' => 3, 'terakhir' => 7, 'terbaik' => 7]]);

        $this->postJson('/api/progres/2/kuis', ['benar' => 4, 'total' => 10])
            ->assertOk()
            ->assertJson(['lulus' => false, 'baruLulus' => false, 'progres' => ['langkah' => 3, 'terakhir' => 4, 'terbaik' => 7]]);
    }

    public function test_nilai_benar_tidak_boleh_melebihi_total(): void
    {
        $this->postJson('/api/progres/1/kuis', ['benar' => 11, 'total' => 10])->assertStatus(422);
    }

    public function test_progres_tidak_bercampur_antar_siswa(): void
    {
        $this->postJson('/api/progres/1/kuis', ['benar' => 10, 'total' => 10])->assertOk();

        $lain = User::factory()->create();
        $this->actingAs($lain)->getJson('/api/saya')->assertOk()->assertExactJson([
            'nama' => $lain->name, 'email' => $lain->email, 'progres' => [],
        ]);
    }
}
