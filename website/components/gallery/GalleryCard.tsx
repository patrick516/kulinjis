"use client";
import Image from "next/image";
import { GalleryItem } from "./galleryData";
import { motion } from "framer-motion";

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  searchQuery?: string; // added search query prop
}

// Utility to highlight matched search text
const highlightText = (text: string, query?: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-emerald-400/40 rounded px-1">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  index,
  searchQuery,
}) => {
  // Different entrance animations based on index
  const getInitialPosition = () => {
    const positions = [
      { y: 100, opacity: 0 }, // from bottom
      { x: -100, opacity: 0 }, // from left
      { x: 100, opacity: 0 }, // from right
      { y: -100, opacity: 0 }, // from top
      { scale: 0.8, opacity: 0 }, // scale in
      { rotate: -10, opacity: 0 }, // rotate in
    ];
    return positions[index % positions.length];
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
      }}
      viewport={{
        once: false,
        margin: "-50px",
        amount: 0.3,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.17, 0.55, 0.55, 1],
      }}
      whileHover={{ scale: 1.05 }}
      className="relative group overflow-hidden rounded-xl shadow-lg"
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={400}
        height={300}
        className="object-cover w-full h-60 md:h-64 lg:h-72"
      />
      <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-2 text-sm opacity-0 group-hover:opacity-100 italic text-emerald-200 transition-opacity duration-300">
        {highlightText(item.caption || item.alt, searchQuery)}
      </div>
    </motion.div>
  );
};

export default GalleryCard;
