<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HalamanTest extends TestCase
{
    use RefreshDatabase;

    public function test_halaman_utama_memuat_tampilan_dengan_mode_server(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertSee('<meta name="lk-api"', false)
            ->assertSee('<meta name="csrf-token"', false)
            ->assertSee('js/status.js', false);
    }

    public function test_tamu_tidak_bisa_membaca_akun(): void
    {
        $this->getJson('/api/saya')->assertUnauthorized();
    }
}
