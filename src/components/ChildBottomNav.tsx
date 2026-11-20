"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHealink } from "@/context/HealinkContext";
import {
  Home,
  Gamepad2,
  ClipboardCheck,
  Sparkles,
  BookOpen,
  Star,
  ShieldCheck,
  Users,
} from "lucide-react";

export function ChildTopNavbar() {
  const pathname = usePathname();
  const { childProfile } = useHealink();

  const desktopLinks = [
    {
      label: "Beranda",
      shortLabel: "Beranda",
      href: "/anak",
      emoji: "🏝️",
      isActive: pathname === "/anak",
    },
    {
      label: "Materi & Media",
      shortLabel: "Materi",
      href: "/anak/materi/batasan-pribadi",
      emoji: "🎬",
      isActive: pathname.startsWith("/anak/materi"),
    },
    {
      label: "Simulasi",
      shortLabel: "Simulasi",
      href: "/anak/simulasi",
      emoji: "🎮",
      isActive: pathname === "/anak/simulasi",
    },
    {
      label: "Kuis",
      shortLabel: "Kuis",
      href: "/anak/kuis",
      emoji: "⭐",
      isActive: pathname === "/anak/kuis",
    },
    {
      label: "AI Belajar",
      shortLabel: "AI Belajar",
      href: "/ai-belajar",
      emoji: "🦉",
      isActive: pathname === "/ai-belajar",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b-4 border-[#10B981] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo & Partner Badge - shrink-0 to prevent flex shrinkage/overlap */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/anak"
            className="flex items-center gap-2.5 group focus:outline-none"
            title="HEALINK: Safety Learning - Beranda Anak"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] border-2 border-[#FACC15] flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-105 transition-transform shrink-0">
              🦉
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-[#064E3B] leading-none">
                  HEALINK
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FEF9C3] border border-[#FACC15] text-[#B45309] text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
                  Safety Learning
                </span>
              </div>
              <p className="hidden md:flex items-center gap-1 text-[11px] font-bold text-[#059669] mt-0.5 leading-none">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#059669]" />
                <span className="hidden xl:inline">JEKATA x CARE Peduli • Desa Cibodas</span>
                <span className="xl:hidden">JEKATA x CARE Peduli</span>
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links (Visible on lg+ screens: 1024px and up) */}
        <nav
          aria-label="Navigasi Desktop HEALINK"
          className="hidden lg:flex items-center gap-1 bg-[#ECFDF5] p-1.5 rounded-2xl border border-[#10B981]/30 shrink-0"
        >
          {desktopLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-3 py-1.5 xl:px-3.5 xl:py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all whitespace-nowrap ${
                link.isActive
                  ? "bg-[#10B981] text-white shadow-xs border-b-2 border-[#059669]"
                  : "text-[#064E3B] hover:bg-white/80"
              }`}
            >
              <span className="text-sm leading-none">{link.emoji}</span>
              <span className="hidden xl:inline">{link.label}</span>
              <span className="xl:hidden">{link.shortLabel}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side: Child Avatar, Star Counter & Mode Switch */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Child Avatar Pill (Visible on sm+) */}
          <Link
            href="/"
            title="Ganti Nama atau Avatar"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#ECFDF5] border-2 border-[#10B981]/40 hover:border-[#10B981] transition-all"
          >
            <span className="text-base leading-none">
              {childProfile.avatar || "🐱"}
            </span>
            <span className="text-xs font-black text-[#064E3B] max-w-[85px] xl:max-w-[110px] truncate">
              {childProfile.name}
            </span>
          </Link>

          {/* Star Reward Counter */}
          <div
            title="Bintang Keberanian yang Dikumpulkan"
            className="px-2.5 sm:px-3 py-1.5 rounded-2xl bg-[#FEF9C3] border-2 border-[#FACC15] border-b-4 flex items-center gap-1.5 shadow-xs shrink-0"
          >
            <Star className="w-4 h-4 text-[#D97706] fill-[#FACC15] shrink-0" />
            <span className="text-xs font-black text-[#064E3B] whitespace-nowrap">
              {childProfile.stars}
              <span className="hidden xl:inline"> Bintang</span>
            </span>
          </div>

          {/* Mode Relawan Toggle */}
          <Link
            href="/relawan"
            title="Beralih ke Portal Fasilitator & Relawan"
            className="px-3 py-1.5 sm:py-2 rounded-2xl bg-[#064E3B] hover:bg-[#059669] text-white text-xs font-black border-b-4 border-[#022C22] flex items-center gap-1.5 active:translate-y-0.5 transition-all shrink-0"
          >
            <Users className="w-3.5 h-3.5 text-[#FACC15] shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Mode Relawan</span>
            <span className="sm:hidden">Relawan</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function ChildBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Beranda",
      href: "/anak",
      emoji: "🏝️",
      isActive: pathname === "/anak",
      icon: Home,
      activeBg: "bg-[#10B981] text-white border-b-4 border-[#059669]",
    },
    {
      label: "Materi",
      href: "/anak/materi/batasan-pribadi",
      emoji: "📚",
      isActive: pathname.startsWith("/anak/materi"),
      icon: BookOpen,
      activeBg: "bg-[#FACC15] text-[#064E3B] border-b-4 border-[#D97706]",
    },
    {
      label: "Simulasi",
      href: "/anak/simulasi",
      emoji: "🎮",
      isActive: pathname === "/anak/simulasi",
      icon: Gamepad2,
      activeBg: "bg-[#10B981] text-white border-b-4 border-[#059669]",
    },
    {
      label: "Kuis",
      href: "/anak/kuis",
      emoji: "⭐",
      isActive: pathname === "/anak/kuis",
      icon: ClipboardCheck,
      activeBg: "bg-[#FACC15] text-[#064E3B] border-b-4 border-[#D97706]",
    },
    {
      label: "AI Belajar",
      href: "/ai-belajar",
      emoji: "🦉",
      isActive: pathname === "/ai-belajar",
      icon: Sparkles,
      activeBg: "bg-[#38BDF8] text-[#1E293B] border-b-4 border-[#0284C7]",
    },
  ];

  return (
    <nav
      aria-label="Navigasi Bawah HEALINK Safety Learning"
      className="lg:hidden fixed bottom-0 left-0 right-0 w-full z-50 pb-safe bg-white/95 backdrop-blur-xl rounded-t-3xl shadow-bottom-nav border-t-4 border-[#10B981]"
    >
      <div className="flex items-center justify-around h-16 sm:h-20 px-2 max-w-lg mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-current={item.isActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 py-1.5 sm:py-2 rounded-2xl transition-all duration-150 active:translate-y-0.5 ${
              item.isActive
                ? `${item.activeBg} font-black shadow-sm`
                : "text-[#475569] hover:bg-[#ECFDF5] font-bold"
            }`}
          >
            <span className="text-xl sm:text-2xl leading-none">{item.emoji}</span>
            <span className="text-[10px] leading-tight tracking-tight mt-0.5 font-black">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
