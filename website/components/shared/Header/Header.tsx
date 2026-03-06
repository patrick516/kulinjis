"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-[#f6f2e7] border-b border-[#e5e0d5]">
      {/* Top Branding */}
      <div className="flex flex-col items-center py-6">
        <div className="text-sm text-gray-500 tracking-widest">The</div>

        <h1 className="text-4xl font-serif text-gray-800">Clan Name</h1>

        <div className="w-24 h-[2px] bg-[#c7bfa9] mt-2"></div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-10 py-4 border-t border-[#e5e0d5]">
        {/* Menu */}
        <nav className="flex gap-8 text-gray-700 font-medium">
          <Link
            href="/"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Home
          </Link>

          <Link
            href="/family-tree"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Family Tree
          </Link>

          <Link
            href="/history"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Clan History
          </Link>

          <Link
            href="/gallery"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Gallery
          </Link>
        </nav>

        {/* Search */}
        <div className="flex items-center bg-white border rounded-md px-3 py-1 shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-sm bg-transparent"
          />
          <Search className="w-4 h-4 text-gray-500 ml-2" />
        </div>
      </div>
    </header>
  );
}
