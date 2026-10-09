"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ShoppingCart, Check, ArrowLeft, Layers, Smartphone, Gauge, ShieldCheck } from "lucide-react";

interface ProductsSectionProps {
  onSelectPlan: (plan: string, price: string) => void;
}

export default function ProductsSection({ onSelectPlan }: ProductsSectionProps) {
  const products = [
    {
      id: "prod-1",
      title: "قوالب التجارة الإلكترونية عالية التحويل",
      badge: "تصميم 2026 فائق الفخامة",
      desc: "حزم قوالب جاهزة ومجهزة لأسرع تجربة مستخدم في المغرب والخليج، متوافقة كلياً مع جميع قياسات الهواتف.",
      features: [
        "سرعة تحميل قياسية أقل من 1.5 ثانية",
        "تنسيقات مخصصة لمنتجات التجميل، الملابس، والإلكترونيات",
        "صفحات هبوط مدمجة بنظام نقرة واحدة (1-Click Checkout)",
      ],
      price: "مضمن مجاناً مع الباقات",
      buttonText: "معاينة وطلب القالب",
      planName: "قوالب التجارة الإلكترونية فائقة السرعة",
      planPrice: "500 درهم",
    },
    {
      id: "prod-2",
      title: "نظام إدارة وتتبع المخزون والفواتير الذكية",
      badge: "أتمتة متطورة SaaS",
      desc: "لوحة تحكم مركزية لإدارة المنتجات، إصدار الفواتير الآلية، وربطها مع شركات الشحن والتوصيل بالمغرب.",
      features: [
        "إشعارات تلقائية للطلبات الجديدة عبر الواتساب والإيميل",
        "تتبع دقيق للمخزون ومنع نفاد المنتجات الرابحة",
        "ربط كامل ببوابات YouCan Pay و CMI للدفع البنكي",
      ],
      price: "مضمن مع باقة SaaS",
      buttonText: "طلب تفعيل النظام",
      planName: "منصة التجارة المتقدمة (Advanced SaaS)",
      planPrice: "5000 درهم",
    },
  ];

  return (
    <section id="products" className="w-full py-8 md:py-12 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center">
            <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#2563eb] rounded-full"></span>
            <span className="w-2 h-2 rounded-full bg-[#2563eb] -mr-1"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black text-[#1d4ed8] tracking-tight px-3 drop-shadow-xs flex items-center gap-2">
            <span>المنتجات والحلول الرقمية</span>
            <Layers className="w-6 h-6 text-[#2563eb]" />
          </h2>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] -ml-1"></span>
            <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#2563eb] rounded-full"></span>
          </div>
        </div>

        {/* 2 Featured Products Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="relative rounded-3xl bg-white/95 backdrop-blur-md border border-blue-200/90 p-6 sm:p-8 shadow-[0_10px_35px_rgba(37,99,235,0.08)] hover:shadow-[0_15px_45px_rgba(37,99,235,0.18)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black">
                    {prod.badge}
                  </span>
                  <span className="text-xs font-mono font-black text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-lg">
                    {prod.price}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-[#0a193c] mb-2 group-hover:text-blue-600 transition-colors">
                  {prod.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed mb-5">
                  {prod.desc}
                </p>

                <div className="space-y-2.5 mb-6">
                  {prod.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPlan(prod.planName, prod.planPrice)}
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group-hover:scale-[1.01]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{prod.buttonText}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
