"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHealink } from "@/context/HealinkContext";
import { CHILD_AVATARS, LEARNING_MODULES } from "@/data/safetyData";
import {
  ShieldCheck,
  Sparkles,
  BookOpenCheck,
  Users,
  Star,
  ArrowRight,
  RotateCcw,
  Film,
  Headphones,
  Image as ImageIcon,
} from "lucide-react";

export default function WelcomeRoleSelectorPage() {
  const router = useRouter();
  const { childProfile, updateChildProfile, resetAllData } = useHealink();

  const [nickname, setNickname] = useState(childProfile.name || "Sahabat Ceria");
  const [selectedAvatar, setSelectedAvatar] = useState(
    CHILD_AVATARS.find((a) => a.emoji === childProfile.avatar) ||
      CHILD_AVATARS[0]
  );
  const [resetToast, setResetToast] = useState(false);

  const handleStartChildMode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = nickname.trim() || "Sahabat Ceria";
    updateChildProfile({
      name: cleanName,
      avatar: selectedAvatar.emoji,
      avatarName: selectedAvatar.name,
    });
    router.push("/anak");
  };

  const handleReset = () => {
    resetAllData();
    setNickname("Sahabat Ceria");
    setSelectedAvatar(CHILD_AVATARS[0]);
    setResetToast(true);
    setTimeout(() => setResetToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FBF7] via-[#FFFDF5] to-[#ECFDF5] flex flex-col justify-between">
      {resetToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#064E3B] text-white text-xs font-black shadow-lg flex items-center gap-2 border-2 border-[#FACC15]">
          <Sparkles className="w-4 h-4 text-[#FACC15]" />
          <span>Data latihan berhasil direset ke kondisi awal!</span>
        </div>
      )}

      {/* Calming Green & Cheerful Yellow Responsive Hero Header */}
      <header className="w-full bg-gradient-to-r from-[#064E3B] via-[#059669] to-[#10B981] text-white border-b-8 border-[#FACC15] shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              {/* Partner Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF9C3] border-2 border-[#FACC15] text-[#064E3B] shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
                <span className="text-xs font-black tracking-tight">
                  Kemitraan JEKATA Purwakarta &amp; Yayasan CARE Peduli • Desa
                  Cibodas
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white border-4 border-[#FACC15] shadow-lg flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                  🦉🛡️
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[#FEF9C3] text-[11px] font-black uppercase tracking-wider">
                    Laboratorium Komunitas Perlindungan Anak Berbasis AI
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mt-0.5">
                    HEALINK: SAFETY LEARNING
                  </h1>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-bold text-[#ECFDF5] leading-relaxed">
                Media pembelajaran interaktif dengan Cerita Bergambar, Video
                Animasi, Dongeng Audio, Poster Visual A3, dan Game Simulasi
                untuk 25+ anak di Desa Cibodas, Kabupaten Purwakarta.
              </p>
            </div>

            {/* Right Feature Badges on Desktop */}
            <div className="grid grid-cols-3 gap-2.5 lg:w-[340px] shrink-0">
              <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 text-center">
                <Film className="w-5 h-5 text-[#FACC15] mx-auto mb-1" />
                <span className="text-xs font-black block">Video</span>
                <span className="text-[10px] text-[#FEF9C3] font-bold">
                  Animasi 16:9
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 text-center">
                <Headphones className="w-5 h-5 text-[#FACC15] mx-auto mb-1" />
                <span className="text-xs font-black block">Audio</span>
                <span className="text-[10px] text-[#FEF9C3] font-bold">
                  Suara TTS ID
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 text-center">
                <ImageIcon className="w-5 h-5 text-[#FACC15] mx-auto mb-1" />
                <span className="text-xs font-black block">Poster A3</span>
                <span className="text-[10px] text-[#FEF9C3] font-bold">
                  Kartu Visual
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Responsive Multi-Column Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 7 COLUMNS: MODE ANAK (BELAJAR & BERMAIN) */}
          <section
            aria-label="Mode Anak Belajar dan Bermain"
            className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 shadow-kid-card border-4 border-[#10B981]"
          >
            <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b-2 border-[#ECFDF5]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border-2 border-[#10B981] flex items-center justify-center text-2xl">
                  🎈
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-black uppercase">
                    Mode Peserta Anak Desa Cibodas
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-[#064E3B] mt-0.5">
                    Mode Anak (Belajar &amp; Bermain)
                  </h2>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-2xl bg-[#FEF9C3] border-2 border-[#FACC15] border-b-4 flex items-center gap-1.5 shrink-0">
                <Star className="w-4 h-4 text-[#D97706] fill-[#FACC15]" />
                <span className="text-xs sm:text-sm font-black text-[#064E3B]">
                  {childProfile.stars} Bintang
                </span>
              </div>
            </div>

            <form onSubmit={handleStartChildMode} className="space-y-5">
              {/* Nickname Input */}
              <div>
                <label
                  htmlFor="child-nickname"
                  className="block text-xs sm:text-sm font-black text-[#064E3B] mb-2"
                >
                  1. Tulis Nama Panggilanmu:
                </label>
                <input
                  id="child-nickname"
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Contoh: Raka, Siti, Daffa, Nayla..."
                  className="w-full px-4 py-3.5 text-sm sm:text-base font-extrabold bg-[#F7FBF7] border-2 border-[#10B981] rounded-2xl text-[#064E3B] placeholder:text-[#475569]/60 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>

              {/* Animal Avatar Picker */}
              <div>
                <span className="block text-xs sm:text-sm font-black text-[#064E3B] mb-2.5">
                  2. Pilih Teman Hewan Jagoanmu:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CHILD_AVATARS.map((av) => {
                    const isSelected = selectedAvatar.id === av.id;
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setSelectedAvatar(av)}
                        className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all active:scale-95 ${
                          isSelected
                            ? `${av.bgClass} border-b-4 scale-[1.02] shadow-sm`
                            : "bg-[#FFFDF5] border-slate-200 hover:border-[#10B981]"
                        }`}
                      >
                        <span className="text-3xl leading-none shrink-0">
                          {av.emoji}
                        </span>
                        <span className="text-xs font-black text-[#064E3B] text-left leading-tight">
                          {av.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Start Adventure Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-3xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#064E3B] font-black text-sm sm:text-base border-2 border-[#D97706] border-b-4 shadow-sm active:translate-y-0.5 transition-all flex items-center justify-center gap-2.5"
              >
                <span>🚀 Masuk ke Peta Pulau Belajar &amp; Media!</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </section>

          {/* RIGHT 5 COLUMNS: MODE RELAWAN JEKATA & 4 PILLARS PREVIEW */}
          <div className="lg:col-span-5 space-y-6">
            {/* Mode Relawan JEKATA Card */}
            <section
              aria-label="Mode Relawan JEKATA dan CARE Peduli"
              className="bg-gradient-to-br from-[#FEF9C3] via-white to-[#ECFDF5] rounded-3xl p-5 sm:p-6 shadow-kid-card border-4 border-[#FACC15]"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 p-2.5 rounded-2xl bg-[#10B981] text-white border-2 border-[#059669] flex items-center justify-center text-2xl shrink-0 shadow-xs">
                  📋
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#064E3B] text-[#FEF9C3] text-[10px] font-black uppercase mb-1">
                    Portal Fasilitator Lapangan
                  </span>
                  <h2 className="text-lg font-black text-[#064E3B]">
                    Mode Relawan JEKATA &amp; CARE Peduli
                  </h2>
                  <p className="text-xs font-bold text-[#475569] mt-1 leading-relaxed">
                    Akses Silabus 4 Pilar Perlindungan Anak, Panduan
                    Pendampingan Sesi di Desa Cibodas, serta Grafik Evaluasi
                    Pre-Test vs Post-Test 25+ Peserta.
                  </p>

                  <Link
                    href="/relawan"
                    className="mt-4 w-full py-3.5 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm border-2 border-[#064E3B] border-b-4 flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
                  >
                    <BookOpenCheck className="w-4 h-4" />
                    <span>Buka Portal Relawan JEKATA →</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* 4 Pillars Quick Overview Card */}
            <section className="bg-white rounded-3xl p-5 shadow-kid-card border-2 border-[#10B981] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#059669]">
                  🏝️ 4 Pilar Utama Keamanan Diri Anak
                </span>
                <span className="text-[11px] font-black text-[#D97706]">
                  PKM-PM Desa Cibodas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {LEARNING_MODULES.map((m) => (
                  <Link
                    key={m.id}
                    href={`/anak/materi/${m.slug}`}
                    className={`p-3 rounded-2xl ${m.colorTheme.cardBg} border ${m.colorTheme.border} flex items-center justify-between gap-2.5 hover:scale-[1.01] transition-transform`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl shrink-0">{m.icon}</span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase text-[#064E3B] block">
                          {m.pillarLabel}
                        </span>
                        <h3 className="text-xs font-black text-[#1E293B] truncate">
                          {m.title}
                        </h3>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#064E3B] shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t-2 border-[#10B981]/25 py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-[#475569]">
            <Users className="w-4 h-4 text-[#10B981]" />
            <span>
              HEALINK: SAFETY LEARNING • Laboratorium Perlindungan Anak Desa
              Cibodas, Purwakarta
            </span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#ECFDF5] hover:bg-[#10B981] hover:text-white border border-[#10B981] text-xs font-black text-[#064E3B] transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data Demo</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
