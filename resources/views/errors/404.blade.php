<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Halaman tidak ditemukan · LogikaKu</title>
  <meta name="robots" content="noindex">
  <link rel="icon" href="{{ url('/') }}/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@700&display=swap">
  <script>
    /* Ikuti pilihan mode warna yang tersimpan di aplikasi. */
    (function () { try { var t = JSON.parse(localStorage.getItem("logikaku-pengaturan") || "{}").tema; if (t === "gelap") document.documentElement.setAttribute("data-theme", "dark"); if (t === "terang") document.documentElement.setAttribute("data-theme", "light"); } catch (e) {} })();
  </script>
  <style>
    /* Halaman 404 berdiri sendiri (CSS di sini), supaya tetap tampil walau alamatnya salah folder. */
    :root { --bg: #F3F6F4; --surface: #FFFFFF; --border: #DDE3E0; --text: #14213D; --muted: #4A5568; --primary: #1F4FD1; --on-primary: #FFFFFF; --led: #FFC233; --mati: #D5DBD8; --kabel: #C5CDC9; --grid: rgba(31, 79, 209, .14); }
    :root[data-theme="dark"] { --bg: #111113; --surface: #1A1A1E; --border: #2E2E35; --text: #EDEDF0; --muted: #A1A1AA; --primary: #8AA8FF; --on-primary: #111113; --mati: #2E2E35; --kabel: #3A3A42; --grid: rgba(138, 168, 255, .12); }
    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) { --bg: #111113; --surface: #1A1A1E; --border: #2E2E35; --text: #EDEDF0; --muted: #A1A1AA; --primary: #8AA8FF; --on-primary: #111113; --mati: #2E2E35; --kabel: #3A3A42; --grid: rgba(138, 168, 255, .12); }
    }
    * { box-sizing: border-box; margin: 0; }
    body { min-height: 100vh; display: grid; place-items: center; padding: 24px 16px; font: 18px/1.5 "Atkinson Hyperlegible", system-ui, sans-serif; color: var(--text);
      background: radial-gradient(circle, var(--grid) 1.2px, transparent 1.6px) 0 0 / 22px 22px, var(--bg); }
    main { width: 100%; max-width: 560px; background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 40px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
    .logo { display: inline-flex; align-items: center; gap: 10px; font: 800 22px "Bricolage Grotesque", sans-serif; color: var(--text); text-decoration: none; }
    .logo span { width: 34px; height: 34px; border-radius: 9px; background: #14213D; color: var(--led); display: grid; place-items: center; font-size: 19px; }
    .putus { display: flex; align-items: center; margin: 16px 0 8px; }
    .led { width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; font: 700 26px "JetBrains Mono", monospace; background: var(--mati); color: var(--muted); }
    .led.nyala { background: var(--led); color: #14213D; box-shadow: 0 0 0 10px rgba(255, 194, 51, .22); animation: kedip 3s ease-in-out infinite; }
    .kabel { width: 44px; height: 6px; border-radius: 3px; background: var(--kabel); }
    .kabel.hidup { background: var(--primary); }
    .celah { width: 44px; display: flex; justify-content: space-between; align-items: center; position: relative; }
    .celah i { width: 16px; height: 6px; border-radius: 3px; background: var(--kabel); }
    .celah i:first-child { background: var(--primary); transform: rotate(-14deg); transform-origin: left center; }
    .celah b { position: absolute; left: 50%; top: 50%; width: 10px; height: 10px; margin: -5px; border-radius: 50%; background: var(--led); animation: percik 1.6s ease-in-out infinite; }
    h1 { font: 800 clamp(28px, 6vw, 36px)/1.1 "Bricolage Grotesque", sans-serif; }
    p { color: var(--muted); max-width: 40ch; }
    .tombol { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 8px; }
    .tombol a, .tombol button { min-height: 48px; padding: 0 22px; border-radius: 12px; display: inline-flex; align-items: center; font: 700 17px "Atkinson Hyperlegible", sans-serif; text-decoration: none; cursor: pointer; }
    .utama { background: var(--primary); color: var(--on-primary); border: 0; }
    .kedua { background: transparent; color: var(--text); border: 2px solid var(--border); }
    a:focus-visible, button:focus-visible { outline: 3px solid var(--primary); outline-offset: 3px; }
    @keyframes kedip { 0%, 100% { opacity: 1; } 92% { opacity: 1; } 95% { opacity: .55; } 97% { opacity: 1; } }
    @keyframes percik { 0%, 100% { opacity: 0; transform: scale(.4); } 45% { opacity: 1; transform: scale(1.2); } 60% { opacity: .2; transform: scale(.6); } }
    @media (prefers-reduced-motion: reduce) { .led.nyala, .celah b { animation: none; } .celah b { opacity: .8; } }
  </style>
</head>
<body>
  <main>
    <a class="logo" href="{{ url('/') }}/#/beranda"><span aria-hidden="true">L</span>LogikaKu</a>
    <div class="putus" aria-hidden="true">
      <span class="led nyala">4</span><span class="kabel hidup"></span><span class="led">0</span><span class="celah"><i></i><b></b><i></i></span><span class="led">4</span>
    </div>
    <h1>Halaman tidak ditemukan</h1>
    <p>Kabelnya putus di sini. Alamat yang kamu buka tidak ada di LogikaKu, mungkin salah ketik atau sudah dipindah.</p>
    <div class="tombol">
      <a class="utama" href="{{ url('/') }}/#/beranda">Ke Beranda</a>
      <button type="button" class="kedua" onclick="history.length > 1 ? history.back() : location.assign(this.previousElementSibling.href)">Kembali</button>
    </div>
  </main>
</body>
</html>
