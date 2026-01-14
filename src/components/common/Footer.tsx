"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Calendar } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/10 bg-white/5 backdrop-blur-xl">
      {/* subtle glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-green-500/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-white">
                Event Bridge
              </h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              A modern full-stack event management platform built with
              Next.js, Drizzle ORM, and PostgreSQL — focused on scalability,
              performance, and clean UX.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/" className="hover:text-green-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-green-400 transition">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Connect
            </h3>
            <div className="flex gap-4">
              {[ 
                { href: "https://github.com/shahbaz957", icon: <Github size={18} /> },
                { href: "https://www.linkedin.com/in/mirza-shahbaz-ali-baig-3391b3248/", icon: <Linkedin size={18} /> },
                { href: "mailto:mirzashahbazbaig724@gmail.com", icon: <Mail size={18} /> },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md
                             hover:border-green-400/50 hover:text-green-400
                             hover:shadow-[0_0_20px_rgba(34,197,94,0.25)]
                             transition"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Event Bridge. All rights reserved.
          </p>

          <p className="text-gray-400 text-sm">
            Built and Designed by{" "}
            <span className="text-green-400 font-medium">
              Mirza Shahbaz Ali Baig
            </span>
          </p>

        </div>
      </div>
    </footer>
  );
}
