# LogikaKu

Media belajar logika dan algoritma untuk siswa SMK kelas X TKJ dan RPL.

**Tahap 2:** LogikaKu sekarang berjalan di **Laravel 13** dengan database **Supabase** (Postgres). Siswa bisa daftar, masuk, keluar, lupa dan ganti kata sandi, dan progres belajar (langkah modul dan nilai kuis) tersimpan di akun.

Tampilannya tetap HTML, CSS, dan JavaScript biasa di `public/`, tanpa langkah build. Laravel menyajikan halaman itu dan menyediakan API kecil di `/api`.

## Menjalankan di laptop

Butuh PHP 8.3 atau lebih baru (dengan ekstensi `pdo_pgsql`, atau `pdo_sqlite` untuk mencoba tanpa Supabase) dan Composer.

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Lalu isi koneksi database di `.env`:

- **Supabase:** proyek `logikaku` (region Singapura) sudah dibuat dan tabelnya sudah ada. Buka proyek itu di Supabase, klik **Connect**, pilih **Session pooler**, lalu cocokkan `DB_HOST` dengan host di sana. Isi `DB_PASSWORD` dengan kata sandi database (kalau lupa, buat baru di **Project Settings > Database > Reset database password**). `DB_SSLMODE=require` biarkan.
- **Tanpa Supabase (coba cepat):** ganti blok database dengan `DB_CONNECTION=sqlite` saja. Laravel memakai `database/database.sqlite`.

Kemudian:

```bash
php artisan migrate   # di Supabase akan menjawab "Nothing to migrate" karena tabelnya sudah ada
php artisan serve
```

Buka <http://localhost:8000>. File `.env` berisi kredensial dan tidak ikut di-commit.

Email lupa kata sandi belum dikirim sungguhan: `MAIL_MAILER=log` menulisnya ke `storage/logs/laravel.log`. Salin tautan dari sana untuk mencoba. Untuk email sungguhan, isi pengaturan SMTP di `.env`.

### Tes

```bash
php artisan test
```

Tes memakai SQLite di memori, jadi tidak menyentuh Supabase. Workflow `.github/workflows/tes.yml` menjalankannya di setiap PR.

## Keamanan data

- Kata sandi disimpan sebagai hash bcrypt oleh Laravel, tidak pernah di browser.
- Masuk dibatasi 6 percobaan per menit, lupa kata sandi 3 per menit.
- Jawaban "lupa kata sandi" selalu sama, ada atau tidak akunnya.
- Supabase membuka tabel di skema `public` lewat API REST-nya. Migrasi `kunci_tabel_dari_api_supabase` menyalakan Row Level Security tanpa policy di semua tabel, jadi kunci `anon` Supabase tidak bisa membaca data siswa. Laravel tetap bisa karena tersambung sebagai pemilik tabel.
- Nilai kuis dihitung di browser lalu dikirim ke server. Server memeriksa batasnya (modul 1 sampai 10, benar tidak melebihi total), tetapi belum memeriksa jawaban satu per satu.

## API

Semua rute di grup `web` (sesi cookie dan token CSRF dari `<meta name="csrf-token">`).

| Rute | Guna |
|---|---|
| `POST /api/daftar` | `nama`, `email`, `sandi`. Membuat akun lalu langsung masuk. |
| `POST /api/masuk` | `email`, `sandi`. |
| `POST /api/keluar` | Mengakhiri sesi. |
| `POST /api/lupa-sandi` | `email`. Mengirim tautan ke `#/sandi-baru?token=...&email=...`, berlaku 30 menit. |
| `POST /api/sandi-baru` | `token`, `email`, `sandi`. |
| `GET /api/saya` | Nama, email, dan progres per modul. Butuh masuk. |
| `PUT /api/sandi` | `lama`, `baru`. Butuh masuk. |
| `POST /api/progres/{modul}/langkah` | `langkah` 1 (materi) atau 2 (latihan). Tidak pernah turun. |
| `POST /api/progres/{modul}/kuis` | `benar`, `total`. Nilai 70 ke atas meluluskan modul; nilai terbaik disimpan. |

## Mode demo dan GitHub Pages

