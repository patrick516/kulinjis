"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f6f2e7] border-t border-[#e5e0d5] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-serif text-gray-800 mb-2">
            Kulinji's Clan
          </h2>
          <p className="text-gray-600 text-sm">
            Preserving heritage, history & memories for generations.
          </p>

          {/* Social icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a
              href="#"
              className="text-gray-500 hover:text-emerald-600 transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-emerald-600 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-emerald-600 transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Contact / Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact</h3>
          <p className="text-gray-600 text-sm">
            Email:{" "}
            <a
              href="mailto:kulinjipatricks@gmail.com"
              className="text-emerald-600 hover:underline"
            >
              info@kulinjiclans.com
            </a>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Phone:{" "}
            <a
              href="tel:+265995049331"
              className="text-emerald-600 hover:underline"
            >
              +265 995 049 331
            </a>
          </p>
          <p className="text-gray-600 text-sm mt-1">Nsanje, Malawi</p>
        </div>
      </div>

      {/* Bottom note */}
      <div className="bg-[#e5e0d5] py-3 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Kulinji Clan. All rights reserved.
      </div>
    </footer>
  );
}
