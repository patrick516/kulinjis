"use client";
import React, { useState, useRef } from "react";
import { galleryItems, GalleryItem } from "./galleryData";
import GalleryCard from "./GalleryCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSearch } from "../../store/SearchContext"; // import search context

const categories = [
  "All",
  "Family Portraits",
  "Clan Ceremonies",
  "Historic Sites",
  "Documents & Artifacts",
  "Tree Illustrations / Charts",
];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const { searchQuery } = useSearch(); // get current search query

  // Filter by category first
  let filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  // Then filter by search query
  if (searchQuery) {
    filteredItems = filteredItems.filter((item) =>
      (item.caption || item.alt)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }

  // Scroll animation for heading
  const headingRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0.5, 1],
  );
  const headingScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.1, 1],
  );

  // Stagger animation for category buttons
  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section
      ref={containerRef}
      className="px-4 py-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Animated Heading */}
      <motion.h2
        ref={headingRef}
        style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
        className="text-3xl md:text-4xl font-bold mb-6 text-emerald-600 italic text-center"
      >
        Clan Gallery
      </motion.h2>

      {/* Category Buttons with Stagger Animation */}
      <motion.div
        variants={buttonContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-wrap gap-3 mb-8 justify-center"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            variants={buttonVariants}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`px-4 py-2 rounded-full border transition-colors duration-300 ${
              selectedCategory === cat
                ? "bg-emerald-500 text-white border-emerald-500 shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-100"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Image Grid with Masonry Layout Animation */}
      <motion.div
        key={`${selectedCategory}-${searchQuery}`} // Reanimate when category or search changes
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {filteredItems.map((item: GalleryItem, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <GalleryCard item={item} index={index} searchQuery={searchQuery} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Gallery;
