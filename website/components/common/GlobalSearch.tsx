"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchItem {
  id: string;
  text: string;
  page: string; // page path
  sectionId?: string; // optional: in-page ref
}

const searchableItems: SearchItem[] = [
  { id: "hero-clan", text: "Our Clan Heritage", page: "/" },
  { id: "history-origin", text: "Origin of the Tribe", page: "/history" },
  { id: "history-founding", text: "Founding Family", page: "/history" },
  { id: "gallery-family", text: "Family Portraits", page: "/gallery" },
  { id: "clan-founder", text: "Fabrany Kulinji", page: "/tree" },
  // ...add all important text from all pages here
];

const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const filtered = searchableItems.filter((item) =>
      item.text.toLowerCase().includes(query.toLowerCase()),
    );
    setResults(filtered);
  }, [query]);

  const handleClick = (item: SearchItem) => {
    if (item.page === window.location.pathname && item.sectionId) {
      // If on the same page, scroll to section
      const el = document.getElementById(item.sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Navigate to page
      router.push(item.page);
    }
    setQuery(""); // optional: close search
  };

  return (
    <div className="relative max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search the site..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <div className="absolute z-50 top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-auto">
          {results.map((item) => (
            <div
              key={item.id}
              className="px-4 py-2 cursor-pointer hover:bg-emerald-100"
              onClick={() => handleClick(item)}
            >
              {item.text}{" "}
              <span className="text-gray-400 text-xs">
                ({item.page.replace("/", "") || "Home"})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
