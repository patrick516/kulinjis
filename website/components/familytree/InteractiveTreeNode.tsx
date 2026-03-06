// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { ClanMember } from "../../data/fullClanMembers";
// import TreeNode from "./TreeNode";
// import TreeConnector from "./TreeConnector";

// interface InteractiveTreeNodeProps {
//   member: ClanMember;
//   members: ClanMember[];
//   depth?: number;
//   selectedId: number | null;
//   setSelectedId: (id: number) => void;
// }

// const InteractiveTreeNode: React.FC<InteractiveTreeNodeProps> = ({
//   member,
//   members,
//   depth = 0,
//   selectedId,
//   setSelectedId,
// }) => {
//   const [expanded, setExpanded] = useState(false);
//   const children = members
//     .filter((m) => m.parentId === member.id)
//     .sort((a, b) => (a.birthYear || 0) - (b.birthYear || 0));

//   const nodeRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

//   // Compute positions for SVG connectors
//   useEffect(() => {
//     if (!containerRef.current || !nodeRef.current) return;

//     const parentRect = nodeRef.current.getBoundingClientRect();
//     const parentX = parentRect.left + parentRect.width / 2;
//     const parentY = parentRect.top + parentRect.height / 2;

//     const newPositions = children.map((_, idx) => {
//       const childEl = containerRef.current?.children[idx] as HTMLElement;
//       if (!childEl) return { x: parentX, y: parentY };
//       const rect = childEl.getBoundingClientRect();
//       return {
//         x: rect.left + rect.width / 2,
//         y: rect.top + rect.height / 2,
//       };
//     });

//     setPositions(newPositions);
//   }, [expanded, children]);

//   return (
//     <div className="relative flex flex-col items-center w-full">
//       <div
//         ref={nodeRef}
//         className={`cursor-pointer`}
//         onClick={() => {
//           setExpanded(!expanded);
//           setSelectedId(member.id);
//         }}
//       >
//         <TreeNode
//           member={member}
//           isFounder={depth === 0}
//           index={depth}
//           delay={0}
//         />
//       </div>

//       {/* Connector SVG */}
//       {expanded &&
//         positions.map((pos, idx) => {
//           if (!nodeRef.current) return null; // Safety check

//           const fromX =
//             nodeRef.current.offsetLeft + nodeRef.current.offsetWidth / 2;
//           const fromY =
//             nodeRef.current.offsetTop + nodeRef.current.offsetHeight;

//           return (
//             <TreeConnector
//               key={idx}
//               from={{ x: fromX, y: fromY }}
//               to={{ x: pos.x, y: pos.y }}
//             />
//           );
//         })}

//       {/* Children */}
//       {expanded && children.length > 0 && (
//         <div
//           ref={containerRef}
//           className="flex flex-wrap justify-center gap-6 mt-6"
//         >
//           {children.map((child) => (
//             <InteractiveTreeNode
//               key={child.id}
//               member={child}
//               members={members}
//               depth={depth + 1}
//               selectedId={selectedId}
//               setSelectedId={setSelectedId}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InteractiveTreeNode;
