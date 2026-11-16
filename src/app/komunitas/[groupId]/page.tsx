"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelena } from "@/context/SelenaContext";
import {
  ArrowLeft,
  Info,
  ShieldCheck,
  Flag,
  Send,
  Mic,
  Square,
  Play,
  Pause,
  LogOut,
  Users,
  CheckCircle2,
  X,
  Stethoscope,
  MoreVertical,
} from "lucide-react";

export default function GroupChatRoomPage() {
  const params = useParams<{ groupId: string }>();
  const router = useRouter();
  const {
    groups,
    joinGroup,
    leaveGroup,
    sendGroupMessage,
    reportMessage,
    currentUser,
  } = useSelena();

  const groupId = Array.isArray(params?.groupId)
    ? params.groupId[0]
    : params?.groupId;

  const group = groups.find((g) => g.id === groupId);

  const [inputText, setInputText] = useState("");
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);
  const [showJoinedPopupBanner, setShowJoinedPopupBanner] = useState(true);
  const [openMenuMsgId, setOpenMenuMsgId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Voice Note Simulator State
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(3);
  const [playingVoiceMsgId, setPlayingVoiceMsgId] = useState<string | null>(
    null
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [group?.messages.length]);

  useEffect(() => {
    if (!isRecording) {
      setRecordSeconds(3);
      return;
    }
    const interval = setInterval(() => {
      setRecordSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
  };

  if (!group) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-lg font-extrabold text-[#1D1A39]">
          Grup Tidak Ditemukan
        </h1>
        <p className="text-xs text-[#4A4E69] mt-1">
          Grup diskusi yang kamu tuju tidak tersedia.
        </p>
        <Link
          href="/komunitas"
          className="mt-4 px-5 py-2.5 rounded-2xl bg-[#CDB4DB] text-[#1D1A39] text-xs font-extrabold"
        >
          ← Kembali ke Komunitas
        </Link>
      </div>
    );
  }

  const currentSenderName =
    currentUser.role === "admin" ? currentUser.name : currentUser.alias;

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (!group.isJoined) {
      joinGroup(group.id);
      showToast(`Kamu resmi bergabung di grup ${group.name} 💜`);
    }
    sendGroupMessage(group.id, inputText, false);
    setInputText("");
  };

  const handleToggleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      const formattedDuration = `0:${String(recordSeconds).padStart(2, "0")}`;
      if (!group.isJoined) {
        joinGroup(group.id);
      }
      sendGroupMessage(
        group.id,
        `Pesan Suara Dukungan (${formattedDuration})`,
        true
      );
      setIsRecording(false);
      showToast("Pesan suara berhasil dikirim ke grup 🌸");
    }
  };

  const handleTogglePlayVoice = (msgId: string) => {
    if (playingVoiceMsgId === msgId) {
      setPlayingVoiceMsgId(null);
    } else {
      setPlayingVoiceMsgId(msgId);
      setTimeout(() => {
        setPlayingVoiceMsgId((current) => (current === msgId ? null : current));
      }, 3500);
    }
  };

  const handleReportMessage = (messageId: string) => {
    reportMessage(group.id, messageId);
    setOpenMenuMsgId(null);
    showToast(
      "Pesan telah dilaporkan dan ditandai di Dashboard Psikolog/Moderator 🛡️"
    );
  };

  const handleLeaveGroup = () => {
    leaveGroup(group.id);
    setShowInfoDrawer(false);
    router.push("/komunitas");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative flex flex-col">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#1D1A39] text-white text-xs font-extrabold shadow-lg flex items-center gap-2 max-w-[90%]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Info / Members Drawer Modal */}
      {showInfoDrawer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#1D1A39]/55 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        >
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-[#CDB4DB]/40 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl ${group.accentBg} flex items-center justify-center text-2xl shadow-sm`}
                >
                  {group.icon}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B5779]">
                    {group.category}
                  </span>
                  <h2 className="text-base font-extrabold text-[#1D1A39]">
                    {group.name}
                  </h2>
                  <p className="text-xs text-[#4A4E69] font-semibold">
                    {group.memberCount} Anggota Terdaftar
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowInfoDrawer(false)}
                className="p-2 rounded-xl bg-[#FAFAFA] text-[#4A4E69] hover:text-[#1D1A39]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Supervising Psychologist Card with Photo */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-[#F4EEF8] to-[#FFF0F5] border border-[#CDB4DB]/40 flex items-center gap-3">
              <img
                src={group.supervisorAvatar || "/psychologists/nadya.svg"}
                alt={group.supervisorName}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold text-emerald-700 block">
                  🩺 Psikolog Penanggung Jawab Grup
                </span>
                <p className="text-xs font-extrabold text-[#1D1A39] truncate">
                  {group.supervisorName}
                </p>
                <p className="text-[11px] text-[#4A4E69] truncate">
                  {group.supervisorRole}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#CDB4DB]/40 space-y-1.5">
              <span className="text-[11px] font-extrabold text-[#1D1A39] block">
                🛡️ Pedoman &amp; Aturan Ruang Aman
              </span>
              <p className="text-xs text-[#4A4E69] leading-relaxed text-justify">
                {group.guidelines}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#1D1A39] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#6B5779]" />
                <span>Status Keanggotaan</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-[#FFC8DD]/60 text-[#1D1A39] text-[11px] font-bold">
                  🌸 {currentUser.alias} (Kamu • Aktif)
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#FAFAFA] border border-[#CDB4DB]/30 text-[#4A4E69] text-[11px] font-semibold">
                  + {Math.max(1, group.memberCount - 1)} penyintas anonim lainnya
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowInfoDrawer(false)}
                className="flex-1 py-2.5 px-4 rounded-2xl bg-[#F4EEF8] text-[#1D1A39] text-xs font-extrabold"
              >
                Tutup Info
              </button>
              <button
                type="button"
                onClick={handleLeaveGroup}
                className="flex-1 py-2.5 px-4 rounded-2xl bg-[#FDE2E4] hover:bg-rose-200 text-rose-800 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Grup</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#CDB4DB]/30 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => router.push("/komunitas")}
              aria-label="Kembali ke daftar komunitas"
              className="w-10 h-10 rounded-2xl bg-[#F4EEF8] hover:bg-[#CDB4DB]/40 flex items-center justify-center text-[#1D1A39] shrink-0 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div
              className={`w-11 h-11 rounded-2xl ${group.accentBg} flex items-center justify-center text-xl shrink-0 shadow-sm`}
            >
              {group.icon}
            </div>

            <div className="min-w-0">
              <h1 className="text-sm font-extrabold text-[#1D1A39] truncate">
                {group.name}
              </h1>
              <p className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{group.memberCount} Member Aktif • Anonim</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowInfoDrawer(true)}
            aria-label="Info Grup dan Anggota"
            className="px-3 py-2 rounded-2xl bg-[#F4EEF8] hover:bg-[#CDB4DB]/40 text-[#1D1A39] text-xs font-extrabold flex items-center gap-1.5 shrink-0 active:scale-95 transition-all"
          >
            <Info className="w-4 h-4 text-[#6B5779]" />
            <span>Info Grup</span>
          </button>
        </div>
      </header>

      {/* Pinned Safety Banner with Psychologist Photo */}
      <div className="sticky top-[65px] z-30 bg-[#F4EEF8]/95 backdrop-blur-md border-b border-[#CDB4DB]/40 px-4 py-2 flex items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={group.supervisorAvatar || "/psychologists/nadya.svg"}
            alt={group.supervisorName}
            className="w-7 h-7 rounded-xl object-cover border border-white shrink-0"
          />
          <p className="text-[11px] font-bold text-[#1D1A39] truncate">
            Diawasi oleh <strong>{group.supervisorName}</strong>
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-[10px] font-extrabold text-emerald-700 shrink-0">
          <ShieldCheck className="w-3 h-3" />
          Aman
        </span>
      </div>

      {/* Scrollable Message Feed */}
      <main className="flex-1 px-4 pt-4 pb-32 overflow-y-auto space-y-3.5">
        {/* Pertanda Status Join Grup di Atas Ruang Obrolan */}
        {showJoinedPopupBanner && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#D8F3DC] via-[#F0FFF4] to-white border border-emerald-300 shadow-xs flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-extrabold text-[#1D1A39]">
                  {group.isJoined
                    ? `🎉 Kamu telah tergabung di grup ${group.name}`
                    : `Pratinjau Ruang Diskusi ${group.name}`}
                </p>
                <p className="text-[11px] text-[#4A4E69] mt-0.5 leading-relaxed">
                  Identitas samaranmu <strong>{currentUser.alias}</strong>{" "}
                  terlindungi secara anonim di ruang ini.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowJoinedPopupBanner(false)}
              className="p-1 text-[#4A4E69] hover:text-[#1D1A39]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {group.messages.map((msg) => {
          const isMe = msg.senderName === currentSenderName;
          const isPsychologist = msg.senderRole === "psychologist";
          const isAdmin = msg.senderRole === "admin";
          const isPlayingThisVoice = playingVoiceMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar for Psychologist or Other Member */}
              {!isMe && isPsychologist && (
                <img
                  src={
                    msg.senderAvatar ||
                    group.supervisorAvatar ||
                    "/psychologists/nadya.svg"
                  }
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-2xl object-cover border border-[#CDB4DB] shrink-0 mb-1 shadow-xs"
                />
              )}

              <div
                className={`relative max-w-[84%] rounded-3xl px-4 py-3 shadow-sm border transition-all ${
                  isMe
                    ? "bg-[#FFC8DD] text-[#1D1A39] border-[#FFC8DD] rounded-br-md"
                    : msg.isReported
                    ? "bg-[#FDE2E4]/90 text-[#1D1A39] border-rose-300 rounded-bl-md"
                    : isPsychologist
                    ? "bg-[#F4EEF8] text-[#1D1A39] border-[#CDB4DB] rounded-bl-md"
                    : "bg-white text-[#1D1A39] border-[#CDB4DB]/25 rounded-bl-md"
                }`}
              >
                {/* Sender Header */}
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-extrabold text-[#1D1A39]">
                      {isMe ? `${msg.senderName} (Kamu)` : msg.senderName}
                    </span>

                    {isPsychologist && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#CDB4DB] text-[#1D1A39] text-[9px] font-extrabold">
                        <Stethoscope className="w-2.5 h-2.5" />
                        <span>Psikolog ✓</span>
                      </span>
                    )}

                    {isAdmin && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#1D1A39] text-white text-[9px] font-extrabold">
                        <span>Moderator</span>
                      </span>
                    )}

                    {msg.isReported && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-extrabold">
                        Dilaporkan
                      </span>
                    )}
                  </div>

                  {/* Moderation Action Button on Incoming Messages */}
                  {!isMe && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuMsgId(
                            openMenuMsgId === msg.id ? null : msg.id
                          )
                        }
                        aria-label="Opsi moderasi pesan"
                        className="p-1 rounded-lg text-[#4A4E69] hover:text-[#1D1A39] hover:bg-black/5"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>

                      {openMenuMsgId === msg.id && (
                        <div className="absolute right-0 top-6 z-30 w-40 bg-white rounded-2xl shadow-lg border border-[#CDB4DB]/40 p-1.5">
                          <button
                            type="button"
                            onClick={() => handleReportMessage(msg.id)}
                            className="w-full px-3 py-2 rounded-xl text-left text-xs font-extrabold text-rose-700 hover:bg-[#FDE2E4]/60 flex items-center gap-1.5"
                          >
                            <Flag className="w-3.5 h-3.5 shrink-0" />
                            <span>Laporkan Pesan</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Message Body or Playable Voice Note Bubble */}
                {msg.isVoiceNote ? (
                  <div className="mt-1.5 p-2.5 rounded-2xl bg-white/85 border border-[#CDB4DB]/40 flex items-center gap-3 min-w-[210px]">
                    <button
                      type="button"
                      onClick={() => handleTogglePlayVoice(msg.id)}
                      className="w-9 h-9 rounded-xl bg-[#1D1A39] text-white flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                    >
                      {isPlayingThisVoice ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-end gap-1 h-5">
                        {[40, 75, 55, 95, 65, 85, 45, 90, 60, 80, 50, 70].map(
                          (h, idx) => (
                            <span
                              key={idx}
                              style={{ height: `${h}%` }}
                              className={`w-1 rounded-full transition-all ${
                                isPlayingThisVoice
                                  ? "bg-[#6B5779] animate-pulse"
                                  : "bg-[#CDB4DB]"
                              }`}
                            />
                          )
                        )}
                      </div>
                      <p className="text-[10px] font-bold text-[#4A4E69] mt-1">
                        {isPlayingThisVoice
                          ? "Memutar pesan suara..."
                          : msg.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs leading-relaxed font-medium">
                    {msg.text}
                  </p>
                )}

                {/* Bottom Timestamp + Direct Report Shortcut */}
                <div className="mt-1.5 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold text-[#4A4E69]">
                    {msg.timestamp}
                  </span>

                  {!isMe && !msg.isReported && (
                    <button
                      type="button"
                      onClick={() => handleReportMessage(msg.id)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#4A4E69]/80 hover:text-rose-700"
                    >
                      <Flag className="w-2.5 h-2.5" />
                      <span>Laporkan Pesan</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </main>

      {/* Bottom Input Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/95 backdrop-blur-2xl border-t border-[#CDB4DB]/35 px-4 py-3 pb-safe rounded-t-3xl shadow-bottom-nav">
        {isRecording ? (
          <div className="flex items-center justify-between gap-3 bg-[#FFF0F5] border border-[#FFC8DD] px-4 py-2.5 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-extrabold text-[#1D1A39]">
                Merekam pesan suara... 0:
                {String(recordSeconds).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRecording(false)}
                className="px-2.5 py-1.5 rounded-xl bg-white text-[#4A4E69] text-[11px] font-bold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleToggleVoiceRecord}
                className="px-3.5 py-1.5 rounded-xl bg-[#1D1A39] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>Kirim Suara</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendText} className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleVoiceRecord}
              aria-label="Rekam Pesan Suara"
              title="Rekam Pesan Suara"
              className="w-11 h-11 rounded-2xl bg-[#F4EEF8] hover:bg-[#FFC8DD] text-[#1D1A39] flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-xs"
            >
              <Mic className="w-5 h-5 text-[#6B5779]" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Kirim pesan aman sebagai ${currentSenderName}...`}
              className="flex-1 px-4 py-3 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] placeholder:text-[#4A4E69]/65 focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              aria-label="Kirim Pesan"
              className="w-11 h-11 rounded-2xl bg-[#CDB4DB] hover:bg-[#FFC8DD] disabled:opacity-40 text-[#1D1A39] flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
