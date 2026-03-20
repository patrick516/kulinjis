"use client";

import React from "react";

const ClanHistory: React.FC = () => {
  return (
    <section className="min-h-screen w-full bg-[#fdfaf6] py-16 px-6 md:px-20 lg:px-32">
      {/* Page Heading */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2">
          History and Lineage of the{" "}
          <span className="text-emerald-600">Kulinji Tribe</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          A detailed overview of the clan’s origin, migration, and genealogy.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed">
        {/* Section: Origin of the Tribe */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Origin of the Tribe
          </h2>
          <p className="text-gray-700">
            The{" "}
            <span className="font-semibold text-emerald-600">
              Kulinji tribe
            </span>{" "}
            is believed to have originated from
            <span className="italic text-gray-600"> Mozambique</span>. According
            to historical notes, the tribe traces its ancestry to a man known as
            <span className="font-semibold"> February Kulinji</span>, who played
            a key role in the tribe’s early migration and settlement.
          </p>
          <p className="text-gray-700 mt-2">
            The tribe later migrated and eventually settled in{" "}
            <span className="italic">Chididi</span>. Several members of the clan
            moved with the founding family.
          </p>
        </div>

        {/* Section: Founding Family */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Founding Family
          </h2>
          <p className="text-gray-700">
            The notes indicate that{" "}
            <span className="font-semibold">MR Kulinji -The Founder</span> had
            three sons:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>February Kulinji</li>
            <li>Thomson Kulinji</li>
            <li>A third son whose name is not known</li>
          </ul>
        </div>

        {/* Section: Background of Early Ancestors */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Background of Early Ancestors
          </h2>
          <p className="text-gray-700">
            <span className="font-semibold">February Kulinji:</span> Described
            as a <span className="italic">hunter</span>, responsible for
            providing food and resources.
          </p>
          <p className="text-gray-700 mt-1">
            <span className="font-semibold">Thomson Kulinji:</span> Described as
            a <span className="italic">fisherman</span>. He moved from Chididi
            to Chazuka, then later settled in Mngona village.
          </p>
        </div>

        {/* Section: Children */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Children of February Kulinji
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Robert</li>
            <li>Grace</li>
            <li>Andrea</li>
            <li>Elina</li>
            <li>David</li>
            <li>Idess</li>
            <li>Nolah</li>
            <li>Moses</li>
          </ul>
        </div>

        {/* Section: Family Details */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Family Details and Descendants
          </h2>
          <p className="text-gray-700">
            <span className="font-semibold">Robert:</span> Had 14 children, but
            13 died; only one survived named{" "}
            <span className="italic">Micah</span>.
          </p>
          <p className="text-gray-700 mt-1">
            <span className="font-semibold">Andrah:</span> Had Three sons:{" "}
            <span className="italic">Nolah</span> ,
            <span className="italic">Piyson</span> and{" "}
            <span className="italic"> Chimwemwe</span>.
          </p>
          <p className="text-gray-700 mt-1">
            <span className="font-semibold">David:</span> Had eight children,
            but all died except:{" "}
            <span className="italic">Sonya, Joyce, Grace</span>.
          </p>
          <p className="text-gray-700 mt-1">
            <span className="font-semibold">Moses:</span> Moved and settled in{" "}
            <span className="italic">Zimbabwe</span>.
          </p>
        </div>

        {/* Section: Migration Pattern */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Migration Pattern
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Originated in Mozambique.</li>
            <li>Migrated and settled in Chitidzi.</li>
            <li>Some moved to Chazuka near Green Nkhata.</li>
            <li>Later settled in Mngona village.</li>
            <li>Some descendants later migrated to Zimbabwe.</li>
          </ol>
        </div>

        {/* Section: Summary */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Summary</h2>
          <p className="text-gray-700">
            This document provides genealogical record of the Kulinji clan,
            documenting origin, ancestors, migration, and descendants.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClanHistory;
