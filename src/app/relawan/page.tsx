"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useHealink } from "@/context/HealinkContext";
import {
  VOLUNTEER_GUIDE,
  LEARNING_MODULES,
  CHILD_AVATARS,
} from "@/data/safetyData";
import MediaGallery from "@/components/MediaGallery";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckSquare,
  Square,
  BarChart3,
  ShieldCheck,
  PlusCircle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Users,
  TrendingUp,
  Sparkles,
  Gamepad2,
} from "lucide-react";

interface ModuleSyllabusDetail {
  slug: string;
  objectives: string[];
  keyMessages: string[];
  discussionPrompts: string[];
}

const MODULE_SYLLABUS_DETAILS: Record<string, ModuleSyllabusDetail> = {
  "batasan-pribadi": {
    slug: "batasan-pribadi",
    objectives: [
      "Anak memahami konsep kepemilikan tubuh sendiri (bodily autonomy).",
      "Anak mampu menyebutkan 4 area tubuh pribadi berdasarkan Aturan Baju Renang.",
      "Anak mampu mempraktikkan 3 Jurus Jagoan: TIDAK, LARI, CERITA.",
    ],
    keyMessages: [
      "“Tubuhku adalah milikku yang berharga dan tidak boleh disentuh sembarangan.”",
      "“Bibir, dada, bagian di antara paha (kemaluan), dan pantat adalah bagian pribadiku.”",
    ],
    discussionPrompts: [
      "“Siapa saja yang boleh memandikan atau membantu kita berpakaian di rumah?”",
      "“Yuk kita latihan bersama-sama mengangkat tangan dan teriak: TIDAK BOLEH!”",
    ],
  },
  "pengenalan-emosi": {
    slug: "pengenalan-emosi",
    objectives: [
      "Anak mampu mengidentifikasi 5 emosi dasar: Senang, Sedih, Takut, Marah, dan Tidak Nyaman.",
      "Anak mengenali reaksi fisik 'Alarm Tubuh' (jantung berdebar, perut mulas, gemetar) saat menghadapi ancaman.",
      "Anak mampu mempraktikkan regulasi emosi dasar melalui teknik Napas Balon 1-2-3.",
    ],
    keyMessages: [
      "“Merasa takut atau tidak nyaman bukanlah tanda anak cengeng, melainkan sinyal Alarm Tubuh.”",
      "“Percayai perasaanmu dan segera menjauh bila alarm tubuhmu berbunyi.”",
    ],
    discussionPrompts: [
      "“Di bagian tubuh mana yang terasa tidak enak saat kita sedang ketakutan?”",
      "“Ayo kita praktikkan Napas Balon bersama selama 3 kali hitungan!”",
    ],
  },
  "situasi-aman": {
    slug: "situasi-aman",
    objectives: [
      "Anak mampu membedakan Kejutan Baik (hadiah ulang tahun) dengan Rahasia Buruk (ancaman/sentuhan tidak nyaman).",
      "Anak mampu mengenali modus bujukan hadiah, permen, atau pinjaman gawai dari orang asing maupun kenalan.",
      "Anak memahami pentingnya bermain berkelompok di area yang terang dan ramai di Desa Cibodas.",
    ],
    keyMessages: [
      "“Rahasia yang membuatku takut dan tidak nyaman TIDAK BOLEH disimpan!”",
      "“Anak yang diganggu atau diancam orang nakal TIDAK PERNAH bersalah.”",
    ],
    discussionPrompts: [
      "“Apa bedanya kejutan kue ulang tahun Ibu dengan rahasia yang membuat perut kita mulas?”",
      "“Tempat mana saja di Desa Cibodas yang aman dan terang untuk bermain sore?”",
    ],
  },
  "cari-pertolongan": {
    slug: "cari-pertolongan",
    objectives: [
      "Anak mampu menyebutkan 5 Orang Dewasa Tepercaya menggunakan metode 5 Jari Pelindung.",
      "Anak mampu menyampaikan kalimat permintaan tolong secara jelas dan tanpa rasa malu.",
      "Anak memahami prinsip terus bercerita kepada orang dewasa tepercaya berikutnya sampai mendapatkan bantuan.",
    ],
    keyMessages: [
      "“5 Jari Pelindungku: Orang Tua, Keluarga dekat, Guru, Kakak Relawan JEKATA, dan Petugas Desa.”",
      "“Bercerita dan meminta tolong adalah tindakan anak pemberani!”",
    ],
    discussionPrompts: [
      "“Ayo angkat 5 jari tangan kita dan sebutkan nama 5 orang dewasa yang paling kalian percaya!”",
      "“Apa yang harus kita lakukan jika orang dewasa pertama yang kita beri tahu sedang sibuk?”",
    ],
  },
};

