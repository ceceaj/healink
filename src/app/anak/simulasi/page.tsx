"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useHealink } from "@/context/HealinkContext";
import { SIMULATION_SCENARIOS } from "@/data/safetyData";
import ChildBottomNav, { ChildTopNavbar } from "@/components/ChildBottomNav";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  ShieldAlert,
  RotateCcw,
  ClipboardCheck,
  Trophy,
} from "lucide-react";

export default function SituationSimulatorPage() {
  const { childProfile, completeSimulation } = useHealink();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(
    null
  );
  const [feedbackState, setFeedbackState] = useState<
    "correct" | "retry" | null
  >(null);

  const scenario =
    SIMULATION_SCENARIOS[currentIdx] || SIMULATION_SCENARIOS[0];
  const isCompletedAlready = childProfile.completedSimulations.includes(
    scenario.id
  );

  const handleChoiceSelect = (choiceIdx: number) => {
    setSelectedChoiceIdx(choiceIdx);
    if (choiceIdx === scenario.correctChoiceIndex) {
      completeSimulation(scenario.id, scenario.rewardStars);
      setFeedbackState("correct");
    } else {
      setFeedbackState("retry");
    }
  };

  const handleNextScenario = () => {
    setFeedbackState(null);
    setSelectedChoiceIdx(null);
    if (currentIdx < SIMULATION_SCENARIOS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FBF7] flex flex-col">
      {/* Feedback Modal (Warm & Non-Punitive) */}
      {feedbackState && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#022C22]/70 backdrop-blur-sm flex items-center justify-center p-5"
        >
          {feedbackState === "correct" ? (
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-[#10B981] text-center flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#ECFDF5] border-4 border-[#10B981] flex items-center justify-center text-4xl">
                🎉⭐
              </div>

              <span className="px-4 py-1 rounded-full bg-[#FEF9C3] border border-[#FACC15] text-[#B45309] text-xs font-black">
                +{scenario.rewardStars} Bintang Keberanian!
              </span>

              <h2 className="text-xl font-black text-[#064E3B]">
                Pilihan Jagoan yang Sangat Tepat!
              </h2>

              <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#10B981] text-xs sm:text-sm font-extrabold text-[#064E3B] leading-relaxed">
                {scenario.gentleFeedback}
              </div>

              <button
                type="button"
                onClick={handleNextScenario}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm border-2 border-[#064E3B] border-b-4 flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <span>
                  {currentIdx < SIMULATION_SCENARIOS.length - 1
                    ? "Lanjut Skenario Berikutnya →"
                    : "Ulangi dari Skenario 1 🔄"}
                </span>
              </button>
            </div>
          ) : (
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-[#FACC15] text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#FEF9C3] border-2 border-[#FACC15] flex items-center justify-center text-3xl">
                🦉💡
              </div>

              <span className="px-3 py-1 rounded-full bg-[#FFE4E6] text-[#E11D48] text-xs font-black">
                Yuk Pikirkan Sekali Lagi!
              </span>

              <h2 className="text-lg font-black text-[#064E3B]">
                Hmm, Pilihan Itu Kurang Aman, {childProfile.name}
              </h2>

              <p className="text-xs sm:text-sm font-bold text-[#475569] leading-relaxed">
                Ingat aturan keamanan diri kita: selalu jaga batasan tubuhmu,
                tolak ajakan mencurigakan, dan pilih tindakan yang membuatmu
                berada di tempat aman bersama orang dewasa tepercaya.
              </p>

              <button
                type="button"
                onClick={() => setFeedbackState(null)}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#064E3B] font-black text-xs sm:text-sm border-2 border-[#D97706] border-b-4 flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Coba Pilih Tindakan Lain</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Responsive Top Navbar */}
      <ChildTopNavbar />

      {/* Main Responsive Content */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-12 flex-1 space-y-6">
        {/* Top Scenario Selector Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-kid-card border-2 border-[#10B981] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase text-[#059669] block">
              Game Pengambilan Keputusan Ramah Anak
            </span>
            <h1 className="text-lg sm:text-xl font-black text-[#064E3B]">
              🎮 Simulasi: Aman atau Tidak Aman? (
              {childProfile.completedSimulations.length}/
              {SIMULATION_SCENARIOS.length} Selesai)
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {SIMULATION_SCENARIOS.map((item, idx) => {
              const done = childProfile.completedSimulations.includes(item.id);
              const active = idx === currentIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCurrentIdx(idx);
                    setSelectedChoiceIdx(null);
                    setFeedbackState(null);
                  }}
                  className={`w-10 h-10 rounded-xl text-xs font-black border-2 transition-all ${
                    active
                      ? "bg-[#10B981] text-white border-[#064E3B] scale-105 shadow-xs"
                      : done
                      ? "bg-[#FEF9C3] text-[#064E3B] border-[#FACC15]"
                      : "bg-[#F7FBF7] text-[#475569] border-slate-200"
                  }`}
                >
                  {done ? `✓${idx + 1}` : idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Responsive Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT 6 COLUMNS: Scenario Illustration & Story */}
          <section className="lg:col-span-6 rounded-3xl bg-white p-6 shadow-kid-card border-4 border-[#10B981] flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-black uppercase">
                  Skenario #{scenario.id} • {scenario.pillar}
                </span>

                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${
                    scenario.isSafe
                      ? "bg-[#ECFDF5] text-[#059669] border border-[#10B981]"
                      : "bg-[#FEF9C3] text-[#B45309] border border-[#FACC15]"
                  }`}
                >
                  {scenario.isSafe ? (
                    <>
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>Situasi Aman</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Waspada!</span>
                    </>
                  )}
                </span>
              </div>

              <div className="w-full py-8 rounded-3xl bg-gradient-to-br from-[#ECFDF5] via-[#FEF9C3] to-[#FFFDF5] border-2 border-[#10B981]/30 flex flex-col items-center justify-center text-center">
                <span className="text-6xl sm:text-7xl leading-none mb-3">
                  {scenario.visualEmoji}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#064E3B] px-4">
                  {scenario.title}
                </h2>
              </div>

              <p className="text-base font-extrabold text-[#1E293B] leading-relaxed bg-[#F7FBF7] p-4 rounded-2xl border border-[#10B981]/25">
                {scenario.story}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => {
                  setCurrentIdx((prev) => Math.max(0, prev - 1));
                  setSelectedChoiceIdx(null);
                }}
                className="px-4 py-2.5 rounded-2xl bg-[#F7FBF7] disabled:opacity-40 border-2 border-slate-300 text-xs font-black text-[#064E3B] flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {isCompletedAlready && (
                <span className="inline-flex items-center gap-1 text-xs font-black text-[#059669]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tuntas (+{scenario.rewardStars} ⭐)</span>
                </span>
              )}

              <button
                type="button"
                onClick={handleNextScenario}
                className="px-4 py-2.5 rounded-2xl bg-[#FEF9C3] hover:bg-[#FACC15] text-[#064E3B] border-2 border-[#D97706] text-xs font-black flex items-center gap-1.5"
              >
                <span>Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* RIGHT 6 COLUMNS: Interactive Action Choices */}
          <section className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-kid-card border-4 border-[#FACC15] flex flex-col justify-between gap-4">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-black text-[#064E3B]">
                  Apa tindakan paling aman yang harus kamu pilih,{" "}
                  {childProfile.name}?
                </h3>
              </div>

              <div className="space-y-3">
                {scenario.choices.map((choiceText, idx) => {
                  const isSelected = selectedChoiceIdx === idx;
                  const isCorrectChoice = idx === scenario.correctChoiceIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChoiceSelect(idx)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border-2 border-b-4 text-left font-extrabold text-xs sm:text-sm leading-relaxed transition-all active:translate-y-0.5 flex items-start gap-3.5 ${
                        isSelected && isCorrectChoice
                          ? "bg-[#ECFDF5] border-[#059669] text-[#064E3B]"
                          : isSelected && !isCorrectChoice
                          ? "bg-[#FFE4E6] border-[#E11D48] text-[#1E293B]"
                          : "bg-[#FFFDF5] hover:bg-[#ECFDF5] border-[#10B981] text-[#1E293B]"
                      }`}
                    >
                      <span className="w-8 h-8 rounded-xl bg-[#FACC15] border border-[#D97706] flex items-center justify-center text-xs sm:text-sm font-black text-[#064E3B] shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{choiceText}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Progress & Next CTA */}
            <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#10B981] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-6 h-6 text-[#D97706] shrink-0" />
                <div>
                  <span className="text-xs font-black text-[#064E3B] block">
                    Progres Detektif Keamanan Diri
                  </span>
                  <span className="text-[11px] font-bold text-[#059669]">
                    {childProfile.completedSimulations.length} dari{" "}
                    {SIMULATION_SCENARIOS.length} Skenario Dikuasai
                  </span>
                </div>
              </div>

              <Link
                href="/anak/kuis"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs border-b-4 border-[#064E3B] flex items-center justify-center gap-1.5"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Lanjut Kuis Evaluasi →</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <ChildBottomNav />
    </div>
  );
}
