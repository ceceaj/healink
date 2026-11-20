"use client";

import React from "react";
import Link from "next/link";
import { useHealink } from "@/context/HealinkContext";
import { LEARNING_MODULES, SIMULATION_SCENARIOS } from "@/data/safetyData";
import ChildBottomNav, { ChildTopNavbar } from "@/components/ChildBottomNav";
import EduVideoPlayer from "@/components/EduVideoPlayer";
import EduAudioPlayer from "@/components/EduAudioPlayer";
import MediaGallery from "@/components/MediaGallery";
import {
  CheckCircle2,
  Gamepad2,
  ClipboardCheck,
  Sparkles,
  ArrowRight,
  Trophy,
  Film,
  Image as ImageIcon,
} from "lucide-react";

export default function ChildDashboardPage() {
  const { childProfile, evaluationHistory } = useHealink();

  const completedCount = childProfile.completedModuleSlugs.length;
  const totalModules = LEARNING_MODULES.length;
  const progressPercent = Math.round(
    (completedCount / Math.max(1, totalModules)) * 100
  );

  const completedSimCount = childProfile.completedSimulations.length;
  const totalSimCount = SIMULATION_SCENARIOS.length;

  return (
    <div className="min-h-screen bg-[#F7FBF7] flex flex-col">
      {/* Responsive Top Navbar (Desktop Nav + Mobile Top Bar) */}
      <ChildTopNavbar />

      {/* Main Wide Responsive Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-12 flex-1 space-y-8">
        {/* 1. Prominent Responsive Hero Banner (Green-Yellow Gradient) */}
        <section
          aria-label="Banner Sambutan & Progres Anak"
          className="rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#059669] to-[#10B981] text-white p-5 sm:p-7 shadow-kid-card border-4 border-[#FACC15] relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left 7 Cols: Greeting & Avatar */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white border-4 border-[#FACC15] flex items-center justify-center text-4xl sm:text-5xl shadow-md shrink-0">
                {childProfile.avatar || "🐱"}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 rounded-full bg-[#FEF9C3] text-[#064E3B] text-[11px] font-black uppercase">
                    {childProfile.avatarName || "Petualang Cilik"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
                    Desa Cibodas • Purwakarta
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                  Halo, {childProfile.name}! Selamat Belajar &amp; Bermain 🌟
                </h1>
                <p className="text-xs sm:text-sm font-bold text-[#ECFDF5] leading-relaxed">
                  Ayo jelajahi 4 Pulau Keamanan Diri, tonton video animasi,
                  dengarkan dongeng suara, dan kumpulkan bintang keberanian!
                </p>
              </div>
            </div>

            {/* Right 5 Cols: Progress Bar & Pre-Test/Post-Test Card */}
            <div className="lg:col-span-5 bg-white text-[#1E293B] rounded-2xl p-4 sm:p-5 border-2 border-[#FACC15] shadow-md space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#D97706]" />
                  <h2 className="text-xs sm:text-sm font-black text-[#064E3B]">
                    {completedCount} dari {totalModules} Pulau Selesai
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#10B981] text-[#059669] text-xs font-black">
                  {progressPercent}%
                </span>
              </div>

              <div className="w-full h-3.5 bg-[#FEF9C3] rounded-full overflow-hidden p-0.5 border border-[#FACC15]">
                <div
                  className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(12, progressPercent)}%` }}
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-[11px] font-extrabold text-[#475569]">
                  {evaluationHistory.preTestScore === null ? (
                    <span>📝 Yuk ambil Kuis Pre-Test!</span>
                  ) : (
                    <span>
                      Pre:{" "}
                      <strong className="text-[#059669]">
                        {evaluationHistory.preTestScore}%
                      </strong>{" "}
                      • Post:{" "}
                      <strong className="text-[#D97706]">
                        {evaluationHistory.postTestScore !== null
                          ? `${evaluationHistory.postTestScore}%`
                          : "Siap"}
                      </strong>
                    </span>
                  )}
                </div>

                <Link
                  href="/anak/kuis"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#064E3B] text-xs font-black border-b-4 border-[#D97706] active:translate-y-0.5 transition-all"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Pre / Post-Test</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 4 Pulau Belajar (Responsive 1-col Mobile, 2-col Tablet, 4-col Desktop) */}
        <section aria-label="4 Pulau Belajar Keamanan Diri" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#059669]">
                Kurikulum 4 Pilar Perlindungan Anak
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[#064E3B]">
                🏝️ 4 Pulau Belajar Keamanan Diri
              </h2>
            </div>
            <p className="text-xs font-bold text-[#475569]">
              Sentuh kartu pulau untuk membuka cerita bergambar &amp; suara
              narasi!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEARNING_MODULES.map((mod) => {
              const isDone = childProfile.completedModuleSlugs.includes(
                mod.slug
              );

              return (
                <Link
                  key={mod.id}
                  href={`/anak/materi/${mod.slug}`}
                  className={`group rounded-3xl p-5 ${mod.colorTheme.cardBg} border-2 ${mod.colorTheme.border} border-b-4 shadow-kid-card flex flex-col justify-between gap-4 hover:-translate-y-1 active:translate-y-0.5 transition-all h-full`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 p-2 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-xs shrink-0">
                        {mod.icon}
                      </div>

                      {isDone ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#059669] text-white text-[10px] font-black shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Selesai</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#D97706] border border-[#FACC15] text-[10px] font-black">
                          <span>+{mod.rewardStars} ⭐</span>
                        </span>
                      )}
                    </div>

                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full ${mod.colorTheme.badgeBg} ${mod.colorTheme.badgeText} text-[10px] font-black uppercase tracking-wider mb-1.5`}
                    >
                      {mod.pillarLabel}
                    </span>

                    <h3 className="text-base font-black text-[#064E3B] leading-snug">
                      {mod.shortTitle}
                    </h3>

                    <p className="text-xs font-bold text-[#475569] mt-1.5 leading-relaxed">
                      {mod.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs font-black text-[#064E3B]">
                    <span>
                      {isDone ? "Baca & Dengar Lagi" : "Mulai Petualangan"}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. Dedicated "Pojok Video & Audio Edukasi" Section */}
        <section
          aria-label="Pojok Video dan Audio Edukasi HEALINK"
          className="space-y-5 bg-white rounded-3xl p-5 sm:p-7 shadow-kid-card border-2 border-[#10B981]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-[#ECFDF5]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF9C3] border-2 border-[#FACC15] flex items-center justify-center text-[#064E3B] shrink-0">
                <Film className="w-6 h-6 text-[#059669]" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#059669]">
                  Multimedia Pembelajaran Interaktif
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#064E3B]">
                  🎬 Pojok Video Animasi &amp; Cerita Audio HEALINK
                </h2>
              </div>
            </div>

            <span className="self-start sm:self-center px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#10B981] text-[#059669] text-xs font-black">
              Dilengkapi Teks &amp; Suara Bahasa Indonesia
            </span>
          </div>

          {/* Interactive 16:9 Educational Video Player + Playlist */}
          <EduVideoPlayer />

          {/* Interactive Audio Story & Narration Player */}
          <div className="pt-2">
            <EduAudioPlayer />
          </div>
        </section>

        {/* 4. Galeri Kartu Visual & Poster Edukasi A3 */}
        <section
          aria-label="Galeri Kartu Visual dan Poster Edukasi"
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#ECFDF5] border-2 border-[#10B981] flex items-center justify-center text-[#059669] shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#059669]">
                  Media Cetak &amp; Visual Pendampingan Desa Cibodas
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#064E3B]">
                  🖼️ Galeri Kartu Visual &amp; Poster Edukasi A3
                </h2>
              </div>
            </div>
            <p className="text-xs font-bold text-[#475569]">
              Klik kartu poster untuk melihat tampilan layar penuh!
            </p>
          </div>

          <MediaGallery />
        </section>

        {/* 5. Side-by-Side Game Simulasi & Sahabat HEALINK AI Cards */}
        <section
          aria-label="Simulasi dan Teman Belajar AI"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Card A: Situation Simulator Game */}
          <div className="rounded-3xl bg-gradient-to-br from-[#ECFDF5] via-white to-[#FEF9C3] p-6 shadow-kid-card border-2 border-[#10B981] border-b-4 flex flex-col justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-3xl bg-[#10B981] text-white border-2 border-[#059669] flex items-center justify-center text-3xl shrink-0 shadow-sm">
                🎮
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#059669] text-white text-[10px] font-black uppercase">
                    Game Interaktif
                  </span>
                  <span className="text-xs font-black text-[#059669]">
                    {completedSimCount}/{totalSimCount} Skenario Selesai
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#064E3B]">
                  Main Simulasi: Aman atau Tidak Aman?
                </h3>
                <p className="text-xs font-bold text-[#475569] leading-relaxed">
                  Latih keberanianmu mengambil keputusan tepat dalam 6 cerita
                  sehari-hari di Desa Cibodas!
                </p>
              </div>
            </div>

            <Link
              href="/anak/simulasi"
              className="w-full py-3.5 px-5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm border-2 border-[#064E3B] border-b-4 flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Mainkan Game Simulasi Sekarang →</span>
            </Link>
          </div>

          {/* Card B: Sahabat HEALINK AI Companion */}
          <div className="rounded-3xl bg-gradient-to-br from-[#FEF9C3] via-white to-[#ECFDF5] p-6 shadow-kid-card border-2 border-[#FACC15] border-b-4 flex flex-col justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-3xl bg-[#FACC15] text-[#064E3B] border-2 border-[#D97706] flex items-center justify-center text-3xl shrink-0 shadow-sm">
                🦉
              </div>
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D97706] text-white text-[10px] font-black uppercase">
                  <Sparkles className="w-3 h-3" />
                  <span>Asisten Edukasi Ramah Anak</span>
                </span>
                <h3 className="text-lg font-black text-[#064E3B]">
                  Tanya Sahabat HEALINK (AI Belajar)
                </h3>
                <p className="text-xs font-bold text-[#475569] leading-relaxed">
                  Minta diceritakan dongeng berani bilang TIDAK atau tanyakan
                  tentang Aturan Baju Renang &amp; 5 Jari Pelindung!
                </p>
              </div>
            </div>

            <Link
              href="/ai-belajar"
              className="w-full py-3.5 px-5 rounded-2xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#064E3B] font-black text-xs sm:text-sm border-2 border-[#D97706] border-b-4 flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buka Ruang Tanya Sahabat HEALINK →</span>
            </Link>
          </div>
        </section>
      </main>

      <ChildBottomNav />
    </div>
  );
}
