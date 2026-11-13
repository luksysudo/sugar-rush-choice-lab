/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Kuis Evaluasi (10 Soal Tanpa Hint, Jawaban < 100)
 * Top 5 Peringkat Kelas Tanpa Dummy Data + Pengiriman Data Lengkap ke Google Sheets
 * + Quote Motivasi Matematika & Kaidah Pencacahan Setelah Kuis
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  RefreshCw,
  ChevronRight,
  KeyRound,
  ShieldAlert,
  Quote,
  Loader2,
  Send,
} from 'lucide-react';
import { StudentProfile, LeaderboardEntry } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizData';
import {
  GOOGLE_SHEET_WEBAPP_URL,
  ScorePayload,
  fetchTop5Leaderboard,
  submitScoreToDatabase,
  postScorePayloadToGoogleSheets,
  resetLeaderboardDatabase,
} from '../data/leaderboardData';
import { VanellopeGuide } from './VanellopeGuide';
import {
  scoreQuiz,
  getMathMotivationQuote,
  formatJamMengerjakan,
  formatDurationShort,
  formatSkorMisi,
  MotivationQuote,
} from '../utils/mathRules';
import { playCorrectSound } from '../utils/soundEffects';

interface QuizAndLeaderboardProps {
  profile: StudentProfile;
  completedMissions?: number[];
  adventureStartTime?: number | null;
  onBackToMap: () => void;
}

