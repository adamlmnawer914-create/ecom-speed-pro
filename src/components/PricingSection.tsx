"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Check, Flame, Globe, Zap, Crown, Sparkles } from "lucide-react";

interface PricingSectionProps {
  onSelectPlan: (planName: string, price: string) => void;
}

// ─── Local (Morocco) Plans ──────────────────────────────────────────────────
const LOCAL_PLANS = [
  {
    id: "landing-local",
    name: "صفحة هبوط — السوق المحلي",
    market: "🇲🇦 المغرب",
    subtitle: "تصميم مخصص لتحقيق أعلى معدل تحويل لمنتج رابح في السوق المغربي",
    originalPrice: "1,700 DH",
    discountPrice: "1,500 DH",
    priceValue: "1500 درهم",
    planTier: "صفحة هبوط — السوق المحلي 🇲🇦 (1,500 MAD)",
    image: "/images/card_landing_new.webp",
    badge: { text: "الأكثر طلباً", icon: Flame, gradient: "from-red-600 via-rose-500 to-purple-600", shadow: "shadow-[0_0_20px_rgba(239,68,68,0.7)]", textColor: "text-white" },
    cardBorder: "border-2 border-fuchsia-400/50 hover:border-fuchsia-400",
    cardGlow: "shadow-[0_12px_40px_rgba(217,70,239,0.22)] hover:shadow-[0_18px_50px_rgba(217,70,239,0.38)]",
    cardBg: "bg-white/85 hover:bg-white/95",
    checkBg: "bg-fuchsia-500/15 text-fuchsia-600 border border-fuchsia-400/30",
    priceGradient: "from-rose-500 via-fuchsia-600 to-purple-600 text-white shadow-[0_4px_18px_rgba(217,70,239,0.45)]",
    buttonGradient: "from-red-500 via-rose-500 to-purple-600 text-white hover:shadow-[0_0_25px_rgba(236,72,153,0.85)]",
    features: [
      "صفحة هبوط احترافية مخصصة لمنتج رابح (Winner Product)",
      "تصميم محفز ومضاعف لمعدل التحويل (High Conversion)",
      "استقبال فوري ومؤتمت للطلبات والتحويلات المباشرة",
      "سرعة تحميل فائقة وتوافق تام 100% مع جميع الهواتف",
      "مرونة كاملة في خيارات الدفع: COD / تحويل بنكي / PayPal",
      "استخدام النظام مدى الحياة",
    ],
  },
  {
    id: "store-local",
    name: "متجر متكامل + لوحة تحكم — المحلي",
    market: "🇲🇦 المغرب",
    subtitle: "متجر متكامل متعدد المنتجات مع لوحة تحكم للعلامات التجارية في المغرب",
    originalPrice: "3,000 DH",
    discountPrice: "2,500 DH",
    priceValue: "2500 درهم",
    planTier: "متجر متكامل + لوحة تحكم — السوق المحلي 🇲🇦 (2,500 MAD)",
    image: "/images/card_standard_new.webp",
    badge: { text: "الأكثر مبيعاً", icon: Zap, gradient: "from-cyan-500 via-blue-500 to-indigo-600", shadow: "shadow-[0_0_20px_rgba(6,182,212,0.7)]", textColor: "text-white" },
    cardBorder: "border-2 border-cyan-400/50 hover:border-cyan-300",
    cardGlow: "shadow-[0_12px_40px_rgba(6,182,212,0.22)] hover:shadow-[0_18px_50px_rgba(6,182,212,0.38)]",
    cardBg: "bg-white/85 hover:bg-white/95",
    checkBg: "bg-cyan-500/15 text-cyan-700 border border-cyan-400/30",
    priceGradient: "from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-[0_4px_18px_rgba(6,182,212,0.45)]",
    buttonGradient: "from-cyan-500 via-blue-600 to-indigo-600 text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.85)]",
    features: [
      "عرض منتجات متعددة بتصميم عصري جذاب ومرتب",
      "نظام سلس ومتكامل لاستقبال وتتبع وإدارة الطلبات",
      "لوحة تحكم إدارية احترافية (Dashboard)",
      "واجهة متجاوبة 100% وسهلة الإدارة والتحديث",
      "مرونة كاملة في خيارات الدفع: COD / تحويل بنكي / PayPal",
      "استخدام النظام مدى الحياة",
    ],
  },
];

