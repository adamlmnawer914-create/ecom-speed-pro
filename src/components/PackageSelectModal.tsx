"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Sparkles, Check, ShoppingCart, ArrowDown, Flame, Zap, Crown } from "lucide-react";

interface PackageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planName: string, price: string) => void;
}

export default function PackageSelectModal({
  isOpen,
  onClose,
  onSelectPlan,
}: PackageSelectModalProps) {
  // Prevent background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const scrollToServices = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      if (typeof window !== "undefined" && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }, 150);
  };

  const handlePick = (planName: string, price: string) => {
    onClose();
    setTimeout(() => {
      onSelectPlan(planName, price);
    }, 150);
  };

  // Exact 3 Plans matching PricingSection.tsx on the Home Page
  const plans = [
    {
      id: "landing",
      name: "صفحة الهبوط (Landing Page)",
      subtitle: "تصميم مخصص لتحقيق أعلى معدل تحويل لمنتج رابح",
      price: "500 درهم",
      image: "/images/card_landing_new.webp",
      badge: {
        text: "الأكثر طلباً",
        icon: Flame,
        gradient: "from-red-600 via-rose-500 to-purple-600",
        shadow: "shadow-[0_0_20px_rgba(239,68,68,0.7)]",
      },
      cardBorder: "border-2 border-fuchsia-400/50 hover:border-fuchsia-400",
      cardGlow: "shadow-[0_12px_40px_rgba(217,70,239,0.22)] hover:shadow-[0_18px_50px_rgba(217,70,239,0.38)]",
      cardBg: "bg-white/95 hover:bg-white",
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
      image: "/images/card_standard_new.webp",
      badge: {
        text: "الأكثر مبيعاً",
        icon: Zap,
        gradient: "from-cyan-500 via-blue-500 to-indigo-600",
        shadow: "shadow-[0_0_20px_rgba(6,182,212,0.7)]",
      },
      cardBorder: "border-2 border-cyan-400/50 hover:border-cyan-300",
      cardGlow: "shadow-[0_12px_40px_rgba(6,182,212,0.22)] hover:shadow-[0_18px_50px_rgba(6,182,212,0.38)]",
      cardBg: "bg-white/95 hover:bg-white",
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
      image: "/images/card_saas_new.webp",
      badge: {
        text: "الخيار الأقوى",
        icon: Crown,
        gradient: "from-amber-400 via-yellow-300 to-amber-500",
        shadow: "shadow-[0_0_22px_rgba(245,158,11,0.85)]",
      },
      cardBorder: "border-2 border-amber-400/60 hover:border-amber-300",
      cardGlow: "shadow-[0_12px_45px_rgba(245,158,11,0.32)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.52)]",
      cardBg: "bg-white/95 hover:bg-white",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#070f26]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog with Full Vertical Scroll Support */}
      <div className="relative w-full max-w-6xl my-auto max-h-[92vh] flex flex-col bg-gradient-to-b from-white via-[#f8fafc] to-[#edf4fd] rounded-[28px] sm:rounded-[36px] border border-blue-200/90 shadow-[0_25px_80px_rgba(15,23,42,0.4)] z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Sticky Header with Close Button */}
        <div className="relative px-5 sm:px-8 pt-5 sm:pt-6 pb-3 border-b border-blue-100/80 bg-white/80 backdrop-blur-md flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
            <h2 className="text-lg sm:text-2xl font-black text-[#0b1739] tracking-tight flex items-center gap-2">
              <span>اختر باقتك للبدء الفوري</span>
              <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all duration-200 hover:rotate-90 shadow-sm cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          
          {/* Subtitle Banner */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs sm:text-[15px] text-slate-600 font-bold leading-relaxed">
              اختر إحدى الباقات الاحترافية الثلاث أدناه للانتقال المباشر إلى إتمام طلبك وتحديد وسيلة الدفع المناسبة:
            </p>
          </div>

          {/* ======================================================== */}
          {/* 3 Rectangular Luxury Cards in ONE ROW (Exact replica)    */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {plans.map((plan) => {
              const BadgeIcon = plan.badge.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative group rounded-[28px] overflow-hidden backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between shadow-md ${plan.cardBorder} ${plan.cardGlow} ${plan.cardBg}`}
                >
                  {/* Upper Area: Floating Luxury Badge + 16:9 Rectangular Image */}
                  <div className="relative w-full">
                    {/* Floating Luxury Badge */}
                    <div
                      className={`absolute top-3.5 right-3.5 z-20 px-3.5 py-1.5 rounded-full bg-gradient-to-r ${plan.badge.gradient} ${plan.badge.shadow} flex items-center gap-1.5 text-xs font-black text-white border border-white/25`}
                    >
                      <span>{plan.badge.text}</span>
                      <BadgeIcon className="w-3.5 h-3.5" />
                    </div>

                    {/* 16:9 High-Res Rectangular Artwork */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-[26px] bg-slate-900/10">
                      <Image
                        src={plan.image}
                        alt={plan.name}
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Content Body: Title, Subtitle, Features */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Plan Title */}
                      <h3 className="text-lg sm:text-[20px] font-black text-[#0b1739] mb-1 leading-snug">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-[#475569] font-medium mb-3.5 leading-relaxed">
                        {plan.subtitle}
                      </p>

                      {/* Features List */}
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-[#1e293b] font-bold leading-relaxed">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.checkBg}`}>
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Action Area: Price Capsule + Order CTA Button */}
                    <div className="pt-3.5 border-t border-slate-200/70 flex items-center justify-between gap-2.5">
                      {/* Price Capsule */}
                      <div className={`px-3.5 py-1.5 rounded-full bg-gradient-to-r ${plan.priceGradient} text-xs sm:text-sm font-black flex items-center justify-center shrink-0`}>
                        <span>{plan.price}</span>
                      </div>

                      {/* Order Button */}
                      <button
                        onClick={() => handlePick(plan.name, plan.price)}
                        className={`flex-1 py-2 px-3 rounded-full bg-gradient-to-r ${plan.buttonGradient} text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>الطلب الآن</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal Bottom: Option to Explore and compare in services section */}
          <div className="pt-4 border-t border-slate-200/70 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-slate-600 font-bold">
              هل ترغب في استعراض تفاصيل أكثر على الصفحة الرئيسية؟
            </p>

            <button
              onClick={scrollToServices}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-black text-xs sm:text-sm text-blue-700 bg-blue-50/90 hover:bg-blue-100 border border-blue-200 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            >
              <span>استعراض مقارنة الباقات في الصفحة</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
