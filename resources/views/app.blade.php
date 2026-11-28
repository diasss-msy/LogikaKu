<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LogikaKu</title>
  <meta name="description" content="Media belajar logika dan algoritma untuk siswa SMK kelas X TKJ dan RPL.">
  {{-- Dua baris bertanda "mode-server" dibuang saat membuat versi demo statis (lihat .github/workflows/pages.yml). --}}
  <meta name="lk-api" content="{{ url('/api') }}"><!-- mode-server -->
  <meta name="csrf-token" content="{{ csrf_token() }}"><!-- mode-server -->
  <meta name="theme-color" content="#F3F6F4" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#111113" media="(prefers-color-scheme: dark)">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="LogikaKu">
  <meta property="og:locale" content="id_ID">
  <meta property="og:title" content="LogikaKu: belajar logika dan algoritma">
  <meta property="og:description" content="Media belajar logika dan algoritma untuk siswa SMK kelas X TKJ dan RPL. 10 modul, latihan interaktif, kuis, dan lencana.">
  <meta property="og:url" content="{{ url('/') }}/">
  <meta property="og:image" content="{{ url('/') }}/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="LogikaKu: Nyalakan logikamu, satu modul satu LED.">
  <meta name="twitter:card" content="summary_large_image">
  <script>
    /* Terapkan mode warna sebelum halaman digambar supaya tidak berkedip. */
    (function () {
      try {
        var p = JSON.parse(localStorage.getItem("logikaku-pengaturan") || "{}"), r = document.documentElement;
        if (p.tema === "terang") r.setAttribute("data-theme", "light");
        if (p.tema === "gelap") r.setAttribute("data-theme", "dark");
        if (p.teks === "besar") r.setAttribute("data-teks", "besar");
        if (p.gerak === "kurang") r.setAttribute("data-gerak", "kurang");
      } catch (e) {}
    })();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/dasar.css">
  <link rel="stylesheet" href="css/komponen.css">
  <link rel="stylesheet" href="css/layar.css">
  <link rel="stylesheet" href="css/gerak.css">
</head>
<body>
  <a class="lewati" href="#utama" onclick="event.preventDefault();var m=document.getElementById('utama');if(m){m.focus();}">Lewati ke konten utama</a>
  <div id="akar"></div>
  <div id="pengumuman" class="sr-only" aria-live="polite" role="status"></div>
  <noscript><p style="padding:16px">LogikaKu butuh JavaScript. Nyalakan JavaScript di browser lalu muat ulang halaman ini.</p></noscript>

  <script src="data/contoh.js"></script>
  <script src="js/ikon.js"></script>
  <script src="js/status.js"></script>
  <script src="js/komponen.js"></script>
  <script src="js/app.js"></script>
  <script src="js/layar/beranda.js"></script>
  <script src="js/layar/auth.js"></script>
  <script src="js/layar/materi.js"></script>
  <script src="js/layar/latihan.js"></script>
  <script src="js/layar/kuis.js"></script>
  <script src="js/layar/lainnya.js"></script>
</body>
</html>
