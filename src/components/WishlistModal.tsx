"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Heart, Sparkles, ArrowLeft, Trash2, CheckCircle2 } from "lucide-react";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal?: (plan?: string, price?: string) => void;
}

export default function WishlistModal({
  isOpen,
  onClose,
  onOpenOrderModal,
}: WishlistModalProps) {
  const [items, setItems] = useState([
    {
      id: "saas",
      name: "منصة التجارة المتقدمة (Advanced SaaS)",
      price: "5000 درهم",
      badge: "VIP الخيار الأقوى 👑",
      desc: "نظام متكامل بلوحة تحكم، ربط الدفع الإلكتروني، وتطبيق ويب فائق السرعة",
      image: "/images/card_saas_new.png",
    },
    {
      id: "standard",
      name: "المتجر القياسي متعدد المنتجات (Standard Store)",
      price: "1500 درهم",
      badge: "الأكثر مبيعاً ⚡",
      desc: "متجر احترافي لعرض وإدارة كافة المنتجات وتتبع المبيعات",
      image: "/images/card_standard_new.png",
    },
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white/95 rounded-3xl shadow-[0_25px_60px_rgba(2,8,28,0.35)] border border-pink-200 p-6 overflow-hidden flex flex-col max-h-[90vh]"
        dir="rtl"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0a193c]">
                المشاريع والباقات المفضلة
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                الباقات المحفوظة لمراجعتها والبدء بها في أي وقت
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

        {/* List */}
        <div className="py-4 overflow-y-auto space-y-3 flex-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100/80 hover:border-pink-300 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-14 rounded-xl overflow-hidden shrink-0 border border-pink-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-rose-600 bg-white px-2 py-0.5 rounded-md border border-rose-100 inline-block mb-1">
                    {item.badge}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900">
                    {item.name}
                  </h5>
                  <span className="text-xs font-black text-pink-700 font-mono mt-0.5 block">
                    {item.price}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => {
                    onClose();
                    onOpenOrderModal?.(item.name, item.price);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 cursor-pointer"
                >
                  <span>اطلب الآن</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    setItems((prev) => prev.filter((i) => i.id !== item.id))
                  }
                  className="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition-colors cursor-pointer"
                  title="إزالة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-bold">
            احفظ عروضك الحالية مع الضمان الذهبي لاسترجاع الأموال 🛡️
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
