"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useHealink } from "@/context/HealinkContext";
import { LEARNING_MODULES } from "@/data/safetyData";
import ChildBottomNav, { ChildTopNavbar } from "@/components/ChildBottomNav";
import EduAudioPlayer from "@/components/EduAudioPlayer";
import EduVideoPlayer from "@/components/EduVideoPlayer";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Gamepad2,
} from "lucide-react";

export default function InteractiveStoryReaderPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { childProfile, completeModule } = useHealink();

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const currentModule = LEARNING_MODULES.find((m) => m.slug === slug);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showReflectionAnswer, setShowReflectionAnswer] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-[#F7FBF7] flex flex-col">
        <ChildTopNavbar />
        <div className="max-w-xl mx-auto flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="text-5xl mb-3">🏝️</div>
          <h1 className="text-xl font-black text-[#064E3B]">
            Pulau Belajar Tidak Ditemukan
          </h1>
          <Link
            href="/anak"
            className="mt-4 px-5 py-3 rounded-2xl bg-[#10B981] text-white font-black text-xs border-b-4 border-[#064E3B]"
          >
            ← Kembali ke Peta Pulau Belajar
          </Link>
        </div>
        <ChildBottomNav />
      </div>
    );
  }

  const slides = currentModule.storySlides;
  const activeSlide = slides[currentSlideIndex] || slides[0];
  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === slides.length - 1;
  const isAlreadyCompleted = childProfile.completedModuleSlugs.includes(
    currentModule.slug
  );

  const handlePrevSlide = () => {
    if (isFirstSlide) return;
    setShowReflectionAnswer(false);
    setCurrentSlideIndex((prev) => prev - 1);
  };

  const handleNextSlide = () => {
    if (!isLastSlide) {
      setShowReflectionAnswer(false);
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      completeModule(currentModule.slug);
      setShowCompletionModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FBF7] flex flex-col">
      {/* Celebratory "+20 Bintang!" Completion Modal */}
      {showCompletionModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#022C22]/70 backdrop-blur-sm flex items-center justify-center p-5"
        >
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-[#FACC15] text-center flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#FEF9C3] border-4 border-[#FACC15] flex items-center justify-center text-4xl shadow-sm">
              🏆⭐
            </div>

            <span className="px-4 py-1.5 rounded-full bg-[#FACC15] text-[#064E3B] text-sm font-black shadow-xs">
              +{currentModule.rewardStars} Bintang Keberanian! 🎉
            </span>

            <div>
              <h2 className="text-xl font-black text-[#064E3B]">
                Hebat Sekali, {childProfile.name}!
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[#475569] mt-1 leading-relaxed">
                Kamu telah menyelesaikan cerita{" "}
                <strong>{currentModule.title}</strong>! Total bintangmu sekarang
                menjadi{" "}
                <strong className="text-[#D97706]">
                  {childProfile.stars} Bintang
                </strong>
                .
              </p>
            </div>

            <div className="w-full space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowCompletionModal(false);
                  router.push("/anak");
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm border-2 border-[#064E3B] border-b-4 flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kembali ke Peta 4 Pulau Belajar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCompletionModal(false);
                  router.push("/anak/simulasi");
                }}
                className="w-full py-3 px-4 rounded-2xl bg-[#FEF9C3] hover:bg-[#FACC15] text-[#064E3B] font-black text-xs sm:text-sm border-2 border-[#D97706] flex items-center justify-center gap-2 transition-all"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Lanjut Main Game Simulasi →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Top Navbar */}
      <ChildTopNavbar />

      {/* Main Responsive Content Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-12 flex-1 space-y-6">
        {/* Top Module Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-3xl shadow-kid-card border-2 border-[#10B981]">
          <Link
            href="/anak"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#ECFDF5] hover:bg-[#10B981] hover:text-white text-[#064E3B] text-xs font-black border border-[#10B981] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Peta Pulau</span>
          </Link>

          {/* 4 Module Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {LEARNING_MODULES.map((m) => {
              const active = m.slug === currentModule.slug;
              return (
                <Link
                  key={m.id}
                  href={`/anak/materi/${m.slug}`}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                    active
                      ? "bg-[#10B981] text-white shadow-xs"
                      : "bg-[#F7FBF7] text-[#475569] hover:bg-[#ECFDF5]"
                  }`}
                >
                  <span>{m.icon}</span>
                  <span>{m.shortTitle}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 2-Column Responsive Desktop Grid: Left = Story Slide Reader, Right = Audio Narration & Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 7 COLUMNS: Interactive Story Slide Viewer */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 shadow-kid-card border-4 border-[#10B981] space-y-5">
            {/* Module Title & Progress Dots */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[#ECFDF5]">
              <div>
                <span
                  className={`inline-block px-3 py-0.5 rounded-full ${currentModule.colorTheme.badgeBg} ${currentModule.colorTheme.badgeText} text-[10px] font-black uppercase`}
                >
                  {currentModule.pillarLabel}
                </span>
                <h1 className="text-lg sm:text-xl font-black text-[#064E3B] mt-1">
                  {currentModule.icon} {currentModule.title}
                </h1>
              </div>

              {/* Slide Progress Dots */}
              <div className="flex items-center gap-2">
                {slides.map((s, idx) => (
                  <button
                    key={s.slideNumber}
                    type="button"
                    onClick={() => {
                      setShowReflectionAnswer(false);
                      setCurrentSlideIndex(idx);
                    }}
                    aria-label={`Halaman cerita ${idx + 1}`}
                    className={`h-3.5 rounded-full transition-all ${
                      idx === currentSlideIndex
                        ? "w-9 bg-[#10B981]"
                        : idx < currentSlideIndex
                        ? "w-3.5 bg-[#FACC15]"
                        : "w-3.5 bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Expressive Visual Illustration Card */}
            <div className="w-full rounded-3xl bg-gradient-to-br from-[#ECFDF5] via-[#FEF9C3] to-[#E0F2FE] p-6 sm:p-8 border-2 border-[#10B981]/40 shadow-inner flex flex-col items-center justify-center text-center relative">
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 text-[#064E3B] text-xs font-black border border-[#10B981]/30">
                Halaman {currentSlideIndex + 1} / {slides.length}
              </span>
              <div className="text-6xl sm:text-7xl leading-none mb-3 select-none">
                {activeSlide.visualEmoji}
              </div>
              <div className="px-4 py-1 rounded-full bg-white/85 text-lg tracking-widest select-none shadow-xs">
                {activeSlide.secondaryEmojis}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#064E3B] mt-3 leading-snug">
                {activeSlide.title}
              </h2>
            </div>

            {/* Readable Story Text */}
            <article className="p-5 rounded-2xl bg-[#F7FBF7] border-2 border-[#10B981]/30">
              <p className="text-base sm:text-lg font-extrabold text-[#1E293B] leading-relaxed">
                {activeSlide.storyText}
              </p>
            </article>

            {/* Interactive Reflection Question Card */}
            <div className="rounded-3xl bg-[#FEF9C3] border-2 border-[#FACC15] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#D97706] shrink-0" />
                <span className="text-xs font-black text-[#B45309] uppercase">
                  Tanya Jawab Jagoan Cilik Desa Cibodas
                </span>
              </div>

              <p className="text-sm sm:text-base font-black text-[#064E3B]">
                “{activeSlide.reflectionPrompt}”
              </p>

              {!showReflectionAnswer ? (
                <button
                  type="button"
                  onClick={() => setShowReflectionAnswer(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-[#10B981] hover:text-white text-[#064E3B] text-xs sm:text-sm font-black border-2 border-[#10B981] border-b-4 flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <span>Klik untuk Membuka Jawaban Jagoan!</span>
                </button>
              ) : (
                <div className="p-3.5 rounded-2xl bg-white border-2 border-[#10B981] text-xs sm:text-sm font-extrabold text-[#064E3B] leading-relaxed flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{activeSlide.reflectionAnswer}</span>
                </div>
              )}
            </div>

            {/* Slide Prev / Next Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                disabled={isFirstSlide}
                onClick={handlePrevSlide}
                className="py-3.5 px-4 rounded-2xl bg-white disabled:opacity-40 text-[#064E3B] font-black text-xs sm:text-sm border-2 border-slate-300 border-b-4 flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                type="button"
                onClick={handleNextSlide}
                className={`py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm border-2 border-b-4 flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all ${
                  isLastSlide
                    ? "bg-[#FACC15] hover:bg-[#F59E0B] text-[#064E3B] border-[#D97706]"
                    : "bg-[#10B981] hover:bg-[#059669] text-white border-[#064E3B]"
                }`}
              >
                <span>
                  {isLastSlide
                    ? isAlreadyCompleted
                      ? "Selesai Baca ✓"
                      : `Klaim +${currentModule.rewardStars} Bintang! ⭐`
                    : "Lanjut Cerita"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: Interactive Audio Story Narration + Related Video Player */}
          <div className="lg:col-span-5 space-y-6">
            {/* Audio Narration synced with the current story slide */}
            <EduAudioPlayer
              customTitle={`Narasi Suara: ${activeSlide.title}`}
              customPillar={`${currentModule.shortTitle} • Halaman ${
                currentSlideIndex + 1
              }`}
              customNarrationText={`${activeSlide.title}. ${activeSlide.storyText} ${activeSlide.reflectionPrompt} ${activeSlide.reflectionAnswer}`}
              customEmoji={activeSlide.visualEmoji}
            />

            {/* Related Educational Video Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-kid-card border-2 border-[#10B981] space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#059669] block">
                🎬 Video Animasi Pendamping Modul Ini
              </span>
              <EduVideoPlayer
                initialModuleSlug={currentModule.slug}
                compact
              />
            </div>
          </div>
        </div>
      </main>

      <ChildBottomNav />
    </div>
  );
}
