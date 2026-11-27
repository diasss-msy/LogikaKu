<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/*
 * Progres belajar: satu baris per siswa per modul.
 * langkah: 0 belum mulai, 1 materi dibaca, 2 latihan selesai, 3 kuis lulus.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('progres', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('modul');
            $table->unsignedTinyInteger('langkah')->default(0);
            $table->unsignedSmallInteger('terakhir')->nullable();
            $table->unsignedSmallInteger('terbaik')->nullable();
            $table->unsignedSmallInteger('total')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'modul']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('progres');
    }
};
