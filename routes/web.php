<?php

use App\Http\Controllers\Api\AkunController;
use App\Http\Controllers\Api\ProgresController;
use App\Http\Controllers\Api\SandiController;
use Illuminate\Support\Facades\Route;

/* Satu halaman: semua layar digambar oleh public/js lewat rute hash (#/beranda, #/masuk, ...). */
Route::view('/', 'app');

/* API untuk tampilan. Ada di grup "web" supaya memakai sesi cookie dan token CSRF. */
Route::prefix('api')->group(function () {
    Route::post('/daftar', [AkunController::class, 'daftar'])->middleware('throttle:daftar');
    Route::post('/masuk', [AkunController::class, 'masuk'])->middleware('throttle:masuk');
    Route::post('/keluar', [AkunController::class, 'keluar']);
    Route::post('/lupa-sandi', [SandiController::class, 'lupa'])->middleware('throttle:lupa-sandi');
    Route::post('/sandi-baru', [SandiController::class, 'baru'])->middleware('throttle:sandi-baru');

    Route::middleware('auth')->group(function () {
        Route::get('/saya', [AkunController::class, 'saya']);
        Route::put('/sandi', [AkunController::class, 'gantiSandi'])->middleware('throttle:ganti-sandi');
        Route::post('/progres/{modul}/langkah', [ProgresController::class, 'langkah'])->whereNumber('modul');
        Route::post('/progres/{modul}/kuis', [ProgresController::class, 'kuis'])->whereNumber('modul');
    });
});
