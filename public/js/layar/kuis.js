/* Layar 05a/05b/05c Kuis, 05d/05e Hasil, 06 Modal lencana. */
(function () {
  var I = LK.ikon, esc = LK.esc, K = LK.k;
  var HURUF = "ABCD";
  var hasilTerakhir = {};

  function soalModul(n) { return LK.data.kuis[n] || []; }
  /* Tautan ke bagian materi yang judulnya sama dengan topik soal, atau ke awal materi. */
  var tautanTopik = LK.tautanTopik = function (n, topik) {
    var i = (LK.data.materi[n] || []).map(function (x) { return x.judul; }).indexOf(topik);
    return "#/modul/" + n + "/materi" + (i > 0 ? "?bagian=" + (i + 1) : "");
  };

  /* ---------- Kuis ---------- */
  LK.rute("/modul/(\\d+)/kuis", function (ctx) {
    var n = parseInt(ctx.p[0], 10), m = LK.modul(n);
    if (!m) return null;
    if (LK.statusModul(n) === "terkunci" && !ctx.q.paksa) return LK.layarTerkunci(n);
    var soal = soalModul(n), s = { i: 0, pilih: null, dicek: false, jawab: [] };
    if (ctx.q.demo) {
      s.i = Math.min(2, soal.length - 1);
      for (var d = 0; d < s.i; d++) s.jawab.push(soal[d].benar);
      if (ctx.q.demo === "benar") { s.pilih = soal[s.i].benar; s.dicek = true; }
      if (ctx.q.demo === "salah") { s.pilih = (soal[s.i].benar + 3) % 4; s.dicek = true; }
      if (ctx.q.demo === "dipilih") { s.pilih = soal[s.i].benar; }
    }

    function gambar() {
      var q = soal[s.i], benar = s.pilih === q.benar, total = soal.length;
      var opsi = q.opsi.map(function (o, k) {
        var kelas = s.dicek ? (k === q.benar ? (k === s.pilih ? "benar" : "ditunjukkan") : k === s.pilih ? "salah" : "") : k === s.pilih ? "dipilih" : "";
        var status = kelas === "benar" ? I("check-circle", "ikon-sm") + "Benar" : kelas === "salah" ? I("x-circle", "ikon-sm") + "Belum tepat" : kelas === "ditunjukkan" ? I("check-circle", "ikon-sm") + "Jawaban benar" : "";
        return '<button type="button" class="opsi ' + kelas + '" role="radio" aria-checked="' + (k === s.pilih) + '" data-opsi="' + k + '" data-f="opsi-' + k + '"' + (s.dicek ? " disabled" : "") + ">" +
          '<span class="tuts" aria-hidden="true">' + HURUF[k] + '</span><span class="opsi-label"><span class="sr-only">' + HURUF[k] + ". </span>" + esc(o) + '</span><span class="opsi-status">' + status + "</span></button>";
      }).join("");
      var panel = "";
      if (s.dicek) {
        panel = benar
          ? '<div class="umpan benar"><p class="umpan-judul">' + I("check-circle") + "Mantap, benar!</p><p>" + esc(q.alasan) + "</p></div>"
          : '<div class="umpan salah"><p class="umpan-judul">' + I("x-circle") + "Belum tepat</p><p>Jawaban yang benar adalah " + esc(q.opsi[q.benar]) + ". " + esc(q.alasan) + "</p>" +
            '<p><a class="tautan" href="' + tautanTopik(n, q.topik) + '">Baca lagi: ' + esc(q.topik) + "</a></p></div>";
      }
      return '<div class="kartu kartu-xl kartu-kuis tumpuk">' +
        '<div class="hanya-desktop-blok">' + K.progresBar(((s.i + (s.dicek ? 1 : 0)) / total) * 100, "Soal " + (s.i + 1) + " dari " + total, "Progres kuis") + "</div>" +
        '<div class="hanya-hp">' + K.progresBar(((s.i + (s.dicek ? 1 : 0)) / total) * 100, "Soal " + (s.i + 1) + " dari " + total, "Progres kuis") + "</div>" +
        '<h1 class="soal" id="soal-teks">' + esc(q.soal) + "</h1>" +
        '<div class="opsi-grid grid-2" role="radiogroup" aria-labelledby="soal-teks">' + opsi + "</div>" +
        '<p class="caption hanya-desktop-blok">Tekan A, B, C, atau D untuk memilih.</p>' +
        '<div aria-live="polite">' + panel + "</div>" +
        '<div class="aksi-kuis">' + (s.dicek
          ? K.tombol({ label: s.i === total - 1 ? "Lihat hasil" : "Lanjut", aksi: "lanjut", penuh: true, attr: ' data-f="lanjut"' })
          : K.tombol({ label: "Cek Jawaban", aksi: "cek", penuh: true, nonaktif: s.pilih === null, syaratId: "syarat-kuis", attr: ' data-f="cek"' }) +
            (s.pilih === null ? '<p class="syarat" id="syarat-kuis">Aktif setelah kamu memilih jawaban.</p>' : "")) + "</div></div>";
    }

    var k = LK.kerangkaModul(n, 3, "Kuis", '<div class="tengah-720 tumpuk"><div id="kuis"></div></div>', {
      tutup: true, kelasIsi: "isi-kuis",
      pasang: function (el) {
        var w = el.querySelector("#kuis");
        function g() {
          var a = document.activeElement, kunci = a && w.contains(a) ? a.getAttribute("data-f") : null;
          LK.isiHalus(w, gambar());
          if (kunci) { var b = w.querySelector('[data-f="' + kunci + '"]'); if (b && !b.disabled) b.focus(); }
        }
        g();
        function pilih(k) { if (s.dicek) return; s.pilih = k; g(); }
        w.addEventListener("click", function (e) {
          var o = e.target.closest("[data-opsi]"); if (o) { pilih(+o.getAttribute("data-opsi")); return; }
          var c = e.target.closest('[data-aksi="cek"]');
          if (c) { s.dicek = true; g(); w.querySelector('[data-f="lanjut"]').focus(); return; }
          var l = e.target.closest('[data-aksi="lanjut"]');
          if (l) {
            s.jawab[s.i] = s.pilih;
            if (s.i === soal.length - 1) { selesai(); return; }
            s.i++; s.pilih = null; s.dicek = false; g();
            var h = w.querySelector("h1"); h.setAttribute("tabindex", "-1"); h.focus();
          }
        });
        el.addEventListener("keydown", function (e) {
          if (e.target.matches("input, textarea") || e.ctrlKey || e.metaKey || e.altKey) return;
          var k = HURUF.indexOf(e.key.toUpperCase());
          if (k >= 0 && k < soal[s.i].opsi.length && !s.dicek) { pilih(k); var b = w.querySelector('[data-opsi="' + k + '"]'); if (b) b.focus(); }
        });
        var x = document.querySelector('[data-aksi="tutup-kuis"]');
        if (x) x.addEventListener("click", function () {
          LK.modal({
            labelId: "keluar-kuis-judul", deskId: "keluar-kuis-desk",
            html: '<h2 id="keluar-kuis-judul">Keluar dari kuis?</h2><p id="keluar-kuis-desk" class="redup">Jawabanmu belum disimpan.</p>' +
              '<div class="deret-tombol">' + K.tombol({ label: "Lanjut mengerjakan", aksi: "batal" }) + K.tombol({ label: "Keluar", varian: "secondary", aksi: "keluar" }) + "</div>",
            pasang: function (md, tutup) {
              md.querySelector('[data-aksi="batal"]').addEventListener("click", function () { tutup(); });
              md.querySelector('[data-aksi="keluar"]').addEventListener("click", function () { tutup(function () { LK.buka("#/beranda"); }); });
            }
          });
        });
        function selesai() {
          var salah = [];
          soal.forEach(function (q, i) { if (s.jawab[i] !== q.benar) salah.push({ no: i + 1, q: q, jawab: s.jawab[i] }); });
          var benar = soal.length - salah.length;
          var r = LK.catatKuis(n, benar, soal.length);
          hasilTerakhir[n] = { benar: benar, total: soal.length, salah: salah, lulus: r.lulus };
          LK.buka("#/modul/" + n + "/hasil");
        }
      }
    });
    k.topbar.judul = "Kuis Modul " + n;
    k.topbar.meta = "";
    return k;
  });

  /* ---------- Hasil ---------- */
  function deretLed(benar, total) {
    var batas = Math.ceil(total * 0.7), h = '<div class="deret-hasil" role="img" aria-label="' + benar + " dari " + total + " LED menyala. Batas lulus " + batas + ' soal benar.">';
    for (var i = 0; i < total; i++) {
      h += '<span class="led ' + (i < benar ? "nyala" : "mati") + '" aria-hidden="true"></span>';
      if (i === batas - 1) h += '<span class="garis-lulus" aria-hidden="true"></span>';
    }
    return h + "</div>";
  }

  LK.rute("/modul/(\\d+)/hasil", function (ctx) {
    var n = parseInt(ctx.p[0], 10), m = LK.modul(n), soal = soalModul(n);
    if (!m) return null;
    if (ctx.q.demo) {
      var lulusDemo = ctx.q.demo !== "belum", total = soal.length;
      var salahIdx = lulusDemo ? [2, 6] : [0, 2, 5, 6];
      salahIdx = salahIdx.filter(function (i) { return i < total; }).slice(0, lulusDemo ? Math.floor(total * 0.2) || 0 : Math.ceil(total * 0.4));
      var salah = salahIdx.map(function (i) { return { no: i + 1, q: soal[i], jawab: (soal[i].benar + 3) % 4 }; });
      /* Contoh tampilan untuk tinjauan desain. Di mode server tidak ikut disimpan ke akun. */
      var r = LK.server ? { lulus: (total - salah.length) / total >= 0.7 } : LK.catatKuis(n, total - salah.length, total);
      hasilTerakhir[n] = { benar: total - salah.length, total: total, salah: salah, lulus: r.lulus };
      LK.gantiHashDiam("#/modul/" + n + "/hasil" + (ctx.q.lencana ? "?lencana" : ""));
    }
    var h = hasilTerakhir[n];
    if (!h) return { alih: "#/modul/" + n + "/kuis" };
    var nilai = Math.round((h.benar / h.total) * 100), batas = Math.ceil(h.total * 0.7), next = n < 10 ? LK.modul(n + 1) : null;
    var offline = navigator.onLine === false;
    var buka = LK.bungkusModul(n, 3, "@@ISI@@").split("@@ISI@@");
    var html = buka[0] + '<div class="tengah-720 tumpuk"><div class="kartu kartu-xl tumpuk hasil">';
    if (h.lulus) {
      html += '<h1 class="judul-display">' + (next ? "Lulus! Modul " + (n + 1) + " terbuka." : "Lulus! Semua modul selesai.") + "</h1>" +
        "<h2>" + h.benar + " dari " + h.total + " soal benar</h2>" + deretLed(h.benar, h.total) +
        '<p class="caption">Nilai ' + nilai + ". Satu LED = satu soal benar, garis = batas lulus (" + batas + " soal, nilai 70).</p>" +
        (next ? '<div class="sambungan hidup"><span class="led selesai" aria-hidden="true">' + I("check", "ikon-sm") + '</span><span class="kabel-pendek hidup" aria-hidden="true"></span><span class="led nyala" aria-hidden="true">' + (n + 1) + "</span><p>Kabel ke Modul " + (n + 1) + ": " + esc(next.judul) + " sudah tersambung.</p></div>" : "") +
        (offline ? '<p class="chip chip-accent">Tersimpan di HP ini</p>' : "") +
        (h.salah.length ? "<h2>Soal yang perlu dicek lagi (" + h.salah.length + ')</h2><ul class="daftar-cek">' + h.salah.map(function (x) {
          return '<li class="kartu">' + I("x-circle", "ikon-galat") + '<div><p class="label">Soal ' + x.no + ": " + esc(x.q.soal) + '</p><p class="caption">Jawabanmu ' + esc(x.jawab === null || x.jawab === undefined ? "kosong" : x.q.opsi[x.jawab]) + ", yang benar " + esc(x.q.opsi[x.q.benar]) + ".</p></div></li>";
        }).join("") + "</ul>" : "<p>Sempurna, semua soal benar!</p>") +
        K.tombol({ label: "Ambil Lencana", varian: "accent", penuh: true, aksi: "lencana" }) +
        '<p class="tengah"><button type="button" class="tautan" data-aksi="bahas" aria-expanded="false" aria-controls="pembahasan">Lihat pembahasan semua soal</button></p>' +
        '<div id="pembahasan" hidden><ol class="daftar-bahas">' + soal.map(function (q) { return "<li><p class=\"label\">" + esc(q.soal) + "</p><p>Jawaban: " + esc(q.opsi[q.benar]) + ". " + esc(q.alasan) + "</p></li>"; }).join("") + "</ol></div>";
    } else {
      var kurang = batas - h.benar, topik = {};
      h.salah.forEach(function (x) { (topik[x.q.topik] = topik[x.q.topik] || []).push(x); });
      html += '<h1 class="judul-display">Belum lulus. Tinggal sedikit lagi.</h1>' +
        "<h2>" + h.benar + " dari " + h.total + " soal benar</h2>" + deretLed(h.benar, h.total) +
        '<p class="caption">Nilai ' + nilai + ". Satu LED = satu soal benar, garis = batas lulus (" + batas + " soal, nilai 70).</p>" +
        (next ? '<div class="sambungan"><span class="led" aria-hidden="true">' + n + '</span><span class="kabel-pendek" aria-hidden="true"></span><span class="led mati" aria-hidden="true">' + (n + 1) + "</span><p>Kabel ke Modul " + (n + 1) + " belum tersambung. Butuh " + kurang + " soal benar lagi.</p></div>" : "") +
        (offline ? '<p class="chip chip-accent">Tersimpan di HP ini</p>' : "") +
        "<h2>Yang perlu dipelajari lagi (" + h.salah.length + ' soal)</h2><ul class="daftar-cek">' + Object.keys(topik).map(function (t) {
          return '<li class="kartu baris-antara"><div><p class="label">' + esc(t) + '</p><p class="caption">' + topik[t].length + " soal belum tepat</p></div>" + K.tombol({ label: "Pelajari", varian: "secondary", href: tautanTopik(n, t) }) + "</li>";
        }).join("") + "</ul>" +
        '<div class="deret-tombol">' + K.tombol({ label: "Ulangi Kuis", href: "#/modul/" + n + "/kuis" }) + K.tombol({ label: "Pelajari lagi bagian yang salah", varian: "secondary", href: "#/modul/" + n + "/materi" }) + "</div>" +
        '<p class="caption">Kuis boleh diulang berapa kali pun. Nilai terbaikmu yang disimpan.</p>';
    }
    html += "</div></div>" + buka[1];
    return {
      judul: h.lulus ? "Lulus" : "Belum lulus", aktif: "modul-" + n, kelasIsi: "isi-kuis",
      topbar: { judul: "Hasil Kuis Modul " + n, kembali: "#/beranda" }, html: html,
      pasang: function (el) {
        LK.gerakModul(el);
        var b = el.querySelector('[data-aksi="bahas"]');
        if (b) b.addEventListener("click", function () { var p = el.querySelector("#pembahasan"); p.hidden = !p.hidden; b.setAttribute("aria-expanded", !p.hidden); });
        var l = el.querySelector('[data-aksi="lencana"]');
        if (l) {
          l.addEventListener("click", function () { LK.modalLencana(n, h); });
          if (ctx.q.lencana) setTimeout(function () { LK.modalLencana(n, h); }, 50);
        }
      }
    };
  });

  /* ---------- 06 Modal lencana ---------- */
  LK.modalLencana = function (n, h) {
    var m = LK.modul(n), next = n < 10, nilai = Math.round((h.benar / h.total) * 100);
    var konfeti = "";
    if (!LK.kurangiGerak()) for (var i = 0; i < 14; i++) konfeti += '<span style="left:' + (6 + i * 6.5) + "%;animation-delay:" + (i % 5) * 60 + 'ms"></span>';
    LK.modal({
      labelId: "lencana-judul", kelas: "tengah modal-lencana", fokus: '[data-aksi="lanjut-modul"]',
      html: '<div class="konfeti" aria-hidden="true">' + konfeti + "</div>" +
        '<span class="lencana-besar" aria-hidden="true">' + I("award") + "</span>" +
        '<h2 id="lencana-judul">Lencana baru: ' + esc(m.lencana) + "!</h2>" +
        '<p class="redup">Kamu sudah menyelesaikan Modul ' + n + ": " + esc(m.judul) + ".</p>" +
        K.chip("success", "Skor kuis " + h.benar + "/" + h.total + ". " + (nilai === 100 ? "Sempurna!" : "Bagus!")) +
        '<div class="deret-tombol tombol-lencana">' + K.tombol({ label: next ? "Lanjut ke Modul " + (n + 1) : "Lihat Semua Lencana di Rekap", varian: "accent", aksi: "lanjut-modul" }) +
        K.tombol({ label: "Lihat Rekap", varian: "ghost", aksi: "rekap" }) + "</div>",
      pasang: function (md, tutup) {
        md.querySelector('[data-aksi="lanjut-modul"]').addEventListener("click", function () { tutup(function () { LK.buka(next ? "#/beranda?naik=" + (n + 1) : "#/rekap"); }); });
        md.querySelector('[data-aksi="rekap"]').addEventListener("click", function () { tutup(function () { LK.buka("#/rekap"); }); });
      }
    });
  };
})();
