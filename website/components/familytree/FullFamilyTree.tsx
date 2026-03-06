"use client";

import React, { useState } from "react";
import { fullClanMembers, FullClanMember } from "../../data/fullClanMembers";
import TreeNode from "./TreeNode";

interface InteractiveTreeNodeProps {
  member: FullClanMember;
  members: FullClanMember[];
  depth?: number;
}

const InteractiveTreeNode: React.FC<InteractiveTreeNodeProps> = ({
  member,
  members,
  depth = 0,
}) => {
  const [expanded, setExpanded] = useState(false);
  const children = members.filter((m) => m.parentId === member.id);

  const handleClick = () => {
    if (children.length > 0) setExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div onClick={handleClick} className="cursor-pointer">
        <TreeNode member={member} isFounder={depth === 0} delay={depth * 200} />
      </div>

      {/* Connector line */}
      {expanded && children.length > 0 && (
        <div className="w-[2px] bg-emerald-400/60 rounded-full h-6 mt-1" />
      )}

      {/* Children */}
      {expanded && children.length > 0 && (
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 mt-2">
          {children.map((child, idx) => (
            <InteractiveTreeNode
              key={child.id}
              member={child}
              members={members}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FullFamilyTree: React.FC = () => {
  const rootMembers = fullClanMembers.filter((m) => !m.parentId);
  const founder = rootMembers[0];

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
            Complete Kulinji Family Tree
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 sm:w-14 h-[2px] bg-emerald-400 rounded-full" />
            <span className="text-emerald-300 text-xs sm:text-sm tracking-widest uppercase">
              Click a member to reveal descendants
            </span>
            <div className="w-10 sm:w-14 h-[2px] bg-emerald-400 rounded-full" />
          </div>
        </div>

        <div className="w-full max-w-[1600px] flex flex-col items-center">
          <InteractiveTreeNode
            member={founder}
            members={fullClanMembers}
            depth={0}
          />
        </div>
      </div>
    </section>
  );
};

export default FullFamilyTree;
