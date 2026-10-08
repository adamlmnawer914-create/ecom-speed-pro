"use client";

import React, { useState } from "react";
import { X, ShoppingCart, CheckCircle, MessageSquareCode } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  selectedPrice: string;
}

export default function OrderModal({
  isOpen,
  onClose,
  selectedPlan,
  selectedPrice,
}: OrderModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `مرحباً وكالة Ecom Speed Pro 🚀%0Aأرغب في طلب خدمة: *${encodeURIComponent(
      selectedPlan
    )}* (%20${encodeURIComponent(selectedPrice)}%20)%0A%0A*الاسم:* ${encodeURIComponent(
      name
    )}%0A*رقم الهاتف:* ${encodeURIComponent(
      phone
    )}%0A*ملاحظات:* ${encodeURIComponent(notes || "لا توجد")}`;

    const whatsappUrl = `https://wa.me/212762357491?text=${message}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      onClose();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden text-right">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute left-4 top-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <ShoppingCart className="w-5 h-5 text-cyan-300" />
            <h3 className="text-xl font-black">طلب خدمة جديدة</h3>
          </div>
          <p className="text-xs text-blue-100">
            أنت على بعد خطوة واحدة من بدء مشروعك الاحترافي مع فريق Ecom Speed Pro
          </p>
        </div>

        {/* Selected Plan Bar */}
        <div className="p-4 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500">الباقة المختارة:</span>
            <span className="text-sm font-black text-blue-900">{selectedPlan}</span>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-sm">
            {selectedPrice}
          </div>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce mb-3" />
            <h4 className="text-lg font-black text-[#0c1e4e]">تم تسجيل طلبك بنجاح!</h4>
            <p className="text-xs text-slate-500 mt-1">جاري تحويلك لمحادثة واتساب المباشرة...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                الاسم الكامل <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="أدخل اسمك الكريم"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                رقم الهاتف / واتساب <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="06XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 text-left"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                فكرة المتجر أو رابط منتجك (اختياري)
              </label>
              <textarea
                rows={3}
                placeholder="مثلاً: متجر لبيع الملابس أو الأحذية، أو استفسار محدد..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-black text-white text-sm bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-98"
            >
              <MessageSquareCode className="w-5 h-5" />
              <span>تأكيد الطلب والتواصل عبر واتساب فوراً</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
