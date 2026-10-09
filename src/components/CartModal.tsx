"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ShoppingBag, Trash2, ArrowLeft, ShieldCheck, Sparkles, Check, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface CartItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  badge: string;
  image: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal?: (plan?: string, price?: string) => void;
}

export default function CartModal({
  isOpen,
  onClose,
  onOpenOrderModal,
}: CartModalProps) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "standard",
      name: "المتجر القياسي متعدد المنتجات (Standard Store)",
      price: "1500 درهم",
      priceNum: 1500,
      badge: "الأكثر مبيعاً ⚡",
      image: "/images/card_standard_new.png",
    },
  ]);

  if (!isOpen) return null;

  const total = items.reduce((acc, curr) => acc + curr.priceNum, 0);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addPlan = (plan: CartItem) => {
    if (!items.find((i) => i.id === plan.id)) {
      setItems((prev) => [...prev, plan]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white/95 rounded-3xl shadow-[0_25px_60px_rgba(2,8,28,0.35)] border border-blue-200 p-6 overflow-hidden flex flex-col max-h-[90vh]"
        dir="rtl"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0a193c]">
                سلة المشتريات والطلبات
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                {items.length > 0 ? `${items.length} باقة مختارة للبدء الفوري` : "سلتك فارغة حالياً"}
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

        {/* Cart Items List */}
        <div className="py-4 overflow-y-auto space-y-3 flex-1">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 mx-auto flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">سلتك فارغة</h4>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                اختر الباقة المناسبة لمشروعك وابدأ رحلتك الآن
              </p>
              <button
                onClick={() => {
                  addPlan({
                    id: "landing",
                    name: "صفحة الهبوط السريعة (Landing Page)",
                    price: "500 درهم",
                    priceNum: 500,
                    badge: "الأكثر طلباً 🔥",
                    image: "/images/card_landing_new.png",
                  });
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black shadow-md hover:bg-blue-700 transition-colors"
              >
                + إضافة باقة صفحة الهبوط (500 درهم)
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between gap-3 shadow-xs hover:border-blue-300 transition-colors"
              >
                <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-right">
                  <span className="text-[10px] font-black text-blue-600 bg-white px-2 py-0.5 rounded-md border border-blue-100 inline-block mb-1">
                    {item.badge}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {item.name}
                  </h5>
                  <span className="text-xs font-black text-blue-700 font-mono mt-0.5 block">
                    {item.price}
                  </span>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}

          {/* Guaranteed Free Inclusions */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs font-bold text-emerald-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-black text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>هدايا ومزايا مجانية مرفقة مع كل باقة:</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-700">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>ربط بوابات الدفع الإلكتروني بالمغرب مجاناً</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-700">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>شهادة أمان بنكية SSL 256-Bit مجانية مدى الحياة</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-700">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>دعم فني استشاري ومتابعة خطوة بخطوة</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-sm font-black text-slate-900">
            <span>المجموع النهائي:</span>
            <span className="text-lg font-mono text-blue-700 font-black">
              {total} درهم
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                onClose();
                const selected = items[0] || {
                  name: "المتجر القياسي متعدد المنتجات",
                  price: "1500 درهم",
                };
                onOpenOrderModal?.(selected.name, selected.price);
              }}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <span>متابعة الشراء والدفع</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/212762357491?text=${encodeURIComponent(
                `مرحباً Ecom Speed Pro، أريد إتمام طلبي عبر واتساب: ${
                  items[0]?.name || "باقة المتجر الإلكتروني"
                } بسعر ${total} درهم`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <WhatsAppIcon size={18} />
              <span>إتمام عبر واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
