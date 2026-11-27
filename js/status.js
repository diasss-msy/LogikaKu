/*
 * Status prototype: pengaturan tampilan dan progres siswa contoh.
 * Tidak ada akun sungguhan. Yang disimpan di localStorage hanya pengaturan
 * tampilan dan progres contoh. Kata sandi tidak pernah disimpan di mana pun.
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
  LK.ubahPref = function (k, v) { LK.pref[k] = v; simpan.tulis(PREF, LK.pref); LK.terapkanPref(); };
  LK.kurangiGerak = function () {
    return LK.pref.gerak === "kurang" || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  };

  /* ---------- Sesi siswa contoh ---------- */
  var SESI = "logikaku-sesi";
  function salin(o) { return JSON.parse(JSON.stringify(o)); }
  function sesiDimas() { return { nama: D.siswa.nama, email: D.siswa.email, progres: salin(D.progres), perluDiulang: salin(D.perluDiulang) }; }
  LK.sesi = simpan.baca(SESI, null) || sesiDimas();
  LK.simpanSesi = function () { simpan.tulis(SESI, LK.sesi); };
  LK.masukSebagaiDimas = function () { LK.sesi = sesiDimas(); LK.simpanSesi(); };
  LK.daftarBaru = function (nama, email) {
    LK.sesi = { nama: nama || "Teman", email: email || "", progres: {}, perluDiulang: [] };
    LK.simpanSesi();
  };

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
    if ((p.langkah || 0) < l) p.langkah = l;
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
