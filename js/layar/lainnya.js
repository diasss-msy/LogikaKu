/* Layar 07 Rekap, 10a Rekap kosong, 14 Profil, 14b Keluar, 21/21b/21c Ganti kata sandi,
 * serta halaman bantu "Daftar layar" untuk meninjau prototype. */
(function () {
  var I = LK.ikon, esc = LK.esc, K = LK.k;

  /* ---------- 07 Rekap / 10a Rekap kosong ---------- */
  LK.rute("/rekap", function (ctx) {
    var r = LK.ringkasan();
    var tb = { judul: "Rekap Skor", kembali: "#/beranda" };
    if (!r.adaSkor || ctx.q.kosong) {
      return {
        judul: "Rekap kosong", aktif: "rekap", topbar: tb,
        html: '<h1 class="judul-display">Rekap Belajarmu</h1><div class="keadaan kartu kartu-xl">' +
          '<div class="led-padam" aria-hidden="true"><span class="kabel-pendek"></span><span class="led mati">1</span><span class="kabel-pendek"></span></div>' +
          '<h2>Belum ada skor</h2><p class="redup">Kerjakan kuis Modul 1 untuk menyalakan rangkaianmu.</p>' +
          K.tombol({ label: "Mulai Modul 1", href: "#/modul/1/materi" }) + "</div>"
      };
    }
    var lencana = LK.data.modul.map(function (m) {
      var dapat = LK.lulus(m.no);
      return '<li class="lencana' + (dapat ? "" : " terkunci") + '"><span class="lencana-bulat" aria-hidden="true">' + I(dapat ? "award" : "lock") + '</span><span class="lencana-nama">' + esc(m.lencana) + '</span><span class="sr-only">' + (dapat ? "sudah didapat" : "belum didapat") + "</span></li>";
    }).join("");
    var ulang = LK.sesi.perluDiulang || [];
    var perlu = ulang.length
      ? ulang.map(function (u) {
        return '<li class="kartu tumpuk-sm"><div class="baris-antara"><h3>' + esc(u.topik) + "</h3>" + K.chip("error", "Perlu diulang") + "</div>" +
          '<p class="caption">Modul ' + u.modul + ", " + u.benar + " dari " + u.total + " soal benar</p>" +
          '<div class="deret-tombol">' + K.tombol({ label: "Pelajari lagi", varian: "secondary", href: LK.tautanTopik(u.modul, u.topik) }) + K.tombol({ label: "Latihan lagi", varian: "ghost", href: "#/modul/" + u.modul + "/latihan" }) + "</div></li>";
      }).join("")
      : '<li class="kartu tumpuk-sm"><h3>Semua materi sudah kamu kuasai</h3><p class="redup">Coba ulangi kuis untuk skor sempurna.</p></li>';
    var skor = LK.data.modul.map(function (m) {
      var p = LK.progres(m.no), ada = p.terbaik !== undefined, lulus = LK.lulus(m.no);
      var chip = lulus ? K.chip("success", "Lulus") : ada ? K.chip("error", "Perlu diulang") : LK.statusModul(m.no) === "terkunci" ? K.chip("muted", "Belum dimulai") : K.chip("muted", "Belum ada skor");
      return '<li class="baris-skor"><div><p class="label">Modul ' + m.no + ": " + esc(m.judul) + '</p><p class="caption">' + (ada ? "Terakhir " + p.terakhir + "/" + p.total + ", terbaik " + p.terbaik + "/" + p.total : "Belum ada skor") + "</p></div>" + chip + "</li>";
    }).join("");
    return {
      judul: "Rekap Skor", aktif: "rekap", topbar: tb,
      html: '<h1 class="judul-display">Rekap Belajarmu</h1>' +
        '<section class="ringkasan ringkasan-rekap" aria-label="Ringkasan"><div class="kotak-angka"><strong>' + r.selesai + "/" + LK.data.modul.length + '</strong><span>Modul selesai</span></div>' +
        '<div class="kotak-angka"><strong>' + r.lencana + '</strong><span>Lencana</span></div><div class="kotak-angka"><strong>' + (r.rata === null ? "–" : r.rata) + "</strong><span>Rata-rata skor</span></div></section>" +
        '<section aria-labelledby="judul-lencana" class="tumpuk"><h2 id="judul-lencana" class="h3-like">Lencana</h2><ul class="deret-lencana">' + lencana + "</ul></section>" +
        '<div class="dua-kolom rasio-5-7"><section class="tumpuk" aria-labelledby="judul-ulang"><div><h2 id="judul-ulang">Perlu diulang</h2><p class="caption">Materi yang skornya masih di bawah 70.</p></div><ul class="daftar-polos tumpuk">' + perlu + "</ul></section>" +
        '<section class="tumpuk" aria-labelledby="judul-skor"><h2 id="judul-skor">Skor per modul</h2><ul class="daftar-skor">' + skor + "</ul></section></div>" +
        "<div>" + K.tombol({ label: "Kembali ke Beranda", href: "#/beranda" }) + "</div>"
    };
  });

  /* ---------- 14 Profil dan Pengaturan ---------- */
  function bukaKeluar() {
    LK.modal({
      labelId: "keluar-judul", deskId: "keluar-desk", kelas: "tengah",
      html: '<span class="petak-ikon" aria-hidden="true">' + I("log-out", "ikon-lg") + '</span><h2 id="keluar-judul">Keluar dari LogikaKu?</h2>' +
        '<p id="keluar-desk" class="redup">Progres, skor, dan lencanamu tetap tersimpan di akun. Kamu bisa masuk lagi kapan saja.</p>' +
        '<div class="deret-tombol penuh-lebar">' + K.tombol({ label: "Batal", varian: "secondary", aksi: "batal" }) + K.tombol({ label: "Keluar", aksi: "keluar" }) + "</div>",
      fokus: '[data-aksi="batal"]',
      pasang: function (md, tutup) {
        md.querySelector('[data-aksi="batal"]').addEventListener("click", function () { tutup(); });
        md.querySelector('[data-aksi="keluar"]').addEventListener("click", function () { tutup(function () { LK.buka("#/landing"); }); });
      }
    });
  }
  LK.rute("/profil", function (ctx) {
    var inisial = (LK.sesi.nama || "?").trim().charAt(0).toUpperCase();
    var html = '<div class="tengah-720 tumpuk profil"><h1 class="judul-display">Profil dan Pengaturan</h1>' +
      '<section class="kartu kartu-xl baris-antara kartu-profil" aria-label="Profil"><div class="baris"><span class="avatar besar" aria-hidden="true">' + esc(inisial) + "</span>" +
      '<div><p class="h3-like">' + esc(LK.sesi.nama) + '</p><p class="caption email">' + esc(LK.sesi.email || "Belum ada email") + "</p></div></div>" +
      K.tombol({ label: "Ubah", varian: "secondary", aksi: "ubah" }) + "</section>" +
      '<section class="tumpuk" aria-labelledby="judul-tampilan"><h2 id="judul-tampilan">Tampilan</h2><div class="daftar-setel">' +
      '<div class="setel"><p class="label" id="lbl-mode">Mode warna</p>' + K.segmen("tema", "Mode warna", [{ nilai: "terang", label: "Terang" }, { nilai: "gelap", label: "Gelap" }, { nilai: "otomatis", label: "Otomatis" }], LK.pref.tema) +
      '<p class="caption">Otomatis mengikuti pengaturan perangkatmu.</p></div>' +
      '<div class="setel"><p class="label">Ukuran teks</p>' + K.segmen("teks", "Ukuran teks", [{ nilai: "normal", label: "Normal" }, { nilai: "besar", label: "Besar" }], LK.pref.teks) + "</div>" +
      '<div class="setel"><div class="setel-baris"><div><p class="label" id="lbl-gerak">Kurangi animasi</p><p class="caption" id="gerak-ket">Kabel langsung menyala tanpa animasi arus.</p></div>' +
      '<button type="button" class="saklar" role="switch" id="saklar-gerak" aria-labelledby="lbl-gerak" aria-describedby="gerak-ket" aria-checked="' + (LK.pref.gerak === "kurang") + '"><span class="saklar-pil" aria-hidden="true"></span><span class="saklar-huruf" aria-hidden="true">' + (LK.pref.gerak === "kurang" ? "T" : "F") + "</span></button></div></div>" +
      "</div></section>" +
      '<section class="tumpuk" aria-labelledby="judul-akun"><h2 id="judul-akun">Akun</h2><div class="daftar-setel">' +
      '<a class="setel" href="#/profil/ganti-sandi"><span class="label">Ganti kata sandi</span>' + I("chevron-right") + "</a>" +
      '<button type="button" class="setel" data-aksi="keluar"><span><span class="label bahaya">Keluar</span><span class="caption" style="display:block">Progresmu tetap tersimpan di akun.</span></span><span class="bahaya">' + I("log-out") + "</span></button>" +
      "</div></section></div>";
    return {
      judul: "Profil", aktif: "profil", topbar: { judul: "Profil", kembali: "#/beranda" }, html: html,
      pasang: function (el) {
        K.pasangSegmen(el, "tema", function (v) { LK.ubahPref("tema", v); LK.umumkan("Mode warna: " + v + "."); });
        K.pasangSegmen(el, "teks", function (v) { LK.ubahPref("teks", v); });
        var sg = el.querySelector("#saklar-gerak");
        sg.addEventListener("click", function () {
          var on = sg.getAttribute("aria-checked") !== "true";
          sg.setAttribute("aria-checked", on); sg.querySelector(".saklar-huruf").textContent = on ? "T" : "F";
          LK.ubahPref("gerak", on ? "kurang" : "normal");
        });
        el.querySelector('[data-aksi="keluar"]').addEventListener("click", bukaKeluar);
        el.querySelector('[data-aksi="ubah"]').addEventListener("click", function () { LK.umumkan("Mengubah profil tersedia di tahap 2."); });
        if (ctx.q.keluar) bukaKeluar();
      }
    };
  });

  /* ---------- 21 / 21c / 21b Ganti kata sandi ---------- */
  LK.rute("/profil/ganti-sandi", function (ctx) {
    var tb = { judul: "Ganti kata sandi", kembali: "#/profil" };
    if (ctx.q.tersimpan) {
      return {
        judul: "Kata sandi sudah diganti", aktif: "profil", topbar: tb,
        html: '<div class="tengah-720"><div class="keadaan kartu kartu-xl"><span class="petak-ikon sukses" aria-hidden="true">' + I("check-circle", "ikon-lg") + "</span>" +
          '<h1>Kata sandi sudah diganti</h1><p class="redup">Pakai kata sandi baru saat masuk berikutnya.</p>' + K.tombol({ label: "Kembali ke Profil", href: "#/profil" }) + "</div></div>"
      };
    }
    var gagal = !!ctx.q.gagal;
    var html = '<div class="tengah-720 tumpuk akun-form-sempit"><h1>Ganti kata sandi</h1><p class="redup">Akun: ' + esc(LK.sesi.email || LK.sesi.nama) + "</p>" +
      '<form class="tumpuk" novalidate>' +
      (gagal ? '<div class="ringkasan-galat" role="alert" tabindex="-1"><h2>' + I("alert-circle") + 'Kata sandi belum diganti</h2><p><a href="#lama" data-ke="lama">Kata sandi lama yang kamu masukkan belum cocok.</a></p></div>' : "") +
      K.kolom({ id: "lama", label: "Kata sandi lama", type: "password", autocomplete: "current-password", galat: gagal ? "Kata sandi lama belum cocok." : "" }) +
      K.kolom({ id: "baru", label: "Kata sandi baru", type: "password", autocomplete: "new-password", bantuan: "Minimal 8 karakter." }) +
      K.kolom({ id: "ulang", label: "Ulangi kata sandi baru", type: "password", autocomplete: "new-password" }) +
      K.tombol({ label: "Simpan kata sandi", type: "submit", penuh: true, nonaktif: true, syaratId: "syarat-sandi" }) +
      '<p class="syarat" id="syarat-sandi">Aktif setelah semua kolom terisi.</p>' +
      K.tombol({ label: "Batal", varian: "ghost", href: "#/profil", penuh: true }) + "</form>" +
      '<p class="caption">Lupa kata sandi lama? Keluar dulu, lalu pilih "Lupa kata sandi?" di halaman Masuk.</p></div>';
    return {
      judul: gagal ? "Kata sandi belum diganti" : "Ganti kata sandi", aktif: "profil", topbar: tb, html: html,
      pasang: function (el) {
        var form = el.querySelector("form"), btn = form.querySelector('button[type="submit"]'), syarat = el.querySelector("#syarat-sandi");
        LK.form(form, {
          judulGalat: "Kata sandi belum diganti",
          aturan: {
            lama: function (v) { return v ? null : "Kata sandi lama belum diisi."; },
            baru: function (v, s) { return !v ? "Kata sandi baru belum diisi." : v.length < 8 ? "Kata sandi minimal 8 karakter." : v === s.lama ? "Kata sandi baru harus berbeda dari yang lama." : null; },
            ulang: function (v, s) { return !v ? "Ulangi kata sandi baru." : v !== s.baru ? "Kata sandi belum sama dengan yang di atas." : null; }
          },
          saatKetik: function (v) { var penuh = v.lama && v.baru && v.ulang; btn.disabled = !penuh; syarat.hidden = !!penuh; },
          kirim: function () { LK.buka("#/profil/ganti-sandi?tersimpan"); }
        });
        form.querySelectorAll("[data-ke]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); el.querySelector("#lama").focus(); }); });
        if (gagal) form.querySelector(".ringkasan-galat").focus();
      }
    };
  });

  /* ---------- Daftar layar (bantu tinjau) ---------- */
  var DAFTAR = [
    ["11-landing", "Landing", "#/landing"], ["12a-masuk", "Masuk", "#/masuk"], ["12b-daftar", "Daftar", "#/daftar"], ["12c-masuk-gagal", "Masuk gagal", "#/masuk?gagal"],
    ["13a-lupa-sandi", "Lupa kata sandi", "#/lupa-sandi"], ["13b-cek-email", "Cek email", "#/cek-email"], ["13c-sandi-baru", "Kata sandi baru", "#/sandi-baru"],
    ["01-beranda", "Beranda", "#/beranda"], ["01b-beranda-naik", "Beranda setelah modul selesai (arus mengalir)", "#/layar/naik"], ["01c-beranda-baru", "Beranda pengguna baru", "#/layar/baru"],
    ["02-materi", "Materi Modul 4", "#/modul/4/materi?bagian=3"], ["02b-materi-proposisi", "Materi Modul 1: Apa itu Proposisi?", "#/modul/1/materi"],
    ["03-simulasi", "Latihan tabel kebenaran (sudah dicek)", "#/modul/4/latihan?demo=salah"], ["04-flowchart", "Latihan flowchart", "#/modul/7/latihan?paksa"],
    ["05a-kuis-belum", "Kuis belum menjawab", "#/modul/4/kuis"], ["05b-kuis-benar", "Kuis benar", "#/modul/4/kuis?demo=benar"], ["05c-kuis-salah", "Kuis salah", "#/modul/4/kuis?demo=salah"],
    ["05d-hasil-lulus", "Hasil lulus", "#/modul/4/hasil?demo=lulus"], ["05e-hasil-belum-lulus", "Hasil belum lulus", "#/modul/4/hasil?demo=belum"], ["06-lencana", "Modal lencana", "#/modul/4/hasil?demo=lulus&lencana"],
    ["07-rekap", "Rekap skor", "#/rekap"], ["08-pseudocode", "Penelusur pseudocode", "#/modul/8/latihan?paksa&demo"], ["09-gerbang", "Lab gerbang logika", "#/modul/2/latihan"],
    ["10a-kosong-rekap", "Rekap kosong", "#/rekap?kosong"], ["10b-error-materi", "Materi gagal dimuat", "#/modul/4/materi?gagal"], ["10c-offline-beranda", "Beranda offline", "#/beranda?offline"], ["10d-memuat-beranda", "Memuat beranda", "#/beranda?memuat"],
    ["14-profil", "Profil dan pengaturan", "#/profil"], ["14b-keluar", "Konfirmasi keluar", "#/profil?keluar"],
    ["15-latihan-proposisi", "Latihan proposisi", "#/modul/1/latihan"], ["15b-latihan-proposisi-benar", "Latihan proposisi benar", "#/modul/1/latihan?demo=benar"],
    ["16-latihan-implikasi", "Latihan implikasi", "#/modul/3/latihan"], ["17-latihan-ekuivalensi", "Latihan ekuivalensi", "#/modul/5/latihan?paksa"], ["18-latihan-komputasi", "Latihan berpikir komputasional", "#/modul/6/latihan?paksa"],
    ["19-latihan-percabangan", "Latihan percabangan", "#/modul/9/latihan?paksa"], ["20-latihan-perulangan", "Latihan perulangan", "#/modul/10/latihan?paksa"],
    ["21-ganti-sandi", "Ganti kata sandi", "#/profil/ganti-sandi"], ["21b-sandi-tersimpan", "Kata sandi tersimpan", "#/profil/ganti-sandi?tersimpan"], ["21c-ganti-sandi-gagal", "Ganti kata sandi gagal", "#/profil/ganti-sandi?gagal"]
  ];
  LK.rute("/layar", function () {
    return {
      shell: "polos", judul: "Daftar layar prototype",
      html: '<main id="utama" class="indeks tumpuk" tabindex="-1">' + K.logo("#/landing") + "<h1>Daftar layar prototype</h1>" +
        '<p class="redup lebar-baca">Semua ' + DAFTAR.length + " layar desain LogikaKu tahap 1. Nama di kiri sama dengan nama PNG dan frame Figma. Layar yang terkunci untuk Dimas dibuka dengan tanda <code>paksa</code>.</p>" +
        '<div class="deret-tombol">' + K.tombol({ label: "Pakai data Dimas lagi", varian: "secondary", aksi: "reset" }) + K.tombol({ label: "Mulai dari Landing", href: "#/landing" }) + "</div>" +
        '<ol class="daftar-layar">' + DAFTAR.map(function (d) { return '<li><a href="' + d[2] + '"><span class="mono">' + d[0] + "</span><span>" + esc(d[1]) + "</span></a></li>"; }).join("") + "</ol></main>",
      pasang: function (el) {
        el.querySelector('[data-aksi="reset"]').addEventListener("click", function () { LK.masukSebagaiDimas(); LK.umumkan("Data contoh Dimas dipulihkan."); });
      }
    };
  });
  /* Beranda pengguna baru dan beranda naik untuk ditinjau langsung. */
  LK.rute("/layar/baru", function () { LK.daftarBaru("Dimas", "dimas@gmail.com"); return { alih: "#/beranda" }; });
  LK.rute("/layar/naik", function () {
    LK.masukSebagaiDimas();
    LK.catatKuis(4, 8, 10);
    return { alih: "#/beranda?naik=5" };
  });

  LK.layar.tidakAda = function () {
    return {
      shell: "polos", judul: "Halaman tidak ditemukan",
      html: '<main id="utama" class="indeks keadaan" tabindex="-1"><h1>Halaman tidak ditemukan</h1><p class="redup">Alamat ini tidak ada di LogikaKu.</p>' + K.tombol({ label: "Ke Beranda", href: "#/beranda" }) + "</main>"
    };
  };
})();
