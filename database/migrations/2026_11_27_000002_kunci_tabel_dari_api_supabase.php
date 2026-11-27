<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/*
 * Supabase membuka setiap tabel di skema public lewat API REST-nya (PostgREST).
 * Laravel tersambung langsung ke Postgres sebagai pemilik tabel, jadi API itu tidak dipakai.
 * Row Level Security dinyalakan tanpa policy supaya kunci "anon" dan "authenticated"
 * tidak bisa membaca atau mengubah data siswa, sementara Laravel tetap bisa.
 * Di SQLite (laptop dan tes) migrasi ini tidak melakukan apa-apa.
 */
return new class extends Migration
{
    private array $tabel = [
        'users', 'password_reset_tokens', 'sessions', 'progres',
        'cache', 'cache_locks', 'jobs', 'job_batches', 'failed_jobs', 'migrations',
    ];

    public function up(): void
    {
        if (DB::getDriverName() !== 'pgsql') {
            return;
        }
        foreach ($this->tabel as $t) {
            DB::statement("alter table if exists \"{$t}\" enable row level security");
        }
    }

    public function down(): void
    {
        if (DB::getDriverName() !== 'pgsql') {
            return;
        }
        foreach ($this->tabel as $t) {
            DB::statement("alter table if exists \"{$t}\" disable row level security");
        }
    }
};
