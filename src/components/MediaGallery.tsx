"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  Maximize2,
  X,
  CheckCircle2,
  Sparkles,
  BookOpen,
} from "lucide-react";

export interface VisualPosterItem {
  id: string;
  title: string;
  subtitle: string;
  mediaFormat: string;
  moduleSlug: string;
  borderClass: string;
  badgeClass: string;
  childExplanation: string;
  keyPoints: string[];
  renderSvg: () => React.ReactNode;
}

export const VISUAL_POSTERS: VisualPosterItem[] = [
  {
    id: "poster-1",
    title: "Tubuhku Milikku (Aturan Baju Renang)",
    subtitle: "4 Area Tubuh Pribadi & 3 Jurus Jagoan: TIDAK, LARI, CERITA",
    mediaFormat: "Poster A3 • Pulau 1",
    moduleSlug: "batasan-pribadi",
    borderClass: "border-[#10B981]",
    badgeClass: "bg-[#10B981] text-white",
    childExplanation:
      "Poster edukasi visual untuk mengingatkan anak bahwa bibir, dada, kemaluan, dan pantat adalah bagian tubuh pribadi yang tertutup baju renang dan tidak boleh disentuh orang lain.",
    keyPoints: [
      "Area pribadi: Bibir, Dada, Kemaluan, dan Pantat.",
      "Jurus 1: Teriak 'TIDAK BOLEH!' dengan lantang.",
      "Jurus 2 & 3: LARI ke tempat ramai dan CERITAKAN pada Orang Tua / Relawan JEKATA.",
    ],
    renderSvg: () => (
      <svg
        viewBox="0 0 400 260"
        className="w-full h-auto rounded-2xl bg-[#ECFDF5]"
      >
        <defs>
          <linearGradient id="p1Grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ECFDF5" />
            <stop offset="100%" stopColor="#FEF9C3" />
          </linearGradient>
        </defs>
        <rect width="400" height="260" rx="20" fill="url(#p1Grad)" />
        <rect
          x="10"
          y="10"
          width="380"
          height="240"
          rx="16"
          fill="none"
          stroke="#10B981"
          strokeWidth="3"
        />
        {/* Header Banner */}
        <rect x="24" y="22" width="352" height="36" rx="12" fill="#10B981" />
        <text
          x="200"
          y="45"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          POSTER A3: TUBUHKU MILIKKU YANG BERHARGA
        </text>
        {/* Left Shield Card */}
        <rect
          x="26"
          y="72"
          width="164"
          height="162"
          rx="16"
          fill="#FFFFFF"
          stroke="#10B981"
          strokeWidth="2"
        />
        <circle cx="108" cy="118" r="32" fill="#FEF9C3" stroke="#FACC15" strokeWidth="3" />
        <text x="108" y="128" textAnchor="middle" fontSize="30">
          🩱🛡️
        </text>
        <text
          x="108"
          y="172"
          textAnchor="middle"
          fill="#064E3B"
          fontSize="12"
          fontWeight="800"
        >
          Aturan Baju Renang
        </text>
        <text
          x="108"
          y="190"
          textAnchor="middle"
          fill="#475569"
          fontSize="10"
          fontWeight="700"
        >
          Bibir • Dada • Kemaluan
        </text>
        <text
          x="108"
          y="206"
          textAnchor="middle"
          fill="#E11D48"
          fontSize="10"
          fontWeight="900"
        >
          DILARANG DISENTUH!
        </text>
        {/* Right 3 Steps Card */}
        <rect
          x="206"
          y="72"
          width="168"
          height="48"
          rx="12"
          fill="#FFE4E6"
          stroke="#FB7185"
          strokeWidth="2"
        />
        <text x="220" y="101" fill="#9F1239" fontSize="12" fontWeight="900">
          1. 🛑 Teriak TIDAK!
        </text>
        <rect
          x="206"
          y="129"
          width="168"
          height="48"
          rx="12"
          fill="#FEF9C3"
          stroke="#FACC15"
          strokeWidth="2"
        />
        <text x="220" y="158" fill="#92400E" fontSize="12" fontWeight="900">
          2. 🏃 Lari ke Keramaian
        </text>
        <rect
          x="206"
          y="186"
          width="168"
          height="48"
          rx="12"
          fill="#D1FAE5"
          stroke="#10B981"
          strokeWidth="2"
        />
        <text x="220" y="215" fill="#064E3B" fontSize="12" fontWeight="900">
          3. 🗣️ Cerita ke Orang Tua
        </text>
      </svg>
    ),
  },
  {
    id: "poster-2",
    title: "Peta Emosiku & Alarm Tubuh",
    subtitle: "Mengenali 5 Perasaan & Sinyal Tubuh Saat Tidak Nyaman",
    mediaFormat: "Kartu Visual • Pulau 2",
    moduleSlug: "pengenalan-emosi",
    borderClass: "border-[#FACC15]",
    badgeClass: "bg-[#F59E0B] text-white",
    childExplanation:
      "Kartu visual interaktif yang membantu anak mengenali ekspresi emosi serta memahami sinyal fisik 'Alarm Tubuh' (jantung berdebar, perut mulas) ditambah latihan Napas Balon 1-2-3.",
    keyPoints: [
      "Semua emosi (Senang, Sedih, Takut, Marah) itu valid dan penting.",
      "Jantung berdebar & perut mulas adalah sinyal Alarm Tubuh untuk menjauh.",
      "Gunakan Napas Balon 1-2-3 untuk menenangkan diri sebelum bercerita.",
    ],
    renderSvg: () => (
      <svg
        viewBox="0 0 400 260"
        className="w-full h-auto rounded-2xl bg-[#FEF9C3]"
      >
        <rect width="400" height="260" rx="20" fill="#FFFDF5" />
        <rect
          x="10"
          y="10"
          width="380"
          height="240"
          rx="16"
          fill="none"
          stroke="#FACC15"
          strokeWidth="3"
        />
        <rect x="24" y="22" width="352" height="36" rx="12" fill="#F59E0B" />
        <text
          x="200"
          y="45"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          KARTU VISUAL: PETA EMOSIKU &amp; ALARM TUBUH
        </text>
        {/* 4 Emotion Circles */}
        {[
          { x: 65, emoji: "😊", label: "Senang", bg: "#D1FAE5" },
          { x: 155, emoji: "😢", label: "Sedih", bg: "#E0F2FE" },
          { x: 245, emoji: "😠", label: "Marah", bg: "#FFE4E6" },
          { x: 335, emoji: "😰", label: "Takut", bg: "#FEF9C3" },
        ].map((item, idx) => (
          <g key={idx}>
            <circle
              cx={item.x}
              cy="105"
              r="30"
              fill={item.bg}
              stroke="#1E293B"
              strokeWidth="2"
            />
            <text x={item.x} y="114" textAnchor="middle" fontSize="26">
              {item.emoji}
            </text>
            <text
              x={item.x}
              y="150"
              textAnchor="middle"
              fill="#1E293B"
              fontSize="11"
              fontWeight="900"
            >
              {item.label}
            </text>
          </g>
        ))}
        {/* Bottom Alarm & Balloon Breath Banner */}
        <rect
          x="26"
          y="168"
          width="348"
          height="64"
          rx="14"
          fill="#ECFDF5"
          stroke="#10B981"
          strokeWidth="2"
        />
        <text x="200" y="192" textAnchor="middle" fill="#064E3B" fontSize="12" fontWeight="900">
          🚨 Alarm Tubuh: Jantung Berdebar &amp; Perut Mulas = Hati-Hati!
        </text>
        <text x="200" y="214" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="800">
          🎈 Tenangkan diri dengan Napas Balon 1-2-3 lalu cerita ke Ibu!
        </text>
      </svg>
    ),
  },
  {
    id: "poster-3",
    title: "Lampu Lalu Lintas Situasi Aman",
    subtitle: "Hijau Aman, Kuning Waspada, Merah Tolak & Lari",
    mediaFormat: "Poster A3 • Pulau 3",
    moduleSlug: "situasi-aman",
    borderClass: "border-[#10B981]",
    badgeClass: "bg-[#059669] text-white",
    childExplanation:
      "Menggunakan analogi Lampu Lalu Lintas agar anak mudah membedakan situasi sehari-hari yang aman (Hijau), mencurigakan (Kuning), dan berbahaya/Rahasia Buruk (Merah).",
    keyPoints: [
      "HIJAU (Aman): Bermain bersama teman di halaman terang Balai Desa Cibodas.",
      "KUNING (Waspada): Ada orang menawarkan permen/hadiah tanpa izin Ibu.",
      "MERAH (Bahaya): Diajak ke tempat sepi atau disuruh menyimpan Rahasia Buruk.",
    ],
    renderSvg: () => (
      <svg
        viewBox="0 0 400 260"
        className="w-full h-auto rounded-2xl bg-[#ECFDF5]"
      >
        <rect width="400" height="260" rx="20" fill="#F7FBF7" />
        <rect
          x="10"
          y="10"
          width="380"
          height="240"
          rx="16"
          fill="none"
          stroke="#059669"
          strokeWidth="3"
        />
        <rect x="24" y="22" width="352" height="36" rx="12" fill="#064E3B" />
        <text
          x="200"
          y="45"
          textAnchor="middle"
          fill="#FEF9C3"
          fontSize="13.5"
          fontWeight="900"
        >
          POSTER A3: LAMPU LALU LINTAS SITUASI AMAN
        </text>
        {/* Green Row */}
        <rect
          x="26"
          y="70"
          width="348"
          height="48"
          rx="12"
          fill="#D1FAE5"
          stroke="#10B981"
          strokeWidth="2"
        />
        <circle cx="54" cy="94" r="15" fill="#10B981" />
        <text x="80" y="91" fill="#064E3B" fontSize="12" fontWeight="900">
          HIJAU — SITUASI AMAN &amp; NYAMAN
        </text>
        <text x="80" y="107" fill="#065F46" fontSize="10.5" fontWeight="700">
          Bermain di tempat terang bersama teman &amp; diawasi orang tua/guru.
        </text>
        {/* Yellow Row */}
        <rect
          x="26"
          y="126"
          width="348"
          height="48"
          rx="12"
          fill="#FEF9C3"
          stroke="#FACC15"
          strokeWidth="2"
        />
        <circle cx="54" cy="150" r="15" fill="#F59E0B" />
        <text x="80" y="147" fill="#92400E" fontSize="12" fontWeight="900">
          KUNING — WASPADA &amp; JAGA JARAK
        </text>
        <text x="80" y="163" fill="#78350F" fontSize="10.5" fontWeight="700">
          Ditawari permen/hadiah oleh orang asing tanpa sepengetahuan Ibu.
        </text>
        {/* Red Row */}
        <rect
          x="26"
          y="182"
          width="348"
          height="48"
          rx="12"
          fill="#FFE4E6"
          stroke="#FB7185"
          strokeWidth="2"
        />
        <circle cx="54" cy="206" r="15" fill="#E11D48" />
        <text x="80" y="203" fill="#9F1239" fontSize="12" fontWeight="900">
          MERAH — BAHAYA! TOLAK, LARI &amp; LAPOR
        </text>
        <text x="80" y="219" fill="#881337" fontSize="10.5" fontWeight="700">
          Diajak ke tempat sepi atau diminta menyimpan Rahasia Buruk.
        </text>
      </svg>
    ),
  },
  {
    id: "poster-4",
    title: "Lingkaran 5 Jari Orang Tepercaya",
    subtitle: "5 Orang Dewasa Pelindung Anak di Desa Cibodas",
    mediaFormat: "Kartu Visual • Pulau 4",
    moduleSlug: "cari-pertolongan",
    borderClass: "border-[#FACC15]",
    badgeClass: "bg-[#D97706] text-white",
    childExplanation:
      "Membantu anak menghafal 5 kelompok orang dewasa tepercaya menggunakan ke-5 jari tangannya sendiri agar tahu ke mana harus meminta pertolongan saat takut.",
    keyPoints: [
      "1. Ayah & Ibu • 2. Kakek, Nenek & Keluarga Dekat.",
      "3. Bapak & Ibu Guru • 4. Kakak Relawan JEKATA & CARE Peduli.",
      "5. Perangkat Desa Cibodas & Polisi Sahabat Anak.",
    ],
    renderSvg: () => (
      <svg
        viewBox="0 0 400 260"
        className="w-full h-auto rounded-2xl bg-[#FEF9C3]"
      >
        <rect width="400" height="260" rx="20" fill="#FFFDF5" />
        <rect
          x="10"
          y="10"
          width="380"
          height="240"
          rx="16"
          fill="none"
          stroke="#10B981"
          strokeWidth="3"
        />
        <rect x="24" y="22" width="352" height="36" rx="12" fill="#10B981" />
        <text
          x="200"
          y="45"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="13.5"
          fontWeight="900"
        >
          KARTU VISUAL: 5 JARI PELINDUNGKU DI DESA CIBODAS
        </text>
        {/* 5 Finger Cards */}
        {[
          { x: 26, num: "1", emoji: "👨‍👩‍👧", title: "Ayah & Ibu", bg: "#ECFDF5" },
          { x: 96, num: "2", emoji: "👵", title: "Keluarga", bg: "#FEF9C3" },
          { x: 166, num: "3", emoji: "👩‍🏫", title: "Ibu Guru", bg: "#ECFDF5" },
          { x: 236, num: "4", emoji: "🧑‍🤝‍🧑", title: "Kak JEKATA", bg: "#FEF9C3" },
          { x: 306, num: "5", emoji: "👮", title: "Pak Desa", bg: "#ECFDF5" },
        ].map((f) => (
          <g key={f.num}>
            <rect
              x={f.x}
              y="72"
              width="66"
              height="112"
              rx="14"
              fill={f.bg}
              stroke="#10B981"
              strokeWidth="2"
            />
            <circle cx={f.x + 33} cy="92" r="11" fill="#FACC15" />
            <text
              x={f.x + 33}
              y="96"
              textAnchor="middle"
              fill="#064E3B"
              fontSize="11"
              fontWeight="900"
            >
              {f.num}
            </text>
            <text x={f.x + 33} y="138" textAnchor="middle" fontSize="24">
              {f.emoji}
            </text>
            <text
              x={f.x + 33}
              y="168"
              textAnchor="middle"
              fill="#064E3B"
              fontSize="10"
              fontWeight="900"
            >
              {f.title}
            </text>
          </g>
        ))}
        <rect
          x="26"
          y="196"
          width="348"
          height="38"
          rx="12"
          fill="#FEF9C3"
          stroke="#FACC15"
          strokeWidth="2"
        />
        <text
          x="200"
          y="219"
          textAnchor="middle"
          fill="#064E3B"
          fontSize="11.5"
          fontWeight="900"
        >
          🖐️ “Berani Bercerita Sampai Kamu Mendapatkan Pertolongan!”
        </text>
      </svg>
    ),
  },
];

