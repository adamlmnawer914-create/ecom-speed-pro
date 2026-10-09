"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, ChevronLeft } from "lucide-react";

interface HeroSectionProps {
  onOpenOrderModal: (plan?: string, price?: string) => void;
  onOpenPackageSelect?: () => void;
}

export default function HeroSection({ onOpenOrderModal, onOpenPackageSelect }: HeroSectionProps) {
  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <section id="home" className="relative w-full overflow-hidden pt-2 pb-3 md:pt-3 md:pb-4">
      {/* Background ambient lighting and futuristic glowing rays */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">

          {/* ======================================================== */}
          {/* Column 1 in DOM -> In RTL, renders on the RIGHT side! */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center">

            {/* Main Headline matching original-design.jpg exactly */}
            <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[46px] font-black text-[#0b1739] leading-[1.2] tracking-tight mb-2.5">
              متجرك الإلكتروني الاحترافي
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#4361ee] to-[#7928ca] drop-shadow-sm">
                جاهزٌ للنجاح الآن
              </span>
            </h1>

            {/* Subtitle matching original text */}
            <p className="text-sm sm:text-base md:text-[16px] text-[#1e293b] font-bold max-w-xl leading-relaxed mb-6">
              احصل على متجر إلكتروني متكامل مع تصميم عصري وتجربة مستخدم استثنائية
              <br className="hidden sm:inline" />
              بالإضافة إلى منصة هووية احترافية لزيادة المبيعات وتحقيق أفضل النتائج.
            </p>

            {/* CTA Buttons Row - In RTL, first child is on the RIGHT */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">

              {/* Button 1 (Right in visual layout): اكتشف خدماتنا */}
              <button
                onClick={scrollToServices}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-2.5 rounded-full font-black text-[#1d4ed8] text-[15px] bg-white border-2 border-[#2563eb] shadow-sm hover:shadow-md hover:bg-blue-50/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>اكتشف خدماتنا</span>
                <ChevronLeft className="w-5 h-5 text-[#1d4ed8]" />
              </button>

              {/* Button 2 (Left in visual layout): اطلب الآن */}
              <button
                onClick={onOpenPackageSelect || scrollToServices}
                className="w-full sm:w-auto relative group flex items-center justify-center gap-2.5 px-8 py-2.5 rounded-full font-black text-white text-[15px] bg-gradient-to-r from-[#00c8ff] via-[#3a86ff] to-[#8338ec] shadow-[0_0_25px_rgba(131,56,236,0.65),0_0_50px_rgba(0,200,255,0.4)] hover:shadow-[0_0_35px_rgba(131,56,236,0.9),0_0_65px_rgba(0,200,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>اطلب الآن</span>
              </button>

            </div>

          </div>

          {/* ======================================================== */}
          {/* Column 2 in DOM -> In RTL, renders on the LEFT side! */}
          {/* Exact 3D Hero Mockup Graphic in a LUXURY CARD (بطاقة فخمة) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex justify-center items-center relative mt-4 lg:mt-0">
            <div className="relative w-full max-w-[620px] mx-auto group">

              {/* Luxury ambient glowing backlights */}
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-tr from-[#00d2ff]/40 via-[#3a86ff]/35 to-[#7928ca]/40 rounded-[38px] sm:rounded-[46px] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 -z-10 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-[34px] sm:rounded-[42px] opacity-40 group-hover:opacity-75 blur-md transition duration-500 -z-10"></div>

              {/* Luxury Glass Card Container */}
              <div className="relative rounded-[32px] sm:rounded-[40px] bg-white/95 dark:bg-slate-900/90 backdrop-blur-2xl p-2.5 sm:p-4 border-2 border-white/95 dark:border-blue-500/30 shadow-[0_25px_65px_-15px_rgba(14,165,233,0.35),0_0_50px_rgba(99,102,241,0.2)] hover:shadow-[0_30px_80px_-10px_rgba(14,165,233,0.45),0_0_70px_rgba(99,102,241,0.3)] transition-all duration-500 hover:-translate-y-1">

                {/* Floating Luxury Status Badge (Top-Right in RTL) */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-blue-100 dark:border-blue-900/50">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] sm:text-xs font-black text-slate-800 dark:text-slate-100">
                    منظومة متكاملة جاهزة 100%
                  </span>
                </div>

                {/* Floating Live Tech Badge (Bottom-Left) */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-[#0b1739]/90 text-white backdrop-blur-md shadow-[0_8px_25px_rgba(11,23,57,0.4)] border border-white/15">
                  <span className="text-sm">🚀</span>
                  <span className="text-[11px] sm:text-xs font-black tracking-wide text-cyan-300">
                    حواسيب وهواتف فائقة السرعة
                  </span>
                </div>

                {/* Image Container inside Card */}
                <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gradient-to-tr from-sky-100 via-sky-50 to-blue-100 border border-blue-100/80 shadow-inner">
                  <Image
                    src="/images/hero_showcase_luxury.png"
                    alt="متجر إلكتروني احترافي متكامل Ecom Speed Pro"
                    width={1024}
                    height={683}
                    priority
                    className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
