"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Search, Sparkles, ArrowLeft, Check, Layers, Zap, Flame, Crown } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onSelectPlan?: (plan: string, price: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  query,
  onSelectPlan,
}: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState(query || "");

  const allServices = [
    {
      id: "landing",
      name: "صفحة الهبوط السريعة (Landing Page)",
      category: "خدمات تصميم وتطوير المتاجر",
      price: "500 درهم",
      badge: "الأكثر طلباً 🔥",
      desc: "صفحة هبوط مخصصة لمنتج رابح بمعدل تحويل مرتفع وسرعة خارقة",
      image: "/images/card_landing_new.png",
    },
    {
      id: "standard",
      name: "المتجر القياسي متعدد المنتجات (Standard Store)",
      category: "خدمات تصميم وتطوير المتاجر",
      price: "1500 درهم",
      badge: "الأكثر مبيعاً ⚡",
      desc: "متجر متكامل لعرض منتجاتك وتتبع المبيعات والطلبات بكل سلاسة",
      image: "/images/card_standard_new.png",
    },
    {
      id: "saas",
      name: "منصة التجارة المتقدمة (Advanced SaaS)",
      category: "حلول تقنية وبرمجية مخصصة",
      price: "5000 درهم",
      badge: "VIP الخيار الأقوى 👑",
      desc: "منصة تجارة إلكترونية متطورة مع لوحة تحكم، أتمتة كاملة، وربط بوابات دفع",
      image: "/images/card_saas_new.png",
    },
    {
      id: "templates",
      name: "قوالب التجارة الإلكترونية فائقة السرعة",
      category: "منتجات وقوالب رقمية",
      price: "مضمنة مجاناً",
      badge: "ميزة حصرية ✨",
      desc: "تصاميم عصرية جاهزة ومتوافقة بنسبة 100% مع الهواتف الذكية",
      image: "/images/hero_cutout_master.png",
    },
    {
      id: "payment",
      name: "ربط وتفعيل بوابات الدفع الإلكتروني (YouCan Pay & CMI)",
      category: "بوابات الدفع والتشفير",
      price: "مجاناً مع الباقات",
      badge: "أمان بنكي 100% 🛡️",
      desc: "تفعيل فوري لبطاقات فيزا، ماستركارد، وبطاقات الدفع المغربية مع حماية SSL",
      image: "/images/card_saas_new.png",
    },
  ];

  if (!isOpen) return null;

  const filtered = allServices.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white/95 rounded-3xl shadow-[0_25px_60px_rgba(2,8,28,0.35)] border border-blue-200 p-6 overflow-hidden flex flex-col max-h-[90vh]"
        dir="rtl"
      >
        {/* Search Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0a193c]">
                البحث السريع في الخدمات والمنتجات
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                ابحث عن باقات التصميم، قوالب المتاجر، أو حلول البرمجة والدفع
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input bar */}
        <div className="relative my-3">
          <input
            type="text"
            placeholder="ابحث بالاسم، السعر، أو نوع المتجر..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl pr-4 pl-10 py-3 text-sm outline-none font-bold"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Results */}
        <div className="py-2 overflow-y-auto space-y-2.5 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xs text-slate-500 font-bold">
                لم يتم العثور على نتائج مطابقة لـ &quot;{searchTerm}&quot;
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-3 text-xs text-blue-600 font-black underline cursor-pointer"
              >
                عرض جميع الخدمات والمنتجات المتاحة
              </button>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-blue-50/50 hover:bg-blue-50 border border-blue-100 hover:border-blue-300 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="relative w-14 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {item.category}
                    </span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    {item.name}
                  </h5>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <div className="text-left shrink-0">
                  <span className="text-xs font-black text-blue-700 font-mono block mb-1.5">
                    {item.price}
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectPlan?.(item.name, item.price);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] flex items-center gap-1 shadow-sm transition-all hover:scale-105 cursor-pointer"
                  >
                    <span>طلب الخدمة</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
          <span>نتائج البحث المباشرة • ECOM SPEED PRO</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
