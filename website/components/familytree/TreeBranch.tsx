"use client";
import React, { useRef, useEffect, useState } from "react";
import { FullClanMember as ClanMember } from "@/data/fullClanMembers";
import TreeNode, { getGenColor } from "./TreeNode";

interface TreeBranchProps {
  members: ClanMember[];
  parentId?: number;
  startIndex?: number;
  depth?: number;
  generation?: number;
}

const TreeBranch: React.FC<TreeBranchProps> = ({
  members,
  parentId,
  startIndex = 1,
  depth = 0,
  generation = 1,
}) => {
  const children = members.filter((m) => m.parentId === parentId);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const colors = getGenColor(generation);

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    if (!containerRef.current || children.length === 0) return;

    const compute = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const stemX = containerRect.width / 2;
      const stemY = 0;
      const newPaths: string[] = [];

      nodeRefs.current.forEach((nodeEl) => {
        if (!nodeEl) return;
        const nodeRect = nodeEl.getBoundingClientRect();
        const targetX = nodeRect.left - containerRect.left + nodeRect.width / 2;
        const targetY = nodeRect.top - containerRect.top;
        const isLeft = targetX < stemX - 4;
        const isRight = targetX > stemX + 4;
        const stemDrop = Math.max(24, (targetY - stemY) * 0.28);
        const cp1x = stemX;
        const cp1y = stemY + stemDrop;
        const horizontalPull = isLeft
          ? targetX + (stemX - targetX) * 0.15
          : isRight
            ? targetX - (targetX - stemX) * 0.15
            : targetX;
        const cp2x = horizontalPull;
        const cp2y = targetY - stemDrop * 0.6;
        newPaths.push(
          `M ${stemX},${stemY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${targetX},${targetY}`,
        );
      });

      setPaths(newPaths);
    };

    const raf = requestAnimationFrame(() => compute());
    const observer = new ResizeObserver(() => compute());
    observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [children.length]);

  if (children.length === 0) return null;

  const SVG_HEIGHT = depth === 0 ? 80 : 64;
  const gradId = `lineGrad-${depth}-${parentId}-${generation}`;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center w-full"
    >
      {/* Connector Lines — color matches this generation */}
      <svg
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: SVG_HEIGHT, overflow: "visible" }}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor={colors.connectorGradientStart}
              stopOpacity="0.9"
            />
            <stop
              offset="100%"
              stopColor={colors.connectorGradientEnd}
              stopOpacity="0.5"
            />
          </linearGradient>
        </defs>

        {paths.map((d, i) => (
          <g key={i}>
            {/* Soft glow shadow */}
            <path
              d={d}
              fill="none"
              stroke={colors.connectorColor}
              strokeWidth={4}
              strokeOpacity={0.12}
              strokeLinecap="round"
            />
            {/* Main line */}
            <path
              d={d}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>

      <div style={{ height: SVG_HEIGHT }} />

      {/* Children */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 w-full">
        {children.map((child, idx) => {
          const globalIndex = startIndex + idx;
          const delay = idx * 80; // fast stagger
          const showChildren = expandedId === child.id;
          const childHasChildren = members.some((m) => m.parentId === child.id);

          return (
            <div
              key={child.id}
              className="flex flex-col items-center"
              ref={(el) => {
                nodeRefs.current[idx] = el;
              }}
            >
              // In TreeBranch.tsx — find this line in children.map():
              <TreeNode
                member={child}
                index={globalIndex}
                delay={delay}
                expanded={showChildren}
                onToggle={handleToggle}
                hasChildren={childHasChildren}
                generation={generation}
              />
              {showChildren && (
                <TreeBranch
                  members={members}
                  parentId={child.id}
                  startIndex={globalIndex + 1}
                  depth={depth + 1}
                  generation={generation + 1}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TreeBranch;
