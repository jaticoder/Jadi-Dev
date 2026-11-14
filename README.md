# Jadi Dev

Tes singkat ala MBTI untuk mahasiswa informatika yang belum tahu mau fokus ke bidang apa. Hasilnya berupa kode empat huruf dan satu arah IT yang paling cocok, lengkap dengan langkah pertama yang bisa dikerjakan minggu ini.

Dibuat sebagai proyek sampingan untuk portofolio, di luar game dev dan web porto utama.

## Status

Draf pertama selesai: struktur, logika skor, dan tampilan sudah jadi. Belum diuji coba ke teman kampus. Teks pertanyaan dan hasil masih bisa direvisi.

## Tujuan

- Portofolio: menunjukkan skill software engineering di luar game dev.
- Nyata: membantu teman-teman informatika yang bingung arah, bukan sekadar hiburan.
- Target pengguna: anak muda 17-25, khususnya mahasiswa informatika Universitas Tanjungpura.

## Konsep

- Format mirip tes kepribadian (bukan kuis benar-salah): 12 skenario, dua pilihan tiap soal.
- Mengukur 4 sumbu: Visual/Logika, Bangun/Urai, Cepat/Dalam, Pengguna/Mesin.
- Skor tiap sumbu dipetakan ke 7 arah: Game Developer, Web Developer, Mobile Developer, UI/UX Designer, Cybersecurity, Data Science, AI/ML.
- Hasil akhir: kode 4 huruf, persona, persentase kecocokan, alasan dari jawaban sendiri, gambaran sehari-hari, tantangan yang jujur, 3 langkah pertama (hari 1-2, hari 3-5, akhir pekan), dan 2 arah alternatif terdekat.

## Struktur file

```
index.html   struktur halaman, navbar, meta tag
style.css    tema visual: gelap, grid, kartu kaca, aksen cyan/biru
script.js    data soal (Q), data arah (PA), logika skor, render tiap layar
```

Tanpa framework, tanpa build step. Tinggal buka index.html lewat Live Server atau host statis.

## Desain

Mengikuti tema web porto (jaticoder.github.io/Portofolio): latar navy dengan grid, navbar pill, kartu kaca dengan sorotan kursor, aksen cyan-biru, font Plus Jakarta Sans + aksen Kaushan Script.

## Microinteraction yang sudah ada

- Sorotan cahaya mengikuti kursor di kartu kaca
- Opsi jawaban terangkat saat hover, menekan saat diklik
- Progress bar mengisi halus
- Kode hasil muncul dengan efek acak huruf sebelum mengunci
- Tombol "Salin hasil" berubah jadi "Tersalin"
- Navigasi keyboard (A/B atau 1/2) untuk menjawab
- Menghormati prefers-reduced-motion

## Yang masih perlu dikerjakan

- Uji coba ke teman kampus, cek apakah hasil terasa meyakinkan
- Cek tampilan di HP asli, bukan cuma browser desktop
- Pertimbangkan nama repo final dan domain/path hosting
- Tautkan dari web porto setelah siap rilis
