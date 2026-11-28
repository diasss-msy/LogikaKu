<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        /* Batas percobaan per rute. Masuk dan lupa sandi dihitung per email dan alamat IP,
         * supaya satu kelas yang memakai Wi-Fi sekolah yang sama tidak saling mengunci. */
        $email = fn (Request $r) => strtolower(trim((string) $r->input('email'))).'|'.$r->ip();
        RateLimiter::for('masuk', fn (Request $r) => Limit::perMinute(6)->by('masuk|'.$email($r)));
        RateLimiter::for('lupa-sandi', fn (Request $r) => Limit::perMinute(3)->by('lupa|'.$email($r)));
        RateLimiter::for('sandi-baru', fn (Request $r) => Limit::perMinute(6)->by('baru|'.$email($r)));
        RateLimiter::for('daftar', fn (Request $r) => Limit::perMinute(10)->by('daftar|'.$r->ip()));
        RateLimiter::for('ubah-profil', fn (Request $r) => Limit::perMinute(6)->by('profil|'.$r->user()?->id));
        RateLimiter::for('ganti-sandi', fn (Request $r) => Limit::perMinute(6)->by('ganti|'.$r->user()?->id));

        /* Email lupa kata sandi. Tautannya membuka layar #/sandi-baru di tampilan, bukan halaman Laravel. */
        ResetPassword::toMailUsing(function ($user, string $token) {
            $menit = config('auth.passwords.'.config('auth.defaults.passwords').'.expire');

            return (new MailMessage)
                ->subject('Buat kata sandi baru LogikaKu')
                ->greeting('Halo, '.$user->name.'!')
                ->line('Kami menerima permintaan untuk membuat kata sandi baru akun LogikaKu-mu.')
                ->action('Buat kata sandi baru', url('/').'/#/sandi-baru?token='.$token.'&email='.urlencode($user->getEmailForPasswordReset()))
                ->line('Tautan ini berlaku '.$menit.' menit.')
                ->line('Kalau kamu tidak meminta ini, abaikan saja email ini. Kata sandimu tidak berubah.')
                ->salutation('Salam, LogikaKu');
        });
    }
}
