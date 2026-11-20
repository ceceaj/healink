"use client";

import React, { useState, useEffect } from "react";
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Sparkles,
} from "lucide-react";

export interface AudioStoryTrack {
  id: string;
  title: string;
  pillar: string;
  emoji: string;
  durationLabel: string;
  narrationText: string;
}

export const AUDIO_STORY_TRACKS: AudioStoryTrack[] = [
  {
    id: "aud-1",
    title: "Cerita Audio: Kiko & Aturan Baju Renang",
    pillar: "Pulau 1 • Batasan Pribadi",
    emoji: "🛡️🐰",
    durationLabel: "01:15",
    narrationText:
      "Halo sahabat Desa Cibodas! Dengarkan cerita Kiko si Kelinci Pemberani. Kiko selalu ingat Aturan Baju Renang. Bagian tubuh yang tertutup baju renang yaitu dada, kemaluan, dan pantat ditambah bibir adalah bagian pribadi. Kalau ada yang mencoba menyentuhnya, Kiko berteriak TIDAK BOLEH!, lalu berlari ke tempat ramai dan bercerita kepada Ibu dan Kakak Relawan JEKATA.",
  },
  {
    id: "aud-2",
    title: "Cerita Audio: Alarm Ajaib & Napas Balon",
    pillar: "Pulau 2 • Pengenalan Emosi",
    emoji: "🎈💛",
    durationLabel: "01:10",
    narrationText:
      "Tubuh kita punya Alarm Ajaib! Saat berada di dekat orang yang membuat kita takut, jantung kita berdebar cepat dan perut terasa mulas. Itu sinyal agar kita segera menjauh. Setelah berada di tempat aman, mari tarik napas balon satu, dua, tiga lewat hidung, lalu hembuskan pelan lewat mulut sampai hati kembali tenang.",
  },
  {
    id: "aud-3",
    title: "Cerita Audio: Kejutan Baik vs Rahasia Buruk",
    pillar: "Pulau 3 • Situasi Aman",
    emoji: "🎁🔍",
    durationLabel: "01:20",
    narrationText:
      "Kejutan ulang tahun untuk Ibu adalah Kejutan Baik karena membuat semua orang gembira. Tetapi jika ada orang menyuruhmu menyimpan rahasia tentang sentuhan tubuh atau mengiming-imingi permen ke tempat sepi, itu adalah Rahasia Buruk! Rahasia buruk tidak boleh disimpan dan harus langsung diceritakan kepada orang tua.",
  },
  {
    id: "aud-4",
    title: "Cerita Audio: Lagu 5 Jari Pelindungku",
    pillar: "Pulau 4 • Berani Minta Tolong",
    emoji: "🖐️🤝",
    durationLabel: "01:15",
    narrationText:
      "Angkat lima jari tanganmu! Jari jempol adalah Ayah dan Ibu di rumah. Jari telunjuk adalah Kakek, Nenek, dan keluarga dekat. Jari tengah adalah Bapak dan Ibu Guru di sekolah. Jari manis adalah Kakak Relawan JEKATA Purwakarta. Jari kelingking adalah Perangkat Desa Cibodas dan Polisi. Mereka semua siap melindungimu!",
  },
];

interface EduAudioPlayerProps {
  customTitle?: string;
  customPillar?: string;
  customNarrationText?: string;
  customEmoji?: string;
}

