"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showSlogan?: boolean;
}

export default function Logo({
  className = "",
  size = "md",
  showSlogan = true,
}: LogoProps) {
  // Dimension tokens based on size
  const iconSize = size === "sm" ? 34 : size === "lg" ? 48 : 40;
  const brandSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";
  const sloganSize = size === "sm" ? "text-[8.5px]" : size === "lg" ? "text-[11px]" : "text-[9.5px]";

  return (
    <div
      className={`flex items-center gap-2.5 select-none transition-transform hover:scale-[1.02] duration-200 ${className}`}
      dir="ltr"
    >
      {/* 3D Aerodynamic Speed "e" + Rocket Icon */}
      <div
        className="relative shrink-0 flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(58,134,255,0.35)]"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Main Outer Gradient */}
            <linearGradient id="ecom_grad_main" x1="10%" y1="90%" x2="90%" y2="10%">
              <stop offset="0%" stopColor="#7928ca" />
              <stop offset="30%" stopColor="#3a86ff" />
              <stop offset="70%" stopColor="#00b4d8" />
              <stop offset="100%" stopColor="#00f5d4" />
            </linearGradient>

            {/* Inner Speed Arrow Gradient */}
            <linearGradient id="ecom_grad_arrow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3a86ff" />
              <stop offset="50%" stopColor="#7209b7" />
              <stop offset="100%" stopColor="#f72585" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="ecom_glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Glowing Base Ambient Circle (soft glass disc) */}
          <circle cx="50" cy="50" r="46" fill="url(#ecom_grad_main)" fillOpacity="0.12" />

          {/* Outer Stylized "e" Body */}
          <path
            d="M 68 32 C 60 22 45 20 32 26 C 18 33 12 49 16 64 C 20 78 35 86 50 85 C 64 84 75 75 79 63 C 79.5 61.5 78.5 60 77 60 L 63 60 C 61.5 60 60.5 61 59.5 62 C 55 69 45 71 38 67 C 31 63 28 55 30 48 L 74 48 C 76.5 48 78 46 78 43.5 C 78 39 74 34 68 32 Z M 32 40 C 33 34 39 30 47 30 C 54 30 59 34 60 40 L 32 40 Z"
            fill="url(#ecom_grad_main)"
          />

          {/* Aerodynamic Launch Arrow / Rocket Tip breaking through top right */}
          <path
            d="M 66 38 L 84 18 M 84 18 L 73 18 M 84 18 L 84 29"
            stroke="url(#ecom_grad_arrow)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Rocket arrowhead polygon */}
          <polygon
            points="84,18 70,24 78,32"
            fill="url(#ecom_grad_arrow)"
            filter="url(#ecom_glow)"
          />

          {/* Speed Streamlines */}
          <path
            d="M 18 50 L 8 50 M 15 58 L 6 58 M 20 42 L 10 42"
            stroke="#00b4d8"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      </div>

      {/* Brand Text & Arabic Slogan */}
      <div className="flex flex-col justify-center leading-none">
        {/* Main Title Row */}
        <div className={`flex items-baseline tracking-tight font-black ${brandSize}`}>
          <span className="text-[#0a193c] tracking-tight">ECOM</span>
          <span className="ml-1 text-[#2563eb] tracking-tight drop-shadow-[0_2px_8px_rgba(37,99,235,0.25)]">
            SPEED
          </span>
          <span className="ml-1.5 px-2 py-0.5 rounded-md bg-gradient-to-r from-[#7928ca] via-[#9333ea] to-[#d946ef] text-white text-[0.72em] font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(147,51,234,0.4)]">
            PRO
          </span>
        </div>

        {/* Slogan Row (Arabic with Cyan Accents) */}
        {showSlogan && (
          <div
            className={`flex items-center gap-1.5 mt-1 font-extrabold text-[#3b82f6] ${sloganSize}`}
            dir="rtl"
          >
            <span className="h-[1.5px] w-2.5 rounded-full bg-gradient-to-r from-transparent to-[#00b4d8]" />
            <span className="text-[#1e3a8a] tracking-tight font-bold whitespace-nowrap">
              حلول التجارة الإلكترونية والتسويق الرقمي
            </span>
            <span className="h-[1.5px] w-2.5 rounded-full bg-gradient-to-l from-transparent to-[#00b4d8]" />
          </div>
        )}
      </div>
    </div>
  );
}
