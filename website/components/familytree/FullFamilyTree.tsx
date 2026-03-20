"use client";

import React, { useState } from "react";
import { fullClanMembers } from "../../data/fullClanMembers";
import TreeNode, { getGenColor, GEN_LABELS } from "./TreeNode";
import TreeBranch from "./TreeBranch";

const FullFamilyTree: React.FC = () => {
  const founder = fullClanMembers.find((m) => !m.parentId);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (!founder) return null;

  // Stats
  const totalMembers = fullClanMembers.length;
  const generations =
    Math.max(
      ...fullClanMembers.map((m) => {
        let depth = 0;
        let current = m;
        while (current.parentId) {
          current =
            fullClanMembers.find((x) => x.id === current.parentId) || current;
          depth++;
          if (depth > 20) break;
        }
        return depth;
      }),
    ) + 1;

  // Legend entries
  const legendEntries = Array.from(
    { length: Math.min(generations, 5) },
    (_, i) => ({
      gen: i,
      label: i === 0 ? "Founder" : (GEN_LABELS[i] ?? `Gen ${i}`),
      colors: getGenColor(i),
    }),
  );

  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: "url('/images/landscape.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-stone-900/55 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 md:px-10 lg:px-16 py-16">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl">
          <p className="text-xs tracking-[0.22em] uppercase text-emerald-400 font-semibold mb-3">
            Full Genealogical Record
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.04em" }}
          >
            Complete Kulinji Family Tree
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-10 sm:w-14 h-[2px] bg-emerald-400 rounded-full" />
            <span className="text-stone-300 text-sm italic">
              Click any member to expand their descendants
            </span>
            <div className="w-10 sm:w-14 h-[2px] bg-emerald-400 rounded-full" />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-center px-2">
            <div className="min-w-[60px]">
              <div
                className="text-lg sm:text-xl font-bold text-emerald-400"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {totalMembers}
              </div>
              <div className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">
                Members
              </div>
            </div>

            <div className="hidden xs:block w-px h-8 bg-stone-600" />

            <div className="min-w-[60px]">
              <div
                className="text-lg sm:text-xl font-bold text-emerald-400"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {generations}
              </div>
              <div className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">
                Generations
              </div>
            </div>

            <div className="hidden xs:block w-px h-8 bg-stone-600" />

            <div className="min-w-[60px]">
              <div
                className="text-lg sm:text-xl font-bold text-emerald-400 truncate max-w-[100px] sm:max-w-none"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Mozambique
              </div>
              <div className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">
                Origin
              </div>
            </div>
          </div>
        </div>

        {/* Tree */}
        <div className="w-full max-w-[1600px] flex flex-col items-center">
          {/* Founder node */}
          <TreeNode
            member={founder}
            index={0}
            isFounder
            generation={0}
            delay={200}
            hasChildren={fullClanMembers.some((m) => m.parentId === founder.id)}
            onToggle={(id) => setSelectedId(selectedId === id ? null : id)}
            expanded={selectedId === founder.id}
          />

          {/* All descendants — TreeBranch handles every generation recursively */}
          <TreeBranch
            members={fullClanMembers}
            parentId={founder.id}
            startIndex={1}
            depth={0}
            generation={1}
          />
        </div>

        {/* Generation color legend */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {legendEntries.map(({ gen, label, colors }) => (
            <div
              key={gen}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
            >
              <div
                className={`w-3 h-3 rounded-full border-2 ${colors.border} ${colors.bg}`}
              />
              <span className="text-[10px] text-stone-300 font-medium">
                {label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <div className="w-8 h-[2px] bg-emerald-400 rounded-full" />
            <span className="text-[10px] text-stone-300 font-medium">
              Connection
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullFamilyTree;
