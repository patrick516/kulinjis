"use client";
import React from "react";
import { clanMembers } from "../../data/clanMembers";
import TreeNode from "./TreeNode";
import TreeBranch from "./TreeBranch";

const ClanTree: React.FC = () => {
  const rootMembers = clanMembers.filter((m) => !m.parentId);
  const founder = rootMembers[0];

  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/images/landscape.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[1px]" />

      {/* Scrollable content */}
      <div className="relative z-10 flex flex-col items-center py-16 px-4">
        {/* Section title */}
        <div className="mb-10 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-3"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.04em" }}
          >
            Our Clan Heritage
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-[2px] bg-emerald-400 rounded-full" />
            <span className="text-emerald-300 text-sm tracking-widest uppercase">
              Kulinji Family Tree
            </span>
            <div className="w-14 h-[2px] bg-emerald-400 rounded-full" />
          </div>
        </div>

        {/* Founder node */}
        <TreeNode member={founder} index={0} isFounder delay={200} />

        {/* Descendants */}
        <TreeBranch
          members={clanMembers}
          parentId={founder.id}
          startIndex={1}
        />
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes pingOnce {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
          }
          70% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0.2;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
        @keyframes pingOnceFounder {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          60% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-ping-once {
          animation: pingOnce 0.9s ease-out forwards;
        }
        .animate-ping-once-founder {
          animation: pingOnceFounder 1.2s ease-out forwards;
        }
        .animate-slide-up-fade {
          animation: slideUpFade 0.7s ease forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default ClanTree;
