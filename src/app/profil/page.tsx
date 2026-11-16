"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { useSelena } from "@/context/SelenaContext";
import { ANONYMOUS_ALIASES } from "@/data/mockData";
import {
  User,
  Edit3,
  Check,
  RefreshCw,
  Bookmark,
  Smile,
  ShieldAlert,
  LogOut,
  RotateCcw,
  ChevronRight,
  Bell,
  Lock,
  Sparkles,
  Trash2,
} from "lucide-react";

const AVATAR_COLORS = [
  { label: "Lavender", hex: "#CDB4DB" },
  { label: "Blush Pink", hex: "#FFC8DD" },
  { label: "Sage Mint", hex: "#D8F3DC" },
  { label: "Soft Sky", hex: "#BDE0FE" },
];

export default function ProfilPage() {
  const router = useRouter();
  const {
    currentUser,
    updateUserProfile,
    loginAsRole,
    logout,
    articles,
    bookmarkedIds,
    toggleBookmark,
    moodHistory,
    gratitudeNotes,
    unreadNotificationCount,
    resetDemoData,
  } = useSelena();

  const [isEditing, setIsEditing] = useState(false);
  const [aliasInput, setAliasInput] = useState(currentUser.alias);
  const [nameInput, setNameInput] = useState(currentUser.name);
  const [bioInput, setBioInput] = useState(currentUser.bio);
  const [selectedColor, setSelectedColor] = useState(
    currentUser.avatarColor || "#CDB4DB"
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    setAliasInput(currentUser.alias);
    setNameInput(currentUser.name);
    setBioInput(currentUser.bio);
    setSelectedColor(currentUser.avatarColor || "#CDB4DB");
  }, [currentUser]);

  const savedArticles = articles.filter((a) => bookmarkedIds.includes(a.id));

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      alias: aliasInput.trim() || "Kupu-Kupu Senja",
      name: nameInput.trim() || "Maya Putri",
      bio: bioInput.trim(),
      avatarColor: selectedColor,
    });
    setIsEditing(false);
    showToast("Profil & identitas anonim berhasil diperbarui 💜");
  };

  const handleRandomAlias = () => {
    const filtered = ANONYMOUS_ALIASES.filter((a) => a !== aliasInput);
    const randomPick =
      filtered[Math.floor(Math.random() * filtered.length)] ||
      "Kupu-Kupu Senja";
    setAliasInput(randomPick);
  };

  const handleRoleSwitch = (targetRole: "user" | "admin") => {
    loginAsRole(targetRole);
    showToast(
      targetRole === "admin"
        ? "Beralih ke Mode Psikolog / Admin 🩺"
        : "Beralih ke Mode Member Penyintas 🌸"
    );
    router.push(
      targetRole === "admin" ? "/dashboard-admin" : "/dashboard-user"
    );
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleResetDemo = () => {
    resetDemoData();
    showToast("Data demo berhasil direset ke kondisi awal ✨");
  };

  const userInitials = (currentUser.alias || "KS")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const moodEmojiMap: Record<string, string> = {
    happy: "😊",
    neutral: "😐",
    sad: "😔",
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative pb-24 flex flex-col">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#1D1A39] text-white text-xs font-extrabold shadow-lg flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFC8DD] shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="px-5 pt-6 pb-5 bg-gradient-to-b from-[#CDB4DB]/80 via-[#F4EEF8] to-[#FAFAFA] rounded-b-3xl border-b border-[#CDB4DB]/30">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[11px] font-extrabold text-[#1D1A39] shadow-sm border border-[#CDB4DB]/40">
            <Lock className="w-3.5 h-3.5 text-[#6B5779]" />
            <span>Identitas &amp; Privasi Terlindungi</span>
          </span>

          <Link
            href="/notifikasi"
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white text-xs font-extrabold text-[#1D1A39] shadow-sm"
          >
            <Bell className="w-4 h-4 text-[#6B5779]" />
            <span>Notifikasi</span>
            {unreadNotificationCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#1D1A39] text-white text-[10px]">
                {unreadNotificationCount}
              </span>
            )}
          </Link>
        </div>

        {/* Profile Summary Card */}
        <div className="bg-white rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/30">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                style={{ backgroundColor: currentUser.avatarColor || "#CDB4DB" }}
                className="w-16 h-16 rounded-3xl flex items-center justify-center text-[#1D1A39] font-extrabold text-xl shadow-sm ring-2 ring-white shrink-0"
              >
                {userInitials}
              </div>
              <div className="min-w-0">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F4EEF8] text-[#6B5779] text-[10px] font-extrabold uppercase tracking-wider">
                  {currentUser.role === "admin"
                    ? "🩺 Psikolog / Admin"
                    : "🌸 Member Anonim"}
                </span>
                <h1 className="text-lg font-extrabold text-[#1D1A39] truncate mt-0.5">
                  {currentUser.alias}
                </h1>
                <p className="text-xs text-[#4A4E69] font-semibold truncate">
                  {currentUser.name} • {currentUser.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="px-3 py-2 rounded-2xl bg-[#F4EEF8] hover:bg-[#CDB4DB]/50 text-[#1D1A39] text-xs font-extrabold flex items-center gap-1 shrink-0 transition-all active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? "Batal" : "Edit"}</span>
            </button>
          </div>

          <p className="text-xs text-[#1D1A39]/85 mt-3.5 p-3 rounded-2xl bg-[#FAFAFA] border border-[#CDB4DB]/25 leading-relaxed font-medium">
            “{currentUser.bio}”
          </p>

          {/* Edit Form Drawer */}
          {isEditing && (
            <form
              onSubmit={handleSaveProfile}
              className="mt-4 pt-4 border-t border-[#CDB4DB]/30 space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="edit-alias"
                    className="text-xs font-extrabold text-[#1D1A39]"
                  >
                    Alias Anonim Publik
                  </label>
                  <button
                    type="button"
                    onClick={handleRandomAlias}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#CDB4DB] text-[#1D1A39] text-[11px] font-extrabold active:scale-95"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Acak Alias</span>
                  </button>
                </div>
                <input
                  id="edit-alias"
                  type="text"
                  value={aliasInput}
                  onChange={(e) => setAliasInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-extrabold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-name"
                  className="block text-xs font-extrabold text-[#1D1A39] mb-1"
                >
                  Nama Panggilan (Privat)
                </label>
                <input
                  id="edit-name"
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-bio"
                  className="block text-xs font-extrabold text-[#1D1A39] mb-1"
                >
                  Catatan Diri / Bio Singkat
                </label>
                <textarea
                  id="edit-bio"
                  rows={2}
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                />
              </div>

              <div>
                <span className="block text-xs font-extrabold text-[#1D1A39] mb-1.5">
                  Warna Avatar
                </span>
                <div className="flex items-center gap-2.5">
                  {AVATAR_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setSelectedColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center border-2 transition-all ${
                        selectedColor === c.hex
                          ? "border-[#1D1A39] scale-110 shadow-sm"
                          : "border-white"
                      }`}
                    >
                      {selectedColor === c.hex && (
                        <Check className="w-4 h-4 text-[#1D1A39]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-2xl bg-[#1D1A39] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Perubahan Profil</span>
              </button>
            </form>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-4 flex-1 flex flex-col gap-6">
        {/* Saved / Bookmarked Articles Section */}
        <section className="bg-white rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/25">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#6B5779]" />
              <h2 className="text-base font-extrabold text-[#1D1A39]">
                Artikel Tersimpan ({savedArticles.length})
              </h2>
            </div>
            <Link
              href="/edukasi"
              className="text-xs font-extrabold text-[#6B5779] hover:underline"
            >
              Cari Artikel →
            </Link>
          </div>

          {savedArticles.length === 0 ? (
            <div className="p-4 rounded-2xl bg-[#FAFAFA] text-center border border-dashed border-[#CDB4DB]/50">
              <p className="text-xs text-[#4A4E69] font-semibold">
                Belum ada artikel yang disimpan. Klik ikon Bookmark pada artikel
                edukasi untuk membacanya kembali kapan saja.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {savedArticles.map((art) => (
                <div
                  key={art.id}
                  className="p-3.5 rounded-2xl bg-[#FAFAFA] hover:bg-[#F4EEF8]/60 border border-[#CDB4DB]/25 flex items-center justify-between gap-3 transition-all"
                >
                  <Link
                    href={`/edukasi/${art.slug}`}
                    className="flex-1 min-w-0"
                  >
                    <span className="text-[10px] font-extrabold text-[#6B5779] uppercase">
                      {art.category} • {art.readTime}
                    </span>
                    <h3 className="text-xs font-extrabold text-[#1D1A39] truncate mt-0.5">
                      {art.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Link
                      href={`/edukasi/${art.slug}`}
                      className="px-2.5 py-1.5 rounded-xl bg-[#CDB4DB] text-[#1D1A39] text-[11px] font-extrabold flex items-center gap-0.5"
                    >
                      <span>Baca</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(art.id)}
                      aria-label="Hapus simpanan"
                      className="p-1.5 rounded-xl bg-white text-[#4A4E69] hover:text-rose-600 border border-gray-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Mood History & Gratitude Summary Section */}
        <section className="bg-white rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/25">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-[#6B5779]" />
              <h2 className="text-base font-extrabold text-[#1D1A39]">
                Riwayat Perjalanan Emosi
              </h2>
            </div>
            <span className="text-[11px] font-bold text-[#6B5779]">
              {gratitudeNotes.length} Catatan Syukur
            </span>
          </div>

          <div className="space-y-2.5">
            {moodHistory.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className="p-3 rounded-2xl bg-[#F4EEF8]/50 border border-[#CDB4DB]/25 flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-xl shadow-sm shrink-0">
                  {moodEmojiMap[entry.mood] || "🌸"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-[#1D1A39]">
                      Mood: {entry.label}
                    </span>
                    <span className="text-[10px] font-semibold text-[#4A4E69]">
                      {entry.date}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A4E69] mt-0.5 leading-relaxed">
                    {entry.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Role Switcher & Demo Controls for Judges/Testing */}
        <section className="bg-gradient-to-br from-[#F4EEF8] via-white to-[#FFF0F5] rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/40 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#6B5779]" />
            <h2 className="text-sm font-extrabold text-[#1D1A39]">
              Pengaturan Peran &amp; Mode Pengujian
            </h2>
          </div>
          <p className="text-xs text-[#4A4E69] leading-relaxed">
            Uji coba alur aplikasi dari sudut pandang Member (Penyintas) maupun
            Psikolog/Admin Moderator secara langsung:
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleRoleSwitch("user")}
              className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold border transition-all active:scale-95 ${
                currentUser.role === "user"
                  ? "bg-[#CDB4DB] text-[#1D1A39] border-[#CDB4DB] shadow-sm"
                  : "bg-white text-[#4A4E69] border-[#CDB4DB]/40"
              }`}
            >
              🌸 Mode Member
            </button>

            <button
              type="button"
              onClick={() => handleRoleSwitch("admin")}
              className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold border transition-all active:scale-95 ${
                currentUser.role === "admin"
                  ? "bg-[#FFC8DD] text-[#1D1A39] border-[#FFC8DD] shadow-sm"
                  : "bg-white text-[#4A4E69] border-[#CDB4DB]/40"
              }`}
            >
              🩺 Mode Admin/Psikolog
            </button>
          </div>

          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleResetDemo}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-white hover:bg-[#F4EEF8] text-[#1D1A39] border border-[#CDB4DB]/50 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data Demo</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-[#1D1A39] hover:bg-[#2c2754] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar (Logout)</span>
            </button>
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}