export default function MediaGallery() {
  const [activePoster, setActivePoster] = useState<VisualPosterItem | null>(
    null
  );

  return (
    <div className="space-y-4">
      {/* Lightbox Preview Modal */}
      {activePoster && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#022C22]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActivePoster(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-[#10B981] space-y-4 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span
                  className={`inline-block px-3 py-0.5 rounded-full ${activePoster.badgeClass} text-[10px] font-black uppercase mb-1`}
                >
                  {activePoster.mediaFormat}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#064E3B]">
                  {activePoster.title}
                </h3>
                <p className="text-xs font-bold text-[#475569]">
                  {activePoster.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActivePoster(null)}
                className="px-3 py-2 rounded-2xl bg-[#FFE4E6] hover:bg-[#FB7185] hover:text-white text-[#E11D48] font-black text-xs flex items-center gap-1 transition-all shrink-0"
              >
                <X className="w-4 h-4" />
                <span>Tutup</span>
              </button>
            </div>

            {/* Large Poster Render */}
            <div className="rounded-2xl overflow-hidden border-2 border-[#10B981]/40 shadow-sm">
              {activePoster.renderSvg()}
            </div>

            {/* Child-Friendly Explanation & Key Takeaways */}
            <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#10B981] space-y-2">
              <p className="text-xs sm:text-sm font-extrabold text-[#064E3B] leading-relaxed">
                {activePoster.childExplanation}
              </p>
              <div className="space-y-1.5 pt-1">
                {activePoster.keyPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs font-bold text-[#1E293B]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <Link
                href={`/anak/materi/${activePoster.moduleSlug}`}
                onClick={() => setActivePoster(null)}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs border-b-4 border-[#064E3B] flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Baca Cerita Lengkap Pulau Ini →</span>
              </Link>

              <button
                type="button"
                onClick={() => setActivePoster(null)}
                className="px-5 py-3 rounded-2xl bg-[#FEF9C3] hover:bg-[#FACC15] text-[#064E3B] font-black text-xs border-b-4 border-[#D97706]"
              >
                Tutup Poster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4-Card Responsive Poster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VISUAL_POSTERS.map((poster) => (
          <div
            key={poster.id}
            onClick={() => setActivePoster(poster)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActivePoster(poster);
            }}
            className={`group bg-white rounded-3xl p-3.5 shadow-kid-card border-2 ${poster.borderClass} border-b-4 flex flex-col justify-between gap-3 cursor-pointer hover:-translate-y-1 transition-all`}
          >
            <div>
              {/* Poster Preview Thumbnail */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 mb-3">
                {poster.renderSvg()}
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded-xl bg-[#064E3B]/85 text-white text-[10px] font-black flex items-center gap-1 opacity-95 group-hover:bg-[#10B981] transition-colors">
                  <Maximize2 className="w-3 h-3" />
                  <span>Perbesar</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className={`px-2.5 py-0.5 rounded-full ${poster.badgeClass} text-[10px] font-black uppercase`}
                >
                  {poster.mediaFormat}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              </div>

              <h3 className="text-sm font-black text-[#064E3B] leading-snug">
                {poster.title}
              </h3>
              <p className="text-xs font-bold text-[#475569] mt-0.5 line-clamp-2">
                {poster.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActivePoster(poster);
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#ECFDF5] group-hover:bg-[#10B981] group-hover:text-white text-[#064E3B] text-xs font-black flex items-center justify-center gap-1.5 transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Lihat Poster Penuh</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
