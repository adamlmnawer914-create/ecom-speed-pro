"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ExternalLink, Heart, ThumbsUp } from "lucide-react";

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
      arabicName: "يوتيوب",
      action: "اشتراك في القناة",
      url: SOCIAL_LINKS.youtube,
      color: "from-red-600 to-rose-700",
      textColor: "text-red-500",
      bgHover: "hover:shadow-[0_0_30px_rgba(239,68,68,0.7)]",
      rect: {
        left: "3.8%",
        top: "44%",
        width: "17.4%",
        height: "33%",
      },
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      id: "instagram",
      name: "Instagram",
      arabicName: "إنستغرام",
      action: "متابعة الحساب",
      url: SOCIAL_LINKS.instagram,
      color: "from-purple-600 via-pink-600 to-amber-500",
      textColor: "text-pink-500",
      bgHover: "hover:shadow-[0_0_30px_rgba(236,72,153,0.7)]",
      rect: {
        left: "21.5%",
        top: "45.5%",
        width: "17.4%",
        height: "31.5%",
      },
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      id: "facebook",
      name: "Facebook",
      arabicName: "فيسبوك",
      action: "متابعة الصفحة",
      url: SOCIAL_LINKS.facebook,
      color: "from-blue-600 to-indigo-700",
      textColor: "text-blue-500",
      bgHover: "hover:shadow-[0_0_35px_rgba(37,99,235,0.8)]",
      rect: {
        left: "39.8%",
        top: "42%",
        width: "19.5%",
        height: "36%",
      },
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: "tiktok",
      name: "TikTok",
      arabicName: "تيك توك",
      action: "مشاهدة الفيديوهات",
      url: SOCIAL_LINKS.tiktok,
      color: "from-slate-900 via-teal-900 to-pink-900",
      textColor: "text-teal-400",
      bgHover: "hover:shadow-[0_0_30px_rgba(20,184,166,0.7)]",
      rect: {
        left: "60.3%",
        top: "45.5%",
        width: "17.4%",
        height: "31.5%",
      },
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.87 2.89 2.89 0 0 1-2.88-2.87 2.89 2.89 0 0 1 2.88-2.87c.37 0 .73.07 1.05.21V9.52a6.34 6.34 0 0 0-1.05-.09A6.33 6.33 0 0 0 3 15.76a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.17 8.17 0 0 0 4.91 1.62V6.89c-.66 0-1.35-.07-2-.2z" />
        </svg>
      ),
    },
    {
      id: "twitter",
      name: "Twitter / X",
      arabicName: "تويتر / X",
      action: "متابعة التغريدات",
      url: SOCIAL_LINKS.twitter,
      color: "from-sky-500 to-blue-600",
      textColor: "text-sky-400",
      bgHover: "hover:shadow-[0_0_30px_rgba(14,165,233,0.7)]",
      rect: {
        left: "79.1%",
        top: "44%",
        width: "17.4%",
        height: "33%",
      },
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-8 sm:py-12 relative z-20 overflow-hidden" dir="rtl">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">

        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-blue-400/30 text-blue-800 text-xs font-black shadow-xs">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
            <span>كونوا جزءاً من مجتمع ECOM SPEED PRO</span>
            <ThumbsUp className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1739] tracking-tight">
            تابعونا على{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              مواقع التواصل الاجتماعي
            </span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-semibold max-w-lg mx-auto">
            انضم إلى آلاف التجار ورواد الأعمال لمتابعة أحدث الاستراتيجيات والنصائح الحصرية في التجارة الإلكترونية
          </p>
        </div>

        {/* ======================================================== */}
        {/* THE 3D MASTER CRYSTAL STAGE ARTWORK CONTAINER            */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-[1100px] rounded-[36px] overflow-hidden border border-blue-400/40 shadow-[0_20px_60px_rgba(37,99,235,0.22)] bg-gradient-to-b from-[#0a193c] via-[#040d24] to-[#020617] group">
          
          {/* Ambient Lighting Behind Artwork */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Master 3D Stage Image */}
          <div className="relative w-full aspect-[1024/682] select-none">
            <Image
              src="/images/social_stage_master.jpg"
              alt="تابعونا على مواقع التواصل الاجتماعي Ecom Speed Pro"
              fill
              priority
              className="object-cover"
            />

            {/* 5 INTERACTIVE VECTOR CLICKABLE HOTSPOTS */}
            {platforms.map((platform) => (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  position: "absolute",
                  left: platform.rect.left,
                  top: platform.rect.top,
                  width: platform.rect.width,
                  height: platform.rect.height,
                }}
                className={`group/card rounded-3xl cursor-pointer transition-all duration-300 z-10 flex flex-col items-center justify-end pb-3 hover:scale-[1.04] active:scale-[0.97] ${platform.bgHover}`}
                title={`${platform.name} - ${platform.action}`}
              >
                {/* Glow ring indicator on hover */}
                <span className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 absolute inset-0 rounded-3xl border-2 border-white/60 bg-white/10 backdrop-blur-[2px] shadow-lg pointer-events-none" />

                {/* Hover Action Tooltip Pill */}
                <div className="opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-y-2 group-hover/card:translate-y-0 bg-[#061230]/95 text-white border border-cyan-400/50 text-[10px] sm:text-xs font-black py-1 px-3 rounded-full shadow-2xl flex items-center gap-1.5 whitespace-nowrap z-20 pointer-events-none">
                  <span>{platform.action}</span>
                  <ExternalLink className="w-3 h-3 text-cyan-300" />
                </div>
              </a>
            ))}
          </div>

        </div>

        {/* ======================================================== */}
        {/* MOBILE & DESKTOP TACTILE ACTION PILLS ROW                */}
        {/* ======================================================== */}
        <div className="w-full max-w-[1100px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {platforms.map((platform) => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center justify-between group/pill"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${platform.color} text-white flex items-center justify-center shadow-xs group-hover/pill:scale-110 transition-transform`}
                >
                  {platform.icon}
                </div>
                <div className="text-right">
                  <h4 className="text-xs font-black text-[#0a193c]">
                    {platform.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bold">
                    {platform.action}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/pill:text-blue-600 transition-colors" />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