export default function VolunteerDashboardPage() {
  const {
    evaluationHistory,
    volunteerChecklist,
    toggleVolunteerChecklist,
    addParticipantRecord,
  } = useHealink();

  const [activeTab, setActiveTab] = useState<
    "modul" | "panduan" | "evaluasi"
  >("modul");

  // Manual Participant Evaluation Entry Form State
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("9-10 Tahun (SD Kelas 3-4)");
  const [newPre, setNewPre] = useState<number>(50);
  const [newPost, setNewPost] = useState<number>(88);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const records = evaluationHistory.participantRecords;
  const totalParticipants = records.length;

  const avgPre = Math.round(
    records.reduce((acc, r) => acc + r.preTestScore, 0) /
      Math.max(1, totalParticipants)
  );
  const avgPost = Math.round(
    records.reduce((acc, r) => acc + r.postTestScore, 0) /
      Math.max(1, totalParticipants)
  );
  const improvementDelta = Math.max(0, avgPost - avgPre);
  const relativeImprovementPct =
    avgPre > 0
      ? Math.round(((avgPost - avgPre) / avgPre) * 100)
      : improvementDelta;

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const randomAvatar =
      CHILD_AVATARS[records.length % CHILD_AVATARS.length].emoji;
    addParticipantRecord({
      nickname: newName.trim(),
      avatar: randomAvatar,
      ageGroup: newAge,
      preTestScore: Math.min(100, Math.max(0, Number(newPre))),
      postTestScore: Math.min(100, Math.max(0, Number(newPost))),
    });
    setAddedToast(
      `Data evaluasi "${newName.trim()}" berhasil ditambahkan ke rekap Desa Cibodas!`
    );
    setNewName("");
    setTimeout(() => setAddedToast(null), 2800);
  };

  return (
    <div className="min-h-screen bg-[#F7FBF7] flex flex-col">
      {addedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#064E3B] text-white text-xs font-black shadow-lg flex items-center gap-2 border-2 border-[#FACC15]">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Calming Green & Cheerful Yellow Institutional Header */}
      <header className="w-full bg-gradient-to-r from-[#064E3B] via-[#059669] to-[#10B981] text-white border-b-8 border-[#FACC15] shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-extrabold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Halaman Utama</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-white/15 text-[#FEF9C3] text-xs font-black">
                Desa Cibodas • Purwakarta
              </span>
              <Link
                href="/anak"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#064E3B] text-xs font-black border-b-4 border-[#D97706] shadow-xs active:translate-y-0.5 transition-all"
              >
                <span>🎈 Beralih ke Mode Anak →</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-0.5 rounded-full bg-[#FEF9C3] text-[#064E3B] text-[10px] font-black uppercase tracking-wider mb-1.5">
                Laboratorium Komunitas Perlindungan Anak (PKM-PM)
              </span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black leading-snug">
                Portal Relawan JEKATA &amp; CARE Peduli — Desa Cibodas
              </h1>
              <p className="text-xs sm:text-sm font-bold text-[#ECFDF5] mt-1">
                Acuan Silabus 4 Pilar, Panduan Pendampingan Sesi Lapangan &amp;
                Rekapitulasi Evaluasi Pre-Test vs Post-Test 25+ Peserta
              </p>
            </div>

            {/* 3 Interactive Tabs Mirroring PKM-PM Proposal Outputs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-white/15 backdrop-blur-sm rounded-2xl lg:w-[460px] shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab("modul")}
                className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all ${
                  activeTab === "modul"
                    ? "bg-[#FACC15] text-[#064E3B] shadow-xs"
                    : "text-white hover:bg-white/10"
                }`}
              >
                🏝️ Modul Edukasi
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("panduan")}
                className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all ${
                  activeTab === "panduan"
                    ? "bg-[#FACC15] text-[#064E3B] shadow-xs"
                    : "text-white hover:bg-white/10"
                }`}
              >
                📋 Panduan Relawan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("evaluasi")}
                className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all ${
                  activeTab === "evaluasi"
                    ? "bg-[#FACC15] text-[#064E3B] shadow-xs"
                    : "text-white hover:bg-white/10"
                }`}
              >
                📊 Evaluasi ({totalParticipants})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Wide Responsive Body */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 space-y-6">
        {/* TAB 1: MODUL EDUKASI (ACUAN MATERI) */}
        {activeTab === "modul" && (
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-white border-2 border-[#10B981] shadow-kid-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase text-[#059669] block">
                  Luaran 1 PKM-PM • Kurikulum Perlindungan Anak
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#064E3B]">
                  Silabus 4 Pilar Keamanan Diri Anak Desa Cibodas
                </h2>
                <p className="text-xs sm:text-sm font-bold text-[#475569] mt-0.5">
                  Acuan materi standar bagi fasilitator JEKATA saat mendampingi
                  kelompok belajar anak.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/anak/simulasi"
                  className="px-4 py-2.5 rounded-2xl bg-[#ECFDF5] hover:bg-[#10B981] hover:text-white text-[#064E3B] border border-[#10B981] text-xs font-black flex items-center gap-1.5 transition-all"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>6 Simulasi</span>
                </Link>
                <Link
                  href="/ai-belajar"
                  className="px-4 py-2.5 rounded-2xl bg-[#FEF9C3] hover:bg-[#FACC15] text-[#064E3B] border border-[#FACC15] text-xs font-black flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Belajar</span>
                </Link>
              </div>
            </div>

            {/* 2-Column Grid of Module Syllabus Cards on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {LEARNING_MODULES.map((mod) => {
                const syllabus = MODULE_SYLLABUS_DETAILS[mod.slug];
                return (
                  <article
                    key={mod.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 shadow-kid-card border-2 border-[#10B981] flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 p-2 rounded-2xl ${mod.colorTheme.cardBg} border-2 ${mod.colorTheme.border} flex items-center justify-center text-2xl sm:text-3xl shrink-0`}
                          >
                            {mod.icon}
                          </div>
                          <div>
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full ${mod.colorTheme.badgeBg} ${mod.colorTheme.badgeText} text-[10px] font-black uppercase mb-0.5`}
                            >
                              {mod.pillarLabel}
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-[#064E3B] leading-snug">
                              {mod.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {syllabus && (
                        <div className="space-y-3 text-xs">
                          <div className="p-3.5 rounded-2xl bg-[#F7FBF7] border border-[#10B981]/30 space-y-1.5">
                            <span className="font-black text-[#059669] uppercase text-[10px] block">
                              🎯 Tujuan Pembelajaran:
                            </span>
                            <ul className="space-y-1 font-bold text-[#1E293B]">
                              {syllabus.objectives.map((obj, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-1.5"
                                >
                                  <span className="text-[#10B981]">•</span>
                                  <span>{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-[#FEF9C3]/80 border border-[#FACC15] space-y-1.5">
                            <span className="font-black text-[#B45309] uppercase text-[10px] block">
                              💬 Pesan Kunci untuk Anak:
                            </span>
                            {syllabus.keyMessages.map((msg, idx) => (
                              <p
                                key={idx}
                                className="font-extrabold text-[#064E3B] leading-snug"
                              >
                                {msg}
                              </p>
                            ))}
                          </div>

                          <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border border-[#10B981]/40 space-y-1.5">
                            <span className="font-black text-[#059669] uppercase text-[10px] block">
                              🗣️ Pertanyaan Pemantik Diskusi Kelompok:
                            </span>
                            {syllabus.discussionPrompts.map((pr, idx) => (
                              <p
                                key={idx}
                                className="font-bold text-[#064E3B] leading-snug"
                              >
                                {pr}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#475569]">
                        {mod.storySlides.length} Slide Cerita + Narasi Audio
                      </span>
                      <Link
                        href={`/anak/materi/${mod.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-black border-b-4 border-[#064E3B] active:translate-y-0.5 transition-all"
                      >
                        <span>Buka di Mode Anak</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Visual Poster A3 Preview for Facilitators */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-kid-card border-2 border-[#FACC15] space-y-4">
              <div>
                <span className="text-xs font-black uppercase text-[#B45309]">
                  Alat Peraga Fasilitator JEKATA
                </span>
                <h3 className="text-lg font-black text-[#064E3B]">
                  🖼️ Poster A3 &amp; Kartu Visual Edukasi Pendampingan
                </h3>
              </div>
              <MediaGallery />
            </div>
          </div>
        )}

        {/* TAB 2: PANDUAN PENDAMPINGAN RELAWAN */}
        {activeTab === "panduan" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 6 Columns: Checklist & 5-Step Flow */}
            <div className="lg:col-span-6 space-y-6">
              {/* Interactive Checklist Persiapan Sesi Relawan */}
              <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-kid-card border-2 border-[#10B981] space-y-3.5">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-black text-[#064E3B] flex items-center gap-2">
                    <BookOpenCheck className="w-5 h-5 text-[#10B981]" />
                    <span>Checklist Persiapan Sesi Relawan</span>
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#10B981] text-[#059669] text-xs font-black">
                    {volunteerChecklist.length}/
                    {VOLUNTEER_GUIDE.prepChecklist.length} Selesai
                  </span>
                </div>

                <div className="space-y-2.5">
                  {VOLUNTEER_GUIDE.prepChecklist.map((item) => {
                    const checked = volunteerChecklist.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleVolunteerChecklist(item.id)}
                        className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-start gap-3 transition-all ${
                          checked
                            ? "bg-[#ECFDF5] border-[#10B981]"
                            : "bg-[#FFFDF5] border-slate-200 hover:border-[#10B981]"
                        }`}
                      >
                        {checked ? (
                          <CheckSquare className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="text-[10px] font-black uppercase text-[#059669] block">
                            {item.category}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-extrabold ${
                              checked
                                ? "text-[#059669] line-through"
                                : "text-[#1E293B]"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* 5-Step Facilitation Flow */}
              <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-kid-card border-2 border-[#FACC15] space-y-3.5">
                <h2 className="text-base font-black text-[#064E3B]">
                  ⏱️ 5 Tahapan Alur Fasilitasi Sesi di Desa Cibodas (90 Menit)
                </h2>
                <div className="space-y-3">
                  {VOLUNTEER_GUIDE.sessionStages.map((st) => (
                    <div
                      key={st.step}
                      className="p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#FACC15] space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-black text-[#064E3B]">
                          {st.emoji} Tahap {st.step}: {st.title}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FEF9C3] text-[#B45309] text-[10px] font-black shrink-0">
                          {st.duration}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#475569] leading-relaxed">
                        {st.activity}
                      </p>
                      <p className="text-[11px] font-extrabold text-[#059669]">
                        💡 Tip Fasilitator: {st.facilitatorTip}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right 6 Columns: Do's & Don'ts + Child Safety & Privacy Principles */}
            <div className="lg:col-span-6 space-y-6">
              {/* Child-Friendly Communication Do's & Don'ts Cards */}
              <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-kid-card border-2 border-[#10B981] space-y-4">
                <h2 className="text-base font-black text-[#064E3B]">
                  🗣️ Prinsip Komunikasi Ramah Anak (Do&apos;s &amp; Don&apos;ts)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Do's Column */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-black text-[#059669] block">
                      ✅ Wajib Dilakukan (Do&apos;s):
                    </span>
                    {VOLUNTEER_GUIDE.communicationPrinciples.dos.map((d, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-[#ECFDF5] border border-[#10B981]/50 text-xs font-bold text-[#064E3B] flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>

                  {/* Don'ts Column */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-black text-[#E11D48] block">
                      ❌ Dilarang Keras (Don&apos;ts):
                    </span>
                    {VOLUNTEER_GUIDE.communicationPrinciples.donts.map(
                      (d, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-2xl bg-[#FFE4E6]/65 border border-[#FB7185]/50 text-xs font-bold text-[#1E293B] flex items-start gap-2"
                        >
                          <XCircle className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </section>

              {/* Child Safety & Privacy Principles */}
              <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-kid-card border-2 border-[#FACC15] space-y-3">
                <h2 className="text-base font-black text-[#064E3B] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#059669]" />
                  <span>Prinsip Keamanan, Privasi Anak &amp; Batas Peran AI</span>
                </h2>
                {VOLUNTEER_GUIDE.safetyProtocols.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-[#F7FBF7] border border-[#10B981]/30"
                  >
                    <h3 className="text-xs sm:text-sm font-black text-[#064E3B]">
                      {p.emoji} {p.title}
                    </h3>
                    <p className="text-xs font-bold text-[#475569] mt-1 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        )}

        {/* TAB 3: EVALUASI PRE-TEST VS POST-TEST */}
        {activeTab === "evaluasi" && (
          <div className="space-y-6">
            {/* 4 Summary KPI Cards in a Single Row on Desktop */}
            <section
              aria-label="Ringkasan KPI Evaluasi Peserta"
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div className="bg-white rounded-3xl p-5 shadow-kid-card border-2 border-[#10B981]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black uppercase text-[#475569]">
                    Total Peserta Terdata
                  </span>
                  <Users className="w-5 h-5 text-[#10B981]" />
                </div>
                <p className="text-3xl font-black text-[#064E3B]">
                  {totalParticipants}{" "}
                  <span className="text-xs font-bold text-[#475569]">
                    / 25+ Anak
                  </span>
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-kid-card border-2 border-[#FACC15]">
                <span className="text-xs font-black uppercase text-[#B45309] block">
                  Rata-Rata Pre-Test
                </span>
                <p className="text-3xl font-black text-[#D97706] mt-1">
                  {avgPre}%
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-kid-card border-2 border-[#10B981]">
                <span className="text-xs font-black uppercase text-[#059669] block">
                  Rata-Rata Post-Test
                </span>
                <p className="text-3xl font-black text-[#059669] mt-1">
                  {avgPost}%
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#ECFDF5] to-[#FEF9C3] rounded-3xl p-5 shadow-kid-card border-2 border-[#10B981]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black uppercase text-[#064E3B]">
                    Peningkatan Pemahaman
                  </span>
                  <TrendingUp className="w-5 h-5 text-[#059669]" />
                </div>
                <p className="text-3xl font-black text-[#059669]">
                  +{improvementDelta}%{" "}
                  <span className="text-xs font-black text-[#B45309]">
                    (↑{relativeImprovementPct}%)
                  </span>
                </p>
              </div>
            </section>

            {/* 2-Column Desktop Layout: Left 7 Cols = Visual Bar Chart, Right 5 Cols = Manual Entry Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 Cols: Visual Bar Comparison Per Participant */}
              <section className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 shadow-kid-card border-2 border-[#10B981] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-black text-[#064E3B] flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#10B981]" />
                      <span>Grafik Perbandingan Pre-Test vs Post-Test</span>
                    </h2>
                    <p className="text-xs font-bold text-[#475569]">
                      Rekapitulasi nilai pemahaman 4 pilar perlindungan anak
                      Desa Cibodas
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {records.map((rec) => {
                    const gain = Math.max(
                      0,
                      rec.postTestScore - rec.preTestScore
                    );
                    return (
                      <div
                        key={rec.id}
                        className="p-4 rounded-2xl bg-[#F7FBF7] border border-[#10B981]/30 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-2xl">{rec.avatar}</span>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-black text-[#064E3B] truncate">
                                {rec.code} — {rec.nickname}
                              </p>
                              <p className="text-[11px] font-bold text-[#475569]">
                                {rec.ageGroup} • {rec.updatedAt}
                              </p>
                            </div>
                          </div>

                          <span className="px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#10B981] text-[#059669] text-xs font-black shrink-0">
                            +{gain}% Naik
                          </span>
                        </div>

                        {/* Visual Pre vs Post Bars */}
                        <div className="space-y-1.5 text-xs font-black">
                          <div className="flex items-center gap-3">
                            <span className="w-20 text-[#B45309]">
                              Pre: {rec.preTestScore}%
                            </span>
                            <div className="flex-1 h-3 bg-[#FEF9C3] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#F59E0B] rounded-full"
                                style={{ width: `${rec.preTestScore}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="w-20 text-[#059669]">
                              Post: {rec.postTestScore}%
                            </span>
                            <div className="flex-1 h-3 bg-[#ECFDF5] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#10B981] rounded-full"
                                style={{ width: `${rec.postTestScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Right 5 Cols: Working "Tambah Data Peserta Manual" Form */}
              <section className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 shadow-kid-card border-2 border-[#FACC15] space-y-4">
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="w-6 h-6 text-[#059669]" />
                  <div>
                    <h3 className="text-base font-black text-[#064E3B]">
                      Tambah Data Peserta Manual
                    </h3>
                    <p className="text-xs font-bold text-[#475569]">
                      Input hasil lembar kuis kertas dari sesi lapangan Desa
                      Cibodas
                    </p>
                  </div>
                </div>

                <form onSubmit={handleAddRecord} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-black text-[#064E3B] mb-1">
                      Nama Panggilan / Inisial Anak (Anonim)
                    </label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Contoh: Zahra / Anak #06"
                      className="w-full px-3.5 py-3 text-xs sm:text-sm font-extrabold bg-[#F7FBF7] border-2 border-[#10B981]/50 rounded-2xl text-[#064E3B] focus:outline-none focus:border-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#064E3B] mb-1">
                      Kelompok Usia / Kelas
                    </label>
                    <select
                      value={newAge}
                      onChange={(e) => setNewAge(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs sm:text-sm font-extrabold bg-[#F7FBF7] border-2 border-[#10B981]/50 rounded-2xl text-[#064E3B]"
                    >
                      <option value="7-8 Tahun (SD Kelas 1-2)">
                        7-8 Tahun (SD Kelas 1-2)
                      </option>
                      <option value="9-10 Tahun (SD Kelas 3-4)">
                        9-10 Tahun (SD Kelas 3-4)
                      </option>
                      <option value="11-12 Tahun (SD Kelas 5-6)">
                        11-12 Tahun (SD Kelas 5-6)
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black text-[#B45309] mb-1">
                        Nilai Pre-Test (0-100%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        required
                        value={newPre}
                        onChange={(e) => setNewPre(Number(e.target.value))}
                        className="w-full px-3.5 py-3 text-xs sm:text-sm font-black bg-[#FEF9C3] border-2 border-[#FACC15] rounded-2xl text-[#064E3B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-[#059669] mb-1">
                        Nilai Post-Test (0-100%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        required
                        value={newPost}
                        onChange={(e) => setNewPost(Number(e.target.value))}
                        className="w-full px-3.5 py-3 text-xs sm:text-sm font-black bg-[#ECFDF5] border-2 border-[#10B981] rounded-2xl text-[#064E3B]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-xs sm:text-sm font-black border-2 border-[#064E3B] border-b-4 active:translate-y-0.5 transition-all"
                  >
                    + Simpan ke Rekapitulasi Evaluasi Desa Cibodas
                  </button>
                </form>
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
