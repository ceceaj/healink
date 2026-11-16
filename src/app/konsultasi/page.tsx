"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { useSelena } from "@/context/SelenaContext";
import { Psychologist } from "@/data/mockData";
import {
  Stethoscope,
  ShieldCheck,
  Award,
  Clock,
  Search,
  MessageSquareHeart,
  CheckCircle2,
  ArrowRight,
  X,
  Star,
  Calendar,
  Building2,
} from "lucide-react";

export default function KonsultasiDirectoryPage() {
  const router = useRouter();
  const { psychologists, currentUser } = useSelena();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOnlineOnly, setFilterOnlineOnly] = useState(false);
  const [selectedDetailPsych, setSelectedDetailPsych] =
    useState<Psychologist | null>(null);

  const filteredPsychologists = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return psychologists.filter((psy) => {
      const matchesOnline = !filterOnlineOnly || psy.isOnline;
      const matchesSearch =
        !q ||
        psy.name.toLowerCase().includes(q) ||
        psy.specialty.toLowerCase().includes(q) ||
        psy.bio.toLowerCase().includes(q) ||
        psy.hospital.toLowerCase().includes(q);
      return matchesOnline && matchesSearch;
    });
  }, [psychologists, searchQuery, filterOnlineOnly]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative pb-24 flex flex-col">
      {/* Modal Profil Lengkap & Jadwal Praktik Psikolog */}
      {selectedDetailPsych && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#1D1A39]/60 backdrop-blur-sm flex items-center justify-center p-5"
        >
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#CDB4DB]/50 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDetailPsych.avatarUrl}
                  alt={selectedDetailPsych.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#CDB4DB] shadow-sm bg-[#F4EEF8]"
                />
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#D8F3DC] text-emerald-900 text-[10px] font-extrabold">
                    {selectedDetailPsych.strNumber}
                  </span>
                  <h2 className="text-sm font-extrabold text-[#1D1A39] mt-1">
                    {selectedDetailPsych.name}
                  </h2>
                  <p className="text-[11px] font-bold text-[#6B5779]">
                    ⭐ {selectedDetailPsych.rating}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDetailPsych(null)}
                className="p-1.5 rounded-xl bg-[#FAFAFA] text-[#4A4E69]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-[#F4EEF8]/80 border border-[#CDB4DB]/40 space-y-1.5 text-xs">
              <p className="font-extrabold text-[#1D1A39] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#6B5779]" />
                <span>{selectedDetailPsych.hospital}</span>
              </p>
              <p className="text-[#4A4E69] leading-relaxed text-justify">
                {selectedDetailPsych.bio}
              </p>
            </div>

            <div>
              <span className="text-xs font-extrabold text-[#1D1A39] flex items-center gap-1.5 mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#6B5779]" />
                <span>Slot Jadwal Konseling Tersedia:</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                {selectedDetailPsych.scheduleSlots.map((slot) => (
                  <div
                    key={slot}
                    className="px-3 py-2 rounded-xl bg-[#FAFAFA] border border-[#CDB4DB]/40 text-[11px] font-bold text-[#1D1A39] text-center"
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const targetId = selectedDetailPsych.id;
                setSelectedDetailPsych(null);
                router.push(`/konsultasi/${targetId}`);
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#1D1A39] hover:bg-[#2c2754] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <MessageSquareHeart className="w-4 h-4 text-[#FFC8DD]" />
              <span>Buka Ruang Chat Konsultasi →</span>
            </button>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 px-5 pt-5 pb-4 bg-gradient-to-b from-[#CDB4DB]/90 via-[#F4EEF8]/95 to-[#FAFAFA]/95 backdrop-blur-xl border-b border-[#CDB4DB]/35 rounded-b-3xl shadow-gentle-card">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#CDB4DB]/40 text-[11px] font-extrabold text-[#1D1A39] shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Rahasia &amp; Gratis untuk Penyintas</span>
          </div>

          <button
            type="button"
            onClick={() => setFilterOnlineOnly((prev) => !prev)}
            className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition-all flex items-center gap-1.5 ${
              filterOnlineOnly
                ? "bg-[#1D1A39] text-white"
                : "bg-white text-[#1D1A39] border border-[#CDB4DB]/40"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Online Saja</span>
          </button>
        </div>

        <h1 className="text-xl font-extrabold text-[#1D1A39] flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-[#6B5779]" />
          <span>Konsultasi Psikolog Klinis</span>
        </h1>
        <p className="text-xs text-[#4A4E69] font-medium mt-0.5">
          Konseling 1-on-1 bersama psikolog berizin praktik resmi (HIMPSI)
          sebagai <strong>{currentUser.alias}</strong>
        </p>

        {/* Search Input */}
        <div className="relative mt-3.5 flex items-center">
          <Search className="w-4 h-4 text-[#6B5779] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama psikolog, keahlian, atau lokasi klinik..."
            className="w-full pl-10 pr-9 py-2.5 text-xs font-semibold bg-white border border-[#CDB4DB]/50 rounded-2xl text-[#1D1A39] placeholder:text-[#4A4E69]/65 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Hapus pencarian"
              className="absolute right-3 text-[#4A4E69] hover:text-[#1D1A39]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Psychologist Cards Directory */}
      <main className="px-5 pt-4 flex-1 flex flex-col gap-4">
        {filteredPsychologists.map((psy) => {
          const lastMessage = psy.messages[psy.messages.length - 1];
          const specialtyTags = psy.specialty.split(/&|,/).map((s) => s.trim());

          return (
            <article
              key={psy.id}
              className="bg-white rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/30 hover:border-[#CDB4DB] transition-all flex flex-col gap-3.5"
            >
              {/* Top Row: Real Psychologist Photo, Online Dot, Name & STR */}
              <div className="flex items-start gap-3.5">
                <div className="relative shrink-0">
                  <img
                    src={psy.avatarUrl || "/psychologists/nadya.svg"}
                    alt={psy.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-2 ring-[#CDB4DB]/50 bg-[#F4EEF8]"
                  />
                  <span
                    title={psy.isOnline ? "Online" : "Jadwal Terbatas"}
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-2 ring-white ${
                      psy.isOnline ? "bg-emerald-500" : "bg-amber-400"
                    }`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        psy.isOnline
                          ? "bg-[#D8F3DC] text-emerald-900"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          psy.isOnline
                            ? "bg-emerald-600 animate-pulse"
                            : "bg-amber-500"
                        }`}
                      />
                      <span>
                        {psy.isOnline
                          ? "Online • Siap Konseling"
                          : "Respons Terjadwal"}
                      </span>
                    </span>

                    <span className="text-[10px] font-bold text-[#6B5779]">
                      {psy.strNumber}
                    </span>
                  </div>

                  <h2 className="text-base font-extrabold text-[#1D1A39] mt-1 leading-snug">
                    {psy.name}
                  </h2>

                  <p className="text-[11px] font-semibold text-[#6B5779] truncate mt-0.5">
                    {psy.hospital}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] font-bold text-[#4A4E69] mt-1">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#6B5779]" />
                      {psy.experience}
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      {psy.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specialty Tags */}
              <div className="flex flex-wrap gap-1.5">
                {specialtyTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#F4EEF8] text-[#6B5779] text-[10px] font-extrabold"
                  >
                    <Award className="w-3 h-3 shrink-0" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Justified Bio */}
              <p className="text-xs text-[#4A4E69] leading-relaxed text-justify">
                {psy.bio}
              </p>

              {/* Active Session Snippet */}
              {lastMessage && (
                <div className="p-3 rounded-2xl bg-[#FAFAFA] border border-[#CDB4DB]/25 flex items-start gap-2">
                  <MessageSquareHeart className="w-4 h-4 text-[#6B5779] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold text-[#6B5779] block">
                      Riwayat Chat Terakhir ({lastMessage.timestamp})
                    </span>
                    <p className="text-xs text-[#1D1A39]/85 truncate font-medium">
                      {lastMessage.text}
                    </p>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="pt-2.5 border-t border-[#CDB4DB]/20 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDetailPsych(psy)}
                  className="px-3.5 py-2.5 rounded-2xl bg-[#F4EEF8] hover:bg-[#CDB4DB]/50 text-[#1D1A39] text-xs font-extrabold flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#6B5779]" />
                  <span>Profil &amp; Jadwal</span>
                </button>

                <Link
                  href={`/konsultasi/${psy.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#CDB4DB] hover:bg-[#FFC8DD] text-[#1D1A39] text-xs font-extrabold shadow-soft-purple active:scale-95 transition-all"
                >
                  <span>Mulai Konsultasi Gratis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </main>

      <BottomNavigation />
    </div>
  );
}
