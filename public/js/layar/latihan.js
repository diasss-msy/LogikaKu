/* Layar latihan: 15 proposisi, 09 gerbang, 16 implikasi, 03 tabel kebenaran, 17 ekuivalensi,
 * 18 komputasi, 04 flowchart, 08 pseudocode, 19 percabangan, 20 perulangan.
 * Semua bisa diselesaikan dengan ketuk dan keyboard (tanpa seret). */
(function () {
  var I = LK.ikon, esc = LK.esc, K = LK.k, L = LK.data.latihan;

  /* ---------- Bantuan umum ---------- */
  function TF(v) { return v ? "T" : "F"; }
  function lanjutKuis(n) { LK.setLangkah(n, 2); LK.buka("#/modul/" + n + "/kuis"); }
  function umpan(jenis, judul, isi) {
    return '<div class="umpan ' + jenis + '">' + '<p class="umpan-judul">' + I(jenis === "benar" ? "check-circle" : jenis === "salah" ? "x-circle" : "alert-circle") + esc(judul) + "</p>" + (isi || "") + "</div>";
  }
  /* Gambar ulang sebuah wadah sambil menjaga fokus pada elemen yang setara. */
  function penggambar(wadah, gambar) {
    return function () {
      var a = document.activeElement, kunci = a && wadah.contains(a) ? a.getAttribute("data-f") : null;
      LK.isiHalus(wadah, gambar());
      if (kunci) { var b = wadah.querySelector('[data-f="' + kunci + '"]'); if (b && !b.disabled) b.focus(); else { var c = wadah.querySelector("[data-f-cadangan]"); if (c) c.focus(); } }
    };
  }
  function on(wadah, sel, ev, fn) {
    wadah.addEventListener(ev, function (e) { var t = e.target.closest(sel); if (t && wadah.contains(t)) fn(t, e); });
  }
  function siapCek(id, aktif, syarat) {
    return K.tombol({ label: "Cek Jawaban", id: id, aksi: "cek", nonaktif: !aktif, penuh: true, syaratId: id + "-syarat", attr: ' data-f="cek"' }) +
      (aktif ? "" : '<p class="syarat" id="' + id + '-syarat">' + esc(syarat) + "</p>");
  }
  function tombolAkhir(ulangLabel) {
    return '<div class="deret-tombol">' + K.tombol({ label: ulangLabel || "Ulangi latihan", varian: "secondary", aksi: "ulang", attr: ' data-f="ulang"' }) +
      K.tombol({ label: "Lanjut ke Kuis", aksi: "kuis", attr: ' data-f="kuis" data-f-cadangan' }) + "</div>";
  }

  var latihan = {};

  /* ---------- 15 Proposisi atau bukan? ---------- */
  latihan.proposisi = function (n, ctx) {
    var s = { item: L.proposisi.map(function (x) { return { teks: x.teks, jawaban: x.jawaban, alasan: x.alasan, taruh: null }; }), pilih: 0, dicek: false };
    if (ctx.q.demo === "benar") { s.item.forEach(function (x) { x.taruh = x.jawaban; }); s.dicek = true; s.pilih = null; }
    function antre() { return s.item.map(function (x, i) { return i; }).filter(function (i) { return !s.item[i].taruh; }); }
    function kotak(kode, judul, def) {
      var isi = s.item.map(function (x, i) { return { x: x, i: i }; }).filter(function (o) { return o.x.taruh === kode; });
      return '<div class="kotak-tujuan">' +
        '<button type="button" class="kotak-tombol" data-tujuan="' + kode + '" data-f="tujuan-' + kode + '"' + (s.dicek ? " disabled" : "") + '><span class="h3-like">' + judul + '</span><span class="caption">' + def + "</span>" +
        (!s.dicek && s.pilih !== null ? '<span class="caption biru">Ketuk kotak ini untuk menaruh kalimat terpilih.</span>' : "") + "</button>" +
        (isi.length ? '<ul class="daftar-taruh">' + isi.map(function (o) {
          var b = o.x.taruh === o.x.jawaban;
          var kelas = s.dicek ? (b ? "benar" : "salah") : "";
          return "<li>" + (s.dicek
            ? '<div class="item-taruh ' + kelas + '"><span>' + esc(o.x.teks) + '</span><span class="status">' + I(b ? "check" : "x") + '<span class="sr-only">' + (b ? "Benar" : "Belum tepat") + "</span></span></div>"
            : '<button type="button" class="item-taruh" data-kembali="' + o.i + '" data-f="kembali-' + o.i + '" aria-label="' + esc(o.x.teks) + ', ketuk untuk mengembalikan"><span>' + esc(o.x.teks) + "</span></button>") + "</li>";
        }).join("") + "</ul>" : "") + "</div>";
    }
    function gambar() {
      var q = antre(), ditaruh = s.item.length - q.length, semua = q.length === 0;
      var benar = s.item.filter(function (x) { return x.taruh === x.jawaban; }).length;
      var kiri = '<div class="tumpuk"><h1 class="judul-display">Proposisi atau bukan?</h1>' +
        '<p class="redup">Proposisi adalah kalimat yang bisa dinilai benar atau salah. Ketuk kalimat, lalu ketuk kotak tujuannya.</p>' +
        K.progresBar((ditaruh / s.item.length) * 100, ditaruh + " dari " + s.item.length + " kalimat", "Kalimat yang sudah ditaruh");
      if (q.length) {
        kiri += '<p class="label">Kalimat terpilih</p>' + '<div class="tumpuk-sm">' + q.map(function (i, k) {
          var on = s.pilih === i;
          return (k === 1 ? '<p class="caption">Berikutnya</p>' : "") + '<button type="button" class="kalimat' + (on ? " dipilih" : "") + '" data-kalimat="' + i + '" data-f="kalimat-' + i + '" aria-pressed="' + on + '">' + esc(s.item[i].teks) + "</button>";
        }).join("") + "</div>";
      } else if (!s.dicek) {
        kiri += '<p class="redup">Semua kalimat sudah ditaruh. Cek jawabanmu.</p>';
      }
      kiri += "</div>";
      var kanan = '<div class="tumpuk"><div class="kotak-ganda">' + kotak("ya", "Proposisi", "Bisa dinilai benar atau salah.") + kotak("bukan", "Bukan proposisi", "Perintah, pertanyaan, harapan, atau kalimat terbuka.") + "</div>" +
        K.callout("tips", "Petunjuk", '<p>Tanyakan: bisakah kalimat ini dijawab "benar" atau "salah"? Kalau bisa, itu proposisi, walaupun jawabannya salah.</p>') +
        '<div aria-live="polite">' + (s.dicek ? (benar === s.item.length
          ? umpan("benar", "Mantap, semua benar!", "<p>Kamu bisa membedakan proposisi dan bukan proposisi.</p>")
          : umpan("salah", benar + " dari " + s.item.length + " benar", "<ul>" + s.item.filter(function (x) { return x.taruh !== x.jawaban; }).map(function (x) { return "<li>“" + esc(x.teks) + "”: " + esc(x.alasan) + "</li>"; }).join("") + "</ul>")) : "") + "</div>" +
        (s.dicek ? tombolAkhir() : siapCek("cek-prop", semua, "Aktif setelah semua kalimat ditaruh.")) + "</div>";
      return '<div class="dua-kolom panel-480">' + kiri + kanan + "</div>";
    }
    return {
      judul: "Proposisi atau bukan?", html: '<div id="latihan"></div>',
      pasang: function (el) {
        var w = el.querySelector("#latihan"), g = penggambar(w, gambar); g();
        on(w, "[data-kalimat]", "click", function (t) { s.pilih = +t.getAttribute("data-kalimat"); g(); LK.umumkan("Terpilih: " + s.item[s.pilih].teks); });
        on(w, "[data-tujuan]", "click", function (t) {
          if (s.pilih === null) { LK.umumkan("Pilih kalimat dulu."); return; }
          var x = s.item[s.pilih], kode = t.getAttribute("data-tujuan");
          x.taruh = kode;
          var q = antre(); s.pilih = q.length ? q[0] : null;
          g();
          LK.umumkan("“" + x.teks + "” ditaruh di " + (kode === "ya" ? "Proposisi" : "Bukan proposisi") + ".");
          var nx = w.querySelector(s.pilih !== null ? '[data-kalimat="' + s.pilih + '"]' : '[data-f="cek"]'); if (nx) nx.focus();
        });
        on(w, "[data-kembali]", "click", function (t) { var i = +t.getAttribute("data-kembali"); s.item[i].taruh = null; s.pilih = i; g(); var k = w.querySelector('[data-kalimat="' + i + '"]'); if (k) k.focus(); });
        on(w, '[data-aksi="cek"]', "click", function () { s.dicek = true; s.pilih = null; g(); w.querySelector('[data-f="kuis"]').focus(); });
        on(w, '[data-aksi="ulang"]', "click", function () { s.item.forEach(function (x) { x.taruh = null; }); s.dicek = false; s.pilih = 0; g(); w.querySelector('[data-kalimat="0"]').focus(); });
        on(w, '[data-aksi="kuis"]', "click", function () { lanjutKuis(n); });
        w.addEventListener("keydown", function (e) { if (e.key === "Escape" && s.pilih !== null && !s.dicek) { s.pilih = null; g(); LK.umumkan("Pilihan dibatalkan."); } });
      }
    };
  };

  /* ---------- 09 Lab Gerbang Logika ---------- */
  latihan.gerbang = function (n) {
    var s = { g: "AND", a: true, b: false, t: 0 };
    function keluaran() { return s.g === "AND" ? s.a && s.b : s.g === "OR" ? s.a || s.b : !s.a; }
    function penjelasan(out) {
      if (s.g === "AND") return out ? "AND menyala karena kedua input T." : "AND butuh dua input T. Sekarang " + (!s.a && !s.b ? "A dan B" : !s.a ? "A" : "B") + " masih F.";
      if (s.g === "OR") return out ? "OR menyala karena minimal satu input T." : "OR butuh minimal satu input T. Sekarang keduanya F.";
      return out ? "NOT membalik nilai: A = F, jadi keluaran T." : "NOT membalik nilai: A = T, jadi keluaran F.";
    }
    function beres() { var c = L.gerbang[s.t]; return s.g === c.gerbang && keluaran() && (!c.satuSaja || s.a !== s.b); }
    function tabelMini() {
      var baris = s.g === "NOT" ? [[true], [false]] : [[true, true], [true, false], [false, true], [false, false]];
      var kepala = s.g === "NOT" ? "<th>A</th><th>hasil</th>" : "<th>A</th><th>B</th><th>hasil</th>";
      return '<table class="tabel-tk tabel-mini"><caption class="sr-only">Tabel kebenaran ' + s.g + '</caption><thead><tr>' + kepala + '<th class="sr-only">Keterangan</th></tr></thead><tbody>' +
        baris.map(function (r) {
          var a = r[0], b = r[1], h = s.g === "AND" ? a && b : s.g === "OR" ? a || b : !a;
          var skrg = s.g === "NOT" ? a === s.a : a === s.a && b === s.b;
          return '<tr class="' + (skrg ? "sekarang" : "") + '"><td>' + K.sel(a) + "</td>" + (s.g === "NOT" ? "" : "<td>" + K.sel(b) + "</td>") + "<td>" + K.sel(h, "isi") + "</td>" +
            '<td class="ket-sekarang">' + (skrg ? "sekarang" : "") + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function gambar() {
      var out = keluaran(), c = L.gerbang[s.t], ok = beres(), akhir = s.t === L.gerbang.length - 1;
      var papan = '<div class="papan" aria-label="Papan rangkaian">' +
        '<div class="papan-masuk"><div class="papan-baris">' + K.saklar("sak-a", "A", s.a) + '<span class="kabel-papan' + (s.a ? " hidup" : "") + '"></span></div>' +
        (s.g === "NOT" ? "" : '<div class="papan-baris">' + K.saklar("sak-b", "B", s.b) + '<span class="kabel-papan' + (s.b ? " hidup" : "") + '"></span></div>') + "</div>" +
        '<span class="gerbang-bentuk" aria-hidden="true">' + s.g + "</span>" +
        '<span class="kabel-papan pendek' + (out ? " hidup" : "") + '" aria-hidden="true"></span>' +
        '<span class="led-keluar" aria-hidden="true"><span class="led besar ' + (out ? "nyala" : "mati") + '"></span><span class="mono label">' + TF(out) + "</span></span></div>";
      var kiri = '<div class="tumpuk"><h1 class="judul-display">Lab Gerbang Logika</h1>' +
        K.callout("contoh", "Tantangan " + (s.t + 1) + " dari " + L.gerbang.length, "<p>" + esc(c.teks) + "</p>") +
        '<p class="label" id="label-gerbang">Pilih gerbang <span class="caption">(tombol 1 sampai 3)</span></p>' +
        K.segmen("gerbang", "Pilih gerbang", [{ nilai: "AND", label: "AND" }, { nilai: "OR", label: "OR" }, { nilai: "NOT", label: "NOT" }], s.g, "mono segmen-gerbang") +
        papan +
        '<div class="umpan info" aria-live="polite"><p class="label">Keluaran: ' + TF(out) + " (LED " + (out ? "menyala" : "mati") + ")</p><p>" + esc(penjelasan(out)) + "</p>" +
        (ok ? '<p class="label teks-sukses">' + I("check-circle", "ikon-sm") + " Tantangan selesai!</p>" : s.g !== c.gerbang ? '<p class="caption">Tantangan ini memakai gerbang ' + c.gerbang + ".</p>" : "") + "</div></div>";
      var kanan = '<div class="tumpuk"><h2>Tabel kebenaran ' + s.g + '</h2><div class="tabel-wadah">' + tabelMini() + "</div>" +
        (akhir && ok ? K.tombol({ label: "Lanjut ke Kuis", aksi: "kuis", penuh: true, attr: ' data-f="lanjut"' })
          : K.tombol({ label: "Tantangan berikutnya", aksi: "berikut", penuh: true, nonaktif: !ok, syaratId: "syarat-gerbang", attr: ' data-f="lanjut"' }) + (ok ? "" : '<p class="syarat" id="syarat-gerbang">Aktif setelah LED menyala sesuai tantangan.</p>')) +
        '<p class="tengah">' + '<button type="button" class="tautan" data-aksi="ulang" data-f="ulang">Ulang</button>' + "</p></div>";
      return '<div class="dua-kolom">' + kiri + kanan + "</div>";
    }
    return {
      judul: "Lab Gerbang Logika", html: '<div id="latihan"></div>',
      pasang: function (el) {
        var w = el.querySelector("#latihan"), g;
        function gambarUlang() {
          var a = document.activeElement, kunci = a ? a.id || a.getAttribute("data-f") || (a.getAttribute("data-nilai") ? "seg" : null) : null;
          LK.isiHalus(w, gambar());
          K.pasangSegmen(w, "gerbang", function (v) { if (s.g !== v) { s.g = v; gambarUlang(); w.querySelector('[data-segmen="gerbang"] [aria-checked="true"]').focus(); } });
          if (kunci === "seg") return;
          var b = kunci && (document.getElementById(kunci) || w.querySelector('[data-f="' + kunci + '"]'));
          if (b && !b.disabled) b.focus();
        }
        g = gambarUlang; g();
        on(w, ".saklar", "click", function (t) { if (t.id === "sak-a") s.a = !s.a; else s.b = !s.b; g(); });
        on(w, '[data-aksi="berikut"]', "click", function () { s.t++; s.a = false; s.b = false; s.g = L.gerbang[s.t].gerbang === "NOT" ? "NOT" : "AND"; g(); LK.umumkan("Tantangan " + (s.t + 1) + ": " + L.gerbang[s.t].teks); var x = w.querySelector("#sak-a"); if (x) x.focus(); });
        on(w, '[data-aksi="ulang"]', "click", function () { s.t = 0; s.g = "AND"; s.a = true; s.b = false; g(); });
        on(w, '[data-aksi="kuis"]', "click", function () { lanjutKuis(n); });
        w.addEventListener("keydown", function (e) {
          if (/^[123]$/.test(e.key)) { s.g = ["AND", "OR", "NOT"][+e.key - 1]; g(); LK.umumkan("Gerbang " + s.g + " dipilih."); }
        });
      }
    };
  };

  /* ---------- 16 Kapan janji dilanggar? ---------- */
  latihan.implikasi = function (n) {
    var data = L.implikasi, s = { isi: data.map(function () { return null; }), dicek: false };
    function gambar() {
      var aktif = s.isi.indexOf(null), semua = aktif === -1;
      var benar = data.filter(function (d, i) { return s.isi[i] === (!d.p || d.q); }).length;
      var baris = data.map(function (d, i) {
        var v = s.isi[i], jawab = !d.p || d.q, kelas = s.dicek ? (v === jawab ? "benar" : "salah") : v === null ? "" : "isi";
        var isi = v === null ? "?" : '<span class="led-kecil' + (v ? " nyala" : "") + '" aria-hidden="true"></span>' + TF(v) + (s.dicek ? I(v === jawab ? "check" : "x", "tanda") : "");
        return '<tr class="' + (!s.dicek && i === aktif ? "baris-aktif" : "") + '"><td>' + K.sel(d.p) + "</td><td>" + K.sel(d.q) + '</td><td class="kejadian">' + esc(d.kejadian) + "</td>" +
          '<td><button type="button" class="sel ' + kelas + '" data-sel="' + i + '" data-f="sel-' + i + '"' + (s.dicek ? " disabled" : "") +
          ' aria-label="Baris ' + (i + 1) + ", " + esc(d.kejadian) + ", p → q: " + (v === null ? "kosong" : TF(v)) + (s.dicek ? (v === jawab ? ", benar" : ", belum tepat") : "") + '">' + isi + "</button></td></tr>";
      }).join("");
      var salah = data.map(function (d, i) { return { d: d, i: i }; }).filter(function (o) { return s.isi[o.i] !== (!o.d.p || o.d.q); });
      var kiri = '<div class="tumpuk"><h1 class="judul-display">Kapan janji dilanggar?</h1>' +
        '<div class="kartu"><p class="teks-lg">"Kalau hujan (p), maka jalan basah (q)."</p><p class="mono label">p → q</p></div>' +
        '<p class="caption">Untuk setiap kejadian, ketuk kotak di kanan: T kalau janjinya ditepati, F kalau dilanggar. Bisa juga tekan T atau F.</p>' +
        '<div class="tabel-wadah"><table class="tabel-tk tabel-janji"><thead><tr><th>p</th><th>q</th><th class="kiri">Kejadian</th><th>p → q</th></tr></thead><tbody>' + baris + "</tbody></table></div></div>";
      var kanan = '<div class="tumpuk">' + K.callout("tips", "Petunjuk", "<p>Janji hanya dilanggar kalau syaratnya terjadi, tapi hasilnya tidak.</p>") +
        '<div aria-live="polite">' + (s.dicek ? (benar === data.length ? umpan("benar", "Mantap, semua benar!", "<p>Hanya baris hujan tapi jalan kering yang melanggar janji.</p>")
          : umpan("salah", benar + " dari " + data.length + " benar", salah.map(function (o) {
            return "<p>Baris " + (o.i + 1) + ": p = " + TF(o.d.p) + " dan q = " + TF(o.d.q) + ", jadi p → q = " + TF(!o.d.p || o.d.q) + "." + (o.d.p ? "" : " Syaratnya tidak terjadi, jadi janji tidak dilanggar.") + "</p>";
          }).join(""))) : "") + "</div>" +
        (s.dicek ? tombolAkhir() : siapCek("cek-janji", semua, "Aktif setelah semua kotak terisi.")) + "</div>";
      return '<div class="dua-kolom">' + kiri + kanan + "</div>";
    }
    return {
      judul: "Kapan janji dilanggar?", html: '<div id="latihan"></div>',
      pasang: function (el) {
        var w = el.querySelector("#latihan"), g = penggambar(w, gambar); g();
        function set(i, v) { s.isi[i] = v; g(); }
        on(w, "[data-sel]", "click", function (t) { var i = +t.getAttribute("data-sel"), v = s.isi[i]; set(i, v === null ? true : v ? false : null); });
        on(w, "[data-sel]", "keydown", function (t, e) {
          var i = +t.getAttribute("data-sel"), k = e.key.toLowerCase();
          if (k === "t") set(i, true); else if (k === "f") set(i, false); else if (k === "backspace" || k === "delete") set(i, null);
          else if (k === "arrowdown" || k === "arrowup") { e.preventDefault(); var x = w.querySelector('[data-sel="' + (i + (k === "arrowdown" ? 1 : -1)) + '"]'); if (x) x.focus(); }
        });
        on(w, '[data-aksi="cek"]', "click", function () { s.dicek = true; g(); w.querySelector('[data-f="kuis"]').focus(); });
        on(w, '[data-aksi="ulang"]', "click", function () { s.isi = data.map(function () { return null; }); s.dicek = false; g(); w.querySelector('[data-sel="0"]').focus(); });
        on(w, '[data-aksi="kuis"]', "click", function () { lanjutKuis(n); });
      }
    };
  };

  /* ---------- 03 Isi tabel kebenaran ---------- */
  var FUNGSI = {
    notp: function (p) { return !p; }, notq: function (p, q) { return !q; }, or: function (p, q) { return p || q; }, and: function (p, q) { return p && q; },
    orAndNotp: function (p, q) { return (p || q) && !p; }, nand: function (p, q) { return !(p && q); }, andOrNotq: function (p, q) { return (p && q) || !q; }
  };
  var ATURAN = { "∨": ["OR", "OR hanya bernilai F kalau kedua sisinya F."], "∧": ["AND", "AND hanya bernilai T kalau kedua sisinya T."], "¬": ["NOT", "NOT membalik nilai: T jadi F, F jadi T."] };
  var OPERATOR_HASIL = ["∧", "¬", "∨"];
  latihan.tabel = function (n, ctx) {
    var BARIS = [[true, true], [true, false], [false, true], [false, false]];
    var s = { soal: 0, isi: null, dicek: false, petunjuk: false };
    function kosong() { var so = L.tabel[s.soal]; s.isi = BARIS.map(function () { return so.kolom.map(function () { return null; }); }); s.dicek = false; }
    kosong();
    if (ctx.q.demo === "salah") {
      var so0 = L.tabel[0];
      s.isi = BARIS.map(function (r) { return so0.fungsi.map(function (f) { return FUNGSI[f](r[0], r[1]); }); });
      s.isi[3][1] = true; s.dicek = true;
    }
    function jawab(r, c) { var so = L.tabel[s.soal]; return FUNGSI[so.fungsi[c]](BARIS[r][0], BARIS[r][1]); }
    function aturanKolom(c) {
      var so = L.tabel[s.soal], lab = so.kolom[c];
      if (lab === "hasil") return ATURAN[OPERATOR_HASIL[s.soal]];
      return lab.indexOf("∨") >= 0 ? ATURAN["∨"] : lab.indexOf("∧") >= 0 ? ATURAN["∧"] : ATURAN["¬"];
    }
    function gambar() {
      var so = L.tabel[s.soal], total = BARIS.length * so.kolom.length, terisi = 0, benar = 0, salahPertama = null;
      s.isi.forEach(function (r, ri) { r.forEach(function (v, ci) { if (v !== null) terisi++; if (v === jawab(ri, ci)) benar++; else if (!salahPertama) salahPertama = [ri, ci]; }); });
      var kepala = "<tr><th>p</th><th>q</th>" + so.kolom.map(function (k) { return "<th>" + esc(k) + "</th>"; }).join("") + "</tr>";
      var badan = BARIS.map(function (r, ri) {
        return "<tr><td>" + K.sel(r[0]) + "</td><td>" + K.sel(r[1]) + "</td>" + so.kolom.map(function (k, ci) {
          var v = s.isi[ri][ci], j = jawab(ri, ci), kelas = s.dicek ? (v === j ? "benar" : "salah") : v === null ? "" : "isi";
          var isi = v === null ? "?" : (s.dicek ? "" : '<span class="led-kecil' + (v ? " nyala" : "") + '" aria-hidden="true"></span>') + TF(v) + (s.dicek ? I(v === j ? "check" : "x", "tanda") : "");
          return '<td><button type="button" class="sel ' + kelas + '" data-r="' + ri + '" data-c="' + ci + '" data-f="sel-' + ri + "-" + ci + '"' + (s.dicek ? " disabled" : "") + ' tabindex="' + (ri === 0 && ci === 0 ? 0 : -1) + '"' +
            ' aria-label="Baris ' + (ri + 1) + ", kolom " + esc(k) + ": " + (v === null ? "kosong" : TF(v)) + (s.dicek ? (v === j ? ", benar" : ", belum tepat") : "") + '">' + isi + "</button></td>";
        }).join("") + "</tr>";
      }).join("");
      var hasil = "";
      if (s.dicek) {
        if (benar === total) hasil = umpan("benar", benar + " dari " + total + " benar", "<p>Semua sel tepat. Kamu siap untuk kuis.</p>");
        else {
          var r = salahPertama[0], c = salahPertama[1], at = aturanKolom(c);
          hasil = umpan("salah", benar + " dari " + total + " benar", "<p>Baris " + (r + 1) + ": p = " + TF(BARIS[r][0]) + " dan q = " + TF(BARIS[r][1]) + ", jadi " + esc(so.kolom[c] === "hasil" ? so.ekspresi : so.kolom[c]) + " = " + TF(jawab(r, c)) + ". " + esc(at[1]) + "</p>" +
            '<p><button type="button" class="tautan" data-aksi="petunjuk" data-f="petunjuk">Lihat petunjuk: aturan ' + at[0] + "</button></p>");
        }
      }
      var petunjuk = s.petunjuk ? K.callout("ingat", "Ingat", "<p>AND (∧) hanya T kalau kedua sisi T. OR (∨) hanya F kalau kedua sisi F. NOT (¬) membalik nilai. Isi kolom bantu dulu, baru kolom hasil.</p>") : "";
      var kiri = '<div class="tumpuk"><h1 class="judul-display">Isi tabel kebenaran</h1><p><span class="ekspresi">' + esc(so.ekspresi) + "</span></p>" +
        '<p class="caption" id="petunjuk-tabel">Ketuk kotak untuk memilih T (benar) atau F (salah). Di keyboard: panah untuk pindah, T atau F untuk mengisi, Backspace untuk mengosongkan.</p>' +
        '<div class="tabel-wadah"><table class="tabel-tk" aria-describedby="petunjuk-tabel"><caption class="sr-only">Tabel kebenaran ' + esc(so.ekspresi) + "</caption><thead>" + kepala + "</thead><tbody>" + badan + "</tbody></table></div></div>";
      var kanan = '<div class="tumpuk"><div aria-live="polite">' + hasil + "</div>" + petunjuk +
        (s.dicek ? '<div class="deret-tombol">' + K.tombol({ label: "Coba Soal Lain", varian: "secondary", aksi: "lain", attr: ' data-f="lain"' }) + K.tombol({ label: "Lanjut ke Kuis", aksi: "kuis", attr: ' data-f="kuis" data-f-cadangan' }) + "</div>"
          : siapCek("cek-tabel", terisi === total, "Aktif setelah semua sel terisi.") +
            '<div class="deret-tombol">' + K.tombol({ label: s.petunjuk ? "Sembunyikan petunjuk" : "Lihat petunjuk", varian: "secondary", aksi: "petunjuk", attr: ' data-f="petunjuk"' }) +
            K.tombol({ label: "Kosongkan", varian: "ghost", aksi: "kosongkan", attr: ' data-f="kosongkan"' }) + "</div>") + "</div>";
      return '<div class="dua-kolom">' + kiri + kanan + "</div>";
    }
    return {
      judul: "Isi tabel kebenaran", html: '<div id="latihan"></div>',
      pasang: function (el) {
        var w = el.querySelector("#latihan"), g = penggambar(w, gambar); g();
        function set(r, c, v) { s.isi[r][c] = v; g(); rapikanTab(r, c); }
        function rapikanTab(r, c) { w.querySelectorAll("[data-r]").forEach(function (b) { b.tabIndex = +b.getAttribute("data-r") === r && +b.getAttribute("data-c") === c ? 0 : -1; }); }
        on(w, "[data-r]", "click", function (t) { var r = +t.getAttribute("data-r"), c = +t.getAttribute("data-c"), v = s.isi[r][c]; set(r, c, v === null ? true : v ? false : null); });
        on(w, "[data-r]", "keydown", function (t, e) {
          var r = +t.getAttribute("data-r"), c = +t.getAttribute("data-c"), k = e.key, kol = L.tabel[s.soal].kolom.length;
          if (k === "t" || k === "T") set(r, c, true);
          else if (k === "f" || k === "F") set(r, c, false);
          else if (k === "Backspace" || k === "Delete") set(r, c, null);
          else {
            var d = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[k];
            if (!d) return;
            e.preventDefault();
            var nr = Math.max(0, Math.min(3, r + d[0])), nc = Math.max(0, Math.min(kol - 1, c + d[1]));
            rapikanTab(nr, nc); w.querySelector('[data-r="' + nr + '"][data-c="' + nc + '"]').focus();
          }
        });
        on(w, '[data-aksi="cek"]', "click", function () { s.dicek = true; g(); var f = w.querySelector('[data-f="kuis"]'); f.focus(); });
        on(w, '[data-aksi="kosongkan"]', "click", function () { kosong(); g(); w.querySelector("[data-r]").focus(); });
        on(w, '[data-aksi="petunjuk"]', "click", function () { s.petunjuk = !s.petunjuk; g(); });
        on(w, '[data-aksi="lain"]', "click", function () { s.soal = (s.soal + 1) % L.tabel.length; kosong(); g(); LK.umumkan("Soal baru: " + L.tabel[s.soal].ekspresi); w.querySelector("[data-r]").focus(); });
        on(w, '[data-aksi="kuis"]', "click", function () { lanjutKuis(n); });
      }
    };
  };

  /* ---------- 17 Cocokkan pasangan setara ---------- */
  latihan.ekuivalensi = function (n) {
    var pas = L.ekuivalensi, kanan = LK.acak(pas.map(function (p, i) { return i; }), 11);
    var s = { kiri: null, cocok: [], pesan: null };
    function gambar() {
      var selesai = s.cocok.length === pas.length;
      var kol = function (sisi) {
        var urut = sisi === "kiri" ? pas.map(function (p, i) { return i; }) : kanan;
        return '<ul class="daftar-ekspresi">' + urut.map(function (i) {
          var ok = s.cocok.indexOf(i) >= 0, pilih = sisi === "kiri" && s.kiri === i;
          return '<li><button type="button" class="ekspresi-tombol mono' + (ok ? " benar" : pilih ? " dipilih" : "") + '" data-' + sisi + '="' + i + '" data-f="' + sisi + "-" + i + '"' + (ok ? " disabled" : "") + (sisi === "kiri" ? ' aria-pressed="' + pilih + '"' : "") + ">" +
            "<span>" + esc(pas[i][sisi]) + "</span>" + (ok ? I("check") + '<span class="sr-only">sudah cocok</span>' : "") + "</button></li>";
        }).join("") + "</ul>";
      };
      var kiri = '<div class="tumpuk"><h1 class="judul-display">Cari pasangan setara</h1>' +
        '<p class="redup">Ketuk ekspresi di kiri, lalu ketuk pasangannya yang nilainya selalu sama di kanan.</p>' +
        K.progresBar((s.cocok.length / pas.length) * 100, s.cocok.length + " dari " + pas.length + " pasangan", "Pasangan yang sudah cocok") +
        '<div class="dua-daftar"><div><p class="label">Ekspresi</p>' + kol("kiri") + '</div><div><p class="label">Pasangannya</p>' + kol("kanan") + "</div></div></div>";
      var panel = '<div class="tumpuk">' + K.callout("tips", "Petunjuk", "<p>Hukum De Morgan: saat NOT masuk ke dalam kurung, AND berganti OR dan OR berganti AND. Implikasi p → q setara dengan ¬p ∨ q.</p>") +
        '<div aria-live="polite">' + (selesai ? umpan("benar", "Semua pasangan cocok!", "<p>Kamu menemukan semua kembaran.</p>") : s.pesan ? umpan(s.pesan[0], s.pesan[1], s.pesan[2] ? "<p>" + esc(s.pesan[2]) + "</p>" : "") : "") + "</div>" +
        (selesai ? tombolAkhir() : '<p class="syarat">Tombol lanjut muncul setelah semua pasangan cocok.</p>') + "</div>";
      return '<div class="dua-kolom">' + kiri + panel + "</div>";
    }
    return {
      judul: "Cari pasangan setara", html: '<div id="latihan"></div>',
      pasang: function (el) {
        var w = el.querySelector("#latihan"), g = penggambar(w, gambar); g();
        on(w, "[data-kiri]", "click", function (t) { s.kiri = +t.getAttribute("data-kiri"); s.pesan = null; g(); });
        on(w, "[data-kanan]", "click", function (t) {
          var i = +t.getAttribute("data-kanan");
          if (s.kiri === null) { s.pesan = ["info", "Pilih ekspresi di kiri dulu."]; g(); return; }
          if (i === s.kiri) { s.cocok.push(i); s.pesan = ["benar", "Cocok!", pas[i].kiri + " ≡ " + pas[i].kanan]; s.kiri = null; }
          else s.pesan = ["salah", "Belum cocok", pas[s.kiri].kiri + " tidak selalu sama dengan " + pas[i].kanan + ". Coba pasangan lain."];
          g();
          var sisa = w.querySelector("[data-kiri]:not([disabled])"); if (sisa) sisa.focus(); else { var k = w.querySelector('[data-f="kuis"]'); if (k) k.focus(); }
        });
        on(w, '[data-aksi="ulang"]', "click", function () { s.cocok = []; s.kiri = null; s.pesan = null; g(); w.querySelector("[data-kiri]").focus(); });
        on(w, '[data-aksi="kuis"]', "click", function () { lanjutKuis(n); });
        w.addEventListener("keydown", function (e) { if (e.key === "Escape" && s.kiri !== null) { s.kiri = null; g(); LK.umumkan("Pilihan dibatalkan."); } });
      }
    };
  };

  /* ---------- 18 Urutkan langkah kerja ---------- */
  latihan.komputasi = function (n) {
    var langkah = L.komputasi, acak = LK.acak(langkah.map(function (x, i) { return i; }), 5);
    var s = { slot: langkah.map(function () { return null; }), dicek: false };
    function gambar() {
      var berikut = s.slot.indexOf(null), semua = berikut === -1, benar = s.slot.filter(function (v, i) { return v === i; }).length;
      var slot = '<ol class="daftar-slot">' + s.slot.map(function (v, i) {
        var kelas = s.dicek ? (v === i ? "benar" : "salah") : v !== null ? "terisi" : i === berikut ? "berikut" : "";
        var isi = v === null ? '<span class="caption">' + (i === berikut ? "Langkah berikutnya" : "Kosong") + "</span>" : "<span>" + esc(langkah[v]) + "</span>";
        return '<li><span class="led ' + (v !== null ? "nyala" : "") + '" aria-hidden="true">' + (i + 1) + "</span>" +
          (v !== null && !s.dicek ? '<button type="button" class="slot-langkah ' + kelas + '" data-slot="' + i + '" data-f="slot-' + i + '" aria-label="Langkah ' + (i + 1) + ": " + esc(langkah[v]) + ', ketuk untuk mengembalikan">' + isi + "</button>"
            : '<div class="slot-langkah ' + kelas + '">' + isi + (s.dicek ? I(v === i ? "check" : "x") + '<span class="sr-only">' + (v === i ? "benar" : "belum tepat") + "</span>" : "") + "</div>") + "</li>";
      }).join("") + "</ol>";
      var tersedia = acak.filter(function (i) { return s.slot.indexOf(i) < 0; });
      var kiri = '<div class="tumpuk"><h1 class="judul-display">Pasang konektor LAN</h1>' +
        '<p class="redup">Urutkan 5 langkah memasang konektor RJ45. Ketuk langkah di daftar, nanti langkah itu masuk ke nomor berikutnya.</p>' + slot + "</div>";
      var kanan = '<div class="tumpuk"><p class="label">Langkah tersedia</p>' +
        (tersedia.length ? '<div class="tumpuk-sm">' + tersedia.map(function (i) { return '<button type="button" class="kalimat" data-langkah="' + i + '" data-f="langkah-' + i + '">' + esc(langkah[i]) + "</button>"; }).join("") + "</div>" : '<p class="redup">Semua langkah sudah dipasang.</p>') +
        K.callout("tips", "Dekomposisi", "<p>Masalah besar (memasang konektor) dipecah jadi langkah kecil. Urutannya penting: kabel harus dikupas sebelum diurutkan.</p>") +
        '<div aria-live="polite">' + (s.dicek ? (benar === langkah.length ? umpan("benar", "Urutannya tepat!", "<p>Konektor siap dipakai.</p>") : umpan("salah", benar + " dari " + langkah.length + " langkah di posisi yang tepat", "<p>Urutan yang benar: " + langkah.map(function (x, i) { return i + 1 + ". " + esc(x); }).join("; ") + ".</p>")) : "") + "</div>" +
        (s.dicek ? tombolAkhir() : siapCek("cek-urut", semua, "Aktif setelah semua nomor terisi.")) + "</div>";
      return '<div class="dua-kolom">' + kiri + kanan + "</div>";
    }
    return {
      judul: "Pasang konektor LAN", html: '<div id="latihan"></div>',
      pasang: function (el) {
        var w = el.querySelector("#latihan"), g = penggambar(w, gambar); g();
        on(w, "[data-langkah]", "click", function (t) {
          var i = +t.getAttribute("data-langkah"), k = s.slot.indexOf(null); s.slot[k] = i; g();
          LK.umumkan("“" + langkah[i] + "” dipasang di nomor " + (k + 1) + ".");
          var nx = w.querySelector("[data-langkah]") || w.querySelector('[data-f="cek"]'); if (nx) nx.focus();
        });
        on(w, "[data-slot]", "click", function (t) { var i = +t.getAttribute("data-slot"); var v = s.slot[i]; s.slot[i] = null; g(); LK.umumkan("Langkah dikembalikan ke daftar."); var b = w.querySelector('[data-langkah="' + v + '"]'); if (b) b.focus(); });
        on(w, '[data-aksi="cek"]', "click", function () { s.dicek = true; g(); w.querySelector('[data-f="kuis"]').focus(); });
        on(w, '[data-aksi="ulang"]', "click", function () { s.slot = langkah.map(function () { return null; }); s.dicek = false; g(); w.querySelector("[data-langkah]").focus(); });
        on(w, '[data-aksi="kuis"]', "click", function () { lanjutKuis(n); });
      }
    };
  };

  /* ---------- 04 Susun flowchart ---------- */
  var BENTUK_SVG = {
    keputusan: '<svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true"><polygon points="100,3 197,40 100,77 3,40"/></svg>',
    io: '<svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true"><polygon points="24,3 197,3 176,77 3,77"/></svg>'
  };
  LK.blokFC = function (b, kelas) {
    return '<span class="fc fc-' + b.bentuk + " " + (kelas || "") + '">' + (BENTUK_SVG[b.bentuk] || "") + '<span class="fc-label">' + esc(b.label) + "</span></span>";
  };
  latihan.flowchart = function (n) {
    var F = L.flowchart, blok = {}; F.blok.forEach(function (b) { blok[b.id] = b; });
    var urutPalet = LK.acak(F.blok.map(function (b) { return b.id; }), 3);
    var NAMA_BENTUK = { terminal: "terminal", io: "input/output", keputusan: "keputusan", proses: "proses" };
    var ALASAN = { s1: "Flowchart selalu dimulai dari Mulai.", s2: "Bilangan n harus dimasukkan (input) dulu sebelum dicek.", s3: "Keputusan harus ada sebelum menampilkan hasil.", ya: "Kalau n mod 2 = 0 (Ya), bilangannya genap.", tidak: "Kalau sisa baginya bukan 0 (Tidak), bilangannya ganjil.", s6: "Flowchart selalu diakhiri dengan Selesai." };
    var s = { pilih: null, isi: {}, dicek: false, laci: true };
    function slot(id) {
      var sl = F.slot.filter(function (x) { return x.id === id; })[0], b = s.isi[id];
      var kelas = s.dicek ? (b === sl.benar ? "benar" : "salah") : b ? "terisi" : s.pilih ? "bisa" : "";
      var isi = b ? LK.blokFC(blok[b]) : '<span class="slot-teks">' + (s.pilih ? "Taruh di sini" : "Slot kosong") + "</span>";
      var label = sl.nama + ": " + (b ? blok[b].label : "kosong") + (s.dicek ? (b === sl.benar ? ", benar" : ", belum tepat") : s.pilih ? ", ketuk untuk menaruh" : b ? ", ketuk untuk mengembalikan" : "");
      return '<button type="button" class="slot-fc ' + kelas + '" data-slotfc="' + id + '" data-f="slot-' + id + '"' + (s.dicek ? " disabled" : "") + ' aria-label="' + esc(label) + '">' + isi +
        (s.dicek ? '<span class="tanda-slot">' + I(b === sl.benar ? "check" : "x") + "</span>" : "") + "</button>";
    }
    function panah() { return '<span class="panah-fc" aria-hidden="true">' + I("arrow-down") + "</span>"; }
    function gambar() {
      var tersedia = urutPalet.filter(function (id) { return Object.keys(s.isi).map(function (k) { return s.isi[k]; }).indexOf(id) < 0; });
      var semua = F.slot.every(function (x) { return s.isi[x.id]; });
      var benar = F.slot.filter(function (x) { return s.isi[x.id] === x.benar; });
      var palet = '<section class="palet' + (s.laci ? " buka" : "") + '" aria-labelledby="judul-palet"><div class="palet-kepala"><h2 id="judul-palet" class="label">Blok tersedia (' + tersedia.length + ")</h2>" +
        '<button type="button" class="tombol-ikon hanya-hp" data-aksi="laci" aria-expanded="' + s.laci + '" aria-controls="isi-palet" aria-label="' + (s.laci ? "Tutup" : "Buka") + ' laci blok">' + I(s.laci ? "chevron-down" : "chevron-up") + "</button></div>" +
        '<div class="palet-isi" id="isi-palet">' + (tersedia.length ? tersedia.map(function (id) {
          var on = s.pilih === id;
          return '<button type="button" class="blok-palet' + (on ? " dipilih" : "") + '" data-blok="' + id + '" data-f="blok-' + id + '" aria-pressed="' + on + '" aria-label="Blok ' + NAMA_BENTUK[blok[id].bentuk] + ": " + esc(blok[id].label) + '">' + LK.blokFC(blok[id], on ? "terpilih" : "") + "</button>";
        }).join("") : '<p class="caption">Semua blok sudah ditaruh.</p>') + "</div>" +
        (s.pilih ? '<p class="caption">Blok terpilih. Ketuk slot biru untuk menaruhnya. Esc untuk batal.</p>' : "") + "</section>";
      var kanvas = '<section class="kanvas-fc" aria-label="Kanvas flowchart">' + slot("s1") + panah() + slot("s2") + panah() + slot("s3") + panah() +
        '<div class="cabang-fc"><div><p class="label">Ya</p>' + slot("ya") + '</div><div><p class="label">Tidak</p>' + slot("tidak") + "</div></div>" + panah() + slot("s6") + "</section>";
      var salah = F.slot.filter(function (x) { return s.isi[x.id] !== x.benar; });
      var panel = '<div class="tumpuk">' + K.callout("tips", "Petunjuk", "<p>Keputusan (belah ketupat) punya dua jalan keluar: Ya dan Tidak.</p>") +
        '<div aria-live="polite">' + (s.dicek ? (salah.length === 0 ? umpan("benar", "Flowchart-mu benar!", "<p>Alurnya: Mulai, input n, cek sisa bagi, tampilkan hasil, Selesai.</p>")
          : umpan("salah", benar.length + " dari " + F.slot.length + " slot benar", "<ul>" + salah.map(function (x) { return "<li>" + esc(ALASAN[x.id]) + "</li>"; }).join("") + "</ul>")) : "") + "</div>" +
        (s.dicek ? tombolAkhir("Ulang") : K.tombol({ label: "Cek Flowchart", aksi: "cek", penuh: true, nonaktif: !semua, syaratId: "syarat-fc", attr: ' data-f="cek"' }) + (semua ? "" : '<p class="syarat" id="syarat-fc">Aktif setelah semua slot terisi.</p>') +
          '<p class="tengah"><button type="button" class="tautan" data-aksi="ulang" data-f="ulang">Ulang</button></p>') + "</div>";
      var terisi = F.slot.filter(function (x) { return s.isi[x.id]; }).length;
      return '<section class="p-panel fc-papan" aria-labelledby="judul-soal-fc"><div class="p-kepala"><div class="p-judul"><span class="p-ikon">' + I("lightbulb") + "</span>" +
        '<div><h1 id="judul-soal-fc" class="h3-like judul-soal">Genap atau ganjil?</h1><p class="caption">Susun flowchart untuk mengecek apakah bilangan n genap atau ganjil.</p></div></div>' +
        '<div class="p-aksi"><span class="fc-hitung" aria-hidden="true"><strong>' + terisi + "</strong>/" + F.slot.length + " slot terisi</span></div></div>" +
        '<p class="caption fc-cara">Seret blok ke slot, atau ketuk blok lalu ketuk slotnya. Di keyboard: Enter untuk memilih blok, panah atas/bawah untuk pindah slot, Enter untuk menaruh.</p>' +
        '<div class="tata-fc">' + palet + kanvas + panel + "</div></section>";
    }
    return {
      judul: "Susun flowchart", html: '<div id="latihan"></div>', kelasIsi: "isi-lebar",
      pasang: function (el) {
        var w = el.querySelector("#latihan"), g = penggambar(w, gambar); g();
        var urutSlot = ["s1", "s2", "s3", "ya", "tidak", "s6"];
        function taruh(slotId, blokId) {
          Object.keys(s.isi).forEach(function (k) { if (s.isi[k] === blokId) delete s.isi[k]; });
          s.isi[slotId] = blokId; s.pilih = null; g();
          var nama = F.slot.filter(function (x) { return x.id === slotId; })[0].nama;
          LK.umumkan("Blok " + blok[blokId].label + " ditaruh di " + nama + ".");
        }
        on(w, "[data-blok]", "click", function (t) {
          var id = t.getAttribute("data-blok"); s.pilih = s.pilih === id ? null : id; g();
          if (s.pilih) { LK.umumkan("Blok " + blok[id].label + " dipilih. Pilih slot tujuan."); var kosong = w.querySelector(".slot-fc.bisa"); if (kosong && window.innerWidth >= 1024) kosong.focus(); }
        });
        on(w, "[data-slotfc]", "click", function (t) {
          var id = t.getAttribute("data-slotfc");
          if (s.pilih) { taruh(id, s.pilih); var nx = w.querySelector("[data-blok]") || w.querySelector('[data-f="cek"]'); if (nx) nx.focus(); }
          else if (s.isi[id]) { var b = s.isi[id]; delete s.isi[id]; g(); LK.umumkan("Blok " + blok[b].label + " dikembalikan ke palet."); }
          else LK.umumkan("Pilih blok dulu dari palet.");
        });
        on(w, "[data-slotfc]", "keydown", function (t, e) {
          var i = urutSlot.indexOf(t.getAttribute("data-slotfc"));
          if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); var j = Math.max(0, Math.min(5, i + (e.key === "ArrowDown" ? 1 : -1))); w.querySelector('[data-slotfc="' + urutSlot[j] + '"]').focus(); }
        });
        /* Seret sebagai tambahan (desktop). */
        w.addEventListener("dragstart", function (e) { var b = e.target.closest("[data-blok]"); if (b) { e.dataTransfer.setData("text/plain", b.getAttribute("data-blok")); s.pilih = b.getAttribute("data-blok"); } });
        w.addEventListener("dragover", function (e) { if (e.target.closest("[data-slotfc]")) e.preventDefault(); });
        w.addEventListener("drop", function (e) { var t = e.target.closest("[data-slotfc]"); if (t) { e.preventDefault(); taruh(t.getAttribute("data-slotfc"), e.dataTransfer.getData("text/plain")); } });
        var amati = new MutationObserver(function () { w.querySelectorAll("[data-blok]").forEach(function (b) { b.setAttribute("draggable", "true"); }); });
        amati.observe(w, { childList: true, subtree: true });
        w.querySelectorAll("[data-blok]").forEach(function (b) { b.setAttribute("draggable", "true"); });
        on(w, '[data-aksi="laci"]', "click", function () { s.laci = !s.laci; g(); });
        on(w, '[data-aksi="cek"]', "click", function () { s.dicek = true; s.pilih = null; g(); w.querySelector('[data-f="kuis"]').focus(); });
        on(w, '[data-aksi="ulang"]', "click", function () { s.isi = {}; s.dicek = false; s.pilih = null; g(); });
        on(w, '[data-aksi="kuis"]', "click", function () { lanjutKuis(n); });
        w.addEventListener("keydown", function (e) { if (e.key === "Escape" && s.pilih) { s.pilih = null; g(); LK.umumkan("Pilihan blok dibatalkan."); } });
      }
    };
  };

  /* ---------- 08 Penelusur pseudocode ---------- */
  var KODE_PSEUDO = ["BACA n", "total ← 0", "UNTUK i ← 1 SAMPAI n", "    total ← total + i", "SELESAI UNTUK", "TULIS total"];
  var JEJAK = (function () {
    var j = [], v = {}, n = 3;
    function catat(baris, ubah, lama, ket, keluaran) { j.push({ baris: baris, v: Object.assign({}, v), ubah: ubah, lama: lama, ket: ket, keluaran: keluaran }); }
    v.n = n; catat(1, "n", null, "n dibaca: 3.");
    v.total = 0; catat(2, "total", null, "total diisi 0.");
    for (var i = 1; i <= n; i++) {
      var li = v.i; v.i = i; catat(3, "i", li === undefined ? null : li, "i = " + i + ", masih ≤ n, masuk perulangan.");
      var lt = v.total; v.total += i; catat(4, "total", lt, "total ← " + lt + " + " + i + ".");
    }
    var l2 = v.i; v.i = n + 1; catat(3, "i", l2, "i = 4 sudah lebih dari n, perulangan berhenti.");
    catat(5, null, null, "Perulangan selesai.");
    catat(6, null, null, "Menulis total.", String(v.total));
    return j;
  })();
  latihan.pseudocode = function (n, ctx) {
    var s = { k: ctx.q.demo ? 5 : 0 };
    function gambar() {
      var j = JEJAK[s.k], akhir = s.k === JEJAK.length - 1;
      var kode = '<ol class="trace">' + KODE_PSEUDO.map(function (b, i) {
        var on = j.baris === i + 1;
        return '<li class="' + (on ? "aktif" : "") + '"' + (on ? ' aria-current="step"' : "") + '><span class="led-kecil' + (on ? " nyala" : "") + '" aria-hidden="true"></span><span class="no">' + (i + 1) + '</span><span class="isi">' + esc(b) + "</span></li>";
      }).join("") + "</ol>";
      var vars = '<table class="tabel-var"><caption class="sr-only">Nilai variabel</caption><tbody>' + ["n", "i", "total"].map(function (nm) {
        var baru = j.v[nm], ubah = j.ubah === nm;
        var nilai = baru === undefined ? '<span class="redup">–</span>' : ubah && j.lama !== null ? j.lama + " → " + baru : String(baru);
        return '<tr class="' + (ubah ? "berubah" : "") + '"><th scope="row" class="mono">' + nm + "</th><td>" + (ubah ? '<span class="caption kuning-tua">baru berubah</span>' : "") + '</td><td class="mono label">' + nilai + "</td></tr>";
      }).join("") + "</tbody></table>";
      var keluar = j.keluaran || (JEJAK.slice(0, s.k + 1).filter(function (x) { return x.keluaran; })[0] || {}).keluaran;
      var kiri = '<div class="tumpuk"><h1 class="judul-display">Jalankan langkah demi langkah</h1>' +
        '<p class="redup">Program ini menjumlahkan 1 sampai n. Jalankan dengan n = 3, lalu perhatikan nilai total di setiap langkah.</p>' +
        '<div class="kotak-kode" aria-label="Pseudocode">' + kode + "</div>" +
        '<p class="label" aria-live="polite">Langkah ' + (s.k + 1) + " dari " + JEJAK.length + ", sedang di baris " + j.baris + '. <span class="redup">' + esc(j.ket) + "</span></p></div>";
      var kanan = '<div class="tumpuk"><h2>Variabel</h2>' + vars + "<h2>Keluaran</h2>" + '<div class="blok-kode keluaran" aria-live="polite">' + (keluar ? esc(keluar) : "(belum ada)") + "</div>" +
        (akhir ? K.tombol({ label: "Lanjut ke Kuis", aksi: "kuis", penuh: true, attr: ' data-f="maju"' }) : K.tombol({ label: "Langkah berikutnya", aksi: "maju", penuh: true, attr: ' data-f="maju"' })) +
        K.tombol({ label: "Sebelumnya", varian: "secondary", aksi: "mundur", penuh: true, nonaktif: s.k === 0, attr: ' data-f="mundur"' }) +
        '<p class="tengah"><button type="button" class="tautan" data-aksi="awal" data-f="awal">Ulang dari awal</button></p>' +
        '<p class="caption">Keyboard: panah kanan dan kiri untuk pindah langkah.</p></div>';
      return '<div class="dua-kolom">' + kiri + kanan + "</div>";
    }
    return {
      judul: "Jalankan pseudocode", html: '<div id="latihan"></div>',
      pasang: function (el) {
        var w = el.querySelector("#latihan"), g = penggambar(w, gambar); g();
        function ke(k) { s.k = Math.max(0, Math.min(JEJAK.length - 1, k)); g(); }
        on(w, '[data-aksi="maju"]', "click", function () { ke(s.k + 1); });
        on(w, '[data-aksi="mundur"]', "click", function () { ke(s.k - 1); if (s.k === 0) w.querySelector('[data-f="maju"]').focus(); });
        on(w, '[data-aksi="awal"]', "click", function () { ke(0); });
        on(w, '[data-aksi="kuis"]', "click", function () { lanjutKuis(n); });
        el.addEventListener("keydown", function (e) {
          if (e.target.matches("input")) return;
          if (e.key === "ArrowRight") { e.preventDefault(); ke(s.k + 1); } else if (e.key === "ArrowLeft") { e.preventDefault(); ke(s.k - 1); }
        });
      }
    };
  };

  /* ---------- 19 Ikuti jalurnya ---------- */
  latihan.percabangan = function (n) {
    var KODE = ["BACA nilai", "JIKA nilai ≥ 70 MAKA", '    TULIS "Lulus"', "SELAIN ITU", '    TULIS "Belum lulus"', "SELESAI JIKA"];
    var s = { nilai: "65" };
    function gambarDinamis(w) {
      var v = s.nilai.trim(), angka = /^\d{1,3}$/.test(v) && +v <= 100 ? +v : null, ya = angka !== null && angka >= 70;
      w.querySelector("#kode-cabang").innerHTML = KODE.map(function (b, i) {
        var on = angka !== null && ((ya && i === 2) || (!ya && i === 4));
        return '<li class="' + (on ? "aktif" : "") + '"><span class="led-kecil' + (on ? " nyala" : "") + '" aria-hidden="true"></span><span class="no">' + (i + 1) + '</span><span class="isi">' + esc(b) + "</span></li>";
      }).join("");
      w.querySelector("#diagram-cabang").innerHTML =
        '<div class="fc-tengah">' + LK.blokFC({ bentuk: "keputusan", label: "nilai >= 70?" }) + "</div>" +
        '<div class="cabang-fc">' + [["Ya", 'TULIS "Lulus"', ya], ["Tidak", 'TULIS "Belum lulus"', !ya]].map(function (c) {
          var hidup = angka !== null && c[2];
          return '<div class="cabang-kolom"><p class="label">' + c[0] + '</p><span class="kabel-tegak' + (hidup ? " hidup" : "") + '" aria-hidden="true"></span>' + LK.blokFC({ bentuk: "proses", label: c[1] }) +
            '<p class="caption baris-tengah"><span class="led-kecil' + (hidup ? " nyala" : "") + '" aria-hidden="true"></span>' + (angka === null ? "Menunggu nilai" : hidup ? "Dijalankan" : "Dilewati") + "</p></div>";
        }).join("") + "</div>";
      w.querySelector("#keluaran-cabang").textContent = angka === null ? "(belum ada)" : ya ? "Lulus" : "Belum lulus";
      var kol = w.querySelector('[data-kolom="nilai"]');
      kol.classList.toggle("error", angka === null);
      kol.querySelector(".galat span").textContent = angka === null ? "Isi nilai berupa angka 0 sampai 100." : "";
      var coba = w.querySelector('[data-aksi="coba"]');
      coba.textContent = ya ? "Coba nilai 65" : "Coba nilai 70";
    }
    var html = '<div class="dua-kolom"><div class="tumpuk"><h1 class="judul-display">Ikuti jalurnya</h1>' +
      '<p class="redup">Program ini memilih satu dari dua jalur. Coba ganti nilainya dan lihat jalur mana yang dialiri arus.</p>' +
      K.kolom({ id: "nilai", label: "nilai", inputmode: "numeric", nilai: s.nilai, bantuan: "Ganti nilainya untuk mencoba jalur lain." }) +
      '<ol class="trace kotak-kode" id="kode-cabang" aria-label="Pseudocode percabangan"></ol></div>' +
      '<div class="tumpuk"><h2>Jalur yang dialiri arus</h2><div class="kartu diagram-cabang" id="diagram-cabang"></div>' +
      '<div class="blok-kode keluaran" id="keluaran-cabang" aria-live="polite"></div>' +
      K.tombol({ label: "Lanjut ke Kuis", aksi: "kuis", penuh: true }) +
      '<p class="tengah"><button type="button" class="tautan" data-aksi="coba">Coba nilai 70</button></p></div></div>';
    return {
      judul: "Ikuti jalurnya", html: html,
      pasang: function (w) {
        gambarDinamis(w);
        var inp = w.querySelector("#nilai");
        inp.addEventListener("input", function () { s.nilai = inp.value; gambarDinamis(w); });
        w.querySelector('[data-aksi="coba"]').addEventListener("click", function () {
          s.nilai = +s.nilai >= 70 ? "65" : "70"; inp.value = s.nilai; gambarDinamis(w);
          LK.umumkan("Nilai " + s.nilai + ": " + w.querySelector("#keluaran-cabang").textContent);
        });
        w.querySelector('[data-aksi="kuis"]').addEventListener("click", function () { lanjutKuis(n); });
      }
    };
  };

  /* ---------- 20 Berapa LED yang menyala? ---------- */
  latihan.perulangan = function (n) {
    var P = L.perulangan, KODE = ["UNTUK i ← 1 SAMPAI " + P.sampai, "    NYALAKAN LED ke-i", "    TUNGGU 1 detik", "SELESAI UNTUK"];
    var s = { putaran: 3, pilih: null, dicek: false };
    function gambar() {
      var selesai = s.putaran > P.sampai;
      var kode = '<ol class="trace">' + KODE.map(function (b, i) {
        var on = selesai ? i === 3 : i === 1;
        return '<li class="' + (on ? "aktif" : "") + '"><span class="led-kecil' + (on ? " nyala" : "") + '" aria-hidden="true"></span><span class="no">' + (i + 1) + '</span><span class="isi">' + esc(b) + "</span></li>";
      }).join("") + "</ol>";
      var led = "";
      for (var i = 1; i <= P.sampai; i++) led += '<div class="led-putaran"><span class="led besar ' + (i <= s.putaran ? "nyala" : "mati") + '" aria-hidden="true"></span><span class="mono caption">i = ' + i + "</span></div>";
      var nyala = Math.min(s.putaran, P.sampai);
      var opsi = '<div class="opsi-grid">' + P.opsi.map(function (o, i) {
        var kelas = s.dicek ? (i === P.benar ? (i === s.pilih ? "benar" : "ditunjukkan") : i === s.pilih ? "salah" : "") : i === s.pilih ? "dipilih" : "";
        var status = kelas === "benar" ? I("check-circle", "ikon-sm") + "Benar" : kelas === "salah" ? I("x-circle", "ikon-sm") + "Belum tepat" : kelas === "ditunjukkan" ? I("check-circle", "ikon-sm") + "Jawaban benar" : "";
        return '<button type="button" class="opsi ' + kelas + '" data-opsi="' + i + '" data-f="opsi-' + i + '" role="radio" aria-checked="' + (i === s.pilih) + '"' + (s.dicek ? " disabled" : "") + '><span class="tuts" aria-hidden="true">' + "ABCD"[i] + '</span><span class="opsi-label">' + esc(o) + '</span><span class="opsi-status">' + status + "</span></button>";
      }).join("") + "</div>";
      var benar = s.pilih === P.benar;
      var kiri = '<div class="tumpuk"><h1 class="judul-display">Berapa LED yang menyala?</h1>' +
        '<p class="redup">Jalankan program ini dalam pikiranmu. Perulangan UNTUK mengulang baris 2 dan 3 sekali untuk setiap nilai i.</p>' +
        '<div class="kotak-kode">' + kode + "</div>" +
        '<p class="label" aria-live="polite">' + (selesai ? "Perulangan selesai setelah 4 putaran." : "Putaran ke-" + s.putaran + " dari " + P.sampai + ", sekarang i = " + s.putaran) + "</p>" +
        '<div class="kartu papan-led" role="img" aria-label="' + nyala + " dari " + P.sampai + ' LED menyala">' + led + "</div>" +
        "<div>" + K.tombol({ label: selesai ? "Putar ulang dari i = 1" : "Jalankan putaran berikutnya", varian: "secondary", aksi: "putar", attr: ' data-f="putar"' }) + "</div></div>";
      var kanan = '<div class="tumpuk"><h2 id="soal-led">Setelah program selesai, berapa LED yang menyala?</h2><div role="radiogroup" aria-labelledby="soal-led">' + opsi + "</div>" +
        '<div aria-live="polite">' + (s.dicek ? (benar ? umpan("benar", "Mantap, benar!", "<p>UNTUK i ← 1 SAMPAI 4 berputar 4 kali, jadi 4 LED menyala.</p>") : umpan("salah", "Belum tepat", "<p>Perulangan berjalan untuk i = 1, 2, 3, dan 4, jadi 4 LED yang menyala.</p>")) : "") + "</div>" +
        (s.dicek ? tombolAkhir("Coba lagi") : siapCek("cek-led", s.pilih !== null, "Aktif setelah kamu memilih jawaban.")) + "</div>";
      return '<div class="dua-kolom">' + kiri + kanan + "</div>";
    }
    return {
      judul: "Berapa LED yang menyala?", html: '<div id="latihan"></div>',
      pasang: function (el) {
        var w = el.querySelector("#latihan"), g = penggambar(w, gambar); g();
        on(w, "[data-opsi]", "click", function (t) { s.pilih = +t.getAttribute("data-opsi"); g(); });
        on(w, '[data-aksi="putar"]', "click", function () { s.putaran = s.putaran > P.sampai ? 1 : s.putaran + 1; g(); });
        on(w, '[data-aksi="cek"]', "click", function () { s.dicek = true; g(); w.querySelector('[data-f="kuis"]').focus(); });
        on(w, '[data-aksi="ulang"]', "click", function () { s.dicek = false; s.pilih = null; g(); });
        on(w, '[data-aksi="kuis"]', "click", function () { lanjutKuis(n); });
      }
    };
  };

  LK.rute("/modul/(\\d+)/latihan", function (ctx) {
    var n = parseInt(ctx.p[0], 10), m = LK.modul(n);
    if (!m) return null;
    if (LK.statusModul(n) === "terkunci" && !ctx.q.paksa) return LK.layarTerkunci(n);
    var l = latihan[m.latihan](n, ctx);
    var jml = (LK.data.materi[n] || []).length;
    var kerangka = LK.kerangkaModul(n, 2, l.judul, l.html, { pasang: l.pasang, kembali: "#/modul/" + n + "/materi?bagian=" + jml });
    if (l.kelasIsi) kerangka.kelasIsi = l.kelasIsi;
    return kerangka;
  });
})();
