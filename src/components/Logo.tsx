"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showSlogan?: boolean;
  lightText?: boolean;
}

export default function Logo({
  className = "",
  size = "md",
  showSlogan = true,
  lightText = false,
}: LogoProps) {
  // Dimension tokens based on size
  const iconSize = size === "sm" ? 34 : size === "lg" ? 48 : 42;
  const brandSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";
  const sloganSize = size === "sm" ? "text-[8.5px]" : size === "lg" ? "text-[11px]" : "text-[9.5px]";

  return (
    <div
      className={`flex items-center gap-2.5 select-none transition-transform hover:scale-[1.02] duration-200 ${className}`}
      dir="ltr"
    >
      {/* 3D Aerodynamic Speed Capital "E" + Launch Rocket Icon */}
      <div
        className="relative shrink-0 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(58,134,255,0.4)]"
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
            <linearGradient id="ecom_E_grad" x1="10%" y1="90%" x2="90%" y2="10%">
              <stop offset="0%" stopColor="#7928ca" />
              <stop offset="35%" stopColor="#3a86ff" />
              <stop offset="70%" stopColor="#00b4d8" />
              <stop offset="100%" stopColor="#00f5d4" />
            </linearGradient>

            {/* Launch Arrow Gradient */}
            <linearGradient id="ecom_E_arrow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3a86ff" />
              <stop offset="50%" stopColor="#7209b7" />
              <stop offset="100%" stopColor="#f72585" />
            </linearGradient>

            {/* Glass Highlight */}
            <linearGradient id="ecom_E_glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="ecom_E_glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Glowing Ambient Backdrop Circle */}
          <circle cx="50" cy="50" r="46" fill="url(#ecom_E_grad)" fillOpacity="0.12" filter="url(#ecom_E_glow)" />
          <circle cx="50" cy="50" r="46" stroke="url(#ecom_E_grad)" strokeWidth="1.2" strokeOpacity="0.4" />

          {/* CAPITAL "E" - Stylized Modern 3D Geometric Body */}
          {/* Vertical spine & Bottom Bar */}
          <path
            d="M 22 20 C 22 17.8 23.8 16 26 16 L 62 16 C 64.2 16 66 17.8 66 20 L 66 28 C 66 30.2 64.2 32 62 32 L 36 32 L 36 43 L 56 43 C 58.2 43 60 44.8 60 47 L 60 54 C 60 56.2 58.2 58 56 58 L 36 58 L 36 69 L 66 69 C 68.2 69 70 70.8 70 73 L 70 81 C 70 83.2 68.2 85 66 85 L 26 85 C 23.8 85 22 83.2 22 81 Z"
            fill="url(#ecom_E_grad)"
          />

          {/* Top Arm Launching Upward Rocket Swoop (Merging out of the top of Capital E) */}
          <path
            d="M 52 24 C 62 24 72 18 84 10"
            stroke="url(#ecom_E_arrow)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Rocket Arrow Head */}
          <polygon
            points="88,8 74,12 82,22"
            fill="url(#ecom_E_arrow)"
            filter="url(#ecom_E_glow)"
          />

          {/* Glass Highlight Stroke on Spine */}
          <path
            d="M 24 22 L 24 79"
            stroke="url(#ecom_E_glass)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Speed Streamlines on bottom-left */}
          <path
            d="M 16 50 L 8 50 M 14 62 L 6 62 M 18 38 L 10 38"
            stroke="#00f5d4"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Brand Text & Arabic Slogan */}
      <div className="flex flex-col justify-center leading-none">
        {/* Main Title Row */}
        <div className={`flex items-baseline tracking-tight font-black ${brandSize}`}>
          <span
            className={`tracking-tight ${
              lightText ? "text-white" : "text-[#0a193c]"
            }`}
          >
            ECOM
          </span>
          <span className="ml-1 text-[#2563eb] tracking-tight drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]">
            SPEED
          </span>
          <span className="ml-1.5 px-2 py-0.5 rounded-md bg-gradient-to-r from-[#7928ca] via-[#9333ea] to-[#d946ef] text-white text-[0.72em] font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(147,51,234,0.45)]">
            PRO
          </span>
        </div>

        {/* Slogan Row (Arabic with Cyan Accents) */}
        {showSlogan && (
          <div
            className={`flex items-center gap-1.5 mt-1 font-extrabold ${sloganSize}`}
            dir="rtl"
          >
            <span className="h-[1.5px] w-2.5 rounded-full bg-gradient-to-r from-transparent to-[#00b4d8]" />
            <span
              className={`tracking-tight font-bold whitespace-nowrap ${
                lightText ? "text-cyan-200" : "text-[#1e3a8a]"
              }`}
            >
              حلول التجارة الإلكترونية والتسويق الرقمي
            </span>
            <span className="h-[1.5px] w-2.5 rounded-full bg-gradient-to-l from-transparent to-[#00b4d8]" />
          </div>
        )}
      </div>
    </div>
  );
}
