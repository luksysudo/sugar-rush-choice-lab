/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 10 Soal Kuis Evaluasi Kaidah Pencacahan (SMA Kelas 12)
 * Kunci jawaban semua < 100, tervalidasi, tanpa hint saat mengerjakan.
 */

import { QuizQuestionItem } from '../types';

export const QUIZ_QUESTIONS: QuizQuestionItem[] = [
  {
    id: 1,
    topic: 'Aturan Penjumlahan (Saling Lepas)',
    ruleType: 'penjumlahan',
    question:
      'Di garasi terdapat 4 mobil merah, 3 mobil hijau, dan 5 mobil biru. Jika Vanellope memilih 1 mobil untuk bertanding, banyak pilihan mobil adalah...',
    options: [
      { key: 'A', text: '12' },
      { key: 'B', text: '60' },
      { key: 'C', text: '15' },
      { key: 'D', text: '20' },
    ],
    correctAnswer: 'A',
    conceptFeedbackCorrect:
      'Benar! Situasi ini hanya meminta memilih satu alternatif mobil saja (merah, hijau, atau biru), sehingga digunakan Aturan Penjumlahan.',
    conceptFeedbackIncorrect:
      'Kurang tepat. Situasi ini hanya meminta memilih satu alternatif mobil saja dari kelompok yang saling lepas, sehingga digunakan Aturan Penjumlahan.',
    explanation:
      'Karena Vanellope hanya memilih 1 mobil saja dari kelompok warna mobil yang saling lepas (memilih mobil merah ATAU hijau ATAU biru), berlaku Aturan Penjumlahan: n = 4 + 3 + 5 = 12 pilihan.',
  },
  {
    id: 2,
    topic: 'Aturan Perkalian (Jalur Kota Berurutan)',
    ruleType: 'perkalian',
    question:
      'Dari Kota A ke Kota B ada 4 jalan, dan dari Kota B ke Kota C ada 3 jalan. Banyak cara bepergian dari Kota A ke Kota C melalui Kota B adalah...',
    options: [
      { key: 'A', text: '7' },
      { key: 'B', text: '12' },
      { key: 'C', text: '14' },
      { key: 'D', text: '24' },
    ],
    correctAnswer: 'B',
    conceptFeedbackCorrect:
      'Benar! Karena perjalanan dilakukan secara bertahap dan harus melewati keduanya sekaligus (dari A ke B lalu B ke C), maka digunakan Aturan Perkalian.',
    conceptFeedbackIncorrect:
      'Kurang tepat. Situasi ini menuntut dua tahap perjalanan berurutan (dari A ke B dan dari B ke C), sehingga digunakan Aturan Perkalian.',
    explanation:
      'Perjalanan dari Kota A ke Kota C melalui Kota B merupakan 2 tahapan kejadian berurutan (dari A ke B DAN dari B ke C). Berdasarkan Aturan Perkalian: n = 4 × 3 = 12 cara.',
  },
  {
    id: 3,
    topic: 'Aturan Perkalian (Setelan Pakaian Lengkap)',
    ruleType: 'perkalian',
    question:
      'Seorang pembalap memiliki 5 kaus balap berbeda, 3 celana balap, dan 2 pasang sepatu. Banyak setelan pakaian lengkap yang dapat dipakai adalah...',
    options: [
      { key: 'A', text: '10' },
      { key: 'B', text: '15' },
      { key: 'C', text: '30' },
      { key: 'D', text: '45' },
    ],
    correctAnswer: 'C',
    conceptFeedbackCorrect:
      'Benar! Karena pemilihan kaus, celana, dan sepatu dilakukan secara bertahap dan harus dipilih ketiganya sekaligus, maka digunakan Aturan Perkalian.',
    conceptFeedbackIncorrect:
      'Kurang tepat. Situasi ini menyusun setelan lengkap secara bertahap (kaus, celana, dan sepatu sekaligus), sehingga digunakan Aturan Perkalian.',
    explanation:
      'Setelan pakaian lengkap terdiri dari 1 kaus balap DAN 1 celana balap DAN 1 pasang sepatu yang dipadukan secara simultan. Berdasarkan Aturan Perkalian: n = 5 × 3 × 2 = 30 setelan.',
  },
  {
    id: 4,
    topic: 'Perjalanan Pergi-Pulang (Jalur Bebas)',
    ruleType: 'perkalian',
    question:
      'Dari Kota P ke Kota Q terdapat 3 jalan. Banyak cara perjalanan pergi-pulang dari P ke Q lalu kembali ke P adalah...',
    options: [
      { key: 'A', text: '6' },
      { key: 'B', text: '8' },
      { key: 'C', text: '9' },
      { key: 'D', text: '12' },
    ],
    correctAnswer: 'C',
    conceptFeedbackCorrect:
      'Benar! Karena perjalanan berangkat dan perjalanan pulang dilakukan secara bertahap dan harus dijalani keduanya, maka digunakan Aturan Perkalian.',
    conceptFeedbackIncorrect:
      'Kurang tepat. Perjalanan pergi-pulang terdiri atas dua tahap berurutan (pergi dan pulang), sehingga digunakan Aturan Perkalian.',
    explanation:
      'Perjalanan berangkat (P ke Q) ada 3 pilihan jalan DAN perjalanan pulang (Q ke P) ada 3 pilihan jalan (karena tidak ada syarat larangan melewati jalan yang sama). Berdasarkan Aturan Perkalian: n = 3 × 3 = 9 cara.',
  },
  {
    id: 5,
    topic: 'Perjalanan Pergi-Pulang (Jalan Tidak Boleh Sama)',
    ruleType: 'perkalian',
    question:
      'Dari Kota P ke Kota Q ada 4 jalan. Banyak cara perjalanan dari P ke Q lalu kembali ke P jika tidak boleh melewati jalan yang sama saat pulang adalah...',
    options: [
      { key: 'A', text: '7' },
      { key: 'B', text: '12' },
      { key: 'C', text: '16' },
      { key: 'D', text: '20' },
    ],
    correctAnswer: 'B',
    conceptFeedbackCorrect:
      'Benar! Karena jalur berangkat dan jalur pulang dipilih secara bertahap (dengan pilihan pulang berkurang 1), maka digunakan Aturan Perkalian.',
    conceptFeedbackIncorrect:
      'Kurang tepat. Situasi ini menyusun dua tahap perjalanan berurutan dengan pembatasan jalan saat pulang, sehingga digunakan Aturan Perkalian.',
    explanation:
      'Perjalanan berangkat (P ke Q) = 4 pilihan jalan. Saat pulang (Q ke P), karena jalan yang sudah dilalui tidak boleh dilewati lagi, tersisa 4 - 1 = 3 pilihan. Berdasarkan Aturan Perkalian: n = 4 × 3 = 12 cara.',
  },
  {
    id: 6,
    topic: 'Penyusunan Bilangan Ratusan (Boleh Berulang)',
    ruleType: 'perkalian',
    question:
      'Dari angka 1, 2, 3, 4 akan disusun bilangan ratusan (3 angka). Banyak bilangan yang dapat dibentuk jika angka boleh berulang adalah...',
    options: [
      { key: 'A', text: '24' },
      { key: 'B', text: '36' },
      { key: 'C', text: '48' },
      { key: 'D', text: '64' },
    ],
    correctAnswer: 'D',
    conceptFeedbackCorrect:
      'Benar! Karena ketiga posisi digit (ratusan, puluhan, satuan) diisi secara bertahap sekaligus dan angka boleh berulang, maka digunakan Aturan Perkalian.',
    conceptFeedbackIncorrect:
      'Kurang tepat. Menyusun bilangan 3 angka berarti mengisi posisi ratusan, puluhan, dan satuan secara bertahap, sehingga digunakan Aturan Perkalian.',
    explanation:
      'Bilangan ratusan memiliki 3 digit (Ratusan, Puluhan, Satuan). Karena angka boleh berulang:\n- Digit ratusan: 4 pilihan (1, 2, 3, 4)\n- Digit puluhan: 4 pilihan\n- Digit satuan: 4 pilihan\nBanyak bilangan = 4 × 4 × 4 = 64 bilangan.',
  },
  {
    id: 7,
    topic: 'Penyusunan Bilangan 3 Angka Berbeda (Tanpa Berulang)',
    ruleType: 'perkalian',
    question:
      'Dari angka 2, 3, 5, 7, 9 akan disusun bilangan terdiri dari 3 angka berbeda. Banyak bilangan yang terbentuk adalah...',
    options: [
      { key: 'A', text: '15' },
      { key: 'B', text: '60' },
      { key: 'C', text: '75' },
      { key: 'D', text: '125' },
    ],
    correctAnswer: 'B',
    conceptFeedbackCorrect:
      'Benar! Karena ketiga digit dipilih secara bertahap tanpa pengulangan (banyak pilihan berkurang tiap tahap), maka digunakan Aturan Perkalian.',
    conceptFeedbackIncorrect:
      'Kurang tepat. Penyusunan bilangan 3 angka berbeda mengisi posisi ratusan, puluhan, dan satuan secara bertahap tanpa pengulangan, sehingga digunakan Aturan Perkalian.',
    explanation:
      'Tersedia 5 angka {2, 3, 5, 7, 9} untuk disusun menjadi 3 digit tanpa pengulangan:\n- Digit ratusan: 5 pilihan\n- Digit puluhan: 4 pilihan tersisa\n- Digit satuan: 3 pilihan tersisa\nBanyak bilangan = 5 × 4 × 3 = 60 bilangan.',
  },
  {
    id: 8,
    topic: 'Penyusunan Bilangan Genap 3 Angka Berbeda',
    ruleType: 'perkalian',
    question:
      'Dari angka 1, 2, 3, 4, 5 akan dibentuk bilangan genap terdiri dari 3 angka berbeda. Banyak bilangan yang dapat dibentuk adalah...',
    options: [
      { key: 'A', text: '12' },
      { key: 'B', text: '24' },
      { key: 'C', text: '30' },
      { key: 'D', text: '48' },
    ],
    correctAnswer: 'B',
    conceptFeedbackCorrect:
      'Benar! Karena posisi satuan (syarat genap), ratusan, dan puluhan diisi secara bertahap tanpa pengulangan, maka digunakan Aturan Perkalian.',
    conceptFeedbackIncorrect:
      'Kurang tepat. Pembentukan bilangan genap mengisi posisi satuan bersyarat diikuti ratusan dan puluhan secara bertahap, sehingga digunakan Aturan Perkalian.',
    explanation:
      'Syarat bilangan genap ditentukan oleh angka satuan:\n- Angka satuan genap dari {1, 2, 3, 4, 5} adalah 2 atau 4 (2 pilihan).\n- Angka ratusan: dari 5 angka, 1 telah dipakai untuk satuan, tersisa 4 pilihan.\n- Angka puluhan: tersisa 3 pilihan.\nBanyak bilangan genap = 4 × 3 × 2 = 24 bilangan.',
  },
  {
    id: 9,
    topic: 'Penyusunan Bilangan > 300 (Angka Berbeda)',
    ruleType: 'perkalian',
    question:
      'Dari angka 1, 2, 3, 4, 5 disusun bilangan terdiri dari 3 angka berbeda yang nilainya lebih dari 300. Banyak bilangan yang terbentuk adalah...',
    options: [
      { key: 'A', text: '24' },
      { key: 'B', text: '30' },
      { key: 'C', text: '36' },
      { key: 'D', text: '48' },
    ],
    correctAnswer: 'C',
    conceptFeedbackCorrect:
      'Benar! Karena posisi ratusan (≥ 3), puluhan, dan satuan disusun secara bertahap tanpa pengulangan, maka digunakan Aturan Perkalian.',
    conceptFeedbackIncorrect:
      'Kurang tepat. Penyusunan bilangan > 300 mengisi tiga posisi digit secara bertahap dimulai dari syarat ratusan, sehingga digunakan Aturan Perkalian.',
    explanation:
      'Syarat bilangan ratusan > 300 tanpa angka kembar:\n- Angka ratusan harus ≥ 3, yaitu {3, 4, 5} (3 pilihan).\n- Angka puluhan: dari 5 angka yang ada, 1 sudah dipakai untuk ratusan, tersisa 4 pilihan.\n- Angka satuan: tersisa 3 pilihan.\nBanyak bilangan = 3 × 4 × 3 = 36 bilangan.',
  },
  {
    id: 10,
    topic: 'Pemilihan Pengurus (Ketua & Wakil Ketua Tim)',
    ruleType: 'perkalian',
    question:
      'Dari 6 calon pembalap terbaik akan dipilih 1 Ketua Tim dan 1 Wakil Ketua Tim. Banyak susunan pengurus yang mungkin terbentuk adalah...',
    options: [
      { key: 'A', text: '11' },
      { key: 'B', text: '15' },
      { key: 'C', text: '30' },
      { key: 'D', text: '36' },
    ],
    correctAnswer: 'C',
    conceptFeedbackCorrect:
      'Benar! Karena pemilihan Ketua dan Wakil Ketua dilakukan secara bertahap untuk mengisi kedua jabatan sekaligus, maka digunakan Aturan Perkalian.',
    conceptFeedbackIncorrect:
      'Kurang tepat. Situasi ini memilih Ketua dan Wakil Ketua sekaligus secara bertahap (6 lalu 5 calon), sehingga digunakan Aturan Perkalian.',
    explanation:
      'Pemilihan posisi pengurus memperhatikan urutan/jabatan (Ketua Tim ≠ Wakil Ketua Tim):\n- Calon Ketua Tim: 6 pilihan calon\n- Calon Wakil Ketua Tim: 5 pilihan calon tersisa\nBanyak susunan pengurus = 6 × 5 = 30 susunan.',
  },
];
