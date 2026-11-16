"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { useSelena } from "@/context/SelenaContext";
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  Sparkles,
  Stethoscope,
  Users,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function NotifikasiPage() {
  const router = useRouter();
  const {
    notifications,
    unreadNotificationCount,
    markAllNotificationsRead,
    markNotificationRead,
  } = useSelena();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "psychologist":
        return <Stethoscope className="w-5 h-5 text-[#6B5779]" />;
      case "community":
        return <Users className="w-5 h-5 text-emerald-700" />;
      case "affirmation":
        return <Sparkles className="w-5 h-5 text-[#1D1A39]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#6B5779]" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "psychologist":
        return "bg-[#CDB4DB]/55";
      case "community":
        return "bg-[#D8F3DC]";
      case "affirmation":
        return "bg-[#FFC8DD]/65";
      default:
        return "bg-[#F4EEF8]";
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative pb-24 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 px-5 pt-5 pb-4 bg-gradient-to-b from-[#CDB4DB]/85 via-[#F4EEF8]/95 to-[#FAFAFA]/95 backdrop-blur-xl border-b border-[#CDB4DB]/30 rounded-b-3xl shadow-gentle-card">
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/90 hover:bg-white text-[#1D1A39] text-xs font-extrabold shadow-sm active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>

          <button
            type="button"
            onClick={markAllNotificationsRead}
            disabled={unreadNotificationCount === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#1D1A39] disabled:bg-[#CDB4DB]/40 disabled:text-[#4A4E69] text-white text-xs font-extrabold shadow-sm active:scale-95 transition-all"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Tandai Semua Dibaca</span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-[#1D1A39] flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#6B5779]" />
              <span>Pusat Notifikasi</span>
            </h1>
            <p className="text-xs text-[#4A4E69] font-medium mt-0.5">
              Pemberitahuan balasan psikolog, afirmasi harian, dan komunitas
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-white text-[#1D1A39] text-xs font-extrabold border border-[#CDB4DB]/40 shadow-sm">
            {unreadNotificationCount} Belum Dibaca
          </span>
        </div>
      </header>

      {/* Notifications List */}
      <main className="px-5 pt-4 flex-1 flex flex-col gap-3.5">
        {notifications.map((notif) => (
          <Link
            key={notif.id}
            href={notif.link}
            onClick={() => markNotificationRead(notif.id)}
            className={`p-4 rounded-3xl border transition-all flex flex-col gap-2.5 shadow-gentle-card ${
              notif.isRead
                ? "bg-white/85 border-[#CDB4DB]/20"
                : "bg-white border-[#CDB4DB] ring-2 ring-[#CDB4DB]/25"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-11 h-11 rounded-2xl ${getNotificationBg(
                    notif.type
                  )} flex items-center justify-center shrink-0 shadow-sm`}
                >
                  {getNotificationIcon(notif.type)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {!notif.isRead && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1D1A39] shrink-0 animate-pulse" />
                    )}
                    <h2 className="text-sm font-extrabold text-[#1D1A39] leading-snug">
                      {notif.title}
                    </h2>
                  </div>
                  <p className="text-xs text-[#4A4E69] mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#CDB4DB]/20 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#4A4E69]">
                {notif.timestamp}
              </span>
              <span className="inline-flex items-center gap-1 font-extrabold text-[#6B5779]">
                <span>
                  {notif.isRead ? "Lihat Halaman" : "Buka Sekarang"}
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </main>

      <BottomNavigation />
    </div>
  );
}

