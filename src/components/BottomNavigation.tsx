"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelena } from "@/context/SelenaContext";
import {
  Home,
  BookOpen,
  MessageCircleHeart,
  Users,
  Stethoscope,
} from "lucide-react";

export default function BottomNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelena();

  const homeHref =
    currentUser.role === "admin" ? "/dashboard-admin" : "/dashboard-user";

  const navItems = [
    {
      label: "Home",
      href: homeHref,
      isActive:
        pathname === "/dashboard-user" ||
        pathname === "/dashboard-admin" ||
        pathname === "/profil" ||
        pathname === "/notifikasi",
      icon: Home,
    },
    {
      label: "Edukasi",
      href: "/edukasi",
      isActive: pathname === "/edukasi" || pathname.startsWith("/edukasi/"),
      icon: BookOpen,
    },
    {
      label: "AI Chat",
      href: "/chatbot",
      isActive: pathname === "/chatbot" || pathname.startsWith("/chatbot/"),
      icon: MessageCircleHeart,
    },
    {
      label: "Komunitas",
      href: "/komunitas",
      isActive: pathname === "/komunitas" || pathname.startsWith("/komunitas/"),
      icon: Users,
    },
    {
      label: "Psikolog",
      href: "/konsultasi",
      isActive:
        pathname === "/konsultasi" || pathname.startsWith("/konsultasi/"),
      icon: Stethoscope,
    },
  ];

  return (
    <nav
      aria-label="Navigasi Utama SELENA"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 pb-safe bg-white/95 backdrop-blur-2xl rounded-t-3xl shadow-bottom-nav border-t border-[#CDB4DB]/30"
    >
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-2xl transition-all duration-200 active:scale-95 ${
                item.isActive
                  ? "bg-[#FFC8DD] text-[#1D1A39] font-extrabold shadow-sm"
                  : "text-[#4A4E69] hover:text-[#1D1A39] hover:bg-[#F4EEF8]/60 font-semibold"
              }`}
            >
              <IconComponent
                className="w-5 h-5 transition-transform duration-200"
                strokeWidth={item.isActive ? 2.4 : 1.9}
              />
              <span className="text-[10px] leading-none tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
