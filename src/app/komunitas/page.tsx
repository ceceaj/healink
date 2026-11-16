"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { useSelena } from "@/context/SelenaContext";
import { CommunityGroup } from "@/data/mockData";
import {
  Search,
  Users,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  X,
  ArrowRight,
  HeartHandshake,
  Stethoscope,
} from "lucide-react";

export default function KomunitasPage() {
  const router = useRouter();
  const { groups, joinGroup, currentUser } = useSelena();

  const [activeTab, setActiveTab] = useState<"grup-saya" | "jelajahi">(
    "jelajahi"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingJoinGroup, setPendingJoinGroup] =
    useState<CommunityGroup | null>(null);
  const [joinStep, setJoinStep] = useState<"commitment" | "success">(
    "commitment"
  );
  const [recentlyJoinedId, setRecentlyJoinedId] = useState<string | null>(null);

  const filteredGroups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return groups.filter((g) => {
      if (!q) return true;
      return (
        g.name.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.supervisorName.toLowerCase().includes(q)
      );
    });
  }, [groups, searchQuery]);

  const myJoinedGroups = useMemo(
    () => filteredGroups.filter((g) => g.isJoined),
    [filteredGroups]
  );

  const handleJoinClick = (group: CommunityGroup) => {
    setPendingJoinGroup(group);
    setJoinStep("commitment");
  };

  const handleConfirmCommitment = () => {
    if (!pendingJoinGroup) return;
    joinGroup(pendingJoinGroup.id);
    setRecentlyJoinedId(pendingJoinGroup.id);
    setJoinStep("success");
  };

  const handleEnterJoinedRoom = () => {
    if (!pendingJoinGroup) return;
    const targetId = pendingJoinGroup.id;
    setPendingJoinGroup(null);
    router.push(`/komunitas/${targetId}?joined=1`);
  };

  const handleViewMyGroupsTab = () => {
    setPendingJoinGroup(null);
    setActiveTab("grup-saya");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative pb-24 flex flex-col">
      {/* Pop Up Pertanda Join Grup (2 Tahap: Komitmen & Notifikasi Berhasil Bergabung) */}
      {pendingJoinGroup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-komitmen-title"
          className="fixed inset-0 z-50 bg-[#1D1A39]/60 backdrop-blur-sm flex items-center justify-center p-5"
        >
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#CDB4DB]/50 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            {joinStep === "commitment" ? (
              <>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-12 h-12 rounded-2xl ${pendingJoinGroup.accentBg} flex items-center justify-center text-2xl shadow-sm`}
                    >
                      {pendingJoinGroup.icon || "🛡️"}
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#CDB4DB]/35 text-[#6B5779] text-[10px] font-extrabold uppercase tracking-wider">
                        Konfirmasi Gabung Grup
                      </span>
                      <h2
                        id="modal-komitmen-title"
                        className="text-base font-extrabold text-[#1D1A39] mt-0.5 leading-snug"
                      >
                        {pendingJoinGroup.name}
                      </h2>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPendingJoinGroup(null)}
                    aria-label="Tutup modal"
                    className="p-1.5 rounded-xl bg-[#FAFAFA] text-[#4A4E69] hover:text-[#1D1A39]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Foto & Profil Psikolog Pendamping Grup */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-[#F4EEF8] to-[#FFF0F5] border border-[#CDB4DB]/40 flex items-center gap-3">
                  <img
                    src={
                      pendingJoinGroup.supervisorAvatar ||
                      "/psychologists/nadya.svg"
                    }
                    alt={pendingJoinGroup.supervisorName}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0 bg-white"
                  />
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700">
                      <Stethoscope className="w-3 h-3" />
                      <span>Didampingi Psikolog Klinis</span>
                    </span>
                    <p className="text-xs font-extrabold text-[#1D1A39] truncate">
                      {pendingJoinGroup.supervisorName}
                    </p>
                    <p className="text-[11px] text-[#4A4E69] font-medium truncate">
                      {pendingJoinGroup.supervisorRole}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#CDB4DB]/35 space-y-2 text-xs text-[#1D1A39]">
                  <p className="text-[11px] font-extrabold text-[#6B5779] uppercase tracking-wider">
                    Komitmen Ruang Aman SELENA:
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="font-semibold leading-relaxed text-justify">
                      <strong>Bebas Penghakiman:</strong> Dilarang menyalahkan
                      korban atau meremehkan perasaan anggota lain.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="font-semibold leading-relaxed text-justify">
                      <strong>Privasi Anonim Terjaga:</strong> Kamu akan
                      bergabung menggunakan alias{" "}
                      <span className="underline">{currentUser.alias}</span>.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmCommitment}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#1D1A39] hover:bg-[#2c2754] text-white text-xs font-extrabold shadow-soft-purple flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <HeartHandshake className="w-4 h-4 text-[#FFC8DD]" />
                  <span>Setuju &amp; Gabung Grup Sekarang</span>
                </button>
              </>
            ) : (
              /* Tahap 2: Pop Up Pertanda Berhasil Join Grup */
              <div className="text-center flex flex-col items-center gap-3 py-2">
                <div className="w-16 h-16 rounded-full bg-[#D8F3DC] border-4 border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#D8F3DC] text-emerald-900 text-[11px] font-extrabold mb-1.5">
                    🎉 Berhasil Bergabung ke Grup!
                  </span>
                  <h2 className="text-lg font-extrabold text-[#1D1A39]">
                    Selamat Datang di {pendingJoinGroup.name}
                  </h2>
                  <p className="text-xs text-[#4A4E69] mt-1 leading-relaxed">
                    Kamu telah terdaftar sebagai anggota aktif dengan identitas
                    anonim <strong>{currentUser.alias}</strong>.
                  </p>
                </div>

                {/* Sambutan Psikolog Pendamping */}
                <div className="w-full p-3 rounded-2xl bg-[#F4EEF8] border border-[#CDB4DB]/40 flex items-center gap-3 text-left">
                  <img
                    src={
                      pendingJoinGroup.supervisorAvatar ||
                      "/psychologists/nadya.svg"
                    }
                    alt={pendingJoinGroup.supervisorName}
                    className="w-11 h-11 rounded-2xl object-cover border-2 border-white shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] font-extrabold text-[#1D1A39] truncate">
                      {pendingJoinGroup.supervisorName}
                    </p>
                    <p className="text-[11px] text-[#4A4E69] leading-snug">
                      “Selamat bergabung ya, {currentUser.alias} 💜 Ruang ini
                      aman untukmu berbagi kapan saja.”
                    </p>
                  </div>
                </div>

                <div className="w-full space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleEnterJoinedRoom}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#1D1A39] hover:bg-[#2c2754] text-white text-xs font-extrabold shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FFC8DD]" />
                    <span>Masuk ke Ruang Chat Sekarang →</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleViewMyGroupsTab}
                    className="w-full py-2.5 px-4 rounded-2xl bg-[#F4EEF8] hover:bg-[#CDB4DB]/50 text-[#1D1A39] text-xs font-extrabold transition-all"
                  >
                    Lihat di Daftar Grup Saya
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pastel Purple Header + Search Bar */}
      <header className="sticky top-0 z-40 px-5 pt-5 pb-4 bg-gradient-to-b from-[#CDB4DB]/90 via-[#F4EEF8]/95 to-[#FAFAFA]/95 backdrop-blur-xl border-b border-[#CDB4DB]/35 rounded-b-3xl shadow-gentle-card">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#CDB4DB]/40 text-[11px] font-extrabold text-[#1D1A39] shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6B5779]" />
            <span>Anonim: {currentUser.alias}</span>
          </div>
          <span className="text-[11px] font-extrabold text-[#6B5779] bg-white/80 px-2.5 py-1 rounded-full">
            {groups.filter((g) => g.isJoined).length}/{groups.length} Grup Diikuti
          </span>
        </div>

        <h1 className="text-xl font-extrabold text-[#1D1A39]">
          Ruang Aman &amp; Komunitas
        </h1>
        <p className="text-xs text-[#4A4E69] font-medium mt-0.5">
          Lingkar dukungan sebaya yang hangat, aman, dan didampingi psikolog
        </p>

        {/* Search Input */}
        <div className="relative mt-3.5 flex items-center">
          <Search className="w-4 h-4 text-[#6B5779] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari grup atau nama psikolog pendamping..."
            className="w-full pl-10 pr-9 py-2.5 text-xs font-semibold bg-white border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] placeholder:text-[#4A4E69]/65 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Bersihkan pencarian"
              className="absolute right-3 text-[#4A4E69] hover:text-[#1D1A39]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Two Interactive Tabs: "Jelajahi Grup" & "Grup Saya" */}
        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-white/90 border border-[#CDB4DB]/35 rounded-2xl mt-3.5 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("jelajahi")}
            className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "jelajahi"
                ? "bg-[#CDB4DB] text-[#1D1A39] shadow-sm"
                : "text-[#4A4E69] hover:text-[#1D1A39]"
            }`}
          >
            <span>Jelajahi Grup</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/80 text-[#1D1A39] text-[10px]">
              {groups.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("grup-saya")}
            className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "grup-saya"
                ? "bg-[#CDB4DB] text-[#1D1A39] shadow-sm"
                : "text-[#4A4E69] hover:text-[#1D1A39]"
            }`}
          >
            <span>Grup Saya</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/80 text-[#1D1A39] text-[10px]">
              {groups.filter((g) => g.isJoined).length}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-4 flex-1 flex flex-col gap-4">
        {activeTab === "grup-saya" ? (
          myJoinedGroups.length === 0 ? (
            <div className="bg-white rounded-3xl p-7 text-center shadow-gentle-card border border-[#CDB4DB]/30 my-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-3xl bg-[#F4EEF8] flex items-center justify-center text-[#6B5779] mb-3">
                <Sparkles className="w-7 h-7" />
              </div>
              <h2 className="text-base font-extrabold text-[#1D1A39]">
                Belum Ada Grup yang Diikuti
              </h2>
              <p className="text-xs text-[#4A4E69] mt-1 leading-relaxed max-w-xs">
                Kamu belum bergabung ke grup dukungan mana pun. Yuk pilih grup
                di tab Jelajahi Grup untuk mulai terhubung!
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("jelajahi");
                }}
                className="mt-4 px-5 py-3 rounded-2xl bg-[#CDB4DB] hover:bg-[#FFC8DD] text-[#1D1A39] text-xs font-extrabold shadow-soft-purple transition-all active:scale-95"
              >
                Jelajahi Grup Dukungan →
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {myJoinedGroups.map((group) => {
                const lastMessage =
                  group.messages[group.messages.length - 1] || null;
                const unreadCount = Math.min(3, group.messages.length);
                const isNewlyJoined = recentlyJoinedId === group.id;

                return (
                  <article
                    key={group.id}
                    className={`bg-white rounded-3xl p-4 shadow-gentle-card border transition-all flex flex-col gap-3 ${
                      isNewlyJoined
                        ? "border-emerald-400 ring-2 ring-emerald-200"
                        : "border-[#CDB4DB]/35 hover:border-[#CDB4DB]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-12 h-12 rounded-2xl ${group.accentBg} flex items-center justify-center text-2xl shrink-0 shadow-sm`}
                        >
                          {group.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B5779]">
                              {group.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#D8F3DC] text-emerald-900 text-[9px] font-extrabold">
                              {isNewlyJoined
                                ? "🎉 Baru Bergabung"
                                : "✓ Terhubung"}
                            </span>
                          </div>
                          <h2 className="text-base font-extrabold text-[#1D1A39] truncate mt-0.5">
                            {group.name}
                          </h2>
                          <p className="text-[11px] text-[#4A4E69] font-semibold flex items-center gap-1">
                            <Users className="w-3 h-3 text-emerald-600" />
                            <span>{group.memberCount} Member Aktif</span>
                          </p>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-[#FFC8DD] text-[#1D1A39] text-[10px] font-extrabold shrink-0 shadow-sm">
                        {unreadCount} pesan baru
                      </span>
                    </div>

                    {/* Psychologist Supervisor Badge with Photo */}
                    <div className="px-3 py-2 rounded-2xl bg-[#FAFAFA] border border-[#CDB4DB]/25 flex items-center gap-2.5">
                      <img
                        src={
                          group.supervisorAvatar || "/psychologists/nadya.svg"
                        }
                        alt={group.supervisorName}
                        className="w-8 h-8 rounded-xl object-cover border border-[#CDB4DB]/40 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-[#6B5779] block">
                          Psikolog Pendamping Grup:
                        </span>
                        <p className="text-xs font-extrabold text-[#1D1A39] truncate">
                          {group.supervisorName}
                        </p>
                      </div>
                    </div>

                    {/* Latest Message Preview Bubble */}
                    {lastMessage && (
                      <div className="p-3 rounded-2xl bg-[#F4EEF8]/70 border border-[#CDB4DB]/30 flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[10px] font-extrabold text-[#6B5779] block">
                            {lastMessage.senderName} • {lastMessage.timestamp}
                          </span>
                          <p className="text-xs text-[#1D1A39]/90 font-medium truncate mt-0.5">
                            {lastMessage.text}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Direct Buka Chat Button */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-bold text-[#4A4E69]">
                        Ketuk untuk masuk ke ruang diskusi
                      </span>
                      <Link
                        href={`/komunitas/${group.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#1D1A39] hover:bg-[#2c2754] text-white text-xs font-extrabold shadow-sm active:scale-95 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#FFC8DD]" />
                        <span>Buka Chat</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )
        ) : (
          /* Tab: "Jelajahi Grup" */
          <div className="space-y-3.5">
            {filteredGroups.map((group) => (
              <article
                key={group.id}
                className="bg-white rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/30 hover:border-[#CDB4DB] transition-all flex flex-col gap-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-2xl ${group.accentBg} flex items-center justify-center text-2xl shrink-0 shadow-sm`}
                    >
                      {group.icon}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B5779]">
                        {group.category}
                      </span>
                      <h2 className="text-base font-extrabold text-[#1D1A39] leading-snug">
                        {group.name}
                      </h2>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-[#F4EEF8] text-[#1D1A39] text-[10px] font-extrabold shrink-0">
                    {group.badgeText}
                  </span>
                </div>

                <p className="text-xs text-[#4A4E69] leading-relaxed text-justify">
                  {group.description}
                </p>

                {/* Supervising Psychologist Row with Photo */}
                <div className="p-2.5 rounded-2xl bg-[#F4EEF8]/70 border border-[#CDB4DB]/30 flex items-center gap-2.5">
                  <img
                    src={group.supervisorAvatar || "/psychologists/nadya.svg"}
                    alt={group.supervisorName}
                    className="w-9 h-9 rounded-xl object-cover border border-white shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#6B5779] block">
                      Diawasi oleh Psikolog:
                    </span>
                    <p className="text-xs font-extrabold text-[#1D1A39] truncate">
                      {group.supervisorName}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-[#CDB4DB]/20 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-extrabold text-[#1D1A39]">
                      {group.memberCount} Member Aktif
                    </span>
                  </div>

                  {group.isJoined ? (
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1.5 rounded-xl bg-[#D8F3DC] text-emerald-900 text-[11px] font-extrabold">
                        ✓ Sudah Join
                      </span>
                      <Link
                        href={`/komunitas/${group.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#1D1A39] text-white text-xs font-extrabold shadow-sm active:scale-95 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#FFC8DD]" />
                        <span>Buka Chat</span>
                      </Link>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleJoinClick(group)}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#CDB4DB] hover:bg-[#FFC8DD] text-[#1D1A39] text-xs font-extrabold shadow-soft-purple active:scale-95 transition-all"
                    >
                      <span>Join Grup</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
