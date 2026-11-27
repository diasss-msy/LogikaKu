/* Layar 02 / 02b Materi dan 10b Gagal memuat materi. */
(function () {
  var I = LK.ikon, esc = LK.esc, K = LK.k;

  /* Kepala panel tiap halaman modul: nama bab dan modul, langkah Materi-Latihan-Kuis, dan progres modul.
   * Di HP nama modul sudah ada di top bar, jadi yang tampil hanya langkahnya. */
  LK.kepalaModul = function (n, langkah) {
    var m = LK.modul(n), bab = LK.data.bab[m.bab - 1], l = LK.langkahModul(n);
    return '<div class="p-panel mod-kepala"><div class="p-judul"><span class="p-ikon" aria-hidden="true">' + I("book-open") + "</span>" +
      '<div><p class="caption">' + esc(bab ? bab.judul : "") + " · Modul " + n + '</p><p class="mod-nama">' + esc(m.judul) + "</p></div></div>" +
      (langkah ? K.langkah(langkah) : "") +
      '<div class="mod-progres">' + K.progresBar((l / 3) * 100, l + " dari 3 langkah selesai", "Progres Modul " + n) + "</div></div>";
  };

  /* Rel isi modul (desktop): bagian materi, latihan, dan kuis sebagai LED yang disambung kabel. */
  LK.relModul = function (n, langkah, bagian) {
    var m = LK.modul(n), l = LK.langkahModul(n), daftar = LK.data.materi[n] || [];
    function item(href, label, st, sub) {
      var isi = '<span class="rel-led" aria-hidden="true">' + (st === "selesai" ? I("check", "ikon-sm") : "") + '</span><span class="rel-teks"><span class="rel-label">' + esc(label) + "</span>" + (sub ? '<span class="caption">' + esc(sub) + "</span>" : "") + "</span>";
      var kls = "rel-item " + st;
      if (st === "kunci") return '<li class="' + kls + '"><span class="rel-tautan" aria-disabled="true">' + isi + '<span class="sr-only"> (belum terbuka)</span></span></li>';
      return '<li class="' + kls + '"><a class="rel-tautan" href="' + href + '"' + (st === "aktif" ? ' aria-current="page"' : "") + ">" + isi + "</a></li>";
    }
    var h = '<nav class="p-panel rel-modul" aria-label="Isi Modul ' + n + '"><div><p class="caption">Modul ' + n + '</p><p class="mod-nama">' + esc(m.judul) + "</p></div>" +
      '<p class="rel-grup">Materi</p><ol class="rel-daftar">';
    daftar.forEach(function (d, i) {
      var b = i + 1, st = langkah === 1 && b === bagian ? "aktif" : (l >= 1 || (langkah === 1 && b < bagian) || langkah > 1) ? "selesai" : "";
      h += item("#/modul/" + n + "/materi?bagian=" + b, d.judul, st, "Bagian " + b);
    });
    h += '</ol><p class="rel-grup">Uji pemahaman</p><ol class="rel-daftar">' +
      item("#/modul/" + n + "/latihan", "Latihan", langkah === 2 ? "aktif" : l >= 2 ? "selesai" : l >= 1 || langkah > 2 ? "" : "kunci", m.namaLatihan) +
      item("#/modul/" + n + "/kuis", "Kuis", langkah === 3 ? "aktif" : l >= 3 ? "selesai" : l >= 2 ? "" : "kunci", "Lulus dengan nilai 70") +
      "</ol></nav>";
    return h;
  };

  /* Tata letak halaman modul. "rel" (bawaan): rel isi di kiri, isi bertumpuk di kanan.
   * "sorot" (?tata=b): kepala besar berwarna dengan progres modul, isi dua kolom di bawahnya. */
  LK.tataModul = function () { return /[?&]tata=b\b/.test(location.hash) ? "sorot" : "rel"; };
  LK.bungkusModul = function (n, langkah, html, bagian) {
    var t = LK.tataModul();
    return '<div class="hal-modul tata-' + t + '">' + LK.kepalaModul(n, langkah) +
      (t === "rel" ? LK.relModul(n, langkah || 1, bagian || 0) : "") + '<div class="modul-isi">' + html + "</div></div>";
  };

  LK.kerangkaModul = function (n, langkah, judul, html, opsi) {
    opsi = opsi || {};
    var m = LK.modul(n);
    return {
      judul: judul + " | Modul " + n, aktif: "modul-" + n, kelasIsi: opsi.kelasIsi || "",
      topbar: { judul: "Modul " + n + ": " + m.judul, meta: ["Materi", "Latihan", "Kuis"][langkah - 1], kembali: opsi.kembali || "#/beranda", tutup: opsi.tutup },
      html: LK.bungkusModul(n, opsi.tanpaLangkah ? 0 : langkah, html, opsi.bagian), pasang: opsi.pasang
    };
  };

  LK.layarTerkunci = function (n) {
    var m = LK.modul(n);
    return {
      judul: "Modul terkunci", aktif: "modul-" + n, topbar: { judul: "Modul " + n + ": " + m.judul },
      html: '<div class="keadaan"><span class="petak-ikon" aria-hidden="true">' + I("lock", "ikon-lg") + "</span><h1>Modul " + n + " masih terkunci</h1>" +
        '<p class="redup">Selesaikan kuis Modul ' + (n - 1) + " dengan nilai 70 atau lebih untuk menyalakan modul ini.</p>" +
        K.tombol({ label: "Kembali ke Beranda", href: "#/beranda" }) + "</div>"
    };
  };

  LK.rute("/modul/(\\d+)/materi", function (ctx) {
    var n = parseInt(ctx.p[0], 10), m = LK.modul(n);
    if (!m) return null;
    if (LK.statusModul(n) === "terkunci" && !ctx.q.paksa) return LK.layarTerkunci(n);

    if (ctx.q.gagal) {
      return LK.kerangkaModul(n, 1, "Materi gagal dimuat",
        '<div class="keadaan"><span class="petak-ikon galat" aria-hidden="true">' + I("alert-triangle", "ikon-lg") + "</span>" +
        "<h1>Materi gagal dimuat</h1><p class=\"redup lebar-baca\">Server LogikaKu sedang tidak bisa dihubungi. Progresmu aman. Coba lagi dalam beberapa menit.</p>" +
        '<div class="deret-tombol">' + K.tombol({ label: "Coba lagi", href: "#/modul/" + n + "/materi" }) + K.tombol({ label: "Kembali ke Beranda", varian: "secondary", href: "#/beranda" }) + "</div></div>",
        { tanpaLangkah: true });
    }

    var daftar = LK.data.materi[n] || [], total = daftar.length;
    var b = Math.min(Math.max(parseInt(ctx.q.bagian, 10) || 1, 1), total), isi = daftar[b - 1];
    var akhir = b === total;
    var teks = isi.isi.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    var html =
      '<div class="dua-kolom rasio-7-5 materi">' +
      '<article class="tumpuk materi-baca"><p class="caption">Bagian ' + b + " dari " + total + "</p>" +
      '<h1 class="judul-display">' + esc(isi.judul) + "</h1>" +
      '<div class="hanya-hp">' + K.ilustrasi(isi.ilustrasi) + "</div>" +
      '<div class="tumpuk teks-materi">' + teks + "</div>" +
      (isi.contoh ? K.callout("contoh", "Contoh", "<p>" + esc(isi.contoh) + "</p>") : "") +
      (isi.kode ? K.kode(isi.kode, "Contoh tabel atau kode") : "") +
      (isi.ingat ? K.callout("ingat", "Ingat", "<p>" + esc(isi.ingat) + "</p>") : "") +
      '<nav class="nav-bawah" aria-label="Navigasi materi">' +
      (b > 1 ? K.tombol({ label: "Sebelumnya", varian: "ghost", ikon: "arrow-left", href: "#/modul/" + n + "/materi?bagian=" + (b - 1) })
        : K.tombol({ label: "Beranda", varian: "ghost", ikon: "arrow-left", href: "#/beranda" })) +
      (akhir ? K.tombol({ label: "Mulai Latihan", aksi: "mulai-latihan", kelas: "utama" })
        : K.tombol({ label: "Lanjut", href: "#/modul/" + n + "/materi?bagian=" + (b + 1), kelas: "utama" })) +
      "</nav></article>" +
      '<aside class="hanya-desktop lengket">' + K.ilustrasi(isi.ilustrasi) + "</aside></div>";
    return LK.kerangkaModul(n, 1, isi.judul, html, {
      bagian: b,
      pasang: function (el) {
        var t = el.querySelector('[data-aksi="mulai-latihan"]');
        if (t) t.addEventListener("click", function () { LK.setLangkah(n, 1); LK.buka("#/modul/" + n + "/latihan"); });
      }
    });
  });
})();
