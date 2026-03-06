"use client";

import React from "react";
import { clanMembers } from "../../data/clanMembers";
import TreeNode from "./TreeNode";
import TreeBranch from "./TreeBranch";
import { useSearch } from "../../store/SearchContext";

const ClanTree: React.FC = () => {
  const rootMembers = clanMembers.filter((m) => !m.parentId);
  const founder = rootMembers[0];
  const { searchQuery } = useSearch();

  // Filter members based on searchQuery
  const filteredMembers = searchQuery
    ? clanMembers.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : clanMembers;

  const filteredFounder =
    filteredMembers.find((m) => m.id === founder.id) || founder;

  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: "url('/images/landscape.png')" }}
    >
      <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-[2px]" />
      <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 md:px-10 lg:px-16 py-16">
        <div className="mb-12 text-center max-w-2xl">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.04em" }}
          >
            Our Clan Heritage
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 sm:w-14 h-[2px] bg-emerald-400 rounded-full" />
            <span className="text-emerald-300 text-xs sm:text-sm tracking-widest uppercase">
              Kulinji Family Tree
            </span>
            <div className="w-10 sm:w-14 h-[2px] bg-emerald-400 rounded-full" />
          </div>
        </div>

        <div className="w-full max-w-[1400px] flex flex-col items-center">
          {filteredFounder && (
            <TreeNode
              member={filteredFounder}
              index={0}
              isFounder
              delay={200}
              onToggle={() => {}}
              expanded
            />
          )}
          <TreeBranch
            members={filteredMembers}
            parentId={filteredFounder.id}
            startIndex={1}
          />
        </div>
      </div>
    </section>
  );
};

export default ClanTree;