GitHub Pages tidak bisa menjalankan PHP. Workflow `.github/workflows/pages.yml` menerbitkan **mode demo**: tampilan yang sama tanpa dua baris bertanda `mode-server` di `resources/views/app.blade.php`. Tanpa baris itu, `public/js/status.js` memakai data contoh siswa **Dimas** dan menyimpan progres di `localStorage`, seperti prototype tahap 1. Syarat terbit: repo publik dan **Settings > Pages > Source** diisi **GitHub Actions**.

Versi Laravel butuh hosting PHP sendiri (belum dipilih).

## Daftar semua layar

Buka `#/layar`. Halaman ini berisi tautan ke 39 layar dari desain, termasuk state khusus seperti `?gagal`, `?kosong`, `?offline`, `?memuat`, dan `?demo=...`. Di mode server, layar contoh tidak mengubah akun sungguhan, dan layar selain Landing, Masuk, Daftar, dan lupa kata sandi meminta masuk dulu.

## Struktur

| Bagian | Isi |
|---|---|
| `resources/views/app.blade.php` | Satu halaman; rute memakai hash (`#/beranda`, `#/modul/4/kuis`, dan seterusnya). |
| `routes/web.php` | Halaman utama dan rute `/api`. |
| `app/Http/Controllers/Api/` | `AkunController` (daftar, masuk, keluar, ganti sandi), `SandiController` (lupa sandi), `ProgresController`. |
| `app/Models/` | `User` dan `Progres` (satu baris per siswa per modul). |
| `database/migrations/` | Tabel bawaan Laravel, `progres`, dan penguncian RLS untuk Supabase. |
| `tests/Feature/` | Tes API. |
| `public/css/tokens.css` | Variabel warna, ukuran, jarak, dan gerak. **Dibuat otomatis**, jangan diedit langsung. |
| `public/css/dasar.css`, `komponen.css`, `layar.css` | Tata letak dasar, komponen, dan gaya per layar. Semua nilai memakai token, tanpa kode HEX. |
| `public/css/gerak.css` | Animasi tambahan, termasuk gerak Landing (judul muncul dari blur, kartu menyebar, isi muncul saat digulir, panel Cara belajar, kabel kaki halaman; diatur `LK.gerakLanding` di `js/layar/auth.js`). Mati otomatis dengan "Kurangi animasi". |
| `public/data/contoh.js` | Isi belajar: 10 modul, materi, latihan, kuis, dan data contoh Dimas untuk mode demo. |
| `public/js/status.js` | Pengaturan tampilan, sesi, progres, dan `LK.api` untuk bicara dengan Laravel. |
| `public/js/komponen.js`, `ikon.js` | Pembuat komponen dan ikon Lucide. |
| `public/js/app.js` | Router, kerangka aplikasi, modal, dan pengumuman pembaca layar. |
| `public/js/layar/*.js` | Isi tiap layar. |
| `design/tokens.json` | Token dari handoff desain. |
| `tools/buat_tokens.py` | Membuat ulang `public/css/tokens.css` dari `design/tokens.json`. |

## Yang disimpan di browser

`localStorage` hanya menyimpan `logikaku-pengaturan` (tema, ukuran teks, kurangi animasi). Di mode demo ada juga `logikaku-sesi` (progres contoh). Kata sandi tidak pernah disimpan di browser.

## Aksesibilitas

- Mode terang, gelap, dan otomatis; ukuran teks Normal atau Besar. Tombol bulan/matahari di top bar, sidebar, landing, dan halaman akun langsung berganti terang atau gelap.
- Sidebar desktop tetap di tempat saat halaman digulir, dan guliran di sidebar berhenti di ujungnya tanpa ikut menggulir halaman.
- `prefers-reduced-motion` dan saklar "Kurangi animasi" di Profil mematikan animasi arus.
- Latihan proposisi dan flowchart bisa diselesaikan hanya dengan ketuk (tanpa seret) dan dengan keyboard.
- Pintasan keyboard: T/F dan panah di tabel kebenaran, A sampai D di kuis, 1 sampai 3 untuk memilih gerbang, panah di penelusur pseudocode, Esc menutup modal.
