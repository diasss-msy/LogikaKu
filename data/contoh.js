/*
 * Data contoh LogikaKu tahap 1.
 * Siswa contoh "Dimas": lulus Modul 1-3, sedang di Modul 4, Modul 5-10 terkunci.
 * Semua jawaban benar latihan dan kuis ditulis di sini.
 *
 * File ini berupa .js (bukan .json) supaya website tetap jalan saat index.html
 * dibuka langsung dari folder (file://), tanpa server.
 * Di tahap 2 isi ini akan diambil dari server.
 */
window.LOGIKAKU_DATA = {
  siswa: { nama: "Dimas", email: "dimas@gmail.com" },

  bab: [
    { id: 1, judul: "Bab 1: Logika", modul: [1, 2, 3, 4, 5] },
    { id: 2, judul: "Bab 2: Algoritma", modul: [6, 7, 8, 9, 10] }
  ],

  modul: [
    { no: 1, bab: 1, judul: "Proposisi", pendek: "Proposisi", desk: "Kalimat yang bernilai benar atau salah.", latihan: "proposisi", namaLatihan: "Pilah kalimat proposisi", lencana: "Si Penalar" },
    { no: 2, bab: 1, judul: "Operator Logika", pendek: "Operator", desk: "AND, OR, dan NOT.", latihan: "gerbang", namaLatihan: "Lab gerbang logika", lencana: "Penjaga Gerbang" },
    { no: 3, bab: 1, judul: "Implikasi dan Biimplikasi", pendek: "Implikasi", desk: "Kalau p maka q, serta p jika dan hanya jika q.", latihan: "implikasi", namaLatihan: "Kapan janji dilanggar?", lencana: "Penepat Janji" },
    { no: 4, bab: 1, judul: "Tabel Kebenaran", pendek: "Tabel", desk: "Semua kemungkinan nilai T dan F.", latihan: "tabel", namaLatihan: "Isi tabel kebenaran", lencana: "Ahli Tabel" },
    { no: 5, bab: 1, judul: "Ekuivalensi dan De Morgan", pendek: "Ekuivalen", desk: "Dua ekspresi yang nilainya selalu sama.", latihan: "ekuivalensi", namaLatihan: "Cocokkan pasangan setara", lencana: "Pencari Kembaran" },
    { no: 6, bab: 2, judul: "Berpikir Komputasional", pendek: "Komputasi", desk: "Memecah masalah besar jadi langkah kecil.", latihan: "komputasi", namaLatihan: "Urutkan langkah kerja", lencana: "Pemecah Masalah" },
    { no: 7, bab: 2, judul: "Flowchart", pendek: "Flowchart", desk: "Gambar alur langkah penyelesaian.", latihan: "flowchart", namaLatihan: "Susun flowchart", lencana: "Arsitek Alur" },
    { no: 8, bab: 2, judul: "Pseudocode dan Variabel", pendek: "Pseudo-code", desk: "Menulis algoritma dan menyimpan nilai.", latihan: "pseudocode", namaLatihan: "Jalankan pseudocode", lencana: "Penulis Algoritma" },
    { no: 9, bab: 2, judul: "Percabangan", pendek: "Cabang", desk: "Memilih jalur dengan JIKA dan SELAIN ITU.", latihan: "percabangan", namaLatihan: "Ikuti jalur JIKA", lencana: "Penentu Jalur" },
    { no: 10, bab: 2, judul: "Perulangan", pendek: "Ulang", desk: "Mengulang langkah dengan UNTUK dan SELAMA.", latihan: "perulangan", namaLatihan: "Hitung putaran LED", lencana: "Pengatur Putaran" }
  ],

  /* langkah: 0 belum mulai, 1 materi selesai, 2 latihan selesai, 3 kuis lulus. Skor dalam soal benar dari 10. */
  progres: {
    1: { langkah: 3, terakhir: 9, terbaik: 9, total: 10 },
    2: { langkah: 3, terakhir: 7, terbaik: 8, total: 10 },
    3: { langkah: 3, terakhir: 8, terbaik: 9, total: 10 },
    4: { langkah: 1 }
  },

  perluDiulang: [
    { topik: "Operator OR", modul: 2, benar: 2, total: 5 },
    { topik: "Negasi (NOT)", modul: 2, benar: 3, total: 5 }
  ],

  /* ---------- Materi ---------- */
  materi: {
    1: [
      {
        judul: "Apa itu Proposisi?",
        ilustrasi: "lampu",
        isi: [
          "Proposisi adalah kalimat yang bisa dinilai benar (T) atau salah (F), tetapi tidak keduanya sekaligus.",
          "Nilainya boleh salah. Yang penting, kalimat itu bisa dinilai."
        ],
        contoh: "\"Jakarta adalah ibu kota Indonesia\" bernilai T. \"2 + 3 = 7\" bernilai F. Keduanya tetap proposisi.",
        ingat: "Proposisi yang nilainya salah tetap proposisi."
      },
      {
        judul: "Kalimat yang bukan proposisi",
        ilustrasi: "lampu",
        isi: [
          "Kalimat tanya, perintah, dan harapan tidak bisa dinilai benar atau salah, jadi bukan proposisi.",
          "Kalimat terbuka seperti x + 1 = 5 juga bukan proposisi, karena nilainya bergantung pada x."
        ],
        kode: "Jakarta ibu kota Indonesia.   → T\n2 + 3 = 7                     → F\nTutup pintunya!               → bukan\nx + 1 = 5                     → bukan",
        ingat: "Tanyakan: bisakah kalimat ini dijawab \"benar\" atau \"salah\"? Kalau bisa, itu proposisi."
      },
      {
        judul: "Variabel proposisi",
        ilustrasi: "lampu",
        isi: [
          "Supaya ringkas, proposisi diberi nama huruf kecil seperti p dan q.",
          "Misalnya p: \"Hari ini hujan\". Nilai p bisa T atau F, seperti lampu yang menyala atau mati."
        ],
        contoh: "p: \"Hari ini hujan\" dan q: \"Jalan basah\". Nanti p dan q bisa digabung dengan operator logika."
      }
    ],
    2: [
      {
        judul: "Operator AND, OR, dan NOT",
        ilustrasi: "gerbang",
        isi: [
          "Operator logika menggabungkan proposisi. AND (∧) bernilai T hanya kalau kedua sisi T.",
          "OR (∨) bernilai T kalau minimal satu sisi T. NOT (¬) membalik nilai: T jadi F, F jadi T."
        ],
        kode: "T ∧ F = F\nT ∨ F = T\n¬T    = F",
        ingat: "AND hanya T jika kedua sisi T. OR hanya F jika kedua sisi F."
      }
    ],
    3: [
      {
        judul: "Implikasi: kalau p maka q",
        ilustrasi: "lampu",
        isi: [
          "Implikasi p → q seperti janji: \"Kalau hujan, maka jalan basah.\"",
          "Janji hanya dilanggar kalau syaratnya terjadi (p = T) tetapi hasilnya tidak (q = F). Selain itu, p → q bernilai T.",
          "Biimplikasi p ↔ q bernilai T kalau p dan q nilainya sama."
        ],
        kode: "p  q   p → q   p ↔ q\nT  T     T       T\nT  F     F       F\nF  T     T       F\nF  F     T       T",
        ingat: "p → q hanya F di baris p = T dan q = F."
      }
    ],
    4: [
      {
        judul: "Kenapa perlu tabel?",
        ilustrasi: "lampu",
        isi: [
          "Ekspresi logika seperti p ∧ q nilainya bergantung pada p dan q.",
          "Supaya tidak ada kemungkinan yang terlewat, kita menuliskan semuanya dalam satu tabel."
        ],
        contoh: "Kalau p = \"Hujan\" dan q = \"Bawa payung\", ada empat kejadian yang mungkin: hujan dan bawa payung, hujan tapi tidak bawa payung, dan seterusnya."
      },
      {
        judul: "Menghitung jumlah baris",
        ilustrasi: "lampu",
        isi: [
          "Setiap variabel punya 2 kemungkinan nilai. Dengan 2 variabel ada 2 × 2 = 4 baris. Dengan 3 variabel ada 2 × 2 × 2 = 8 baris.",
          "Kolom bantu seperti ¬p atau p ∨ q diisi dulu, baru kolom hasil."
        ],
        ingat: "Jumlah baris = 2 pangkat banyaknya variabel."
      },
      {
        judul: "Apa itu Tabel Kebenaran?",
        ilustrasi: "lampu",
        isi: [
          "Tabel kebenaran adalah tabel yang menunjukkan semua kemungkinan nilai dari sebuah pernyataan logika.",
          "Setiap variabel (p, q) bisa bernilai T (benar) atau F (salah). Dengan 2 variabel ada 2 × 2 = 4 kemungkinan, jadi tabelnya punya 4 baris."
        ],
        contoh: "Untuk p ∧ q (AND), hasilnya T hanya jika p = T dan q = T. Tiga baris lainnya bernilai F.",
        kode: "p   q   p ∧ q\nT   T     T\nT   F     F\nF   T     F\nF   F     F",
        ingat: "Urutkan baris mulai dari TT, TF, FT, lalu FF supaya tidak ada yang terlewat."
      }
    ],
    5: [
      {
        judul: "Ekuivalensi dan Hukum De Morgan",
        ilustrasi: "lampu",
        isi: [
          "Dua ekspresi disebut ekuivalen (≡) kalau nilainya selalu sama di setiap baris tabel kebenaran.",
          "Hukum De Morgan: negasi AND menjadi OR dari negasi, dan negasi OR menjadi AND dari negasi."
        ],
        kode: "¬(p ∧ q) ≡ ¬p ∨ ¬q\n¬(p ∨ q) ≡ ¬p ∧ ¬q",
        ingat: "Saat NOT masuk ke dalam kurung, AND berganti OR dan OR berganti AND."
      }
    ],
    6: [
      {
        judul: "Berpikir komputasional",
        ilustrasi: "kode",
        isi: [
          "Berpikir komputasional adalah cara memecahkan masalah seperti programmer.",
          "Langkah pertamanya dekomposisi: memecah masalah besar menjadi langkah kecil yang urut dan jelas."
        ],
        contoh: "Memasang konektor LAN dipecah jadi: kupas kabel, urutkan warna, potong rata, masukkan ke konektor, lalu jepit.",
        ingat: "Langkah yang baik itu urut, jelas, dan ada akhirnya."
      }
    ],
    7: [
      {
        judul: "Membaca flowchart",
        ilustrasi: "kode",
        isi: [
          "Flowchart menggambar alur langkah dengan bentuk standar: kapsul untuk mulai dan selesai, jajar genjang untuk input atau output, persegi untuk proses, dan belah ketupat untuk keputusan.",
          "Keputusan punya dua jalan keluar: Ya dan Tidak."
        ],
        ingat: "Setiap flowchart dimulai dari Mulai dan berakhir di Selesai."
      }
    ],
    8: [
      {
        judul: "Pseudocode dan variabel",
        ilustrasi: "kode",
        isi: [
          "Pseudocode menulis algoritma dengan bahasa sehari-hari yang rapi, mirip kode program.",
          "Variabel adalah kotak penyimpan nilai. Tanda ← berarti \"isi dengan\"."
        ],
        kode: "total ← 0\ntotal ← total + 5\nTULIS total",
        ingat: "total ← total + i artinya: ambil nilai total yang lama, tambah i, lalu simpan lagi ke total."
      }
    ],
    9: [
      {
        judul: "Percabangan JIKA dan SELAIN ITU",
        ilustrasi: "kode",
        isi: [
          "Percabangan memilih satu dari dua jalur berdasarkan syarat.",
          "Kalau syaratnya T, baris setelah JIKA dijalankan. Kalau F, baris setelah SELAIN ITU yang dijalankan."
        ],
        kode: "JIKA nilai ≥ 70 MAKA\n    TULIS \"Lulus\"\nSELAIN ITU\n    TULIS \"Belum lulus\"\nSELESAI JIKA",
        ingat: "Hanya satu jalur yang dijalankan, tidak pernah keduanya."
      }
    ],
    10: [
      {
        judul: "Perulangan UNTUK dan SELAMA",
        ilustrasi: "kode",
        isi: [
          "Perulangan mengulang langkah yang sama tanpa menulisnya berkali-kali.",
          "UNTUK dipakai kalau jumlah putaran sudah diketahui. SELAMA dipakai kalau perulangan berjalan selama syaratnya T."
        ],
        kode: "UNTUK i ← 1 SAMPAI 3\n    TULIS i\nSELESAI UNTUK",
        ingat: "UNTUK i ← 1 SAMPAI 3 berarti 3 putaran: i = 1, 2, lalu 3."
      }
    ]
  },

  /* ---------- Latihan ---------- */
  latihan: {
    proposisi: [
      { teks: "Jakarta adalah ibu kota Indonesia.", jawaban: "ya", alasan: "Bisa dinilai, dan nilainya benar." },
      { teks: "Tolong tutup pintunya!", jawaban: "bukan", alasan: "Kalimat perintah tidak bisa dinilai benar atau salah." },
      { teks: "2 + 3 = 7", jawaban: "ya", alasan: "Bisa dinilai. Nilainya salah, tapi tetap proposisi." },
      { teks: "x + 1 = 5", jawaban: "bukan", alasan: "Kalimat terbuka: nilainya bergantung pada x." },
      { teks: "Semoga besok cerah.", jawaban: "bukan", alasan: "Kalimat harapan tidak bisa dinilai." },
      { teks: "Semua bilangan genap habis dibagi 2.", jawaban: "ya", alasan: "Bisa dinilai, dan nilainya benar." }
    ],
    tabel: [
      { ekspresi: "(p ∨ q) ∧ ¬p", kolom: ["¬p", "p ∨ q", "hasil"], fungsi: ["notp", "or", "orAndNotp"] },
      { ekspresi: "¬(p ∧ q)", kolom: ["p ∧ q", "hasil"], fungsi: ["and", "nand"] },
      { ekspresi: "(p ∧ q) ∨ ¬q", kolom: ["p ∧ q", "¬q", "hasil"], fungsi: ["and", "notq", "andOrNotq"] }
    ],
    implikasi: [
      { p: true, q: true, kejadian: "Hujan, jalan basah" },
      { p: true, q: false, kejadian: "Hujan, tapi jalan kering" },
      { p: false, q: true, kejadian: "Tidak hujan, jalan basah karena disiram" },
      { p: false, q: false, kejadian: "Tidak hujan, jalan kering" }
    ],
    ekuivalensi: [
      { kiri: "¬(p ∧ q)", kanan: "¬p ∨ ¬q" },
      { kiri: "¬(p ∨ q)", kanan: "¬p ∧ ¬q" },
      { kiri: "p → q", kanan: "¬p ∨ q" },
      { kiri: "¬¬p", kanan: "p" }
    ],
    komputasi: [
      "Kupas kulit luar kabel sekitar 2 cm",
      "Urutkan 8 kabel kecil sesuai standar T568B",
      "Ratakan ujung kabel lalu potong rapi",
      "Masukkan kabel ke konektor RJ45 sampai mentok",
      "Jepit konektor dengan tang crimping"
    ],
    flowchart: {
      blok: [
        { id: "mulai", bentuk: "terminal", label: "Mulai" },
        { id: "input", bentuk: "io", label: "Input n" },
        { id: "cek", bentuk: "keputusan", label: "n mod 2 = 0?" },
        { id: "genap", bentuk: "proses", label: "Tampilkan \"Genap\"" },
        { id: "ganjil", bentuk: "proses", label: "Tampilkan \"Ganjil\"" },
        { id: "selesai", bentuk: "terminal", label: "Selesai" }
      ],
      slot: [
        { id: "s1", nama: "langkah 1", benar: "mulai" },
        { id: "s2", nama: "langkah 2", benar: "input" },
        { id: "s3", nama: "langkah 3", benar: "cek" },
        { id: "ya", nama: "cabang Ya", benar: "genap" },
        { id: "tidak", nama: "cabang Tidak", benar: "ganjil" },
        { id: "s6", nama: "langkah terakhir", benar: "selesai" }
      ]
    },
    gerbang: [
      { gerbang: "AND", teks: "Atur saklar A dan B supaya LED menyala." },
      { gerbang: "OR", teks: "Pakai gerbang OR. Nyalakan LED dengan hanya satu saklar yang T.", satuSaja: true },
      { gerbang: "NOT", teks: "Pakai gerbang NOT. Buat LED menyala." }
    ],
    perulangan: { sampai: 4, opsi: ["3 LED", "4 LED", "5 LED", "Tidak ada"], benar: 1 }
  },

  /* ---------- Kuis ----------
   * Modul 4 punya satu set 10 soal sesuai desain. Modul lain punya 3 soal contoh;
   * soal lengkap untuk semua modul masuk tahap 2.
   */
  kuis: {
    1: [
      { soal: "Mana yang merupakan proposisi?", opsi: ["Ayo belajar!", "5 adalah bilangan genap.", "Apakah kamu lapar?", "Semoga lulus."], benar: 1, alasan: "\"5 adalah bilangan genap\" bisa dinilai (nilainya F), jadi proposisi.", topik: "Apa itu Proposisi?" },
      { soal: "Kalimat \"x + 2 = 10\" termasuk…", opsi: ["Proposisi bernilai T", "Proposisi bernilai F", "Kalimat terbuka, bukan proposisi", "Kalimat perintah"], benar: 2, alasan: "Nilainya bergantung pada x, jadi kalimat terbuka.", topik: "Kalimat yang bukan proposisi" },
      { soal: "Proposisi \"2 + 3 = 7\" bernilai…", opsi: ["T (benar)", "F (salah)", "Bukan proposisi", "T dan F"], benar: 1, alasan: "2 + 3 = 5, jadi pernyataan itu salah (F), tetapi tetap proposisi.", topik: "Apa itu Proposisi?" }
    ],
    2: [
      { soal: "p = T dan q = F. Berapa nilai p ∨ q?", opsi: ["T", "F", "Tidak bisa ditentukan", "T dan F"], benar: 0, alasan: "OR bernilai T kalau minimal satu sisi T.", topik: "Operator OR" },
      { soal: "Berapa nilai ¬F?", opsi: ["F", "T", "¬T", "Tidak ada"], benar: 1, alasan: "NOT membalik nilai: F jadi T.", topik: "Negasi (NOT)" },
      { soal: "Kapan p ∧ q bernilai T?", opsi: ["Kalau salah satu T", "Kalau keduanya F", "Kalau keduanya T", "Selalu"], benar: 2, alasan: "AND hanya T jika kedua sisi T.", topik: "Operator AND" }
    ],
    3: [
      { soal: "Kapan p → q bernilai F?", opsi: ["p = T, q = T", "p = T, q = F", "p = F, q = T", "p = F, q = F"], benar: 1, alasan: "Janji hanya dilanggar kalau syarat terjadi tapi hasilnya tidak.", topik: "Implikasi" },
      { soal: "p = F dan q = T. Nilai p ↔ q adalah…", opsi: ["T", "F", "Tidak bisa ditentukan", "Sama dengan p → q"], benar: 1, alasan: "Biimplikasi T hanya kalau nilai p dan q sama.", topik: "Biimplikasi" },
      { soal: "p = F dan q = F. Nilai p → q adalah…", opsi: ["F", "T", "Tidak bisa ditentukan", "Bukan proposisi"], benar: 1, alasan: "Syaratnya tidak terjadi, jadi janji tidak dilanggar.", topik: "Implikasi" }
    ],
    4: [
      { soal: "Berapa baris tabel kebenaran untuk 2 variabel?", opsi: ["2", "4", "6", "8"], benar: 1, alasan: "2 × 2 = 4 kemungkinan.", topik: "Menghitung jumlah baris" },
      { soal: "Berapa baris tabel kebenaran untuk 3 variabel (p, q, r)?", opsi: ["3", "6", "8", "9"], benar: 2, alasan: "2 × 2 × 2 = 8 kemungkinan.", topik: "Menghitung jumlah baris" },
      { soal: "Jika p = T dan q = F, berapa nilai dari p ∧ q?", opsi: ["T (benar)", "F (salah)", "Tidak bisa ditentukan", "T dan F sekaligus"], benar: 1, alasan: "AND (∧) hanya bernilai T kalau p dan q sama-sama T, padahal q = F.", topik: "Operator AND" },
      { soal: "Di tabel p ∨ q, berapa baris yang bernilai T?", opsi: ["1", "2", "3", "4"], benar: 2, alasan: "OR hanya F di baris p = F dan q = F. Tiga baris lainnya T.", topik: "Apa itu Tabel Kebenaran?" },
      { soal: "Urutan baris yang dianjurkan untuk 2 variabel adalah…", opsi: ["TT, TF, FT, FF", "FF, TT, TF, FT", "TF, FT, TT, FF", "Bebas, asal 3 baris"], benar: 0, alasan: "Mulai dari TT, TF, FT, lalu FF supaya tidak ada yang terlewat.", topik: "Apa itu Tabel Kebenaran?" },
      { soal: "Jika p = F, berapa nilai ¬p?", opsi: ["F", "T", "¬F", "Tidak bisa ditentukan"], benar: 1, alasan: "NOT membalik nilai: F jadi T.", topik: "Negasi (NOT)" },
      { soal: "Berapa nilai ¬(p ∨ q) saat p = F dan q = F?", opsi: ["F", "T", "Tidak bisa ditentukan", "Sama dengan p"], benar: 1, alasan: "p ∨ q = F, lalu NOT membaliknya menjadi T.", topik: "Negasi (NOT)" },
      { soal: "Di tabel p ∧ q, berapa baris yang bernilai F?", opsi: ["1", "2", "3", "4"], benar: 2, alasan: "AND hanya T di baris TT. Tiga baris lainnya F.", topik: "Operator AND" },
      { soal: "Kolom bantu di tabel kebenaran dipakai untuk…", opsi: ["Menghias tabel", "Menghitung bagian ekspresi sebelum hasil akhir", "Menambah variabel", "Mengganti kolom p"], benar: 1, alasan: "Kolom bantu seperti ¬p dihitung dulu supaya hasil akhir lebih mudah.", topik: "Menghitung jumlah baris" },
      { soal: "p = T dan q = T. Berapa nilai (p ∨ q) ∧ ¬p?", opsi: ["T", "F", "Tidak bisa ditentukan", "T dan F"], benar: 1, alasan: "p ∨ q = T, ¬p = F, jadi T ∧ F = F.", topik: "Apa itu Tabel Kebenaran?" }
    ],
    5: [
      { soal: "¬(p ∧ q) ekuivalen dengan…", opsi: ["¬p ∧ ¬q", "¬p ∨ ¬q", "p ∨ q", "p ∧ ¬q"], benar: 1, alasan: "Hukum De Morgan: AND berganti OR saat NOT masuk ke dalam kurung.", topik: "Hukum De Morgan" },
      { soal: "¬(p ∨ q) ekuivalen dengan…", opsi: ["¬p ∧ ¬q", "¬p ∨ ¬q", "p ∧ q", "¬p ∨ q"], benar: 0, alasan: "OR berganti AND saat NOT masuk ke dalam kurung.", topik: "Hukum De Morgan" },
      { soal: "Dua ekspresi disebut ekuivalen kalau…", opsi: ["Hurufnya sama", "Nilainya sama di setiap baris", "Panjangnya sama", "Sama-sama bernilai T"], benar: 1, alasan: "Ekuivalen berarti nilainya selalu sama di setiap baris tabel kebenaran.", topik: "Ekuivalensi" }
    ],
    6: [
      { soal: "Memecah masalah besar menjadi langkah kecil disebut…", opsi: ["Abstraksi", "Dekomposisi", "Algoritma", "Debugging"], benar: 1, alasan: "Dekomposisi = memecah masalah menjadi bagian kecil.", topik: "Berpikir komputasional" },
      { soal: "Langkah pertama memasang konektor LAN adalah…", opsi: ["Jepit konektor", "Kupas kulit luar kabel", "Potong rata ujung kabel", "Masukkan ke konektor"], benar: 1, alasan: "Kabel harus dikupas dulu sebelum diurutkan.", topik: "Berpikir komputasional" },
      { soal: "Ciri langkah yang baik adalah…", opsi: ["Acak", "Urut dan jelas", "Sepanjang mungkin", "Tanpa akhir"], benar: 1, alasan: "Langkah yang baik itu urut, jelas, dan ada akhirnya.", topik: "Berpikir komputasional" }
    ],
    7: [
      { soal: "Bentuk belah ketupat di flowchart berarti…", opsi: ["Mulai", "Proses", "Keputusan", "Input"], benar: 2, alasan: "Belah ketupat = keputusan, dengan jalan Ya dan Tidak.", topik: "Membaca flowchart" },
      { soal: "Bentuk jajar genjang dipakai untuk…", opsi: ["Input atau output", "Keputusan", "Selesai", "Panah"], benar: 0, alasan: "Jajar genjang = input atau output.", topik: "Membaca flowchart" },
      { soal: "Flowchart selalu diawali dengan…", opsi: ["Keputusan", "Mulai", "Proses", "Output"], benar: 1, alasan: "Setiap flowchart dimulai dari Mulai.", topik: "Membaca flowchart" }
    ],
    8: [
      { soal: "Setelah total ← 2 lalu total ← total + 3, nilai total adalah…", opsi: ["2", "3", "5", "23"], benar: 2, alasan: "Nilai lama 2 ditambah 3, hasilnya 5.", topik: "Pseudocode dan variabel" },
      { soal: "Tanda ← pada pseudocode berarti…", opsi: ["Lebih kecil", "Isi dengan", "Kembali", "Sama dengan"], benar: 1, alasan: "← berarti mengisi variabel dengan nilai.", topik: "Pseudocode dan variabel" },
      { soal: "Variabel adalah…", opsi: ["Kotak penyimpan nilai", "Perintah cetak", "Jenis perulangan", "Bentuk flowchart"], benar: 0, alasan: "Variabel menyimpan nilai yang bisa berubah.", topik: "Pseudocode dan variabel" }
    ],
    9: [
      { soal: "JIKA nilai ≥ 70 MAKA TULIS \"Lulus\". Jika nilai = 70, keluarannya…", opsi: ["Lulus", "Belum lulus", "Tidak ada", "Error"], benar: 0, alasan: "70 ≥ 70 bernilai T, jadi cabang JIKA dijalankan.", topik: "Percabangan" },
      { soal: "Berapa jalur yang dijalankan dalam satu percabangan JIKA/SELAIN ITU?", opsi: ["Nol", "Satu", "Dua", "Semua"], benar: 1, alasan: "Hanya satu jalur yang dijalankan.", topik: "Percabangan" },
      { soal: "Bagian SELAIN ITU dijalankan kalau syaratnya…", opsi: ["T", "F", "Kosong", "Selalu"], benar: 1, alasan: "SELAIN ITU dijalankan saat syarat JIKA bernilai F.", topik: "Percabangan" }
    ],
    10: [
      { soal: "UNTUK i ← 1 SAMPAI 5 berputar berapa kali?", opsi: ["4", "5", "6", "1"], benar: 1, alasan: "i = 1, 2, 3, 4, 5: lima putaran.", topik: "Perulangan" },
      { soal: "Perulangan yang berjalan selama syaratnya T adalah…", opsi: ["UNTUK", "SELAMA", "JIKA", "TULIS"], benar: 1, alasan: "SELAMA mengulang selama syaratnya T.", topik: "Perulangan" },
      { soal: "UNTUK i ← 1 SAMPAI 3, TULIS i. Keluarannya…", opsi: ["3", "1 2 3", "1 3", "0 1 2"], benar: 1, alasan: "Setiap putaran menulis nilai i: 1, 2, lalu 3.", topik: "Perulangan" }
    ]
  }
};
