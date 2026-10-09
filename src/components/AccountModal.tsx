"use client";

import React, { useState } from "react";
import { X, User, ShieldCheck, Clock, CheckCircle2, Phone, Mail, ArrowLeft, Lock } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal?: () => void;
}

export default function AccountModal({ isOpen, onClose, onOpenOrderModal }: AccountModalProps) {
  const [activeTab, setActiveTab] = useState<"track" | "login">("track");
  const [orderQuery, setOrderQuery] = useState("");
  const [trackingResult, setTrackingResult] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setTrackingResult(true);
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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
              <User className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0a193c]">
                بوابة العملاء والمستثمرين
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                ECOM SPEED PRO • مركز إدارة ومتابعة المشاريع
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

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl my-3 text-xs font-black">
          <button
            onClick={() => {
              setActiveTab("track");
              setTrackingResult(null);
            }}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "track"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            تتبع حالة إطلاق المتجر (Live Tracker)
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "login"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            تسجيل دخول العملاء
          </button>
        </div>

        {/* Tab 1: Live Project Tracker */}
        {activeTab === "track" && (
          <div className="py-2 space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              أدخل رقم هاتفك أو بريدك الإلكتروني المعتمد عند الطلب لمتابعة مراحل تجهيز وبرمجة متجرك في الوقت الفعلي:
            </p>

            <form onSubmit={handleTrack} className="flex gap-2">
              <input
                type="text"
                placeholder="رقم الهاتف أو البريد الإلكتروني..."
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs outline-none font-bold"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                تتبع الآن
              </button>
            </form>

            {/* Simulated Live Order Status */}
            {trackingResult && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-900">
                    مشروع: متجر إلكتروني فائق السرعة
                  </span>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    قيد التجهيز النهائي (85%)
                  </span>
                </div>

                <div className="space-y-2 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>تم حجز الاستضافة وضبط شهادات SSL 256-Bit</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>تم بناء الهوية البصرية وتصميم الواجهات العصرية</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0 animate-spin" />
                    <span>ربط بوابات الدفع الإلكتروني وفحص سرعة التحميل 100%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>المستشار المباشر: مهندس حمزة</span>
                  <a
                    href="https://wa.me/212762357491"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 font-black hover:underline flex items-center gap-1"
                  >
                    <WhatsAppIcon size={14} />
                    <span>محادثة المستشار</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Client Login */}
        {activeTab === "login" && (
          <div className="py-2 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                البريد الإلكتروني أو اسم المستخدم:
              </label>
              <input
                type="email"
                placeholder="name@domain.com"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2 text-xs outline-none font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                كلمة المرور المشفرة:
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2 text-xs outline-none font-bold"
              />
            </div>

            <button
              onClick={() => {
                alert("سيتم إرسال رابط تسجيل الدخول المشفر إلى هاتفك أو بريدك.");
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              تسجيل الدخول إلى لوحة التحكم
            </button>

            <p className="text-[11px] text-center text-slate-500 font-bold">
              هل أنت عميل جديد؟{" "}
              <button
                onClick={() => {
                  onClose();
                  onOpenOrderModal?.();
                }}
                className="text-blue-600 underline font-black cursor-pointer"
              >
                اختر باقتك وابدأ الآن
              </button>
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
          <div className="flex items-center gap-1 text-emerald-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>نظام بيانات مشفر وآمن 100%</span>
          </div>
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
