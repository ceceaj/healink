"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelena } from "@/context/SelenaContext";
import {
  ArrowLeft,
  ShieldCheck,
  Send,
  Award,
  Sparkles,
  Calendar,
  ClipboardCheck,
  FileText,
  Mic,
  Square,
  Play,
  Pause,
  Video,
  CheckCircle2,
  X,
} from "lucide-react";

const CONSULTATION_STARTERS = [
  "Saya sering terbayang kejadian pelecehan itu...",
  "Bagaimana cara mengatasi rasa cemas mendadak?",
  "Saya merasa bersalah dan takut bercerita ke keluarga",
  "Bantu saya menyusun batasan aman di tempat kerja",
];

function generatePsychologistResponse(
  userText: string,
  alias: string,
  psychName: string
): string {
  const lower = userText.toLowerCase();

  if (
    lower.includes("bersalah") ||
    lower.includes("malu") ||
    lower.includes("salah saya") ||
    lower.includes("diam")
  ) {
    return `Terima kasih sudah berani jujur kepadaku, ${alias} 💜 Sebagai psikolog klinis, saya ingin menegaskan satu hal penting bahwa apa yang terjadi sama sekali bukan salahmu. Saat menghadapi ancaman, sistem saraf manusia sering otomatis membeku demi bertahan hidup. Perlahan-lahan, mari kita lepaskan beban rasa bersalah itu bersama ya.`;
  }

  if (
    lower.includes("cemas") ||
    lower.includes("panik") ||
    lower.includes("takut") ||
    lower.includes("debar") ||
    lower.includes("terbayang")
  ) {
    return `Saya mendengarkanmu sepenuhnya, ${alias} 🌸 Reaksi cemas dan ingatan yang muncul tiba-tiba adalah respons wajar dari tubuh yang pernah mengalami guncangan trauma. Coba rasakan telapak kakimu menapak lantai sekarang, tarik napas lembut 4 hitungan, dan hembuskan perlahan. Apa pemicu utama yang paling sering membuatmu merasa tidak aman akhir-akhir ini?`;
  }

  if (
    lower.includes("keluarga") ||
    lower.includes("kantor") ||
    lower.includes("kampus") ||
    lower.includes("lapor") ||
    lower.includes("batasan") ||
    lower.includes("kerja")
  ) {
    return `Langkahmu memikirkan hal ini menunjukkan keberanian yang besar, ${alias} 🌿 Kamu memegang kendali penuh atas kepada siapa dan kapan kamu siap bercerita. Kita bisa menyusun rencana komunikasi dan batasan diri yang paling aman untuk kondisimu saat ini.`;
  }

  return `Terima kasih telah mempercayakan ceritamu di ruang konseling privat ini, ${alias} 💜 Saya ${
    psychName.split(",")[0]
  } hadir untuk mendengarkan tanpa menghakimi sedikit pun. Boleh ceritakan lebih lanjut apa yang paling terasa berat di hatimu hari ini?`;
}

