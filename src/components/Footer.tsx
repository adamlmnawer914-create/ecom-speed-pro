"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  ChevronLeft,
  ShieldCheck,
  CreditCard,
  Lock,
  Check,
  Copy,
  Sparkles,
  Gift,
  Clock,
  Award,
  FileText,
  Shield,
  HelpCircle,
} from "lucide-react";
import Logo from "@/components/Logo";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface FooterProps {
  onOpenOrderModal?: (plan?: string, price?: string) => void;
  onOpenPolicyModal?: (type: "privacy" | "terms" | "guarantee") => void;
}

export default function Footer({
  onOpenOrderModal,
  onOpenPolicyModal,
}: FooterProps) {
  const WHATSAPP_NUMBER = "+212 7 62 35 74 91";
  const WHATSAPP_LINK =
    "https://wa.me/212762357491?text=مرحباً%20Ecom%20Speed%20Pro%20أريد%20الاستفسار%20عن%20خدماتكم%20وبدء%20المشروع";
  const PHONE_LINK = "tel:+212762357491";
  const EMAIL_LINK = "mailto:support@ecomspeedpro.com";
  const FACEBOOK_LINK = "https://facebook.com/ecomspeedpro";

  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  return (
    <footer className="w-full mt-12 relative z-20 overflow-hidden pb-8 pt-4">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">

        {/* ======================================================== */}
        {/* 1. VIP PROMO CTA BANNER (ابدأ مشروعك الآن مع ECOM SPEED PRO) */}
        {/* ======================================================== */}
        <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#061230] via-[#0b1f54] to-[#071333] border border-blue-500/30 p-5 sm:p-7 shadow-[0_12px_45px_rgba(11,31,84,0.35)] overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Right side in RTL: Gift / Rocket 3D icon + Headline */}
            <div className="flex items-center gap-4 sm:gap-5 text-right w-full lg:w-auto">
              <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-[2px] shadow-[0_0_25px_rgba(59,130,246,0.6)] animate-pulse">
                <div className="w-full h-full bg-[#08173d] rounded-2xl flex items-center justify-center">
                  <Gift className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-300" />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-black mb-1.5 shadow-inner">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>انطلاقة سريعة ومضمونة لمتجرك</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                  ابدأ مشروعك الآن مع{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400">
                    ECOM SPEED PRO
                  </span>
                </h3>
                <p className="text-blue-200/80 text-xs sm:text-sm font-semibold mt-1">
                  خطوتك الأولى نحو النجاح الرقمي ومضاعفة أرباحك مع تسليم قياسي ودعم فني متواصل
                </p>
              </div>
            </div>

            {/* Left side in RTL: Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-center lg:justify-end">
              <button
                onClick={() =>
                  onOpenOrderModal?.("استشارة مجانية وبدء المشروع", "مجاناً")
                }
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#00b4d8] via-[#3a86ff] to-[#7209b7] text-white font-black text-xs sm:text-sm shadow-[0_0_22px_rgba(58,134,255,0.6)] hover:shadow-[0_0_32px_rgba(58,134,255,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>اكتشف جميع الخدمات واستشرنا مجاناً</span>
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
              >
                <WhatsAppIcon size={20} />
                <span>واتساب فوري</span>
              </a>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. LUXURY 3D CONTACT & SUPPORT SUITE (قنوات التواصل المباشرة) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: WhatsApp VIP Chat + Facebook Integration */}
          <div className="relative rounded-3xl bg-white/95 backdrop-blur-md border border-emerald-200/90 p-5 sm:p-6 shadow-[0_8px_30px_rgba(16,185,129,0.12)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.22)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-2.5 flex items-center justify-center shadow-[0_6px_20px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform">
                    <WhatsAppIcon size={32} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                      <span>رد فوري خلال دقائق</span>
                    </div>
                    <h4 className="font-black text-[#0a193c] text-base sm:text-lg">
                      محادثة واتساب الرسمية
                    </h4>
                  </div>
                </div>

                {/* Luxury Facebook Action Button */}
                <a
                  href={FACEBOOK_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-2xl bg-gradient-to-br from-[#1877F2]/10 to-[#1877F2]/20 hover:from-[#1877F2] hover:to-[#0d65d9] text-[#1877F2] hover:text-white border border-[#1877F2]/30 shadow-sm transition-all duration-300 hover:scale-110 flex items-center justify-center group/fb"
                  title="تابع صفحتنا الرسمية على فيسبوك"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>

              <div className="my-2 bg-emerald-50/70 rounded-2xl p-3 border border-emerald-100/80 flex items-center justify-between">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold block">الرقم المعتمد:</span>
                  <span dir="ltr" className="text-sm sm:text-base font-black text-emerald-900 tracking-wide font-mono">
                    {WHATSAPP_NUMBER}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(WHATSAPP_NUMBER, "whatsapp")}
                  className="p-2 rounded-xl bg-white hover:bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm transition-colors text-xs flex items-center gap-1 font-bold cursor-pointer"
                  title="نسخ الرقم"
                >
                  {copiedType === "whatsapp" ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-[10px]">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-[10px]">نسخ</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm flex items-center justify-between shadow-[0_4px_15px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_22px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <WhatsAppIcon size={18} />
                  <span>بدء المحادثة الآن</span>
                </div>
                <ChevronLeft className="w-4 h-4" />
              </a>

              <a
                href={FACEBOOK_LINK}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-3.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1877F2] border border-blue-200 font-bold text-xs flex items-center gap-1 transition-colors"
                title="صفحة فيسبوك"
              >
                <span>فيسبوك</span>
              </a>
            </div>
          </div>

          {/* Card 2: Direct Phone Call */}
          <div className="relative rounded-3xl bg-white/95 backdrop-blur-md border border-blue-200/90 p-5 sm:p-6 shadow-[0_8px_30px_rgba(37,99,235,0.12)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.22)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-3 text-white shadow-[0_6px_20px_rgba(37,99,235,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 inline-block mb-1">
                      <Clock className="w-3 h-3 inline-block" />
                      <span>09:00 ص - 10:00 م</span>
                    </div>
                    <h4 className="font-black text-[#0a193c] text-base sm:text-lg">
                      اتصال هاتفي مباشر
                    </h4>
                  </div>
                </div>
              </div>

              <div className="my-2 bg-blue-50/70 rounded-2xl p-3 border border-blue-100/80 flex items-center justify-between">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold block">مستشار التجارة الإلكترونية:</span>
                  <span dir="ltr" className="text-sm sm:text-base font-black text-blue-950 tracking-wide font-mono">
                    {WHATSAPP_NUMBER}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(WHATSAPP_NUMBER, "phone")}
                  className="p-2 rounded-xl bg-white hover:bg-blue-100 text-blue-700 border border-blue-200 shadow-sm transition-colors text-xs flex items-center gap-1 font-bold cursor-pointer"
                  title="نسخ الرقم"
                >
                  {copiedType === "phone" ? (
                    <>
                      <Check className="w-4 h-4 text-blue-600" />
                      <span className="text-[10px]">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-[10px]">نسخ</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href={PHONE_LINK}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.5)] transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>اتصل بنا الآن</span>
              </a>
              <button
                onClick={() =>
                  onOpenOrderModal?.("طلب استشارة هاتفية سريعة", "مجاناً")
                }
                className="px-3.5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs transition-colors cursor-pointer"
                title="طلب معاودة الاتصال"
              >
                معاودة الاتصال
              </button>
            </div>
          </div>

          {/* Card 3: Official VIP Email */}
          <div className="relative rounded-3xl bg-white/95 backdrop-blur-md border border-purple-200/90 p-5 sm:p-6 shadow-[0_8px_30px_rgba(147,51,234,0.12)] hover:shadow-[0_12px_40px_rgba(147,51,234,0.22)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 p-3 text-white shadow-[0_6px_20px_rgba(147,51,234,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 inline-block mb-1">
                      <Award className="w-3 h-3 inline-block" />
                      <span>مراسلات وعقود رسمية</span>
                    </div>
                    <h4 className="font-black text-[#0a193c] text-base sm:text-lg">
                      البريد الإلكتروني المعتمد
                    </h4>
                  </div>
                </div>
              </div>

              <div className="my-2 bg-purple-50/70 rounded-2xl p-3 border border-purple-100/80 flex items-center justify-between">
                <div className="text-right truncate ml-2">
                  <span className="text-[10px] text-slate-500 font-bold block">بريد الدعم والمشاريع:</span>
                  <span dir="ltr" className="text-xs sm:text-sm font-black text-purple-950 tracking-tight font-mono truncate block">
                    support@ecomspeedpro.com
                  </span>
                </div>
                <button
                  onClick={() => handleCopy("support@ecomspeedpro.com", "email")}
                  className="p-2 rounded-xl bg-white hover:bg-purple-100 text-purple-700 border border-purple-200 shadow-sm transition-colors text-xs flex items-center gap-1 font-bold shrink-0 cursor-pointer"
                  title="نسخ البريد"
                >
                  {copiedType === "email" ? (
                    <>
                      <Check className="w-4 h-4 text-purple-600" />
                      <span className="text-[10px]">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-[10px]">نسخ</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={EMAIL_LINK}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-xs sm:text-sm flex items-center justify-between shadow-[0_4px_15px_rgba(147,51,234,0.35)] hover:shadow-[0_6px_22px_rgba(147,51,234,0.5)] transition-all cursor-pointer"
              >
                <span>إرسال بريد إلكتروني مباشر</span>
                <ChevronLeft className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. TRUST, GUARANTEE & PAYMENT METHODS PILL RIBBON        */}
        {/* ======================================================== */}
        <div className="relative rounded-3xl bg-white/95 backdrop-blur-md border border-blue-100 p-5 sm:p-6 shadow-[0_10px_35px_rgba(37,99,235,0.1)] flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Pillar 1: Bank-Grade Security & Guarantee */}
          <div className="flex items-center gap-3.5 w-full lg:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px] shadow-[0_4px_15px_rgba(37,99,235,0.35)]">
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-[#0a193c]">
                  دفع إلكتروني آمن وتشفير بنكي 100%
                </span>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  SSL 256-Bit
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                حماية شاملة لبيانات الدفع وبوابات رسمية معتمدة
              </p>
            </div>
          </div>

          {/* Pillar 2: Crisp Payment Provider Badges (NO COD) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 py-1">
            {/* YouCan Pay Badge */}
            <div
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
              title="YouCan Pay - بوابات الدفع الإلكتروني المغربية"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-slate-800">YouCan Pay</span>
            </div>

            {/* CMI Badge */}
            <div
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
              title="CMI - Centre Monétique Interbancaire Maroc"
            >
              <span className="text-xs font-black text-[#0066b2]">CMI</span>
              <span className="text-[10px] font-bold text-slate-500">المغرب</span>
            </div>

            {/* VISA Badge */}
            <div
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center gap-1 transition-all hover:scale-105"
              title="بطاقات Visa العالمية"
            >
              <span className="text-xs font-black tracking-wider text-[#1a1f71]">VISA</span>
            </div>

            {/* Mastercard Badge */}
            <div
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
              title="بطاقات Mastercard العالمية"
            >
              <div className="flex -space-x-1">
                <span className="w-3.5 h-3.5 rounded-full bg-[#eb001b] inline-block opacity-90" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] inline-block opacity-90" />
              </div>
              <span className="text-[11px] font-extrabold text-slate-800">mastercard</span>
            </div>

            {/* Bank Transfer Badge */}
            <div
              className="px-3.5 py-1.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
              title="تحويل بنكي مباشر مع تسليم فوري"
            >
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-black text-blue-900">
                تحويل بنكي مباشر
              </span>
            </div>
          </div>

          {/* Pillar 3: Luxury Interactive Policy & Guarantee Buttons */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto justify-center lg:justify-end">
            {/* Luxury Privacy Policy Button */}
            <button
              onClick={() => onOpenPolicyModal?.("privacy")}
              className="group px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-800 border border-emerald-300 shadow-sm text-xs font-black transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
              title="عرض سياسة الخصوصية وحماية البيانات"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>سياسة الخصوصية</span>
            </button>

            {/* Luxury Terms of Service Button */}
            <button
              onClick={() => onOpenPolicyModal?.("terms")}
              className="group px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-800 border border-blue-300 shadow-sm text-xs font-black transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
              title="عرض شروط وأحكام الاستخدام والخدمة"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span>شروط الاستخدام</span>
            </button>

            {/* Luxury Golden Guarantee Button */}
            <button
              onClick={() => onOpenPolicyModal?.("guarantee")}
              className="group px-4 py-2 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 text-amber-900 border border-amber-300 shadow-sm text-xs font-black transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
              title="عرض تفاصيل الضمان الذهبي لراحة البال"
            >
              <Award className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
              <span>الضمان الذهبي 🛡️</span>
            </button>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 4. MASTER LUXURY FOOTER (التذييل الشامل للموقع)           */}
        {/* ======================================================== */}
        <div className="rounded-3xl bg-[#061230] border border-blue-950 text-white p-7 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 pb-8 border-b border-blue-900/40">
            
            {/* Col 1: Brand & Mission */}
            <div className="space-y-4">
              <div className="bg-white/95 rounded-2xl p-2.5 inline-block shadow-lg">
                <Logo size="md" />
              </div>
              <p className="text-xs text-blue-200/70 leading-relaxed font-medium">
                المنصة المتكاملة الرائدة في إطلاق وتطوير المتاجر الإلكترونية وحلول التجارة الرقمية. نوفر لك تصميمات استثنائية، سرعة تحميل خارقة، ودعماً فنياً على مدار الساعة لضمان نمو تجارتك ومضاعفة مبيعاتك.
              </p>
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>الخوادم تعمل بكفاءة 100% وبسرعة فائقة</span>
              </div>
            </div>

            {/* Col 2: Services & Packages */}
            <div className="space-y-3">
              <h5 className="text-sm font-black text-cyan-300 tracking-wide">
                الباقات والخدمات
              </h5>
              <ul className="space-y-2 text-xs font-bold text-slate-300">
                <li>
                  <button
                    onClick={() =>
                      onOpenOrderModal?.("صفحة الهبوط (Landing Page)", "500 درهم")
                    }
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>• صفحة الهبوط السريعة (500 درهم)</span>
                    <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.2 rounded font-black">الأكثر طلباً</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      onOpenOrderModal?.("المتجر القياسي (Standard Store)", "1500 درهم")
                    }
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>• المتجر القياسي متعدد المنتجات (1500 درهم)</span>
                    <span className="text-[10px] bg-blue-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-black">الأكثر مبيعاً</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      onOpenOrderModal?.("منصة التجارة المتقدمة (SaaS)", "5000 درهم")
                    }
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>• منصة التجارة المتقدمة SaaS (5000 درهم)</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-black">VIP</span>
                  </button>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-cyan-400 transition-colors block"
                  >
                    • مزايا وضمانات الأداء الفائق
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Direct Navigation */}
            <div className="space-y-3">
              <h5 className="text-sm font-black text-cyan-300 tracking-wide">
                روابط سريعة
              </h5>
              <ul className="space-y-2 text-xs font-bold text-slate-300">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    • الصفحة الرئيسية
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-cyan-400 transition-colors">
                    • مقارنة الباقات والأسعار
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => onOpenPolicyModal?.("privacy")}
                    className="hover:text-cyan-400 transition-colors text-right cursor-pointer"
                  >
                    • سياسة الخصوصية وحماية البيانات
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenPolicyModal?.("terms")}
                    className="hover:text-cyan-400 transition-colors text-right cursor-pointer"
                  >
                    • شروط الخدمة والاتفاقية
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenPolicyModal?.("guarantee")}
                    className="hover:text-cyan-400 transition-colors text-right cursor-pointer"
                  >
                    • الضمان الذهبي واسترجاع الأموال
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact & Working Hours */}
            <div className="space-y-3">
              <h5 className="text-sm font-black text-cyan-300 tracking-wide">
                مركز المساعدة والمبيعات
              </h5>
              <div className="space-y-2 text-xs font-semibold text-slate-300">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span dir="ltr" className="font-mono font-bold text-white">
                    {WHATSAPP_NUMBER}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <WhatsAppIcon size={16} />
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-300 transition-colors"
                  >
                    دعم واتساب المباشر 24/7
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <a
                    href={EMAIL_LINK}
                    className="hover:text-purple-300 transition-colors"
                  >
                    support@ecomspeedpro.com
                  </a>
                </p>
                <p className="flex items-center gap-2 text-blue-200/70 pt-1">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>طيلة أيام الأسبوع: 09:00 - 22:00</span>
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Location */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-blue-200/60 gap-3">
            <p>
              © 2026 ECOM SPEED PRO • جميع الحقوق محفوظة لشركة حلول التجارة الإلكترونية والتسويق الرقمي بالمغرب.
            </p>
            <div className="flex items-center gap-2 text-slate-300">
              <span>مصمم بأعلى معايير الفخامة والسرعة العالمية</span>
              <span>🇲🇦</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
