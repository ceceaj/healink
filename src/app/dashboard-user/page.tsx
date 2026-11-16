"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { useSelena } from "@/context/SelenaContext";
import { MoodType } from "@/data/mockData";
import {
  Bell,
  Bookmark,
  MessageCircleHeart,
  Users,
  Stethoscope,
  Sparkles,
  Send,
  Heart,
  Clock,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface MoodOption {
  id: MoodType;
  emoji: string;
  label: string;
  title: string;
  affirmation: string;
  activeBg: string;
  cardBg: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  {
    id: "happy",
    emoji: "😊",
    label: "Senang",
    title: "Hangat & Bersyukur 🌸",
    affirmation:
      "Senang mendengar hatimu terasa hangat hari ini! Rayakan ketenangan ini tanpa rasa bersalah, karena kamu sangat layak merasakan kebahagiaan dan rasa aman.",
    activeBg: "bg-[#FFC8DD] border-[#FFC8DD] shadow-soft-pink",
    cardBg: "bg-[#FFF0F5] border-[#FFC8DD]",
  },
  {
    id: "neutral",
    emoji: "😐",
    label: "Biasa Saja",
    title: "Tenang & Mengambil Jeda 🌿",
    affirmation:
      "Tidak apa-apa merasa biasa saja hari ini. Pemulihan tidak selalu harus penuh lonjakan emosi, mengambil jeda tenang juga bagian penting dari pulih.",
    activeBg: "bg-[#CDB4DB] border-[#CDB4DB] shadow-soft-purple",
    cardBg: "bg-[#F4EEF8] border-[#CDB4DB]",
  },
  {
    id: "sad",
    emoji: "😔",
    label: "Sedih",
    title: "Perasaanmu Valid & Didengar 💜",
    affirmation:
      "Tarik napas perlahan, tidak apa-apa jika hari ini terasa berat. Kamu tidak sendirian di ruang aman ini, dan kamu tidak harus memikul semuanya sendiri.",
    activeBg: "bg-[#D8F3DC] border-emerald-300 shadow-sm",
    cardBg: "bg-[#D8F3DC]/60 border-emerald-200",
  },
];

export default function DashboardUserPage() {
  const router = useRouter();
  const {
    currentUser,
    todayMood,
    setTodayMood,
    gratitudeNotes,
    addGratitudeNote,
    articles,
    bookmarkedIds,
    toggleBookmark,
    unreadNotificationCount,
  } = useSelena();

  const [gratitudeInput, setGratitudeInput] = useState("");
  const [gratitudeJustAdded, setGratitudeJustAdded] = useState(false);

  const selectedMoodObj = MOOD_OPTIONS.find((m) => m.id === todayMood);

  const handleGratitudeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gratitudeInput.trim()) return;
    addGratitudeNote(gratitudeInput);
    setGratitudeInput("");
    setGratitudeJustAdded(true);
    setTimeout(() => setGratitudeJustAdded(false), 3000);
  };

  const userInitials = (currentUser.alias || "KS")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative pb-24 flex flex-col">
      {/* Sticky Pastel Purple Header */}
      <header className="sticky top-0 z-40 w-full px-5 pt-4 pb-4 bg-gradient-to-r from-[#CDB4DB]/95 via-[#F4EEF8]/95 to-[#FFC8DD]/90 backdrop-blur-xl border-b border-[#CDB4DB]/40 rounded-b-3xl shadow-gentle-card">
        <div className="flex items-center justify-between gap-3">
          {/* Clickable Avatar + User Alias & Greeting */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/profil"
              aria-label="Buka Profil Saya"
              className="relative shrink-0 group"
            >
              <div
                style={{ backgroundColor: currentUser.avatarColor || "#CDB4DB" }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#1D1A39] font-extrabold text-sm shadow-sm ring-2 ring-white group-hover:scale-105 transition-transform"
              >
                {userInitials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-white" />
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-[#6B5779]">
                  Identitas Anonim
                </span>
              </div>
              <Link
                href="/profil"
                className="text-base font-extrabold text-[#1D1A39] truncate block hover:underline mt-0.5"
              >
                Hai, {currentUser.alias} ✨
              </Link>
              <p className="text-[11px] text-[#4A4E69] font-semibold truncate">
                Ruang amanmu siap menemanimu hari ini
              </p>
            </div>
          </div>

          {/* Clickable Notification Bell + Profile Shortcut */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/notifikasi"
              aria-label="Lihat Notifikasi"
              className="relative w-11 h-11 rounded-2xl bg-white/90 hover:bg-white flex items-center justify-center text-[#1D1A39] shadow-sm active:scale-95 transition-all"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-[#1D1A39] text-white text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white">
                  {unreadNotificationCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="px-5 pt-4 flex flex-col gap-6">
        {/* Interactive Mood Tracker Card */}
        <section
          aria-label="Mood Tracker Harian"
          className="bg-white rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/30"
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-[#1D1A39]">
                  Bagaimana perasaanmu hari ini?
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F4EEF8] text-[#6B5779] font-extrabold">
                  Check-In Emosi
                </span>
              </div>
              <p className="text-xs text-[#4A4E69] mt-0.5">
                Sentuh satu emosi untuk menyimpan kondisi hatimu saat ini
              </p>
            </div>
          </div>

          {/* 3 Interactive Mood Buttons */}
          <div className="grid grid-cols-3 gap-3 my-3">
            {MOOD_OPTIONS.map((mood) => {
              const isSelected = todayMood === mood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setTodayMood(mood.id)}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 rounded-2xl border transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? `${mood.activeBg} scale-[1.02]`
                      : "bg-[#F4EEF8]/60 border-transparent hover:bg-[#F4EEF8]"
                  }`}
                >
                  <span className="text-3xl leading-none">{mood.emoji}</span>
                  <span
                    className={`text-xs ${
                      isSelected
                        ? "font-extrabold text-[#1D1A39]"
                        : "font-semibold text-[#4A4E69]"
                    }`}
                  >
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tailored Empathetic Affirmation Card + Button to Chat with SELENA AI */}
          {selectedMoodObj ? (
            <div
              className={`mt-3 p-4 rounded-2xl border ${selectedMoodObj.cardBg} transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold text-[#1D1A39]">
                  {selectedMoodObj.title}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-[#6B5779]">
                  Tersimpan ✓
                </span>
              </div>
              <p className="text-xs text-[#1D1A39]/90 font-medium leading-relaxed">
                {selectedMoodObj.affirmation}
              </p>
              <div className="mt-3 pt-2.5 border-t border-[#1D1A39]/10 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-[#4A4E69]">
                  Ingin bercerita lebih lanjut?
                </span>
                <Link
                  href="/chatbot"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1D1A39] text-white text-xs font-extrabold shadow-sm hover:opacity-95 active:scale-95 transition-all"
                >
                  <MessageCircleHeart className="w-3.5 h-3.5 text-[#FFC8DD]" />
                  <span>Cerita ke SELENA AI →</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-2 p-3 rounded-2xl bg-[#F4EEF8]/50 border border-dashed border-[#CDB4DB] text-center">
              <p className="text-xs text-[#4A4E69] font-semibold">
                ✨ Pilih salah satu mood di atas untuk membuka pesan afirmasi
                khusus untukmu hari ini.
              </p>
            </div>
          )}
        </section>

        {/* Quick Access Grid: 3 Colorful Pastel Cards */}
        <section aria-label="Akses Cepat Layanan SELENA">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-base font-extrabold text-[#1D1A39]">
              Layanan Pendampingan Cepat
            </h2>
            <span className="text-[11px] font-bold text-[#6B5779]">
              Siaga 24/7
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Card 1: /chatbot */}
            <Link
              href="/chatbot"
              className="flex flex-col justify-between p-3.5 rounded-3xl bg-gradient-to-br from-[#CDB4DB]/60 to-[#F4EEF8] border border-[#CDB4DB]/50 shadow-gentle-card hover:scale-[1.02] active:scale-95 transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#1D1A39] shadow-sm mb-2.5">
                <MessageCircleHeart className="w-5 h-5 text-[#6B5779]" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-[#1D1A39] leading-snug">
                  Curhat AI 24/7
                </h3>
                <p className="text-[10px] text-[#4A4E69] font-semibold mt-0.5">
                  Respon instan &amp; empatik
                </p>
              </div>
            </Link>

            {/* Card 2: /komunitas */}
            <Link
              href="/komunitas"
              className="flex flex-col justify-between p-3.5 rounded-3xl bg-gradient-to-br from-[#FFC8DD]/65 to-[#FFF0F5] border border-[#FFC8DD]/60 shadow-gentle-card hover:scale-[1.02] active:scale-95 transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#1D1A39] shadow-sm mb-2.5">
                <Users className="w-5 h-5 text-[#1D1A39]" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-[#1D1A39] leading-snug">
                  Grup Dukungan
                </h3>
                <p className="text-[10px] text-[#4A4E69] font-semibold mt-0.5">
                  Ruang aman anonim
                </p>
              </div>
            </Link>

            {/* Card 3: /konsultasi */}
            <Link
              href="/konsultasi"
              className="flex flex-col justify-between p-3.5 rounded-3xl bg-gradient-to-br from-[#D8F3DC] to-[#F0FFF4] border border-emerald-200 shadow-gentle-card hover:scale-[1.02] active:scale-95 transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#1D1A39] shadow-sm mb-2.5">
                <Stethoscope className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-[#1D1A39] leading-snug">
                  Tanya Psikolog
                </h3>
                <p className="text-[10px] text-[#4A4E69] font-semibold mt-0.5">
                  Konseling 1-on-1
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Horizontal Scrollable Section: Rekomendasi Artikel Edukasi */}
        <section aria-label="Rekomendasi Artikel Edukasi">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-base font-extrabold text-[#1D1A39]">
                Rekomendasi Artikel Edukasi
              </h2>
              <p className="text-xs text-[#4A4E69]">
                Panduan psikoedukasi &amp; hak perlindungan penyintas
              </p>
            </div>
            <Link
              href="/edukasi"
              className="text-xs font-extrabold text-[#6B5779] hover:underline flex items-center gap-0.5 shrink-0"
            >
              <span>Semua</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
            {articles.map((article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);
              return (
                <div
                  key={article.id}
                  onClick={() => router.push(`/edukasi/${article.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      router.push(`/edukasi/${article.slug}`);
                    }
                  }}
                  className="w-[268px] shrink-0 bg-white rounded-3xl p-4 shadow-gentle-card border border-[#CDB4DB]/25 flex flex-col justify-between cursor-pointer hover:border-[#CDB4DB] transition-all text-left"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#F4EEF8] text-[#6B5779] text-[10px] font-extrabold uppercase tracking-wider">
                        {article.category}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(article.id);
                        }}
                        aria-label={
                          isBookmarked
                            ? "Hapus dari simpanan"
                            : "Simpan artikel"
                        }
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-90 ${
                          isBookmarked
                            ? "bg-[#FFC8DD] text-[#1D1A39]"
                            : "bg-[#FAFAFA] text-[#4A4E69] hover:bg-[#F4EEF8]"
                        }`}
                      >
                        <Bookmark
                          className="w-4 h-4"
                          fill={isBookmarked ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <h3 className="text-sm font-extrabold text-[#1D1A39] line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#4A4E69] mt-1.5 line-clamp-2 leading-relaxed text-justify">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-[#CDB4DB]/20 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#4A4E69] flex items-center gap-1 truncate">
                      <Clock className="w-3.5 h-3.5 text-[#6B5779] shrink-0" />
                      <span>{article.readTime}</span>
                    </span>
                    <span className="font-extrabold text-[#6B5779] shrink-0">
                      Baca Artikel →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Misi Harian Syukur (Interactive Gratitude Journal) */}
        <section
          aria-label="Misi Harian Syukur"
          className="rounded-3xl bg-gradient-to-br from-[#FFF0F5] via-white to-[#F4EEF8] p-5 shadow-gentle-card border border-[#FFC8DD]/60"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#1D1A39] text-[11px] font-extrabold shadow-sm border border-[#FFC8DD]/50">
              <Sparkles className="w-3.5 h-3.5 text-[#6B5779]" />
              <span>Misi Harian Syukur</span>
            </span>
            <span className="text-[11px] font-bold text-[#6B5779]">
              {gratitudeNotes.length} Catatan Tersimpan
            </span>
          </div>

          <h2 className="text-base font-extrabold text-[#1D1A39] leading-snug">
            Tulis 1 hal kecil yang kamu syukuri hari ini
          </h2>
          <p className="text-xs text-[#4A4E69] mt-0.5 leading-relaxed">
            Mengakui hal sederhana yang menenangkan membantu sistem sarafmu
            merasakan kembali sinyal aman.
          </p>

          <form onSubmit={handleGratitudeSubmit} className="mt-3 flex gap-2">
            <input
              type="text"
              value={gratitudeInput}
              onChange={(e) => setGratitudeInput(e.target.value)}
              placeholder="Contoh: Hari ini aku bisa tidur lebih nyenyak..."
              className="flex-1 px-3.5 py-2.5 text-xs font-semibold bg-white border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] placeholder:text-[#4A4E69]/60 focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
            />
            <button
              type="submit"
              disabled={!gratitudeInput.trim()}
              className="px-4 py-2.5 rounded-2xl bg-[#CDB4DB] hover:bg-[#FFC8DD] disabled:opacity-40 text-[#1D1A39] text-xs font-extrabold shadow-sm flex items-center gap-1.5 active:scale-95 transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Simpan</span>
            </button>
          </form>

          {gratitudeJustAdded && (
            <div className="mt-2.5 px-3 py-2 rounded-xl bg-[#D8F3DC] text-[#1D1A39] text-xs font-bold flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
              <span>Catatan syukurmu tersimpan dengan hangat di jurnalmu!</span>
            </div>
          )}

          {/* List of Saved Gratitude Notes */}
          <div className="mt-4 space-y-2.5">
            {gratitudeNotes.slice(0, 4).map((note) => (
              <div
                key={note.id}
                className="p-3 rounded-2xl bg-white/90 border border-[#CDB4DB]/25 shadow-sm flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D8F3DC]/80 text-[#1D1A39] text-[10px] font-extrabold">
                    🌿 Sinyal Aman Terkirim
                  </span>
                  <span className="text-[10px] font-semibold text-[#4A4E69]">
                    {note.date}
                  </span>
                </div>
                <p className="text-xs text-[#1D1A39] font-semibold leading-relaxed">
                  “{note.text}”
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Safe Sanctuary Bottom Info Banner */}
        <div className="p-3.5 rounded-2xl bg-[#F4EEF8]/70 border border-[#CDB4DB]/30 flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#6B5779] shrink-0" />
          <p className="text-[11px] text-[#4A4E69] font-semibold leading-relaxed">
            Seluruh jurnal syukur dan riwayat emosimu tersimpan secara privat di
            perangkatmu.
          </p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
