"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowRight,
  User,
  Image,
  BookOpen,
  Home,
  TreePine,
} from "lucide-react";
import { clanMembers } from "../../data/clanMembers";
import { useSearch } from "../../store/SearchContext";

interface SearchItem {
  id: string;
  text: string;
  subtitle?: string;
  page: string;
  sectionId?: string;
  type: "member" | "page" | "gallery" | "history";
}

const pageItems: SearchItem[] = [
  {
    id: "home",
    text: "Home",
    subtitle: "Clan overview & family tree preview",
    page: "/",
    type: "page",
  },
  {
    id: "family-tree",
    text: "Full Family Tree",
    subtitle: "Browse all clan members interactively",
    page: "/family-tree",
    type: "page",
  },
  {
    id: "history",
    text: "Clan History",
    subtitle: "Origin, founding story & milestones",
    page: "/history",
    type: "page",
  },
  {
    id: "gallery",
    text: "Gallery",
    subtitle: "Family portraits & clan memories",
    page: "/gallery",
    type: "page",
  },
  {
    id: "history-origin",
    text: "Origin of the Tribe",
    subtitle: "Where the Kulinji clan began",
    page: "/history",
    sectionId: "origin",
    type: "history",
  },
  {
    id: "history-founding",
    text: "Founding Family",
    subtitle: "The first generation",
    page: "/history",
    sectionId: "founding",
    type: "history",
  },
  {
    id: "gallery-portraits",
    text: "Family Portraits",
    subtitle: "Photos of clan members",
    page: "/gallery",
    type: "gallery",
  },
];

const typeIcon = (type: SearchItem["type"]) => {
  switch (type) {
    case "member":
      return <User className="w-3.5 h-3.5 text-emerald-600" />;
    case "gallery":
      return <Image className="w-3.5 h-3.5 text-amber-600" />;
    case "history":
      return <BookOpen className="w-3.5 h-3.5 text-blue-600" />;
    case "page":
      return <Home className="w-3.5 h-3.5 text-stone-500" />;
    default:
      return <ArrowRight className="w-3.5 h-3.5 text-stone-400" />;
  }
};

const typeLabel = (type: SearchItem["type"]) => {
  switch (type) {
    case "member":
      return "Member";
    case "gallery":
      return "Gallery";
    case "history":
      return "History";
    case "page":
      return "Page";
  }
};

const typeBadgeClass = (type: SearchItem["type"]) => {
  switch (type) {
    case "member":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "gallery":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "history":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "page":
      return "bg-stone-100 text-stone-600 border-stone-200";
  }
};

const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setSearchQuery } = useSearch();

  // Build member search items from real clan data
  const memberItems: SearchItem[] = clanMembers.map((m) => ({
    id: `member-${m.id}`,
    text: m.name,
    subtitle:
      [
        m.birthYear ? `b. ${m.birthYear}` : "",
        m.deathYear ? `d. ${m.deathYear}` : "",
      ]
        .filter(Boolean)
        .join(" · ") || "Clan member",
    page: "/family-tree",
    type: "member",
  }));

  const allItems = [...pageItems, ...memberItems];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearchQuery("");
      setActiveIndex(-1);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allItems.filter(
      (item) =>
        item.text.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q),
    );
    setResults(filtered.slice(0, 8));
    setSearchQuery(query);
    setActiveIndex(-1);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleClick = (item: SearchItem) => {
    if (item.page === window.location.pathname && item.sectionId) {
      const el = document.getElementById(item.sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(item.page);
    }
    setQuery("");
    setSearchQuery("");
    setFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleClick(results[activeIndex]);
    } else if (e.key === "Escape") {
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  const clear = () => {
    setQuery("");
    setSearchQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  const showDropdown =
    focused && (results.length > 0 || query.trim().length > 0);

  return (
    <div className="relative w-full max-w-sm mx-auto mt-3">
      {/* Input */}
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full border bg-white/90 backdrop-blur-sm transition-all duration-200 ${
          focused
            ? "border-emerald-400 shadow-md shadow-emerald-100"
            : "border-[#d5cfc2] shadow-sm"
        }`}
      >
        <Search className="w-4 h-4 text-stone-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search members, pages…"
          className="flex-1 bg-transparent text-sm text-stone-700 placeholder-stone-400 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button onClick={clear} className="flex-shrink-0">
            <X className="w-3.5 h-3.5 text-stone-400 hover:text-stone-600 transition" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 top-full left-0 w-full mt-2 bg-white border border-[#e5e0d5] rounded-2xl shadow-xl overflow-hidden"
        >
          {results.length === 0 && query.trim() ? (
            <div className="px-4 py-5 text-center">
              <div className="text-2xl mb-1">🍃</div>
              <p className="text-sm text-stone-500">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                Try a member name or page
              </p>
            </div>
          ) : (
            <>
              {/* Group: Members */}
              {results.filter((r) => r.type === "member").length > 0 && (
                <div>
                  <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-stone-400 font-semibold flex items-center gap-1.5">
                    <User className="w-3 h-3" /> Members
                  </div>
                  {results
                    .filter((r) => r.type === "member")
                    .map((item, i) => {
                      const globalIdx = results.indexOf(item);
                      return (
                        <button
                          key={item.id}
                          className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors duration-100 ${
                            activeIndex === globalIdx
                              ? "bg-emerald-50"
                              : "hover:bg-stone-50"
                          }`}
                          onClick={() => handleClick(item)}
                          onMouseEnter={() => setActiveIndex(globalIdx)}
                        >
                          <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <User className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-stone-800 truncate">
                              {item.text}
                            </div>
                            {item.subtitle && (
                              <div className="text-xs text-stone-400 truncate">
                                {item.subtitle}
                              </div>
                            )}
                          </div>
                          <span
                            className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeBadgeClass(item.type)}`}
                          >
                            {typeLabel(item.type)}
                          </span>
                        </button>
                      );
                    })}
                </div>
              )}

              {/* Group: Pages & Sections */}
              {results.filter((r) => r.type !== "member").length > 0 && (
                <div className="border-t border-[#f0ece0]">
                  <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-stone-400 font-semibold flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3" /> Pages & Sections
                  </div>
                  {results
                    .filter((r) => r.type !== "member")
                    .map((item) => {
                      const globalIdx = results.indexOf(item);
                      return (
                        <button
                          key={item.id}
                          className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors duration-100 ${
                            activeIndex === globalIdx
                              ? "bg-emerald-50"
                              : "hover:bg-stone-50"
                          }`}
                          onClick={() => handleClick(item)}
                          onMouseEnter={() => setActiveIndex(globalIdx)}
                        >
                          <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                            {typeIcon(item.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-stone-800 truncate">
                              {item.text}
                            </div>
                            {item.subtitle && (
                              <div className="text-xs text-stone-400 truncate">
                                {item.subtitle}
                              </div>
                            )}
                          </div>
                          <span
                            className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeBadgeClass(item.type)}`}
                          >
                            {typeLabel(item.type)}
                          </span>
                        </button>
                      );
                    })}
                </div>
              )}

              {/* Footer hint */}
              <div className="px-4 py-2 border-t border-[#f0ece0] flex items-center gap-3 text-[10px] text-stone-400">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
