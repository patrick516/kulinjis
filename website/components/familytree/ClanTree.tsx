"use client";

import React, { useState } from "react";
import { clanMembers } from "../../data/clanMembers";
import TreeNode, { getGenColor, GEN_LABELS } from "./TreeNode";
import TreeBranch from "./TreeBranch";
import { useSearch } from "../../store/SearchContext";

const ClanTree: React.FC = () => {
  const rootMembers = clanMembers.filter((m) => !m.parentId);
  const founder = rootMembers[0]; // only id=1 Fabrany Kulinji
  const { searchQuery } = useSearch();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredMembers = searchQuery
    ? clanMembers.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : clanMembers;

  const filteredFounder =
    filteredMembers.find((m) => m.id === founder.id) || founder;

  const totalMembers = clanMembers.length;
  const generations =
    Math.max(
      ...clanMembers.map((m) => {
        let depth = 0;
        let current = m;
        while (current.parentId) {
          current =
            clanMembers.find((x) => x.id === current.parentId) || current;
          depth++;
          if (depth > 20) break;
        }
        return depth;
      }),
    ) + 1;

  // Generation color legend entries
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
      id="clan-tree"
      className="relative min-h-screen w-full bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: "url('/images/landscape.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-stone-900/55 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 md:px-10 lg:px-16 py-16">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl">
          <p className="text-xs tracking-[0.22em] uppercase text-emerald-400 font-semibold mb-3">
            Kulinji Family Tree
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.04em" }}
          >
            Our Clan Heritage
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-10 sm:w-14 h-[2px] bg-emerald-400 rounded-full" />
            <span className="text-stone-300 text-sm italic">
              Click any member to expand their descendants
            </span>
            <div className="w-10 sm:w-14 h-[2px] bg-emerald-400 rounded-full" />
          </div>

          {/* Mini stats */}
          <div className="flex items-center justify-center gap-6 text-center">
            <div>
              <div
                className="text-xl font-bold text-emerald-400"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {totalMembers}
              </div>
              <div className="text-xs text-stone-400 uppercase tracking-wider">
                Members
              </div>
            </div>
            <div className="w-px h-8 bg-stone-600" />
            <div>
              <div
                className="text-xl font-bold text-emerald-400"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {generations}
              </div>
              <div className="text-xs text-stone-400 uppercase tracking-wider">
                Generations
              </div>
            </div>
            <div className="w-px h-8 bg-stone-600" />
            <div>
              <div
                className="text-xl font-bold text-emerald-400"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {searchQuery ? `${filteredMembers.length} found` : "Nsanje"}
              </div>
              <div className="text-xs text-stone-400 uppercase tracking-wider">
                {searchQuery ? "Results" : "Origin"}
              </div>
            </div>
          </div>
        </div>

        {/* Search active banner */}
        {searchQuery && (
          <div className="mb-6 px-5 py-2.5 bg-emerald-900/60 border border-emerald-500/40 rounded-full text-emerald-300 text-sm backdrop-blur-sm">
            Showing {filteredMembers.length} result
            {filteredMembers.length !== 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-emerald-200">
              &ldquo;{searchQuery}&rdquo;
            </span>
          </div>
        )}

        {/* Empty state */}
        {searchQuery && filteredMembers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🍃</div>
            <p className="text-stone-300 text-lg">
              No members found for &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-stone-500 text-sm mt-1">
              Try a different name or clear the search
            </p>
          </div>
        )}

        {/* Tree */}
        {(!searchQuery || filteredMembers.length > 0) && (
          <div className="w-full max-w-[1400px] flex flex-col items-center">
            {filteredFounder && (
              <TreeNode
                member={filteredFounder}
                index={0}
                // only true when this IS the actual founder (id === founder.id)
                isFounder={filteredFounder.id === founder.id}
                generation={0}
                delay={200}
                hasChildren={clanMembers.some(
                  (m) => m.parentId === filteredFounder.id,
                )}
                onToggle={(id) => setSelectedId(selectedId === id ? null : id)}
                expanded={selectedId === filteredFounder.id}
              />
            )}
            <TreeBranch
              members={filteredMembers}
              parentId={filteredFounder.id}
              startIndex={1}
              depth={0}
              generation={1}
            />
          </div>
        )}

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

export default ClanTree;
