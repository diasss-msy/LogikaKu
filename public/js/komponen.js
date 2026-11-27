/* Pembuat HTML komponen. Semua mengembalikan string HTML. */
window.LK = window.LK || {};
(function () {
  var I = LK.ikon, esc = LK.esc;
  var K = (LK.k = {});

  K.tombol = function (o) {
    var kelas = "tombol tombol-" + (o.varian || "primary") + (o.penuh ? " penuh" : "") + (o.kelas ? " " + o.kelas : "");
    var isi = (o.ikon ? I(o.ikon) : "") + "<span>" + esc(o.label) + "</span>" + (o.ikonKanan ? I(o.ikonKanan) : "");
    var attr = (o.id ? ' id="' + o.id + '"' : "") + (o.aksi ? ' data-aksi="' + o.aksi + '"' : "") + (o.attr || "");
    if (o.href) return '<a class="' + kelas + '" href="' + o.href + '"' + attr + ">" + isi + "</a>";
    return '<button type="' + (o.type || "button") + '" class="' + kelas + '"' + attr + (o.nonaktif ? " disabled" : "") +
      (o.syaratId ? ' aria-describedby="' + o.syaratId + '"' : "") + ">" + isi + "</button>";
  };
  K.tautan = function (href, label, ikon) {
    return '<a class="tautan" href="' + href + '">' + (ikon ? I(ikon) : "") + esc(label) + "</a>";
  };

  K.logo = function (href) {
    return '<a class="logo" href="' + (href || "#/beranda") + '"><span class="logo-chip" aria-hidden="true">L</span>LogikaKu</a>';
  };

  /* Tombol ganti mode terang/gelap. Labelnya menyebut mode tujuan. */
  /* Kepala panel: ikon, judul (h2), keterangan, dan aksi di kanan. Dipakai Beranda, Profil, Pengaturan. */
  K.kepalaPanel = function (ikon, id, judul, ket, aksi) {
    return '<div class="p-kepala"><div class="p-judul"><span class="p-ikon" aria-hidden="true">' + I(ikon) + '</span><div>' +
      '<h2 id="' + id + '">' + judul + '</h2>' + (ket ? '<p class="caption">' + ket + "</p>" : "") + "</div></div>" + (aksi ? '<div class="p-aksi">' + aksi + "</div>" : "") + "</div>";
  };

  K.tombolTema = function () {
    var gelap = LK.temaAktif() === "gelap", label = "Ganti ke mode " + (gelap ? "terang" : "gelap");
    return '<button type="button" class="tombol-ikon tombol-tema" data-aksi="ganti-tema" aria-label="' + label + '" title="' + label + '">' +
      I(gelap ? "sun" : "moon", "ikon-lg") + "</button>";
  };

  K.progresBar = function (nilai, teksKiri, label) {
    var v = Math.max(0, Math.min(100, Math.round(nilai)));
    return '<div><div class="progres-teks"><span>' + esc(teksKiri || "") + "</span><span>" + v + "%</span></div>" +
      '<div class="progres' + (v >= 100 ? " penuh" : "") + '" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + v + '" aria-label="' + esc(label || teksKiri || "Progres") + '"><span style="width:' + v + '%"></span></div></div>';
  };

  K.langkah = function (aktif) {
    var nama = ["Materi", "Latihan", "Kuis"], h = '<ol class="langkah" aria-label="Langkah modul">';
    nama.forEach(function (n, i) {
      var no = i + 1, st = no < aktif ? "selesai" : no === aktif ? "aktif" : "";
      if (i > 0) h += '<li aria-hidden="true"><span class="sambung' + (no <= aktif ? " hidup" : "") + '"></span></li>';
      h += '<li class="' + st + '"' + (st === "aktif" ? ' aria-current="step"' : "") + '><span class="bulat">' +
        (st === "selesai" ? I("check", "ikon-sm") : no) + "</span>" + n +
        (st === "selesai" ? '<span class="sr-only"> (selesai)</span>' : "") + "</li>";
    });
    return h + "</ol>";
  };

  K.callout = function (jenis, judul, isi) {
    var ik = { contoh: "lightbulb", ingat: "bookmark", tips: "star" }[jenis];
    return '<div class="callout callout-' + jenis + '">' + I(ik) + '<p class="callout-judul">' + esc(judul) + "</p><div>" + isi + "</div></div>";
  };

  K.kode = function (teks, label) {
    return '<pre class="blok-kode"' + (label ? ' aria-label="' + esc(label) + '"' : "") + "><code>" + esc(teks) + "</code></pre>";
  };

  K.chip = function (tone, label) { return '<span class="chip chip-' + tone + '">' + esc(label) + "</span>"; };

  /* Sel T/F statis (input / hasil) */
  K.sel = function (nilai, kelas) {
    var t = nilai === true || nilai === "T";
    var huruf = nilai === null || nilai === undefined ? "?" : t ? "T" : "F";
    var led = huruf === "?" ? "" : '<span class="led-kecil' + (t ? " nyala" : "") + '" aria-hidden="true"></span>';
    return '<span class="sel ' + (kelas || "input") + '">' + led + huruf + "</span>";
  };

  /* Rangkaian Progres untuk satu bab (5 LED). opsi.mengalirKe = no modul yang baru terbuka */
  K.rangkaian = function (bab, opsi) {
    opsi = opsi || {};
    var daftar = LK.data.bab[bab - 1].modul, now = LK.modulSekarang();
    var st = daftar.map(function (n) { return LK.lulus(n) ? "selesai" : n === now ? "sekarang" : "mati"; });
    var selesai = [], kunci = [];
    daftar.forEach(function (n, i) { if (st[i] === "selesai") selesai.push(n); else if (st[i] === "mati") kunci.push(n); });
    var alt = (selesai.length ? "Modul " + gabung(selesai) + " selesai" : "Belum ada modul yang selesai") +
      (st.indexOf("sekarang") >= 0 ? ", sedang di Modul " + now : "") + (kunci.length ? ", Modul " + gabung(kunci) + " belum menyala" : "") + ".";
    var kabel = "", led = "";
    for (var i = 0; i < 4; i++) {
      var hidup = st[i] === "selesai" && st[i + 1] !== "mati";
      var ngalir = opsi.mengalirKe && daftar[i + 1] === opsi.mengalirKe && !LK.kurangiGerak();
      kabel += '<span class="rangkaian-kabel' + (ngalir ? " mengalir" : hidup ? " hidup" : "") + '" style="left:' + (10 + i * 20) + '%;width:20%"><span class="arus"></span></span>';
    }
    daftar.forEach(function (n, i) {
      var m = LK.modul(n), s = st[i];
      var ngalir = opsi.mengalirKe === n && !LK.kurangiGerak();
      led += '<span class="rangkaian-led' + (ngalir ? " menyala-telat" : "") + '"><span class="led ' + (s === "selesai" ? "selesai" : s === "sekarang" ? "nyala" : "") + '">' +
        (s === "selesai" ? I("check", "ikon-sm") : n) + '</span><span class="rangkaian-label">' + esc(m.pendek) + "</span></span>";
    });
    return '<div class="rangkaian" role="img" aria-label="' + esc(alt) + '"><div class="rangkaian-baris" aria-hidden="true">' + kabel + led + "</div></div>";
  };
  function gabung(a) {
    if (a.length === 1) return a[0];
    if (a.length === 2) return a[0] + " dan " + a[1];
    return a[0] + " sampai " + a[a.length - 1];
  }

  K.kartuModul = function (n) {
    var m = LK.modul(n), s = LK.statusModul(n), l = LK.langkahModul(n), pct = Math.round((l / 3) * 100);
    var ikonPetak = s === "selesai" ? "check" : s === "terkunci" ? "lock" : "book-open";
    var status = { selesai: "Selesai", berjalan: "Sedang berjalan", tersedia: "Belum dimulai", terkunci: "Selesaikan modul sebelumnya" }[s];
    var aksi = "";
    if (s === "selesai") aksi = K.tombol({ varian: "secondary", label: "Ulangi", href: "#/modul/" + n + "/materi", attr: ' aria-label="Ulangi Modul ' + n + '"' });
    else if (s === "berjalan") aksi = K.tombol({ label: "Lanjutkan", href: LK.tautanLanjut(n), attr: ' aria-label="Lanjutkan Modul ' + n + '"' });
    else if (s === "tersedia") aksi = K.tombol({ label: "Mulai", href: "#/modul/" + n + "/materi", attr: ' aria-label="Mulai Modul ' + n + '"' });
    return '<article class="kartu-modul ' + s + '" aria-labelledby="km-' + n + '">' +
      '<div class="kartu-modul-kepala"><span class="petak">' + I(ikonPetak) + "</span><div>" +
      '<p class="caption">Modul ' + n + '</p><h3 id="km-' + n + '" title="' + esc(m.judul) + '">' + esc(m.judul) + "</h3></div></div>" +
      "<p" + (s === "terkunci" ? ' class="redup"' : "") + ">" + esc(m.desk) + "</p>" +
      K.progresBar(pct, l + "/3 langkah", "Progres Modul " + n) +
      '<div class="kartu-modul-kaki"><span class="status-teks' + (s === "terkunci" ? " redup" : "") + '">' + status + "</span>" + aksi + "</div></article>";
  };

  /* Tautan "lanjutkan" sesuai langkah terakhir */
  LK.tautanLanjut = function (n) {
    var l = LK.langkahModul(n);
    return "#/modul/" + n + "/" + (l === 0 ? "materi" : l === 1 ? "latihan" : "kuis");
  };

  K.kolom = function (o) {
    var id = o.id, desk = [];
    if (o.bantuan) desk.push(id + "-bantuan");
    desk.push(id + "-galat");
    var sandi = o.type === "password";
    return '<div class="kolom' + (sandi ? " sandi" : "") + (o.galat ? " error" : "") + '" data-kolom="' + id + '">' +
      '<label for="' + id + '">' + esc(o.label) + "</label>" +
      '<div class="kolom-bungkus"><input id="' + id + '" name="' + (o.name || id) + '" type="' + (o.type || "text") + '"' +
      (o.autocomplete ? ' autocomplete="' + o.autocomplete + '"' : "") + (o.placeholder ? ' placeholder="' + esc(o.placeholder) + '"' : "") +
      (o.nilai ? ' value="' + esc(o.nilai) + '"' : "") + (o.maxlength ? ' maxlength="' + o.maxlength + '"' : "") +
      (o.inputmode ? ' inputmode="' + o.inputmode + '"' : "") + (o.galat ? ' aria-invalid="true"' : "") +
      ' aria-describedby="' + desk.join(" ") + '">' +
      (sandi ? '<button type="button" class="tombol-ikon mata" data-mata="' + id + '" aria-label="Tampilkan kata sandi" aria-pressed="false">' + I("eye") + "</button>" : "") +
      "</div>" +
      '<p class="galat" id="' + id + '-galat">' + I("alert-circle", "ikon-sm") + "<span>" + esc(o.galat || "") + "</span></p>" +
      (o.bantuan ? '<p class="bantuan" id="' + id + '-bantuan">' + esc(o.bantuan) + "</p>" : "") + "</div>";
  };

  K.saklar = function (id, label, nyala, keterangan) {
    return '<button type="button" class="saklar" role="switch" id="' + id + '" aria-checked="' + (nyala ? "true" : "false") + '"' +
      (keterangan ? ' aria-describedby="' + id + '-ket"' : "") + '><span class="label">' + esc(label) + '</span><span class="saklar-pil" aria-hidden="true"></span><span class="saklar-huruf" aria-hidden="true">' + (nyala ? "T" : "F") + "</span></button>";
  };

  K.segmen = function (nama, label, pilihan, nilai, kelas) {
    var h = '<div class="segmen ' + (kelas || "") + '" role="radiogroup" aria-label="' + esc(label) + '" data-segmen="' + nama + '">';
    pilihan.forEach(function (p) {
      var on = p.nilai === nilai;
      h += '<button type="button" role="radio" aria-checked="' + on + '" tabindex="' + (on ? 0 : -1) + '" data-nilai="' + p.nilai + '">' + (on ? I("check", "ikon-sm") : "") + esc(p.label) + "</button>";
    });
    return h + "</div>";
  };
  /* Pasang perilaku radiogroup: klik dan panah kiri/kanan. */
  K.pasangSegmen = function (akar, nama, ubah) {
    var g = akar.querySelector('[data-segmen="' + nama + '"]');
    if (!g) return;
    var tombol = Array.prototype.slice.call(g.querySelectorAll("button"));
    function pilih(b, fokus) {
      tombol.forEach(function (t) {
        var on = t === b;
        t.setAttribute("aria-checked", on); t.tabIndex = on ? 0 : -1;
        var cek = t.querySelector("svg"); if (cek) cek.remove();
        if (on) t.insertAdjacentHTML("afterbegin", I("check", "ikon-sm"));
      });
      if (fokus) b.focus();
      ubah(b.getAttribute("data-nilai"));
    }
    tombol.forEach(function (t, i) {
      t.addEventListener("click", function () { pilih(t); });
      t.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (d) { e.preventDefault(); pilih(tombol[(i + d + tombol.length) % tombol.length], true); }
      });
    });
    return { pilih: function (v) { tombol.forEach(function (t) { if (t.getAttribute("data-nilai") === v) pilih(t); }); } };
  };

  K.ilustrasi = function (jenis) {
    if (jenis === "gerbang") {
      return '<figure class="ilustrasi" role="img" aria-label="Dua saklar menyala masuk ke gerbang AND, dan LED keluaran menyala."><div class="ilus-gerbang" aria-hidden="true">' +
        '<span class="led nyala">T</span><span class="kabel-ilus hidup"></span><span class="gerbang-mini">AND</span><span class="kabel-ilus hidup"></span><span class="led nyala"></span></div>' +
        '<figcaption class="label">T AND T = lampu nyala</figcaption></figure>';
    }
    if (jenis === "kode") {
      return '<figure class="ilustrasi" role="img" aria-label="Tiga langkah berurutan yang disambung panah, seperti algoritma."><div class="ilus-langkah" aria-hidden="true">' +
        '<span>Langkah 1</span>' + I("arrow-down", "ikon-sm") + '<span>Langkah 2</span>' + I("arrow-down", "ikon-sm") + '<span class="aktif">Langkah 3</span></div>' +
        '<figcaption class="label">Algoritma = langkah yang urut</figcaption></figure>';
    }
    return '<figure class="ilustrasi" role="img" aria-label="Lampu kuning menyala berlabel T sama dengan lampu nyala, dan lampu abu-abu mati berlabel F sama dengan lampu mati."><div class="ilus-lampu" aria-hidden="true">' +
      '<div><span class="bola nyala">' + I("lightbulb", "ikon-lg") + '</span><span class="label">T = lampu nyala</span></div>' +
      '<div><span class="bola">' + I("lightbulb", "ikon-lg") + '</span><span class="label">F = lampu mati</span></div></div></figure>';
  };
})();