// ─── International Plans ────────────────────────────────────────────────────
const INTERNATIONAL_PLANS = [
  {
    id: "landing-intl",
    name: "صفحة هبوط — السوق الدولي",
    market: "🌐 US / CA / AU",
    subtitle: "صفحة هبوط احترافية مخصصة للأسواق الدولية بمعدل تحويل مرتفع",
    originalPrice: "5,000 DH",
    discountPrice: "4,500 DH",
    priceValue: "4500 درهم",
    planTier: "صفحة هبوط — السوق الدولي 🌐 (4,500 MAD)",
    image: "/images/card_landing_new.webp",
    badge: { text: "مميز دولياً", icon: Globe, gradient: "from-emerald-500 via-teal-500 to-cyan-600", shadow: "shadow-[0_0_20px_rgba(16,185,129,0.7)]", textColor: "text-white" },
    cardBorder: "border-2 border-emerald-400/50 hover:border-emerald-400",
    cardGlow: "shadow-[0_12px_40px_rgba(16,185,129,0.22)] hover:shadow-[0_18px_50px_rgba(16,185,129,0.38)]",
    cardBg: "bg-white/85 hover:bg-white/95",
    checkBg: "bg-emerald-500/15 text-emerald-700 border border-emerald-400/30",
    priceGradient: "from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-[0_4px_18px_rgba(16,185,129,0.45)]",
    buttonGradient: "from-emerald-500 via-teal-500 to-cyan-600 text-white hover:shadow-[0_0_25px_rgba(16,185,129,0.85)]",
    features: [
      "صفحة هبوط احترافية للأسواق الأمريكية والكندية والأسترالية",
      "تصميم محفز ومضاعف لمعدل التحويل (High Conversion)",
      "استقبال فوري ومؤتمت للطلبات والتحويلات المباشرة",
      "سرعة تحميل فائقة وتوافق تام 100% مع جميع الأجهزة",
      "ربط بوابات الدفع العالمية: Stripe / PayPal / COD / تحويل بنكي",
      "استخدام النظام مدى الحياة",
    ],
  },
  {
    id: "store-intl",
    name: "متجر متكامل + لوحة تحكم — الدولي",
    market: "🌐 US / CA / AU",
    subtitle: "حل برمجي VIP متكامل للأسواق الدولية مع بوابات دفع عالمية",
    originalPrice: "9,500 DH",
    discountPrice: "8,500 DH",
    priceValue: "8500 درهم",
    planTier: "متجر متكامل + لوحة تحكم — السوق الدولي 🌐 (8,500 MAD)",
    image: "/images/card_saas_new.webp",
    badge: { text: "الخيار الأقوى", icon: Crown, gradient: "from-amber-400 via-yellow-300 to-amber-500", shadow: "shadow-[0_0_22px_rgba(245,158,11,0.85)]", textColor: "text-[#0b1739]" },
    cardBorder: "border-2 border-amber-400/60 hover:border-amber-300",
    cardGlow: "shadow-[0_12px_45px_rgba(245,158,11,0.32)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.52)]",
    cardBg: "bg-white/90 hover:bg-white/95",
    checkBg: "bg-amber-500/15 text-amber-800 border border-amber-400/30",
    priceGradient: "from-amber-500 via-yellow-400 to-amber-600 text-[#0b1739] font-black shadow-[0_4px_20px_rgba(245,158,11,0.5)]",
    buttonGradient: "from-amber-500 via-yellow-400 to-amber-600 text-[#0b1739] font-black hover:shadow-[0_0_25px_rgba(245,158,11,0.9)]",
    features: [
      "متجر متكامل متعدد المنتجات مع لوحة تحكم إدارية (Dashboard)",
      "إرسال فواتير وإشعارات أوتوماتيكية للزبائن",
      "دعم متعدد اللغات والعملات للأسواق الدولية",
      "سرعة تحميل فائقة وتوافق تام 100% مع جميع الأجهزة",
      "ربط بوابات الدفع العالمية: Stripe / PayPal / COD / تحويل بنكي",
      "استخدام النظام مدى الحياة",
    ],
  },
];

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [activeMarket, setActiveMarket] = useState<"local" | "international">("local");
  const activePlans = activeMarket === "local" ? LOCAL_PLANS : INTERNATIONAL_PLANS;

  return (
    <section id="services" className="w-full py-4 md:py-6 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="flex items-center">
            <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#2563eb] rounded-full" />
            <span className="w-2 h-2 rounded-full bg-[#2563eb] -mr-1" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black text-[#1d4ed8] tracking-tight px-3 drop-shadow-xs flex items-center gap-2">
            <span>خدماتنا المميزة</span>
            <Sparkles className="w-6 h-6 text-[#2563eb] animate-pulse" />
          </h2>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] -ml-1" />
            <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#2563eb] rounded-full" />
          </div>
        </div>

        {/* ── Market Tab Toggle ─────────────────────────────────────── */}
        <div className="flex items-center justify-center mb-7">
          <div className="relative flex bg-white/70 backdrop-blur-xl border border-blue-200/60 rounded-2xl p-1.5 shadow-[0_4px_24px_rgba(37,99,235,0.13)] gap-1">
            {/* Animated sliding background */}
            <span
              aria-hidden="true"
              className={`absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r transition-all duration-300 ease-out shadow-[0_2px_12px_rgba(37,99,235,0.25)] ${
                activeMarket === "local"
                  ? "left-1.5 right-[calc(50%+2px)] from-blue-600 via-indigo-600 to-blue-700"
                  : "left-[calc(50%+2px)] right-1.5 from-emerald-500 via-teal-500 to-cyan-600"
              }`}
            />
            <button
              onClick={() => setActiveMarket("local")}
              className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-black transition-colors duration-200 cursor-pointer select-none ${
                activeMarket === "local" ? "text-white" : "text-[#1e3a8a] hover:text-blue-700"
              }`}
            >
              <span className="text-lg leading-none">🇲🇦</span>
              <span>السوق المحلي (المغرب)</span>
            </button>
            <button
              onClick={() => setActiveMarket("international")}
              className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-black transition-colors duration-200 cursor-pointer select-none ${
                activeMarket === "international" ? "text-white" : "text-[#1e3a8a] hover:text-emerald-700"
              }`}
            >
              <span className="text-lg leading-none">🌐</span>
              <span>السوق الدولي (US/CA/AU)</span>
            </button>
          </div>
        </div>

        {/* ── Plan Cards Grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7 items-stretch max-w-4xl mx-auto">
          {activePlans.map((plan) => {
            const BadgeIcon = plan.badge.icon;
            return (
              <div
                key={plan.id}
                className={`relative group rounded-[32px] overflow-hidden backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${plan.cardBorder} ${plan.cardGlow} ${plan.cardBg}`}
              >
                {/* Image + Badge area */}
                <div className="relative w-full">
                  {/* Floating Luxury Badge */}
                  <div className={`absolute top-3.5 right-3.5 z-20 px-3.5 py-1.5 rounded-full bg-gradient-to-r ${plan.badge.gradient} ${plan.badge.shadow} ${plan.badge.textColor} flex items-center gap-1.5 text-xs font-black border border-white/25`}>
                    <span>{plan.badge.text}</span>
                    <BadgeIcon className="w-3.5 h-3.5" />
                  </div>
                  {/* Market label */}
                  <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-[11px] font-bold text-white">
                    {plan.market}
                  </div>
                  {/* Card image */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-[30px] bg-slate-900/10">
                    <Image src={plan.image} alt={plan.name} fill priority className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-[22px] font-black text-[#0b1739] mb-1 leading-snug">{plan.name}</h3>
                    <p className="text-xs sm:text-[13px] text-[#475569] font-medium mb-4 leading-relaxed">{plan.subtitle}</p>
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

                  {/* Bottom: Price (strikethrough + discount) + Order Button */}
                  <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between gap-3">
                    {/* Price block */}
                    <div className="flex flex-col items-start shrink-0 gap-0.5">
                      <span className="text-[11px] text-slate-400 line-through font-semibold leading-none px-1">
                        {plan.originalPrice}
                      </span>
                      <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${plan.priceGradient} text-sm sm:text-base font-black flex items-center justify-center`}>
                        <span>{plan.discountPrice}</span>
                      </div>
                    </div>
                    {/* Order button */}
                    <button
                      onClick={() => onSelectPlan(plan.planTier, plan.priceValue)}
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
