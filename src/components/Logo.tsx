"use client";

import React from "react";
import Image from "next/image";

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
  const iconSize = size === "sm" ? 36 : size === "lg" ? 52 : 44;
  const brandSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";
  const sloganSize = size === "sm" ? "text-[8.5px]" : size === "lg" ? "text-[11px]" : "text-[9.5px]";

  return (
    <div
      className={`flex items-center gap-2.5 select-none transition-transform hover:scale-[1.02] duration-200 ${className}`}
      dir="ltr"
    >
      {/* Exact 3D Aerodynamic Capital "E" Rocket Logo Mark */}
      <div
        className="relative shrink-0 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(58,134,255,0.45)] transition-transform duration-200 group-hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/images/ecom_brand_logo_transparent.webp"
          alt="ECOM SPEED PRO Logo"
          width={120}
          height={120}
          priority
          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(58,134,255,0.35)]"
        />
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
