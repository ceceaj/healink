"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Film,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export interface EduVideoTrack {
  id: string;
  moduleSlug: string;
  title: string;
  durationLabel: string;
  totalSeconds: number;
  pillarBadge: string;
  accentColor: string;
  captions: Array<{
    timeRange: [number, number];
    sceneTitle: string;
    subtitle: string;
    sceneEmoji: string;
  }>;
  keyTakeaways: string[];
}

export const EDU_VIDEO_TRACKS: EduVideoTrack[] = [
  {
    id: "vid-1",
    moduleSlug: "batasan-pribadi",
    title: "Animasi: Aturan Baju Renang & Tubuhku Berharga",
    durationLabel: "02:30",
    totalSeconds: 20,
    pillarBadge: "Pulau 1 • Batasan Pribadi",
    accentColor: "#10B981",
    captions: [
      {
        timeRange: [0, 5],
        sceneTitle: "Adegan 1: Tubuhku Milikku yang Istimewa",
        subtitle:
          "Halo teman-teman Desa Cibodas! Tubuh kita adalah milik kita sendiri yang sangat berharga dan harus dijaga.",
        sceneEmoji: "🧒🛡️✨",
      },
      {
        timeRange: [5, 10],
        sceneTitle: "Adegan 2: Mengenal Aturan Baju Renang",
        subtitle:
          "Bagian tubuh yang tertutup baju renang yaitu dada, kemaluan, dan pantat ditambah bibir adalah Bagian Pribadi!",
        sceneEmoji: "🩱🩳🔒",
      },
      {
        timeRange: [10, 15],
        sceneTitle: "Adegan 3: Sentuhan Boleh vs Tidak Boleh",
        subtitle:
          "Bersalaman atau tos dengan teman itu aman, tetapi tidak ada seorang pun yang boleh menyentuh bagian baju renangmu.",
        sceneEmoji: "🤝🚫✋",
      },
      {
        timeRange: [15, 20],
        sceneTitle: "Adegan 4: Tiga Jurus Jagoan: TIDAK, LARI, CERITA!",
        subtitle:
          "Jika ada yang melanggar, teriak TIDAK BOLEH!, segera LARI ke tempat ramai, dan CERITAKAN ke orang tua atau Kakak JEKATA!",
        sceneEmoji: "📢🏃‍♂️👨‍👩‍👧",
      },
    ],
    keyTakeaways: [
      "Bibir, dada, kemaluan, dan pantat adalah area pribadi.",
      "Berani teriak 'TIDAK BOLEH!' jika merasa tidak nyaman.",
    ],
  },
  {
    id: "vid-2",
    moduleSlug: "situasi-aman",
    title: "Cerita Animasi: Membedakan Rahasia Baik & Rahasia Buruk",
    durationLabel: "03:15",
    totalSeconds: 20,
    pillarBadge: "Pulau 3 • Situasi Aman",
    accentColor: "#FACC15",
    captions: [
      {
        timeRange: [0, 5],
        sceneTitle: "Adegan 1: Kejutan Ulang Tahun yang Menyenangkan",
        subtitle:
          "Kejutan baik seperti kado ulang tahun untuk Ibu membuat hati senang dan akhirnya akan diceritakan bersama.",
        sceneEmoji: "🎁🎂😊",
      },
      {
        timeRange: [5, 10],
        sceneTitle: "Adegan 2: Mengenal Sinyal Alarm Tubuh",
        subtitle:
          "Tapi kalau ada orang berbisik menyuruhmu menyimpan rahasia sentuhan yang membuat perut mulas dan takut, waspadalah!",
        sceneEmoji: "🤫🚨😰",
      },
      {
        timeRange: [10, 15],
        sceneTitle: "Adegan 3: Tolak Bujukan Permen & Hadiah",
        subtitle:
          "Jangan pernah mau diajak ke tempat sepi meskipun diiming-imingi permen, cokelat, atau pinjam game HP.",
        sceneEmoji: "🍬🎮🛑",
      },
      {
        timeRange: [15, 20],
        sceneTitle: "Adegan 4: Rahasia Buruk Wajib Diceritakan!",
        subtitle:
          "Rahasia buruk TIDAK BOLEH disimpan! Langsung ceritakan kepada Ayah, Ibu, Guru, atau Kakak Relawan JEKATA.",
        sceneEmoji: "🦁🗣️❤️",
      },
    ],
    keyTakeaways: [
      "Kejutan baik membuat gembira; rahasia buruk membuat takut.",
      "Rahasia buruk tidak boleh disimpan dan wajib dilaporkan.",
    ],
  },
  {
    id: "vid-3",
    moduleSlug: "cari-pertolongan",
    title: "Video Panduan: Siapa Saja Orang Dewasa Tepercaya?",
    durationLabel: "02:10",
    totalSeconds: 20,
    pillarBadge: "Pulau 4 • Berani Minta Tolong",
    accentColor: "#38BDF8",
    captions: [
      {
        timeRange: [0, 5],
        sceneTitle: "Adegan 1: Angkat 5 Jari Tanganmu!",
        subtitle:
          "Mari kita hitung 5 Jari Pelindung yang selalu siap mendengarkan dan menolongmu kapan saja di Desa Cibodas!",
        sceneEmoji: "🖐️🌟🏡",
      },
      {
        timeRange: [5, 10],
        sceneTitle: "Adegan 2: Keluarga & Guru di Sekolah",
        subtitle:
          "Jari pertama adalah Ayah dan Ibu. Jari kedua Kakek, Nenek, atau Kakak. Jari ketiga adalah Bapak dan Ibu Guru!",
        sceneEmoji: "👨‍👩‍👧👵👩‍🏫",
      },
      {
        timeRange: [10, 15],
        sceneTitle: "Adegan 3: Kakak Relawan JEKATA & Petugas Desa",
        subtitle:
          "Jari keempat adalah Kakak Relawan JEKATA & CARE Peduli. Jari kelima adalah Perangkat Desa dan Polisi.",
        sceneEmoji: "🧑‍🤝‍🧑🛡️👮",
      },
      {
        timeRange: [15, 20],
        sceneTitle: "Adegan 4: Kamu Tidak Pernah Sendirian!",
        subtitle:
          "Anak yang berani bercerita dan meminta pertolongan adalah anak hebat. Kita semua saling menjaga!",
        sceneEmoji: "🏅🌈💚",
      },
    ],
    keyTakeaways: [
      "Gunakan 5 Jari Pelindung untuk mengingat orang dewasa tepercaya.",
      "Terus bercerita sampai kamu benar-benar mendapatkan pertolongan.",
    ],
  },
];

