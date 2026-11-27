/* Layar 11 Landing, 12a/12b/12c Masuk dan Daftar, 13a/13b/13c Lupa kata sandi.
 * Validasi hanya di sisi klien. Tidak ada akun sungguhan dan kata sandi tidak disimpan. */
(function () {
  var I = LK.ikon, esc = LK.esc, K = LK.k;
  var POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ---------- Bantuan formulir ---------- */
  LK.form = function (form, o) {
    var menekanKirim = false;
    form.addEventListener("pointerdown", function (e) { if (e.target.closest('button[type="submit"]')) { menekanKirim = true; setTimeout(function () { menekanKirim = false; }, 600); } });
    function kolom(id) { return form.querySelector('[data-kolom="' + id + '"]'); }
    function setGalat(id, pesan) {
      var k = kolom(id), inp = form.querySelector("#" + id);
      k.classList.toggle("error", !!pesan);
      k.querySelector(".galat span").textContent = pesan || "";
      if (pesan) inp.setAttribute("aria-invalid", "true"); else inp.removeAttribute("aria-invalid");
    }
    function nilai() { var v = {}; Object.keys(o.aturan).forEach(function (id) { v[id] = form.querySelector("#" + id).value; }); return v; }
    function cek(id) { var p = o.aturan[id](form.querySelector("#" + id).value, nilai()); setGalat(id, p); return p; }
    Object.keys(o.aturan).forEach(function (id) {
      var inp = form.querySelector("#" + id);
      inp.addEventListener("blur", function (e) {
        /* Lewati validasi blur kalau fokus pindah ke tombol kirim: kirim akan memvalidasi semuanya,
         * dan pesan yang hilang di sini bisa menggeser tombol sebelum klik selesai. */
        if (menekanKirim || (e.relatedTarget && e.relatedTarget.type === "submit")) return;
        if (inp.value !== "" || kolom(id).classList.contains("error")) cek(id);
      });
      inp.addEventListener("input", function () { if (o.saatKetik) o.saatKetik(nilai()); });
    });
    function ringkas(judul, galat) {
      var lama = form.querySelector(".ringkasan-galat"); if (lama) lama.remove();
      var h = '<div class="ringkasan-galat" role="alert" tabindex="-1"><h2>' + I("alert-circle") + esc(judul) + "</h2><ul>" +
        galat.map(function (g) { return '<li><a href="#' + g.id + '" data-ke="' + g.id + '">' + esc(g.pesan) + "</a></li>"; }).join("") + "</ul></div>";
      form.insertAdjacentHTML("afterbegin", h);
      var r = form.querySelector(".ringkasan-galat");
      r.querySelectorAll("[data-ke]").forEach(function (a) {
        a.addEventListener("click", function (e) { e.preventDefault(); form.querySelector("#" + a.getAttribute("data-ke")).focus(); });
      });
      r.focus();
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var galat = [];
      Object.keys(o.aturan).forEach(function (id) { var p = cek(id); if (p) galat.push({ id: id, pesan: p }); });
      if (galat.length) { ringkas(o.judulGalat || "Ada yang perlu diperbaiki", galat); return; }
      var lama = form.querySelector(".ringkasan-galat"); if (lama) lama.remove();
      var btn = form.querySelector('button[type="submit"]');
      var w = btn.offsetWidth; btn.style.width = w + "px";
      btn.disabled = true; btn.setAttribute("aria-busy", "true");
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span><span>Memuat...</span>';
      setTimeout(function () { o.kirim(nilai(), { ringkas: ringkas, setGalat: setGalat, pulihkan: function (label) { btn.disabled = false; btn.removeAttribute("aria-busy"); btn.innerHTML = "<span>" + esc(label) + "</span>"; } }); }, 600);
    });
    return { setGalat: setGalat, ringkas: ringkas };
  };
  var wajib = function (label) { return function (v) { return v.trim() ? null : label + " belum diisi."; }; };
  var aturanEmail = function (v) { return !v.trim() ? "Email belum diisi." : POLA_EMAIL.test(v.trim()) ? null : "Format email belum benar. Contoh: nama@email.com"; };
  var aturanSandiBaru = function (v) { return !v ? "Kata sandi belum diisi." : v.length < 8 ? "Kata sandi minimal 8 karakter." : null; };

  /* ---------- Kerangka layar akun ---------- */
  function rangkaianMini() {
    var nama = ["Proposisi", "Operator", "Implikasi", "Tabel", "Ekuivalen"], led = "", kabel = "";
    for (var i = 0; i < 4; i++) kabel += '<span class="rangkaian-kabel' + (i < 3 ? " hidup" : "") + '" style="left:' + (10 + i * 20) + '%;width:20%"><span class="arus"></span></span>';
    nama.forEach(function (n, i) {
      led += '<span class="rangkaian-led"><span class="led ' + (i < 3 ? "selesai" : i === 3 ? "nyala" : "") + '">' + (i < 3 ? I("check", "ikon-sm") : i + 1) + '</span><span class="rangkaian-label">' + n + "</span></span>";
    });
    return '<div class="rangkaian" aria-hidden="true"><div class="rangkaian-baris">' + kabel + led + "</div></div>";
  }
  function layarAkun(o) {
    return {
      shell: "polos", judul: o.judul,
      html: '<div class="akun">' +
        '<aside class="akun-merek" aria-hidden="true"><div class="titik-breadboard"></div>' +
        '<a class="logo logo-terang" href="#/landing" tabindex="-1"><span class="logo-chip kuning">L</span>LogikaKu</a>' +
        '<div class="akun-merek-isi"><p class="akun-merek-judul">Satu akun, semua progresmu tersimpan.</p>' +
        "<p>Belajar di HP saat istirahat, lanjutkan di laptop lab. Rangkaianmu tetap menyala di modul terakhir.</p>" +
        '<div class="kartu kartu-melayang"><p class="caption">Beranda</p><p class="h3-like">Arus belajarmu sampai Modul 4.</p>' + rangkaianMini() + "</div></div>" +
        '<p class="caption akun-merek-kaki">Media belajar logika dan algoritma untuk kelas X TKJ dan RPL.</p></aside>' +
        '<div class="akun-kanan"><header class="topbar dengan-kembali akun-topbar"><a class="tombol-ikon" href="' + o.kembali + '" aria-label="Kembali">' + I("chevron-left", "ikon-lg") + "</a>" +
        K.logo("#/landing") + '<span class="spacer"></span>' + K.tombolTema() + "</header>" +
        '<main id="utama" class="akun-form" tabindex="-1">' + o.html + "</main></div></div>",
      pasang: o.pasang
    };
  }

  /* ---------- 12a / 12c Masuk ---------- */
  LK.rute("/masuk", function (ctx) {
    var gagal = !!ctx.q.gagal;
    var html = "<h1>Masuk</h1><p class=\"redup\">Lanjutkan belajar dari langkah terakhirmu.</p>" +
      '<form class="tumpuk" novalidate>' +
      (gagal ? '<div class="ringkasan-galat" role="alert" tabindex="-1"><h2>' + I("alert-circle") + 'Belum bisa masuk</h2><p>Email atau kata sandi belum cocok.</p><p><a href="#sandi" data-ke="sandi">Ke kolom kata sandi</a></p></div>' : "") +
      K.kolom({ id: "email", label: "Email", type: "email", autocomplete: "email", placeholder: "nama@email.com", nilai: gagal ? LK.data.siswa.email : "" }) +
      K.kolom({ id: "sandi", label: "Kata sandi", type: "password", autocomplete: "current-password", placeholder: "Kata sandimu", galat: gagal ? "Kata sandi belum cocok. Huruf besar dan kecil dibedakan." : "" }) +
      '<p class="kanan"><a class="tautan" href="#/lupa-sandi">Lupa kata sandi?</a></p>' +
      K.tombol({ label: "Masuk", type: "submit", penuh: true }) + "</form>" +
      '<div class="pemisah" role="separator"><span>atau</span></div>' +
      K.tombol({ label: "Lanjut dengan Google", varian: "secondary", penuh: true, aksi: "google" }) +
      '<p class="tengah">Belum punya akun? <a class="tautan" href="#/daftar">Daftar</a></p>';
    return layarAkun({
      judul: gagal ? "Masuk gagal" : "Masuk", kembali: "#/landing", html: html,
      pasang: function (el) {
        var form = el.querySelector("form");
        var f = LK.form(form, {
          judulGalat: "Belum bisa masuk",
          aturan: { email: aturanEmail, sandi: wajib("Kata sandi") },
          kirim: function (v, a) {
            /* Prototype: kata sandi pendek dianggap salah, untuk memperlihatkan state 12c. */
            if (v.sandi.length < 8) {
              a.pulihkan("Masuk");
              a.setGalat("sandi", "Kata sandi belum cocok. Huruf besar dan kecil dibedakan.");
              a.ringkas("Belum bisa masuk", [{ id: "sandi", pesan: "Ke kolom kata sandi" }]);
              return;
            }
            LK.masukSebagaiDimas();
            LK.buka("#/beranda");
          }
        });
        form.querySelectorAll("[data-ke]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); el.querySelector("#sandi").focus(); }); });
        if (gagal) form.querySelector(".ringkasan-galat").focus();
        el.querySelector('[data-aksi="google"]').addEventListener("click", function () { LK.masukSebagaiDimas(); LK.buka("#/beranda"); });
        void f;
      }
    });
  });

  /* ---------- 12b Daftar ---------- */
  LK.rute("/daftar", function () {
    var html = "<h1>Daftar</h1><p class=\"redup\">Gratis. Progresmu tersimpan di akun.</p>" +
      K.tombol({ label: "Daftar dengan Google", varian: "secondary", penuh: true, aksi: "google" }) +
      '<div class="pemisah" role="separator"><span>atau</span></div>' +
      '<form class="tumpuk" novalidate>' +
      K.kolom({ id: "nama", label: "Nama panggilan", autocomplete: "nickname", placeholder: "Misalnya Dimas", maxlength: 20, bantuan: "Muncul di sapaan Beranda. Maksimal 20 karakter." }) +
      K.kolom({ id: "email", label: "Email", type: "email", autocomplete: "email", placeholder: "nama@email.com" }) +
      K.kolom({ id: "sandi", label: "Kata sandi", type: "password", autocomplete: "new-password", bantuan: "Minimal 8 karakter." }) +
      K.tombol({ label: "Daftar dan Mulai Belajar", type: "submit", penuh: true }) +
      '<p class="caption">Dengan mendaftar, kamu setuju dengan ketentuan layanan LogikaKu.</p></form>' +
      '<p class="tengah">Sudah punya akun? <a class="tautan" href="#/masuk">Masuk</a></p>';
    return layarAkun({
      judul: "Daftar", kembali: "#/landing", html: html,
      pasang: function (el) {
        LK.form(el.querySelector("form"), {
          aturan: {
            nama: function (v) { return !v.trim() ? "Nama panggilan belum diisi." : v.trim().length > 20 ? "Nama panggilan maksimal 20 karakter." : null; },
            email: aturanEmail, sandi: aturanSandiBaru
          },
          kirim: function (v) { LK.daftarBaru(v.nama.trim(), v.email.trim()); LK.buka("#/beranda"); }
        });
        el.querySelector('[data-aksi="google"]').addEventListener("click", function () { LK.daftarBaru("Teman", ""); LK.buka("#/beranda"); });
        el.querySelector("#email").focus();
      }
    });
  });

  /* ---------- 13a Lupa kata sandi ---------- */
  var emailLupa = "";
  LK.rute("/lupa-sandi", function () {
    var html = "<h1>Lupa kata sandi</h1><p class=\"redup\">Tulis email akunmu. Kami kirim tautan untuk membuat kata sandi baru.</p>" +
      '<form class="tumpuk" novalidate>' + K.kolom({ id: "email", label: "Email", type: "email", autocomplete: "email", placeholder: "nama@email.com", nilai: emailLupa }) +
      K.tombol({ label: "Kirim tautan", type: "submit", penuh: true }) + "</form>" +
      '<p class="tengah"><a class="tautan" href="#/masuk">Kembali ke Masuk</a></p>';
    return layarAkun({
      judul: "Lupa kata sandi", kembali: "#/masuk", html: html,
      pasang: function (el) {
        LK.form(el.querySelector("form"), { aturan: { email: aturanEmail }, kirim: function (v) { emailLupa = v.email.trim(); LK.buka("#/cek-email"); } });
      }
    });
  });

  /* ---------- 13b Cek email ---------- */
  var hitung = null;
  LK.rute("/cek-email", function () {
    var html = '<span class="petak-ikon" aria-hidden="true">' + I("mail", "ikon-lg") + "</span><h1>Cek emailmu</h1>" +
      "<p>Kami sudah mengirim tautan ke <strong>" + esc(emailLupa || "emailmu") + "</strong>. Tautannya berlaku 30 menit.</p>" +
      '<p class="redup">Tidak ada di kotak masuk? Cek folder Spam.</p>' +
      K.tombol({ label: "Buka aplikasi email", penuh: true, href: "#/sandi-baru" }) +
      '<p class="caption">Di prototype ini, tombol di atas meniru klik tautan di email.</p>' +
      K.tombol({ label: "Kirim ulang dalam 0:45", varian: "secondary", penuh: true, nonaktif: true, id: "kirim-ulang", syaratId: "syarat-ulang" }) +
      '<p class="syarat" id="syarat-ulang">Aktif setelah hitungan selesai.</p>' +
      '<p class="tengah"><a class="tautan" href="#/masuk">Kembali ke Masuk</a></p>';
    return layarAkun({
      judul: "Cek email", kembali: "#/lupa-sandi", html: html,
      pasang: function (el) {
        var btn = el.querySelector("#kirim-ulang"), sisa = 45;
        function mulai() {
          clearInterval(hitung); sisa = 45; btn.disabled = true;
          hitung = setInterval(function () {
            if (!document.body.contains(btn)) { clearInterval(hitung); return; }
            sisa--;
            if (sisa <= 0) { clearInterval(hitung); btn.disabled = false; btn.querySelector("span").textContent = "Kirim ulang"; return; }
            btn.querySelector("span").textContent = "Kirim ulang dalam 0:" + (sisa < 10 ? "0" : "") + sisa;
          }, 1000);
        }
        btn.addEventListener("click", function () { LK.umumkan("Tautan baru sudah dikirim."); mulai(); });
        mulai();
      }
    });
  });

  /* ---------- 13c Kata sandi baru ---------- */
  LK.rute("/sandi-baru", function () {
    var html = "<h1>Buat kata sandi baru</h1><p class=\"redup\">Pakai kata sandi yang belum pernah kamu pakai di sini.</p>" +
      '<form class="tumpuk" novalidate>' +
      K.kolom({ id: "baru", label: "Kata sandi baru", type: "password", autocomplete: "new-password", bantuan: "Minimal 8 karakter." }) +
      K.kolom({ id: "ulang", label: "Ulangi kata sandi baru", type: "password", autocomplete: "new-password" }) +
      K.tombol({ label: "Simpan kata sandi", type: "submit", penuh: true }) + "</form>";
    return layarAkun({
      judul: "Kata sandi baru", kembali: "#/cek-email", html: html,
      pasang: function (el) {
        LK.form(el.querySelector("form"), {
          aturan: { baru: aturanSandiBaru, ulang: function (v, s) { return !v ? "Ulangi kata sandi baru." : v !== s.baru ? "Kata sandi belum sama dengan yang di atas." : null; } },
          kirim: function () { LK.buka("#/masuk"); setTimeout(function () { LK.umumkan("Kata sandi baru tersimpan. Silakan masuk."); }, 300); }
        });
      }
    });
  });

  /* ---------- 11 Landing ---------- */
  LK.rute("/landing", function () {
    var led10 = "";
    for (var i = 0; i < 10; i++) led10 += '<span class="led-kecil' + (i < 3 ? " nyala" : "") + '"></span>';
    var modul = "";
    LK.data.bab.forEach(function (b) {
      modul += '<h3 class="judul-bab">' + esc(b.judul) + '</h3><div class="grid-landing">' + b.modul.map(function (n) {
        var m = LK.modul(n);
        return '<article class="kartu kartu-landing"><span class="led nyala nomor">' + n + "</span><h4>" + esc(m.judul) + '</h4><p class="redup">' + esc(m.desk) + "</p>" +
          '<p class="caption">Latihan: ' + esc(m.namaLatihan) + "</p>" + K.chip("accent", "Lencana: " + m.lencana) + "</article>";
      }).join("") + "</div>";
    });
    var kodeMini = '<div class="kode-mini"><p class="caption">Pseudocode: langkah 6 dari 11</p><ol class="trace-mini">' +
      ["BACA n", "total ← 0", "UNTUK i ← 1 SAMPAI n", "    total ← total + i", "SELESAI UNTUK", "TULIS total"].map(function (b, i) {
        return '<li class="' + (i === 3 ? "aktif" : "") + '">' + (i === 3 ? '<span class="led-kecil nyala"></span>' : "<span></span>") + "<span>" + (i + 1) + "</span><span>" + esc(b) + "</span></li>";
      }).join("") + '</ol><p class="chip chip-accent mono">total 1 → 3</p></div>';
    var html =
      '<header class="landing-nav">' + K.logo("#/landing") +
      '<nav class="landing-tautan" aria-label="Bagian halaman"><a href="#/landing" data-gulir="modul">Modul</a><a href="#/landing" data-gulir="cara">Cara Belajar</a><a href="#/landing" data-gulir="tentang">Tentang</a></nav>' +
      '<div class="baris landing-aksi">' + K.tombol({ label: "Masuk", varian: "secondary", href: "#/masuk", kelas: "hanya-tablet" }) + K.tombol({ label: "Mulai Belajar", href: "#/daftar" }) + K.tombolTema() + "</div></header>" +
      '<main id="utama" tabindex="-1">' +
      '<section class="hero" aria-labelledby="hero-judul"><div class="titik-breadboard" aria-hidden="true"></div>' +
      '<svg class="jalur-pcb" aria-hidden="true" viewBox="0 0 1280 900" preserveAspectRatio="none"><path d="M250 64 H420 L470 104 H560 M720 104 H830 L880 80 H970 M300 390 H370 L440 230 L520 125 M790 125 L870 230 L910 380 H1075"/></svg>' +
      '<div class="hero-isi"><span class="logo-chip besar" aria-hidden="true">L</span>' +
      '<h1 id="hero-judul" class="judul-hero"><span>Belajar logika jadi</span> <span class="biru">semudah menyalakan lampu</span></h1>' +
      '<p class="teks-lg redup hero-desk">Media belajar interaktif untuk siswa SMK kelas X: dari proposisi dan tabel kebenaran sampai flowchart, percabangan, dan perulangan.</p>' +
      '<p class="baris hero-led"><span class="deret-led" aria-hidden="true">' + led10 + '</span><span class="caption">10 modul dalam 2 bab: Logika dan Algoritma</span></p>' +
      '<div class="hero-cta">' + K.tombol({ label: "Mulai Belajar Gratis", href: "#/daftar", kelas: "tombol-cahaya" }) + '<p class="caption">Gratis. Bisa dibuka di HP dan laptop.</p></div></div>' +
      '<div class="melayang" aria-hidden="true">' +
      '<div class="kartu kartu-melayang m-tabel"><p class="caption">Tabel Kebenaran</p><p class="mono label">p ∧ q</p><div class="baris">' + K.sel(true) + K.sel(false) + '<span class="sel benar">F' + I("check", "tanda") + "</span></div></div>" +
      '<div class="kartu kartu-melayang m-gerbang"><p class="caption">Lab Gerbang: LED menyala</p><div class="gerbang-mini-papan"><div class="tumpuk-sm"><span class="baris"><b class="mono">A</b>' + '<span class="saklar-pil nyala"></span></span><span class="baris"><b class="mono">B</b><span class="saklar-pil nyala"></span></span></div><span class="gerbang-mini">AND</span><span class="led nyala"></span></div></div>' +
      '<div class="kartu kartu-melayang m-kuis"><p class="caption">Kuis Modul 2</p><p>p = T dan q = F. Berapa nilai p ∧ q?</p><div class="opsi benar"><span class="tuts">B</span><span class="opsi-label">F (salah)</span><span class="opsi-status">' + I("check-circle", "ikon-sm") + "Benar</span></div></div>" +
      '<div class="kartu kartu-melayang m-flow"><p class="caption">Flowchart</p><div class="fc-mini">' + LK.blokFC({ bentuk: "terminal", label: "Mulai" }) + I("arrow-down", "ikon-sm") + LK.blokFC({ bentuk: "keputusan", label: "n mod 2 = 0?" }) + "</div></div>" +
      '<div class="kartu kartu-melayang m-kode">' + kodeMini + "</div>" +
      '<div class="kartu kartu-melayang m-rangkaian"><p class="caption">Beranda</p><p class="h3-like">Arus belajarmu sampai Modul 4.</p>' + rangkaianMini() + "</div>" +
      '<div class="ubin-simbol"><span>∨</span><span>∧</span><span class="merah">¬</span><span class="kuning">T</span><span>F</span></div>' +
      "</div></section>" +
      '<section id="modul" class="landing-bagian" aria-labelledby="modul-judul"><h2 id="modul-judul" class="judul-display">Sepuluh modul, dua rangkaian</h2>' +
      '<p class="teks-lg redup lebar-baca">Bab 1 melatih logika, Bab 2 menyusun algoritma. Setiap modul punya materi, latihan interaktif, dan kuis. Lulus kuis dengan nilai 70 ke atas menyalakan modul berikutnya.</p>' + modul + "</section>" +
      '<section id="cara" class="landing-bagian" aria-labelledby="cara-judul"><h2 id="cara-judul">Cara belajar</h2><ol class="cara-langkah">' +
      [["Materi", "Penjelasan pendek dengan contoh."], ["Latihan", "Coba langsung: ketuk, isi tabel, nyalakan saklar."], ["Kuis", "10 soal. Nilai 70 membuka modul berikutnya."], ["Lencana", "Kumpulkan satu lencana tiap modul."]].map(function (c, i) {
        return '<li class="kartu"><span class="led nyala">' + (i + 1) + "</span><h3>" + c[0] + '</h3><p class="redup">' + c[1] + "</p></li>";
      }).join("") + "</ol></section></main>" +
      '<footer id="tentang" class="landing-kaki">' + K.logo("#/landing") + '<p class="caption">Media belajar logika dan algoritma untuk kelas X TKJ dan RPL.</p>' +
      '<p class="caption"><a href="#/layar">Daftar semua layar prototype</a></p></footer>';
    return {
      shell: "polos", judul: "Belajar logika jadi semudah menyalakan lampu", html: '<div class="landing">' + html + "</div>",
      pasang: function (el) {
        el.querySelectorAll("[data-gulir]").forEach(function (a) {
          a.addEventListener("click", function (e) {
            e.preventDefault();
            var t = document.getElementById(a.getAttribute("data-gulir"));
            t.scrollIntoView({ behavior: LK.kurangiGerak() ? "auto" : "smooth" });
            t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true });
          });
        });
      }
    };
  });
})();
