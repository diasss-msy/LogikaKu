<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function progres(): HasMany
    {
        return $this->hasMany(Progres::class);
    }

    /** Data akun yang dikirim ke tampilan. Kata sandi dan token tidak ikut. */
    public function untukTampilan(): array
    {
        $progres = [];
        foreach ($this->progres()->orderBy('modul')->get() as $p) {
            $progres[(string) $p->modul] = [
                'langkah' => $p->langkah,
                'terakhir' => $p->terakhir,
                'terbaik' => $p->terbaik,
                'total' => $p->total,
            ];
        }

        return [
            'nama' => $this->name,
            'email' => $this->email,
            'progres' => (object) $progres,
        ];
    }
}
