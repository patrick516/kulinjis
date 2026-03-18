"use client";

import Link from "next/link";
import { useSearch } from "../../store/SearchContext";

export default function Hero() {
  const { searchQuery } = useSearch();

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, idx) =>
      regex.test(part) ? (
        <span key={idx} className="bg-yellow-200 rounded-sm px-0.5">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const scrollToTree = () => {
    const tree = document.getElementById("clan-tree");
    if (tree) tree.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center py-16 sm:py-20 md:py-24 text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/landscape.jpg')" }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-stone-50/80" />

      {/* Vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(28,25,23,0.18)_100%)]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Eyebrow label */}
        <p className="inline-block text-xs sm:text-sm tracking-[0.22em] uppercase text-emerald-700 font-semibold mb-5 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50/70 backdrop-blur-sm">
          {highlightText("Kulinji Family Tree")}
        </p>

        {/* Main heading */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-900 mb-5 sm:mb-6 leading-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {highlightText("Our Clan Heritage")}
        </h2>

        {/* Decorative divider + subtitle */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 flex-wrap">
          <div className="w-10 sm:w-16 h-[2px] bg-emerald-700 rounded-full" />
          <p className="text-stone-600 text-base sm:text-lg md:text-xl font-sans">
            {highlightText("Tracing Our Roots Through Generations")}
          </p>
          <div className="w-10 sm:w-16 h-[2px] bg-emerald-700 rounded-full" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-10">
          <button
            onClick={scrollToTree}
            className="px-7 py-3 bg-emerald-600 text-white font-medium rounded-full shadow-lg hover:bg-emerald-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-sm sm:text-base"
          >
            🌿 Explore the Tree
          </button>
          <Link
            href="/family-tree"
            className="px-7 py-3 border-2 border-emerald-600 text-emerald-700 font-medium rounded-full hover:bg-emerald-600 hover:text-white hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-sm sm:text-base"
          >
            Full Family Tree
          </Link>
          <Link
            href="/history"
            className="px-7 py-3 border border-stone-300 text-stone-600 font-medium rounded-full hover:border-stone-400 hover:text-stone-800 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-sm sm:text-base"
          >
            Clan History
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-6 sm:gap-10 text-center">
          <div>
            <div
              className="text-2xl sm:text-3xl font-bold text-emerald-700"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              4+
            </div>
            <div className="text-xs sm:text-sm text-stone-500 uppercase tracking-wider mt-0.5">
              Generations
            </div>
          </div>
          <div className="w-px h-10 bg-stone-300" />
          <div>
            <div
              className="text-2xl sm:text-3xl font-bold text-emerald-700"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              50+
            </div>
            <div className="text-xs sm:text-sm text-stone-500 uppercase tracking-wider mt-0.5">
              Members
            </div>
          </div>
          <div className="w-px h-10 bg-stone-300" />
          <div>
            <div
              className="text-2xl sm:text-3xl font-bold text-emerald-700"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              1920s
            </div>
            <div className="text-xs sm:text-sm text-stone-500 uppercase tracking-wider mt-0.5">
              Est.
            </div>
          </div>
        </div>

        {/* Bouncing leaf */}
        <div className="text-emerald-700 text-2xl sm:text-3xl animate-bounce-slow mt-10">
          🍃
        </div>
      </div>
    </section>
  );
}
