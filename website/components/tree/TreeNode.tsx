"use client";

import React, { useEffect, useState } from "react";
import { ClanMember } from "../../data/clanMembers";
import Image from "next/image";

interface TreeNodeProps {
  member: ClanMember;
  index?: number;
  isFounder?: boolean;
  delay?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  member,
  index = 0,
  isFounder = false,
  delay = 0,
}) => {
  const [visible, setVisible] = useState(false);
  const [splashed, setSplashed] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), delay);
    const t2 = setTimeout(() => setSplashed(true), delay + 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [delay]);

  return (
    <div
      className={`
        relative flex flex-col items-center text-center
        transition-all duration-700 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0 scale-100 animate-slide-up-fade"
            : isLeft
              ? "opacity-0 -translate-x-24 scale-75"
              : "opacity-0 translate-x-24 scale-75"
        }
      `}
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
            width: isFounder ? 160 : 120,
            height: isFounder ? 160 : 120,
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
          ${
            isFounder
              ? "bg-white/90 border-2 border-emerald-500 shadow-emerald-200 shadow-xl rounded-2xl px-8 py-6"
              : "bg-white/85 border border-emerald-300/60 shadow-lg rounded-xl px-5 py-4"
          }
          backdrop-blur-sm
        `}
      >
        {/* Avatar */}
        <div
          className={`relative mb-3 ${isFounder ? "w-24 h-24" : "w-16 h-16"}`}
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
            width={isFounder ? 96 : 64}
            height={isFounder ? 96 : 64}
            className="rounded-full object-cover w-full h-full"
          />
          {isFounder && splashed && (
            <span className="absolute -bottom-1 -right-1 text-xl animate-bounce-slow">
              😊
            </span>
          )}
        </div>

        {/* Name */}
        <div
          className={`font-bold text-stone-800 leading-tight ${
            isFounder ? "text-xl mb-1" : "text-sm mb-0.5"
          }`}
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {member.name}
        </div>

        {/* Founder label */}
        {isFounder && (
          <div className="text-emerald-700 font-semibold text-xs tracking-widest uppercase mb-1 mt-0.5">
            Founder of Kulinji&apos;s Generation
          </div>
        )}

        {/* Dates */}
        <div className="text-xs text-stone-500 font-light">
          {member.birthYear ? `b. ${member.birthYear}` : ""}
          {member.deathYear ? ` – d. ${member.deathYear}` : ""}
        </div>
      </div>
    </div>
  );
};

export default TreeNode;
