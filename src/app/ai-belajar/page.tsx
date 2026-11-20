"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useHealink } from "@/context/HealinkContext";
import { LearningCardAttachment } from "@/app/api/chat/route";
import ChildBottomNav, { ChildTopNavbar } from "@/components/ChildBottomNav";
import {
  Send,
  Sparkles,
  RotateCcw,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Users,
} from "lucide-react";

interface AIChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  needsTrustedAdult?: boolean;
  learningCard?: LearningCardAttachment | null;
}

const STARTER_CHIPS = [
  "Ceritain dongeng tentang berani bilang TIDAK",
  "Apa itu aturan baju renang?",
  "Kalau aku takut, harus cerita ke siapa?",
  "Ide ice breaking lagu keamanan diri untuk relawan",
];

export default function AIBelajarPage() {
  const { childProfile } = useHealink();

  const createInitialMessage = (
    name: string,
    avatar: string
  ): AIChatMessage => ({
    id: "init-0",
    sender: "ai",
    text: `Halo ${name} ${avatar}! Aku Sahabat HEALINK 🦉✨ Aku asisten belajar ramah anak untuk program Safety Learning JEKATA Purwakarta & Yayasan CARE Peduli di Desa Cibodas. Yuk pilih tombol cerita di samping/bawah atau tanyakan tentang 4 Pulau Keamanan Diri!`,
  });

  const [messages, setMessages] = useState<AIChatMessage[]>(() => [
    createInitialMessage(childProfile.name, childProfile.avatar),
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (customPrompt?: string) => {
    const promptText = (customPrompt ?? inputValue).trim();
    if (!promptText || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: promptText,
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    if (!customPrompt) setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName: childProfile.name,
          messages: nextHistory.map((m) => ({
            role: m.sender === "ai" ? "model" : "user",
            text: m.text,
          })),
        }),
      });
      const data = await res.json();

      const aiMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text:
          data.reply ||
          "Kamu anak hebat dan pemberani! Ingat selalu 5 Jari Orang Dewasa Tepercaya di sekitarmu ya.",
        needsTrustedAdult: Boolean(data.needsTrustedAdult),
        learningCard: data.learningCard || null,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: `Halo ${childProfile.name}! Ingat selalu bahwa tubuhmu berharga. Jika ada hal yang membuatmu takut atau tidak nyaman, segera ceritakan pada Orang Tua, Guru, atau Kakak Relawan JEKATA ya! 🦉💛`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FBF7] flex flex-col">
      <ChildTopNavbar />

      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 4 COLUMNS: Sidebar Guide & Quick Prompts */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-gradient-to-br from-[#064E3B] to-[#10B981] text-white rounded-3xl p-5 shadow-kid-card border-4 border-[#FACC15] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FEF9C3] border-2 border-[#FACC15] flex items-center justify-center text-2xl">
                    🦉
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#FEF9C3] block">
                      Teman Belajar Ramah Anak
                    </span>
                    <h1 className="text-base font-black text-white">
                      Sahabat HEALINK AI
                    </h1>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMessages([
                      createInitialMessage(
                        childProfile.name,
                        childProfile.avatar
                      ),
                    ])
                  }
                  title="Reset Percakapan"
                  className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs font-bold text-[#ECFDF5] leading-relaxed">
                Asisten AI khusus untuk belajar 4 Pilar Keamanan Diri,
                mendengarkan dongeng keberanian, dan membantu relawan JEKATA
                mencari ide permainan edukatif.
              </p>

              <div className="p-3 rounded-2xl bg-white/15 border border-white/25 flex items-center gap-2 text-[11px] font-extrabold text-[#FEF9C3]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  Batas Aman: AI hanya untuk edukasi, bukan pengganti orang
                  dewasa/relawan.
                </span>
              </div>
            </div>

            {/* Quick Starter Chips Card */}
            <div className="bg-white rounded-3xl p-5 shadow-kid-card border-2 border-[#FACC15] space-y-2.5">
              <span className="text-xs font-black uppercase text-[#B45309] block">
                ✨ Sentuh Pertanyaan Cepat:
              </span>
              <div className="flex flex-col gap-2">
                {STARTER_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleSend(chip)}
                    className="p-3 rounded-2xl bg-[#FEF9C3] hover:bg-[#FACC15] text-[#064E3B] text-xs font-black border-2 border-[#FACC15] border-b-4 flex items-center gap-2 active:translate-y-0.5 transition-all text-left"
                  >
                    <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>{chip}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT 8 COLUMNS: Interactive Chat Window */}
          <section className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-6 shadow-kid-card border-4 border-[#10B981] flex flex-col justify-between h-[600px] min-h-[500px]">
            {/* Messages Feed */}
            <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-4 min-h-0">
              {messages.map((msg) => {
                if (msg.sender === "user") {
                  return (
                    <div
                      key={msg.id}
                      className="flex items-end gap-2.5 max-w-[85%] self-end ml-auto justify-end"
                    >
                      <div className="p-4 rounded-3xl rounded-br-md bg-[#10B981] text-white border-2 border-[#059669] text-xs sm:text-sm font-black leading-relaxed shadow-xs">
                        {msg.text}
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-[#FEF9C3] border-2 border-[#FACC15] flex items-center justify-center text-xl shrink-0">
                        {childProfile.avatar}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className="flex items-start gap-3 max-w-[94%] self-start"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#FEF9C3] border-2 border-[#FACC15] flex items-center justify-center text-2xl shrink-0 mt-1">
                      🦉
                    </div>

                    <div className="flex-1 min-w-0 space-y-2.5">
                      <div className="p-4 sm:p-5 rounded-3xl rounded-tl-md bg-[#F7FBF7] border-2 border-[#10B981] shadow-xs space-y-3">
                        <p className="text-xs sm:text-sm font-extrabold text-[#1E293B] leading-relaxed whitespace-pre-line">
                          {msg.text}
                        </p>

                        {/* Guardrail 1: Warm Trusted Adult / JEKATA Volunteer Reminder Card */}
                        {msg.needsTrustedAdult && (
                          <div className="p-4 rounded-2xl bg-[#FFE4E6] border-2 border-[#FB7185] space-y-2.5">
                            <div className="flex items-center gap-2 text-[#E11D48]">
                              <HeartHandshake className="w-5 h-5 shrink-0" />
                              <span className="text-xs sm:text-sm font-black">
                                Hubungi Orang Dewasa Tepercaya / Relawan JEKATA
                              </span>
                            </div>
                            <p className="text-xs font-bold text-[#1E293B] leading-relaxed">
                              Kamu tidak pernah sendirian dan kamu tidak
                              bersalah. Ayo segera hampiri salah satu dari 5
                              Pelindungmu sekarang:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-black text-[#1E293B]">
                              <div className="p-2.5 rounded-xl bg-white/90 flex items-center gap-2">
                                <span>👨‍👩‍👧</span>
                                <span>1. Ayah / Ibu di Rumah</span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-white/90 flex items-center gap-2">
                                <span>👩‍🏫</span>
                                <span>2. Bapak / Ibu Guru</span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-white/90 flex items-center gap-2">
                                <span>🧑‍🤝‍🧑</span>
                                <span>3. Kakak Relawan JEKATA</span>
                              </div>
                            </div>
                            <Link
                              href="/relawan"
                              className="mt-1 w-full py-2.5 px-3 rounded-xl bg-[#E11D48] text-white text-xs font-black flex items-center justify-center gap-1.5"
                            >
                              <Users className="w-4 h-4" />
                              <span>Panggil Pendamping Relawan JEKATA →</span>
                            </Link>
                          </div>
                        )}

                        {/* Keyword-Triggered Learning Card Attachment */}
                        {msg.learningCard && (
                          <Link
                            href={msg.learningCard.href}
                            className="block p-4 rounded-2xl bg-[#ECFDF5] border-2 border-[#10B981] border-b-4 transition-all active:translate-y-0.5"
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-3xl leading-none">
                                {msg.learningCard.emoji}
                              </span>
                              <div className="min-w-0 flex-1">
                                <span className="text-[10px] font-black uppercase text-[#059669] block">
                                  {msg.learningCard.pillar}
                                </span>
                                <h3 className="text-xs sm:text-sm font-black text-[#064E3B] leading-snug">
                                  {msg.learningCard.title}
                                </h3>
                                <p className="text-xs font-bold text-[#475569] mt-0.5 leading-snug">
                                  {msg.learningCard.description}
                                </p>
                                <span className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FACC15] text-[#064E3B] text-xs font-black shadow-xs">
                                  <span>{msg.learningCard.ctaLabel}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs font-black text-[#059669] px-2">
                  <span className="animate-bounce">🦉</span>
                  <span>Sahabat HEALINK sedang menyiapkan jawaban...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2.5 bg-[#F7FBF7] p-2.5 rounded-2xl border-2 border-[#10B981]"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tulis pertanyaanmu ke Sahabat HEALINK di sini..."
                className="flex-1 px-3 py-2.5 text-xs sm:text-sm font-extrabold bg-transparent text-[#064E3B] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-[#FACC15] hover:bg-[#F59E0B] disabled:opacity-40 text-[#064E3B] font-black text-xs sm:text-sm border-b-4 border-[#D97706] flex items-center gap-1.5 active:translate-y-0.5 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Kirim</span>
              </button>
            </form>
          </section>
        </div>
      </main>

      <ChildBottomNav />
    </div>
  );
}
