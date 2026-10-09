"use client";

import React from "react";
import { X, Sparkles, Check, ShoppingCart, ArrowDown, Zap, ShieldCheck, Crown } from "lucide-react";

interface PackageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: string, price: string) => void;
}

export default function PackageSelectModal({
  isOpen,
  onClose,
  onSelectPlan,
}: PackageSelectModalProps) {
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

  const handlePick = (plan: string, price: string) => {
    onClose();
    onSelectPlan(plan, price);
  };

  const packages = [
    {
      id: "landing",
      name: "صفحة الهبوط السريعة",
      subtitle: "High-Converting Landing",
      price: "500 درهم",
      badge: "الأكثر طلباً 🔥",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      icon: Zap,
      iconColor: "text-amber-500 bg-amber-50",
      popular: false,
      features: [
        "تصميم احترافي سريع مخصص لمنتج واحد",
        "نسب تحويل مضاعفة وتوافق جوال 100%",
        "ربط بكسل تيك توك، سناب شات وفيسبوك",
        "استضافة مجانية ودومين خاص متضمن",
        "تسليم قياسي في أقل من 24 ساعة",
      ],
      btnText: "اطلب باقة صفحة الهبوط",
      btnClass: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg",
    },
    {
      id: "standard",
      name: "المتجر القياسي متعدد المنتجات",
      subtitle: "Standard Multi-Product Store",
      price: "1500 درهم",
      badge: "الأكثر مبيعاً ⭐",
      badgeColor: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent",
      icon: ShieldCheck,
      iconColor: "text-blue-600 bg-blue-50",
      popular: true,
      features: [
        "متجر إلكتروني شامل لعدد غير محدود من المنتجات",
        "ربط بوابات الدفع CMI و YouCan Pay بأمان بنكي",
        "لوحة تحكم إدارية باللغتين العربية والفرنسية",
        "تصميم متجاوب فائق السرعة متوافق مع الحواسيب والهواتف",
        "دعم فني وتدريب مجاني متواصل لمدة شهر",
      ],
      btnText: "اطلب باقة المتجر القياسي",
      btnClass: "bg-gradient-to-r from-[#00c8ff] via-[#3a86ff] to-[#8338ec] text-white shadow-[0_0_20px_rgba(58,134,255,0.45)] hover:shadow-[0_0_28px_rgba(58,134,255,0.7)] hover:scale-[1.02]",
    },
    {
      id: "saas",
      name: "منصة التجارة المتقدمة SaaS",
      subtitle: "Advanced Enterprise Platform",
      price: "5000 درهم",
      badge: "باقة كبار الأعمال VIP 💎",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      icon: Crown,
      iconColor: "text-purple-600 bg-purple-50",
      popular: false,
      features: [
        "منصة برمجية سحابية متقدمة بأعلى معايير الأداء",
        "أتمتة كاملة مع شركات الشحن والتوصيل الوطنية",
        "إدارة مخازن متقدمة ونظام فواتير ذكي",
        "استشارات واستراتيجية تسويقية متكاملة مجاناً",
        "سيرفرات فائقة السرعة ودعم VIP خاص 24/7",
      ],
      btnText: "اطلب باقة المنصة المتقدمة VIP",
      btnClass: "bg-gradient-to-r from-[#0b1739] via-[#1e293b] to-[#334155] hover:bg-slate-900 text-white shadow-md hover:shadow-lg",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#070f26]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl my-auto bg-gradient-to-b from-white via-[#f8fafc] to-[#edf4fd] rounded-[28px] sm:rounded-[36px] border border-blue-200/80 shadow-[0_25px_80px_rgba(15,23,42,0.35)] p-5 sm:p-8 md:p-10 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all duration-200 hover:rotate-90 shadow-sm"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs sm:text-sm font-black mb-3 shadow-inner">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>اختر الباقة المناسبة لمشروعك وابدأ الآن</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1739] tracking-tight mb-3">
            باقات إطلاق المتاجر الإلكترونية
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
            اختر إحدى الباقات الاحترافية الثلاث أدناه للطلب المباشر، أو تصفح مقارنة الباقات بالتفصيل
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 transition-all duration-300 ${
                  pkg.popular
                    ? "bg-white border-2 border-blue-500 shadow-[0_15px_40px_rgba(37,99,235,0.18)] scale-[1.02] ring-4 ring-blue-400/10"
                    : "bg-white/80 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300"
                }`}
              >
                {/* Popular Pill Tag */}
                {pkg.popular && (
                  <div className="absolute -top-3.5 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-black tracking-wider uppercase shadow-md">
                    الباقة الموصى بها ⭐
                  </div>
                )}

                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${pkg.iconColor} shadow-inner`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-black border ${pkg.badgeColor}`}>
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold mb-4">
                    {pkg.subtitle}
                  </p>

                  {/* Price Tag */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 mb-5 border border-slate-100 flex items-baseline justify-between">
                    <span className="text-xs text-slate-500 font-bold">السعر الإجمالي:</span>
                    <span className="text-2xl font-black text-blue-600 tracking-tight">
                      {pkg.price}
                    </span>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2.5 mb-6 text-right">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-bold leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Button */}
                <button
                  onClick={() => handlePick(pkg.name, pkg.price)}
                  className={`w-full py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer ${pkg.btnClass}`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{pkg.btnText}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal Bottom: Option to Explore and compare in services section */}
        <div className="mt-8 pt-6 border-t border-slate-200/70 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-500 font-bold">
            هل ترغب في استعراض مقارنة تفصيلية لجميع الميزات والضمانات؟
          </p>

          <button
            onClick={scrollToServices}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-xs sm:text-sm text-blue-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>استعراض مقارنة الباقات في الصفحة</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
