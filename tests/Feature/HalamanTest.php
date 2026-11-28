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

    public function test_halaman_utama_punya_ikon_dan_pratinjau_tautan(): void
    {
        $this->get('/')
            ->assertSee('favicon.svg', false)
            ->assertSee('<meta property="og:image" content="'.url('/').'/og-image.png">', false);
        $this->assertFileExists(public_path('og-image.png'));
    }

    public function test_alamat_yang_tidak_ada_memakai_halaman_404_logikaku(): void
    {
        $this->get('/tidak-ada')
            ->assertNotFound()
            ->assertSee('Halaman tidak ditemukan')
            ->assertSee(url('/').'/#/beranda', false);
    }

    public function test_tamu_tidak_bisa_membaca_akun(): void
    {
        $this->getJson('/api/saya')->assertUnauthorized();
    }
}
