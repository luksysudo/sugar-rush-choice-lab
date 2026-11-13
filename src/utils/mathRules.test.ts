import test from 'node:test';
import assert from 'node:assert/strict';
import {
  verifyMission1Challenge1,
  verifyMission1Challenge2,
  verifyMission2Challenge1,
  verifyMission2Challenge2,
  verifyMission3Answer,
  verifyMission3TreeMapping,
  verifyMission3Challenge2Total,
  verifyFoodGoTantangan1Subtotals,
  verifyFoodGoTantangan1Total,
  verifyFoodGoTantangan2Subtotals,
  verifyFoodGoTantangan2Total,
  scoreQuiz,
  shuffleQuizQuestions,
  getMathMotivationQuote,
  formatJamMengerjakan,
  formatDurationShort,
  formatSkorMisi,
} from './mathRules';
import { QUIZ_QUESTIONS } from '../data/quizData';

test('Misi 1: Tantangan 1 (Penjumlahan) & Tantangan 2 (Perkalian)', () => {
  assert.equal(verifyMission1Challenge1(9), true);
  assert.equal(verifyMission1Challenge1('9'), true);
  assert.equal(verifyMission1Challenge1(12), false);

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

test('Misi 3: Tantangan 1 (6) & Tantangan 2 Diagram Pohon 3 Tingkat Rakitan Mobil (Total = 8)', () => {
  assert.equal(verifyMission3Answer(6), true);
  assert.equal(verifyMission3Answer('6'), true);
  assert.equal(verifyMission3Answer(5), false);

  // Valid 3-level mapping: T/R -> K/S -> Y/L (2 x 2 x 2 = 8)
  const validMap = verifyMission3TreeMapping({
    turbo: {
      tires: ['K', 'S'],
      spoilers: [
        ['Y', 'L'],
        ['L', 'Y'],
      ],
    },
    rocket: {
      tires: ['S', 'K'],
      spoilers: [
        ['Y', 'L'],
        ['Y', 'L'],
      ],
    },
  });
  assert.equal(validMap.turboTiresComplete, true);
  assert.equal(validMap.rocketTiresComplete, true);
  assert.equal(validMap.hasDuplicate, false);
  assert.equal(validMap.isValid, true);
  assert.equal(validMap.combinations.length, 8);
  assert.equal(validMap.combinations[0], '(T,K,Y)');

  // Incomplete mapping
  const incompleteMap = verifyMission3TreeMapping({
    turbo: {
      tires: ['K', ''],
      spoilers: [
        ['Y', 'L'],
        ['Y', 'L'],
      ],
    },
    rocket: {
      tires: ['K', 'S'],
      spoilers: [
        ['Y', 'L'],
        ['Y', ''],
      ],
    },
  });
  assert.equal(incompleteMap.turboTiresComplete, false);
  assert.equal(incompleteMap.rocketTiresComplete, true);
  assert.equal(incompleteMap.isValid, false);

  // Duplicate tire or spoiler in same pair should be invalid
  const dupMap = verifyMission3TreeMapping({
    turbo: {
      tires: ['K', 'K'],
      spoilers: [
        ['Y', 'L'],
        ['Y', 'L'],
      ],
    },
    rocket: {
      tires: ['K', 'S'],
      spoilers: [
        ['Y', 'Y'],
        ['Y', 'L'],
      ],
    },
  });
  assert.equal(dupMap.hasDuplicate, true);
  assert.equal(dupMap.isValid, false);

  assert.equal(verifyMission3Challenge2Total(8), true);
  assert.equal(verifyMission3Challenge2Total('8'), true);
  assert.equal(verifyMission3Challenge2Total(6), false);
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
    const expectedNum = expectedAnswers[q.id];
    assert.ok(expectedNum < 100, `Jawaban soal ${q.id} (${expectedNum}) harus < 100`);

    const correctOption = q.options.find((opt) => opt.key === q.correctAnswer);
    assert.ok(correctOption, `Opsi jawaban benar untuk soal ${q.id} harus ada`);
    assert.equal(
      parseInt(correctOption.text, 10),
      expectedNum,
      `Kunci jawaban soal ${q.id} harus ${expectedNum}`
    );

    fullKeys[q.id] = q.correctAnswer;
  });

  const perfectResult = scoreQuiz(fullKeys, QUIZ_QUESTIONS);
  assert.equal(perfectResult.score, 100);
  assert.equal(perfectResult.correctCount, 10);

  const partialResult = scoreQuiz({ 1: 'A', 2: 'B' }, QUIZ_QUESTIONS);
  assert.equal(partialResult.score, 20);
  assert.equal(partialResult.correctCount, 2);

  // Shuffling preserves all 10 IDs without mutating original array
  let seed = 0.37;
  const deterministicRng = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const shuffled = shuffleQuizQuestions(QUIZ_QUESTIONS, deterministicRng);
  assert.equal(shuffled.length, 10);
  assert.deepEqual(
    shuffled.map((q) => q.id).sort((a, b) => a - b),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  );
  assert.notDeepEqual(
    shuffled.map((q) => q.id),
    QUIZ_QUESTIONS.map((q) => q.id)
  );

  // Every quiz item must have valid ruleType, conceptual feedback, and no mission-name spoiler in question text
  QUIZ_QUESTIONS.forEach((q) => {
    assert.ok(q.ruleType === 'penjumlahan' || q.ruleType === 'perkalian');
    assert.ok(q.conceptFeedbackCorrect.startsWith('Benar!'), `Soal ${q.id} feedback benar harus diawali 'Benar!'`);
    assert.ok(q.conceptFeedbackIncorrect.startsWith('Kurang tepat.'), `Soal ${q.id} feedback salah harus diawali 'Kurang tepat.'`);
    assert.equal(/misi\s*\d+|pos\s*\d+/i.test(q.question), false, `Soal ${q.id} tidak boleh menyebut nama misi/pos`);
  });
});

test('Quote Motivasi & Format Payload Google Sheets', () => {
  const qHigh = getMathMotivationQuote(100);
  assert.ok(qHigh.text.length > 20);
  assert.ok(qHigh.theme.length > 0);

  const qSeed = getMathMotivationQuote(80, 2);
  assert.ok(qSeed.text.includes('Aturan perkalian'));

  const sampleDate = new Date(2026, 4, 15, 9, 5, 3); // 15/05/2026 09:05:03
  assert.equal(formatJamMengerjakan(sampleDate), '15/05/2026 09:05:03');
  assert.equal(formatDurationShort(755), '12m 35d');
  assert.equal(formatDurationShort(65), '1m 05d');
  assert.equal(
    formatSkorMisi([1, 3]),
    'Misi 1: 50, Misi 2: 0, Misi 3: 50, Misi 4: 0 (Total: 100/200)'
  );
  assert.equal(
    formatSkorMisi([1, 2, 3, 4]),
    'Misi 1: 50, Misi 2: 50, Misi 3: 50, Misi 4: 50 (Total: 200/200)'
  );
});
