"use client";
import React, { useRef, useEffect, useState } from "react";
import { ClanMember } from "../../data/clanMembers";
import TreeNode from "./TreeNode";

interface TreeBranchProps {
  members: ClanMember[];
  parentId?: number;
  startIndex?: number;
  depth?: number;
}

/**
 * Measures child node positions relative to a container ref,
 * then draws curved SVG bezier paths from the parent stem down
 * to each child — curving left for left-side children and right
 * for right-side children, matching the natural flow of the tree.
 */
const TreeBranch: React.FC<TreeBranchProps> = ({
  members,
  parentId,
  startIndex = 1,
  depth = 0,
}) => {
  const children = members.filter((m) => m.parentId === parentId);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || children.length === 0) return;

    const compute = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      // The stem starts at the horizontal center, top of the container
      const stemX = containerRect.width / 2;
      const stemY = 0;

      const newPaths: string[] = [];

      nodeRefs.current.forEach((nodeEl) => {
        if (!nodeEl) return;
        const nodeRect = nodeEl.getBoundingClientRect();

        // Target: top-center of the child node card
        const targetX = nodeRect.left - containerRect.left + nodeRect.width / 2;
        const targetY = nodeRect.top - containerRect.top;

        // Determine direction: left or right of center
        const isLeft = targetX < stemX - 4;
        const isRight = targetX > stemX + 4;

        // Vertical drop before curving — gives a clean stem before it bends
        const stemDrop = Math.max(24, (targetY - stemY) * 0.28);

        // Control points for cubic bezier:
        // CP1 — directly below the stem origin (straight down first)
        const cp1x = stemX;
        const cp1y = stemY + stemDrop;

        // CP2 — above the target, pulled toward the target's X
        // This creates the directional arc matching the child's side
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

    // Run after layout paint
    const raf = requestAnimationFrame(() => {
      compute();
    });

    const observer = new ResizeObserver(() => compute());
    observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [children.length]);

  if (children.length === 0) return null;

  // SVG height: enough to reach children
  const SVG_HEIGHT = depth === 0 ? 80 : 64;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center w-full"
    >
      {/* SVG overlay for curved connector lines */}
      <svg
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: SVG_HEIGHT, overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`lineGrad-${depth}-${parentId}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {paths.map((d, i) => (
          <g key={i}>
            {/* Glow / shadow layer */}
            <path
              d={d}
              fill="none"
              stroke="#059669"
              strokeWidth={3}
              strokeOpacity={0.15}
              strokeLinecap="round"
            />
            {/* Main curved line */}
            <path
              d={d}
              fill="none"
              stroke={`url(#lineGrad-${depth}-${parentId})`}
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeDasharray="0"
              style={{
                filter: "drop-shadow(0 0 3px rgba(52,211,153,0.4))",
              }}
            />
          </g>
        ))}
      </svg>

      {/* Spacer so children sit below the SVG stem area */}
      <div style={{ height: SVG_HEIGHT }} />

      {/* Children row */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 w-full">
        {children.map((child, idx) => {
          const globalIndex = startIndex + idx;
          const delay = globalIndex * 800;

          return (
            <div
              key={child.id}
              className="flex flex-col items-center"
              ref={(el) => {
                nodeRefs.current[idx] = el;
              }}
            >
              <TreeNode member={child} index={globalIndex} delay={delay} />
              <TreeBranch
                members={members}
                parentId={child.id}
                startIndex={globalIndex + 1}
                depth={depth + 1}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TreeBranch;
