"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#f6f2e7] border-b border-[#e5e0d5] sticky top-0 z-50">
      {/* Top Branding */}
      <div className="flex flex-col items-center py-4">
        <div className="text-xs text-gray-500 tracking-widest">The</div>

        <h1 className="text-3xl md:text-4xl font-serif text-gray-800">
          Kulinji's
        </h1>

        <div className="w-20 h-[2px] bg-[#c7bfa9] mt-2"></div>
      </div>

      {/* Navigation Row */}
      <div className="flex items-center justify-between px-4 md:px-10 py-3 border-t border-[#e5e0d5]">
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-green-700 transition">
            Home
          </Link>

          <Link href="/family-tree" className="hover:text-green-700 transition">
            Family Tree
          </Link>

          <Link href="/history" className="hover:text-green-700 transition">
            Clan History
          </Link>

          <Link href="/gallery" className="hover:text-green-700 transition">
            Gallery
          </Link>
        </nav>

        {/* Search */}
        <div className="flex items-center bg-white border rounded-md px-3 py-1 shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-sm bg-transparent w-24 md:w-40"
          />
          <Search className="w-4 h-4 text-gray-500 ml-2" />
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden ml-3"
          onClick={() => setMenuOpen(!menuOpen)}
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
        <div className="md:hidden flex flex-col items-center gap-4 py-4 border-t border-[#e5e0d5] bg-[#f6f2e7]">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-green-700"
          >
            Home
          </Link>

          <Link
            href="/family-tree"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-green-700"
          >
            Family Tree
          </Link>

          <Link
            href="/history"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-green-700"
          >
            Clan History
          </Link>

          <Link
            href="/gallery"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-green-700"
          >
            Gallery
          </Link>
        </div>
      )}
    </header>
  );
}
