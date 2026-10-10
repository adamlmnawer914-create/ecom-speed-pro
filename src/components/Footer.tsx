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
  Flame,
  Zap,
  Crown,
  ArrowLeft,
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
  const FACEBOOK_LINK =
    "https://www.facebook.com/people/Ecom-Speed-Pro/61595388710709/?rdid=XmASTJaHpZvxdwJi&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DjRWQFryH%2F";
  const YOUTUBE_LINK = "https://www.youtube.com/@EcomSpeedPro";
  const INSTAGRAM_LINK = "https://www.instagram.com/ecom_speed_pro";

  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const scrollToFeatures = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname);
    }
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
              {/* Right side in RTL: Official 3D Emblem Badge + Headline */}
              <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-tr from-[#00f5d4] via-[#3a86ff] to-[#7928ca] shadow-[0_0_25px_rgba(58,134,255,0.6)] group hover:scale-105 transition-all duration-300">
                <div className="w-full h-full bg-white rounded-[14px] sm:rounded-[22px] p-1 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/ecom_brand_logo_transparent.webp"
                    alt="شعار ECOM SPEED PRO ثلاثي الأبعاد"
                    width={160}
                    height={160}
                    priority
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
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
                onClick={scrollToServices}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#00b4d8] via-[#3a86ff] to-[#7209b7] text-white font-black text-xs sm:text-sm shadow-[0_0_22px_rgba(58,134,255,0.6)] hover:shadow-[0_0_32px_rgba(58,134,255,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>اكتشف جميع الخدمات وباقاتنا الـ 3</span>
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
        <div id="contact" className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
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

            <div className="pt-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm flex items-center justify-between shadow-[0_4px_15px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_22px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <WhatsAppIcon size={20} />
                  <span>بدء المحادثة الآن</span>
                </div>
                <ChevronLeft className="w-4 h-4" />
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
        {/* ======================================================== */}
        {/* 3. LEGENDARY BANK-GRADE SECURITY & PAYMENT VAULT CARD   */}
        {/* ======================================================== */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#040e29] via-[#091f56] to-[#040e29] border-2 border-cyan-500/40 p-6 sm:p-7 shadow-[0_20px_50px_rgba(2,12,38,0.6)] overflow-hidden group">
          
          {/* Top Laser Shimmer Beam */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 via-emerald-400 to-transparent pointer-events-none" />

          {/* Ambient Glows */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-6">

            {/* Pillar 1: Bank-Grade Security & Guarantee */}
            <div className="flex items-center gap-4 w-full xl:w-auto text-right">
              {/* 3D Iridescent Shield Icon */}
              <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 via-cyan-400 to-blue-500 p-[2.5px] shadow-[0_0_25px_rgba(16,185,129,0.5)] group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
                <div className="w-full h-full bg-[#051336] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 pointer-events-none" />
                  <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
                    دفع إلكتروني آمن وتشفير بنكي 100%
                  </h4>
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-[11px] font-black shadow-[0_0_12px_rgba(16,185,129,0.35)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <Lock className="w-3 h-3 text-emerald-300" />
                    <span>SSL 256-Bit</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-blue-200/90 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>حماية شاملة لبيانات الدفع وبوابات رسمية معتمدة بالمغرب وعالمياً</span>
                </p>
              </div>
            </div>

            {/* Pillar 2: Crisp Payment Provider Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 py-1">
              
              {/* YouCan Pay Badge */}
              <div
                className="px-4 py-2 rounded-2xl bg-[#071a45]/90 hover:bg-[#0c2763] border border-emerald-400/40 hover:border-emerald-300/80 shadow-[0_4px_16px_rgba(16,185,129,0.18)] hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
                title="YouCan Pay - بوابة الدفع الإلكتروني المغربية المعتمدة"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-black text-white tracking-wide">YouCan Pay</span>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded-md">المغرب 🇲🇦</span>
              </div>

              {/* CMI Badge */}
              <div
                className="px-4 py-2 rounded-2xl bg-[#071a45]/90 hover:bg-[#0c2763] border border-blue-400/40 hover:border-blue-300/80 shadow-[0_4px_16px_rgba(59,130,246,0.18)] hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
                title="CMI - المركز النقدي المغربي Centre Monétique Interbancaire"
              >
                <span className="text-xs font-black text-cyan-300 tracking-wider">CMI</span>
                <span className="text-[10px] font-bold text-blue-200">المركز النقدي</span>
              </div>

              {/* VISA Badge */}
              <div
                className="px-4 py-2 rounded-2xl bg-[#071a45]/90 hover:bg-[#0c2763] border border-indigo-400/40 hover:border-indigo-300/80 shadow-[0_4px_16px_rgba(99,102,241,0.18)] hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                title="بطاقات Visa العالمية المعتمدة"
              >
                <span className="text-xs font-black tracking-widest text-amber-300">VISA</span>
                <span className="text-[10px] font-bold text-slate-300">Verified</span>
              </div>

              {/* Mastercard Badge */}
              <div
                className="px-4 py-2 rounded-2xl bg-[#071a45]/90 hover:bg-[#0c2763] border border-amber-400/40 hover:border-amber-300/80 shadow-[0_4px_16px_rgba(245,158,11,0.18)] hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
                title="بطاقات Mastercard العالمية المعتمدة"
              >
                <div className="flex -space-x-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#eb001b] inline-block opacity-90 shadow-sm" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] inline-block opacity-90 shadow-sm" />
                </div>
                <span className="text-[11px] font-black text-slate-100">mastercard</span>
              </div>

              {/* Bank Transfer Badge */}
              <div
                className="px-3.5 py-2 rounded-2xl bg-[#071a45]/90 hover:bg-[#0c2763] border border-cyan-400/40 hover:border-cyan-300/80 shadow-[0_4px_16px_rgba(6,182,212,0.18)] hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                title="تحويل بنكي فوري معتمد (CIH / Attijari / BMCE)"
              >
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] font-bold text-cyan-200">تحويل بنكي</span>
              </div>

            </div>

            {/* Pillar 3: Luxurious 3D Emblem Jewels for Privacy & Terms & Guarantee */}
            <div className="flex items-center gap-3.5 w-full xl:w-auto justify-center xl:justify-end">
              
              {/* 1. 3D Luxury Privacy Policy Icon Emblem */}
              <button
                onClick={() => onOpenPolicyModal?.("privacy")}
                className="group relative flex flex-col items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95"
                title="عرض سياسة الخصوصية وحماية البيانات"
              >
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/30 via-teal-500/40 to-cyan-400/30 p-[2px] border-2 border-emerald-400/70 group-hover:border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_32px_rgba(16,185,129,0.7)] transition-all">
                  <div className="w-full h-full bg-[#051c2e] rounded-[13px] flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/25 to-transparent pointer-events-none" />
                    <Shield className="w-5 h-5 text-emerald-400 group-hover:scale-115 transition-transform drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  </div>
                  {/* Verified Indicator Dot */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#040e29] shadow-xs" />
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-black text-emerald-300 block group-hover:text-emerald-200 transition-colors">
                    سياسة الخصوصية
                  </span>
                  <span className="text-[9px] font-bold text-emerald-400/80 block">
                    حماية البيانات 🔒
                  </span>
                </div>
              </button>

              {/* 2. 3D Luxury Terms & Conditions Icon Emblem */}
              <button
                onClick={() => onOpenPolicyModal?.("terms")}
                className="group relative flex flex-col items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95"
                title="عرض الشروط والأحكام وعقود الخدمة"
              >
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500/30 via-indigo-500/40 to-cyan-400/30 p-[2px] border-2 border-cyan-400/70 group-hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_32px_rgba(6,182,212,0.7)] transition-all">
                  <div className="w-full h-full bg-[#051c3a] rounded-[13px] flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 to-transparent pointer-events-none" />
                    <FileText className="w-5 h-5 text-cyan-300 group-hover:scale-115 transition-transform drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                  </div>
                  {/* Verified Indicator Dot */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#040e29] shadow-xs" />
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-black text-cyan-300 block group-hover:text-white transition-colors">
                    الشروط والأحكام
                  </span>
                  <span className="text-[9px] font-bold text-cyan-400/80 block">
                    عقود رسمية 📜
                  </span>
                </div>
              </button>

              {/* 3. 3D Royal Golden Guarantee Emblem */}
              <button
                onClick={() => onOpenPolicyModal?.("guarantee")}
                className="group relative flex flex-col items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95"
                title="عرض تفاصيل الضمان الذهبي لراحة البال"
              >
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-[2px] border-2 border-yellow-200 shadow-[0_0_25px_rgba(245,158,11,0.65)] group-hover:shadow-[0_0_35px_rgba(245,158,11,0.95)] transition-all">
                  <div className="w-full h-full bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-[13px] flex items-center justify-center overflow-hidden relative">
                    <Award className="w-6 h-6 text-slate-950 group-hover:rotate-12 transition-transform drop-shadow-sm" />
                  </div>
                  {/* Verified Crown Dot */}
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-300 border-2 border-[#040e29] flex items-center justify-center text-[8px] font-black text-slate-950 shadow-xs">
                    ★
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-black text-amber-300 block group-hover:text-yellow-200 transition-colors">
                    الضمان الذهبي
                  </span>
                  <span className="text-[9px] font-bold text-amber-400/85 block">
                    راحة بال 100% 🛡️
                  </span>
                </div>
              </button>

            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* ======================================================== */}
        {/* 4. MASTER LUXURY BANNER STRIP (شريط بانر فائق الفخامة والانسيابية) */}
        {/* ======================================================== */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#03091e] via-[#06184a] via-[#092265] to-[#03091e] border-2 border-cyan-400/40 text-white p-5 sm:p-6 shadow-[0_25px_65px_rgba(2,10,35,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden group">
          
          {/* Multi-Spectral Laser Top Accent */}
          <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400 via-blue-500 via-fuchsia-500 via-emerald-400 to-transparent pointer-events-none" />

          {/* Deep Ambient Glows */}
          <div className="absolute -top-24 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Horizontal Banner Main Bar */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 pb-4 border-b border-blue-900/60">
            
            {/* Brand Logo & Compact Tagline with 3D Bevel Frame */}
            <div className="flex items-center gap-3.5">
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_20px_rgba(59,130,246,0.5)] shrink-0 group-hover:scale-105 transition-transform">
                <div className="bg-white rounded-[14px] p-2 shadow-inner">
                  <Logo size="sm" showSlogan={false} />
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white tracking-wide">
                    ECOM SPEED PRO
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[9px] font-black text-cyan-300">
                    رسمي 2026
                  </span>
                </div>
                <span className="text-[11px] text-blue-200/80 font-bold flex items-center gap-1.5 mt-0.5">
                  <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>حلول وهندسة التجارة الإلكترونية الأكثر تطوراً بالمغرب 🇲🇦</span>
                </span>
              </div>
            </div>

            {/* Horizontal Package Action Pills with Glowing Badges */}
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              
              {/* Package 1 */}
              <button
                onClick={scrollToServices}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-950/70 via-red-900/60 to-rose-950/70 hover:from-rose-900 hover:to-red-800 border border-rose-500/50 hover:border-rose-400 text-xs font-bold text-white transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.25)] hover:shadow-[0_0_25px_rgba(244,63,94,0.55)] hover:scale-105 active:scale-95 group"
              >
                <Flame className="w-3.5 h-3.5 text-rose-400 group-hover:scale-115 transition-transform" />
                <span>صفحة الهبوط</span>
                <span className="px-2 py-0.5 rounded-lg bg-rose-500/30 text-rose-300 font-mono text-[11px] font-black border border-rose-400/30">
                  500 د.م
                </span>
              </button>

              {/* Package 2 */}
              <button
                onClick={scrollToServices}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-blue-900/60 to-cyan-950/70 hover:from-cyan-900 hover:to-blue-800 border border-cyan-500/50 hover:border-cyan-400 text-xs font-bold text-white transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.55)] hover:scale-105 active:scale-95 group"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-115 transition-transform" />
                <span>المتجر القياسي</span>
                <span className="px-2 py-0.5 rounded-lg bg-cyan-500/30 text-cyan-200 font-mono text-[11px] font-black border border-cyan-400/30">
                  1500 د.م
                </span>
              </button>

              {/* Package 3 */}
              <button
                onClick={scrollToServices}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-950/70 via-yellow-950/60 to-amber-950/70 hover:from-amber-900 hover:to-yellow-800 border border-amber-500/50 hover:border-amber-400 text-xs font-black text-amber-100 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_18px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 group"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400 group-hover:scale-115 transition-transform" />
                <span>منصة SaaS VIP</span>
                <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-mono text-[11px] font-black shadow-sm">
                  5000 د.م
                </span>
              </button>

              {/* Features Guarantee Link */}
              <button
                onClick={scrollToFeatures}
                className="px-3.5 py-2 rounded-2xl bg-blue-950/70 hover:bg-blue-900/80 border border-blue-400/40 hover:border-cyan-300 text-xs font-bold text-cyan-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>مزايا الأداء</span>
              </button>

            </div>

            {/* Live Server Indicator Capsule with Cybernetic Neon */}
            <div className="shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#061844]/95 border-2 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="text-right">
                <span className="text-[11px] font-black text-emerald-300 block">
                  خوادم سحابية فائقة السرعة
                </span>
                <span className="text-[9px] font-bold text-emerald-400/80 block">
                  جاهزية متواصلة 99.9% ⚡
                </span>
              </div>
            </div>

          </div>

          {/* Slim Copyright & Luxury Accents Row */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold text-blue-200/75 gap-3 pt-3">
            
            <p className="text-center sm:text-right">
              © 2026 ECOM SPEED PRO • جميع الحقوق محفوظة لشركة حلول التجارة الإلكترونية والتسويق الرقمي بالمغرب.
            </p>

            {/* Quick Luxury Icon Access for Legal & Trust in Footer Banner */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenPolicyModal?.("privacy")}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/40 text-[10px] text-slate-300 hover:text-emerald-300 transition-all cursor-pointer"
                title="سياسة الخصوصية"
              >
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>الخصوصية</span>
              </button>

              <button
                onClick={() => onOpenPolicyModal?.("terms")}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-[10px] text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
                title="شروط الاستخدام والأحكام"
              >
                <FileText className="w-3 h-3 text-cyan-400" />
                <span>الشروط</span>
              </button>

              <button
                onClick={() => onOpenPolicyModal?.("guarantee")}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-[10px] text-amber-300 transition-all cursor-pointer"
                title="الضمان الذهبي"
              >
                <Award className="w-3 h-3 text-amber-400" />
                <span>الضمان الذهبي</span>
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200 text-[10px]">
                <span>مصمم بأعلى معايير الفخامة والسرعة العالمية</span>
                <span className="text-xs">🇲🇦</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}
