<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Progres extends Model
{
    protected $table = 'progres';

    protected $fillable = ['modul', 'langkah', 'terakhir', 'terbaik', 'total'];

    protected function casts(): array
    {
        return [
            'modul' => 'integer',
            'langkah' => 'integer',
            'terakhir' => 'integer',
            'terbaik' => 'integer',
            'total' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
