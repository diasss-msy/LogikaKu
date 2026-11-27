/*
 * Status: pengaturan tampilan, sesi siswa, dan progres.
 * Ada dua mode:
 * - Mode server (dibuka lewat Laravel): akun dan progres tersimpan di database
 *   lewat LK.api. Halaman punya <meta name="lk-api">.
 * - Mode demo (file statis atau GitHub Pages): tidak ada akun sungguhan, progres
 *   contoh disimpan di localStorage.
 * Di kedua mode, kata sandi tidak pernah disimpan di browser.
 */
window.LK = window.LK || {};
(function () {
  var D = window.LOGIKAKU_DATA;
  LK.data = D;

  var simpan = {
    baca: function (k, awal) {
      try { var v = localStorage.getItem(k); return v === null ? awal : JSON.parse(v); } catch (e) { return awal; }
    },
    tulis: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* abaikan */ } },
    hapus: function (k) { try { localStorage.removeItem(k); } catch (e) { /* abaikan */ } }
  };
  LK.simpan = simpan;

  /* ---------- Pengaturan tampilan ---------- */
  var PREF = "logikaku-pengaturan";
  LK.pref = Object.assign({ tema: "otomatis", teks: "normal", gerak: "normal" }, simpan.baca(PREF, {}));
  LK.terapkanPref = function () {
    var r = document.documentElement;
    if (LK.pref.tema === "terang") r.setAttribute("data-theme", "light");
    else if (LK.pref.tema === "gelap") r.setAttribute("data-theme", "dark");
    else r.removeAttribute("data-theme");
    if (LK.pref.teks === "besar") r.setAttribute("data-teks", "besar"); else r.removeAttribute("data-teks");
    if (LK.pref.gerak === "kurang") r.setAttribute("data-gerak", "kurang"); else r.removeAttribute("data-gerak");
  };
  /* Tema yang sedang tampil: dari pilihan, atau dari pengaturan perangkat kalau "otomatis". */
  LK.temaAktif = function () {
    if (LK.pref.tema === "terang" || LK.pref.tema === "gelap") return LK.pref.tema;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "gelap" : "terang";
  };
  LK.ubahPref = function (k, v) { LK.pref[k] = v; simpan.tulis(PREF, LK.pref); LK.terapkanPref(); };
  LK.kurangiGerak = function () {
    return LK.pref.gerak === "kurang" || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  };

  /* ---------- Hubungan ke server Laravel ---------- */
  var metaApi = document.querySelector('meta[name="lk-api"]');
  LK.server = !!metaApi;
  LK.api = {
    dasar: metaApi ? metaApi.getAttribute("content").replace(/\/$/, "") : "",
    /* Mengembalikan Promise berisi { ok, status, data }. Tidak pernah reject karena status HTTP. */
    kirim: function (metode, jalur, isi) {
      var token = document.querySelector('meta[name="csrf-token"]');
      return fetch(LK.api.dasar + jalur, {
        method: metode,
        credentials: "same-origin",
        headers: Object.assign({ "Accept": "application/json", "X-Requested-With": "XMLHttpRequest" },
          isi ? { "Content-Type": "application/json" } : {},
          token ? { "X-CSRF-TOKEN": token.getAttribute("content") } : {}),
        body: isi ? JSON.stringify(isi) : undefined
      }).then(function (r) {
        return r.text().then(function (t) {
          var data = null;
          try { data = t ? JSON.parse(t) : null; } catch (e) { data = null; }
          /* Token CSRF baru dikirim setiap masuk, daftar, dan keluar karena sesi diganti. */
          if (data && data.csrf && token) token.setAttribute("content", data.csrf);
          return { ok: r.ok, status: r.status, data: data };
        });
      }, function () { return { ok: false, status: 0, data: null }; });
    },
    /* Pesan galat pertama untuk satu kolom dari jawaban validasi Laravel (422). */
    galat: function (j, kolom) {
      return j && j.data && j.data.errors && j.data.errors[kolom] ? j.data.errors[kolom][0] : null;
    }
  };

  /* ---------- Sesi siswa ---------- */
  var SESI = "logikaku-sesi";
  function salin(o) { return JSON.parse(JSON.stringify(o)); }
  function sesiDimas() { return { nama: D.siswa.nama, email: D.siswa.email, progres: salin(D.progres), perluDiulang: salin(D.perluDiulang) }; }
  /* Di mode server, sesi baru terisi setelah LK.muatSesi() bertanya ke /saya. */
  LK.sesi = LK.server ? null : (simpan.baca(SESI, null) || sesiDimas());
  LK.simpanSesi = function () { if (!LK.server) simpan.tulis(SESI, LK.sesi); };
  LK.masukSebagaiDimas = function () { LK.sesi = sesiDimas(); LK.simpanSesi(); };
  LK.daftarBaru = function (nama, email) {
    LK.sesi = { nama: nama || "Teman", email: email || "", progres: {}, perluDiulang: [] };
    LK.simpanSesi();
  };
  /* Materi yang skor kuis terakhirnya di bawah 70, untuk bagian "Perlu diulang" di Rekap. */
  function hitungPerluDiulang(progres) {
    var hasil = [];
    D.modul.forEach(function (m) {
      var p = progres[m.no];
      if (p && p.terakhir !== undefined && p.terakhir !== null && p.terakhir / p.total < 0.7) {
        hasil.push({ modul: m.no, topik: m.judul, benar: p.terakhir, total: p.total });
      }
    });
    return hasil;
  }
  /* Terima data akun dari server: { nama, email, progres: { "1": { langkah, terakhir, terbaik, total } } }. */
  LK.terimaSesi = function (d) {
    if (!d) { LK.sesi = null; return; }
    var progres = {};
    Object.keys(d.progres || {}).forEach(function (k) {
      var p = d.progres[k], o = { langkah: p.langkah || 0 };
      if (p.terakhir !== null && p.terakhir !== undefined) { o.terakhir = p.terakhir; o.terbaik = p.terbaik; o.total = p.total; }
      progres[k] = o;
    });
    LK.sesi = { nama: d.nama, email: d.email, progres: progres, perluDiulang: hitungPerluDiulang(progres) };
  };
  LK.muatSesi = function () {
    if (!LK.server) return Promise.resolve(LK.sesi);
    return LK.api.kirim("GET", "/saya").then(function (j) {
      LK.terimaSesi(j.ok ? j.data : null);
      LK.sesiGagal = !j.ok && j.status !== 401;
      return LK.sesi;
    });
  };
  LK.masuk = function () { return !!LK.sesi; };
  /* Kirim perubahan progres ke server. Tampilan sudah berubah duluan, jadi gagal simpan cukup diumumkan. */
  function kirimProgres(jalur, isi) {
    if (!LK.server) return;
    LK.api.kirim("POST", jalur, isi).then(function (j) {
      if (!j.ok && LK.umumkan) LK.umumkan("Progres belum tersimpan. Periksa koneksi lalu coba lagi.");
    });
  }

  /* ---------- Modul ---------- */
  LK.modul = function (n) { return D.modul[n - 1]; };
  LK.semuaModul = function () { return D.modul; };
  LK.progres = function (n) { return LK.sesi.progres[n] || { langkah: 0 }; };
  LK.lulus = function (n) { return (LK.progres(n).langkah || 0) >= 3; };
  LK.terbuka = function (n) { return n === 1 || LK.lulus(n - 1); };
  LK.statusModul = function (n) {
    if (LK.lulus(n)) return "selesai";
    if (!LK.terbuka(n)) return "terkunci";
    return (LK.progres(n).langkah || 0) > 0 ? "berjalan" : "tersedia";
  };
  LK.modulSekarang = function () {
    for (var i = 1; i <= D.modul.length; i++) if (!LK.lulus(i) && LK.terbuka(i)) return i;
    return null;
  };
  LK.langkahModul = function (n) { return Math.min(LK.progres(n).langkah || 0, 3); };
  LK.setLangkah = function (n, l) {
    var p = LK.sesi.progres[n] || (LK.sesi.progres[n] = { langkah: 0 });
    if ((p.langkah || 0) < l) { p.langkah = l; kirimProgres("/progres/" + n + "/langkah", { langkah: l }); }
    LK.simpanSesi();
  };
  LK.penggunaBaru = function () {
    return !Object.keys(LK.sesi.progres).some(function (k) { return (LK.sesi.progres[k].langkah || 0) > 0; });
  };
  LK.ringkasan = function () {
    var selesai = 0, jumlah = 0, n = 0;
    D.modul.forEach(function (m) {
      var p = LK.progres(m.no);
      if (LK.lulus(m.no)) selesai++;
      if (p.terbaik !== undefined) { jumlah += (p.terbaik / p.total) * 100; n++; }
    });
    return { selesai: selesai, lencana: selesai, rata: n ? Math.round(jumlah / n) : null, adaSkor: n > 0 };
  };
  /* Simpan hasil kuis. Nilai terbaik yang disimpan. Mengembalikan true kalau lulus. */
  LK.catatKuis = function (n, benar, total) {
    var p = LK.sesi.progres[n] || (LK.sesi.progres[n] = { langkah: 0 });
    var lulusSebelumnya = (p.langkah || 0) >= 3;
    p.terakhir = benar; p.total = total;
    if (p.terbaik === undefined || benar / total > p.terbaik / (p.total || total)) p.terbaik = benar;
    var lulus = benar / total >= 0.7;
    if (lulus) p.langkah = 3; else if ((p.langkah || 0) < 2) p.langkah = 2;
    if (LK.server) LK.sesi.perluDiulang = hitungPerluDiulang(LK.sesi.progres);
    kirimProgres("/progres/" + n + "/kuis", { benar: benar, total: total });
    LK.simpanSesi();
    return { lulus: lulus, baruLulus: lulus && !lulusSebelumnya };
  };

  LK.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  LK.acak = function (arr, benih) {
    /* Acak yang tetap (berbenih) supaya urutan sama setiap kali layar dibuka. */
    var a = arr.slice(), s = benih || 7;
    for (var i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; var j = Math.floor((s / 233280) * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };

  LK.terapkanPref();
})();