export default function EduAudioPlayer({
  customTitle,
  customPillar,
  customNarrationText,
  customEmoji,
}: EduAudioPlayerProps) {
  const isCustomSlideMode = Boolean(customNarrationText);

  const [selectedTrack, setSelectedTrack] = useState<AudioStoryTrack>(
    AUDIO_STORY_TRACKS[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPct, setProgressPct] = useState(0);

  const activeTitle = customTitle || selectedTrack.title;
  const activePillar = customPillar || selectedTrack.pillar;
  const activeText = customNarrationText || selectedTrack.narrationText;
  const activeEmoji = customEmoji || selectedTrack.emoji;

  // Reset audio when custom slide changes
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setProgressPct(0);
  }, [activeText]);

  // Animated progress counter when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgressPct((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        return prev + 4;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const startSpeech = (textToRead: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = "id-ID";
        utterance.rate = 0.96;
        utterance.pitch = 1.1;
        utterance.onend = () => {
          setIsPlaying(false);
          setProgressPct(100);
        };
        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback visual progress timer continues
      }
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      if (progressPct >= 100) {
        setProgressPct(0);
      }
      setIsPlaying(true);
      startSpeech(activeText);
    }
  };

  const handleRestart = () => {
    setProgressPct(0);
    setIsPlaying(true);
    startSpeech(activeText);
  };

  const handleTrackChange = (track: AudioStoryTrack) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSelectedTrack(track);
    setProgressPct(0);
    setIsPlaying(true);
    startSpeech(track.narrationText);
  };

  const waveHeights = [35, 70, 50, 90, 60, 85, 45, 95, 65, 80, 50, 75, 40, 85, 55, 70];

  return (
    <div className="bg-gradient-to-br from-[#FEF9C3] via-white to-[#ECFDF5] rounded-3xl p-5 shadow-kid-card border-2 border-[#FACC15] border-b-4 space-y-4">
      {/* Header Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-2xl bg-[#10B981] text-white border-2 border-[#059669] flex items-center justify-center shadow-xs shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#059669]">
              <Volume2 className="w-3 h-3" />
              <span>Dengarkan Cerita Audio HEALINK</span>
            </span>
            <h3 className="text-sm font-black text-[#064E3B] leading-snug">
              {activeTitle}
            </h3>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-white border border-[#10B981]/40 text-[#064E3B] text-xs font-black shrink-0">
          {activeEmoji}
        </span>
      </div>

      {/* Equalizer Waveform & Progress Visualization */}
      <div className="p-4 rounded-2xl bg-white border-2 border-[#10B981]/40 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[10px] font-black uppercase">
            {activePillar}
          </span>
          <span className="text-[11px] font-black text-[#D97706]">
            {isPlaying ? "🔊 Membacakan Cerita..." : "Siap Dibacakan (TTS Indonesia)"}
          </span>
        </div>

        {/* Animated Equalizer Bars */}
        <div className="flex items-end justify-between gap-1.5 h-12 px-2 py-1 bg-[#F7FBF7] rounded-xl border border-[#10B981]/20">
          {waveHeights.map((h, idx) => {
            const barFilled = (idx / waveHeights.length) * 100 <= progressPct;
            return (
              <span
                key={idx}
                style={{
                  height: isPlaying
                    ? `${Math.max(25, ((h + idx * 17) % 85) + 15)}%`
                    : `${h}%`,
                }}
                className={`flex-1 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? idx % 2 === 0
                      ? "bg-[#10B981] animate-pulse"
                      : "bg-[#F59E0B] animate-pulse"
                    : barFilled
                    ? "bg-[#10B981]"
                    : "bg-[#10B981]/30"
                }`}
              />
            );
          })}
        </div>

        {/* Narration Script Preview */}
        <p className="text-xs font-bold text-[#1E293B] leading-relaxed bg-[#FEF9C3]/55 p-3 rounded-xl border border-[#FACC15]/60">
          “{activeText}”
        </p>

        {/* Play / Pause / Restart Controls */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={handleTogglePlay}
            className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs border-2 border-b-4 flex items-center justify-center gap-2 active:translate-y-0.5 transition-all ${
              isPlaying
                ? "bg-[#FACC15] hover:bg-[#F59E0B] text-[#064E3B] border-[#D97706]"
                : "bg-[#10B981] hover:bg-[#059669] text-white border-[#064E3B]"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Hentikan Suara</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Bacakan Cerita Ini 🔊</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRestart}
            aria-label="Ulangi Pembacaan Suara"
            className="px-3.5 py-3 rounded-2xl bg-white hover:bg-[#ECFDF5] text-[#064E3B] font-black text-xs border-2 border-[#10B981] border-b-4 flex items-center gap-1 active:translate-y-0.5 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi</span>
          </button>
        </div>
      </div>

      {/* Track Selector Pills (when not locked to a single story slide) */}
      {!isCustomSlideMode && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase text-[#064E3B] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D97706]" />
            <span>Pilih Rekaman Dongeng Audio (4 Pilar):</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AUDIO_STORY_TRACKS.map((track) => {
              const active = track.id === selectedTrack.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => handleTrackChange(track)}
                  className={`p-2.5 rounded-xl border-2 text-left text-xs font-black transition-all flex items-center gap-2 ${
                    active
                      ? "bg-[#10B981] text-white border-[#064E3B] shadow-xs"
                      : "bg-white text-[#1E293B] border-[#FACC15] hover:border-[#10B981]"
                  }`}
                >
                  <span className="text-lg shrink-0">{track.emoji}</span>
                  <span className="truncate">{track.title.replace("Cerita Audio: ", "")}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
