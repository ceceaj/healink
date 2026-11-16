"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { useSelena } from "@/context/SelenaContext";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Clock,
  Calendar,
  Stethoscope,
  CheckCircle2,
  HeartHandshake,
  BookOpen,
} from "lucide-react";

export default function ArticleDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { articles, bookmarkedIds, toggleBookmark } = useSelena();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const article = articles.find((a) => a.slug === slug);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2600);
  };

  if (!article) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative pb-24 flex flex-col justify-center items-center px-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#F4EEF8] flex items-center justify-center text-[#6B5779] mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-lg font-extrabold text-[#1D1A39]">
          Artikel Tidak Ditemukan
        </h1>
        <p className="text-xs text-[#4A4E69] mt-1.5 leading-relaxed">
          Maaf, artikel yang kamu cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link
          href="/edukasi"
          className="mt-5 px-5 py-3 rounded-2xl bg-[#CDB4DB] text-[#1D1A39] text-xs font-extrabold shadow-sm"
        >
          ← Kembali ke Ruang Edukasi
        </Link>
        <BottomNavigation />
      </div>
    );
  }

  const isBookmarked = bookmarkedIds.includes(article.id);
  const relatedArticles = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  const handleBookmarkClick = () => {
    toggleBookmark(article.id);
    triggerToast(
      isBookmarked
        ? "Artikel dihapus dari daftar simpanan"
        : "Artikel disimpan ke profilmu 💜"
    );
  };

  const handleShareClick = async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `/edukasi/${article.slug}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch {
      // Fallback if clipboard permission restricted
    }
    triggerToast("Link disalin!");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative pb-24 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#1D1A39] text-white text-xs font-extrabold shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Top Action Bar */}
      <header className="sticky top-0 z-40 px-4 py-3.5 bg-white/95 backdrop-blur-xl border-b border-[#CDB4DB]/30 flex items-center justify-between gap-3 shadow-sm">
        <button
          type="button"
          onClick={() => router.push("/edukasi")}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#F4EEF8] hover:bg-[#CDB4DB]/50 text-[#1D1A39] text-xs font-extrabold transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edukasi</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBookmarkClick}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all active:scale-95 ${
              isBookmarked
                ? "bg-[#FFC8DD] text-[#1D1A39] shadow-sm"
                : "bg-[#F4EEF8] text-[#1D1A39] hover:bg-[#CDB4DB]/40"
            }`}
          >
            <Bookmark
              className="w-4 h-4"
              fill={isBookmarked ? "currentColor" : "none"}
            />
            <span>{isBookmarked ? "Tersimpan" : "Simpan Artikel"}</span>
          </button>

          <button
            type="button"
            onClick={handleShareClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#1D1A39] text-white text-xs font-extrabold transition-all active:scale-95 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan</span>
          </button>
        </div>
      </header>

      {/* Article Body */}
      <main className="px-5 pt-5 flex-1 flex flex-col gap-5">
        {/* Category, Meta & Title Header Card */}
        <section className="bg-gradient-to-br from-[#F4EEF8] via-white to-[#FFF0F5] rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/35">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="px-3 py-1 rounded-full bg-[#CDB4DB] text-[#1D1A39] text-[11px] font-extrabold uppercase tracking-wider">
              {article.category}
            </span>
            {article.badge && (
              <span className="px-2.5 py-1 rounded-full bg-white text-[#6B5779] text-[11px] font-bold border border-[#CDB4DB]/40">
                {article.badge}
              </span>
            )}
          </div>

          <h1 className="text-xl font-extrabold text-[#1D1A39] leading-snug">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-[#4A4E69] font-semibold mt-3">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#6B5779]" />
              {article.readTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#6B5779]" />
              {article.date}
            </span>
          </div>

          {/* Author Credentials Box with Psychologist Photo */}
          <div className="mt-4 pt-3.5 border-t border-[#CDB4DB]/30 flex items-center gap-3">
            <img
              src={article.authorAvatar || "/psychologists/nadya.svg"}
              alt={article.author}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0 bg-[#F4EEF8]"
            />
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-[#1D1A39] truncate">
                {article.author}
              </p>
              <p className="text-[11px] text-[#6B5779] font-bold truncate">
                {article.authorCredential ||
                  "Tim Psikolog & Pendamping Terverifikasi SELENA"}
              </p>
            </div>
          </div>
        </section>

        {/* Key Summary Highlight Box (Rata Kanan-Kiri / text-justify) */}
        <section className="p-4 rounded-2xl bg-[#FFF0F5]/80 border-l-4 border-[#CDB4DB] text-xs text-[#1D1A39] font-semibold leading-relaxed text-justify">
          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B5779] mb-1 text-left">
            Intisari Pemulihan
          </span>
          {article.summary}
        </section>

        {/* Multi-Paragraph Full Content with Rata Kanan-Kiri (text-justify) */}
        <article className="bg-white rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/25 space-y-4">
          {article.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm text-[#1D1A39]/90 leading-relaxed font-medium text-justify"
            >
              {paragraph}
            </p>
          ))}
        </article>

        {/* Interactive Bookmark & Share Bar at End of Article */}
        <div className="bg-white rounded-2xl p-4 shadow-gentle-card border border-[#CDB4DB]/25 flex items-center justify-between gap-3">
          <span className="text-xs font-extrabold text-[#1D1A39]">
            Apakah artikel ini membantumu?
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBookmarkClick}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all active:scale-95 ${
                isBookmarked
                  ? "bg-[#FFC8DD] text-[#1D1A39]"
                  : "bg-[#F4EEF8] text-[#1D1A39]"
              }`}
            >
              <Bookmark
                className="w-3.5 h-3.5"
                fill={isBookmarked ? "currentColor" : "none"}
              />
              <span>{isBookmarked ? "Disimpan" : "Simpan"}</span>
            </button>
            <button
              type="button"
              onClick={handleShareClick}
              className="px-3.5 py-2 rounded-xl bg-[#CDB4DB] text-[#1D1A39] text-xs font-extrabold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan</span>
            </button>
          </div>
        </div>

        {/* Bottom CTA Card Linking to /konsultasi */}
        <section className="rounded-3xl bg-gradient-to-br from-[#CDB4DB]/75 via-[#F4EEF8] to-[#FFC8DD]/70 p-5 shadow-gentle-card border border-[#CDB4DB]/50">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#1D1A39] shadow-sm shrink-0">
              <HeartHandshake className="w-6 h-6 text-[#6B5779]" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/85 text-[10px] font-extrabold text-[#6B5779] mb-1">
                Pendampingan Profesional 1-on-1
              </span>
              <h2 className="text-base font-extrabold text-[#1D1A39] leading-snug">
                Butuh Ruang Aman untuk Bercerita Lebih Dalam?
              </h2>
              <p className="text-xs text-[#4A4E69] mt-1 leading-relaxed text-justify">
                Psikolog klinis SELENA siap mendengarkan dan mendampingi langkah
                pemulihanmu secara privat dan bebas penghakiman.
              </p>
              <Link
                href="/konsultasi"
                className="mt-3.5 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#1D1A39] text-white text-xs font-extrabold shadow-sm hover:opacity-95 active:scale-95 transition-all"
              >
                <Stethoscope className="w-4 h-4 text-[#FFC8DD]" />
                <span>Konsultasi dengan Psikolog →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="pt-2">
            <h3 className="text-sm font-extrabold text-[#1D1A39] mb-2.5">
              Bacaan Terkait Lainnya
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/edukasi/${rel.slug}`}
                  className="p-4 rounded-2xl bg-white border border-[#CDB4DB]/25 shadow-sm hover:border-[#CDB4DB] transition-all flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold text-[#6B5779] uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-extrabold text-[#1D1A39] truncate mt-0.5">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-[#4A4E69] mt-0.5">
                      {rel.readTime} • {rel.author}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-[#6B5779] shrink-0">
                    Baca →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
