"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, ChevronLeft } from "lucide-react";

interface HeroSectionProps {
  onOpenOrderModal: (plan?: string, price?: string) => void;
}

export default function HeroSection({ onOpenOrderModal }: HeroSectionProps) {
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
                onClick={() => onOpenOrderModal("منصة التجارة المتقدمة (Advanced SaaS)", "5000 درهم")}
                className="w-full sm:w-auto relative group flex items-center justify-center gap-2.5 px-8 py-2.5 rounded-full font-black text-white text-[15px] bg-gradient-to-r from-[#00c8ff] via-[#3a86ff] to-[#8338ec] shadow-[0_0_25px_rgba(131,56,236,0.65),0_0_50px_rgba(0,200,255,0.4)] hover:shadow-[0_0_35px_rgba(131,56,236,0.9),0_0_65px_rgba(0,200,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>اطلب الآن</span>
              </button>

            </div>

          </div>

          {/* ======================================================== */}
          {/* Column 2 in DOM -> In RTL, renders on the LEFT side! */}
          {/* Exact 3D Hero Mockup Graphic */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div className="relative w-full max-w-2xl flex items-center justify-center">
              {/* Soft radial underglow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-blue-500/15 to-purple-500/15 rounded-full blur-2xl -z-10"></div>
              
              <Image
                src="/images/hero_cutout_master.png"
                alt="متجر إلكتروني احترافي متكامل Ecom Speed Pro"
                width={1535}
                height={1024}
                priority
                className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(0,180,255,0.35)] hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
