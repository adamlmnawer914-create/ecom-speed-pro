"use client";

import React from "react";

interface FeatureItem {
  id: string;
  title: string;
  desc: string;
  color: string;
  glow: string;
  icon: (color: string) => React.ReactNode;
}

interface FeaturesRibbonProps {
  className?: string;
  variant?: "light" | "glass";
}

export default function FeaturesRibbon({
  className = "",
  variant = "glass",
}: FeaturesRibbonProps) {
  const features: FeatureItem[] = [
    {
      id: "custom",
      title: "تخصيص متكامل",
      desc: "حسب احتياجاتك",
      color: "from-blue-600 via-indigo-600 to-cyan-400",
      glow: "rgba(59,130,246,0.4)",
      icon: () => (
        <svg viewBox="0 0 100 100" fill="none" className="w-9 h-9 sm:w-10 sm:h-10">
          <defs>
            <linearGradient id="gear_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          {/* Main Gear */}
          <path
            d="M 50 20 L 53 28 L 61 25 L 61 33 L 69 33 L 66 41 L 74 44 L 69 50 L 74 56 L 66 59 L 69 67 L 61 67 L 61 75 L 53 72 L 50 80 L 47 72 L 39 75 L 39 67 L 31 67 L 34 59 L 26 56 L 31 50 L 26 44 L 34 41 L 31 33 L 39 33 L 39 25 L 47 28 Z"
            fill="url(#gear_grad)"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
          />
          <circle cx="50" cy="50" r="14" fill="#ffffff" />
          <circle cx="50" cy="50" r="7" fill="#1d4ed8" />
          {/* Small Interlocking Gear */}
          <circle cx="72" cy="30" r="12" fill="#38bdf8" fillOpacity="0.8" />
          <circle cx="72" cy="30" r="5" fill="#ffffff" />
        </svg>
      ),
    },
    {
      id: "pro_design",
      title: "تصميم احترافي",
      desc: "يتناسب مع علامتك",
      color: "from-cyan-500 via-blue-600 to-indigo-700",
      glow: "rgba(6,182,212,0.4)",
      icon: () => (
        <svg viewBox="0 0 100 100" fill="none" className="w-9 h-9 sm:w-10 sm:h-10">
          <defs>
            <linearGradient id="chart_grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          {/* Growth Bars */}
          <rect x="22" y="55" width="12" height="25" rx="3" fill="url(#chart_grad)" />
          <rect x="42" y="42" width="12" height="38" rx="3" fill="url(#chart_grad)" />
          <rect x="62" y="28" width="12" height="52" rx="3" fill="url(#chart_grad)" />
          {/* Ascending Trend Arrow */}
          <path
            d="M 22 48 L 42 35 L 62 20 L 78 14"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon points="78,14 66,14 74,24" fill="#ffffff" />
        </svg>
      ),
    },
    {
      id: "speed",
      title: "تسليم سريع",
      desc: "في أقل وقت ممكن",
      color: "from-blue-500 via-purple-600 to-pink-500",
      glow: "rgba(147,51,234,0.45)",
      icon: () => (
        <svg viewBox="0 0 100 100" fill="none" className="w-9 h-9 sm:w-10 sm:h-10">
          <defs>
            <linearGradient id="rocket_grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          {/* Rocket Body */}
          <path
            d="M 68 22 C 68 22 50 25 36 39 C 30 45 28 53 28 58 L 42 72 C 47 72 55 70 61 64 C 75 50 78 32 78 32 Z"
            fill="url(#rocket_grad)"
          />
          {/* Rocket Window */}
          <circle cx="55" cy="45" r="7" fill="#ffffff" />
          <circle cx="55" cy="45" r="4" fill="#1e1b4b" />
          {/* Left Wing */}
          <path d="M 32 54 L 20 58 L 26 70 L 38 66 Z" fill="#3b82f6" />
          {/* Right Wing */}
          <path d="M 54 32 L 58 20 L 70 26 L 66 38 Z" fill="#ec4899" />
          {/* Fire Flame Trail */}
          <path
            d="M 28 72 C 22 78 18 84 20 86 C 22 88 28 84 34 78 Z"
            fill="#f59e0b"
          />
          <path
            d="M 26 74 C 23 78 21 82 22 83 C 23 84 27 82 30 78 Z"
            fill="#ef4444"
          />
        </svg>
      ),
    },
    {
      id: "security",
      title: "أمان وحماية",
      desc: "لحسابك وبياناتك",
      color: "from-blue-600 via-sky-500 to-teal-400",
      glow: "rgba(14,165,233,0.4)",
      icon: () => (
        <svg viewBox="0 0 100 100" fill="none" className="w-9 h-9 sm:w-10 sm:h-10">
          <defs>
            <linearGradient id="shield_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          {/* Fortified Shield */}
          <path
            d="M 50 16 L 76 26 C 76 50 68 70 50 84 C 32 70 24 50 24 26 Z"
            fill="url(#shield_grad)"
            filter="drop-shadow(0 3px 6px rgba(0,0,0,0.2))"
          />
          <path
            d="M 50 22 L 70 30 C 70 48 64 64 50 76 C 36 64 30 48 30 30 Z"
            fill="#ffffff"
            fillOpacity="0.2"
          />
          {/* Verified Checkmark */}
          <path
            d="M 38 48 L 47 57 L 64 38"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "support",
      title: "دعم فني مستمر",
      desc: "نحن معك دائماً",
      color: "from-indigo-600 via-blue-600 to-cyan-500",
      glow: "rgba(79,70,229,0.4)",
      icon: () => (
        <svg viewBox="0 0 100 100" fill="none" className="w-9 h-9 sm:w-10 sm:h-10">
          <defs>
            <linearGradient id="headset_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
          </defs>
          {/* Headband */}
          <path
            d="M 26 48 C 26 34 36 22 50 22 C 64 22 74 34 74 48"
            stroke="url(#headset_grad)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Left Earcup */}
          <rect x="20" y="44" width="12" height="22" rx="6" fill="#3b82f6" />
          <rect x="23" y="47" width="6" height="16" rx="3" fill="#ffffff" fillOpacity="0.4" />
          {/* Right Earcup */}
          <rect x="68" y="44" width="12" height="22" rx="6" fill="#3b82f6" />
          <rect x="71" y="47" width="6" height="16" rx="3" fill="#ffffff" fillOpacity="0.4" />
          {/* Microphone Arm */}
          <path
            d="M 72 58 C 72 68 62 76 52 76"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="50" cy="76" r="4" fill="#06b6d4" />
        </svg>
      ),
    },
  ];

  return (
    <section className={`w-full py-3 px-4 ${className}`} dir="rtl">
      <div className="max-w-[1440px] mx-auto">
        {/* Luxury Sculpted 3D Glass Capsule */}
        <div className="relative rounded-3xl lg:rounded-full bg-white/95 backdrop-blur-xl border border-[#b8dcff] shadow-[0_12px_45px_rgba(37,99,235,0.12)] p-3 sm:p-4 lg:p-3 transition-all duration-300 hover:shadow-[0_16px_55px_rgba(37,99,235,0.2)]">
          {/* Inner Light Reflection Bar */}
          <div className="absolute inset-x-8 top-1 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full pointer-events-none" />

          {/* 5 Features Grid / Row (Mobile 1-col, Tablet 2/3-col, Desktop 5-col) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 items-center">
            {features.map((item, index) => (
              <div
                key={item.id}
                className="group flex items-center justify-center gap-3 p-2 sm:p-2.5 rounded-full hover:bg-blue-50/70 transition-all duration-300 cursor-default"
              >
                {/* 3D Glass Sphere with Multi-Stop Depth Gradient */}
                <div
                  className="relative shrink-0 w-13 h-13 sm:w-14 sm:h-14 rounded-full p-[2px] transition-transform duration-300 group-hover:scale-110"
                  style={{
                    filter: `drop-shadow(0 6px 14px ${item.glow})`,
                  }}
                >
                  {/* Outer Sphere Ring */}
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${item.color} p-[2.5px] flex items-center justify-center`}
                  >
                    {/* Inner 3D Glass Ball */}
                    <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#ebf5ff] to-[#cfe4fc] flex items-center justify-center overflow-hidden shadow-inner">
                      {/* Top Glass Arc Highlight */}
                      <div className="absolute top-0.5 inset-x-2 h-4 rounded-t-full bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />
                      
                      {/* Icon */}
                      <div className="relative z-10">
                        {item.icon(item.color)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div className="flex flex-col text-right leading-tight">
                  <h4 className="text-xs sm:text-sm font-black text-[#0a193c] group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-0.5">
                    {item.desc}
                  </p>
                </div>

                {/* Vertical Divider for desktop (not on last) */}
                {index < features.length - 1 && (
                  <div className="hidden lg:block h-8 w-[1px] bg-gradient-to-b from-transparent via-blue-200 to-transparent mr-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
