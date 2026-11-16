"use client";

import React from "react";

export interface RuangAmanGroup {
  id: string;
  name: string;
  category: string;
  description: string;
  activeMembers: number;
  icon: string;
  accentBg: string;
  badgeText: string;
}

interface RuangAmanCardProps {
  group: RuangAmanGroup;
  isJoined: boolean;
  onToggleJoin: (id: string) => void;
}

export default function RuangAmanCard({
  group,
  isJoined,
  onToggleJoin,
}: RuangAmanCardProps) {
  return (
    <article className="bg-white rounded-3xl p-5 shadow-gentle-card border border-selena-purple/20 flex flex-col justify-between gap-4 transition-all hover:border-selena-purple/40">
      {/* Top Row: Group Icon, Name, Category & Active Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5 min-w-0">
          <div
            className={`w-12 h-12 rounded-2xl ${group.accentBg} flex items-center justify-center text-2xl shrink-0 shadow-sm`}
          >
            {group.icon}
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-selena-purple-dark">
              {group.category}
            </span>
            <h2 className="text-base font-extrabold text-selena-text leading-snug">
              {group.name}
            </h2>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-selena-purple-light text-selena-text text-[11px] font-bold shrink-0">
          {group.badgeText}
        </span>
      </div>

      {/* Group Short Description */}
      <p className="text-xs text-selena-muted leading-relaxed">
        {group.description}
      </p>

      {/* Bottom Row: Active Member Count & "Join Grup" Button */}
      <div className="pt-3 border-t border-selena-purple/15 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold text-selena-text">
            {group.activeMembers + (isJoined ? 1 : 0)} Member Aktif
          </span>
        </div>

        <button
          type="button"
          onClick={() => onToggleJoin(group.id)}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 active:scale-95 shadow-sm ${
            isJoined
              ? "bg-selena-mint text-selena-text border border-emerald-200"
              : "bg-selena-purple hover:bg-selena-pink text-selena-text"
          }`}
        >
          {isJoined ? "✓ Terhubung" : "Join Grup"}
        </button>
      </div>
    </article>
  );
}

