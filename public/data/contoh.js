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

  /* ---------- Materi ----------
   * Tiap modul punya 3 bagian. Judul bagian dipakai juga sebagai "topik" soal kuis,
   * supaya tautan "Baca lagi" bisa langsung membuka bagian yang tepat. */
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
        judul: "Operator AND",
        ilustrasi: "gerbang",
        isi: [
          "Operator logika menggabungkan dua proposisi menjadi satu. Yang pertama adalah AND, ditulis ∧ dan dibaca \"dan\".",
          "p ∧ q bernilai T hanya kalau p dan q sama-sama T. Bayangkan lampu dengan dua saklar yang dipasang berurutan: lampu baru menyala kalau saklar A dan saklar B dua-duanya dinyalakan."
        ],
        kode: "p   q   p ∧ q\nT   T     T\nT   F     F\nF   T     F\nF   F     F",
        ingat: "AND hanya T kalau kedua sisi T. Satu saja F, hasilnya F."
      },
      {
        judul: "Operator OR",
        ilustrasi: "gerbang",
        isi: [
          "OR ditulis ∨ dan dibaca \"atau\". p ∨ q bernilai T kalau minimal satu sisi T.",
          "Bayangkan dua saklar yang dipasang berdampingan: lampu menyala kalau salah satu atau kedua saklar dinyalakan. OR di logika bersifat inklusif, jadi kalau keduanya T hasilnya tetap T."
        ],
        kode: "p   q   p ∨ q\nT   T     T\nT   F     T\nF   T     T\nF   F     F",
        contoh: "\"Kamu bisa masuk lab dengan kartu pelajar atau surat izin.\" Membawa keduanya tetap boleh masuk.",
        ingat: "OR hanya F kalau kedua sisi F."
      },
      {
        judul: "Negasi (NOT)",
        ilustrasi: "lampu",
        isi: [
          "NOT ditulis ¬ dan dibaca \"tidak\" atau \"bukan\". NOT hanya butuh satu proposisi dan membalik nilainya: T jadi F, F jadi T.",
          "Kalau NOT dipakai dua kali, nilainya kembali seperti semula: ¬¬p sama dengan p."
        ],
        kode: "p   ¬p\nT   F\nF   T",
        contoh: "p: \"Server menyala\" (T). Maka ¬p: \"Server tidak menyala\" bernilai F.",
        ingat: "NOT seperti saklar pembalik: yang menyala jadi mati, yang mati jadi menyala."
      }
    ],
    3: [
      {
        judul: "Implikasi",
        ilustrasi: "lampu",
        isi: [
          "Implikasi p → q dibaca \"kalau p maka q\". p disebut syarat dan q disebut hasil. Implikasi seperti sebuah janji.",
          "Janji hanya dilanggar kalau syaratnya terjadi (p = T) tetapi hasilnya tidak (q = F). Di tiga keadaan lain, p → q bernilai T."
        ],
        kode: "p   q   p → q\nT   T     T\nT   F     F\nF   T     T\nF   F     T",
        contoh: "\"Kalau kamu lulus kuis, kamu dapat lencana.\" Janji dilanggar hanya kalau kamu lulus tapi tidak dapat lencana. Kalau kamu belum lulus, janji itu tidak dilanggar apa pun yang terjadi.",
        ingat: "p → q hanya F di baris p = T dan q = F."
      },
      {
        judul: "Biimplikasi",
        ilustrasi: "lampu",
        isi: [
          "Biimplikasi p ↔ q dibaca \"p jika dan hanya jika q\".",
          "p ↔ q bernilai T kalau p dan q nilainya sama (sama-sama T atau sama-sama F). Kalau nilainya berbeda, hasilnya F."
        ],
        kode: "p   q   p ↔ q\nT   T     T\nT   F     F\nF   T     F\nF   F     T",
        contoh: "\"LED menyala jika dan hanya jika saklar ON.\" Saklar ON dan LED menyala, atau saklar OFF dan LED mati: keduanya sesuai (T).",
        ingat: "p ↔ q bernilai T kalau p dan q kembar."
      },
      {
        judul: "Kontraposisi",
        ilustrasi: "lampu",
        isi: [
          "Dari implikasi p → q bisa dibuat tiga bentuk lain: konvers q → p, invers ¬p → ¬q, dan kontraposisi ¬q → ¬p.",
          "Hanya kontraposisi yang nilainya selalu sama dengan p → q. Konvers dan invers belum tentu sama."
        ],
        kode: "Implikasi      p → q\nKonvers        q → p\nInvers        ¬p → ¬q\nKontraposisi  ¬q → ¬p",
        contoh: "\"Kalau hujan, jalan basah\" sama nilainya dengan \"Kalau jalan tidak basah, tidak hujan.\"",
        ingat: "Kontraposisi: tukar posisi p dan q, lalu beri NOT pada keduanya. Hasilnya selalu sama dengan p → q."
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
        judul: "Ekuivalensi",
        ilustrasi: "lampu",
        isi: [
          "Dua ekspresi disebut ekuivalen (ditulis ≡) kalau nilainya selalu sama di setiap baris tabel kebenaran.",
          "Cara paling pasti untuk memeriksanya: buat tabel kebenaran, lalu bandingkan kolom kedua ekspresi baris demi baris."
        ],
        kode: "p   q   p → q   ¬p ∨ q\nT   T     T        T\nT   F     F        F\nF   T     T        T\nF   F     T        T",
        contoh: "Kolom p → q dan ¬p ∨ q sama di keempat baris, jadi p → q ≡ ¬p ∨ q.",
        ingat: "Satu baris saja berbeda, berarti tidak ekuivalen."
      },
      {
        judul: "Hukum De Morgan",
        ilustrasi: "gerbang",
        isi: [
          "Hukum De Morgan menjelaskan cara memasukkan NOT ke dalam kurung.",
          "Negasi AND menjadi OR dari negasi, dan negasi OR menjadi AND dari negasi."
        ],
        kode: "¬(p ∧ q) ≡ ¬p ∨ ¬q\n¬(p ∨ q) ≡ ¬p ∧ ¬q",
        contoh: "\"Tidak benar bahwa server menyala dan internet tersambung\" sama dengan \"Server tidak menyala atau internet tidak tersambung.\"",
        ingat: "Saat NOT masuk ke dalam kurung, AND berganti OR dan OR berganti AND."
      },
      {
        judul: "Hukum logika lainnya",
        ilustrasi: "lampu",
        isi: [
          "Ada beberapa pasangan ekuivalen lain yang sering dipakai untuk menyederhanakan ekspresi.",
          "Negasi ganda membatalkan dirinya sendiri. Urutan p dan q pada AND dan OR boleh ditukar (komutatif). Implikasi bisa ditulis ulang dengan OR."
        ],
        kode: "¬¬p     ≡ p\np ∧ q   ≡ q ∧ p\np ∨ q   ≡ q ∨ p\np → q   ≡ ¬p ∨ q",
        ingat: "Ekspresi yang ekuivalen boleh saling menggantikan tanpa mengubah hasilnya."
      }
    ],
    6: [
      {
        judul: "Dekomposisi",
        ilustrasi: "kode",
        isi: [
          "Berpikir komputasional adalah cara memecahkan masalah seperti programmer. Langkah pertamanya dekomposisi.",
          "Dekomposisi berarti memecah masalah besar menjadi bagian kecil yang lebih mudah dikerjakan satu per satu."
        ],
        contoh: "Memasang konektor LAN dipecah jadi: kupas kabel, urutkan warna, potong rata, masukkan ke konektor, lalu jepit.",
        ingat: "Masalah yang terasa sulit biasanya jadi mudah setelah dipecah."
      },
      {
        judul: "Pengenalan pola",
        ilustrasi: "kode",
        isi: [
          "Pengenalan pola berarti mencari kesamaan antara masalah yang sedang dikerjakan dengan masalah yang pernah diselesaikan.",
          "Kalau polanya sama, cara penyelesaian yang lama bisa dipakai lagi sehingga pekerjaan lebih cepat."
        ],
        contoh: "Membuat kabel straight dan kabel cross langkahnya sama. Bedanya hanya urutan warna di salah satu ujung.",
        ingat: "Tanyakan: pernahkah aku menyelesaikan masalah yang mirip?"
      },
      {
        judul: "Abstraksi dan algoritma",
        ilustrasi: "kode",
        isi: [
          "Abstraksi berarti mengabaikan detail yang tidak penting dan fokus pada yang dibutuhkan untuk menyelesaikan masalah.",
          "Setelah itu, solusinya ditulis sebagai algoritma: langkah-langkah yang urut, jelas, dan ada akhirnya."
        ],
        kode: "1. Nyalakan komputer\n2. Buka browser\n3. Ketik alamat website\n4. Tekan Enter",
        contoh: "Untuk menghitung rata-rata nilai kelas, yang penting adalah nilai setiap siswa dan jumlah siswa. Warna seragam tidak penting.",
        ingat: "Langkah yang baik itu urut, jelas, dan ada akhirnya."
      }
    ],
    7: [
      {
        judul: "Simbol flowchart",
        ilustrasi: "kode",
        isi: [
          "Flowchart menggambar alur langkah dengan bentuk standar, sehingga siapa pun bisa membacanya dengan cara yang sama.",
          "Kapsul untuk Mulai dan Selesai, jajar genjang untuk input atau output, persegi panjang untuk proses, belah ketupat untuk keputusan, dan panah untuk arah alur."
        ],
        kode: "( Kapsul )        Mulai / Selesai\n/ Jajar genjang /  Input / Output\n[ Persegi ]       Proses\n< Belah ketupat >  Keputusan\n      ↓            Arah alur",
        ingat: "Setiap flowchart dimulai dari Mulai dan berakhir di Selesai."
      },
      {
        judul: "Alur berurutan",
        ilustrasi: "kode",
        isi: [
          "Flowchart dibaca dengan mengikuti arah panah, biasanya dari atas ke bawah.",
          "Pada alur berurutan, setiap langkah dijalankan tepat satu kali, satu setelah yang lain."
        ],
        kode: "( Mulai )\n    ↓\n/ Input panjang, lebar /\n    ↓\n[ luas ← panjang × lebar ]\n    ↓\n/ Output luas /\n    ↓\n( Selesai )",
        contoh: "Dengan panjang 5 dan lebar 3, flowchart di atas menampilkan luas 15.",
        ingat: "Ikuti panahnya, jangan lompat langkah."
      },
      {
        judul: "Keputusan di flowchart",
        ilustrasi: "kode",
        isi: [
          "Simbol keputusan (belah ketupat) berisi pertanyaan yang jawabannya Ya atau Tidak.",
          "Dari keputusan ada dua jalan keluar. Hanya satu yang diambil, lalu kedua jalan biasanya bergabung lagi sebelum Selesai."
        ],
        kode: "< n mod 2 = 0? >\n   Ya ↓      ↘ Tidak\n/ \"Genap\" /   / \"Ganjil\" /",
        contoh: "Untuk n = 7, 7 mod 2 = 1, jadi jawabannya Tidak dan flowchart menampilkan \"Ganjil\".",
        ingat: "Keputusan selalu punya dua jalan: Ya dan Tidak."
      }
    ],
    8: [
      {
        judul: "Apa itu pseudocode?",
        ilustrasi: "kode",
        isi: [
          "Pseudocode menulis algoritma dengan bahasa sehari-hari yang rapi, mirip kode program tetapi tidak terikat bahasa pemrograman tertentu.",
          "Satu baris berisi satu langkah dan dibaca dari atas ke bawah. BACA dipakai untuk menerima input, TULIS untuk menampilkan output."
        ],
        kode: "BACA nama\nTULIS \"Halo, \" + nama",
        contoh: "Kalau pengguna mengetik Dimas, keluarannya: Halo, Dimas",
        ingat: "Pseudocode yang baik bisa dipahami tanpa harus tahu bahasa pemrograman."
      },
      {
        judul: "Variabel dan penugasan",
        ilustrasi: "kode",
        isi: [
          "Variabel adalah kotak penyimpan nilai yang diberi nama, misalnya total atau nama.",
          "Tanda ← berarti \"isi dengan\". Nilai di sebelah kanan dihitung dulu, lalu disimpan ke variabel di sebelah kiri."
        ],
        kode: "total ← 0\ntotal ← total + 5\nTULIS total",
        ingat: "total ← total + i artinya: ambil nilai total yang lama, tambah i, lalu simpan lagi ke total."
      },
      {
        judul: "Menelusuri nilai variabel",
        ilustrasi: "kode",
        isi: [
          "Untuk mengetahui hasil pseudocode, catat nilai setiap variabel setelah setiap baris. Catatan ini disebut tabel penelusuran (trace table).",
          "Variabel hanya menyimpan nilai terakhir. Nilai lama hilang begitu variabel diisi nilai baru."
        ],
        kode: "1  a ← 3          a = 3\n2  b ← a + 2      a = 3,  b = 5\n3  a ← b × 2      a = 10, b = 5\n4  TULIS a        keluaran: 10",
        ingat: "Telusuri baris demi baris, jangan menebak dari baris terakhir saja."
      }
    ],
    9: [
      {
        judul: "JIKA dan SELAIN ITU",
        ilustrasi: "kode",
        isi: [
          "Percabangan memilih satu dari dua jalur berdasarkan syarat.",
          "Kalau syaratnya T, baris setelah JIKA dijalankan. Kalau F, baris setelah SELAIN ITU yang dijalankan."
        ],
        kode: "JIKA nilai ≥ 70 MAKA\n    TULIS \"Lulus\"\nSELAIN ITU\n    TULIS \"Belum lulus\"\nSELESAI JIKA",
        ingat: "Hanya satu jalur yang dijalankan, tidak pernah keduanya."
      },
      {
        judul: "Syarat dan operator perbandingan",
        ilustrasi: "kode",
        isi: [
          "Syarat percabangan adalah proposisi: nilainya T atau F. Biasanya syarat memakai operator perbandingan.",
          "Syarat juga bisa digabung dengan AND, OR, dan NOT dari Bab 1."
        ],
        kode: "=   sama dengan\n≠   tidak sama dengan\n<   lebih kecil\n>   lebih besar\n≤   lebih kecil atau sama\n≥   lebih besar atau sama",
        contoh: "Kalau suhu = 30, syarat suhu > 30 bernilai F, tetapi suhu ≥ 30 bernilai T. Syarat gabungan seperti nilai ≥ 70 AND hadir ≥ 80 hanya T kalau keduanya T.",
        ingat: "Perhatikan bedanya > dan ≥ saat nilainya tepat di batas."
      },
      {
        judul: "Percabangan bertingkat",
        ilustrasi: "kode",
        isi: [
          "Kalau pilihannya lebih dari dua, pakai SELAIN JIKA untuk menambah syarat.",
          "Syarat diperiksa dari atas ke bawah. Begitu ada syarat yang T, jalurnya dijalankan dan sisanya dilewati."
        ],
        kode: "JIKA nilai ≥ 90 MAKA\n    predikat ← \"A\"\nSELAIN JIKA nilai ≥ 80 MAKA\n    predikat ← \"B\"\nSELAIN JIKA nilai ≥ 70 MAKA\n    predikat ← \"C\"\nSELAIN ITU\n    predikat ← \"D\"\nSELESAI JIKA",
        contoh: "Untuk nilai 85, syarat pertama F, syarat kedua T, jadi predikat berisi B dan syarat lainnya tidak diperiksa lagi.",
        ingat: "Urutan syarat penting: yang paling ketat ditulis paling atas."
      }
    ],
    10: [
      {
        judul: "Perulangan UNTUK",
        ilustrasi: "kode",
        isi: [
          "Perulangan mengulang langkah yang sama tanpa menulisnya berkali-kali.",
          "UNTUK dipakai kalau jumlah putaran sudah diketahui. Variabel penghitung seperti i berubah otomatis di setiap putaran."
        ],
        kode: "UNTUK i ← 1 SAMPAI 3\n    TULIS i\nSELESAI UNTUK",
        contoh: "Keluarannya 1, 2, lalu 3. Jumlah putaran = nilai akhir − nilai awal + 1.",
        ingat: "UNTUK i ← 1 SAMPAI 3 berarti 3 putaran: i = 1, 2, lalu 3."
      },
      {
        judul: "Perulangan SELAMA",
        ilustrasi: "kode",
        isi: [
          "SELAMA mengulang langkah selama syaratnya T. Syarat diperiksa sebelum setiap putaran.",
          "Di dalam perulangan harus ada langkah yang mengubah syarat. Kalau tidak, syaratnya T terus dan perulangan tidak pernah berhenti."
        ],
        kode: "n ← 1\nSELAMA n ≤ 3 LAKUKAN\n    TULIS n\n    n ← n + 1\nSELESAI SELAMA",
        contoh: "Setelah n menjadi 4, syarat n ≤ 3 bernilai F dan perulangan berhenti.",
        ingat: "Pakai SELAMA kalau jumlah putaran belum pasti."
      },
      {
        judul: "Akumulator dalam perulangan",
        ilustrasi: "kode",
        isi: [
          "Akumulator adalah variabel yang mengumpulkan hasil dari setiap putaran, misalnya untuk menjumlahkan.",
          "Nilai awal akumulator diisi sebelum perulangan, lalu ditambah di dalam perulangan."
        ],
        kode: "total ← 0\nUNTUK i ← 1 SAMPAI 4\n    total ← total + i\nSELESAI UNTUK\nTULIS total        keluaran: 10",
        contoh: "total berubah 0 → 1 → 3 → 6 → 10.",
        ingat: "Isi nilai awal akumulator di luar perulangan, bukan di dalamnya."
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
      { soal: "Proposisi \"2 + 3 = 7\" bernilai…", opsi: ["T (benar)", "F (salah)", "Bukan proposisi", "T dan F"], benar: 1, alasan: "2 + 3 = 5, jadi pernyataan itu salah (F), tetapi tetap proposisi.", topik: "Apa itu Proposisi?" },
      { soal: "Kalimat \"Tolong matikan komputer itu.\" termasuk…", opsi: ["Proposisi bernilai T", "Proposisi bernilai F", "Bukan proposisi, karena kalimat perintah", "Kalimat terbuka"], benar: 2, alasan: "Kalimat perintah tidak bisa dinilai benar atau salah.", topik: "Kalimat yang bukan proposisi" },
      { soal: "Mana yang BUKAN proposisi?", opsi: ["Kabel UTP memiliki 8 inti kabel.", "Router adalah perangkat jaringan.", "1 byte sama dengan 8 bit.", "Berapa harga switch itu?"], benar: 3, alasan: "Kalimat tanya tidak bisa dinilai benar atau salah.", topik: "Kalimat yang bukan proposisi" },
      { soal: "p: \"Kabel LAN memakai konektor RJ45.\" Maka p adalah…", opsi: ["Variabel proposisi bernilai T", "Variabel proposisi bernilai F", "Kalimat terbuka", "Operator logika"], benar: 0, alasan: "p menamai sebuah proposisi, dan isinya benar, jadi p = T.", topik: "Variabel proposisi" },
      { soal: "Sebuah proposisi tidak boleh bernilai…", opsi: ["T saja", "F saja", "Salah", "T dan F sekaligus"], benar: 3, alasan: "Proposisi bernilai T atau F, tidak keduanya sekaligus.", topik: "Apa itu Proposisi?" },
      { soal: "Kalimat \"y > 3\" bisa menjadi proposisi kalau…", opsi: ["Ditambah tanda seru", "Nilai y sudah ditentukan, misalnya y = 5", "Diubah menjadi pertanyaan", "Tidak pernah bisa"], benar: 1, alasan: "Setelah y diganti nilai, kalimatnya bisa dinilai: 5 > 3 bernilai T.", topik: "Kalimat yang bukan proposisi" },
      { soal: "Huruf yang biasa dipakai sebagai variabel proposisi adalah…", opsi: ["T dan F", "p dan q", "∧ dan ∨", "1 dan 0"], benar: 1, alasan: "Proposisi diberi nama huruf kecil seperti p dan q.", topik: "Variabel proposisi" },
      { soal: "\"Semoga jaringan sekolah cepat hari ini.\" termasuk…", opsi: ["Proposisi bernilai T", "Proposisi bernilai F", "Kalimat terbuka", "Bukan proposisi, karena kalimat harapan"], benar: 3, alasan: "Kalimat harapan tidak bisa dinilai benar atau salah.", topik: "Kalimat yang bukan proposisi" }
    ],
    2: [
      { soal: "p = T dan q = F. Berapa nilai p ∨ q?", opsi: ["T", "F", "Tidak bisa ditentukan", "T dan F"], benar: 0, alasan: "OR bernilai T kalau minimal satu sisi T.", topik: "Operator OR" },
      { soal: "Berapa nilai ¬F?", opsi: ["F", "T", "¬T", "Tidak ada"], benar: 1, alasan: "NOT membalik nilai: F jadi T.", topik: "Negasi (NOT)" },
      { soal: "Kapan p ∧ q bernilai T?", opsi: ["Kalau salah satu T", "Kalau keduanya F", "Kalau keduanya T", "Selalu"], benar: 2, alasan: "AND hanya T jika kedua sisi T.", topik: "Operator AND" },
      { soal: "p = T dan q = T. Berapa nilai p ∨ q?", opsi: ["F", "Tidak bisa ditentukan", "Bukan proposisi", "T"], benar: 3, alasan: "OR bersifat inklusif: kalau keduanya T, hasilnya tetap T.", topik: "Operator OR" },
      { soal: "Kapan p ∨ q bernilai F?", opsi: ["Kalau p = T", "Kalau q = T", "Kalau p dan q sama-sama F", "Kalau p dan q sama-sama T"], benar: 2, alasan: "OR hanya F kalau kedua sisi F.", topik: "Operator OR" },
      { soal: "p: \"Kabel terpasang\" bernilai T. Berapa nilai ¬p?", opsi: ["F", "T", "¬F", "Tidak bisa ditentukan"], benar: 0, alasan: "NOT membalik T menjadi F.", topik: "Negasi (NOT)" },
      { soal: "Berapa nilai ¬¬T?", opsi: ["F", "¬T", "T", "Tidak ada"], benar: 2, alasan: "NOT dua kali mengembalikan nilai awal.", topik: "Negasi (NOT)" },
      { soal: "Lampu hanya menyala kalau saklar A dan saklar B sama-sama dinyalakan. Operator yang cocok adalah…", opsi: ["AND", "OR", "NOT", "Implikasi"], benar: 0, alasan: "Dua-duanya harus T, persis aturan AND.", topik: "Operator AND" },
      { soal: "p = F dan q = T. Berapa nilai p ∧ ¬q?", opsi: ["T", "F", "Tidak bisa ditentukan", "¬F"], benar: 1, alasan: "¬q = F, lalu F ∧ F = F.", topik: "Operator AND" },
      { soal: "p = F dan q = F. Berapa nilai ¬p ∨ q?", opsi: ["F", "Tidak bisa ditentukan", "Bukan proposisi", "T"], benar: 3, alasan: "¬p = T, lalu T ∨ F = T.", topik: "Operator OR" }
    ],
    3: [
      { soal: "Kapan p → q bernilai F?", opsi: ["p = T, q = T", "p = T, q = F", "p = F, q = T", "p = F, q = F"], benar: 1, alasan: "Janji hanya dilanggar kalau syarat terjadi tapi hasilnya tidak.", topik: "Implikasi" },
      { soal: "p = F dan q = T. Nilai p ↔ q adalah…", opsi: ["T", "F", "Tidak bisa ditentukan", "Sama dengan p → q"], benar: 1, alasan: "Biimplikasi T hanya kalau nilai p dan q sama.", topik: "Biimplikasi" },
      { soal: "p = F dan q = F. Nilai p → q adalah…", opsi: ["T", "F", "Tidak bisa ditentukan", "Bukan proposisi"], benar: 0, alasan: "Syaratnya tidak terjadi, jadi janji tidak dilanggar.", topik: "Implikasi" },
      { soal: "p = T dan q = T. Nilai p → q adalah…", opsi: ["F", "Tidak bisa ditentukan", "T", "Bukan proposisi"], benar: 2, alasan: "Syarat terjadi dan hasilnya juga terjadi, jadi janji ditepati.", topik: "Implikasi" },
      { soal: "\"Kalau kamu lulus kuis, kamu dapat lencana.\" Kapan janji ini dilanggar?", opsi: ["Tidak lulus, tidak dapat lencana", "Tidak lulus, tapi dapat lencana", "Lulus dan dapat lencana", "Lulus, tapi tidak dapat lencana"], benar: 3, alasan: "Dilanggar hanya kalau syaratnya terjadi (lulus) tetapi hasilnya tidak (tidak dapat lencana).", topik: "Implikasi" },
      { soal: "p ↔ q bernilai T kalau…", opsi: ["p dan q nilainya sama", "p bernilai T", "q bernilai F", "p dan q nilainya berbeda"], benar: 0, alasan: "Biimplikasi T kalau p dan q kembar.", topik: "Biimplikasi" },
      { soal: "p = T dan q = F. Nilai p ↔ q adalah…", opsi: ["T", "F", "Sama dengan ¬p", "Tidak bisa ditentukan"], benar: 1, alasan: "Nilai p dan q berbeda, jadi F.", topik: "Biimplikasi" },
      { soal: "Kontraposisi dari p → q adalah…", opsi: ["q → p", "¬p → ¬q", "¬q → ¬p", "p ↔ q"], benar: 2, alasan: "Tukar posisi p dan q, lalu beri NOT pada keduanya.", topik: "Kontraposisi" },
      { soal: "Kontraposisi dari \"Kalau hujan, jalan basah\" adalah…", opsi: ["Kalau jalan basah, hujan", "Kalau tidak hujan, jalan tidak basah", "Kalau hujan, jalan tidak basah", "Kalau jalan tidak basah, tidak hujan"], benar: 3, alasan: "¬q → ¬p: kalau jalan tidak basah, tidak hujan.", topik: "Kontraposisi" },
      { soal: "Ekspresi yang nilainya selalu sama dengan p → q adalah…", opsi: ["q → p", "¬q → ¬p", "¬p → ¬q", "p ∧ q"], benar: 1, alasan: "Hanya kontraposisi yang selalu sama nilainya dengan implikasi.", topik: "Kontraposisi" }
    ],
    4: [
      { soal: "Berapa baris tabel kebenaran untuk 2 variabel?", opsi: ["2", "4", "6", "8"], benar: 1, alasan: "2 × 2 = 4 kemungkinan.", topik: "Menghitung jumlah baris" },
      { soal: "Berapa baris tabel kebenaran untuk 3 variabel (p, q, r)?", opsi: ["3", "6", "8", "9"], benar: 2, alasan: "2 × 2 × 2 = 8 kemungkinan.", topik: "Menghitung jumlah baris" },
      { soal: "Jika p = T dan q = F, berapa nilai dari p ∧ q?", opsi: ["T (benar)", "F (salah)", "Tidak bisa ditentukan", "T dan F sekaligus"], benar: 1, alasan: "AND (∧) hanya bernilai T kalau p dan q sama-sama T, padahal q = F.", topik: "Apa itu Tabel Kebenaran?" },
      { soal: "Di tabel p ∨ q, berapa baris yang bernilai T?", opsi: ["1", "2", "3", "4"], benar: 2, alasan: "OR hanya F di baris p = F dan q = F. Tiga baris lainnya T.", topik: "Apa itu Tabel Kebenaran?" },
      { soal: "Urutan baris yang dianjurkan untuk 2 variabel adalah…", opsi: ["TT, TF, FT, FF", "FF, TT, TF, FT", "TF, FT, TT, FF", "Bebas, asal 3 baris"], benar: 0, alasan: "Mulai dari TT, TF, FT, lalu FF supaya tidak ada yang terlewat.", topik: "Apa itu Tabel Kebenaran?" },
      { soal: "Jika p = F, berapa nilai ¬p?", opsi: ["F", "¬F", "Tidak bisa ditentukan", "T"], benar: 3, alasan: "NOT membalik nilai: F jadi T.", topik: "Apa itu Tabel Kebenaran?" },
      { soal: "Berapa nilai ¬(p ∨ q) saat p = F dan q = F?", opsi: ["F", "Tidak bisa ditentukan", "Sama dengan p", "T"], benar: 3, alasan: "p ∨ q = F, lalu NOT membaliknya menjadi T.", topik: "Menghitung jumlah baris" },
      { soal: "Di tabel p ∧ q, berapa baris yang bernilai F?", opsi: ["1", "2", "3", "4"], benar: 2, alasan: "AND hanya T di baris TT. Tiga baris lainnya F.", topik: "Apa itu Tabel Kebenaran?" },
      { soal: "Kolom bantu di tabel kebenaran dipakai untuk…", opsi: ["Menghias tabel", "Menghitung bagian ekspresi sebelum hasil akhir", "Menambah variabel", "Mengganti kolom p"], benar: 1, alasan: "Kolom bantu seperti ¬p dihitung dulu supaya hasil akhir lebih mudah.", topik: "Menghitung jumlah baris" },
      { soal: "p = T dan q = T. Berapa nilai (p ∨ q) ∧ ¬p?", opsi: ["T", "Tidak bisa ditentukan", "T dan F", "F"], benar: 3, alasan: "p ∨ q = T, ¬p = F, jadi T ∧ F = F.", topik: "Menghitung jumlah baris" }
    ],
    5: [
      { soal: "¬(p ∧ q) ekuivalen dengan…", opsi: ["¬p ∧ ¬q", "¬p ∨ ¬q", "p ∨ q", "p ∧ ¬q"], benar: 1, alasan: "Hukum De Morgan: AND berganti OR saat NOT masuk ke dalam kurung.", topik: "Hukum De Morgan" },
      { soal: "¬(p ∨ q) ekuivalen dengan…", opsi: ["¬p ∧ ¬q", "¬p ∨ ¬q", "p ∧ q", "¬p ∨ q"], benar: 0, alasan: "OR berganti AND saat NOT masuk ke dalam kurung.", topik: "Hukum De Morgan" },
      { soal: "Dua ekspresi disebut ekuivalen kalau…", opsi: ["Hurufnya sama", "Nilainya sama di setiap baris", "Panjangnya sama", "Sama-sama bernilai T"], benar: 1, alasan: "Ekuivalen berarti nilainya selalu sama di setiap baris tabel kebenaran.", topik: "Ekuivalensi" },
      { soal: "¬¬p ekuivalen dengan…", opsi: ["¬p", "p ∧ ¬p", "T", "p"], benar: 3, alasan: "Negasi ganda membatalkan dirinya sendiri.", topik: "Hukum logika lainnya" },
      { soal: "p ∧ q ekuivalen dengan…", opsi: ["q ∧ p", "p ∨ q", "¬p ∧ ¬q", "q → p"], benar: 0, alasan: "Urutan pada AND boleh ditukar (komutatif).", topik: "Hukum logika lainnya" },
      { soal: "p → q ekuivalen dengan…", opsi: ["p ∧ ¬q", "q → p", "¬p ∨ q", "¬p ∧ q"], benar: 2, alasan: "Kolom p → q dan ¬p ∨ q sama di keempat baris.", topik: "Hukum logika lainnya" },
      { soal: "Negasi dari \"Saya membawa laptop dan charger\" adalah…", opsi: ["Saya tidak membawa laptop dan tidak membawa charger", "Saya tidak membawa laptop atau tidak membawa charger", "Saya membawa laptop atau charger", "Saya tidak membawa laptop"], benar: 1, alasan: "De Morgan: ¬(p ∧ q) ≡ ¬p ∨ ¬q, jadi \"dan\" berganti \"atau\".", topik: "Hukum De Morgan" },
      { soal: "Negasi dari \"Wi-Fi menyala atau kabel LAN tersambung\" adalah…", opsi: ["Wi-Fi tidak menyala atau kabel LAN tidak tersambung", "Wi-Fi menyala dan kabel LAN tersambung", "Wi-Fi tidak menyala dan kabel LAN tidak tersambung", "Kabel LAN tidak tersambung"], benar: 2, alasan: "De Morgan: ¬(p ∨ q) ≡ ¬p ∧ ¬q, jadi \"atau\" berganti \"dan\".", topik: "Hukum De Morgan" },
      { soal: "Cara paling pasti membuktikan dua ekspresi ekuivalen adalah…", opsi: ["Mencoba satu baris saja", "Menghitung jumlah hurufnya", "Melihat operatornya sama atau tidak", "Membandingkan kolom keduanya di tabel kebenaran"], benar: 3, alasan: "Semua baris harus dicek. Satu baris berbeda berarti tidak ekuivalen.", topik: "Ekuivalensi" },
      { soal: "p = T dan q = F. Nilai ¬(p ∧ q) dan ¬p ∨ ¬q berturut-turut adalah…", opsi: ["T dan T", "T dan F", "F dan T", "F dan F"], benar: 0, alasan: "p ∧ q = F sehingga ¬(p ∧ q) = T. ¬p ∨ ¬q = F ∨ T = T. Sama, sesuai De Morgan.", topik: "Hukum De Morgan" }
    ],
    6: [
      { soal: "Memecah masalah besar menjadi langkah kecil disebut…", opsi: ["Abstraksi", "Dekomposisi", "Algoritma", "Debugging"], benar: 1, alasan: "Dekomposisi = memecah masalah menjadi bagian kecil.", topik: "Dekomposisi" },
      { soal: "Langkah pertama memasang konektor LAN adalah…", opsi: ["Kupas kulit luar kabel", "Jepit konektor", "Potong rata ujung kabel", "Masukkan ke konektor"], benar: 0, alasan: "Kabel harus dikupas dulu sebelum diurutkan.", topik: "Dekomposisi" },
      { soal: "Ciri langkah algoritma yang baik adalah…", opsi: ["Acak", "Sepanjang mungkin", "Urut dan jelas", "Tanpa akhir"], benar: 2, alasan: "Langkah yang baik itu urut, jelas, dan ada akhirnya.", topik: "Abstraksi dan algoritma" },
      { soal: "Mengabaikan detail yang tidak penting untuk menyelesaikan masalah disebut…", opsi: ["Dekomposisi", "Pengenalan pola", "Algoritma", "Abstraksi"], benar: 3, alasan: "Abstraksi = fokus pada yang penting saja.", topik: "Abstraksi dan algoritma" },
      { soal: "Kabel straight dan cross dibuat dengan langkah yang hampir sama. Menyadari kesamaan ini disebut…", opsi: ["Abstraksi", "Pengenalan pola", "Debugging", "Dekomposisi"], benar: 1, alasan: "Pengenalan pola = melihat kesamaan dengan masalah lain.", topik: "Pengenalan pola" },
      { soal: "Untuk menghitung rata-rata nilai kelas, informasi mana yang TIDAK penting?", opsi: ["Nilai setiap siswa", "Jumlah siswa", "Warna seragam siswa", "Rumus rata-rata"], benar: 2, alasan: "Warna seragam tidak memengaruhi rata-rata, jadi diabaikan (abstraksi).", topik: "Abstraksi dan algoritma" },
      { soal: "Urutan langkah yang jelas dan berakhir untuk menyelesaikan masalah disebut…", opsi: ["Algoritma", "Pola", "Variabel", "Data"], benar: 0, alasan: "Itulah pengertian algoritma.", topik: "Abstraksi dan algoritma" },
      { soal: "\"Membuat website sekolah\" dipecah jadi desain, menulis isi, membuat halaman, lalu uji coba. Ini contoh…", opsi: ["Abstraksi", "Pengenalan pola", "Dekomposisi", "Perulangan"], benar: 2, alasan: "Masalah besar dipecah menjadi bagian kecil.", topik: "Dekomposisi" },
      { soal: "Kenapa pengenalan pola berguna?", opsi: ["Supaya langkahnya makin panjang", "Supaya cara lama bisa dipakai lagi untuk masalah yang mirip", "Supaya tidak perlu algoritma", "Supaya detail penting dibuang"], benar: 1, alasan: "Kalau polanya sama, solusi lama bisa dipakai lagi sehingga lebih cepat.", topik: "Pengenalan pola" },
      { soal: "Dalam algoritma membuka website, \"Buka browser\" harus dilakukan sebelum…", opsi: ["Nyalakan komputer", "Colokkan kabel listrik", "Tekan tombol power", "Ketik alamat website"], benar: 3, alasan: "Alamat website diketik di browser, jadi browser dibuka lebih dulu.", topik: "Abstraksi dan algoritma" }
    ],
    7: [
      { soal: "Bentuk belah ketupat di flowchart berarti…", opsi: ["Mulai", "Proses", "Keputusan", "Input"], benar: 2, alasan: "Belah ketupat = keputusan, dengan jalan Ya dan Tidak.", topik: "Simbol flowchart" },
      { soal: "Bentuk jajar genjang dipakai untuk…", opsi: ["Input atau output", "Keputusan", "Selesai", "Panah"], benar: 0, alasan: "Jajar genjang = input atau output.", topik: "Simbol flowchart" },
      { soal: "Flowchart selalu diawali dengan…", opsi: ["Keputusan", "Mulai", "Proses", "Output"], benar: 1, alasan: "Setiap flowchart dimulai dari Mulai.", topik: "Simbol flowchart" },
      { soal: "Simbol persegi panjang dipakai untuk…", opsi: ["Keputusan", "Input", "Mulai", "Proses, misalnya menghitung"], benar: 3, alasan: "Persegi panjang = proses.", topik: "Simbol flowchart" },
      { soal: "Langkah \"luas ← panjang × lebar\" digambar dengan simbol…", opsi: ["Proses (persegi panjang)", "Keputusan (belah ketupat)", "Terminal (kapsul)", "Input/output (jajar genjang)"], benar: 0, alasan: "Menghitung adalah proses.", topik: "Alur berurutan" },
      { soal: "Langkah \"Input panjang dan lebar\" digambar dengan simbol…", opsi: ["Proses", "Input/output (jajar genjang)", "Keputusan", "Terminal"], benar: 1, alasan: "Menerima input memakai jajar genjang.", topik: "Simbol flowchart" },
      { soal: "Berapa jalan keluar dari simbol keputusan?", opsi: ["Satu", "Tiga", "Dua: Ya dan Tidak", "Tidak ada"], benar: 2, alasan: "Keputusan selalu punya jalan Ya dan Tidak.", topik: "Keputusan di flowchart" },
      { soal: "Flowchart dibaca dengan mengikuti…", opsi: ["Warna simbol", "Ukuran simbol", "Urutan abjad", "Arah panah"], benar: 3, alasan: "Panah menunjukkan langkah berikutnya.", topik: "Alur berurutan" },
      { soal: "n = 7. Di keputusan \"n mod 2 = 0?\", jalur yang diambil adalah…", opsi: ["Ya, lalu tampilkan \"Genap\"", "Tidak, lalu tampilkan \"Ganjil\"", "Kedua jalur", "Flowchart berhenti"], benar: 1, alasan: "7 mod 2 = 1, bukan 0, jadi jawabannya Tidak.", topik: "Keputusan di flowchart" },
      { soal: "Panjang = 5 dan lebar = 3. Output flowchart luas persegi panjang adalah…", opsi: ["15", "8", "53", "2"], benar: 0, alasan: "luas = 5 × 3 = 15.", topik: "Alur berurutan" }
    ],
    8: [
      { soal: "Setelah total ← 2 lalu total ← total + 3, nilai total adalah…", opsi: ["2", "3", "5", "23"], benar: 2, alasan: "Nilai lama 2 ditambah 3, hasilnya 5.", topik: "Variabel dan penugasan" },
      { soal: "Tanda ← pada pseudocode berarti…", opsi: ["Lebih kecil", "Isi dengan", "Kembali", "Sama dengan"], benar: 1, alasan: "← berarti mengisi variabel dengan nilai.", topik: "Variabel dan penugasan" },
      { soal: "Variabel adalah…", opsi: ["Kotak penyimpan nilai", "Perintah cetak", "Jenis perulangan", "Bentuk flowchart"], benar: 0, alasan: "Variabel menyimpan nilai yang bisa berubah.", topik: "Variabel dan penugasan" },
      { soal: "Perintah pseudocode untuk menampilkan nilai ke layar adalah…", opsi: ["BACA", "SIMPAN", "ULANG", "TULIS"], benar: 3, alasan: "TULIS menampilkan output.", topik: "Apa itu pseudocode?" },
      { soal: "Perintah BACA nama dipakai untuk…", opsi: ["Menampilkan nama", "Menerima input dan menyimpannya di variabel nama", "Menghapus nama", "Mengulang nama"], benar: 1, alasan: "BACA menerima input dari pengguna.", topik: "Apa itu pseudocode?" },
      { soal: "a ← 3, lalu b ← a + 2, lalu a ← b × 2. Berapa nilai a di akhir?", opsi: ["3", "5", "10", "6"], benar: 2, alasan: "b = 5, lalu a = 5 × 2 = 10.", topik: "Menelusuri nilai variabel" },
      { soal: "x ← 4 lalu x ← 9. Nilai x sekarang…", opsi: ["9", "4", "13", "4 dan 9"], benar: 0, alasan: "Variabel hanya menyimpan nilai terakhir.", topik: "Menelusuri nilai variabel" },
      { soal: "Pseudocode dibaca dengan urutan…", opsi: ["Dari bawah ke atas", "Acak", "Dari baris terpanjang", "Dari atas ke bawah, satu baris satu langkah"], benar: 3, alasan: "Setiap baris dijalankan berurutan dari atas.", topik: "Apa itu pseudocode?" },
      { soal: "a ← 2, b ← 5, a ← a + b, b ← a − 1. Nilai b di akhir adalah…", opsi: ["5", "6", "7", "4"], benar: 1, alasan: "a menjadi 7, lalu b = 7 − 1 = 6.", topik: "Menelusuri nilai variabel" },
      { soal: "Tabel penelusuran (trace table) dipakai untuk…", opsi: ["Mencatat nilai setiap variabel setelah setiap baris", "Menggambar flowchart", "Menghitung jumlah baris kode", "Mengganti nama variabel"], benar: 0, alasan: "Dengan mencatat nilai baris demi baris, hasil pseudocode bisa diketahui dengan pasti.", topik: "Menelusuri nilai variabel" }
    ],
    9: [
      { soal: "JIKA nilai ≥ 70 MAKA TULIS \"Lulus\". Jika nilai = 70, keluarannya…", opsi: ["Lulus", "Belum lulus", "Tidak ada", "Error"], benar: 0, alasan: "70 ≥ 70 bernilai T, jadi cabang JIKA dijalankan.", topik: "JIKA dan SELAIN ITU" },
      { soal: "Berapa jalur yang dijalankan dalam satu percabangan JIKA/SELAIN ITU?", opsi: ["Nol", "Satu", "Dua", "Semua"], benar: 1, alasan: "Hanya satu jalur yang dijalankan.", topik: "JIKA dan SELAIN ITU" },
      { soal: "Bagian SELAIN ITU dijalankan kalau syaratnya…", opsi: ["T", "Kosong", "F", "Selalu"], benar: 2, alasan: "SELAIN ITU dijalankan saat syarat JIKA bernilai F.", topik: "JIKA dan SELAIN ITU" },
      { soal: "Syarat \"suhu > 30\" saat suhu = 30 bernilai…", opsi: ["T", "Tidak bisa ditentukan", "30", "F"], benar: 3, alasan: "30 tidak lebih besar dari 30. Kalau ingin termasuk 30, pakai ≥.", topik: "Syarat dan operator perbandingan" },
      { soal: "Operator ≠ berarti…", opsi: ["Tidak sama dengan", "Lebih kecil", "Sama dengan", "Lebih besar atau sama dengan"], benar: 0, alasan: "≠ dibaca \"tidak sama dengan\".", topik: "Syarat dan operator perbandingan" },
      { soal: "Syarat \"nilai ≥ 70 AND hadir ≥ 80\" bernilai T kalau…", opsi: ["Salah satu syarat T", "Kedua syarat T", "Kedua syarat F", "Selalu T"], benar: 1, alasan: "AND hanya T kalau kedua sisi T.", topik: "Syarat dan operator perbandingan" },
      { soal: "Dengan aturan predikat ≥ 90 A, ≥ 80 B, ≥ 70 C, selain itu D, nilai 85 mendapat…", opsi: ["A", "C", "B", "D"], benar: 2, alasan: "85 tidak ≥ 90, tetapi ≥ 80, jadi B.", topik: "Percabangan bertingkat" },
      { soal: "Dengan aturan predikat yang sama, nilai 65 mendapat…", opsi: ["A", "B", "C", "D"], benar: 3, alasan: "Semua syarat F, jadi jalur SELAIN ITU: D.", topik: "Percabangan bertingkat" },
      { soal: "Pada percabangan bertingkat, syarat diperiksa…", opsi: ["Semuanya sekaligus", "Dari bawah ke atas", "Dari atas, berhenti di syarat pertama yang T", "Secara acak"], benar: 2, alasan: "Begitu satu syarat T, jalurnya dijalankan dan sisanya dilewati.", topik: "Percabangan bertingkat" },
      { soal: "JIKA stok = 0 MAKA TULIS \"Habis\" SELAIN ITU TULIS \"Tersedia\". Jika stok = 12, keluarannya…", opsi: ["Tersedia", "Habis", "12", "Tidak ada"], benar: 0, alasan: "12 = 0 bernilai F, jadi jalur SELAIN ITU dijalankan.", topik: "JIKA dan SELAIN ITU" }
    ],
    10: [
      { soal: "UNTUK i ← 1 SAMPAI 5 berputar berapa kali?", opsi: ["4", "5", "6", "1"], benar: 1, alasan: "i = 1, 2, 3, 4, 5: lima putaran.", topik: "Perulangan UNTUK" },
      { soal: "Perulangan yang berjalan selama syaratnya T adalah…", opsi: ["UNTUK", "JIKA", "TULIS", "SELAMA"], benar: 3, alasan: "SELAMA mengulang selama syaratnya T.", topik: "Perulangan SELAMA" },
      { soal: "UNTUK i ← 1 SAMPAI 3, TULIS i. Keluarannya…", opsi: ["3", "1 3", "1 2 3", "0 1 2"], benar: 2, alasan: "Setiap putaran menulis nilai i: 1, 2, lalu 3.", topik: "Perulangan UNTUK" },
      { soal: "UNTUK i ← 2 SAMPAI 6 berputar berapa kali?", opsi: ["4", "5", "6", "2"], benar: 1, alasan: "6 − 2 + 1 = 5 putaran: i = 2, 3, 4, 5, 6.", topik: "Perulangan UNTUK" },
      { soal: "n ← 1, lalu SELAMA n ≤ 3: TULIS n, n ← n + 1. Keluarannya…", opsi: ["1 2 3", "1 2", "1 2 3 4", "3"], benar: 0, alasan: "Saat n = 4, syarat n ≤ 3 bernilai F dan perulangan berhenti.", topik: "Perulangan SELAMA" },
      { soal: "Apa yang terjadi kalau di dalam SELAMA tidak ada langkah yang mengubah syarat?", opsi: ["Perulangan berhenti sendiri", "Perulangan dilewati", "Perulangan tidak pernah berhenti", "Program pindah ke UNTUK"], benar: 2, alasan: "Syaratnya T terus, jadi perulangan tidak berhenti.", topik: "Perulangan SELAMA" },
      { soal: "total ← 0, lalu UNTUK i ← 1 SAMPAI 4: total ← total + i. Nilai total di akhir…", opsi: ["4", "5", "1", "10"], benar: 3, alasan: "0 + 1 + 2 + 3 + 4 = 10.", topik: "Akumulator dalam perulangan" },
      { soal: "Di mana sebaiknya total ← 0 ditulis?", opsi: ["Sebelum perulangan", "Di dalam perulangan", "Sesudah perulangan", "Tidak perlu ditulis"], benar: 0, alasan: "Nilai awal akumulator diisi sekali, sebelum perulangan.", topik: "Akumulator dalam perulangan" },
      { soal: "x ← 10, lalu SELAMA x > 0: x ← x − 3. Berapa kali perulangan berjalan?", opsi: ["3", "4", "10", "Tidak berhenti"], benar: 1, alasan: "x berubah 10 → 7 → 4 → 1 → −2. Empat putaran, lalu x > 0 bernilai F.", topik: "Perulangan SELAMA" },
      { soal: "Kalau total ← 0 ditulis di DALAM perulangan penjumlahan, hasil akhirnya…", opsi: ["Tetap benar", "Selalu 0", "Hanya berisi nilai i terakhir", "Dua kali lipat"], benar: 2, alasan: "total dikosongkan di setiap putaran, jadi yang tersisa hanya 0 + i terakhir.", topik: "Akumulator dalam perulangan" }
    ]
  }
};
