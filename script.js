(function () {
  "use strict";

  // URL web app Google Apps Script untuk menampung review (lihat README). Kosong = fitur kirim belum aktif.
  var REVIEW_URL = "https://script.google.com/macros/s/AKfycbw-MOTVej-cqJjYpNOMnf9Z4CQ_EbUDe7vedLoc8ZdZj_Vwpnp5vRuTrb03_r93s-5O/exec";

  // 4 kelompok keahlian (KK), tiap KK punya 4 peran
  var KK = ["Software Engineering", "AI & Machine Learning", "Network & Security", "Information System"];

  var KD = ["Bikin aplikasi, website, dan game yang dipakai orang.", "Ngajarin komputer belajar dari data, gambar, dan teks.", "Menjaga jaringan tetap nyambung dan sistem tetap aman.", "Nyambungin kebutuhan orang atau organisasi dengan sistem dan data."];

  // k = indeks KK, n = nama peran, l = deskripsi, j = profesi, s = 3 langkah pertama
  var R = {
    fe: { k: 0, n: "Web Frontend Developer", l: "Kamu peka pada hal yang terlihat dan terasa saat dipakai, dan senang melihat ide langsung jadi halaman hidup.", j: ["Frontend Developer", "Web Developer", "Creative Developer"],
      s: ["Hari 1-2: HTML dan CSS, tiru satu halaman yang kamu suka.", "Hari 3-5: tambah JavaScript, buat galeri atau kuis kecil.", "Akhir pekan: pasang di GitHub Pages dan minta tiga teman mencoba."] },
    be: { k: 0, n: "Backend & Web Architect", l: "Kamu betah di balik layar: merancang alur data, API, dan struktur sistem yang kokoh saat banyak orang memakainya.", j: ["Backend Engineer", "Software Architect", "API Developer"],
      s: ["Hari 1-2: buat REST API sederhana dengan Node.js atau Laravel.", "Hari 3-5: tambah database dan login pengguna.", "Akhir pekan: gambar diagram arsitekturnya, lalu uji dengan 100 permintaan sekaligus."] },
    mob: { k: 0, n: "Mobile Developer", l: "Kamu ingin karyamu hidup di saku orang dan dipakai setiap hari.", j: ["Android Developer", "Mobile Engineer", "Flutter Developer"],
      s: ["Hari 1-2: pasang Android Studio dan jalankan aplikasi pertama.", "Hari 3-5: buat aplikasi catatan dengan penyimpanan lokal.", "Akhir pekan: pasang di HP temanmu dan catat keluhannya."] },
    gm: { k: 0, n: "Game Developer", l: "Kamu paling hidup saat sebuah ide langsung bisa dimainkan dan terasa menyenangkan.", j: ["Game Programmer", "Gameplay Engineer", "Technical Artist"],
      s: ["Hari 1-2: pilih Unity atau Godot, ikuti tutorial satu game 2D.", "Hari 3-5: buat satu mekanik buatanmu sendiri.", "Akhir pekan: rilis di itch.io dan minta tiga orang mencobanya."] },
    ml: { k: 1, n: "Machine Learning Engineer", l: "Kamu tertarik pada cara mesin belajar dari contoh, dan sabar menyetel model sampai hasilnya membaik.", j: ["ML Engineer", "AI Engineer", "MLOps Engineer"],
      s: ["Hari 1-2: Python dasar dan NumPy.", "Hari 3-5: latih model klasifikasi pertamamu dengan scikit-learn.", "Akhir pekan: tulis hasilnya dalam satu halaman penjelasan."] },
    ds: { k: 1, n: "Data Scientist", l: "Kamu menikmati menemukan cerita tersembunyi di balik deretan angka.", j: ["Data Scientist", "Data Analyst", "BI Analyst"],
      s: ["Hari 1-2: pandas dan SQL dasar.", "Hari 3-5: analisis satu dataset terbuka yang kamu minati.", "Akhir pekan: ubah hasilnya jadi tiga grafik dan satu kesimpulan."] },
    cv: { k: 1, n: "Computer Vision & Robotics", l: "Kamu ingin mesin bisa melihat dan memahami dunia nyata lewat kamera dan sensor.", j: ["Computer Vision Engineer", "Robotics Engineer", "Embedded AI Developer"],
      s: ["Hari 1-2: OpenCV dasar, baca gambar dan webcam.", "Hari 3-5: jalankan deteksi objek dengan model terlatih.", "Akhir pekan: bungkus jadi demo webcam yang bisa dipamerkan."] },
    nlp: { k: 1, n: "NLP & LLM Engineer", l: "Kamu tertarik pada bahasa: bagaimana mesin memahami, merangkum, dan menjawab teks manusia.", j: ["NLP Engineer", "LLM Application Developer", "Conversational AI Developer"],
      s: ["Hari 1-2: Python dan cara memanggil API model bahasa.", "Hari 3-5: buat bot tanya-jawab dari satu dokumen.", "Akhir pekan: uji dengan 10 pertanyaan temanmu dan catat jawaban yang salah."] },
    pen: { k: 2, n: "Penetration Tester", l: "Kamu jeli melihat celah dan penasaran bagaimana sebuah sistem bisa ditembus.", j: ["Penetration Tester", "Red Team Specialist", "Bug Bounty Hunter"],
      s: ["Hari 1-2: dasar jaringan dan perintah Linux.", "Hari 3-5: selesaikan ruangan pemula di TryHackMe.", "Akhir pekan: kerjakan satu soal picoCTF dan tulis writeup. Berlatihlah hanya di lab yang legal."] },
    sec: { k: 2, n: "Security Analyst", l: "Kamu teliti memantau tanda bahaya dan menyusun pertahanan sebelum serangan terjadi.", j: ["SOC Analyst", "Incident Responder", "Security Engineer"],
      s: ["Hari 1-2: baca log Linux dan pakai Wireshark dasar.", "Hari 3-5: ikuti jalur Blue Team di TryHackMe.", "Akhir pekan: tulis laporan insiden fiktif dari log yang kamu temukan."] },
    net: { k: 2, n: "Network Engineer", l: "Kamu suka memikirkan bagaimana data berpindah antar perangkat dan menjaga koneksi tetap hidup.", j: ["Network Engineer", "Network Administrator", "Telecom Engineer"],
      s: ["Hari 1-2: pasang Cisco Packet Tracer, bangun satu LAN.", "Hari 3-5: pelajari subnetting, VLAN, dan routing.", "Akhir pekan: dokumentasikan topologimu lengkap dengan diagram."] },
    cld: { k: 2, n: "Cloud & DevOps Engineer", l: "Kamu senang mengotomatiskan dan memastikan layanan berjalan stabil dari server sampai rilis.", j: ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer"],
      s: ["Hari 1-2: Linux, Git, dan Docker dasar.", "Hari 3-5: deploy satu aplikasi ke VPS atau layanan cloud gratis.", "Akhir pekan: otomatiskan rilis dengan GitHub Actions."] },
    ba: { k: 3, n: "System & Business Analyst", l: "Kamu pandai menerjemahkan masalah orang menjadi kebutuhan sistem yang jelas.", j: ["Business Analyst", "System Analyst", "Product Analyst"],
      s: ["Hari 1-2: gambar use case dan flowchart satu proses nyata, misalnya peminjaman buku.", "Hari 3-5: wawancarai dua pengguna prosesnya.", "Akhir pekan: susun dokumen kebutuhan satu halaman."] },
    dbe: { k: 3, n: "Data & Database Engineer", l: "Kamu rapi menata data supaya cepat dicari, aman, dan konsisten.", j: ["Database Administrator", "Data Engineer", "ETL Developer"],
      s: ["Hari 1-2: SQL dan ERD dasar.", "Hari 3-5: rancang satu database lengkap dengan query-nya.", "Akhir pekan: tambah index dan bandingkan waktu query sebelum dan sesudahnya."] },
    pm: { k: 3, n: "IT Project & Product Manager", l: "Kamu senang mengatur orang, waktu, dan prioritas agar proyek benar-benar selesai.", j: ["IT Project Manager", "Product Manager", "Scrum Master"],
      s: ["Hari 1-2: pelajari Scrum dan Kanban.", "Hari 3-5: kelola satu proyek kelompok dengan Trello atau Notion.", "Akhir pekan: adakan retrospektif dan catat apa yang perlu diperbaiki."] },
    ux: { k: 3, n: "UI/UX Designer", l: "Kamu peka pada hal yang terasa enak atau mengganjal saat dipakai, dan sabar merapikannya sampai pas.", j: ["UI/UX Designer", "Product Designer", "UX Researcher"],
      s: ["Hari 1-2: belajar Figma dan dasar tata letak.", "Hari 3-5: rancang ulang satu aplikasi yang menurutmu membingungkan.", "Akhir pekan: uji ke tiga orang dan catat bagian yang membuat mereka bingung."] }
  };

  // [skenario, [[jawaban, "peran+bobot ..."], ...]]
  var Q = [
    ["Minggu kosong, nggak ada kuliah. Kamu paling mungkin ngapain?", [
      ["Main atau nonton sampai lupa waktu", "gm2 fe1"],
      ["Beres-beres dan ngatur ulang barang biar rapi", "dbe2 ba1 pm1"],
      ["Keluar rumah, ngobrol sama orang baru", "pm2 ux1"],
      ["Ngulik gadget atau hal random di internet", "net1 pen1 cld1 ml1"]]],
    ["Temanmu bingung milih sesuatu dan curhat ke kamu. Kamu biasanya...", [
      ["Dengerin dulu, tanya-tanya sampai ketemu akar masalahnya", "ba2 ux1"],
      ["Kasih perbandingan dan angka biar dia bisa mikir jernih", "ds2 ml1"],
      ["Bantu bikin daftar langkah dan jadwalnya", "pm2 ba1"],
      ["Bikin suasana enak lagi dulu, baru dipikirin", "ux1 gm1 fe1 nlp1"]]],
    ["Barang yang baru kamu beli ternyata rusak. Kamu...", [
      ["Bongkar sendiri, penasaran kenapa bisa rusak", "pen2 be1"],
      ["Cari panduan dan kerjakan step by step", "net1 cld1 mob1"],
      ["Komplain ke penjual, bukti dirapikan lengkap", "sec1 ba1 pm1"],
      ["Beli lagi, sambil cari tahu merek mana yang paling awet", "ds1 ml1 ba1"]]],
    ["Pujian mana yang paling bikin kamu senang?", [
      ["“Hasil karyamu bagus banget, enak dilihat!”", "fe2 ux1 gm1"],
      ["“Kerjaanmu rapi, nggak ada yang kelewat.”", "dbe1 sec1 pm1 ba1"],
      ["“Idemu pintar, nggak kepikiran orang lain.”", "ml1 nlp1 cv1 gm1"],
      ["“Ada kamu, semuanya jadi aman.”", "cld1 sec1 net1 be1"]]],
    ["Kerja kelompok, ada bagian yang nggak ada yang mau ambil. Kamu ambil...", [
      ["Desain dan tampilan presentasi", "ux2 fe1"],
      ["Riset dan cari bahan pendukung", "ds1 nlp1 ba1"],
      ["Bagian paling rumit yang butuh mikir lama", "be1 ml1 pen1 cv1"],
      ["Koordinasi dan nagih progres teman-teman", "pm2 ba1"]]],
    ["Kalau lagi main game, kamu paling betah...", [
      ["Ngitung strategi dan peluang menang", "ds1 ml1 sec1"],
      ["Nyari celah atau glitch yang bisa dimanfaatkan", "pen2 sec1 gm1"],
      ["Bangun sesuatu: kota, markas, dunia sendiri", "gm1 be1 cld1"],
      ["Main bareng tim, ngatur peran tiap orang", "pm2 ba1"]]],
    ["Hal mana yang paling bikin kamu kesal?", [
      ["Wifi lemot atau sinyal putus-putus", "net2 cld1"],
      ["Aplikasi yang ribet dan susah dimengerti", "ux2 fe1 mob1"],
      ["Info yang berantakan, susah dicari", "dbe2 ba1"],
      ["Orang yang gampang ketipu hoaks dan penipuan", "sec2 nlp1"]]],
    ["Mana yang paling bikin kamu mikir “kok bisa ya?”", [
      ["HP bisa kenal wajahmu buat dibuka", "cv2 ml1"],
      ["Aplikasi ojek tahu driver terdekat dalam hitungan detik", "be2 mob1"],
      ["Toko online tahu barang yang kamu suka", "ds2 ml1"],
      ["Pesan WA sampai ke teman dengan aman", "net2 sec1"]]],
    ["Ngerjain satu hal selama 3 jam, kamu paling tahan kalau...", [
      ["Merapikan detail kecil sampai pas banget", "fe1 ux1 gm1"],
      ["Nyari penyebab masalah yang nggak ketemu-ketemu", "be1 sec1 pen1 net1"],
      ["Coba berkali-kali dengan cara beda, lihat hasilnya", "ml1 cv1 nlp1 ds1"],
      ["Nyusun rencana dan ngurus banyak hal sekaligus", "pm1 ba1 cld1 dbe1"]]],
    ["Kamu bikin sesuatu. Paling senang kalau...", [
      ["Dipakai banyak orang tiap hari di HP", "mob2 ux1"],
      ["Bikin kerjaan orang di kantor jadi lebih cepat", "ba1 be1 dbe1 pm1"],
      ["Dipakai buat seru-seruan bareng teman", "gm2 fe1"],
      ["Nggak ada yang sadar, soalnya semuanya jalan lancar", "cld2 sec1 net1"]]],
    ["Kamu paling nyaman belajar dengan cara...", [
      ["Langsung praktik, salah dulu nggak apa-apa", "fe1 gm1 mob1 pen1"],
      ["Paham teorinya dulu, baru praktik", "ml1 ds1 net1 sec1"],
      ["Diskusi dan tanya ke orang", "pm1 ba1 ux1 nlp1"],
      ["Bongkar contoh yang sudah jadi, lalu diubah-ubah", "be1 cld1 pen1 cv1"]]],
    ["Pelajaran sekolah yang dulu paling kamu suka?", [
      ["Matematika atau Fisika", "ml1 ds1 cv1 net1"],
      ["Seni atau Bahasa", "ux1 nlp1 fe1 gm1"],
      ["Ekonomi atau Sosiologi", "ba1 pm1 dbe1 ux1"],
      ["Prakarya atau pelajaran praktik", "net1 cld1 mob1 be1"]]]
  ];

  function W(s) { var o = {}; s.replace(/([a-z]+)(\d)/g, function (_, k, v) { o[k] = +v; }); return o; }
  Q.forEach(function (q) { q[1].forEach(function (o) { o[1] = W(o[1]); }); });

  // skor maksimal tiap peran, untuk persentase
  var MAX = {};
  Object.keys(R).forEach(function (k) {
    MAX[k] = Q.reduce(function (t, q) { return t + Math.max.apply(null, q[1].map(function (o) { return o[1][k] || 0; })); }, 0);
  });

  var N = Q.length, app = document.getElementById("app");
  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var i, sc, hist, ord;

  function shuffle(a) { return a.map(function (x) { return [Math.random(), x]; }).sort(function (a, b) { return a[0] - b[0]; }).map(function (x) { return x[1]; }); }

  function swap(fn) {
    var s = app.firstElementChild;
    if (!s || RM) { fn(); return; }
    s.classList.add("out");
    setTimeout(fn, 200);
  }

  function start() {
    i = 0; sc = {}; hist = [];
    Object.keys(R).forEach(function (k) { sc[k] = 0; });
    ord = Q.map(function (q) { return shuffle([0, 1, 2, 3]); });
    app.innerHTML =
      '<section class="stage"><span class="script">Jadi Dev</span>' +
      '<h1 class="grad">Kamu cocoknya ke mana di dunia informatika?</h1>' +
      '<p class="lead">' + N + ' pertanyaan santai, sekitar tiga menit. Nggak ada jawaban benar atau salah. Pilih yang paling kamu banget, nanti ketahuan kamu cocok ke mana dan kerjanya jadi apa.</p>' +
      '<button class="go" id="go">Mulai tes</button>' +
      '<p class="note">Ada empat kelompok keahlian di informatika:</p>' +
      '<ul class="axes" style="margin-top:12px">' +
      KK.map(function (n, a) {
        return '<li class="glass"><b>' + n + '</b><span>' + KD[a] + '</span></li>';
      }).join("") + '</ul></section>';
    document.getElementById("go").onclick = function () { swap(ask); };
  }

  function ask() {
    var q = Q[i], L = "ABCD";
    app.innerHTML =
      '<section class="stage"><div class="prog"><div class="meter" role="progressbar" aria-label="Kemajuan tes" aria-valuemin="0" aria-valuemax="' + N + '" aria-valuenow="' + i + '"><i style="width:' + (i / N * 100) + '%"></i></div><span>' + (i + 1) + ' dari ' + N + '</span></div>' +
      '<h2 class="grad">' + q[0] + '</h2><div class="opts" id="opts">' +
      ord[i].map(function (idx, n) { return '<button class="opt glass" data-i="' + idx + '" style="animation-delay:' + n * 60 + 'ms"><kbd>' + L[n] + '</kbd><span>' + q[1][idx][0] + '</span></button>'; }).join("") +
      '</div>' + (i ? '<button class="back" id="back">Kembali ke pertanyaan sebelumnya</button>' : "") + '</section>';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var f = app.querySelector(".meter i");
        if (f) f.style.width = ((i + 1) / N * 100) + "%";
      });
    });
    document.getElementById("opts").onclick = function (e) {
      var b = e.target.closest(".opt");
      if (b) pick(b);
    };
    var bk = document.getElementById("back");
    if (bk) bk.onclick = function () {
      var w = hist.pop();
      for (var k in w) sc[k] -= w[k];
      i--;
      swap(ask);
    };
  }

  function pick(b) {
    var box = document.getElementById("opts");
    if (!box || box.classList.contains("lock")) return;
    var w = Q[i][1][+b.dataset.i][1];
    box.classList.add("lock");
    if (navigator.vibrate && !RM) navigator.vibrate(12);
    b.classList.add("picked");
    for (var k in w) sc[k] += w[k];
    hist.push(w);
    i++;
    setTimeout(function () { swap(i < N ? ask : load); }, RM ? 0 : 380);
  }

  // skeleton shimmer sebelum hasil
  function load() {
    app.innerHTML =
      '<section class="stage" aria-busy="true"><span class="script">Menghitung...</span>' +
      '<div class="sk" style="height:64px;width:78%;margin:8px 0 14px"></div>' +
      '<div class="sk" style="height:20px;width:55%;margin-bottom:10px"></div>' +
      '<div class="sk" style="height:20px;width:68%;margin-bottom:30px"></div>' +
      '<div class="g2"><div class="sk" style="height:170px"></div><div class="sk" style="height:170px"></div></div></section>';
    setTimeout(result, RM ? 0 : 1500);
  }

  // samarkan nama: huruf pertama dan terakhir, sisanya *
  function mask(n) {
    var a = Array.from(String(n).trim());
    if (a.length < 2) return "*";
    if (a.length === 2) return a[0] + "*";
    return a[0] + "*".repeat(a.length - 2) + a[a.length - 1];
  }

  function item(o, n) {
    var d = document.createElement("div"), h = document.createElement("div"), b = document.createElement("b"), st = document.createElement("span"), m = document.createElement("small");
    d.className = "rv-i"; d.style.animationDelay = (n || 0) * 60 + "ms";
    h.className = "rv-h"; b.textContent = o.nama;
    st.className = "rv-s"; st.setAttribute("aria-label", "Rating " + o.rating + " dari 5");
    st.textContent = o.rating ? "★".repeat(o.rating) + "☆".repeat(5 - o.rating) : "";
    h.appendChild(b); h.appendChild(st); d.appendChild(h);
    if (o.saran) { var p = document.createElement("p"); p.textContent = o.saran; d.appendChild(p); }
    var t = new Date(o.waktu);
    m.textContent = [o.peran, isNaN(t) ? "" : t.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })].filter(Boolean).join(" · ");
    d.appendChild(m);
    return d;
  }

  function loadReviews() {
    fetch(REVIEW_URL).then(function (r) { return r.json(); }).then(function (a) {
      var box = document.getElementById("rlist");
      if (!box) return;
      box.innerHTML = "";
      if (!a.length) { box.innerHTML = "<p>Belum ada review. Jadi yang pertama!</p>"; return; }
      a.forEach(function (o, n) { box.appendChild(item(o, n)); });
    }).catch(function (err) {
      console.warn("Review gagal dimuat:", err);
      var box = document.getElementById("rlist");
      if (box) box.innerHTML = "<p>Review belum bisa dimuat. Coba muat ulang halaman.</p>";
    });
  }

  function result() {
    var keys = Object.keys(R);
    var rs = keys.map(function (k) { return { k: k, s: sc[k], pct: Math.round(100 * sc[k] / MAX[k]) }; });
    var ks = KK.map(function (n, a) {
      var s = 0, m = 0;
      keys.forEach(function (k) { if (R[k].k === a) { s += sc[k]; m += MAX[k]; } });
      return { a: a, pct: Math.round(100 * s / m), s: s / m };
    });
    var tk = ks.slice().sort(function (x, y) { return y.s - x.s; })[0];
    var byPct = function (x, y) { return y.s / MAX[y.k] - x.s / MAX[x.k]; };
    var top = rs.filter(function (r) { return R[r.k].k === tk.a; }).sort(byPct)[0];
    var p = R[top.k];
    var alts = rs.filter(function (r) { return r.k !== top.k; }).sort(byPct).slice(0, 2);

    var kkRows = ks.slice().sort(function (x, y) { return y.s - x.s; }).map(function (o) {
      return '<div class="alt k"><span' + (o.a === tk.a ? ' style="font-weight:700"' : "") + '>' + KK[o.a] + '</span><div class="track"><i data-w="' + o.pct + '"></i></div><b>' + o.pct + '%</b></div>';
    }).join("");
    var altRows = alts.map(function (o) {
      return '<div class="alt k"><span>' + R[o.k].n + '<small> · ' + KK[R[o.k].k] + '</small></span><div class="track"><i data-w="' + o.pct + '"></i></div><b>' + o.pct + '%</b></div>';
    }).join("");

    app.innerHTML =
      '<section class="stage"><span class="script">Hasilmu</span>' +
      '<p class="who" style="margin:0">Kelompok keahlian yang paling cocok</p>' +
      '<h2 class="grad" style="font-size:clamp(2rem,7vw,3.4rem)">' + KK[tk.a] + '</h2>' +
      '<p class="lead" style="margin:6px 0 0">' + KD[tk.a] + '</p>' +
      '<p class="who">Peran spesifikmu: <b>' + p.n + '</b>, kecocokan ' + top.pct + '%.</p>' +
      '<p class="lead" style="margin-bottom:0">' + p.l + '</p>' +
      '<div class="later" id="later">' +
      '<div class="card glass"><h3>Bisa bekerja sebagai</h3><div class="chips">' + p.j.map(function (x) { return "<span>" + x + "</span>"; }).join("") + '</div></div>' +
      '<div class="g2"><div class="card glass"><h3>Kecocokan tiap kelompok</h3>' + kkRows + '</div>' +
      '<div class="card glass"><h3>Mulai dari sini</h3><ol>' + p.s.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ol></div></div>' +
      '<div class="card glass"><h3>Peran lain yang dekat denganmu</h3>' + altRows + '<p style="margin-top:6px">Masih ragu? Kerjakan langkah pertama dari masing-masing peran, lalu lihat mana yang membuatmu betah.</p></div>' +
      '<div class="card glass" id="rv"><h3>Kasih saran buat tes ini</h3><p style="margin-bottom:12px">Tes ini masih dikembangkan. Kritik dan sarannya sangat membantu.</p>' +
      '<div class="stars" role="group" aria-label="Rating">' + [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" class="star" data-n="' + n + '" aria-label="' + n + ' dari 5">★</button>'; }).join("") + '</div>' +
      '<input class="fld" id="rn" placeholder="Namamu (wajib)" maxlength="40" autocomplete="name">' +
      '<label class="chk"><input type="checkbox" id="rm" checked><span class="box"></span><span>Samarkan namaku di daftar review</span></label>' +
      '<p class="prev" id="rprev"></p>' +
      '<textarea class="fld" id="rs" rows="3" maxlength="500" placeholder="Saran atau kesanmu soal tes ini..."></textarea>' +
      '<input class="hp" id="rh" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<p class="err" id="rerr" role="alert"></p><button class="go" id="rsend" type="button">Kirim</button></div>' +
      (REVIEW_URL ? '<div class="card glass" id="rl"><h3>Kata teman-teman</h3><div id="rlist"><div class="sk" style="height:76px;margin-bottom:12px"></div><div class="sk" style="height:76px"></div></div></div>' : '') +
      '<div class="acts"><button class="go" id="cp">Salin hasil</button><button class="ghost" id="re">Ulangi tes</button></div></div></section>';

    setTimeout(function () {
      document.getElementById("later").classList.add("on");
      app.querySelectorAll(".track i").forEach(function (e) { e.style.width = e.dataset.w + "%"; });
    }, RM ? 0 : 150);

    if (REVIEW_URL) loadReviews();

    // review: nama wajib, rating atau saran minimal satu
    var rating = 0, stars = app.querySelectorAll(".star"), rn = document.getElementById("rn"),
        rs = document.getElementById("rs"), er = document.getElementById("rerr"), sb = document.getElementById("rsend");
    stars.forEach(function (st) {
      st.onclick = function () {
        rating = +st.dataset.n;
        stars.forEach(function (x, k) { x.classList.remove("on"); if (k < rating) { void x.offsetWidth; x.classList.add("on"); } });
      };
    });
    var rm = document.getElementById("rm"), rpv = document.getElementById("rprev");
    function prev() {
      var n = rn.value.trim();
      rpv.textContent = n ? "Akan tampil sebagai: " + (rm.checked ? mask(n) : n) : "Isi nama untuk melihat tampilannya.";
    }
    rn.oninput = prev; rm.onchange = prev; prev();

    function bad(m, el) {
      er.textContent = m;
      if (el) { el.focus(); el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); }
    }
    sb.onclick = function () {
      var nm = rn.value.trim(), sr = rs.value.trim();
      if (document.getElementById("rh").value) return;
      if (!nm) { bad("Isi namamu dulu ya.", rn); return; }
      if (!sr && !rating) { bad("Isi rating atau sarannya dulu ya.", rs); return; }
      if (!REVIEW_URL) { bad("Fitur kirim belum aktif."); return; }
      er.textContent = "";
      sb.disabled = true; sb.textContent = "Mengirim...";
      fetch(REVIEW_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ nama: nm, rating: rating, saran: sr, kk: KK[tk.a], peran: p.n, samar: rm.checked }) })
        .then(function () {
          var c = document.getElementById("rv");
          c.innerHTML = "<h3></h3><p>Sarannya sudah masuk. Terima kasih sudah ikut mencoba.</p>";
          c.firstChild.textContent = "Makasih, " + nm + "!";
          c.classList.add("thanks");
          var lb = document.getElementById("rlist");
          if (lb && !lb.querySelector(".sk")) {
            if (!lb.querySelector(".rv-i")) lb.innerHTML = "";
            lb.insertBefore(item({ nama: rm.checked ? mask(nm) : nm, rating: rating, saran: sr, peran: p.n, waktu: new Date().toISOString() }), lb.firstChild);
          }
        }, function () { bad("Gagal mengirim. Coba lagi ya."); sb.disabled = false; sb.textContent = "Kirim"; });
    };

    var cp = document.getElementById("cp");
    cp.onclick = function () {
      var txt = "Hasil Jadi Dev-ku: " + KK[tk.a] + ", peran " + p.n + " (" + top.pct + "%). Cek punyamu: " + location.href.split("#")[0];
      function done(m) { cp.textContent = m; setTimeout(function () { cp.textContent = "Salin hasil"; }, 1800); }
      try { navigator.clipboard.writeText(txt).then(function () { done("Tersalin"); }, function () { done("Gagal menyalin"); }); }
      catch (e) { done("Gagal menyalin"); }
    };
    document.getElementById("re").onclick = function () { swap(start); };
  }

  document.addEventListener("pointermove", function (e) {
    var g = e.target.closest && e.target.closest(".glass");
    if (!g) return;
    var b = g.getBoundingClientRect();
    g.style.setProperty("--mx", (e.clientX - b.left) + "px");
    g.style.setProperty("--my", (e.clientY - b.top) + "px");
  });

  // ripple klik
  document.addEventListener("pointerdown", function (e) {
    var t = e.target.closest && e.target.closest(".go,.ghost,.opt,.card,.axes li");
    var g = e.target.closest && e.target.closest(".glass");
    if (g && !RM) {
      var gb = g.getBoundingClientRect();
      g.style.setProperty("--mx", (e.clientX - gb.left) + "px");
      g.style.setProperty("--my", (e.clientY - gb.top) + "px");
      g.classList.add("tap");
      setTimeout(function () { g.classList.remove("tap"); }, 450);
    }
    if (!t || RM) return;
    var b = t.getBoundingClientRect(), r = document.createElement("span");
    r.className = "rp";
    r.style.left = (e.clientX - b.left) + "px";
    r.style.top = (e.clientY - b.top) + "px";
    t.appendChild(r);
    setTimeout(function () { r.remove(); }, 650);
  });

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var box = document.getElementById("opts");
    if (!box) return;
    var n = "abcd1234".indexOf(e.key.toLowerCase()) % 4;
    if (e.key.length === 1 && "abcd1234".indexOf(e.key.toLowerCase()) > -1 && box.children[n]) pick(box.children[n]);
  });

  start();
})();