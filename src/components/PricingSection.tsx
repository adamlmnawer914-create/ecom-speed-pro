"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, Check, Flame, Zap, Crown, Sparkles } from "lucide-react";

interface PricingSectionProps {
  onSelectPlan: (planName: string, price: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans = [
    {
      id: "landing",
      name: "صفحة الهبوط (Landing Page)",
      subtitle: "تصميم مخصص لتحقيق أعلى معدل تحويل لمنتج رابح",
      price: "500 درهم",
      image: "/images/card_landing_new.png",
      badge: {
        text: "الأكثر طلباً",
        icon: Flame,
        gradient: "from-red-600 via-rose-500 to-purple-600",
        shadow: "shadow-[0_0_20px_rgba(239,68,68,0.7)]",
      },
      cardBorder: "border-2 border-fuchsia-400/50 hover:border-fuchsia-400",
      cardGlow: "shadow-[0_12px_40px_rgba(217,70,239,0.22)] hover:shadow-[0_18px_50px_rgba(217,70,239,0.38)]",
      cardBg: "bg-white/85 hover:bg-white/95",
      accentColor: "#d946ef",
      checkBg: "bg-fuchsia-500/15 text-fuchsia-600 border border-fuchsia-400/30",
      priceGradient: "from-rose-500 via-fuchsia-600 to-purple-600 text-white shadow-[0_4px_18px_rgba(217,70,239,0.45)]",
      buttonGradient: "from-red-500 via-rose-500 to-purple-600 text-white hover:shadow-[0_0_25px_rgba(236,72,153,0.85)]",
      features: [
        "صفحة هبوط احترافية مخصصة لمنتج رابح (Winner Product)",
        "تصميم محفز ومضاعف لمعدل التحويل (High Conversion)",
        "استقبال فوري ومؤتمت للطلبات والتحويلات المباشرة",
        "سرعة تحميل فائقة وتوافق تام 100% مع جميع الهواتف",
      ],
    },
    {
      id: "standard",
      name: "المتجر القياسي (Standard Store)",
      subtitle: "متجر متكامل متعدد المنتجات للعلامات التجارية الطموحة",
      price: "1500 درهم",
      image: "/images/card_standard_new.png",
      badge: {
        text: "الأكثر مبيعاً",
        icon: Zap,
        gradient: "from-cyan-500 via-blue-500 to-indigo-600",
        shadow: "shadow-[0_0_20px_rgba(6,182,212,0.7)]",
      },
      cardBorder: "border-2 border-cyan-400/50 hover:border-cyan-300",
      cardGlow: "shadow-[0_12px_40px_rgba(6,182,212,0.22)] hover:shadow-[0_18px_50px_rgba(6,182,212,0.38)]",
      cardBg: "bg-white/85 hover:bg-white/95",
      accentColor: "#06b6d4",
      checkBg: "bg-cyan-500/15 text-cyan-700 border border-cyan-400/30",
      priceGradient: "from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-[0_4px_18px_rgba(6,182,212,0.45)]",
      buttonGradient: "from-cyan-500 via-blue-600 to-indigo-600 text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.85)]",
      features: [
        "عرض منتجات متعددة بتصميم عصري جذاب ومرتب",
        "نظام سلس ومتكامل لاستقبال وتتبع وإدارة الطلبات",
        "ربط بوابات الدفع الإلكتروني المؤتمتة (YouCan Pay, CMI)",
        "واجهة متجاوبة 100% وسهلة الإدارة والتحديث",
      ],
    },
    {
      id: "saas",
      name: "منصة التجارة المتقدمة (Advanced SaaS)",
      subtitle: "حل برمجي VIP متكامل لكبار التجار والشركات التوسعية",
      price: "5000 درهم",
      image: "/images/card_saas_new.png",
      badge: {
        text: "الخيار الأقوى",
        icon: Crown,
        gradient: "from-amber-400 via-yellow-300 to-amber-500",
        shadow: "shadow-[0_0_22px_rgba(245,158,11,0.85)]",
      },
      cardBorder: "border-2 border-amber-400/60 hover:border-amber-300",
      cardGlow: "shadow-[0_12px_45px_rgba(245,158,11,0.32)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.52)]",
      cardBg: "bg-white/90 hover:bg-white/95",
      accentColor: "#f59e0b",
      checkBg: "bg-amber-500/15 text-amber-800 border border-amber-400/30",
      priceGradient: "from-amber-500 via-yellow-400 to-amber-600 text-[#0b1739] font-black shadow-[0_4px_20px_rgba(245,158,11,0.5)]",
      buttonGradient: "from-amber-500 via-yellow-400 to-amber-600 text-[#0b1739] font-black hover:shadow-[0_0_25px_rgba(245,158,11,0.9)]",
      features: [
        "نظام متكامل بلوحة تحكم إدارية احترافية (Dashboard)",
        "دمج بوابات الدفع الإلكترونية المؤتمتة (YouCan Pay, CMI)",
        "إرسال فواتير وإشعارات أوتوماتيكية للزبائن",
        "ملكية النظام مدى الحياة بدون أي اشتراكات شهرية",
      ],
    },
  ];

  return (
    <section id="services" className="w-full py-4 md:py-6 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title with horizontal lines matching the master design */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center">
            <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#2563eb] rounded-full"></span>
            <span className="w-2 h-2 rounded-full bg-[#2563eb] -mr-1"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black text-[#1d4ed8] tracking-tight px-3 drop-shadow-xs flex items-center gap-2">
            <span>خدماتنا المميزة</span>
            <Sparkles className="w-6 h-6 text-[#2563eb] animate-pulse" />
          </h2>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] -ml-1"></span>
            <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#2563eb] rounded-full"></span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3 Rectangular Luxury Cards in ONE ROW (سطر واحد مستطيل)  */}
        {/* All cards equal height, equal width, aligned perfectly   */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 xl:gap-7 items-stretch">
          {plans.map((plan) => {
            const BadgeIcon = plan.badge.icon;
            return (
              <div
                key={plan.id}
                className={`relative group rounded-[32px] overflow-hidden backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${plan.cardBorder} ${plan.cardGlow} ${plan.cardBg}`}
              >
                {/* Upper Area: Floating Luxury Badge + 16:9 Rectangular Image */}
                <div className="relative w-full">
                  {/* Floating Luxury Badge */}
                  <div
                    className={`absolute top-3.5 right-3.5 z-20 px-3.5 py-1.5 rounded-full bg-gradient-to-r ${plan.badge.gradient} ${plan.badge.shadow} flex items-center gap-1.5 text-xs font-black border border-white/25`}
                  >
                    <span>{plan.badge.text}</span>
                    <BadgeIcon className="w-3.5 h-3.5" />
                  </div>

                  {/* 16:9 High-Res Rectangular Artwork */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-[30px] bg-slate-900/10">
                    <Image
                      src={plan.image}
                      alt={plan.name}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle bottom gradient shadow on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Content Body: Title, Subtitle, Features */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Plan Title */}
                    <h3 className="text-xl sm:text-[22px] font-black text-[#0b1739] mb-1.5 leading-snug">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#475569] font-medium mb-4 leading-relaxed">
                      {plan.subtitle}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#1e293b] font-bold leading-relaxed">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.checkBg}`}>
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action Area: Price Capsule + Order CTA Button */}
                  <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between gap-3">
                    
                    {/* Price Capsule */}
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${plan.priceGradient} text-sm sm:text-base font-black flex items-center justify-center shrink-0`}>
                      <span>{plan.price}</span>
                    </div>

                    {/* Order Button */}
                    <button
                      onClick={() => onSelectPlan(plan.name, plan.price)}
                      className={`flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r ${plan.buttonGradient} text-sm sm:text-[15px] font-black flex items-center justify-center gap-2 shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>الطلب الآن</span>
                    </button>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
