"use client";

import React, { useEffect, useRef, useState } from "react";
import { ClanMember } from "../../data/clanMembers";
import Image from "next/image";
import { useSearch } from "../../store/SearchContext";

interface TreeNodeProps {
  member: ClanMember;
  index?: number;
  isFounder?: boolean;
  delay?: number;
  onToggle?: (id: number) => void;
  expanded?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  member,
  index = 0,
  isFounder = false,
  delay = 0,
  onToggle,
  expanded = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [splashed, setSplashed] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;
  const { searchQuery } = useSearch();

  useEffect(() => {
    const element = nodeRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visible) {
            setTimeout(() => setVisible(true), delay);
            setTimeout(() => setSplashed(true), delay + 400);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, visible]);

  // Highlight search term in name
  const highlightName = (name: string) => {
    if (!searchQuery) return name;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return name.split(regex).map((part, idx) =>
      regex.test(part) ? (
        <span key={idx} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div
      ref={nodeRef}
      className={`
        relative flex flex-col items-center text-center
        transition-all duration-700 ease-out
        cursor-pointer
        w-full max-w-[160px] sm:max-w-[180px] md:max-w-[220px]
        ${
          visible
            ? "opacity-100 translate-y-0 scale-100 animate-slide-up-fade"
            : isLeft
              ? "opacity-0 -translate-x-20 scale-75"
              : "opacity-0 translate-x-20 scale-75"
        }
      `}
      onClick={() => onToggle && onToggle(member.id)}
    >
      {/* Splash ring */}
      {splashed && (
        <div
          className={`absolute pointer-events-none ${
            isFounder ? "animate-ping-once-founder" : "animate-ping-once"
          }`}
          style={{
            background: isFounder
              ? "radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(120,160,100,0.25) 0%, transparent 70%)",
            width: isFounder ? 140 : 110,
            height: isFounder ? 140 : 110,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
          }}
        />
      )}

      {/* Card */}
      <div
        className={`
          relative z-10 flex flex-col items-center
          w-full
          ${
            isFounder
              ? "bg-white/90 border-2 border-emerald-500 shadow-xl rounded-2xl px-5 py-4 sm:px-6 sm:py-5"
              : "bg-white/85 border border-emerald-300/60 shadow-lg rounded-xl px-4 py-3"
          }
          backdrop-blur-sm
          ${expanded ? "ring-2 ring-emerald-400" : ""}
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
          <div
            className={`absolute inset-0 rounded-full ${
              isFounder
                ? "ring-4 ring-emerald-400 ring-offset-2"
                : "ring-2 ring-emerald-300 ring-offset-1"
            }`}
          />
          <Image
            src="/images/profile.png"
            alt={member.name}
            width={96}
            height={96}
            className="rounded-full object-cover w-full h-full"
          />
          {isFounder && splashed && (
            <span className="absolute -bottom-1 -right-1 text-lg sm:text-xl animate-bounce-slow">
              😊
            </span>
          )}
        </div>

        {/* Name */}
        <div
          className="font-bold text-stone-800 leading-tight text-center"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {highlightName(member.name)}
        </div>

        {isFounder && (
          <div className="text-emerald-700 font-semibold text-[10px] sm:text-xs tracking-widest uppercase mb-1">
            Founder of Kulinji&apos;s Generation
          </div>
        )}

        <div className="text-[10px] sm:text-xs text-stone-500 font-light">
          {member.birthYear ? `b. ${member.birthYear}` : ""}
          {member.deathYear ? ` – d. ${member.deathYear}` : ""}
        </div>
      </div>
    </div>
  );
};

export default TreeNode;