export const QuizAndLeaderboard: React.FC<QuizAndLeaderboardProps> = ({
  profile,
  completedMissions = [],
  adventureStartTime = null,
  onBackToMap,
}) => {
  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [selectedOptionForCurrent, setSelectedOptionForCurrent] = useState<string | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [motivationQuote, setMotivationQuote] = useState<MotivationQuote | null>(null);

  // Time & Duration State
  const [quizStartTime] = useState<number>(Date.now());
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [jamMengerjakanStr, setJamMengerjakanStr] = useState('');
  const [durasiPengerjaanStr, setDurasiPengerjaanStr] = useState('');

  // Leaderboard & Database State
  const [leaderboardList, setLeaderboardList] = useState<LeaderboardEntry[]>([]);
  const [isFetchingLeaderboard, setIsFetchingLeaderboard] = useState(false);
  const [dbStatusMessage, setDbStatusMessage] = useState('');
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string>('');
  const [deliveryLog, setDeliveryLog] = useState<string>('');
  const [lastPayload, setLastPayload] = useState<ScorePayload | null>(null);

  // Reset Guru Modal State
  const [showResetModal, setShowResetModal] = useState(false);
  const [teacherPinInput, setTeacherPinInput] = useState('');
  const [resetError, setResetError] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  useEffect(() => {
    loadLeaderboard();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerActive && !isQuizFinished) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, isQuizFinished]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const formatTimerDisplay = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${pad(mins)}:${pad(secs)}`;
  };

  const loadLeaderboard = async () => {
    setIsFetchingLeaderboard(true);
    try {
      const res = await fetchTop5Leaderboard(GOOGLE_SHEET_WEBAPP_URL);
      setLeaderboardList(res.data);
      if (res.data.length === 0) {
        setDbStatusMessage('Belum ada data peringkat untuk sesi ini.');
      } else {
        setDbStatusMessage(
          res.isOnline ? 'Online (Google Sheets Real-time)' : 'Mode Lokal (Tersimpan)'
        );
      }
    } catch {
      setDbStatusMessage('Belum ada data peringkat untuk sesi ini.');
    } finally {
      setIsFetchingLeaderboard(false);
    }
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (key: string) => {
    if (isAnswerLocked) return;
    setSelectedOptionForCurrent(key);
    setIsAnswerLocked(true);
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: key,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      const nextQId = QUIZ_QUESTIONS[currentQuestionIndex + 1].id;
      setSelectedOptionForCurrent(userAnswers[nextQId] || null);
      setIsAnswerLocked(!!userAnswers[nextQId]);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setIsQuizFinished(true);
    setTimerActive(false);

    const now = new Date();
    const jamMengerjakan = formatJamMengerjakan(now);
    setJamMengerjakanStr(jamMengerjakan);

    const effectiveStart = adventureStartTime || quizStartTime;
    const elapsedSeconds = Math.max(1, Math.round((now.getTime() - effectiveStart) / 1000));
    const durasi = formatDurationShort(elapsedSeconds);
    setDurasiPengerjaanStr(durasi);

    const { score } = scoreQuiz(userAnswers, QUIZ_QUESTIONS);
    const skorMisi = formatSkorMisi(completedMissions);

    // Choose motivational quote (seeded randomly or score-based)
    const quoteSeed = Math.floor(Math.random() * 100) + score;
    setMotivationQuote(getMathMotivationQuote(score, quoteSeed));

    playCorrectSound();

    if (score >= 80) {
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#F59E0B', '#10B981', '#EC4899', '#3B82F6'],
        });
      } catch {
        // ignore
      }
    }

    const payload: ScorePayload = {
      nama: profile.name || 'Pembalap Muda',
      kelas: profile.studentClass || 'Umum',
      jamMengerjakan,
      durasi,
      skorMisi,
      skorKuis: score,
    };
    setLastPayload(payload);

    if (!hasSubmittedScore) {
      setHasSubmittedScore(true);
      setIsSubmittingScore(true);
      setSubmissionStatus('Mengirim ke Google Sheets...');
      setDeliveryLog(`Log Pengiriman: Mengirim data nilai ke Google Sheets (${jamMengerjakan})...`);

      try {
        const [res] = await Promise.all([
          submitScoreToDatabase(payload, elapsedSeconds, GOOGLE_SHEET_WEBAPP_URL),
          new Promise((resolve) => setTimeout(resolve, 600)),
        ]);
        setLeaderboardList(res.updatedLeaderboard);
        if (res.isOnline) {
          setSubmissionStatus('Terkirim ke Google Sheets');
          setDeliveryLog(
            `Log Pengiriman: Terkirim ke Google Sheets (${formatJamMengerjakan(new Date())})`
          );
        } else {
          setSubmissionStatus('Tersimpan lokal (klik Kirim Ulang untuk sinkron)');
          setDeliveryLog(
            'Log Pengiriman: Gagal mengirim otomatis. Klik "Kirim Ulang Nilai ke Guru" untuk mencoba lagi.'
          );
        }
      } catch {
        setSubmissionStatus('Tersimpan lokal (klik Kirim Ulang untuk sinkron)');
        setDeliveryLog(
          'Log Pengiriman: Gagal mengirim otomatis. Klik "Kirim Ulang Nilai ke Guru" untuk mencoba lagi.'
        );
      } finally {
        setIsSubmittingScore(false);
      }
    }
  };

  const handleManualResend = async () => {
    if (!lastPayload || isSubmittingScore) return;
    setIsSubmittingScore(true);
    setSubmissionStatus('Mengirim ulang ke Google Sheets...');
    setDeliveryLog(
      `Log Pengiriman: Mengirim ulang nilai ke Google Sheets (${formatJamMengerjakan(new Date())})...`
    );

    try {
      const ok = await postScorePayloadToGoogleSheets(lastPayload, GOOGLE_SHEET_WEBAPP_URL);
      if (ok) {
        setSubmissionStatus('Terkirim ke Google Sheets');
        setDeliveryLog(
          `Log Pengiriman: Terkirim ke Google Sheets (${formatJamMengerjakan(new Date())})`
        );
      } else {
        setSubmissionStatus('Gagal kirim ulang ke Google Sheets');
        setDeliveryLog(
          'Log Pengiriman: Gagal mengirim ulang. Periksa koneksi internet lalu coba kembali.'
        );
      }
    } catch {
      setSubmissionStatus('Gagal kirim ulang ke Google Sheets');
      setDeliveryLog(
        'Log Pengiriman: Gagal mengirim ulang. Periksa koneksi internet lalu coba kembali.'
      );
    } finally {
      setIsSubmittingScore(false);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSelectedOptionForCurrent(null);
    setIsAnswerLocked(false);
    setIsQuizFinished(false);
    setMotivationQuote(null);
    setTimerSeconds(0);
    setTimerActive(true);
    setHasSubmittedScore(false);
    setIsSubmittingScore(false);
    setSubmissionStatus('');
    setDeliveryLog('');
    setLastPayload(null);
  };

  const handleExecuteReset = async () => {
    if (teacherPinInput.trim() !== '1234') {
      setResetError('PIN salah! Akses ditolak, hanya guru yang dapat mereset papan peringkat.');
      return;
    }

    setResetError('');
    setIsResetting(true);

    try {
      await resetLeaderboardDatabase(GOOGLE_SHEET_WEBAPP_URL);
      setLeaderboardList([]);
      setDbStatusMessage('Belum ada data peringkat untuk sesi ini.');
      setResetSuccessMessage('Peringkat Top 5 berhasil direset untuk kelas berikutnya!');
      setTimeout(() => {
        setShowResetModal(false);
        setTeacherPinInput('');
        setResetSuccessMessage('');
      }, 1500);
    } catch {
      setResetError('Gagal melakukan reset ke server, namun data lokal telah dibersihkan.');
    } finally {
      setIsResetting(false);
    }
  };

  const finalScoreData = scoreQuiz(userAnswers, QUIZ_QUESTIONS);
  const skorMisiDisplay = formatSkorMisi(completedMissions);

  return (
    <div className="min-h-screen bg-[#FFFDF9] bg-candy-pattern p-3 sm:p-6 pt-16 sm:pt-16 pb-12 flex flex-col">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToMap}
              className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Peta Sirkuit</span>
            </button>
            <div className="text-xs font-semibold text-slate-500">
              Pembalap: <strong className="text-emerald-700">{profile.name || 'Pembalap Muda'}</strong> (
              {profile.studentClass || 'Umum'})
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-mono font-bold">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Waktu Sesi: {formatTimerDisplay(timerSeconds)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Quiz on Left, Top 5 Leaderboard on Right */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Kuis Evaluasi */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md space-y-6">
          {!isQuizFinished ? (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-candy">
                    KUIS EVALUASI AKHIR
                  </h2>
                  <div className="text-xs font-bold text-pink-600 uppercase tracking-wider">
                    KAIDAH PENCACAHAN (10 SOAL)
                  </div>
                </div>
                <div className="px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-mono text-xs sm:text-sm font-extrabold">
                  {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                </div>
              </div>

              <VanellopeGuide
                mood="happy"
                size="sm"
                dialogue={
                  <span>
                    "Uji pemahamanmu secara mandiri tanpa hint! Pilihlah satu opsi jawaban yang paling tepat. Pilihanmu langsung <strong>terkunci</strong> saat diklik!"
                  </span>
                }
              />

              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200">
                <span className="inline-block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Soal #{currentQuestionIndex + 1} • {currentQ.topic}
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                  {currentQ.question}
                </p>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOptionForCurrent === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      disabled={isAnswerLocked}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/70 text-slate-900 shadow-sm ring-2 ring-emerald-300/40'
                          : isAnswerLocked
                          ? 'border-slate-200 bg-slate-50/60 text-slate-500 cursor-not-allowed'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold">{opt.text}</span>
                      </div>

                      {isSelected && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          Terkunci ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 italic">
                  {isAnswerLocked
                    ? currentQuestionIndex === QUIZ_QUESTIONS.length - 1
                      ? 'Jawaban soal terakhir terkunci. Tekan Selesai / Kirim Nilai.'
                      : 'Jawaban terkunci. Klik SELANJUTNYA untuk lanjut.'
                    : 'Pilih salah satu jawaban di atas untuk mengunci opsi'}
                </span>

                <button
                  type="button"
                  disabled={!isAnswerLocked}
                  onClick={handleNextQuestion}
                  className={`w-full sm:w-auto px-7 py-3 rounded-2xl font-candy font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                    isAnswerLocked
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/20'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>
                    {currentQuestionIndex === QUIZ_QUESTIONS.length - 1
                      ? 'Selesai / Kirim Nilai'
                      : 'SELANJUTNYA'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            /* QUIZ COMPLETED: SCORE, MOTIVATIONAL QUOTE CARD & PEMBAHASAN LENGKAP */
            <div className="space-y-6">
              {/* Score Showcase Banner */}
              <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white rounded-3xl p-6 sm:p-7 shadow-lg text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Kuis Evaluasi Tuntas
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold font-candy">
                  SKOR KAMU: {finalScoreData.score} / 100
                </h3>
                <div className="text-xs sm:text-sm text-emerald-50 space-y-1">
                  <p>
                    Benar: <strong>{finalScoreData.correctCount}</strong> dari {QUIZ_QUESTIONS.length} Soal
                  </p>
                  <p>
                    Jam Mengerjakan: <strong>{jamMengerjakanStr}</strong> • Durasi: <strong>{durasiPengerjaanStr}</strong>
                  </p>
                  <p className="text-[11px] text-emerald-100">
                    Rekap Misi: <strong>{skorMisiDisplay}</strong>
                  </p>
                </div>

                {/* Google Sheets Submission Status Indicator */}
                {submissionStatus && (
                  <div
                    role="status"
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs ${
                      isSubmittingScore
                        ? 'bg-amber-400/90 text-amber-950'
                        : 'bg-white/95 text-emerald-800'
                    }`}
                  >
                    {isSubmittingScore ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    <span>{submissionStatus}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    disabled={isSubmittingScore || !lastPayload}
                    onClick={handleManualResend}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-amber-950 rounded-xl text-xs font-extrabold shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Ulang Nilai ke Guru</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRetakeQuiz}
                    className="px-4 py-2.5 bg-white text-slate-800 hover:bg-slate-100 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulangi Kuis</span>
                  </button>

                  <button
                    type="button"
                    onClick={onBackToMap}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                  >
                    Kembali ke Peta Sirkuit
                  </button>
                </div>

                {/* Small Delivery Log Text */}
                {deliveryLog && (
                  <p
                    data-testid="sheets-delivery-log"
                    className="text-[11px] font-mono text-white/90 bg-slate-900/20 rounded-xl px-3 py-1.5 inline-block"
                  >
                    {deliveryLog}
                  </p>
                )}
              </div>

              {/* Dedicated Motivational Quote Card (Kaidah Pencacahan & Matematika) */}
              {motivationQuote && (
                <div className="bg-gradient-to-br from-pink-50 via-[#FFFDF9] to-amber-50 border-2 border-pink-200 rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 text-white flex items-center justify-center shadow-sm shrink-0">
                      <Quote className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-pink-700">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Quote Motivasi Matematika • {motivationQuote.theme}</span>
                      </div>
                      <blockquote className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed italic">
                        "{motivationQuote.text}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              )}

              <VanellopeGuide
                mood={finalScoreData.score >= 70 ? 'celebrating' : 'thinking'}
                dialogue={
                  finalScoreData.score >= 80 ? (
                    <span>
                      Hebat sekali! Kamu berhasil menyelesaikan kuis evaluasi dengan skor{' '}
                      <strong>{finalScoreData.score}</strong>! Data nilai & progres misimu telah terkirim ke Google Sheets guru!
                    </span>
                  ) : (
                    <span>
                      Kerja bagus sudah menyelesaikan kuis! Pelajari pembahasan lengkap di bawah ini untuk mendalami kaidah pencacahan dengan lebih matang!
                    </span>
                  )
                }
              />

              {/* Pembahasan Lengkap */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 font-candy">
                      Pembahasan Lengkap (10 Soal)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Kunci jawaban resmi dan langkah penyelesaian matematis
                    </p>
                  </div>
                </div>

                <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                  {QUIZ_QUESTIONS.map((q, idx) => {
                    const userPick = userAnswers[q.id];
                    const isCorrectAnswer = userPick === q.correctAnswer;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border-2 text-xs space-y-2.5 ${
                          isCorrectAnswer
                            ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                            : 'bg-rose-50/50 border-rose-200 text-rose-950'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span className="flex items-center gap-1.5">
                            {isCorrectAnswer ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-600" />
                            )}
                            Soal #{idx + 1}: {q.topic}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              isCorrectAnswer
                                ? 'bg-emerald-200 text-emerald-800'
                                : 'bg-rose-200 text-rose-800'
                            }`}
                          >
                            {isCorrectAnswer ? '+10 Poin' : '0 Poin'}
                          </span>
                        </div>

                        <p className="font-medium text-slate-800 leading-relaxed">{q.question}</p>

                        <div className="flex flex-wrap items-center gap-4 text-[11px] pt-1 border-t border-slate-200/60">
                          <div>
                            Jawabanmu:{' '}
                            <strong
                              className={isCorrectAnswer ? 'text-emerald-700' : 'text-rose-700'}
                            >
                              {userPick || '(Tidak Dijawab)'}
                            </strong>
                          </div>
                          <div>
                            Kunci Jawaban:{' '}
                            <strong className="text-emerald-700">
                              {q.correctAnswer} ({q.options.find((o) => o.key === q.correctAnswer)?.text})
                            </strong>
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-[11px] text-slate-700 leading-relaxed space-y-1">
                          <div className="font-bold text-slate-900">Langkah Penyelesaian:</div>
                          <div className="whitespace-pre-line">{q.explanation}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Top 5 Peringkat Kelas */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-md space-y-5">
          <div className="flex items-start justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 font-candy flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                TOP 5 PERINGKAT KELAS
              </h3>
              <p className="text-[11px] text-slate-500">
                {dbStatusMessage || 'Data Google Sheets Terhubung'}
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setTeacherPinInput('');
                  setResetError('');
                  setShowResetModal(true);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200 flex items-center gap-1 transition-colors"
                title="Reset peringkat untuk memulai sesi kelas baru (Memerlukan PIN Guru)"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                <span>Reset (Guru)</span>
              </button>

              <button
                type="button"
                onClick={loadLeaderboard}
                disabled={isFetchingLeaderboard}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                title="Perbarui Data Leaderboard"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isFetchingLeaderboard ? 'animate-spin' : ''}`}
                />
              </button>
            </div>
          </div>

          {leaderboardList.length === 0 ? (
            <div className="py-12 px-4 text-center rounded-2xl bg-[#FAF8F5] border border-dashed border-slate-300 space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Trophy className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-xs font-semibold text-slate-600">
                Belum ada data peringkat untuk sesi ini.
              </p>
              <p className="text-[11px] text-slate-400">
                Selesaikan 10 soal kuis evaluasi untuk mencatatkan namamu di papan peringkat!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2 px-2 text-center">#</th>
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-2 text-center">Score</th>
                    <th className="py-2 px-2 text-center">Durasi</th>
                    <th className="py-2 px-2 text-center">👑</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leaderboardList.slice(0, 5).map((entry, idx) => {
                    const isCurrentStudent =
                      entry.name.toLowerCase() === profile.name.toLowerCase();

                    return (
                      <tr
                        key={entry.id || idx}
                        className={`transition-colors ${
                          isCurrentStudent ? 'bg-emerald-50/80 font-bold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3 px-2 text-center font-bold text-slate-700">
                          {entry.rank === 1 && (
                            <span className="w-6 h-6 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold">
                              1
                            </span>
                          )}
                          {entry.rank === 2 && (
                            <span className="w-6 h-6 mx-auto rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-extrabold">
                              2
                            </span>
                          )}
                          {entry.rank === 3 && (
                            <span className="w-6 h-6 mx-auto rounded-full bg-amber-50 text-amber-800 flex items-center justify-center font-extrabold">
                              3
                            </span>
                          )}
                          {entry.rank > 3 && <span className="text-slate-500">{entry.rank}</span>}
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-amber-300 text-white flex items-center justify-center text-xs font-bold shadow-2xs shrink-0">
                              {entry.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-extrabold text-slate-800 text-xs">
                                {entry.name}
                              </div>
                              <div className="text-[10px] text-slate-400">{entry.studentClass}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-2 text-center font-extrabold font-mono text-emerald-700">
                          {entry.score}
                        </td>

                        <td className="py-3 px-2 text-center font-mono text-[11px] text-slate-600">
                          {entry.timeStr}
                        </td>

                        <td className="py-3 px-2 text-center text-base">
                          {entry.rank === 1 && '🥇'}
                          {entry.rank === 2 && '🥈'}
                          {entry.rank === 3 && '🥉'}
                          {entry.rank > 3 && '🎖️'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Teacher PIN Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-amber-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base font-candy">
                  Reset Peringkat (Khusus Guru)
                </h3>
                <p className="text-xs text-slate-500">
                  Kosongkan Top 5 untuk memulai giliran kelas baru
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Tindakan ini akan mengosongkan papan peringkat Top 5 untuk memulai sesi kelas berikutnya.
            </p>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Masukkan PIN Guru (4 Digit):
              </label>
              <input
                type="password"
                maxLength={4}
                value={teacherPinInput}
                onChange={(e) => {
                  setTeacherPinInput(e.target.value);
                  setResetError('');
                }}
                placeholder="Ketik PIN guru di sini..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-center text-lg font-mono tracking-widest focus:border-amber-500 focus:outline-none"
              />
              {resetError && (
                <div className="text-xs text-rose-600 font-semibold flex items-center gap-1 pt-1">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{resetError}</span>
                </div>
              )}
              {resetSuccessMessage && (
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{resetSuccessMessage}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isResetting}
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isResetting || !teacherPinInput}
                onClick={handleExecuteReset}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-colors flex items-center gap-1.5"
              >
                {isResetting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Mereset...</span>
                  </>
                ) : (
                  <span>Konfirmasi Reset</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
