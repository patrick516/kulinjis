"use client";
import React from "react";

interface TreeConnectorProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
}

const TreeConnector: React.FC<TreeConnectorProps> = ({ from, to }) => {
  const stemDrop = Math.max(24, (to.y - from.y) * 0.3);
  const cp1x = from.x;
  const cp1y = from.y + stemDrop;
  const horizontalPull = from.x + (to.x - from.x) * 0.3;
  const cp2x = horizontalPull;
  const cp2y = to.y - stemDrop * 0.6;

  const d = `M ${from.x},${from.y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${to.x},${to.y}`;

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
      aria-hidden="true"
    >
      <path
        d={d}
        fill="none"
        stroke="#34d399"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d={d}
        fill="none"
        stroke="#059669"
        strokeWidth={4}
        strokeOpacity={0.1}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TreeConnector;
