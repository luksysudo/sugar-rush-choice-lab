import test from 'node:test';
import assert from 'node:assert/strict';
import {
  verifyMission1Challenge1,
  verifyMission1Challenge2,
  verifyMission2Challenge1,
  verifyMission2Challenge2,
  verifyMission3Answer,
  verifyFoodGoTantangan1Subtotals,
  verifyFoodGoTantangan1Total,
  verifyFoodGoTantangan2Subtotals,
  verifyFoodGoTantangan2Total,
  scoreQuiz,
} from './mathRules';
import { QUIZ_QUESTIONS } from '../data/quizData';

test('Misi 1: Tantangan 1 (Penjumlahan) & Tantangan 2 (Perkalian)', () => {
  // 4 kue tar + 3 es krim + 2 puding = 9
  assert.equal(verifyMission1Challenge1(9), true);
  assert.equal(verifyMission1Challenge1('9'), true);
  assert.equal(verifyMission1Challenge1(12), false);

  // 4 kue tar x 3 minuman = 12
  assert.equal(verifyMission1Challenge2(12), true);
  assert.equal(verifyMission1Challenge2('12'), true);
  assert.equal(verifyMission1Challenge2(7), false);
});

test('Misi 2: Tantangan 1 (Klasifikasi) & Tantangan 2 (Manekin 24)', () => {
  assert.equal(verifyMission2Challenge1('penjumlahan', 'perkalian'), true);
  assert.equal(verifyMission2Challenge1('perkalian', 'penjumlahan'), false);

  assert.equal(verifyMission2Challenge2(24), true);
  assert.equal(verifyMission2Challenge2('24'), true);
  assert.equal(verifyMission2Challenge2(9), false);
});

test('Misi 3: Total rute tanpa bocoran = 6', () => {
  assert.equal(verifyMission3Answer(6), true);
  assert.equal(verifyMission3Answer('6'), true);
  assert.equal(verifyMission3Answer(5), false);
});

test('Misi 4: Tantangan 1 (Stok Awal = 15) & Tantangan 2 (Perubahan Stok = 13)', () => {
  const t1 = verifyFoodGoTantangan1Subtotals({ sehat: 6, hemat: 5, spesial: 4 });
  assert.equal(t1.allSubtotalsOk, true);
  assert.equal(verifyFoodGoTantangan1Total(15), true);
  assert.equal(verifyFoodGoTantangan1Total('15'), true);

  const t2 = verifyFoodGoTantangan2Subtotals({ sehat: 4, hemat: 6, spesial: 3 });
  assert.equal(t2.allSubtotalsOk, true);
  assert.equal(verifyFoodGoTantangan2Total(13), true);
  assert.equal(verifyFoodGoTantangan2Total('13'), true);
});

test('10 Soal Kuis Evaluasi: Semua jawaban < 100 dan penilaian 100%', () => {
  assert.equal(QUIZ_QUESTIONS.length, 10);

  const expectedAnswers: Record<number, number> = {
    1: 12,
    2: 12,
    3: 30,
    4: 9,
    5: 12,
    6: 64,
    7: 60,
    8: 24,
    9: 36,
    10: 30,
  };

  const fullKeys: Record<number, string> = {};

  QUIZ_QUESTIONS.forEach((q) => {
    // Assert answer is < 100
    const expectedNum = expectedAnswers[q.id];
    assert.ok(expectedNum < 100, `Jawaban soal ${q.id} (${expectedNum}) harus < 100`);

    // Verify option text matches expected answer
    const correctOption = q.options.find((opt) => opt.key === q.correctAnswer);
    assert.ok(correctOption, `Opsi jawaban benar untuk soal ${q.id} harus ada`);
    assert.equal(
      parseInt(correctOption.text, 10),
      expectedNum,
      `Kunci jawaban soal ${q.id} harus ${expectedNum}`
    );

    fullKeys[q.id] = q.correctAnswer;
  });

  // Score full keys
  const perfectResult = scoreQuiz(fullKeys, QUIZ_QUESTIONS);
  assert.equal(perfectResult.score, 100);
  assert.equal(perfectResult.correctCount, 10);

  // Score partial keys
  const partialResult = scoreQuiz({ 1: 'A', 2: 'B' }, QUIZ_QUESTIONS);
  assert.equal(partialResult.score, 20);
  assert.equal(partialResult.correctCount, 2);
});
