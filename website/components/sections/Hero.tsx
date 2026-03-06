"use client";

import { useSearch } from "../../store/SearchContext";

export default function Hero() {
  const { searchQuery } = useSearch();

  // Function to highlight search terms in any text
  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, idx) =>
      regex.test(part) ? (
        <span key={idx} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <section
      className="relative w-full min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center py-12 sm:py-16 md:py-20 text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/landscape.jpg')",
      }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-stone-50/80"></div>

      {/* Subtle vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(28,25,23,0.18)_100%)]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Small eyebrow label */}
        <p className="inline-block text-xs sm:text-sm tracking-[0.22em] uppercase text-emerald-700 font-semibold mb-4 sm:mb-5 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50/70 backdrop-blur-sm">
          {highlightText("Kulinji Family Tree")}
        </p>

        {/* Main heading */}
        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-semibold text-stone-900 mb-5 sm:mb-6 leading-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {highlightText("Our Clan Heritage")}
        </h2>

        {/* Decorative line + subtitle */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 flex-wrap">
          <div className="w-10 sm:w-16 h-[2px] bg-emerald-700 rounded-full"></div>

          <p className="text-stone-700 text-base sm:text-lg md:text-xl font-sans">
            {highlightText("Tracing Our Roots Through Generations")}
          </p>

          <div className="w-10 h-[2px] bg-emerald-700 rounded-full"></div>
        </div>

        {/* Emoji / symbol */}
        <div className="text-emerald-700 text-2xl sm:text-3xl animate-bounce-slow">
          🍃
        </div>
      </div>
    </section>
  );
}
