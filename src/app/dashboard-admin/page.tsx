"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { useSelena } from "@/context/SelenaContext";
import {
  Stethoscope,
  ShieldAlert,
  Trash2,
  UserX,
  PlusCircle,
  BookOpen,
  CheckCircle2,
  Users,
  MessageSquareHeart,
  Send,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

type AdminTab = "moderasi" | "konsultasi" | "artikel";

export default function DashboardAdminPage() {
  const router = useRouter();
  const {
    currentUser,
    loginAsRole,
    groups,
    deleteGroupMessage,
    kickMemberFromGroup,
    articles,
    addArticle,
    psychologists,
    sendConsultationMessage,
  } = useSelena();

  const [activeTab, setActiveTab] = useState<AdminTab>("moderasi");
  const [showReportedOnly, setShowReportedOnly] = useState(false);

  // Tab 2: Inline Consultation Reply State
  const [selectedPsychId, setSelectedPsychId] = useState<string>(
    psychologists[0]?.id || "psy-1"
  );
  const [inlineReplyText, setInlineReplyText] = useState("");

  // Tab 3: New Article Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Trauma Healing");
  const [newReadTime, setNewReadTime] = useState("5 Menit Baca");
  const [newSummary, setNewSummary] = useState("");
  const [newContent, setNewContent] = useState("");

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2800);
  };

  // Real-time Stats Calculated from Context
  const totalActiveMembers = groups.reduce((acc, g) => acc + g.memberCount, 0);

  const allGroupMessages = groups.flatMap((grp) =>
    grp.messages.map((m) => ({
      ...m,
      groupId: grp.id,
      groupName: grp.name,
      groupIcon: grp.icon,
    }))
  );

  const reportedMessagesCount = allGroupMessages.filter(
    (m) => m.isReported
  ).length;

  const waitingConsultationsCount = psychologists.filter((psy) => {
    const last = psy.messages[psy.messages.length - 1];
    return last && last.senderRole === "user";
  }).length;

  const visibleGroupMessages = showReportedOnly
    ? allGroupMessages.filter((m) => m.isReported)
    : [...allGroupMessages].sort((a, b) =>
        a.isReported === b.isReported ? 0 : a.isReported ? -1 : 1
      );

  const activePsychThread =
    psychologists.find((p) => p.id === selectedPsychId) || psychologists[0];

  const handleEnterGroupAsPsychologist = (groupId: string) => {
    if (currentUser.role !== "admin") {
      loginAsRole("admin");
    }
    router.push(`/komunitas/${groupId}`);
  };

  const handleDeleteMessage = (groupId: string, msgId: string) => {
    deleteGroupMessage(groupId, msgId);
    showToast("Pesan berhasil dihapus dari ruang diskusi grup 🛡️");
  };

  const handleKickUser = (groupId: string, senderName: string) => {
    kickMemberFromGroup(groupId, senderName);
    showToast(
      `User "${senderName}" telah dikeluarkan dan seluruh pesannya dihapus dari grup.`
    );
  };

  const handleSendInlineReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineReplyText.trim() || !activePsychThread) return;
    sendConsultationMessage(
      activePsychThread.id,
      inlineReplyText,
      "psychologist",
      false
    );
    setInlineReplyText("");
    showToast(
      `Balasan terkirim ke ruang konsultasi ${activePsychThread.name.split(",")[0]} 💜`
    );
  };

  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    const paragraphs = newContent
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const created = addArticle({
      title: newTitle,
      category: newCategory,
      readTime: newReadTime,
      author:
        currentUser.role === "admin"
          ? currentUser.name
          : "dr. Nadya Larasati, M.Psi., Psikolog",
      summary: newSummary,
      content: paragraphs.length > 0 ? paragraphs : [newSummary],
    });

    setNewTitle("");
    setNewSummary("");
    setNewContent("");
    showToast(`Artikel "${created.title}" berhasil diterbitkan ke /edukasi! 📚`);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative pb-24 flex flex-col">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#1D1A39] text-white text-xs font-extrabold shadow-lg flex items-center gap-2 max-w-[92%]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Distinct Pastel Pink/Purple Header */}
      <header className="px-5 pt-5 pb-5 bg-gradient-to-br from-[#FFC8DD]/90 via-[#CDB4DB]/80 to-[#FAFAFA] rounded-b-3xl border-b border-[#CDB4DB]/40 shadow-gentle-card">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[11px] font-extrabold text-[#1D1A39] shadow-sm border border-[#CDB4DB]/40">
            <Stethoscope className="w-3.5 h-3.5 text-[#6B5779]" />
            <span>Panel Psikolog &amp; Moderator SELENA</span>
          </div>

          <Link
            href="/dashboard-user"
            className="px-3 py-1 rounded-full bg-white/90 hover:bg-white text-[11px] font-extrabold text-[#1D1A39] shadow-sm"
          >
            Lihat Mode Member →
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="/psychologists/nadya.svg"
            alt="dr. Nadya Larasati, M.Psi."
            className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0 bg-white"
          />
          <div className="min-w-0">
            <h1 className="text-lg font-extrabold text-[#1D1A39] truncate">
              Hai,{" "}
              {currentUser.role === "admin"
                ? currentUser.name
                : "dr. Nadya Larasati, M.Psi."}{" "}
              ✨
            </h1>
            <p className="text-xs text-[#4A4E69] font-semibold mt-0.5">
              Pusat kendali moderasi komunitas, konseling 1-on-1, dan publikasi
              psikoedukasi
            </p>
          </div>
        </div>

        {/* Real-Time Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <div className="bg-white/95 rounded-2xl p-3 shadow-sm border border-[#CDB4DB]/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#4A4E69]">
                Total Member Aktif
              </span>
              <Users className="w-3.5 h-3.5 text-[#6B5779]" />
            </div>
            <p className="text-xl font-extrabold text-[#1D1A39]">
              {totalActiveMembers}
            </p>
          </div>

          <div className="bg-white/95 rounded-2xl p-3 shadow-sm border border-rose-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#4A4E69]">
                Pesan Dilaporkan
              </span>
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            </div>
            <p className="text-xl font-extrabold text-rose-700">
              {reportedMessagesCount}
            </p>
          </div>

          <div className="bg-white/95 rounded-2xl p-3 shadow-sm border border-[#CDB4DB]/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#4A4E69]">
                Konsultasi Menunggu
              </span>
              <MessageSquareHeart className="w-3.5 h-3.5 text-emerald-700" />
            </div>
            <p className="text-xl font-extrabold text-[#1D1A39]">
              {waitingConsultationsCount || psychologists.length}
            </p>
          </div>
        </div>

        {/* 3 Interactive Management Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-white/90 rounded-2xl mt-4 border border-[#CDB4DB]/40 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("moderasi")}
            className={`py-2 px-2 rounded-xl text-[11px] font-extrabold transition-all ${
              activeTab === "moderasi"
                ? "bg-[#1D1A39] text-white shadow-sm"
                : "text-[#4A4E69] hover:text-[#1D1A39]"
            }`}
          >
            🛡️ Moderasi ({reportedMessagesCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("konsultasi")}
            className={`py-2 px-2 rounded-xl text-[11px] font-extrabold transition-all ${
              activeTab === "konsultasi"
                ? "bg-[#1D1A39] text-white shadow-sm"
                : "text-[#4A4E69] hover:text-[#1D1A39]"
            }`}
          >
            💬 Konsultasi ({psychologists.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("artikel")}
            className={`py-2 px-2 rounded-xl text-[11px] font-extrabold transition-all ${
              activeTab === "artikel"
                ? "bg-[#1D1A39] text-white shadow-sm"
                : "text-[#4A4E69] hover:text-[#1D1A39]"
            }`}
          >
            📚 Artikel ({articles.length})
          </button>
        </div>
      </header>

      {/* Tab Content Body */}
      <main className="px-5 pt-4 flex-1 flex flex-col gap-4">
        {/* TAB 1: MODERASI & LAPORAN GRUP */}
        {activeTab === "moderasi" && (
          <div className="space-y-4">
            {/* Quick Group Entry as Verified Psychologist */}
            <section className="bg-white rounded-3xl p-4 shadow-gentle-card border border-[#CDB4DB]/30">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#6B5779] mb-2">
                Masuk ke Ruang Grup sebagai Psikolog Terverifikasi
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {groups.map((grp) => (
                  <button
                    key={grp.id}
                    type="button"
                    onClick={() => handleEnterGroupAsPsychologist(grp.id)}
                    className="p-2.5 rounded-2xl bg-[#F4EEF8] hover:bg-[#CDB4DB]/50 text-left flex items-center justify-between gap-2 transition-all active:scale-95"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-extrabold text-[#1D1A39] block truncate">
                        {grp.icon} {grp.name}
                      </span>
                      <span className="text-[10px] font-semibold text-[#4A4E69]">
                        {grp.messages.length} pesan
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6B5779] shrink-0" />
                  </button>
                ))}
              </div>
            </section>

            {/* Messages Moderation List */}
            <section className="bg-white rounded-3xl p-4 shadow-gentle-card border border-[#CDB4DB]/30 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-extrabold text-[#1D1A39]">
                    Daftar Pesan &amp; Laporan Grup
                  </h2>
                  <p className="text-[11px] text-[#4A4E69]">
                    Pesan yang dilaporkan anggota ditandai warna merah muda
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowReportedOnly((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all ${
                    showReportedOnly
                      ? "bg-rose-600 text-white"
                      : "bg-[#F4EEF8] text-[#1D1A39]"
                  }`}
                >
                  {showReportedOnly ? "Semua Pesan" : "Dilaporkan Saja"}
                </button>
              </div>

              {visibleGroupMessages.length === 0 ? (
                <div className="p-5 rounded-2xl bg-[#D8F3DC]/60 text-center">
                  <p className="text-xs font-extrabold text-[#1D1A39]">
                    🌿 Tidak ada pesan yang dilaporkan saat ini. Seluruh grup
                    aman dan kondusif!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {visibleGroupMessages.map((msg) => (
                    <div
                      key={`${msg.groupId}-${msg.id}`}
                      className={`p-3.5 rounded-2xl border space-y-2 transition-all ${
                        msg.isReported
                          ? "bg-[#FDE2E4] border-rose-300 shadow-xs"
                          : "bg-[#FAFAFA] border-[#CDB4DB]/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-extrabold text-[#1D1A39]">
                            {msg.senderName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-white text-[#6B5779] text-[10px] font-bold border border-[#CDB4DB]/30">
                            {msg.groupIcon} {msg.groupName}
                          </span>
                          {msg.isReported && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-extrabold">
                              ⚠️ Dilaporkan Member
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-semibold text-[#4A4E69] shrink-0">
                          {msg.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-[#1D1A39] font-medium leading-relaxed">
                        “{msg.text}”
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteMessage(msg.groupId, msg.id)
                          }
                          className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-extrabold flex items-center justify-center gap-1 active:scale-95 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus Pesan</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleKickUser(msg.groupId, msg.senderName)
                          }
                          className="flex-1 py-2 px-3 rounded-xl bg-[#1D1A39] hover:bg-[#2c2754] text-white text-[11px] font-extrabold flex items-center justify-center gap-1 active:scale-95 transition-all"
                        >
                          <UserX className="w-3.5 h-3.5" />
                          <span>Keluarkan User (Kick)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB 2: KONSULTASI MEMBER (INLINE REPLY) */}
        {activeTab === "konsultasi" && (
          <div className="space-y-4">
            {/* Thread Selector */}
            <section className="bg-white rounded-3xl p-4 shadow-gentle-card border border-[#CDB4DB]/30 space-y-2.5">
              <h2 className="text-sm font-extrabold text-[#1D1A39]">
                Pilih Sesi Konsultasi 1-on-1 Member
              </h2>
              <div className="space-y-2">
                {psychologists.map((psy) => {
                  const isSelected = psy.id === activePsychThread?.id;
                  const lastMsg = psy.messages[psy.messages.length - 1];
                  return (
                    <button
                      key={psy.id}
                      type="button"
                      onClick={() => setSelectedPsychId(psy.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-[#F4EEF8] border-[#1D1A39] shadow-xs"
                          : "bg-[#FAFAFA] border-[#CDB4DB]/30 hover:bg-[#F4EEF8]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={psy.avatarUrl || "/psychologists/nadya.svg"}
                          alt={psy.name}
                          className="w-11 h-11 rounded-2xl object-cover border border-[#CDB4DB] shrink-0 bg-white"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-extrabold text-[#1D1A39] truncate">
                              {psy.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#FFC8DD] text-[#1D1A39] text-[9px] font-extrabold">
                              {psy.messages.length} pesan
                            </span>
                          </div>
                          <p className="text-[11px] text-[#4A4E69] truncate mt-0.5">
                            {lastMsg
                              ? `${lastMsg.senderName}: ${lastMsg.text}`
                              : "Belum ada pesan"}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#6B5779] shrink-0" />
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Inline Reply Box for Selected Thread */}
            {activePsychThread && (
              <section className="bg-white rounded-3xl p-4 shadow-gentle-card border border-[#CDB4DB]/40 space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#CDB4DB]/25">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#6B5779]">
                      Balas Langsung dari Dashboard Admin
                    </span>
                    <h3 className="text-sm font-extrabold text-[#1D1A39]">
                      Sesi: {activePsychThread.name}
                    </h3>
                  </div>

                  <Link
                    href={`/konsultasi/${activePsychThread.id}`}
                    className="px-3 py-1.5 rounded-xl bg-[#F4EEF8] text-[#1D1A39] text-[11px] font-extrabold flex items-center gap-1"
                  >
                    <span>Layar Penuh</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                {/* Conversation History */}
                <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                  {activePsychThread.messages.map((msg) => {
                    const isPsych = msg.senderRole === "psychologist";
                    return (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-2xl text-xs ${
                          isPsych
                            ? "bg-[#F4EEF8] border border-[#CDB4DB]/50 ml-4"
                            : "bg-[#FFF0F5] border border-[#FFC8DD] mr-4"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-extrabold text-[#6B5779] mb-1">
                          <span>
                            {isPsych
                              ? `🩺 ${msg.senderName}`
                              : `🌸 Member: ${msg.senderName}`}
                          </span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="text-[#1D1A39] font-medium leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Inline Reply Form */}
                <form
                  onSubmit={handleSendInlineReply}
                  className="pt-2 border-t border-[#CDB4DB]/25 flex gap-2"
                >
                  <input
                    type="text"
                    value={inlineReplyText}
                    onChange={(e) => setInlineReplyText(e.target.value)}
                    placeholder="Ketik balasan psikolog untuk member ini..."
                    className="flex-1 px-3.5 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                  />
                  <button
                    type="submit"
                    disabled={!inlineReplyText.trim()}
                    className="px-4 py-2.5 rounded-2xl bg-[#1D1A39] hover:bg-[#2c2754] disabled:opacity-40 text-white text-xs font-extrabold flex items-center gap-1.5 shrink-0 active:scale-95 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Balas</span>
                  </button>
                </form>
              </section>
            )}
          </div>
        )}

        {/* TAB 3: PUBLIKASI ARTIKEL EDUKASI */}
        {activeTab === "artikel" && (
          <div className="space-y-4">
            <section className="bg-white rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/35">
              <div className="flex items-center gap-2 mb-3">
                <PlusCircle className="w-5 h-5 text-[#6B5779]" />
                <div>
                  <h2 className="text-base font-extrabold text-[#1D1A39]">
                    Tulis &amp; Terbitkan Artikel Edukasi
                  </h2>
                  <p className="text-xs text-[#4A4E69]">
                    Artikel baru otomatis tampil di /edukasi dan Beranda Member
                  </p>
                </div>
              </div>

              <form onSubmit={handlePublishArticle} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-extrabold text-[#1D1A39] mb-1">
                    Judul Artikel Edukasi
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: Langkah Aman Menghadapi Trigger di Tempat Kerja"
                    className="w-full px-3.5 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1A39] mb-1">
                      Kategori
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39]"
                    >
                      <option value="Trauma Healing">Trauma Healing</option>
                      <option value="Self-Love">Self-Love</option>
                      <option value="Panic Attack">Panic Attack</option>
                      <option value="Hukum & Hak">Hukum &amp; Hak</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#1D1A39] mb-1">
                      Estimasi Waktu Baca
                    </label>
                    <input
                      type="text"
                      value={newReadTime}
                      onChange={(e) => setNewReadTime(e.target.value)}
                      placeholder="5 Menit Baca"
                      className="w-full px-3 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#1D1A39] mb-1">
                    Ringkasan Singkat (Intisari)
                  </label>
                  <input
                    type="text"
                    required
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Ringkasan empatik yang tampil di kartu artikel..."
                    className="w-full px-3.5 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#1D1A39] mb-1">
                    Konten Lengkap (Pisahkan paragraf dengan Enter)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Tulis isi panduan psikoedukasi secara lengkap dan menenangkan..."
                    className="w-full px-3.5 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#CDB4DB] hover:bg-[#FFC8DD] text-[#1D1A39] text-xs font-extrabold shadow-soft-purple active:scale-95 transition-all"
                >
                  Terbitkan Artikel Sekarang →
                </button>
              </form>
            </section>

            {/* Published Articles List */}
            <section className="bg-white rounded-3xl p-4 shadow-gentle-card border border-[#CDB4DB]/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#1D1A39] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#6B5779]" />
                  <span>Daftar Artikel Terbit ({articles.length})</span>
                </h3>
                <Link
                  href="/edukasi"
                  className="text-xs font-extrabold text-[#6B5779] hover:underline"
                >
                  Lihat /edukasi →
                </Link>
              </div>

              <div className="space-y-2">
                {articles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/edukasi/${art.slug}`}
                    className="p-3 rounded-2xl bg-[#FAFAFA] hover:bg-[#F4EEF8] border border-[#CDB4DB]/25 flex items-center justify-between gap-2 transition-all"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold text-[#6B5779] uppercase">
                        {art.category} • {art.date}
                      </span>
                      <p className="text-xs font-extrabold text-[#1D1A39] truncate mt-0.5">
                        {art.title}
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-[#6B5779] shrink-0">
                      Baca →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
