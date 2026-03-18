"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearch } from "../../store/SearchContext";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

interface Category {
  _id: string;
  key: string;
  name: string;
}

interface GalleryItem {
  _id: string;
  title?: string;
  caption?: string;
  alt?: string;
  imageUrl: string;
  isPublished: boolean;
  category: Category;
}

const Gallery: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [animating, setAnimating] = useState(false);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const [catRes, itemRes] = await Promise.all([
          fetch(`${API_BASE}/api/gallery/categories`),
          fetch(`${API_BASE}/api/gallery/items?limit=200`),
        ]);
        const catJson = await catRes.json();
        const itemJson = await itemRes.json();
        if (catJson.success) setCategories(catJson.data);
        if (itemJson.success) setItems(itemJson.data);
      } catch (err) {
        console.error("Failed to load gallery", err);
      } finally {
        setLoading(false);
      }
    };
    void fetchGallery();
  }, []);

  // Filter by category then search
  const filteredItems = items.filter((item) => {
    const matchesCat =
      selectedCategory === "all" || item.category?.key === selectedCategory;
    const matchesSearch = searchQuery
      ? (item.title ?? item.caption ?? item.alt ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true;
    return matchesCat && matchesSearch;
  });

  // Switch category with animation
  const handleCategoryChange = (key: string) => {
    if (key === selectedCategory) return;
    setAnimating(true);
    setTimeout(() => {
      setSelectedCategory(key);
      setAnimating(false);
    }, 220);
  };

  // Lightbox navigation
  const openLightbox = (item: GalleryItem) => {
    const idx = filteredItems.findIndex((i) => i._id === item._id);
    setLightboxIndex(idx);
    setLightbox(item);
  };

  const lightboxPrev = useCallback(() => {
    const prev =
      (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(prev);
    setLightbox(filteredItems[prev]);
  }, [lightboxIndex, filteredItems]);

  const lightboxNext = useCallback(() => {
    const next = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(next);
    setLightbox(filteredItems[next]);
  }, [lightboxIndex, filteredItems]);

  // Keyboard: Escape, arrow keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft" && lightbox) lightboxPrev();
      if (e.key === "ArrowRight" && lightbox) lightboxNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, lightboxPrev, lightboxNext]);

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.22em] uppercase text-emerald-700 font-semibold mb-3">
          Kulinji Clan
        </p>
        <h2
          className="text-3xl md:text-4xl font-semibold text-stone-800 mb-3"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Clan Gallery
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-[2px] bg-emerald-600 rounded-full" />
          <p className="text-stone-500 text-sm">
            Memories, portraits &amp; heritage
          </p>
          <div className="w-12 h-[2px] bg-emerald-600 rounded-full" />
        </div>
      </div>

      {/* Category filter pills */}
      {!loading && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              selectedCategory === "all"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm scale-105"
                : "bg-white text-stone-600 border-stone-200 hover:border-emerald-400 hover:text-emerald-700"
            }`}
          >
            All ({items.length})
          </button>
          {categories.map((cat) => {
            const count = items.filter(
              (i) => i.category?.key === cat.key,
            ).length;
            return (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  selectedCategory === cat.key
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm scale-105"
                    : "bg-white text-stone-600 border-stone-200 hover:border-emerald-400 hover:text-emerald-700"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-stone-100 rounded-xl animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredItems.length === 0 && (
        <div
          className="text-center py-20 text-stone-400"
          style={{
            animation: "fadeSlideUp 0.4s ease forwards",
          }}
        >
          <div className="text-4xl mb-3">🍃</div>
          <p className="text-base font-medium">No images found</p>
          <p className="text-sm mt-1">
            {searchQuery
              ? `No results for "${searchQuery}"`
              : "Check back soon"}
          </p>
        </div>
      )}

      {/* Image grid with staggered animation */}
      {!loading && filteredItems.length > 0 && (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 transition-opacity duration-200 ${
            animating ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
          }`}
          style={{ transition: "opacity 220ms ease, transform 220ms ease" }}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item._id}
              className="group relative cursor-pointer rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{
                animation: `fadeSlideUp 0.4s ease forwards`,
                animationDelay: `${Math.min(index * 60, 400)}ms`,
                opacity: 0,
              }}
              onClick={() => openLightbox(item)}
            >
              <div className="aspect-square overflow-hidden bg-stone-100">
                <img
                  src={item.imageUrl}
                  alt={item.alt ?? item.title ?? ""}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title && (
                    <p className="text-white text-sm font-medium leading-tight">
                      {item.title}
                    </p>
                  )}
                  {item.caption && (
                    <p className="text-stone-300 text-xs mt-0.5 line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                  {item.category?.name && (
                    <span className="mt-1.5 inline-block text-[10px] bg-emerald-600/90 text-white px-2 py-0.5 rounded-full font-medium">
                      {item.category.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Index badge */}
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-[10px] font-medium">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Count indicator */}
      {!loading && filteredItems.length > 0 && (
        <p className="text-center text-xs text-stone-400 mt-6">
          Showing {filteredItems.length} image
          {filteredItems.length !== 1 ? "s" : ""}
          {selectedCategory !== "all" && (
            <span>
              {" "}
              in{" "}
              <span className="text-emerald-600 font-medium">
                {categories.find((c) => c.key === selectedCategory)?.name}
              </span>
            </span>
          )}
        </p>
      )}

      {/* Lightbox with prev/next */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-stone-900/95 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ animation: "fadeIn 0.2s ease" }}
          onClick={() => setLightbox(null)}
        >
          {/* Prev button */}
          {filteredItems.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white text-lg"
              onClick={(e) => {
                e.stopPropagation();
                lightboxPrev();
              }}
            >
              ‹
            </button>
          )}

          {/* Image card */}
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            style={{ animation: "scaleIn 0.2s ease" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.imageUrl}
              alt={lightbox.alt ?? lightbox.title ?? ""}
              className="w-full max-h-[70vh] object-contain bg-stone-900"
            />
            <div className="p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {lightbox.title && (
                  <h3
                    className="font-semibold text-stone-800 truncate"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {lightbox.title}
                  </h3>
                )}
                {lightbox.caption && (
                  <p className="text-sm text-stone-500 mt-0.5">
                    {lightbox.caption}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  {lightbox.category?.name && (
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {lightbox.category.name}
                    </span>
                  )}
                  {filteredItems.length > 1 && (
                    <span className="text-xs text-stone-400">
                      {lightboxIndex + 1} / {filteredItems.length}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition flex-shrink-0"
              >
                <span className="text-stone-600 text-sm">✕</span>
              </button>
            </div>
          </div>

          {/* Next button */}
          {filteredItems.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white text-lg"
              onClick={(e) => {
                e.stopPropagation();
                lightboxNext();
              }}
            >
              ›
            </button>
          )}
        </div>
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1);    }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
