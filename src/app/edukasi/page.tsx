"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import { useSelena } from "@/context/SelenaContext";
import {
  Search,
  Bookmark,
  Clock,
  BookOpen,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const CATEGORY_PILLS = [
  "Semua",
  "Trauma Healing",
  "Self-Love",
  "Panic Attack",
  "Hukum & Hak",
] as const;

export default function EdukasiPage() {
  const { articles, bookmarkedIds, toggleBookmark } = useSelena();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "Semua" || article.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.author.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);

      const matchesBookmark =
        !showSavedOnly || bookmarkedIds.includes(article.id);

      return matchesCategory && matchesSearch && matchesBookmark;
    });
  }, [articles, selectedCategory, searchQuery, showSavedOnly, bookmarkedIds]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative pb-24 flex flex-col">
      {/* Top Header & Real-Time Search Bar */}
      <header className="sticky top-0 z-40 px-5 pt-5 pb-4 bg-gradient-to-b from-[#CDB4DB]/90 via-[#F4EEF8]/95 to-[#FAFAFA]/95 backdrop-blur-xl border-b border-[#CDB4DB]/30 rounded-b-3xl shadow-gentle-card">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#CDB4DB]/40 text-[11px] font-extrabold text-[#1D1A39] shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#6B5779]" />
            <span>Pusat Psikoedukasi &amp; Hukum</span>
          </div>

          <button
            type="button"
            onClick={() => setShowSavedOnly((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold transition-all active:scale-95 ${
              showSavedOnly
                ? "bg-[#1D1A39] text-white shadow-sm"
                : "bg-white/90 text-[#1D1A39] border border-[#CDB4DB]/40"
            }`}
          >
            <Bookmark
              className="w-3.5 h-3.5"
              fill={showSavedOnly ? "currentColor" : "none"}
            />
            <span>Tersimpan ({bookmarkedIds.length})</span>
          </button>
        </div>

        <h1 className="text-xl font-extrabold text-[#1D1A39]">
          Ruang Edukasi &amp; Pemulihan
        </h1>
        <p className="text-xs text-[#4A4E69] font-medium mt-0.5">
          Artikel terverifikasi psikolog klinis dan pendamping hukum penyintas
        </p>

        {/* Real-time Search Input */}
        <div className="relative mt-3.5 flex items-center">
          <Search className="w-4 h-4 text-[#6B5779] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik: panic attack, batasan diri, UU TPKS..."
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

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 pb-0.5">
          {CATEGORY_PILLS.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all active:scale-95 ${
                  isSelected
                    ? "bg-[#1D1A39] text-white shadow-sm"
                    : "bg-white/90 text-[#4A4E69] hover:bg-[#F4EEF8] hover:text-[#1D1A39] border border-[#CDB4DB]/35"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </header>

      {/* Article Cards Feed */}
      <main className="px-5 pt-4 flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#4A4E69]">
            Menampilkan{" "}
            <strong className="text-[#1D1A39]">
              {filteredArticles.length}
            </strong>{" "}
            artikel edukasi
          </span>
          {(selectedCategory !== "Semua" || searchQuery || showSavedOnly) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("Semua");
                setSearchQuery("");
                setShowSavedOnly(false);
              }}
              className="font-extrabold text-[#6B5779] hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center shadow-gentle-card border border-[#CDB4DB]/25 my-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F4EEF8] flex items-center justify-center mx-auto mb-3 text-[#6B5779]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-sm font-extrabold text-[#1D1A39]">
              Artikel tidak ditemukan
            </h2>
            <p className="text-xs text-[#4A4E69] mt-1 leading-relaxed">
              Coba gunakan kata kunci lain atau pilih kategori Semua untuk
              melihat seluruh panduan pemulihan.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("Semua");
                setSearchQuery("");
                setShowSavedOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-2xl bg-[#CDB4DB] text-[#1D1A39] text-xs font-extrabold"
            >
              Tampilkan Semua Artikel
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredArticles.map((article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);
              return (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/25 hover:border-[#CDB4DB] transition-all flex flex-col justify-between gap-3"
                >
                  {/* Top Row: Category Badge & Bookmark Action */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-[#F4EEF8] text-[#6B5779] text-[11px] font-extrabold uppercase tracking-wider">
                        {article.category}
                      </span>
                      {article.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F5] text-[#1D1A39] text-[10px] font-bold border border-[#FFC8DD]/50">
                          {article.badge}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleBookmark(article.id)}
                      aria-label={
                        isBookmarked ? "Hapus dari simpanan" : "Simpan artikel"
                      }
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold transition-all active:scale-95 ${
                        isBookmarked
                          ? "bg-[#FFC8DD] text-[#1D1A39]"
                          : "bg-[#FAFAFA] text-[#4A4E69] hover:bg-[#F4EEF8]"
                      }`}
                    >
                      <Bookmark
                        className="w-3.5 h-3.5"
                        fill={isBookmarked ? "currentColor" : "none"}
                      />
                      <span>{isBookmarked ? "Tersimpan" : "Simpan"}</span>
                    </button>
                  </div>

                  {/* Clickable Title & Justified Summary */}
                  <Link
                    href={`/edukasi/${article.slug}`}
                    className="group block"
                  >
                    <h2 className="text-base font-extrabold text-[#1D1A39] group-hover:text-[#6B5779] transition-colors leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-xs text-[#4A4E69] mt-2 leading-relaxed text-justify">
                      {article.summary}
                    </p>
                  </Link>

                  {/* Author Photo & Read CTA Footer */}
                  <div className="pt-3 border-t border-[#CDB4DB]/20 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={article.authorAvatar || "/psychologists/nadya.svg"}
                        alt={article.author}
                        className="w-9 h-9 rounded-xl object-cover border border-[#CDB4DB]/40 shrink-0 bg-[#F4EEF8]"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-[#1D1A39] truncate">
                          {article.author}
                        </p>
                        <p className="text-[11px] text-[#4A4E69] font-semibold flex items-center gap-2 mt-0.5">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#6B5779]" />
                            {article.readTime}
                          </span>
                          <span>•</span>
                          <span>{article.date}</span>
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/edukasi/${article.slug}`}
                      className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#CDB4DB] hover:bg-[#FFC8DD] text-[#1D1A39] text-xs font-extrabold shadow-sm active:scale-95 transition-all"
                    >
                      <span>Baca</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
