/* Router berbasis hash, kerangka halaman (sidebar/top bar), modal, dan pengumuman layar. */
window.LK = window.LK || {};
(function () {
  var I = LK.ikon, esc = LK.esc, K = LK.k;
  var rute = [];
  LK.layar = {};
  LK.rute = function (pola, fn) { rute.push({ re: new RegExp("^" + pola + "$"), fn: fn }); };

  /* ---------- Pengumuman untuk pembaca layar ---------- */
  LK.umumkan = function (teks) {
    var el = document.getElementById("pengumuman");
    el.textContent = "";
    setTimeout(function () { el.textContent = teks; }, 30);
  };

  /* ---------- Modal ---------- */
  LK.modal = function (o) {
    var kembali = document.activeElement;
    var latar = document.createElement("div");
    latar.className = "modal-latar";
    latar.innerHTML = '<div class="modal ' + (o.kelas || "") + '" role="dialog" aria-modal="true" aria-labelledby="' + o.labelId + '"' +
      (o.deskId ? ' aria-describedby="' + o.deskId + '"' : "") + ">" +
      '<button type="button" class="tombol-ikon tutup-x" aria-label="Tutup">' + I("x", "ikon-lg") + "</button>" + o.html + "</div>";
    document.body.appendChild(latar);
    var app = document.getElementById("akar");
    app.setAttribute("inert", ""); app.setAttribute("aria-hidden", "true");
    var modal = latar.firstChild, tertutup = false;
    function fokusable() {
      return Array.prototype.filter.call(modal.querySelectorAll('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])'), function (e) { return e.offsetParent !== null; });
    }
    function tutup(lanjut) {
      if (tertutup) return; tertutup = true;
      document.removeEventListener("keydown", tombol, true);
      app.removeAttribute("inert"); app.removeAttribute("aria-hidden");
      latar.classList.add("tutup");
      setTimeout(function () {
        latar.remove();
        if (typeof lanjut === "function") lanjut();
        else if (kembali && document.body.contains(kembali)) kembali.focus();
      }, LK.kurangiGerak() ? 0 : 150);
    }
    function tombol(e) {
      if (e.key === "Escape") { e.preventDefault(); tutup(); }
      if (e.key === "Tab") {
        var f = fokusable(); if (!f.length) return;
        var awal = f[0], akhir = f[f.length - 1];
        if (e.shiftKey && document.activeElement === awal) { e.preventDefault(); akhir.focus(); }
        else if (!e.shiftKey && document.activeElement === akhir) { e.preventDefault(); awal.focus(); }
      }
    }
    document.addEventListener("keydown", tombol, true);
    latar.addEventListener("mousedown", function (e) { if (e.target === latar) tutup(); });
    modal.querySelector(".tutup-x").addEventListener("click", function () { tutup(); });
    if (o.pasang) o.pasang(modal, tutup);
    var awal = o.fokus ? modal.querySelector(o.fokus) : fokusable()[1] || fokusable()[0];
    if (awal) awal.focus();
    return tutup;
  };

  /* Perbarui semua tombol tema dan pilihan "Mode warna" di Profil tanpa memuat ulang layar,
   * supaya fokus keyboard tetap di tombol yang baru ditekan. */
  LK.segarkanTombolTema = function () {
    document.querySelectorAll('[data-aksi="ganti-tema"]').forEach(function (b) {
      var tmp = document.createElement("div");
      tmp.innerHTML = K.tombolTema();
      var baru = tmp.firstChild;
      b.innerHTML = baru.innerHTML;
      b.setAttribute("aria-label", baru.getAttribute("aria-label"));
      b.setAttribute("title", baru.getAttribute("title"));
    });
    var seg = document.querySelector('[data-segmen="tema"]');
    if (seg) seg.querySelectorAll("button").forEach(function (b) {
      var on = b.getAttribute("data-nilai") === LK.pref.tema;
      b.setAttribute("aria-checked", on); b.tabIndex = on ? 0 : -1;
      var cek = b.querySelector(".ikon"); if (cek) cek.remove();
      if (on) b.insertAdjacentHTML("afterbegin", I("check", "ikon-sm"));
    });
  };

  /* ---------- Kerangka aplikasi ---------- */
  function sidebar(aktif) {
    var h = '<nav class="sidebar" aria-label="Menu utama"><div class="side-kepala">' + K.logo() + K.tombolTema() + "</div>" +
      sideItem("#/beranda", "home", "Beranda", aktif === "beranda");
    LK.data.bab.forEach(function (b) {
      h += '<p class="side-grup">' + esc(b.judul) + "</p>";
      b.modul.forEach(function (n) {
        var m = LK.modul(n), kunci = LK.statusModul(n) === "terkunci";
        var href = kunci ? null : n === LK.modulSekarang() ? LK.tautanLanjut(n) : "#/modul/" + n + "/materi";
        if (kunci) {
          h += '<a class="side-item terkunci" aria-disabled="true" role="link" tabindex="0" title="' + esc(m.judul) + '">' + I("lock") + "<span>" + n + ". " + esc(m.judul) + '<span class="sr-only"> (terkunci)</span></span></a>';
        } else {
          h += sideItem(href, "book-open", n + ". " + m.judul, aktif === "modul-" + n);
        }
      });
    });
    h += '<p class="side-grup">Lainnya</p>' + sideItem("#/rekap", "bar-chart", "Rekap Skor", aktif === "rekap") +
      sideItem("#/profil", "user", "Profil", aktif === "profil") + "</nav>";
    return h;
  }
  function sideItem(href, ikon, label, on) {
    return '<a class="side-item" href="' + href + '"' + (on ? ' aria-current="page"' : "") + ">" + I(ikon) + "<span>" + esc(label) + "</span></a>";
  }
  function topbar(t) {
    t = t || {};
    if (t.jenis === "beranda") {
      var inisial = (LK.sesi.nama || "?").trim().charAt(0).toUpperCase();
      return '<header class="topbar">' + K.logo() + '<span class="spacer"></span>' +
        '<a class="tautan" href="#/rekap">' + I("bar-chart") + "Rekap</a>" + K.tombolTema() +
        '<a class="avatar" href="#/profil" aria-label="Profil ' + esc(LK.sesi.nama) + '"><span aria-hidden="true">' + esc(inisial) + "</span></a></header>";
    }
    var kiri = t.tutup
      ? '<button type="button" class="tombol-ikon" data-aksi="tutup-kuis" aria-label="Tutup kuis">' + I("x", "ikon-lg") + "</button>"
      : '<a class="tombol-ikon" href="' + (t.kembali || "#/beranda") + '" aria-label="Kembali">' + I("chevron-left", "ikon-lg") + "</a>";
    return '<header class="topbar dengan-kembali">' + kiri + '<span class="topbar-judul">' + esc(t.judul || "") + "</span>" +
      (t.meta ? '<span class="topbar-meta">' + esc(t.meta) + "</span>" : "") + K.tombolTema() + "</header>";
  }

  var akar;
  function tampilkan(l, pertama) {
    document.title = (l.judul ? l.judul + " | " : "") + "LogikaKu";
    var html;
    if (l.shell === "polos") {
      html = '<div class="layar-masuk polos">' + l.html + "</div>";
    } else {
      html = '<div class="app layar-masuk">' + sidebar(l.aktif) + '<div class="kolom-utama">' + topbar(l.topbar) +
        '<main id="utama" class="app-isi ' + (l.kelasIsi || "") + '" tabindex="-1">' + l.html + "</main></div></div>";
    }
    akar.innerHTML = html;
    akar.querySelectorAll(".side-item.terkunci").forEach(function (a) {
      a.addEventListener("click", function () { LK.umumkan("Modul ini masih terkunci. Selesaikan modul sebelumnya."); });
    });
    if (l.pasang) l.pasang(akar.querySelector("#utama") || akar);
    window.scrollTo(0, 0);
    if (!pertama) {
      var h1 = akar.querySelector("h1");
      if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
    }
  }

  function bacaHash() {
    var h = location.hash.replace(/^#/, "") || "/";
    var q = {}, i = h.indexOf("?");
    if (i >= 0) {
      h.slice(i + 1).split("&").forEach(function (p) { if (!p) return; var kv = p.split("="); q[decodeURIComponent(kv[0])] = kv.length > 1 ? decodeURIComponent(kv[1]) : true; });
      h = h.slice(0, i);
    }
    return { jalur: h, q: q };
  }

  var pertama = true;
  function arahkan() {
    var r = bacaHash();
    if (r.jalur === "/" || r.jalur === "") { location.replace("#/landing"); return; }
    for (var i = 0; i < rute.length; i++) {
      var m = rute[i].re.exec(r.jalur);
      if (m) {
        var hasil = rute[i].fn({ p: m.slice(1), q: r.q, jalur: r.jalur });
        if (hasil && hasil.alih) { location.replace(hasil.alih); return; }
        if (hasil) tampilkan(hasil, pertama);
        pertama = false;
        return;
      }
    }
    tampilkan(LK.layar.tidakAda(), pertama);
    pertama = false;
  }
  LK.muatUlang = arahkan;
  LK.buka = function (hash) { if (location.hash === hash) arahkan(); else location.hash = hash; };
  LK.gantiHashDiam = function (hash) { try { history.replaceState(null, "", hash); } catch (e) { /* abaikan */ } };

  document.addEventListener("DOMContentLoaded", function () {
    akar = document.getElementById("akar");
    /* Tombol mata kata sandi dan tombol "aria-disabled" berlaku di semua layar. */
    document.addEventListener("click", function (e) {
      var tema = e.target.closest('[data-aksi="ganti-tema"]');
      if (tema) {
        var baru = LK.temaAktif() === "gelap" ? "terang" : "gelap";
        LK.ubahPref("tema", baru);
        LK.segarkanTombolTema();
        LK.umumkan("Mode " + baru + " aktif.");
        return;
      }
      var mata = e.target.closest("[data-mata]");
      if (mata) {
        var inp = document.getElementById(mata.getAttribute("data-mata"));
        var tampil = inp.type === "password";
        inp.type = tampil ? "text" : "password";
        mata.setAttribute("aria-pressed", tampil);
        mata.setAttribute("aria-label", tampil ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
        mata.innerHTML = I(tampil ? "eye-off" : "eye");
      }
    });
    window.addEventListener("hashchange", arahkan);
    window.addEventListener("online", function () { if (/beranda/.test(location.hash)) arahkan(); });
    window.addEventListener("offline", function () { if (/beranda/.test(location.hash)) arahkan(); });
    arahkan();
  });
})();
