# LogikaKu

Media belajar logika dan algoritma untuk siswa SMK kelas X TKJ dan RPL.

Ini **prototype tahap 1**: website statis dari HTML, CSS, dan JavaScript biasa, tanpa server, tanpa build, dan tanpa akun sungguhan. Semua data berasal dari satu file contoh (siswa **Dimas**: lulus Modul 1 sampai 3, sedang di Modul 4, Modul 5 sampai 10 terkunci).

## Cara membuka di laptop

Cara paling cepat: klik dua kali `index.html`. Semua file dimuat dengan `<script>` biasa, jadi halaman jalan langsung dari `file://`.

Kalau ingin alamat yang rapi (disarankan saat menguji), jalankan server kecil dari folder ini:

```bash
python3 -m http.server 8000
```

Lalu buka <http://localhost:8000>. Font diambil dari Google Fonts, jadi tanpa internet tampilannya memakai font cadangan.

## Daftar semua layar

Buka `#/layar` (misalnya <http://localhost:8000/#/layar>). Halaman ini berisi tautan ke 39 layar dari desain (34 layar handoff plus 5 layar 27 November), termasuk state khusus seperti `?gagal`, `?kosong`, `?offline`, `?memuat`, dan `?demo=...`. Tombol "Pakai data Dimas lagi" mengembalikan progres contoh.

Alur utama yang bisa diklik: Landing → Masuk → Beranda → Materi → Latihan → Kuis → Hasil → Lencana → kembali ke Beranda (rangkaian modul berikutnya menyala).

## Struktur

| Bagian | Isi |
|---|---|
| `index.html` | Satu halaman; rute memakai hash (`#/beranda`, `#/modul/4/kuis`, dan seterusnya). |
| `css/tokens.css` | Variabel warna, ukuran, jarak, dan gerak. **Dibuat otomatis**, jangan diedit langsung. |
| `css/dasar.css`, `css/komponen.css`, `css/layar.css` | Tata letak dasar, komponen, dan gaya per layar. Semua nilai memakai token, tanpa kode HEX. |
| `data/contoh.js` | Data contoh: siswa, 10 modul, materi, soal latihan, kuis, dan jawaban benar. |
| `js/status.js` | Pengaturan tampilan dan progres contoh (`localStorage`). |
| `js/komponen.js`, `js/ikon.js` | Pembuat komponen (tombol, LED rangkaian, kolom form) dan ikon Lucide. |
| `js/app.js` | Router, kerangka aplikasi (sidebar, top bar), modal, dan pengumuman pembaca layar. |
| `js/layar/*.js` | Isi tiap layar. |
| `design/tokens.json` | Token dari handoff desain. |
| `tools/buat_tokens.py` | Membuat ulang `css/tokens.css` dari `design/tokens.json`. |

Kalau token desain berubah, ganti `design/tokens.json` lalu jalankan:

```bash
python3 tools/buat_tokens.py
```

## Yang disimpan di browser

Hanya dua kunci `localStorage`: `logikaku-pengaturan` (tema, ukuran teks, kurangi animasi) dan `logikaku-sesi` (progres contoh). Kata sandi tidak pernah disimpan di mana pun. Form masuk, daftar, lupa sandi, dan ganti sandi hanya memeriksa isian di browser lalu pindah ke layar berikutnya.

Untuk mencoba state "masuk gagal", isi kata sandi kurang dari 8 karakter di halaman Masuk.

## Aksesibilitas

- Mode terang, gelap, dan otomatis; ukuran teks Normal atau Besar.
- `prefers-reduced-motion` dan saklar "Kurangi animasi" di Profil mematikan animasi arus.
- Latihan proposisi dan flowchart bisa diselesaikan hanya dengan ketuk (tanpa seret) dan dengan keyboard.
- Pintasan keyboard: T/F dan panah di tabel kebenaran, A sampai D di kuis, 1 sampai 3 untuk memilih gerbang, panah di penelusur pseudocode, Esc menutup modal.
