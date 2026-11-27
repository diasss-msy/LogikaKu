/* Layar 01 Beranda, 01b Beranda naik, 01c Beranda pengguna baru, 10c offline, 10d memuat. */
(function () {
  var I = LK.ikon, esc = LK.esc, K = LK.k;
  var babDipilih = null;

  function bannerOffline() {
    return '<div class="banner" role="status">' + I("wifi-off") + "<p>Kamu sedang offline. Materi yang sudah dibuka tetap bisa dipelajari, dan progresmu dikirim saat online lagi.</p></div>";
  }

  function kerangka() {
    var k = function (w, h, extra) { return '<div class="kerangka" style="width:' + w + ";height:" + h + "px;" + (extra || "") + '"></div>'; };
    var led = "";
    for (var i = 0; i < 5; i++) led += '<div class="kerangka" style="width:28px;height:28px;border-radius:50%"></div>';
    return '<div class="tumpuk" aria-busy="true">' +
      '<h1 class="sr-only">Beranda</h1><p class="caption">Memuat rangkaianmu...</p>' +
      k("min(320px, 70%)", 40) + k("min(260px, 60%)", 20) + k("100%", 48) +
      '<div class="baris-antara" aria-hidden="true">' + led + "</div>" +
      '<div class="beranda-atas" aria-hidden="true">' + k("100%", 200, "border-radius:14px") +
      '<div class="ringkasan ringkasan-samping">' + k("100%", 80, "border-radius:14px") + k("100%", 80, "border-radius:14px") + k("100%", 80, "border-radius:14px") + "</div></div>" +
      k("200px", 28) + '<div class="grid-modul" aria-hidden="true">' + k("100%", 220, "border-radius:14px") + k("100%", 220, "border-radius:14px") + k("100%", 220, "border-radius:14px") + "</div></div>";
  }

  function kartuLanjut(baru) {
    var n = LK.modulSekarang();
    if (!n) {
      return '<section class="kartu kartu-kuat kartu-xl tumpuk" aria-labelledby="lanjut-judul"><p class="caption">Rangkaian menyala penuh</p>' +
        '<h2 id="lanjut-judul">Selamat, semua modul selesai!</h2><p>Kamu sudah mengumpulkan semua lencana.</p>' +
        '<div>' + K.tombol({ label: "Lihat rekap", href: "#/rekap" }) + "</div></section>";
    }
    var m = LK.modul(n), l = LK.langkahModul(n);
    var materi = (LK.data.materi[n] || [{ judul: m.judul }])[0].judul;
    var berikut = l === 0 ? "materi “" + materi + "”" : l === 1 ? "latihan “" + m.namaLatihan + "”" : "kuis Modul " + n;
    var label = baru ? "Mulai Modul 1" : l === 0 ? "Mulai" : "Lanjutkan";
    return '<section class="kartu kartu-kuat kartu-xl tumpuk" aria-labelledby="lanjut-judul"><p class="caption">' + (baru ? "Mulai belajar" : "Lanjutkan belajar") + "</p>" +
      '<h2 id="lanjut-judul" class="judul-kartu-lanjut">Modul ' + n + ": " + esc(m.judul) + "</h2>" +
      "<p class=\"redup\">Berikutnya: " + esc(berikut) + "</p>" +
      K.progresBar((l / 3) * 100, l + "/3 langkah", "Progres Modul " + n) +
      "<div>" + K.tombol({ label: label, href: LK.tautanLanjut(n), kelas: "tombol-lanjut" }) + "</div></section>";
  }

  function ringkasan() {
    var r = LK.ringkasan();
    return '<section class="ringkasan ringkasan-samping" aria-label="Ringkasan">' +
      '<div class="kotak-angka"><strong>' + r.selesai + "/" + LK.data.modul.length + "</strong><span>Modul selesai</span></div>" +
      '<div class="kotak-angka"><strong>' + r.lencana + "</strong><span>Lencana</span></div>" +
      '<div class="kotak-angka"><strong>' + (r.rata === null ? "–" : r.rata) + '</strong><span>Rata-rata skor</span></div></section>';
  }

  LK.rute("/beranda", function (ctx) {
    if (ctx.q.memuat) {
      setTimeout(function () { if (/memuat/.test(location.hash)) { LK.gantiHashDiam("#/beranda"); LK.muatUlang(); } }, 1600);
      return { judul: "Memuat", aktif: "beranda", topbar: { jenis: "beranda" }, html: kerangka() };
    }
    var baru = LK.penggunaBaru(), now = LK.modulSekarang(), naik = parseInt(ctx.q.naik, 10) || null;
    var offline = ctx.q.offline || (typeof navigator !== "undefined" && navigator.onLine === false);
    if (babDipilih === null || naik) babDipilih = now ? LK.modul(now).bab : 2;
    var sub = baru ? "Rangkaianmu masih padam. Selesaikan Modul 1 untuk menyalakan LED pertama."
      : naik ? "Modul " + (naik - 1) + " selesai! Arus sudah sampai Modul " + naik + "."
      : now ? "Arus belajarmu sudah sampai Modul " + now + "." : "Semua modul selesai. Rangkaianmu menyala penuh!";

    var daftar = "";
    LK.data.bab.forEach(function (b) {
      daftar += '<section class="tumpuk" aria-labelledby="bab-' + b.id + '"><h3 id="bab-' + b.id + '" class="judul-bab">' + esc(b.judul) + '</h3><div class="grid-modul">' +
        b.modul.map(K.kartuModul).join("") + "</div></section>";
    });

    /* Gaya panel: tiap kelompok elemen duduk di panel putih dengan kepala (ikon, judul, keterangan, aksi).
     * Elemen sama seperti sebelumnya. Urutan di HTML = urutan di HP dan urutan pembaca layar. */
    var r = LK.ringkasan(), total = LK.data.modul.length;
    function kepala(ikon, id, judul, ket, aksi) {
      return '<div class="p-kepala"><div class="p-judul"><span class="p-ikon" aria-hidden="true">' + I(ikon) + '</span><div>' +
        '<h2 id="' + id + '">' + judul + '</h2><p class="caption">' + ket + "</p></div></div>" + (aksi ? '<div class="p-aksi">' + aksi + "</div>" : "") + "</div>";
    }
    var html = (offline ? bannerOffline() : "") +
      '<div class="beranda">' +
      '<div class="p-panel b-atas">' +
      '<div class="b-sapaan sapaan"><h1 class="judul-sapaan">Halo, ' + esc(LK.sesi.nama) + '!</h1><p class="teks-lg redup">' + esc(sub) + "</p></div>" +
      '<div class="b-ringkasan">' + ringkasan() + '<p class="b-rekap">' + K.tautan("#/rekap", "Lihat rekap skor", "bar-chart") + "</p></div></div>" +
      '<section class="p-panel b-rangkaian" aria-labelledby="judul-rangkaian">' +
      kepala("lightbulb", "judul-rangkaian", "Rangkaian belajar", "Tiap LED menyala saat satu modul selesai",
        K.segmen("bab", "Pilih bab", LK.data.bab.map(function (b) { return { nilai: String(b.id), label: b.judul }; }), String(babDipilih), "segmen-bab")) +
      '<div class="p-isi b-rangkaian-isi"><div class="p-kotak b-sirkuit"><div id="wadah-rangkaian">' + K.rangkaian(babDipilih, { mengalirKe: naik }) + "</div></div>" +
      '<div class="b-lanjut">' + kartuLanjut(baru) + "</div></div></section>" +
      '<section class="p-panel b-modul" aria-labelledby="judul-semua">' +
      kepala("book-open", "judul-semua", "Semua Modul", r.selesai + " dari " + total + " modul selesai, dalam " + LK.data.bab.length + " bab") +
      '<div class="p-isi tumpuk">' + daftar + "</div></section>" +
      "</div>";

    return {
      judul: "Beranda", aktif: "beranda", topbar: { jenis: "beranda" }, html: html,
      pasang: function (el) {
        if (naik) LK.gantiHashDiam("#/beranda");
        K.pasangSegmen(el, "bab", function (v) {
          babDipilih = parseInt(v, 10);
          el.querySelector("#wadah-rangkaian").innerHTML = K.rangkaian(babDipilih);
        });
      }
    };
  });
})();
