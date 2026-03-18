"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import GlobalSearch from "@/components/common/GlobalSearch";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/family-tree", label: "Family Tree" },
  { href: "/history", label: "Clan History" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="w-full bg-[#f6f2e7] border-b border-[#e5e0d5] sticky top-0 z-50">
      {/* Top Branding */}
      <div className="flex flex-col items-center py-4">
        <div className="text-xs text-gray-500 tracking-widest uppercase">
          The
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-gray-800">
          Kulinji&apos;s
        </h1>

        {/* Global Search */}
        <GlobalSearch />

        {/* Decorative underline */}
        <div className="w-20 h-[2px] bg-[#c7bfa9] mt-2" />
      </div>

      {/* Navigation Row */}
      <div className="flex items-center justify-between px-4 md:px-10 py-3 border-t border-[#e5e0d5] relative">
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`
                relative transition-colors duration-200 pb-0.5
                ${
                  isActive(href)
                    ? "text-emerald-700 font-semibold after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-emerald-600 after:rounded-full"
                    : "text-gray-600 hover:text-emerald-700"
                }
              `}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/family-tree"
            className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-emerald-700 active:scale-95 transition-all duration-200"
          >
            Explore the Clan
          </Link>
          <span className="italic text-gray-400 text-sm hidden lg:inline">
            Discover heritage, history &amp; memories
          </span>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden absolute left-1/2 -translate-x-1/2 p-1 rounded-md hover:bg-[#ede8da] transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-1 py-4 border-t border-[#e5e0d5] bg-[#f6f2e7]">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`
                w-full text-center px-6 py-2.5 rounded-lg transition-colors duration-200
                ${
                  isActive(href)
                    ? "text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200"
                    : "text-gray-700 hover:text-emerald-700 hover:bg-[#ede8da]"
                }
              `}
            >
              {label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            href="/family-tree"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-6 py-2 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition"
          >
            Explore the Clan
          </Link>
        </div>
      )}
    </header>
  );
}
