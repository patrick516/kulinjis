"use client";

import React, { useEffect, useRef, useState } from "react";
import { FullClanMember as ClanMember } from "@/data/fullClanMembers";
import Image from "next/image";
import { useSearch } from "../../store/SearchContext";

interface TreeNodeProps {
  member: ClanMember;
  index?: number;
  isFounder?: boolean;
  delay?: number;
  onToggle?: (id: number) => void;
  expanded?: boolean;
  hasChildren?: boolean;
  generation?: number;
}

export const GENERATION_COLORS: Record<
  number,
  {
    border: string;
    ring: string;
    bg: string;
    badge: string;
    badgeText: string;
    avatarRing: string;
    label: string;
    labelText: string;
    connectorColor: string;
    connectorGradientStart: string;
    connectorGradientEnd: string;
    splash: string;
  }
> = {
  0: {
    border: "border-2 border-emerald-500",
    ring: "ring-2 ring-emerald-400",
    bg: "bg-white/90",
    badge: "bg-emerald-100",
    badgeText: "text-emerald-700",
    avatarRing: "ring-4 ring-emerald-400 ring-offset-2",
    label: "bg-emerald-600",
    labelText: "text-white",
    connectorColor: "#059669",
    connectorGradientStart: "#6ee7b7",
    connectorGradientEnd: "#34d399",
    splash: "rgba(16,185,129,0.35)",
  },
  1: {
    border: "border-2 border-amber-400",
    ring: "ring-2 ring-amber-300",
    bg: "bg-amber-50/90",
    badge: "bg-amber-100",
    badgeText: "text-amber-700",
    avatarRing: "ring-3 ring-amber-400 ring-offset-2",
    label: "bg-amber-500",
    labelText: "text-white",
    connectorColor: "#d97706",
    connectorGradientStart: "#fcd34d",
    connectorGradientEnd: "#f59e0b",
    splash: "rgba(245,158,11,0.25)",
  },
  2: {
    border: "border-2 border-blue-400",
    ring: "ring-2 ring-blue-300",
    bg: "bg-blue-50/90",
    badge: "bg-blue-100",
    badgeText: "text-blue-700",
    avatarRing: "ring-3 ring-blue-400 ring-offset-2",
    label: "bg-blue-500",
    labelText: "text-white",
    connectorColor: "#3b82f6",
    connectorGradientStart: "#93c5fd",
    connectorGradientEnd: "#3b82f6",
    splash: "rgba(59,130,246,0.25)",
  },
  3: {
    border: "border-2 border-purple-400",
    ring: "ring-2 ring-purple-300",
    bg: "bg-purple-50/90",
    badge: "bg-purple-100",
    badgeText: "text-purple-700",
    avatarRing: "ring-3 ring-purple-400 ring-offset-2",
    label: "bg-purple-500",
    labelText: "text-white",
    connectorColor: "#a855f7",
    connectorGradientStart: "#d8b4fe",
    connectorGradientEnd: "#a855f7",
    splash: "rgba(168,85,247,0.25)",
  },
  4: {
    border: "border-2 border-rose-400",
    ring: "ring-2 ring-rose-300",
    bg: "bg-rose-50/90",
    badge: "bg-rose-100",
    badgeText: "text-rose-700",
    avatarRing: "ring-3 ring-rose-400 ring-offset-2",
    label: "bg-rose-500",
    labelText: "text-white",
    connectorColor: "#f43f5e",
    connectorGradientStart: "#fda4af",
    connectorGradientEnd: "#f43f5e",
    splash: "rgba(244,63,94,0.25)",
  },
};

export const getGenColor = (gen: number) => GENERATION_COLORS[Math.min(gen, 4)];

export const GEN_LABELS: Record<number, string> = {
  0: "Founder",
  1: "1st Generation",
  2: "2nd Generation",
  3: "3rd Generation",
  4: "4th Generation",
};

