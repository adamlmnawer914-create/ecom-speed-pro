"use client";

import React from "react";

interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

export default function WhatsAppIcon({
  className = "",
  size = 24,
}: WhatsAppIconProps) {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 filter drop-shadow-[0_4px_10px_rgba(37,211,102,0.45)] transition-transform hover:scale-110 duration-200 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Main 3D Emerald Gradient */}
          <linearGradient id="wa_bg_grad" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="45%" stopColor="#22c55e" />
            <stop offset="80%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>

          {/* Glass Top Highlight */}
          <linearGradient id="wa_highlight" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Phone Gradient */}
          <linearGradient id="wa_phone_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0fdf4" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="wa_glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Glow Halo */}
        <circle cx="50" cy="50" r="46" fill="#22c55e" fillOpacity="0.2" filter="url(#wa_glow)" />

        {/* Outer Metallic Ring */}
        <circle cx="50" cy="50" r="47" stroke="url(#wa_bg_grad)" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* Speech Bubble Base */}
        <path
          d="M 50 8 C 26.8 8 8 26.8 8 50 C 8 58.2 10.4 65.9 14.6 72.4 L 9.8 90.2 L 28.2 85.5 C 34.5 89.3 42 91.5 50 91.5 C 73.2 91.5 92 72.7 92 49.5 C 92 26.3 73.2 8 50 8 Z"
          fill="url(#wa_bg_grad)"
        />

        {/* Upper Glass Gloss Arc */}
        <path
          d="M 50 11 C 29 11 12 28 12 49 C 12 55 13.5 60.5 16 65 C 21 42 35 25 57 17 C 54.8 13.2 52.5 11 50 11 Z"
          fill="url(#wa_highlight)"
        />

        {/* Inner Phone Receiver with 3D Curves */}
        <path
          d="M 68.5 61.2 C 67.2 60.8 61.2 57.8 60.1 57.4 C 59 57 58.2 56.8 57.4 58 C 56.6 59.2 54.3 62.1 53.6 62.9 C 52.9 63.7 52.2 63.8 51 63.2 C 49.8 62.6 45.9 61.3 41.3 57.2 C 37.7 54 35.3 50.1 34.6 48.9 C 33.9 47.7 34.5 47 35.1 46.4 C 35.6 45.9 36.3 45 36.9 44.3 C 37.5 43.6 37.7 43.1 38.1 42.3 C 38.5 41.5 38.3 40.8 38 40.2 C 37.7 39.6 35.4 34 34.4 31.6 C 33.5 29.3 32.5 29.6 31.8 29.6 C 31.1 29.6 30.3 29.6 29.5 29.6 C 28.7 29.6 27.4 29.9 26.3 31.1 C 25.2 32.3 22.1 35.2 22.1 41.1 C 22.1 47 26.4 52.6 27 53.4 C 27.6 54.2 35.4 66.2 47.4 71.4 C 50.3 72.6 52.5 73.3 54.3 73.9 C 57.1 74.8 59.7 74.7 61.7 74.4 C 64 74 68.6 71.5 69.6 68.7 C 70.6 65.9 70.6 63.5 70.3 63 C 70 62.4 69.3 62 68.5 61.2 Z"
          fill="url(#wa_phone_grad)"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.18))"
        />
      </svg>
    </div>
  );
}
