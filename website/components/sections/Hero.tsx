"use client";

export default function Hero() {
  return (
    <section
      className="relative w-full py-10 text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/landscape.jpg')",
      }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-stone-50/80"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Main heading */}
        <h2 className="text-5xl md:text-6xl font-sans font-semibold text-stone-900 mb-6">
          Our Clan Heritage
        </h2>

        {/* Decorative line + subtitle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-[2px] bg-emerald-700 rounded-full"></div>

          <p className="text-stone-700 text-lg md:text-xl font-sans">
            Tracing Our Roots Through Generations
          </p>

          <div className="w-10 h-[2px] bg-emerald-700 rounded-full"></div>
        </div>

        {/* Emoji / symbol */}
        <div className="text-emerald-700 text-2xl md:text-3xl animate-bounce-slow">
          🍃
        </div>
      </div>
    </section>
  );
}
