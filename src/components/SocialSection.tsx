"use client";

import React from "react";
import { ExternalLink, CheckCircle2, Sparkles, Flame, Users, Heart } from "lucide-react";
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

  const socialCards = [
    {
      id: "facebook",
      nameAr: "فيسبوك",
      nameEn: "Facebook",
      handle: "Ecom Speed Pro",
      tag: "الصفحة الرسمية المعتمدة",
      tagColor: "bg-blue-50 text-blue-700 border-blue-200",
      featured: true,
      badge: "الأكثر تفاعلاً",
      url: SOCIAL_LINKS.facebook,
      btnText: "متابعة الصفحة الرسمية",
      btnGradient: "from-[#1877f2] via-[#0b63d6] to-[#044cb0] hover:shadow-[0_0_25px_rgba(24,119,242,0.6)]",
      cardBorder: "border-2 border-blue-300/80 hover:border-blue-500",
      glowColor: "rgba(37, 99, 235, 0.28)",
      iconAura: "from-blue-500/30 to-indigo-600/30",
      features: [
        "تواصل مباشر واستفسارات فورية",
        "عروض حصرية وخصومات المتاجر",
      ],
      icon3D: (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-[24px] bg-gradient-to-br from-[#2f88ff] via-[#1877f2] to-[#084eb0] p-[2px] shadow-[inset_0_3px_5px_rgba(255,255,255,0.8),inset_0_-4px_6px_rgba(0,0,0,0.4),0_12px_28px_rgba(24,119,242,0.45)] flex items-center justify-center transition-transform duration-300 group-hover:scale-108">
          {/* Top Glass Specular Arc */}
          <div className="absolute top-1 inset-x-2 h-7 bg-gradient-to-b from-white/60 to-transparent rounded-t-[20px] pointer-events-none" />
          <svg className="w-10 h-10 fill-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] relative z-10" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
      ),
    },
    {
      id: "instagram",
      nameAr: "إنستغرام",
      nameEn: "Instagram",
      handle: "@ecom_speed_pro",
      tag: "ريلز ويوميات التجارة",
      tagColor: "bg-pink-50 text-pink-700 border-pink-200",
      featured: false,
      badge: "قصص يومية",
      url: SOCIAL_LINKS.instagram,
      btnText: "متابعة الحساب",
      btnGradient: "from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]",
      cardBorder: "border border-pink-200/80 hover:border-pink-400",
      glowColor: "rgba(236, 72, 153, 0.22)",
      iconAura: "from-pink-500/30 to-purple-600/30",
      features: [
        "ريلز وتصاميم إعلانية عالية الدقة",
        "نصائح بصرية لتطوير الهوية الرقمية",
      ],
      icon3D: (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-[24px] bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-[2px] shadow-[inset_0_3px_5px_rgba(255,255,255,0.8),inset_0_-4px_6px_rgba(0,0,0,0.4),0_12px_28px_rgba(236,72,153,0.45)] flex items-center justify-center transition-transform duration-300 group-hover:scale-108">
          <div className="absolute top-1 inset-x-2 h-7 bg-gradient-to-b from-white/60 to-transparent rounded-t-[20px] pointer-events-none" />
          <svg className="w-9 h-9 fill-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] relative z-10" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>
      ),
    },
    {
      id: "youtube",
      nameAr: "يوتيوب",
      nameEn: "YouTube",
      handle: "@EcomSpeedPro",
      tag: "قناة الشروحات الرسمية",
      tagColor: "bg-red-50 text-red-700 border-red-200",
      featured: false,
      badge: "دروس واستراتيجيات",
      url: SOCIAL_LINKS.youtube,
      btnText: "اشتراك في القناة",
      btnGradient: "from-[#ff0000] via-[#e60000] to-[#b30000] hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]",
      cardBorder: "border border-red-200/80 hover:border-red-400",
      glowColor: "rgba(239, 68, 68, 0.22)",
      iconAura: "from-red-500/30 to-rose-600/30",
      features: [
        "شروحات عملية لبناء المتاجر الناجحة",
        "استراتيجيات مضاعفة المبيعات والتحويل",
      ],
      icon3D: (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-[24px] bg-gradient-to-br from-[#ff334b] via-[#e60000] to-[#990000] p-[2px] shadow-[inset_0_3px_5px_rgba(255,255,255,0.8),inset_0_-4px_6px_rgba(0,0,0,0.4),0_12px_28px_rgba(239,68,68,0.45)] flex items-center justify-center transition-transform duration-300 group-hover:scale-108">
          <div className="absolute top-1 inset-x-2 h-7 bg-gradient-to-b from-white/60 to-transparent rounded-t-[20px] pointer-events-none" />
          <svg className="w-10 h-10 fill-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] relative z-10" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
      ),
    },
    {
      id: "tiktok",
      nameAr: "تيك توك",
      nameEn: "TikTok",
      handle: "@ecomspeedpro",
      tag: "أسرار وترندات التجارة",
      tagColor: "bg-slate-100 text-slate-800 border-slate-300",
      featured: false,
      badge: "فيديوهات سريعة",
      url: SOCIAL_LINKS.tiktok,
      btnText: "مشاهدة الفيديوهات",
      btnGradient: "from-[#0a0f1d] via-[#111827] to-[#030712] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] border border-cyan-400/30",
      cardBorder: "border border-slate-200/90 hover:border-cyan-400",
      glowColor: "rgba(6, 182, 212, 0.22)",
      iconAura: "from-cyan-400/25 to-pink-500/25",
      features: [
        "فيديوهات قصيرة لأحدث ترندات المنتجات",
        "حيل تسويقية ترفع من معدل الشراء",
      ],
      icon3D: (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-[24px] bg-gradient-to-br from-[#23272f] via-[#111622] to-[#000000] p-[2px] shadow-[inset_0_3px_5px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.6),0_12px_28px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform duration-300 group-hover:scale-108 border border-cyan-400/40">
          <div className="absolute top-1 inset-x-2 h-7 bg-gradient-to-b from-white/30 to-transparent rounded-t-[20px] pointer-events-none" />
          <svg className="w-9 h-9 fill-white drop-shadow-[0_4px_12px_rgba(0,242,254,0.7)] relative z-10" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.87 2.89 2.89 0 0 1-2.88-2.87 2.89 2.89 0 0 1 2.88-2.87c.37 0 .73.07 1.05.21V9.52a6.34 6.34 0 0 0-1.05-.09A6.33 6.33 0 0 0 3 15.76a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.17 8.17 0 0 0 4.91 1.62V6.89c-.66 0-1.35-.07-2-.2z" />
          </svg>
        </div>
      ),
    },
    {
      id: "twitter",
      nameAr: "تويتر",
      nameEn: "Twitter",
      handle: "@EcomSpeedPro",
      tag: "تحديثات وأخبار فورية",
      tagColor: "bg-sky-50 text-sky-700 border-sky-200",
      featured: false,
      badge: "تحديثات يومية",
      url: SOCIAL_LINKS.twitter,
      btnText: "متابعة التغريدات",
      btnGradient: "from-[#38bdf8] via-[#1da1f2] to-[#0284c7] hover:shadow-[0_0_25px_rgba(29,161,242,0.6)]",
      cardBorder: "border border-sky-200/80 hover:border-sky-400",
      glowColor: "rgba(14, 165, 233, 0.22)",
      iconAura: "from-sky-400/30 to-blue-600/30",
      features: [
        "أحدث أخبار التجارة الرقمية والدروبشيبينغ",
        "تفاعل سريع وإجابات على استفسارات الرواد",
      ],
      icon3D: (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-[24px] bg-gradient-to-br from-[#38bdf8] via-[#1da1f2] to-[#0284c7] p-[2px] shadow-[inset_0_3px_5px_rgba(255,255,255,0.8),inset_0_-4px_6px_rgba(0,0,0,0.4),0_12px_28px_rgba(29,161,242,0.45)] flex items-center justify-center transition-transform duration-300 group-hover:scale-108">
          <div className="absolute top-1 inset-x-2 h-7 bg-gradient-to-b from-white/60 to-transparent rounded-t-[20px] pointer-events-none" />
          <svg className="w-9 h-9 fill-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] relative z-10" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full py-12 sm:py-18 relative z-20 overflow-hidden" dir="rtl">
      
      {/* Background Soft Glows matching store aesthetic */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-gradient-to-r from-blue-400/10 via-cyan-400/15 to-purple-400/10 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* ======================================================== */}
        {/* 1. SECTION HEADER (HARMONIOUS, NEAT & ULTRA-LUXURIOUS)   */}
        {/* ======================================================== */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-10 sm:mb-12">
          
          {/* Top Pill Banner: »» كونوا جزءاً من مجتمع ECOM SPEED PRO «« */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-[#00b4d8]/15 via-[#3a86ff]/20 to-[#7209b7]/15 border border-[#3a86ff]/40 shadow-[0_4px_20px_rgba(58,134,255,0.18)] backdrop-blur-md transition-transform hover:scale-105">
            <span className="text-cyan-600 font-mono font-black text-xs sm:text-sm tracking-wider">
              &gt;&gt;
            </span>
            <span className="text-xs sm:text-sm font-black text-[#0b1739] tracking-wide">
              كونوا جزءاً من مجتمع <span className="text-[#2563eb]">ECOM SPEED PRO</span>
            </span>
            <span className="text-cyan-600 font-mono font-black text-xs sm:text-sm tracking-wider">
              &lt;&lt;
            </span>
          </div>

          {/* Section Main Title with matching gradient underline */}
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a193d] tracking-tight">
              تابعونا على{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] via-[#2563eb] to-[#7209b7]">
                مواقع التواصل الاجتماعي
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 mx-auto rounded-full mt-3" />
          </div>

          {/* Trust badges row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>15,000+ رائد أعمال يتابعوننا</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>محتوى واستراتيجيات نمو حصرية يومياً</span>
            </span>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm font-semibold max-w-xl leading-relaxed">
            انضم إلى قنواتنا الرسمية المعتمدة للحصول على شروحات المتاجر، أحدث استراتيجيات زيادة المبيعات، والعروض الخاصة لرواد التجارة الإلكترونية
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2. THE 5 LUXURY SOCIAL CARDS (على شكل بطاقات متناسقة وفخمة) */}
        {/* ======================================================== */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {socialCards.map((card) => (
            <div
              key={card.id}
              className={`group relative rounded-3xl bg-white/95 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2.5 flex flex-col justify-between ${card.cardBorder} ${
                card.featured
                  ? "shadow-[0_15px_45px_rgba(37,99,235,0.2)] ring-2 ring-blue-400/40"
                  : "shadow-[0_10px_35px_rgba(37,99,235,0.08)] hover:shadow-[0_18px_45px_rgba(37,99,235,0.18)]"
              }`}
            >
              {/* Top Accent Gradient Bar on Hover */}
              <div className="absolute top-0 inset-x-6 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Top Badge & Platform Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${card.tagColor}`}
                  >
                    {card.tag}
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{card.badge}</span>
                  </span>
                </div>

                {/* 3D Jewel Icon Centerpiece */}
                <div className="flex flex-col items-center justify-center my-3 sm:my-4">
                  <div className="relative">
                    {/* Glowing Aura behind 3D Icon */}
                    <div
                      className={`absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity bg-gradient-to-tr ${card.iconAura}`}
                    />
                    {/* 3D Icon */}
                    {card.icon3D}
                  </div>

                  {/* Platform Name and Handle */}
                  <div className="text-center mt-4 space-y-1">
                    <h3 className="text-lg sm:text-xl font-black text-[#0a193d] tracking-tight">
                      {card.nameAr}
                      <span className="text-xs font-extrabold text-slate-400 mr-1.5 font-sans">
                        ({card.nameEn})
                      </span>
                    </h3>
                    <div className="inline-block px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-mono text-[11px] font-bold dir-ltr">
                      {card.handle}
                    </div>
                  </div>
                </div>

                {/* Feature Bullets */}
                <div className="space-y-2 my-4 pt-3 border-t border-slate-100">
                  {card.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs font-bold text-slate-600 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button CTA */}
              <div className="pt-2">
                <a
                  href={card.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-2.5 px-4 rounded-xl bg-gradient-to-r ${card.btnGradient} text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:scale-102 active:scale-95 transition-all duration-200 cursor-pointer`}
                >
                  <span>{card.btnText}</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
