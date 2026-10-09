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
                    src="/images/ecom_brand_logo_transparent.png"
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
        {/* 4. MASTER LUXURY FOOTER (التذييل الشامل فائق التنظيم والفخامة) */}
        {/* ======================================================== */}
        <div className="relative rounded-[32px] sm:rounded-[44px] bg-gradient-to-b from-[#05112e] via-[#030b22] to-[#01040f] border border-blue-500/30 text-white p-7 sm:p-10 lg:p-12 shadow-[0_30px_80px_rgba(1,4,15,0.9)] overflow-hidden">
          
          {/* Top Ambient Laser Streamline & Glows */}
          <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/90 via-blue-500/80 to-transparent pointer-events-none" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-28 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-28 -right-28 w-80 h-80 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />

          {/* 4 Main Columns Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-8 pb-8 border-b border-blue-900/50">
            
            {/* ---------------- Col 1: Brand & Mission ---------------- */}
            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-2.5 sm:p-3 inline-flex shadow-[0_8px_30px_rgba(58,134,255,0.25)] border border-white/80">
                  <Logo size="md" />
                </div>
                
                <p className="text-xs sm:text-[13px] text-blue-100/85 leading-relaxed font-semibold text-justify sm:text-right">
                  المنصة المتكاملة الرائدة في إطلاق وتطوير المتاجر الإلكترونية وحلول التجارة الرقمية. نوفر لك تصميمات استثنائية، سرعة تحميل خارقة، ودعماً فنياً على مدار الساعة لضمان نمو تجارتك ومضاعفة مبيعاتك.
                </p>
              </div>

              {/* Server Status Live Widget */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#081a44]/90 border border-emerald-400/40 shadow-[0_4px_20px_rgba(16,185,129,0.18)] backdrop-blur-md">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-black text-emerald-300">
                      الخوادم تعمل بكفاءة 100% وبسرعة فائقة
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-bold">
                      جاهزية متواصلة 99.9% • استجابة فورية
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- Col 2: Packages & Services ---------------- */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-blue-900/50 mb-3.5">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                </div>
                <h5 className="text-sm sm:text-base font-black text-white tracking-wide">
                  الباقات والخدمات
                </h5>
              </div>

              <div className="space-y-2.5">
                {/* 1. Fast Landing Page */}
                <button
                  onClick={scrollToServices}
                  className="w-full p-3 rounded-2xl bg-[#091d52]/70 hover:bg-[#0e2c7a] border border-blue-800/60 hover:border-rose-400/70 flex items-center justify-between transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-[0_4px_18px_rgba(244,63,94,0.25)] hover:-translate-y-0.5"
                >
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-100 group-hover:text-white">
                      • صفحة الهبوط السريعة
                    </span>
                    <span className="text-cyan-300 font-mono text-[11px] font-black tracking-wide">
                      (500 درهم)
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-black flex items-center gap-1 shadow-[0_2px_8px_rgba(225,29,72,0.4)] shrink-0">
                    <Flame className="w-3 h-3" />
                    <span>الأكثر طلباً</span>
                  </span>
                </button>

                {/* 2. Standard Multi-product Store */}
                <button
                  onClick={scrollToServices}
                  className="w-full p-3 rounded-2xl bg-[#091d52]/70 hover:bg-[#0e2c7a] border border-blue-800/60 hover:border-cyan-400/70 flex items-center justify-between transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-[0_4px_18px_rgba(6,182,212,0.25)] hover:-translate-y-0.5"
                >
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-100 group-hover:text-white">
                      • المتجر القياسي متعدد المنتجات
                    </span>
                    <span className="text-cyan-300 font-mono text-[11px] font-black tracking-wide">
                      (1500 درهم)
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-black flex items-center gap-1 shadow-[0_2px_8px_rgba(6,182,212,0.4)] shrink-0">
                    <Zap className="w-3 h-3" />
                    <span>الأكثر مبيعاً</span>
                  </span>
                </button>

                {/* 3. Advanced SaaS Platform */}
                <button
                  onClick={scrollToServices}
                  className="w-full p-3 rounded-2xl bg-[#091d52]/70 hover:bg-[#0e2c7a] border border-blue-800/60 hover:border-amber-400/70 flex items-center justify-between transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-[0_4px_18px_rgba(245,158,11,0.25)] hover:-translate-y-0.5"
                >
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-100 group-hover:text-white">
                      • منصة التجارة المتقدمة SaaS
                    </span>
                    <span className="text-amber-300 font-mono text-[11px] font-black tracking-wide">
                      (5000 درهم)
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-slate-950 text-[10px] font-black flex items-center gap-1 shadow-[0_2px_8px_rgba(245,158,11,0.45)] shrink-0">
                    <Crown className="w-3 h-3 text-slate-950" />
                    <span>VIP</span>
                  </span>
                </button>

                {/* 4. Features & Guarantees Link */}
                <button
                  onClick={scrollToFeatures}
                  className="w-full pt-1.5 px-3 py-2 rounded-xl bg-blue-950/40 hover:bg-blue-900/50 border border-blue-800/40 hover:border-cyan-400/50 text-xs font-bold text-cyan-300 hover:text-white flex items-center justify-between transition-all group cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>• مزايا وضمانات الأداء الفائق</span>
                  </span>
                  <ChevronLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* ---------------- Col 3: Quick Links ---------------- */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-blue-900/50 mb-3.5">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <h5 className="text-sm sm:text-base font-black text-white tracking-wide">
                  روابط سريعة
                </h5>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-[13px] font-bold text-slate-200">
                <li>
                  <button
                    onClick={scrollToTop}
                    className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-cyan-400/40 hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                      <span>• الصفحة الرئيسية</span>
                    </div>
                    <ChevronLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={scrollToServices}
                    className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-blue-400/40 hover:text-blue-300 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
                      <span>• مقارنة الباقات والأسعار</span>
                    </div>
                    <ChevronLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-300 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenPolicyModal?.("privacy")}
                    className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-emerald-400/40 hover:text-emerald-300 transition-all flex items-center justify-between group text-right cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                      <span>• سياسة الخصوصية وحماية البيانات</span>
                    </div>
                    <ChevronLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-300 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenPolicyModal?.("terms")}
                    className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-indigo-400/40 hover:text-indigo-300 transition-all flex items-center justify-between group text-right cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                      <span>• شروط الخدمة والاتفاقية</span>
                    </div>
                    <ChevronLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-300 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenPolicyModal?.("guarantee")}
                    className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-amber-400/40 hover:text-amber-300 transition-all flex items-center justify-between group text-right cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                      <span>• الضمان الذهبي واسترجاع الأموال</span>
                    </div>
                    <ChevronLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-300 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </li>
              </ul>
            </div>

            {/* ---------------- Col 4: Help Center & Sales ---------------- */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-blue-900/50 mb-3.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-emerald-300" />
                </div>
                <h5 className="text-sm sm:text-base font-black text-white tracking-wide">
                  مركز المساعدة والمبيعات
                </h5>
              </div>

              <div className="space-y-2.5">
                {/* 1. Phone Call */}
                <a
                  href={PHONE_LINK}
                  className="p-3 rounded-2xl bg-[#091d52]/70 hover:bg-[#0e2c7a] border border-blue-800/60 hover:border-cyan-400/60 transition-all flex items-center justify-between text-xs font-bold text-white group cursor-pointer shadow-sm hover:shadow-[0_4px_18px_rgba(6,182,212,0.2)]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center">
                      <Phone className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                    <span dir="ltr" className="font-mono font-bold text-slate-100 text-sm tracking-wide">
                      {WHATSAPP_NUMBER}
                    </span>
                  </div>
                  <span className="text-[10px] text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-500/40 font-bold">
                    اتصال فوري
                  </span>
                </a>

                {/* 2. WhatsApp Direct 24/7 */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center justify-between text-xs font-bold text-emerald-300 group cursor-pointer shadow-sm hover:shadow-[0_4px_18px_rgba(16,185,129,0.25)]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                      <WhatsAppIcon size={18} color="#34d399" />
                    </div>
                    <span className="font-bold text-slate-100 group-hover:text-emerald-200">
                      دعم واتساب المباشر 24/7
                    </span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
                </a>

                {/* 3. Official Email */}
                <a
                  href={EMAIL_LINK}
                  className="p-3 rounded-2xl bg-purple-950/30 hover:bg-purple-900/40 border border-purple-500/30 hover:border-purple-400/50 transition-all flex items-center gap-2.5 text-xs font-semibold text-slate-200 hover:text-purple-200 group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-purple-300" />
                  </div>
                  <span dir="ltr" className="font-mono text-xs font-bold text-purple-200 truncate block">
                    support@ecomspeedpro.com
                  </span>
                </a>

                {/* 4. Working Hours */}
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 text-[11px] font-bold text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>طيلة أيام الأسبوع: 09:00 - 22:00</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Location Badge */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-blue-200/75 gap-3 pt-2">
            <p className="text-center sm:text-right leading-relaxed">
              © 2026 ECOM SPEED PRO • جميع الحقوق محفوظة لشركة حلول التجارة الإلكترونية والتسويق الرقمي بالمغرب.
            </p>
            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 shadow-sm transition-all">
              <span className="text-[11px] sm:text-xs font-bold">مصمم بأعلى معايير الفخامة والسرعة العالمية</span>
              <span className="text-base select-none">🇲🇦</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
