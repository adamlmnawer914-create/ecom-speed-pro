"use client";

import React from "react";
import { ExternalLink, Heart, ThumbsUp, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";

export default function SocialSection() {
  const SOCIAL_LINKS = {
    youtube: "https://www.youtube.com/@EcomSpeedPro",
    facebook:
      "https://www.facebook.com/people/Ecom-Speed-Pro/61595388710709/?rdid=XmASTJaHpZvxdwJi&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DjRWQFryH%2F",
    instagram: "https://www.instagram.com/ecom_speed_pro",
    tiktok: "https://www.tiktok.com",
    twitter: "https://twitter.com",
  };

  const platforms = [
    {
      id: "youtube",
      name: "YouTube",
      action: "اشتراك في القناة",
      url: SOCIAL_LINKS.youtube,
      buttonGradient: "linear-gradient(135deg, #ff334b 0%, #e60000 50%, #990000 100%)",
      crystalBorder: "from-cyan-400/80 via-blue-500/50 to-red-500/60",
      glowColor: "rgba(239, 68, 68, 0.55)",
      isCenter: false,
      icon: (
        <svg className="w-11 h-11 fill-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      id: "instagram",
      name: "Instagram",
      action: "متابعة الحساب",
      url: SOCIAL_LINKS.instagram,
      buttonGradient:
        "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
      crystalBorder: "from-cyan-400/80 via-pink-500/50 to-purple-600/60",
      glowColor: "rgba(236, 72, 153, 0.55)",
      isCenter: false,
      icon: (
        <svg className="w-10 h-10 fill-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      id: "facebook",
      name: "Facebook",
      action: "متابعة الصفحة الرسمية",
      url: SOCIAL_LINKS.facebook,
      buttonGradient: "linear-gradient(135deg, #2f88ff 0%, #1877f2 50%, #084eb0 100%)",
      crystalBorder: "from-cyan-300 via-blue-400 to-indigo-500",
      glowColor: "rgba(37, 99, 235, 0.8)",
      isCenter: true,
      icon: (
        <svg className="w-12 h-12 fill-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: "tiktok",
      name: "TikTok",
      action: "مشاهدة الفيديوهات",
      url: SOCIAL_LINKS.tiktok,
      buttonGradient: "linear-gradient(135deg, #242933 0%, #0f141d 50%, #000000 100%)",
      crystalBorder: "from-cyan-400/80 via-teal-400/50 to-pink-500/60",
      glowColor: "rgba(6, 182, 212, 0.55)",
      isCenter: false,
      icon: (
        <svg className="w-10 h-10 fill-white drop-shadow-[0_4px_12px_rgba(0,242,254,0.6)]" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.87 2.89 2.89 0 0 1-2.88-2.87 2.89 2.89 0 0 1 2.88-2.87c.37 0 .73.07 1.05.21V9.52a6.34 6.34 0 0 0-1.05-.09A6.33 6.33 0 0 0 3 15.76a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.17 8.17 0 0 0 4.91 1.62V6.89c-.66 0-1.35-.07-2-.2z" />
        </svg>
      ),
    },
    {
      id: "twitter",
      name: "Twitter",
      action: "متابعة التغريدات",
      url: SOCIAL_LINKS.twitter,
      buttonGradient: "linear-gradient(135deg, #38bdf8 0%, #1da1f2 50%, #0284c7 100%)",
      crystalBorder: "from-cyan-400/80 via-sky-400/50 to-blue-600/60",
      glowColor: "rgba(14, 165, 233, 0.55)",
      isCenter: false,
      icon: (
        <svg className="w-10 h-10 fill-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-12 sm:py-20 relative z-20 overflow-hidden" dir="rtl">
      
      {/* ======================================================== */}
      {/* 1. ATMOSPHERIC FUTURISTIC LIGHTING & HOLOGRAPHIC GRID    */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Cyber Ambient Clouds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[500px] bg-gradient-to-r from-cyan-500/15 via-blue-600/25 to-purple-600/15 rounded-full blur-[100px] animate-pulse duration-1000" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-400/15 rounded-full blur-[90px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[90px]" />

        {/* Futuristic Grid & Light Beam Rays */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00f5d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#3a86ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00f5d4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <pattern id="cyber-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#grid-grad)" strokeWidth="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" />
        </svg>
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* ======================================================== */}
        {/* 2. SECTION HEADER (MATCHING ATTACHED IMAGE MASTERPIECE)  */}
        {/* ======================================================== */}
        <div className="relative flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-10 sm:mb-14">
          
          {/* Top Brand Logo */}
          <div className="flex flex-col items-center justify-center filter drop-shadow-[0_4px_15px_rgba(58,134,255,0.35)]">
            <Logo size="lg" showSlogan={true} />
          </div>

          {/* Main 3D Title with Glowing Bevel Effect */}
          <div className="relative pt-2">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071330] drop-shadow-[0_4px_12px_rgba(0,180,216,0.25)]">
              تابعونا على{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] via-[#2563eb] to-[#7928ca] drop-shadow-[0_2px_10px_rgba(37,99,235,0.4)]">
                مواقع التواصل الاجتماعي
              </span>
            </h2>
          </div>

          {/* Glowing Pill Banner from attached image: »» كونوا جزءاً من مجتمع ECOM SPEED PRO «« */}
          <div className="relative group inline-flex items-center gap-3.5 px-6 sm:px-8 py-2.5 rounded-full bg-gradient-to-r from-[#00b4d8]/20 via-[#3a86ff]/25 to-[#7928ca]/25 border-2 border-[#00f5d4]/60 shadow-[0_0_30px_rgba(0,245,212,0.45),inset_0_0_15px_rgba(58,134,255,0.2)] backdrop-blur-xl transition-all duration-300 hover:scale-105">
            {/* Neon Arrow Left */}
            <span className="text-cyan-300 font-mono font-black text-sm sm:text-base tracking-widest drop-shadow-[0_0_8px_#00f5d4]">
              &gt;&gt;
            </span>

            {/* Glowing Center Arabic Text */}
            <span className="text-sm sm:text-base font-black text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              كونوا جزءاً من مجتمع <span className="text-cyan-200">ECOM SPEED PRO</span>
            </span>

            {/* Neon Arrow Right */}
            <span className="text-cyan-300 font-mono font-black text-sm sm:text-base tracking-widest drop-shadow-[0_0_8px_#00f5d4]">
              &lt;&lt;
            </span>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm font-bold max-w-xl leading-relaxed pt-1">
            انضم إلى مجتمعنا الرسمي لمتابعة أحدث استراتيجيات المتاجر، التحديثات التقنية الحصرية، وعروض التوسع والنمو
          </p>
        </div>

        {/* ======================================================== */}
        {/* 3. THE 5 NATIVE 3D CRYSTAL PEDESTALS ON NEON STAGE       */}
        {/* ======================================================== */}
        <div className="w-full relative flex flex-col items-center">

          {/* Floating 3D Reaction Speech Bubble (Left Flank - Heart) */}
          <div className="absolute -left-2 sm:left-4 lg:left-8 top-4 hidden sm:flex flex-col items-center z-30 select-none pointer-events-none animate-bounce duration-1000">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] bg-gradient-to-tr from-[#7928ca] via-[#ec4899] to-[#f43f5e] p-[2.5px] shadow-[0_10px_30px_rgba(236,72,153,0.65),0_0_20px_rgba(244,63,94,0.5)]">
              {/* Inner Gloss */}
              <div className="w-full h-full bg-gradient-to-b from-[#2b0848]/90 to-[#120422]/95 rounded-[20px] flex items-center justify-center overflow-hidden relative">
                {/* Top Glass Arc */}
                <div className="absolute top-0 inset-x-2 h-6 bg-gradient-to-b from-white/40 to-transparent rounded-t-[18px]" />
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-pink-400 fill-pink-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
              </div>
            </div>
            {/* Speech bubble tail pointer */}
            <div className="w-3 h-3 bg-[#ec4899] rotate-45 -mt-1.5 shadow-[0_5px_15px_rgba(236,72,153,0.5)]" />
          </div>

          {/* Floating 3D Reaction Speech Bubble (Right Flank - Thumbs Up) */}
          <div className="absolute -right-2 sm:right-4 lg:right-8 top-4 hidden sm:flex flex-col items-center z-30 select-none pointer-events-none animate-bounce duration-1000 delay-150">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] bg-gradient-to-tr from-[#1e40af] via-[#3b82f6] to-[#00f5d4] p-[2.5px] shadow-[0_10px_30px_rgba(59,130,246,0.65),0_0_20px_rgba(0,245,212,0.5)]">
              {/* Inner Gloss */}
              <div className="w-full h-full bg-gradient-to-b from-[#082054]/90 to-[#030e28]/95 rounded-[20px] flex items-center justify-center overflow-hidden relative">
                {/* Top Glass Arc */}
                <div className="absolute top-0 inset-x-2 h-6 bg-gradient-to-b from-white/40 to-transparent rounded-t-[18px]" />
                <ThumbsUp className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-300 fill-cyan-300 drop-shadow-[0_0_12px_rgba(0,245,212,0.8)]" />
              </div>
            </div>
            {/* Speech bubble tail pointer */}
            <div className="w-3 h-3 bg-[#3b82f6] rotate-45 -mt-1.5 shadow-[0_5px_15px_rgba(59,130,246,0.5)]" />
          </div>

          {/* Cards Grid: 5 Crystal Pedestals */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 lg:gap-6 items-end relative z-20 max-w-[1260px]">
            {platforms.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className={`group relative rounded-[32px] p-[2.5px] bg-gradient-to-b ${p.crystalBorder} transition-all duration-300 hover:-translate-y-3 hover:scale-[1.03] active:scale-95 cursor-pointer block ${
                  p.isCenter
                    ? "lg:-translate-y-6 shadow-[0_20px_60px_rgba(37,99,235,0.5)] ring-2 ring-cyan-300/60"
                    : "shadow-[0_12px_45px_rgba(14,165,233,0.3)]"
                }`}
                style={{
                  filter: `drop-shadow(0 14px 35px ${p.glowColor})`,
                }}
                title={`${p.name} - ${p.action}`}
              >
                {/* 3D Chamfered Crystal Glass Monument Body */}
                <div className="relative rounded-[29.5px] bg-gradient-to-b from-[#0d2358]/95 via-[#06153d]/98 to-[#02081a] backdrop-blur-2xl p-4 sm:p-5 flex flex-col items-center justify-between min-h-[275px] sm:min-h-[310px] overflow-hidden border border-cyan-400/30">
                  
                  {/* Faceted Specular Corner Notches (Crystal Bevel Effect) */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-300/80 rounded-tl-[28px] pointer-events-none" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-300/80 rounded-tr-[28px] pointer-events-none" />
                  
                  {/* Top Glass Arch Specular Sheen */}
                  <div className="absolute top-0 inset-x-3 h-14 bg-gradient-to-b from-white/35 via-white/5 to-transparent rounded-t-[28px] pointer-events-none" />

                  {/* Diagonal 45-degree Crystal Prismatic Light Sheen */}
                  <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 pointer-events-none" />

                  {/* Corner Crystal Sparkle Star */}
                  <div className="absolute top-3.5 right-3.5 text-cyan-300/50 group-hover:text-cyan-200 group-hover:rotate-45 transition-all duration-300 pointer-events-none">
                    <Sparkles className="w-4 h-4" />
                  </div>

                  {/* 3D Glossy Jewel Button Platform */}
                  <div className="relative w-full aspect-square max-w-[130px] sm:max-w-[145px] my-auto flex items-center justify-center p-2">
                    {/* Outer Ambient Glow Ring */}
                    <div
                      className="absolute inset-1 rounded-[28px] blur-md group-hover:blur-xl transition-all duration-300"
                      style={{ background: p.glowColor }}
                    />

                    {/* The 3D Beveled Jewel Squircle */}
                    <div
                      className="relative w-full h-full rounded-[26px] p-[2px] shadow-[inset_0_3px_5px_rgba(255,255,255,0.7),inset_0_-4px_6px_rgba(0,0,0,0.6),0_12px_28px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-108 flex items-center justify-center border-2 border-white/30"
                      style={{ background: p.buttonGradient }}
                    >
                      {/* Top Jewel Gloss Reflection */}
                      <div className="absolute top-1 inset-x-2.5 h-9 bg-gradient-to-b from-white/60 to-transparent rounded-t-[22px] pointer-events-none" />

                      {/* Icon with 3D Pop */}
                      <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                        {p.icon}
                      </div>
                    </div>
                  </div>

                  {/* Pedestal Base Plinth matching image */}
                  <div className="w-full flex flex-col items-center gap-2 pt-2 relative z-10">
                    {/* Dark Metallic Pedestal Name Plate */}
                    <div className="w-full py-1.5 px-3 rounded-full bg-[#030d29] border border-cyan-400/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_2px_10px_rgba(0,245,212,0.2)] flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-black text-white tracking-widest font-sans drop-shadow-sm">
                        {p.name}
                      </span>
                    </div>

                    {/* Tactile Hover Action Button */}
                    <div className="w-full py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-[10px] sm:text-[11px] font-black text-cyan-300 flex items-center justify-center gap-1.5 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:text-white group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,245,212,0.5)]">
                      <span>{p.action}</span>
                      <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                </div>
              </a>
            ))}
          </div>

          {/* ======================================================== */}
          {/* 4. THE MULTI-TIERED 3D NEON FUTURISTIC STAGE PODIUM      */}
          {/* ======================================================== */}
          <div className="w-full max-w-[1300px] -mt-12 sm:-mt-16 relative flex flex-col items-center pointer-events-none select-none z-10">
            
            {/* Top Glowing Laser Ring (Tier 1 - Cyan Laser Beam) */}
            <div className="w-full h-16 sm:h-20 rounded-[50%] bg-gradient-to-r from-transparent via-[#00f5d4]/50 to-transparent border-t-2 border-[#00f5d4] shadow-[0_0_50px_rgba(0,245,212,0.8),inset_0_0_30px_rgba(0,245,212,0.4)]" />

            {/* Middle Laser Platform (Tier 2 - Electric Royal Blue Beam) */}
            <div className="w-[92%] h-14 sm:h-18 -mt-10 sm:-mt-12 rounded-[50%] bg-gradient-to-r from-transparent via-[#3a86ff]/60 to-transparent border-t-2 border-[#3a86ff] shadow-[0_0_60px_rgba(58,134,255,0.85),inset_0_0_35px_rgba(58,134,255,0.4)]" />

            {/* Bottom Broad Stage Beam (Tier 3 - Deep Neon Violet / Purple) */}
            <div className="w-[84%] h-12 sm:h-16 -mt-9 sm:-mt-11 rounded-[50%] bg-gradient-to-r from-transparent via-[#7928ca]/50 to-transparent border-t border-[#7928ca] shadow-[0_0_45px_rgba(121,40,202,0.7)]" />

            {/* Glossy Ground Reflection Glow Wash */}
            <div className="w-[96%] h-14 bg-gradient-to-t from-transparent via-cyan-400/15 to-transparent -mt-8 blur-lg" />

          </div>

        </div>

      </div>
    </section>
  );
}