interface EduVideoPlayerProps {
  initialModuleSlug?: string;
  compact?: boolean;
}

export default function EduVideoPlayer({
  initialModuleSlug,
  compact = false,
}: EduVideoPlayerProps) {
  const defaultTrack =
    EDU_VIDEO_TRACKS.find((t) => t.moduleSlug === initialModuleSlug) ||
    EDU_VIDEO_TRACKS[0];

  const [selectedTrack, setSelectedTrack] =
    useState<EduVideoTrack>(defaultTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lastSpokenSceneRef = useRef<string>("");

  const activeCaption =
    selectedTrack.captions.find(
      (c) =>
        elapsedSeconds >= c.timeRange[0] && elapsedSeconds < c.timeRange[1]
    ) || selectedTrack.captions[selectedTrack.captions.length - 1];

  // Speak subtitle via Web Speech API when playing & not muted
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window) ||
      !isPlaying ||
      isVoiceMuted
    ) {
      return;
    }

    const sceneKey = `${selectedTrack.id}-${activeCaption.sceneTitle}`;
    if (lastSpokenSceneRef.current === sceneKey) return;
    lastSpokenSceneRef.current = sceneKey;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeCaption.subtitle);
      utterance.lang = "id-ID";
      utterance.rate = 0.98;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors on restricted devices
    }
  }, [isPlaying, isVoiceMuted, selectedTrack.id, activeCaption]);

  // Stop speech on unmount or pause
  useEffect(() => {
    if (!isPlaying && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev + 1 >= selectedTrack.totalSeconds) {
          setIsPlaying(false);
          return selectedTrack.totalSeconds;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, selectedTrack.totalSeconds]);

  const handleSelectTrack = (track: EduVideoTrack) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    lastSpokenSceneRef.current = "";
    setSelectedTrack(track);
    setElapsedSeconds(0);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (elapsedSeconds >= selectedTrack.totalSeconds) {
      lastSpokenSceneRef.current = "";
      setElapsedSeconds(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleRestart = () => {
    lastSpokenSceneRef.current = "";
    setElapsedSeconds(0);
    setIsPlaying(true);
  };

  const progressPct = Math.min(
    100,
    Math.round((elapsedSeconds / Math.max(1, selectedTrack.totalSeconds)) * 100)
  );

  const formatTimer = (sec: number) => {
    const scaled = Math.floor(sec * 7.5);
    const mins = String(Math.floor(scaled / 60)).padStart(2, "0");
    const secs = String(scaled % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div
      className={`${
        isFullscreen
          ? "fixed inset-0 z-50 bg-[#022C22]/95 p-4 sm:p-8 flex flex-col justify-center overflow-y-auto"
          : "w-full"
      }`}
    >
      <div
        className={`grid grid-cols-1 ${
          compact ? "gap-4" : "lg:grid-cols-12 gap-5"
        } items-start`}
      >
        {/* Left / Main Column: 16:9 Cinema Video Viewport */}
        <div className={compact ? "w-full" : "lg:col-span-7 w-full"}>
          <div className="rounded-3xl bg-[#064E3B] p-3 sm:p-4 shadow-kid-card border-4 border-[#10B981] relative overflow-hidden">
            {/* Top Video Status Bar */}
            <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#10B981] text-white text-[10px] font-black uppercase shrink-0">
                  <Film className="w-3 h-3" />
                  <span>Video Animasi</span>
                </span>
                <span className="text-xs font-black text-[#FEF9C3] truncate">
                  {selectedTrack.title}
                </span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-[#FEF9C3] text-[#064E3B] text-[10px] font-black shrink-0">
                {selectedTrack.durationLabel}
              </span>
            </div>

            {/* 16:9 Animated SVG Scene Viewport */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#ECFDF5] via-[#FEF9C3] to-[#E0F2FE] border-2 border-[#FACC15] flex flex-col justify-between p-4 sm:p-6 select-none">
              {/* Decorative Animated SVG Background Scene */}
              <svg
                aria-hidden="true"
                viewBox="0 0 600 320"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-85"
              >
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ECFDF5" />
                    <stop offset="65%" stopColor="#FEF9C3" />
                    <stop offset="100%" stopColor="#A7F3D0" />
                  </linearGradient>
                </defs>
                <rect width="600" height="320" fill="url(#skyGrad)" />
                {/* Cheerful Sun */}
                <circle
                  cx="515"
                  cy="62"
                  r="34"
                  fill="#FACC15"
                  className={isPlaying ? "animate-pulse" : ""}
                />
                <circle
                  cx="515"
                  cy="62"
                  r="46"
                  fill="#FACC15"
                  fillOpacity="0.25"
                />
                {/* Soft Clouds */}
                <g fill="#FFFFFF" fillOpacity="0.85">
                  <ellipse cx="110" cy="65" rx="45" ry="20" />
                  <ellipse cx="135" cy="58" rx="32" ry="18" />
                  <ellipse cx="320" cy="52" rx="40" ry="16" />
                </g>
                {/* Rolling Green Hills of Desa Cibodas */}
                <path
                  d="M0 245 Q150 195 310 240 T600 230 L600 320 L0 320 Z"
                  fill="#34D399"
                  fillOpacity="0.55"
                />
                <path
                  d="M0 265 Q220 225 420 260 T600 255 L600 320 L0 320 Z"
                  fill="#10B981"
                  fillOpacity="0.7"
                />
              </svg>

              {/* Top Scene Badge inside Viewport */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-white/90 border border-[#10B981] text-[#064E3B] text-[10px] sm:text-xs font-black shadow-xs">
                  {activeCaption.sceneTitle}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#064E3B]/85 text-[#FEF9C3] text-[10px] font-black">
                  {isPlaying ? "▶ Sedang Diputar" : "⏸ Jeda"}
                </span>
              </div>

              {/* Center Animated Character Illustration */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                <div
                  onClick={handleTogglePlay}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleTogglePlay();
                  }}
                  className={`px-6 py-4 rounded-3xl bg-white/90 backdrop-blur-md border-4 border-[#10B981] shadow-lg cursor-pointer transition-transform duration-300 ${
                    isPlaying ? "scale-105" : "hover:scale-105"
                  }`}
                >
                  <div className="text-4xl sm:text-6xl leading-none tracking-wider">
                    {activeCaption.sceneEmoji}
                  </div>
                </div>
              </div>

              {/* Live Indonesian Subtitle Caption Bar */}
              <div className="relative z-10 w-full bg-[#064E3B]/92 backdrop-blur-md text-white px-3.5 py-2.5 rounded-2xl border border-[#10B981]/50 text-center shadow-md">
                <p className="text-xs sm:text-sm font-extrabold leading-snug text-[#FEF9C3]">
                  “{activeCaption.subtitle}”
                </p>
              </div>
            </div>

            {/* Bottom Cinema Controls Bar */}
            <div className="mt-3 space-y-2">
              {/* Interactive Progress Bar & Chapter Markers */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black text-[#FEF9C3] w-11">
                  {formatTimer(elapsedSeconds)}
                </span>

                <div className="flex-1 h-3 bg-[#022C22] rounded-full overflow-hidden p-0.5 border border-[#10B981]/50 relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#10B981] to-[#FACC15] rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(5, progressPct)}%` }}
                  />
                </div>

                <span className="text-[11px] font-black text-[#A7F3D0] w-11 text-right">
                  {selectedTrack.durationLabel}
                </span>
              </div>

              {/* Control Buttons Row */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="px-4 py-2 rounded-2xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#064E3B] font-black text-xs border-b-4 border-[#D97706] flex items-center gap-1.5 active:translate-y-0.5 transition-all"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Jeda</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Putar Video</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleRestart}
                    aria-label="Ulangi Video"
                    className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsVoiceMuted((prev) => !prev)}
                    aria-label="Suara Narasi"
                    className={`px-2.5 py-2 rounded-xl text-[11px] font-black flex items-center gap-1 transition-all ${
                      !isVoiceMuted
                        ? "bg-[#10B981] text-white"
                        : "bg-white/15 text-white/80"
                    }`}
                  >
                    {isVoiceMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">
                      {isVoiceMuted ? "Suara Mati" : "Suara Narasi"}
                    </span>
                  </button>
                </div>

                {/* Scene Quick Jump Dots + Fullscreen */}
                <div className="flex items-center gap-1.5">
                  {selectedTrack.captions.map((cap, idx) => {
                    const isCurrentScene =
                      activeCaption.sceneTitle === cap.sceneTitle;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          lastSpokenSceneRef.current = "";
                          setElapsedSeconds(cap.timeRange[0]);
                        }}
                        className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all ${
                          isCurrentScene
                            ? "bg-[#FACC15] text-[#064E3B]"
                            : "bg-white/15 text-white hover:bg-white/25"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setIsFullscreen((prev) => !prev)}
                    aria-label="Layar Penuh"
                    className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white ml-1"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Playlist & Takeaways */}
        <div
          className={
            compact ? "w-full space-y-3" : "lg:col-span-5 w-full space-y-3"
          }
        >
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-kid-card border-2 border-[#10B981] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#059669] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Daftar Video Edukasi (3 Episode)</span>
              </span>
            </div>

            <div className="space-y-2.5">
              {EDU_VIDEO_TRACKS.map((track, index) => {
                const isSelected = track.id === selectedTrack.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => handleSelectTrack(track)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? "bg-gradient-to-r from-[#ECFDF5] to-[#FEF9C3] border-[#10B981] border-b-4 shadow-xs"
                        : "bg-[#F7FBF7] border-slate-200 hover:border-[#10B981]"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                        isSelected
                          ? "bg-[#10B981] text-white"
                          : "bg-white text-[#064E3B] border border-[#10B981]/30"
                      }`}
                    >
                      {isSelected && isPlaying ? "▶" : `0${index + 1}`}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase text-[#059669]">
                          {track.pillarBadge}
                        </span>
                        <span className="text-[10px] font-black text-[#B45309] bg-[#FEF9C3] px-2 py-0.5 rounded-full">
                          {track.durationLabel}
                        </span>
                      </div>
                      <h4 className="text-xs font-black text-[#1E293B] mt-0.5 leading-snug">
                        {track.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Key Takeaways Box */}
            <div className="p-3.5 rounded-2xl bg-[#FEF9C3]/75 border border-[#FACC15] space-y-1.5">
              <span className="text-[10px] font-black uppercase text-[#B45309] block">
                💡 Pesan Penting Video Ini:
              </span>
              {selectedTrack.keyTakeaways.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-1.5 text-xs font-extrabold text-[#064E3B]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
