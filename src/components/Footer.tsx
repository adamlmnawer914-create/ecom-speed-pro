"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  ChevronLeft,
  Check,
  Copy,
  Sparkles,
  Award,
  FileText,
  Shield,
  Globe,
  Crown,
  Truck,
  Store,
  Flame,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface FooterProps {
  onOpenOrderModal?: (plan?: string, price?: string) => void;
  onOpenPolicyModal?: (type: "privacy" | "terms" | "guarantee") => void;
}

export default function Footer({ onOpenOrderModal, onOpenPolicyModal }: FooterProps) {
  const WHATSAPP_NUMBER = "+212 7 62 35 74 91";
  const WHATSAPP_LINK =
    "https://wa.me/212762357491?text=مرحباً%20Ecom%20Speed%20Pro%20أريد%20الاستفسار%20عن%20خدماتكم%20وبدء%20المشروع";
  const PHONE_LINK = "tel:+212762357491";
  const EMAIL_LINK = "mailto:support@ecomspeedpro.com";

  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Packages — RTL order: 1,500 (right) → 3,000 → 4,500 → 9,000 (left)
  const packages = [
    {
      id: "landing-local",
      name: "صفحة هبوط محلية",
      price: "1,500 د.م",
      priceValue: "1500 درهم",
      planTier: "صفحة هبوط — السوق المحلي 🇲🇦 (1,500 MAD)",
      icon: Flame,
      iconBg: "from-rose-500 to-pink-600",
      iconShadow: "shadow-[0_6px_20px_rgba(244,63,94,0.5)]",
      cardBg: "from-white/90 to-rose-50/70",
      cardBorder: "border-rose-200/70 hover:border-rose-400",
      cardShadow: "shadow-[0_8px_32px_rgba(244,63,94,0.12)] hover:shadow-[0_16px_44px_rgba(244,63,94,0.28)]",
      priceBg: "from-rose-500 via-pink-500 to-fuchsia-600",
      emoji: "🇲🇦",
    },
    {
      id: "store-local",
      name: "متجر محلي متكامل",
      price: "3,000 د.م",
      priceValue: "3000 درهم",
      planTier: "متجر متكامل + لوحة تحكم — السوق المحلي 🇲🇦 (3,000 MAD)",
      icon: Store,
      iconBg: "from-cyan-500 to-blue-600",
      iconShadow: "shadow-[0_6px_20px_rgba(6,182,212,0.5)]",
      cardBg: "from-white/90 to-cyan-50/70",
      cardBorder: "border-cyan-200/70 hover:border-cyan-400",
      cardShadow: "shadow-[0_8px_32px_rgba(6,182,212,0.12)] hover:shadow-[0_16px_44px_rgba(6,182,212,0.28)]",
      priceBg: "from-cyan-500 via-blue-500 to-indigo-600",
      emoji: "🇲🇦",
    },
    {
      id: "landing-intl",
      name: "صفحة هبوط دولية",
      price: "4,500 د.م",
      priceValue: "4500 درهم",
      planTier: "صفحة هبوط — السوق الدولي 🌐 (4,500 MAD)",
      icon: Globe,
      iconBg: "from-emerald-500 to-teal-600",
      iconShadow: "shadow-[0_6px_20px_rgba(16,185,129,0.5)]",
      cardBg: "from-white/90 to-emerald-50/70",
      cardBorder: "border-emerald-200/70 hover:border-emerald-400",
      cardShadow: "shadow-[0_8px_32px_rgba(16,185,129,0.12)] hover:shadow-[0_16px_44px_rgba(16,185,129,0.28)]",
      priceBg: "from-emerald-500 via-teal-500 to-cyan-500",
      emoji: "🌐",
    },
    {
      id: "store-intl",
      name: "متجر دولي VIP",
      price: "9,000 د.م",
      priceValue: "9000 درهم",
      planTier: "متجر متكامل + لوحة تحكم — السوق الدولي 🌐 (9,000 MAD)",
      icon: Crown,
      iconBg: "from-violet-600 via-purple-600 to-indigo-700",
      iconShadow: "shadow-[0_6px_20px_rgba(124,58,237,0.6)]",
      cardBg: "from-white/90 to-violet-50/70",
      cardBorder: "border-violet-200/70 hover:border-violet-400",
      cardShadow: "shadow-[0_8px_32px_rgba(124,58,237,0.15)] hover:shadow-[0_16px_44px_rgba(124,58,237,0.32)]",
      priceBg: "from-violet-600 via-purple-600 to-indigo-600",
      emoji: "👑",
    },
  ];

  return (
    <footer className="w-full relative z-20 overflow-hidden" dir="rtl">

      {/* ── CONTACT SECTION ── */}
      <div id="contact" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* WhatsApp */}
          <div className="relative rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-200 p-5 shadow-[0_6px_24px_rgba(16,185,129,0.1)] hover:shadow-[0_10px_36px_rgba(16,185,129,0.2)] transition-all duration-300 flex flex-col gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-2.5 flex items-center justify-center shadow-[0_4px_14px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform shrink-0">
                <WhatsAppIcon size={26} />
              </div>
              <div>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 w-fit mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />رد فوري خلال دقائق
                </span>
                <h4 className="font-black text-[#0a193c] text-sm">محادثة واتساب الرسمية</h4>
              </div>
            </div>
            <div className="bg-emerald-50/70 rounded-xl p-2.5 border border-emerald-100 flex items-center justify-between">
              <span dir="ltr" className="text-sm font-black text-emerald-900 font-mono">{WHATSAPP_NUMBER}</span>
              <button onClick={() => handleCopy(WHATSAPP_NUMBER, "whatsapp")} className="p-1.5 rounded-lg bg-white hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs flex items-center gap-1 font-bold cursor-pointer transition-colors">
                {copiedType === "whatsapp" ? <><Check className="w-3.5 h-3.5 text-emerald-600" /><span className="text-[10px]">تم!</span></> : <><Copy className="w-3.5 h-3.5" /><span className="text-[10px]">نسخ</span></>}
              </button>
            </div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs flex items-center justify-between shadow-[0_3px_12px_rgba(16,185,129,0.35)] hover:shadow-[0_5px_20px_rgba(16,185,129,0.5)] transition-all cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center gap-2"><WhatsAppIcon size={16} /><span>بدء المحادثة الآن</span></div>
              <ChevronLeft className="w-4 h-4" />
            </a>
          </div>

          {/* Phone */}
          <div className="relative rounded-2xl bg-white/95 backdrop-blur-md border border-blue-200 p-5 shadow-[0_6px_24px_rgba(37,99,235,0.1)] hover:shadow-[0_10px_36px_rgba(37,99,235,0.2)] transition-all duration-300 flex flex-col gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-2.5 text-white shadow-[0_4px_14px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform shrink-0 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 flex items-center gap-1 w-fit mb-0.5">09:00 ص — 10:00 م</span>
                <h4 className="font-black text-[#0a193c] text-sm">اتصال هاتفي مباشر</h4>
              </div>
            </div>
            <div className="bg-blue-50/70 rounded-xl p-2.5 border border-blue-100 flex items-center justify-between">
              <span dir="ltr" className="text-sm font-black text-blue-950 font-mono">{WHATSAPP_NUMBER}</span>
              <button onClick={() => handleCopy(WHATSAPP_NUMBER, "phone")} className="p-1.5 rounded-lg bg-white hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs flex items-center gap-1 font-bold cursor-pointer transition-colors">
                {copiedType === "phone" ? <><Check className="w-3.5 h-3.5 text-blue-600" /><span className="text-[10px]">تم!</span></> : <><Copy className="w-3.5 h-3.5" /><span className="text-[10px]">نسخ</span></>}
              </button>
            </div>
            <a href={PHONE_LINK} className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-[0_3px_12px_rgba(37,99,235,0.35)] hover:shadow-[0_5px_20px_rgba(37,99,235,0.5)] transition-all cursor-pointer hover:scale-[1.02]">
              <Phone className="w-4 h-4" /><span>اتصل بنا الآن</span>
            </a>
          </div>

          {/* Email */}
          <div className="relative rounded-2xl bg-white/95 backdrop-blur-md border border-purple-200 p-5 shadow-[0_6px_24px_rgba(147,51,234,0.1)] hover:shadow-[0_10px_36px_rgba(147,51,234,0.2)] transition-all duration-300 flex flex-col gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 p-2.5 text-white shadow-[0_4px_14px_rgba(147,51,234,0.4)] group-hover:scale-110 transition-transform shrink-0 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1 w-fit mb-0.5">مراسلات وعقود رسمية</span>
                <h4 className="font-black text-[#0a193c] text-sm">البريد الإلكتروني المعتمد</h4>
              </div>
            </div>
            <div className="bg-purple-50/70 rounded-xl p-2.5 border border-purple-100 flex items-center justify-between">
              <span dir="ltr" className="text-xs font-black text-purple-950 font-mono truncate">support@ecomspeedpro.com</span>
              <button onClick={() => handleCopy("support@ecomspeedpro.com", "email")} className="p-1.5 rounded-lg bg-white hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs flex items-center gap-1 font-bold cursor-pointer transition-colors shrink-0 mr-1">
                {copiedType === "email" ? <><Check className="w-3.5 h-3.5 text-purple-600" /><span className="text-[10px]">تم!</span></> : <><Copy className="w-3.5 h-3.5" /><span className="text-[10px]">نسخ</span></>}
              </button>
            </div>
            <a href={EMAIL_LINK} className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-xs flex items-center justify-between shadow-[0_3px_12px_rgba(147,51,234,0.35)] hover:shadow-[0_5px_20px_rgba(147,51,234,0.5)] transition-all cursor-pointer hover:scale-[1.02]">
              <span>إرسال بريد إلكتروني مباشر</span><ChevronLeft className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>

      {/* ── MAIN FOOTER BANNER ── */}
      <div className="relative w-full overflow-hidden">

        {/* Ice-blue background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#dff0ff] via-[#eef6ff] to-[#d8ecff] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/20 via-cyan-300/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-400/15 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

          {/* Header: Title + Logo centered */}
          <div className="flex flex-col items-center mb-7 sm:mb-9">
            <button onClick={scrollToTop} className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="flex items-center gap-3 sm:gap-4">
                <h2 className="text-2xl sm:text-[32px] font-black tracking-tight leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a3ed8] via-[#2563eb] to-[#1a3ed8]">ECOM </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a3ed8] via-[#2563eb] to-[#7209b7]">SPEED PRO</span>
                </h2>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-[2px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_6px_22px_rgba(58,134,255,0.5)] group-hover:scale-105 transition-all shrink-0">
                  <div className="w-full h-full bg-white rounded-[12px] flex items-center justify-center">
                    <Image src="/images/ecom_brand_logo_transparent.webp" alt="ECOM SPEED PRO" width={48} height={48} className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#3a6ccc] font-bold">حلول التجارة الإلكترونية والتسويق الرقمي</p>
            </button>
            <div className="flex items-center gap-3 mt-3 w-52">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
              <Sparkles className="w-3.5 h-3.5 text-blue-500/60" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            </div>
          </div>

          {/* Row 1: 4 Service Package Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
            {packages.map((pkg) => {
              const PkgIcon = pkg.icon;
              return (
                <button
                  key={pkg.id}
                  onClick={() => onOpenOrderModal?.(pkg.planTier, pkg.priceValue)}
                  className={`group relative rounded-3xl bg-gradient-to-b ${pkg.cardBg} backdrop-blur-md border ${pkg.cardBorder} ${pkg.cardShadow} p-4 sm:p-5 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1.5 text-center overflow-hidden`}
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                  <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <div className={`relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl bg-gradient-to-br ${pkg.iconBg} ${pkg.iconShadow} flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300`}>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                    <PkgIcon className="w-8 h-8 sm:w-9 sm:h-9 text-white relative z-10 drop-shadow-md" />
                    <span className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-200/50 text-sm">{pkg.emoji}</span>
                  </div>
                  <span className="text-[13px] sm:text-sm font-black text-[#0b1739] leading-snug">{pkg.name}</span>
                  <div className={`w-full py-2 px-2 rounded-2xl bg-gradient-to-r ${pkg.priceBg} text-white text-sm sm:text-[15px] font-black shadow-lg text-center`}>
                    {pkg.price}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Row 2: Payment Card (right in RTL) + 3 Trust Cards (left) */}
          <div className="flex flex-col lg:flex-row gap-4 mb-5 sm:mb-6 items-stretch">

            {/* Payment Security Card */}
            <div className="relative rounded-3xl bg-white/70 backdrop-blur-xl border border-blue-200/60 shadow-[0_8px_36px_rgba(37,99,235,0.13)] p-5 sm:p-6 overflow-hidden lg:w-[52%]">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
              <div className="flex items-start gap-3 mb-4 relative z-10">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-[0_6px_20px_rgba(37,99,235,0.45)] flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent" />
                  <Image src="/images/secure_payment_3d_shield.webp" alt="Secure Payment" width={56} height={56} className="w-full h-full object-contain relative z-10 p-1" />
                </div>
                <div className="text-right">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-base sm:text-lg font-black text-[#0b1739]">دفع إلكتروني آمن ومشفّر 100%</h4>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300/70 text-emerald-700 text-[10px] font-black">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />SSL 256-Bit
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-relaxed">
                    حماية كاملة ومعالجة فورية للمدفوعات عبر PayPal والبطاقات البنكية العالمية
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10" dir="ltr">
                <div className="flex-1 h-11 rounded-2xl bg-white border border-blue-200/70 shadow-sm flex items-center justify-center gap-2 px-3 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
                  <span className="w-6 h-6 rounded-full bg-[#003087] flex items-center justify-center text-xs font-black text-[#009cde]">P</span>
                  <span className="text-sm font-black text-[#003087]">PayPal</span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="flex-1 h-11 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center justify-center hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <span className="text-lg font-black tracking-widest text-[#1a1f71] italic">VISA</span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="flex-1 h-11 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center justify-center gap-1.5 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex -space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#eb001b] inline-block shadow-sm" />
                    <span className="w-5 h-5 rounded-full bg-[#f79e1b] inline-block shadow-sm" />
                  </div>
                  <span className="text-[11px] font-black text-slate-700">mastercard</span>
                </div>
              </div>
            </div>

            {/* 3 Trust Policy Cards side by side */}
            <div className="flex flex-row gap-3 lg:flex-1">

              {/* Guarantee */}
              <button onClick={() => onOpenPolicyModal?.("guarantee")} className="group flex-1 relative rounded-3xl bg-white/70 backdrop-blur-xl border border-emerald-200/60 shadow-[0_6px_24px_rgba(16,185,129,0.1)] hover:shadow-[0_10px_32px_rgba(16,185,129,0.25)] p-4 sm:p-5 flex flex-col items-center justify-between gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_5px_16px_rgba(16,185,129,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent" />
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" />
                </div>
                <span className="text-xs sm:text-[13px] font-black text-[#0b1739] text-center leading-snug">الضمان الذهبي</span>
                <span className="text-xs text-emerald-600 font-black">←</span>
              </button>

              {/* Terms */}
              <button onClick={() => onOpenPolicyModal?.("terms")} className="group flex-1 relative rounded-3xl bg-white/70 backdrop-blur-xl border border-blue-200/60 shadow-[0_6px_24px_rgba(37,99,235,0.1)] hover:shadow-[0_10px_32px_rgba(37,99,235,0.25)] p-4 sm:p-5 flex flex-col items-center justify-between gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 shadow-[0_5px_16px_rgba(37,99,235,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent" />
                  <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" />
                </div>
                <span className="text-xs sm:text-[13px] font-black text-[#0b1739] text-center leading-snug">الشروط والأحكام</span>
                <span className="text-xs text-blue-600 font-black">←</span>
              </button>

              {/* Privacy */}
              <button onClick={() => onOpenPolicyModal?.("privacy")} className="group flex-1 relative rounded-3xl bg-white/70 backdrop-blur-xl border border-amber-200/60 shadow-[0_6px_24px_rgba(245,158,11,0.1)] hover:shadow-[0_10px_32px_rgba(245,158,11,0.25)] p-4 sm:p-5 flex flex-col items-center justify-between gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_5px_16px_rgba(245,158,11,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent" />
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" />
                </div>
                <span className="text-xs sm:text-[13px] font-black text-[#0b1739] text-center leading-snug">سياسة الخصوصية</span>
                <span className="text-xs text-amber-600 font-black">←</span>
              </button>

            </div>
          </div>

          {/* Row 3: Track Order Button — centered pill */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <Link
              href="/track"
              className="group inline-flex items-center gap-3 py-3.5 px-10 sm:px-20 rounded-full bg-gradient-to-r from-[#1a3ed8] via-[#3a86ff] to-[#7209b7] text-white font-black text-base sm:text-lg shadow-[0_10px_32px_rgba(58,134,255,0.5)] hover:shadow-[0_14px_44px_rgba(58,134,255,0.7)] transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>تتبع واستلم طلبك</span>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5 text-white" />
              </div>
            </Link>
          </div>

          {/* Row 4: Copyright */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 max-w-48 h-px bg-gradient-to-r from-transparent to-blue-400/40" />
            <p className="text-[12px] sm:text-[13px] font-bold text-[#3a6ccc]/60 whitespace-nowrap tracking-wide">
              © 2026 ECOM SPEED PRO
            </p>
            <div className="flex-1 max-w-48 h-px bg-gradient-to-l from-transparent to-blue-400/40" />
          </div>

        </div>
      </div>
    </footer>
  );
}