const TreeNode: React.FC<TreeNodeProps> = ({
  member,
  index = 0,
  isFounder = false,
  delay = 0,
  onToggle,
  expanded = false,
  hasChildren = false,
  generation = 1, // FIX 1: was 0
}) => {
  const [visible, setVisible] = useState(false);
  const [splashed, setSplashed] = useState(false);
  const [showNoChildren, setShowNoChildren] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;
  const { searchQuery } = useSearch();

  // FIX 2: only real founder gets generation 0 colors
  const colors = getGenColor(isFounder ? 0 : Math.max(generation, 1));

  useEffect(() => {
    const element = nodeRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visible) {
            setTimeout(() => setVisible(true), Math.min(delay, 120));
            setTimeout(() => setSplashed(true), Math.min(delay, 120) + 300);
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, visible]);

  const highlightName = (name: string) => {
    if (!searchQuery) return name;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return name.split(regex).map((part, idx) =>
      regex.test(part) ? (
        <span key={idx} className="bg-yellow-200 rounded-sm px-0.5">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const handleClick = () => {
    if (!hasChildren) {
      setShowNoChildren(true);
      setTimeout(() => setShowNoChildren(false), 2000);
      return;
    }
    onToggle && onToggle(member.id);
  };

  return (
    <div
      ref={nodeRef}
      className={`
        relative flex flex-col items-center text-center
        transition-all duration-500 ease-out
        cursor-pointer
        w-full max-w-[160px] sm:max-w-[180px] md:max-w-[220px]
        ${
          visible
            ? "opacity-100 translate-y-0 scale-100 animate-slide-up-fade"
            : isLeft
              ? "opacity-0 -translate-x-10 scale-90"
              : "opacity-0 translate-x-10 scale-90"
        }
      `}
      onClick={handleClick}
    >
      {/* Generation label badge */}
      {visible && (
        <div
          className={`
            absolute -top-3 left-1/2 -translate-x-1/2 z-20
            text-[8px] font-bold uppercase tracking-widest
            px-2 py-0.5 rounded-full shadow-sm
            ${colors.label} ${colors.labelText}
            whitespace-nowrap
          `}
        >
          {/* FIX 3: badge text driven by isFounder flag */}
          {isFounder ? "Founder" : GEN_LABELS[Math.min(generation, 4)]}
        </div>
      )}

      {/* Splash ring */}
      {splashed && (
        <div
          className={`absolute pointer-events-none ${
            isFounder ? "animate-ping-once-founder" : "animate-ping-once"
          }`}
          style={{
            background: `radial-gradient(circle, ${colors.splash} 0%, transparent 70%)`,
            width: isFounder ? 140 : 110,
            height: isFounder ? 140 : 110,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
          }}
        />
      )}

      {/* No children tooltip */}
      {showNoChildren && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 bg-stone-800 text-white text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
          No descendants recorded
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-800" />
        </div>
      )}

      {/* Card */}
      <div
        className={`
          relative z-10 flex flex-col items-center w-full mt-3
          hover:scale-105 transition-transform duration-200
          ${colors.bg} ${colors.border}
          shadow-lg rounded-2xl px-4 py-3
          backdrop-blur-sm
          ${expanded ? `${colors.ring} ring-offset-1` : ""}
        `}
      >
        {/* Avatar */}
        <div
          className={`relative mb-2 ${
            isFounder
              ? "w-20 h-20 sm:w-24 sm:h-24"
              : "w-14 h-14 sm:w-16 sm:h-16"
          }`}
        >
          <Image
            src="/images/profile.png"
            alt={member.name}
            width={96}
            height={96}
            className={`rounded-full object-cover w-full h-full ${colors.avatarRing}`}
          />
          {isFounder && splashed && (
            <span className="absolute -bottom-1 -right-1 text-lg sm:text-xl animate-bounce-slow">
              👑
            </span>
          )}
        </div>

        {/* Name */}
        <div
          className="font-bold text-stone-800 leading-tight text-center text-xs sm:text-sm"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {highlightName(member.name)}
        </div>

        {/* Birth / death */}
        <div className="text-[9px] sm:text-[10px] text-stone-500 font-light mt-0.5">
          {member.birthYear ? `b. ${member.birthYear}` : ""}
          {member.deathYear ? ` – d. ${member.deathYear}` : ""}
        </div>

        {/* Expand / leaf indicator */}
        <div className="mt-1.5 flex items-center gap-1">
          {hasChildren ? (
            <div
              className={`text-[9px] font-semibold px-2 py-0.5 rounded-full transition-all ${colors.badge} ${colors.badgeText}`}
            >
              {expanded ? "▲ collapse" : "▼ expand"}
            </div>
          ) : (
            <div className="text-[9px] text-stone-400 italic">leaf member</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeNode;
