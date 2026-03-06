"use client";

import React from "react";

interface ClanHistoryProps {
  searchQuery?: string;
}

// Utility function to highlight matched search text
const highlightText = (text: string, query?: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-emerald-400/40 rounded px-1">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const ClanHistory: React.FC<ClanHistoryProps> = ({ searchQuery }) => {
  return (
    <section className="min-h-screen w-full bg-[#fdfaf6] py-16 px-6 md:px-20 lg:px-32">
      {/* Page Heading */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2">
          {highlightText(
            "History and Lineage of the Kulinji Tribe",
            searchQuery,
          )}
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          {highlightText(
            "A detailed overview of the clan’s origin, migration, and genealogy.",
            searchQuery,
          )}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed">
        {/* Section: Origin of the Tribe */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {highlightText("Origin of the Tribe", searchQuery)}
          </h2>
          <p className="text-gray-700">
            {highlightText(
              "The Kulinji tribe is believed to have originated from Mozambique. According to historical notes, the tribe traces its ancestry to a man known as Fabrany (or Febrany) Kulinji, who played a key role in the tribe’s early migration and settlement.",
              searchQuery,
            )}
          </p>
          <p className="text-gray-700 mt-2">
            {highlightText(
              "The tribe later migrated and eventually settled in Chitidzi. Several members of the clan moved with the founding family.",
              searchQuery,
            )}
          </p>
        </div>

        {/* Section: Founding Family */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {highlightText("Founding Family", searchQuery)}
          </h2>
          <p className="text-gray-700">
            {highlightText(
              "The notes indicate that Fabrany Kulinji had three sons:",
              searchQuery,
            )}
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            {[
              "Fabrany Kulinji",
              "Thomson Kulinji",
              "A third son whose name is not known",
            ].map((item, idx) => (
              <li key={idx}>{highlightText(item, searchQuery)}</li>
            ))}
          </ul>
        </div>

        {/* Section: Background of Early Ancestors */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {highlightText("Background of Early Ancestors", searchQuery)}
          </h2>
          <p className="text-gray-700">
            {highlightText(
              "Fabrany Kulinji: Described as a hunter, responsible for providing food and resources.",
              searchQuery,
            )}
          </p>
          <p className="text-gray-700 mt-1">
            {highlightText(
              "Thomson Kulinji: Described as a fisherman. He moved from Chitidzi to Chazuka, then later settled in Mngona village.",
              searchQuery,
            )}
          </p>
        </div>

        {/* Section: Children */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {highlightText("Children of Fabrany Kulinji", searchQuery)}
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {[
              "Robert",
              "Grace",
              "Andrea",
              "Elina",
              "David",
              "Idess",
              "Nolah",
              "Moses",
            ].map((child, idx) => (
              <li key={idx}>{highlightText(child, searchQuery)}</li>
            ))}
          </ul>
        </div>

        {/* Section: Family Details */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {highlightText("Family Details and Descendants", searchQuery)}
          </h2>
          {[
            "Robert: Had 14 children, but 13 died; only one survived named Miah.",
            "Andrea: Had two sons: Nolah and Piyson Chimwemwe.",
            "David: Had eight children, but all died except: Sonya, Joyce, Grace.",
            "Moses: Moved and settled in Zimbabwe.",
          ].map((detail, idx) => (
            <p key={idx} className="text-gray-700 mt-1">
              {highlightText(detail, searchQuery)}
            </p>
          ))}
        </div>

        {/* Section: Migration Pattern */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {highlightText("Migration Pattern", searchQuery)}
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            {[
              "Originated in Mozambique.",
              "Migrated and settled in Chitidzi.",
              "Some moved to Chazuka near Green Nkhata.",
              "Later settled in Mngona village.",
              "Some descendants later migrated to Zimbabwe.",
            ].map((step, idx) => (
              <li key={idx}>{highlightText(step, searchQuery)}</li>
            ))}
          </ol>
        </div>

        {/* Section: Summary */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {highlightText("Summary", searchQuery)}
          </h2>
          <p className="text-gray-700">
            {highlightText(
              "This document provides genealogical record of the Kulinji clan, documenting origin, ancestors, migration, and descendants.",
              searchQuery,
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClanHistory;
