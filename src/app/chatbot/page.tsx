"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelena } from "@/context/SelenaContext";
import {
  ArrowLeft,
  RotateCcw,
  Send,
  PhoneCall,
  Stethoscope,
  BookOpen,
  ShieldAlert,
  Sparkles,
  HeartHandshake,
  X,
} from "lucide-react";

interface ChatMessageItem {
  id: string;
  sender: "ai" | "user";
  text: string;
  time: string;
  isCrisis?: boolean;
  isFallback?: boolean;
  recommendedArticleSlug?: string;
  recommendedArticleTitle?: string;
}

const QUICK_PROMPT_CHIPS = [
  "Aku lagi cemas dan takut",
  "Aku merasa bersalah atas kejadian ini",
  "Cara mengatasi panic attack",
  "Apa itu pelecehan verbal?",
];

const LOCAL_CRISIS_KEYWORDS = [
  "bunuh diri",
  "mati",
  "menyerah",
  "akhiri hidup",
  "sakiti diri",
  "lukai diri",
];

function getTimeString(): string {
  const now = new Date();
  return (
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0")
  );
}

export default function ChatbotPFAPage() {
  const router = useRouter();
  const { currentUser } = useSelena();

  const createInitialMessages = (alias: string): ChatMessageItem[] => [
    {
      id: "init-1",
      sender: "ai",
      time: "09:00",
      text: `Halo ${alias} 🌸 Selamat datang di ruang Psychological First Aid (PFA). Aku SELENA AI, Teman Pulihmu. Ruang ini 100% rahasia dan bebas penghakiman. Apa yang sedang memenuhi hati atau pikiranmu saat ini?`,
    },
  ];

  const [messages, setMessages] = useState<ChatMessageItem[]>(() =>
    createInitialMessages(currentUser.alias || "Kupu-Kupu Senja")
  );
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisBanner, setShowCrisisBanner] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showCrisisBanner]);

  const handleResetChat = () => {
    setMessages(createInitialMessages(currentUser.alias || "Kupu-Kupu Senja"));
    setInputValue("");
    setIsTyping(false);
    setShowCrisisBanner(false);
  };

  const handleSend = async (customPrompt?: string) => {
    const textToSend = (customPrompt ?? inputValue).trim();
    if (!textToSend || isTyping) return;

    const localCrisisTriggered = LOCAL_CRISIS_KEYWORDS.some((kw) =>
      textToSend.toLowerCase().includes(kw)
    );
    if (localCrisisTriggered) {
      setShowCrisisBanner(true);
    }

    const userMsg: ChatMessageItem = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend,
      time: getTimeString(),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    if (!customPrompt) {
      setInputValue("");
    }
    setIsTyping(true);

    try {
      const apiMessages = updatedHistory.map((m) => ({
        role: m.sender === "ai" ? ("model" as const) : ("user" as const),
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          userName: currentUser.alias || "Sahabat SELENA",
        }),
      });

      const data = await res.json();
      const crisisDetected = Boolean(data.isCrisis) || localCrisisTriggered;

      if (crisisDetected) {
        setShowCrisisBanner(true);
      }

      const aiMsg: ChatMessageItem = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text:
          data.reply ||
          "Aku mendengarkanmu dengan sepenuh hati. Tarik napas perlahan, kamu aman di ruang ini 💜",
        time: getTimeString(),
        isCrisis: crisisDetected,
        isFallback: Boolean(data.isFallback),
        recommendedArticleSlug: data.recommendedArticleSlug,
        recommendedArticleTitle: data.recommendedArticleTitle,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: ChatMessageItem = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: `Aku tetap di sini mendengarkanmu, ${
          currentUser.alias || "Sahabat"
        } 💜 Perasaanmu valid dan kamu tidak bersalah. Mari tarik napas 4-7-8 perlahan bersama.`,
        time: getTimeString(),
        isCrisis: localCrisisTriggered,
        isFallback: true,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative flex flex-col">
      {/* Sticky Top Header (Global BottomNavigation Hidden) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl px-4 py-3.5 shadow-gentle-card border-b border-[#CDB4DB]/35 rounded-b-3xl">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => router.push("/dashboard-user")}
              aria-label="Kembali ke Beranda"
              className="w-10 h-10 rounded-2xl bg-[#F4EEF8] hover:bg-[#CDB4DB]/40 active:scale-95 transition-all flex items-center justify-center text-[#1D1A39] shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#CDB4DB] to-[#FFC8DD] shrink-0 shadow-sm">
              <HeartHandshake className="w-5 h-5 text-[#1D1A39]" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>

            <div className="min-w-0">
              <h1 className="text-sm font-extrabold text-[#1D1A39] truncate">
                SELENA AI • Teman Pulihmu
              </h1>
              <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Online • Psychological First Aid (Gemini AI)</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetChat}
            className="px-3 py-2 rounded-2xl bg-[#F4EEF8] hover:bg-[#FFC8DD]/60 text-[#1D1A39] text-xs font-extrabold flex items-center gap-1 shrink-0 active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>
      </header>

      {/* Scrollable Chat Stream */}
      <main
        className={`flex-1 px-4 pt-4 ${
          showCrisisBanner ? "pb-80" : "pb-44"
        } overflow-y-auto space-y-4`}
      >
        {/* Safe Space Notice */}
        <div className="p-3 rounded-2xl bg-[#F4EEF8]/85 border border-[#CDB4DB]/35 text-center">
          <p className="text-[11px] text-[#4A4E69] font-semibold leading-relaxed">
            🔒 Percakapan multi-turn dengan <strong>SELENA AI</strong> bersifat
            rahasia dan mengikuti pedoman{" "}
            <strong>Psychological First Aid (PFA)</strong>.
          </p>
        </div>

        {messages.map((msg) => {
          if (msg.sender === "user") {
            return (
              <div
                key={msg.id}
                className="flex flex-col items-end gap-1 max-w-[84%] self-end ml-auto"
              >
                <div className="px-4 py-3 rounded-3xl rounded-br-md bg-[#FFC8DD] text-[#1D1A39] shadow-sm text-xs font-semibold leading-relaxed">
                  {msg.text}
                </div>
                <span className="text-[10px] font-semibold text-[#4A4E69] px-1">
                  {msg.time} • Terkirim ✓✓
                </span>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className="flex items-start gap-2.5 max-w-[92%] self-start"
            >
              <div className="w-8 h-8 rounded-2xl bg-[#CDB4DB] flex items-center justify-center shrink-0 mt-1 text-xs shadow-xs">
                🌸
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <div
                  className={`p-4 rounded-3xl rounded-tl-md shadow-gentle-card space-y-3 border ${
                    msg.isCrisis
                      ? "bg-[#FDE2E4] border-rose-300 text-[#1D1A39]"
                      : "bg-white border-[#CDB4DB]/40 text-[#1D1A39]"
                  }`}
                >
                  <div className="text-xs font-medium text-[#1D1A39] leading-relaxed whitespace-pre-line text-justify">
                    {msg.text}
                  </div>

                  {/* Action Links inside AI Bubble */}
                  <div className="pt-2 border-t border-[#CDB4DB]/25 flex flex-wrap gap-2">
                    {msg.recommendedArticleSlug && (
                      <Link
                        href={`/edukasi/${msg.recommendedArticleSlug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F4EEF8] hover:bg-[#CDB4DB]/50 text-[#1D1A39] text-[11px] font-extrabold transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#6B5779]" />
                        <span>
                          Baca: {msg.recommendedArticleTitle || "Artikel Edukasi"}
                        </span>
                      </Link>
                    )}

                    <Link
                      href="/konsultasi"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1D1A39] text-white text-[11px] font-extrabold transition-all"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-[#FFC8DD]" />
                      <span>Konsultasi Psikolog →</span>
                    </Link>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-[#4A4E69] px-1">
                  SELENA AI • {msg.time}
                </span>
              </div>
            </div>
          );
        })}

        {/* Animated 3-Dot Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2.5 max-w-[82%] self-start">
            <div className="w-8 h-8 rounded-2xl bg-[#CDB4DB] flex items-center justify-center shrink-0 text-xs">
              🌸
            </div>
            <div className="px-4 py-3 rounded-3xl rounded-tl-md bg-white border border-[#CDB4DB]/40 shadow-sm flex items-center gap-2.5">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#6B5779] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-[#6B5779] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-[#6B5779] animate-bounce" />
              </div>
              <span className="text-xs font-bold text-[#6B5779] italic">
                SELENA sedang mendengarkan...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Fixed Bottom Area: Crisis SOS Banner (when active) + Quick Prompt Chips + Input Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/95 backdrop-blur-2xl rounded-t-3xl shadow-bottom-nav border-t border-[#CDB4DB]/35 px-4 pt-2.5 pb-4 pb-safe space-y-2">
        {/* Prominent, Calming Kartu Bantuan Darurat (SOS) Banner Above Input Bar */}
        {showCrisisBanner && (
          <div
            role="alert"
            className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FDE2E4] via-[#FFF0F5] to-white border-2 border-rose-300 shadow-sm space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-rose-900">
                <ShieldAlert className="w-5 h-5 shrink-0 text-rose-700" />
                <div>
                  <h2 className="text-xs font-extrabold text-[#1D1A39]">
                    Kartu Bantuan Darurat (SOS) — Kamu Berharga 💜
                  </h2>
                  <p className="text-[11px] text-[#4A4E69] font-medium">
                    Hubungi layanan krisis bebas pulsa 24/7 atau psikolog kami:
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCrisisBanner(false)}
                aria-label="Sembunyikan banner darurat"
                className="p-1 rounded-lg text-[#4A4E69] hover:text-[#1D1A39]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:119"
                className="py-2.5 px-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-[11px] font-extrabold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span>SEJIWA 119 ext 8</span>
              </a>

              <a
                href="tel:129"
                className="py-2.5 px-3 rounded-xl bg-[#CDB4DB] hover:bg-[#FFC8DD] text-[#1D1A39] text-[11px] font-extrabold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span>SAPA 129 (KemenPPPA)</span>
              </a>
            </div>

            <Link
              href="/konsultasi"
              className="w-full py-2.5 px-3 rounded-xl bg-[#1D1A39] hover:bg-[#2c2754] text-white text-[11px] font-extrabold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
            >
              <Stethoscope className="w-3.5 h-3.5 text-[#FFC8DD]" />
              <span>Terhubung Langsung ke Psikolog SELENA →</span>
            </Link>
          </div>
        )}

        {/* Quick Prompt Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {QUICK_PROMPT_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={isTyping}
              onClick={() => handleSend(chip)}
              className="shrink-0 px-3 py-1.5 rounded-full bg-[#F4EEF8] hover:bg-[#CDB4DB]/50 text-[#1D1A39] text-[11px] font-extrabold border border-[#CDB4DB]/40 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#6B5779]" />
              <span>{chip}</span>
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ceritakan perasaanmu dengan aman di sini..."
            className="flex-1 px-4 py-3 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] placeholder:text-[#4A4E69]/65 focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            aria-label="Kirim Pesan ke SELENA AI"
            className="w-11 h-11 rounded-2xl bg-[#CDB4DB] hover:bg-[#FFC8DD] disabled:opacity-40 text-[#1D1A39] flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
