<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class SandiTest extends TestCase
{
    use RefreshDatabase;

    public function test_lupa_sandi_mengirim_tautan_ke_layar_sandi_baru(): void
    {
        Notification::fake();
        $user = User::factory()->create(['email' => 'dimas@contoh.id']);

        $this->postJson('/api/lupa-sandi', ['email' => 'dimas@contoh.id'])->assertOk();

        Notification::assertSentTo($user, ResetPassword::class, function (ResetPassword $n) use ($user) {
            $mail = $n->toMail($user);

            return str_contains($mail->actionUrl, '#/sandi-baru?token='.$n->token.'&email=dimas%40contoh.id')
                && $mail->subject === 'Buat kata sandi baru LogikaKu';
        });
    }

    public function test_lupa_sandi_untuk_email_tak_dikenal_tetap_dijawab_sama(): void
    {
        Notification::fake();

        $this->postJson('/api/lupa-sandi', ['email' => 'tidak.ada@contoh.id'])->assertOk()->assertExactJson(['ok' => true]);
        Notification::assertNothingSent();
    }

    public function test_sandi_baru_dengan_token_benar_bisa_dipakai_masuk(): void
    {
        Notification::fake();
        $user = User::factory()->create(['email' => 'dimas@contoh.id', 'password' => 'lamalama1']);
        $this->postJson('/api/lupa-sandi', ['email' => 'dimas@contoh.id']);

        $token = null;
        Notification::assertSentTo($user, ResetPassword::class, function (ResetPassword $n) use (&$token) {
            $token = $n->token;

            return true;
        });

        $this->postJson('/api/sandi-baru', ['token' => 'token-palsu', 'email' => 'dimas@contoh.id', 'sandi' => 'barubaru1'])
            ->assertStatus(422);
        $this->postJson('/api/sandi-baru', ['token' => $token, 'email' => 'dimas@contoh.id', 'sandi' => 'barubaru1'])
            ->assertOk();
        $this->postJson('/api/masuk', ['email' => 'dimas@contoh.id', 'sandi' => 'barubaru1'])->assertOk();
    }
}