export default function PsychologistChatRoomPage() {
  const params = useParams<{ psychologistId: string }>();
  const router = useRouter();
  const { psychologists, sendConsultationMessage, currentUser } = useSelena();

  const psychologistId = Array.isArray(params?.psychologistId)
    ? params.psychologistId[0]
    : params?.psychologistId;

  const psychologist = psychologists.find((p) => p.id === psychologistId);

  const [inputText, setInputText] = useState("");
  const [isPsychTyping, setIsPsychTyping] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Interactive Modals for Partner Demo: Booking Sesi & Asesmen Cepat
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(
    psychologist?.scheduleSlots[0] || "Hari Ini • 15:00 WIB"
  );
  const [selectedSessionMethod, setSelectedSessionMethod] = useState(
    "Video Call Privat Anonim"
  );

  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [anxietyLevel, setAnxietyLevel] = useState<number>(4);
  const [mainConcern, setMainConcern] = useState(
    "Trauma Pelecehan & Ingatan Berulang"
  );
  const [sleepQuality, setSleepQuality] = useState("Sering Terbangun / Cemas");

  // Voice Note Simulator State
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(4);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [psychologist?.messages.length, isPsychTyping]);

  useEffect(() => {
    if (!isRecording) {
      setRecordSeconds(4);
      return;
    }
    const timer = setInterval(() => {
      setRecordSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isRecording]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2800);
  };

  if (!psychologist) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-lg font-extrabold text-[#1D1A39]">
          Psikolog Tidak Ditemukan
        </h1>
        <Link
          href="/konsultasi"
          className="mt-4 px-5 py-2.5 rounded-2xl bg-[#CDB4DB] text-[#1D1A39] text-xs font-extrabold"
        >
          ← Kembali ke Direktori Psikolog
        </Link>
      </div>
    );
  }

  const handleSendMessage = (customText?: string) => {
    const textToSend = (customText ?? inputText).trim();
    if (!textToSend || isPsychTyping) return;

    const senderRole = currentUser.role === "admin" ? "psychologist" : "user";
    const beforeCount = psychologist.messages.length;

    sendConsultationMessage(psychologist.id, textToSend, senderRole, false);
    if (!customText) {
      setInputText("");
    }

    if (senderRole === "user") {
      setIsPsychTyping(true);
      const replyContent = generatePsychologistResponse(
        textToSend,
        currentUser.alias,
        psychologist.name
      );

      setTimeout(() => {
        setIsPsychTyping(false);
        if (psychologist.messages.length <= beforeCount + 1) {
          sendConsultationMessage(
            psychologist.id,
            replyContent,
            "psychologist",
            false
          );
        }
      }, 1500);
    }
  };

  const handleConfirmBooking = () => {
    sendConsultationMessage(
      psychologist.id,
      `Permintaan Sesi Tatap Muka Daring (${selectedSessionMethod}) pada jadwal ${selectedSlot}.`,
      "user",
      false,
      {
        messageType: "booking",
        metaTitle: "Tiket Jadwal Konseling Terkonfirmasi",
        metaItems: [
          `Psikolog: ${psychologist.name}`,
          `Jadwal: ${selectedSlot}`,
          `Metode: ${selectedSessionMethod}`,
          `Identitas: ${currentUser.alias} (Anonim Terlindungi)`,
        ],
      }
    );
    setShowBookingModal(false);
    showToast("Jadwal sesi konseling berhasil dikonfirmasi! 📅");

    setIsPsychTyping(true);
    setTimeout(() => {
      setIsPsychTyping(false);
      sendConsultationMessage(
        psychologist.id,
        `Terima kasih ${currentUser.alias} 💜 Jadwal sesi ${selectedSessionMethod} kita pada ${selectedSlot} sudah saya terima dan kunci di kalender klinis saya. Tautan ruang temu terenkripsi akan otomatis aktif 10 menit sebelum sesi dimulai.`,
        "psychologist",
        false
      );
    }, 1400);
  };

  const handleSubmitAssessment = () => {
    sendConsultationMessage(
      psychologist.id,
      `Lembar Asesmen Kondisi Awal telah dikirimkan untuk membantu evaluasi sesi konseling.`,
      "user",
      false,
      {
        messageType: "assessment",
        metaTitle: "Lembar Asesmen Kondisi Emosional",
        metaItems: [
          `Tingkat Kecemasan Saat Ini: Skala ${anxietyLevel}/5`,
          `Fokus Keluhan: ${mainConcern}`,
          `Kondisi Tidur & Fisik: ${sleepQuality}`,
        ],
      }
    );
    setShowAssessmentModal(false);
    showToast("Lembar asesmen kondisi berhasil dikirim ke Psikolog! 📋");

    setIsPsychTyping(true);
    setTimeout(() => {
      setIsPsychTyping(false);
      sendConsultationMessage(
        psychologist.id,
        `Terima kasih telah mengisi asesmen awal ini, ${currentUser.alias} 🌿 Saya mencatat tingkat kecemasanmu berada di skala ${anxietyLevel}/5 dengan fokus pada "${mainConcern}". Kita akan memprioritaskan stabilisasi rasa aman dan regulasi emosi terlebih dahulu agar tidurmu kembali tenang.`,
        "psychologist",
        false
      );
    }, 1400);
  };

  const handleRequestClinicalSummary = () => {
    if (isPsychTyping) return;
    setIsPsychTyping(true);
    setTimeout(() => {
      setIsPsychTyping(false);
      sendConsultationMessage(
        psychologist.id,
        `Berikut adalah lembar Ringkasan & Rencana Pemulihan Mandiri yang saya susun khusus untuk mendampingimu minggu ini, ${currentUser.alias}:`,
        "psychologist",
        false,
        {
          messageType: "summary",
          metaTitle: "Catatan Klinis & Rencana Pemulihan (Care Plan)",
          metaItems: [
            "1. Regulasi Somatik: Praktikkan pernapasan 4-7-8 setiap pagi dan saat muncul pemicu cemas.",
            "2. Validasi Kognitif: Ingatkan diri bahwa respons membeku (freeze) adalah mekanisme pertahanan biologis, bukan kesalahan korban.",
            "3. Jurnal Syukur & Batasan: Tulis 1 catatan syukur harian di Beranda SELENA.",
          ],
        }
      );
      showToast("Catatan Pemulihan dari Psikolog diterima 💜");
    }, 1000);
  };

  const handleToggleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      const durationLabel = `0:${String(recordSeconds).padStart(2, "0")}`;
      sendConsultationMessage(
        psychologist.id,
        `Pesan Suara Konseling (${durationLabel})`,
        currentUser.role === "admin" ? "psychologist" : "user",
        false,
        {
          messageType: "voice",
        }
      );
      setIsRecording(false);
      showToast("Pesan suara terkirim ke Psikolog 🌸");

      if (currentUser.role !== "admin") {
        setIsPsychTyping(true);
        setTimeout(() => {
          setIsPsychTyping(false);
          sendConsultationMessage(
            psychologist.id,
            `Saya sudah mendengarkan pesan suaramu dengan saksama, ${currentUser.alias} 💜 Dari nada suaramu saya bisa merasakan betapa berat beban yang kamu tahan selama ini. Tarik napas perlahan ya, kamu aman bersama saya di sini.`,
            "psychologist",
            false
          );
        }, 1500);
      }
    }
  };

  const handleTogglePlayVoice = (msgId: string) => {
    if (playingVoiceId === msgId) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(msgId);
      setTimeout(() => {
        setPlayingVoiceId((curr) => (curr === msgId ? null : curr));
      }, 3500);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative flex flex-col">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#1D1A39] text-white text-xs font-extrabold shadow-lg flex items-center gap-2 max-w-[92%]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Modal 1: Jadwalkan Sesi Video Call / Konseling */}
      {showBookingModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#1D1A39]/60 backdrop-blur-sm flex items-center justify-center p-5"
        >
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#CDB4DB]/50 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <img
                  src={psychologist.avatarUrl}
                  alt={psychologist.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-[#CDB4DB]"
                />
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#6B5779]">
                    Booking Sesi Tatap Muka Daring
                  </span>
                  <h2 className="text-sm font-extrabold text-[#1D1A39]">
                    {psychologist.name}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="p-1.5 rounded-xl bg-[#FAFAFA] text-[#4A4E69]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#1D1A39] mb-1.5">
                Pilih Waktu Sesi Konseling
              </label>
              <div className="grid grid-cols-2 gap-2">
                {psychologist.scheduleSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2.5 rounded-xl text-[11px] font-extrabold border transition-all ${
                      selectedSlot === slot
                        ? "bg-[#CDB4DB] text-[#1D1A39] border-[#1D1A39]"
                        : "bg-[#FAFAFA] text-[#4A4E69] border-[#CDB4DB]/40"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#1D1A39] mb-1.5">
                Pilih Metode Sesi
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Video Call Privat Anonim",
                  "Voice Call Tanpa Kamera",
                ].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setSelectedSessionMethod(method)}
                    className={`p-2.5 rounded-xl text-[11px] font-extrabold border transition-all ${
                      selectedSessionMethod === method
                        ? "bg-[#FFC8DD] text-[#1D1A39] border-[#1D1A39]"
                        : "bg-[#FAFAFA] text-[#4A4E69] border-[#CDB4DB]/40"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmBooking}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#1D1A39] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <Video className="w-4 h-4 text-[#FFC8DD]" />
              <span>Konfirmasi &amp; Kirim Tiket Jadwal</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal 2: Lembar Asesmen Kondisi Awal */}
      {showAssessmentModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#1D1A39]/60 backdrop-blur-sm flex items-center justify-center p-5"
        >
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#CDB4DB]/50 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#6B5779]">
                  Skrining Pra-Konseling
                </span>
                <h2 className="text-base font-extrabold text-[#1D1A39]">
                  Lembar Asesmen Kondisi Emosional
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAssessmentModal(false)}
                className="p-1.5 rounded-xl bg-[#FAFAFA] text-[#4A4E69]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#1D1A39] mb-1.5">
                Skala Kecemasan / Ketegangan Saat Ini (1 = Tenang, 5 = Sangat
                Berat)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setAnxietyLevel(num)}
                    className={`py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                      anxietyLevel === num
                        ? "bg-[#CDB4DB] text-[#1D1A39] border-[#1D1A39]"
                        : "bg-[#FAFAFA] text-[#4A4E69] border-[#CDB4DB]/40"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#1D1A39] mb-1">
                Fokus Keluhan Utama
              </label>
              <select
                value={mainConcern}
                onChange={(e) => setMainConcern(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39]"
              >
                <option value="Trauma Pelecehan & Ingatan Berulang">
                  Trauma Pelecehan &amp; Ingatan Berulang
                </option>
                <option value="Serangan Panik & Dada Berdebar">
                  Serangan Panik &amp; Dada Berdebar
                </option>
                <option value="Rasa Menyalahkan Diri Sendiri (Self-Blame)">
                  Rasa Menyalahkan Diri Sendiri (Self-Blame)
                </option>
                <option value="Menyusun Batasan Aman & Rencana Hukum">
                  Menyusun Batasan Aman &amp; Rencana Hukum
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#1D1A39] mb-1">
                Kondisi Tidur &amp; Istirahat
              </label>
              <select
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39]"
              >
                <option value="Sering Terbangun / Cemas Malam Hari">
                  Sering Terbangun / Cemas Malam Hari
                </option>
                <option value="Sulit Memulai Tidur & Mimpi Buruk">
                  Sulit Memulai Tidur &amp; Mimpi Buruk
                </option>
                <option value="Cukup Teratur Namun Mudah Lelah">
                  Cukup Teratur Namun Mudah Lelah
                </option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleSubmitAssessment}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#1D1A39] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <ClipboardCheck className="w-4 h-4 text-[#FFC8DD]" />
              <span>Kirim Asesmen ke Psikolog</span>
            </button>
          </div>
        </div>
      )}

      {/* Sticky Top Header with Psychologist Photo & Action Toolbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#CDB4DB]/35 px-4 pt-3 pb-2.5 shadow-sm rounded-b-3xl">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => router.push("/konsultasi")}
              aria-label="Kembali ke daftar psikolog"
              className="w-10 h-10 rounded-2xl bg-[#F4EEF8] hover:bg-[#CDB4DB]/40 flex items-center justify-center text-[#1D1A39] shrink-0 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="relative shrink-0">
              <img
                src={psychologist.avatarUrl || "/psychologists/nadya.svg"}
                alt={psychologist.name}
                className="w-11 h-11 rounded-2xl object-cover shadow-sm border border-[#CDB4DB] bg-[#F4EEF8]"
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-white ${
                  psychologist.isOnline ? "bg-emerald-500" : "bg-amber-400"
                }`}
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-sm font-extrabold text-[#1D1A39] truncate">
                {psychologist.name}
              </h1>
              <p className="text-[11px] font-semibold text-[#6B5779] truncate flex items-center gap-1">
                <Award className="w-3 h-3 shrink-0" />
                <span>{psychologist.specialty}</span>
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-[#D8F3DC] text-emerald-900 text-[10px] font-extrabold shrink-0">
            STR Resmi ✓
          </span>
        </div>

        {/* Interactive Clinical Features Bar (Siap Demo Mitra) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2.5 mt-2 border-t border-[#CDB4DB]/20">
          <button
            type="button"
            onClick={() => setShowAssessmentModal(true)}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-[#F4EEF8] hover:bg-[#CDB4DB]/50 text-[#1D1A39] text-[11px] font-extrabold flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <ClipboardCheck className="w-3.5 h-3.5 text-[#6B5779]" />
            <span>Isi Asesmen Awal</span>
          </button>

          <button
            type="button"
            onClick={() => setShowBookingModal(true)}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-[#FFF0F5] hover:bg-[#FFC8DD]/60 text-[#1D1A39] text-[11px] font-extrabold flex items-center gap-1.5 active:scale-95 transition-all border border-[#FFC8DD]/60"
          >
            <Calendar className="w-3.5 h-3.5 text-[#6B5779]" />
            <span>Jadwalkan Video Call</span>
          </button>

          <button
            type="button"
            onClick={handleRequestClinicalSummary}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-[#D8F3DC]/80 hover:bg-emerald-200 text-[#1D1A39] text-[11px] font-extrabold flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-800" />
            <span>Minta Resep Pemulihan</span>
          </button>
        </div>
      </header>

      {/* Pinned Confidentiality Notice */}
      <div className="bg-[#F4EEF8]/90 border-b border-[#CDB4DB]/30 px-4 py-1.5 flex items-center justify-center gap-1.5 text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
        <p className="text-[11px] font-bold text-[#1D1A39]">
          Konseling Terenkripsi • Identitas Samaran:{" "}
          <span className="text-[#6B5779]">{currentUser.alias}</span>
        </p>
      </div>

      {/* Chat Messages Feed */}
      <main className="flex-1 px-4 pt-4 pb-36 overflow-y-auto space-y-3.5">
        {psychologist.messages.map((msg) => {
          const isUserBubble = msg.senderRole === "user";
          const isPlayingThisVoice = playingVoiceId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                isUserBubble ? "justify-end" : "justify-start"
              }`}
            >
              {!isUserBubble && (
                <img
                  src={psychologist.avatarUrl || "/psychologists/nadya.svg"}
                  alt={psychologist.name}
                  className="w-8 h-8 rounded-2xl object-cover border border-[#CDB4DB] shrink-0 mb-1 shadow-xs bg-[#F4EEF8]"
                />
              )}

              <div
                className={`max-w-[85%] rounded-3xl px-4 py-3 shadow-sm border ${
                  isUserBubble
                    ? "bg-[#FFC8DD] text-[#1D1A39] border-[#FFC8DD] rounded-br-md"
                    : "bg-white text-[#1D1A39] border-[#CDB4DB]/40 rounded-bl-md"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-extrabold text-[#6B5779]">
                    {isUserBubble
                      ? `${msg.senderName} (Penyintas)`
                      : `🩺 ${msg.senderName}`}
                  </span>
                  <span className="text-[10px] font-semibold text-[#4A4E69]">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Special Structured Cards (Booking, Assessment, Summary) */}
                {(msg.messageType === "booking" ||
                  msg.messageType === "assessment" ||
                  msg.messageType === "summary") &&
                  msg.metaItems && (
                    <div className="my-1.5 p-3 rounded-2xl bg-white/95 border border-[#CDB4DB]/50 space-y-1.5">
                      <span className="text-[11px] font-extrabold text-[#1D1A39] block border-b border-[#CDB4DB]/25 pb-1">
                        📌 {msg.metaTitle}
                      </span>
                      <ul className="space-y-1">
                        {msg.metaItems.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-[11px] text-[#1D1A39] font-semibold leading-snug"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Playable Voice Note Bubble */}
                {msg.messageType === "voice" ? (
                  <div className="mt-1 p-2.5 rounded-2xl bg-white/90 border border-[#CDB4DB]/40 flex items-center gap-3 min-w-[210px]">
                    <button
                      type="button"
                      onClick={() => handleTogglePlayVoice(msg.id)}
                      className="w-9 h-9 rounded-xl bg-[#1D1A39] text-white flex items-center justify-center shrink-0 active:scale-95"
                    >
                      {isPlayingThisVoice ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-end gap-1 h-5">
                        {[45, 80, 60, 95, 70, 85, 50, 90, 65, 75, 55, 80].map(
                          (h, idx) => (
                            <span
                              key={idx}
                              style={{ height: `${h}%` }}
                              className={`w-1 rounded-full ${
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
                          ? "Memutar rekaman suara..."
                          : msg.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs leading-relaxed font-medium text-justify">
                    {msg.text}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Realistic 1.5s Psychologist Typing Indicator with Photo */}
        {isPsychTyping && (
          <div className="flex items-end gap-2 max-w-[82%] self-start">
            <img
              src={psychologist.avatarUrl || "/psychologists/nadya.svg"}
              alt={psychologist.name}
              className="w-8 h-8 rounded-2xl object-cover border border-[#CDB4DB] shrink-0"
            />
            <div className="px-4 py-3 rounded-3xl rounded-bl-md bg-[#F4EEF8] border border-[#CDB4DB]/50 text-[#1D1A39] shadow-sm flex items-center gap-2.5">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#6B5779] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-[#6B5779] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-[#6B5779] animate-bounce" />
              </div>
              <span className="text-xs font-bold text-[#6B5779] italic">
                {psychologist.name.split(",")[0]} sedang mengetik...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Fixed Bottom Input Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/95 backdrop-blur-2xl border-t border-[#CDB4DB]/35 px-4 pt-2.5 pb-4 pb-safe rounded-t-3xl shadow-bottom-nav">
        {/* Quick Starter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {CONSULTATION_STARTERS.map((starter) => (
            <button
              key={starter}
              type="button"
              disabled={isPsychTyping}
              onClick={() => handleSendMessage(starter)}
              className="shrink-0 px-3 py-1.5 rounded-full bg-[#F4EEF8] hover:bg-[#CDB4DB]/50 text-[#1D1A39] text-[11px] font-bold transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#6B5779]" />
              <span>{starter}</span>
            </button>
          ))}
        </div>

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
                <span>Kirim</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleVoiceRecord}
              aria-label="Kirim Pesan Suara ke Psikolog"
              title="Rekam Pesan Suara"
              className="w-11 h-11 rounded-2xl bg-[#F4EEF8] hover:bg-[#FFC8DD] text-[#1D1A39] flex items-center justify-center shrink-0 active:scale-95 transition-all"
            >
              <Mic className="w-5 h-5 text-[#6B5779]" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                currentUser.role === "admin"
                  ? "Balas konsultasi sebagai Psikolog..."
                  : "Tulis cerita atau keluhanmu dengan tenang..."
              }
              className="flex-1 px-4 py-3 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] placeholder:text-[#4A4E69]/65 focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isPsychTyping}
              aria-label="Kirim Pesan Konsultasi"
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
