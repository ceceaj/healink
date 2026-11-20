"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useHealink } from "@/context/HealinkContext";
import { EVALUATION_QUESTIONS } from "@/data/safetyData";
import ChildBottomNav, { ChildTopNavbar } from "@/components/ChildBottomNav";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Trophy,
  RotateCcw,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function InteractiveQuizEvaluationPage() {
  const { childProfile, evaluationHistory, saveQuizResult } = useHealink();

  const [quizType, setQuizType] = useState<"pretest" | "posttest">(
    evaluationHistory.preTestScore === null ? "pretest" : "posttest"
  );
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submittedResult, setSubmittedResult] = useState<{
    percentage: number;
    correctCount: number;
    total: number;
  } | null>(null);
  const [showReviewAnswers, setShowReviewAnswers] = useState(false);

  const totalQuestions = EVALUATION_QUESTIONS.length;
  const currentQuestion =
    EVALUATION_QUESTIONS[currentQIdx] || EVALUATION_QUESTIONS[0];
  const selectedAnswer = answers[currentQuestion.id];
  const progressPercentage = Math.round(
    ((currentQIdx + 1) / Math.max(1, totalQuestions)) * 100
  );

  const handleSelectOption = (optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIdx,
    }));
  };

  const handleNextOrSubmit = () => {
    if (currentQIdx < totalQuestions - 1) {
      setCurrentQIdx((prev) => prev + 1);
    } else {
      let correctCount = 0;
      for (const q of EVALUATION_QUESTIONS) {
        if (answers[q.id] === q.correctIndex) {
          correctCount++;
        }
      }
      const pct = saveQuizResult(quizType, correctCount, totalQuestions);
      setSubmittedResult({
        percentage: pct,
        correctCount,
        total: totalQuestions,
      });
    }
  };

  const handleSwitchMode = (nextType: "pretest" | "posttest") => {
    setQuizType(nextType);
    setCurrentQIdx(0);
    setAnswers({});
    setSubmittedResult(null);
    setShowReviewAnswers(false);
  };

  const getEncouragingMessage = (pct: number, type: "pretest" | "posttest") => {
    if (type === "pretest") {
      return `Terima kasih sudah jujur menjawab Pre-Test, ${childProfile.name}! Sekarang yuk jelajahi 4 Pulau Belajar supaya ilmumu semakin mantap sebelum mengerjakan Post-Test!`;
    }
    if (pct >= 85) {
      return `Luar biasa hebat, ${childProfile.name}! Kamu sudah menguasai 4 Pilar Keamanan Diri dan resmi menjadi Duta Anak Aman Desa Cibodas!`;
    }
    return `Kamu hebat sekali sudah berusaha menyelesaikan kuis ini, ${childProfile.name}! Setiap langkah belajar membuatmu semakin pintar menjaga diri.`;
  };

  return (
    <div className="min-h-screen bg-[#F7FBF7] flex flex-col">
      <ChildTopNavbar />

      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-12 flex-1 space-y-6">
        {/* Top Mode Selector: Mulai Pre-Test vs Mulai Post-Test */}
        <section
          aria-label="Pemilih Mode Pre-Test dan Post-Test"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <button
            type="button"
            onClick={() => handleSwitchMode("pretest")}
            className={`p-4 rounded-3xl border-2 text-left transition-all active:translate-y-0.5 ${
              quizType === "pretest"
                ? "bg-[#FEF9C3] border-[#FACC15] border-b-4 shadow-sm"
                : "bg-white border-slate-200 hover:border-[#FACC15]"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black uppercase text-[#B45309]">
                Tahap 1 • Pemetaan Awal
              </span>
              {evaluationHistory.preTestScore !== null && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#D97706] text-white text-xs font-black">
                  Skor: {evaluationHistory.preTestScore}%
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base font-black text-[#064E3B]">
              📝 Mulai Pre-Test (Sebelum Belajar)
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchMode("posttest")}
            className={`p-4 rounded-3xl border-2 text-left transition-all active:translate-y-0.5 ${
              quizType === "posttest"
                ? "bg-[#ECFDF5] border-[#10B981] border-b-4 shadow-sm"
                : "bg-white border-slate-200 hover:border-[#10B981]"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black uppercase text-[#059669]">
                Tahap 2 • Evaluasi Akhir
              </span>
              {evaluationHistory.postTestScore !== null && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#059669] text-white text-xs font-black">
                  Skor: {evaluationHistory.postTestScore}%
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base font-black text-[#064E3B]">
              🏅 Mulai Post-Test (Sesudah Belajar)
            </p>
          </button>
        </section>

        {submittedResult !== null ? (
          <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-kid-card border-4 border-[#10B981] text-center flex flex-col items-center gap-5 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#FEF9C3] border-4 border-[#FACC15] flex items-center justify-center text-4xl shadow-sm">
              🏆⭐
            </div>

            <span className="px-4 py-1.5 rounded-full bg-[#FACC15] text-[#064E3B] text-xs font-black">
              +25 Bintang! • Otomatis Tercatat di Portal Relawan JEKATA
            </span>

            <div>
              <span className="text-xs font-black uppercase text-[#059669] block">
                Hasil {quizType === "pretest" ? "Pre-Test Awal" : "Post-Test Akhir"}
              </span>
              <h2 className="text-4xl font-black text-[#064E3B] mt-1">
                {submittedResult.percentage}%
              </h2>
              <p className="text-xs sm:text-sm font-extrabold text-[#059669] mt-0.5">
                ({submittedResult.correctCount} dari {submittedResult.total} Soal
                Dijawab Tepat)
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#475569] mt-2 leading-relaxed max-w-lg">
                {getEncouragingMessage(submittedResult.percentage, quizType)}
              </p>
            </div>

            {/* Pre-Test vs Post-Test Comparison Card */}
            <div className="w-full grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F7FBF7] border-2 border-[#10B981]/40 text-xs font-black">
              <div className="p-3 rounded-xl bg-[#FEF9C3]">
                <span className="text-[11px] text-[#B45309] block uppercase">
                  Skor Pre-Test
                </span>
                <span className="text-xl text-[#064E3B]">
                  {evaluationHistory.preTestScore !== null
                    ? `${evaluationHistory.preTestScore}%`
                    : "Belum"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#ECFDF5]">
                <span className="text-[11px] text-[#059669] block uppercase">
                  Skor Post-Test
                </span>
                <span className="text-xl text-[#064E3B]">
                  {evaluationHistory.postTestScore !== null
                    ? `${evaluationHistory.postTestScore}%`
                    : "Belum"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowReviewAnswers((prev) => !prev)}
              className="w-full py-3 px-4 rounded-2xl bg-[#FEF9C3] hover:bg-[#FACC15] text-[#064E3B] font-black text-xs sm:text-sm border-2 border-[#FACC15] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>
                {showReviewAnswers
                  ? "Sembunyikan Pembahasan Soal"
                  : "Lihat Pembahasan 8 Soal Keamanan Diri"}
              </span>
            </button>

            {showReviewAnswers && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                {EVALUATION_QUESTIONS.map((q, i) => {
                  const userAns = answers[q.id];
                  const isCorrect = userAns === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-2xl border-2 text-xs ${
                        isCorrect
                          ? "bg-[#ECFDF5] border-[#10B981]"
                          : "bg-[#FFE4E6]/60 border-[#FB7185]"
                      }`}
                    >
                      <p className="font-black text-[#064E3B]">
                        {i + 1}. {q.emoji} {q.question}
                      </p>
                      <p className="font-bold text-[#059669] mt-1">
                        ✓ Jawaban Aman: {q.options[q.correctIndex]}
                      </p>
                      <p className="text-[11px] font-semibold text-[#475569] mt-0.5">
                        💡 {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {quizType === "pretest" ? (
                <Link
                  href="/anak"
                  className="py-3.5 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm border-2 border-[#064E3B] border-b-4 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Mulai Belajar 4 Pulau →</span>
                </Link>
              ) : (
                <Link
                  href="/relawan"
                  className="py-3.5 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm border-2 border-[#064E3B] border-b-4 flex items-center justify-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Lihat Grafik di Portal Relawan →</span>
                </Link>
              )}

              <button
                type="button"
                onClick={() =>
                  handleSwitchMode(
                    quizType === "pretest" ? "posttest" : "pretest"
                  )
                }
                className="py-3.5 px-4 rounded-2xl bg-[#FEF9C3] hover:bg-[#FACC15] text-[#064E3B] font-black text-xs sm:text-sm border-2 border-[#D97706] border-b-4 flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>
                  Beralih ke{" "}
                  {quizType === "pretest"
                    ? "Post-Test (Sesudah Belajar)"
                    : "Pre-Test (Sebelum Belajar)"}
                </span>
              </button>
            </div>
          </section>
        ) : (
          /* Active Question Responsive 2-Column Card */
          <section className="bg-white rounded-3xl p-5 sm:p-7 shadow-kid-card border-4 border-[#10B981] space-y-5">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-black">
                <span className="text-[#059669]">
                  {quizType === "pretest"
                    ? "📝 Pre-Test (Sebelum Belajar)"
                    : "🏅 Post-Test (Sesudah Belajar)"}
                </span>
                <span className="text-[#064E3B]">
                  Soal {currentQIdx + 1} dari {totalQuestions} (
                  {progressPercentage}%)
                </span>
              </div>

              <div className="w-full h-3.5 bg-[#FEF9C3] rounded-full overflow-hidden p-0.5 border border-[#FACC15]">
                <div
                  className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left 5 Cols: Question Visual Card */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-[#ECFDF5] via-[#FEF9C3] to-[#FFFDF5] border-2 border-[#10B981]/40 flex flex-col items-center text-center">
                <span className="px-3 py-1 rounded-full bg-white text-[#059669] border border-[#10B981]/30 text-xs font-black uppercase mb-3">
                  Pilar: {currentQuestion.pillar}
                </span>
                <span className="text-6xl leading-none mb-3 select-none">
                  {currentQuestion.emoji}
                </span>
                <h2 className="text-base sm:text-lg font-black text-[#064E3B] leading-snug">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Right 7 Cols: Option Cards */}
              <div className="lg:col-span-7 space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border-2 border-b-4 text-left text-xs sm:text-sm font-extrabold transition-all active:translate-y-0.5 flex items-center gap-3.5 ${
                        isSelected
                          ? "bg-[#ECFDF5] border-[#059669] text-[#064E3B] scale-[1.01]"
                          : "bg-[#FFFDF5] border-slate-200 hover:border-[#10B981] text-[#1E293B]"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs sm:text-sm font-black shrink-0 ${
                          isSelected
                            ? "bg-[#10B981] text-white"
                            : "bg-[#FEF9C3] text-[#064E3B] border border-[#FACC15]"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentQIdx === 0}
                onClick={() => setCurrentQIdx((prev) => Math.max(0, prev - 1))}
                className="px-5 py-3.5 rounded-2xl bg-slate-100 disabled:opacity-40 text-xs sm:text-sm font-black text-[#064E3B] border-b-2 border-slate-300 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                type="button"
                disabled={selectedAnswer === undefined}
                onClick={handleNextOrSubmit}
                className="flex-1 max-w-xs py-3.5 px-5 rounded-2xl bg-[#10B981] hover:bg-[#059669] disabled:opacity-40 text-white font-black text-xs sm:text-sm border-2 border-[#064E3B] border-b-4 flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <span>
                  {currentQIdx === totalQuestions - 1
                    ? "Selesai & Simpan Skor ⭐"
                    : "Soal Berikutnya"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}
      </main>

      <ChildBottomNav />
    </div>
  );
}
