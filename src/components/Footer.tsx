"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  ChevronLeft,
  ShieldCheck,
  Lock,
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
  Monitor,
  Flame,
  Zap,
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
    setTimeout(() => setCopiedType(null), 2500);
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

  // Service packages data
  const packages = [
    {
      id: "store-intl",
      name: "متجر دولي VIP",
      price: "9,000 د.م",
      priceValue: "9000 درهم",
      planTier: "متجر متكامل + لوحة تحكم — السوق الدولي 🌐 (9,000 MAD)",
      icon: Crown,
      iconBg: "from-purple-500 to-indigo-600",
      iconShadow: "shadow-[0_6px_20px_rgba(147,51,234,0.5)]",
      cardBg: "from-white/80 to-purple-50/60",
      cardBorder: "border-purple-200/60 hover:border-purple-400/80",
      cardShadow: "shadow-[0_8px_32px_rgba(147,51,234,0.12)] hover:shadow-[0_12px_40px_rgba(147,51,234,0.25)]",
      priceBg: "from-purple-600 via-indigo-600 to-blue-600",
      badge: "VIP",
      badgeColor: "bg-purple-100 text-purple-700 border-purple-300",
      emoji: "🌐",
    },
    {
      id: "landing-local",
      name: "صفحة هبوط محلية",
      price: "1,500 د.م",
      priceValue: "1500 درهم",
      planTier: "صفحة هبوط — السوق المحلي 🇲🇦 (1,500 MAD)",
      icon: Flame,
      iconBg: "from-rose-500 to-pink-600",
      iconShadow: "shadow-[0_6px_20px_rgba(244,63,94,0.5)]",
      cardBg: "from-white/80 to-rose-50/60",
      cardBorder: "border-rose-200/60 hover:border-rose-400/80",
      cardShadow: "shadow-[0_8px_32px_rgba(244,63,94,0.12)] hover:shadow-[0_12px_40px_rgba(244,63,94,0.25)]",
      priceBg: "from-rose-500 via-pink-500 to-red-500",
      badge: "🇲🇦",
      badgeColor: "bg-rose-100 text-rose-700 border-rose-300",
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
      cardBg: "from-white/80 to-cyan-50/60",
      cardBorder: "border-cyan-200/60 hover:border-cyan-400/80",
      cardShadow: "shadow-[0_8px_32px_rgba(6,182,212,0.12)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.25)]",
      priceBg: "from-cyan-500 via-blue-500 to-indigo-500",
      badge: "🇲🇦",
      badgeColor: "bg-cyan-100 text-cyan-700 border-cyan-300",
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
      cardBg: "from-white/80 to-emerald-50/60",
      cardBorder: "border-emerald-200/60 hover:border-emerald-400/80",
      cardShadow: "shadow-[0_8px_32px_rgba(16,185,129,0.12)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.25)]",
      priceBg: "from-emerald-500 via-teal-500 to-cyan-500",
      badge: "🌐",
      badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-300",
      emoji: "🌐",
    },
  ];

  return (
    <footer className="w-full relative z-20 overflow-hidden" dir="rtl">

      {/* ============================================================ */}
      {/* CONTACT SECTION (before the main footer banner)              */}
      {/* ============================================================ */}
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
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  رد فوري خلال دقائق
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

      {/* ============================================================ */}
      {/* MAIN FOOTER BANNER — matches the reference image             */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden">

        {/* Light gradient background with ice-blue tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4ff] via-[#f0f8ff] via-[#e2f0fb] to-[#ddeeff] pointer-events-none" />
        {/* Decorative diagonal light rays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-300/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-indigo-400/15 to-purple-300/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-blue-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

          {/* ── ROW 1: Logo + Tagline ── */}
          <div className="flex flex-col items-center mb-8 sm:mb-10">
            <button onClick={scrollToTop} className="flex items-center gap-3 sm:gap-4 group cursor-pointer">
              {/* 3D Logo */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-[2px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_8px_28px_rgba(58,134,255,0.45)] group-hover:scale-105 transition-all shrink-0">
                <div className="w-full h-full bg-white rounded-[14px] p-1.5 flex items-center justify-center">
                  <Image
                    src="/images/ecom_brand_logo_transparent.webp"
                    alt="ECOM SPEED PRO Logo"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              {/* Brand name */}
              <div className="text-right">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a3ed8] via-[#3a86ff] to-[#7209b7]">ECOM</span>
                  {" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] via-[#48cae4] to-[#3a86ff]">SPEED PRO</span>
                </h2>
                <p className="text-sm sm:text-base text-[#3a6ccc] font-bold mt-0.5">
                  حلول التجارة الإلكترونية والتسويق الرقمي
                </p>
              </div>
            </button>
            {/* Decorative divider */}
            <div className="flex items-center gap-3 mt-4 w-full max-w-xs sm:max-w-sm">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
              <Sparkles className="w-4 h-4 text-blue-500/70" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            </div>
          </div>

          {/* ── ROW 2: Main Content Grid (Services + Payment + Mockup) ── */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_auto] gap-5 xl:gap-6 items-start">

            {/* LEFT COLUMN: 4 Service Package Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xl:gap-4">
              {packages.map((pkg) => {
                const PkgIcon = pkg.icon;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => onOpenOrderModal?.(pkg.planTier, pkg.priceValue)}
                    className={`group relative rounded-2xl bg-gradient-to-b ${pkg.cardBg} backdrop-blur-md border ${pkg.cardBorder} ${pkg.cardShadow} p-4 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 text-center`}
                  >
                    {/* Glass highlight top */}
                    <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                    {/* 3D Icon pod */}
                    <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${pkg.iconBg} ${pkg.iconShadow} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {/* Inner glass reflection */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent" />
                      <PkgIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10 drop-shadow-sm" />
                      {/* Badge */}
                      <span className="absolute -top-2 -right-2 text-xs bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm border border-slate-200/60 text-[10px]">
                        {pkg.emoji}
                      </span>
                    </div>

                    {/* Name */}
                    <span className="text-xs sm:text-[13px] font-black text-[#0b1739] leading-tight">
                      {pkg.name}
                    </span>

                    {/* Price pill */}
                    <div className={`w-full py-1.5 px-2 rounded-xl bg-gradient-to-r ${pkg.priceBg} text-white text-xs sm:text-sm font-black shadow-md text-center`}>
                      {pkg.price}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CENTER COLUMN: Payment Security + Trust Cards */}
            <div className="flex flex-col gap-3 xl:w-64 2xl:w-72">

              {/* Payment Security Card */}
              <div className="relative rounded-2xl bg-white/75 backdrop-blur-lg border border-blue-200/70 shadow-[0_8px_32px_rgba(37,99,235,0.14)] p-4 overflow-hidden">
                {/* Glass top highlight */}
                <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
                {/* Ambient glow */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

                {/* Header row */}
                <div className="flex items-center gap-2.5 mb-3 relative z-10">
                  {/* Shield icon pod */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-500 shadow-[0_4px_14px_rgba(37,99,235,0.45)] flex items-center justify-center shrink-0">
                    <Image
                      src="/images/secure_payment_3d_shield.webp"
                      alt="Secure Payment Shield"
                      width={44}
                      height={44}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <div className="text-right">
                    <h4 className="text-[13px] font-black text-[#0b1739] leading-tight">
                      دفع إلكتروني آمن ومشفّر 100%
                    </h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                      <span className="text-[10px] font-bold text-emerald-600">SSL 256-Bit</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-500 font-bold mb-3 relative z-10 text-right leading-relaxed">
                  حماية المدفوعات ومعالجتها عبر PayPal والبطاقات البنكية العالمية
                </p>

                {/* Payment logos row */}
                <div className="flex items-center gap-2 relative z-10" dir="ltr">
                  {/* PayPal */}
                  <div className="flex-1 h-9 rounded-xl bg-white border border-blue-100 shadow-sm flex items-center justify-center gap-1.5 px-2 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group/pp">
                    <span className="w-5 h-5 rounded-full bg-[#003087] flex items-center justify-center text-[10px] font-black text-[#009cde] shrink-0 group-hover/pp:scale-110 transition-transform">P</span>
                    <span className="text-[11px] font-black text-[#003087]">PayPal</span>
                  </div>
                  {/* Visa */}
                  <div className="flex-1 h-9 rounded-xl bg-white border border-blue-100 shadow-sm flex items-center justify-center hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                    <span className="text-sm font-black tracking-widest text-[#1a1f71] italic">VISA</span>
                  </div>
                  {/* Mastercard */}
                  <div className="flex-1 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center gap-1 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex -space-x-1">
                      <span className="w-4 h-4 rounded-full bg-[#eb001b] inline-block" />
                      <span className="w-4 h-4 rounded-full bg-[#f79e1b] inline-block" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Policy Cards — 3 equal cards */}
              <div className="grid grid-cols-3 gap-2">
                {/* Guarantee */}
                <button
                  onClick={() => onOpenPolicyModal?.("guarantee")}
                  className="group relative rounded-xl bg-white/70 backdrop-blur-md border border-amber-200/70 shadow-[0_4px_16px_rgba(245,158,11,0.1)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.25)] p-2.5 flex flex-col items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.05] hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-[0_3px_10px_rgba(245,158,11,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5 text-slate-900" />
                  </div>
                  <span className="text-[10px] font-black text-[#0b1739] text-center leading-tight">الضمان الذهبي</span>
                </button>

                {/* Terms */}
                <button
                  onClick={() => onOpenPolicyModal?.("terms")}
                  className="group relative rounded-xl bg-white/70 backdrop-blur-md border border-cyan-200/70 shadow-[0_4px_16px_rgba(6,182,212,0.1)] hover:shadow-[0_6px_22px_rgba(6,182,212,0.25)] p-2.5 flex flex-col items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.05] hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-[0_3px_10px_rgba(6,182,212,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-black text-[#0b1739] text-center leading-tight">الشروط والأحكام</span>
                </button>

                {/* Privacy */}
                <button
                  onClick={() => onOpenPolicyModal?.("privacy")}
                  className="group relative rounded-xl bg-white/70 backdrop-blur-md border border-emerald-200/70 shadow-[0_4px_16px_rgba(16,185,129,0.1)] hover:shadow-[0_6px_22px_rgba(16,185,129,0.25)] p-2.5 flex flex-col items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.05] hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 shadow-[0_3px_10px_rgba(16,185,129,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-black text-[#0b1739] text-center leading-tight">سياسة الخصوصية</span>
                </button>
              </div>

              {/* Track Order Button */}
              <Link
                href="/track"
                className="group w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#1a3ed8] via-[#3a86ff] to-[#7209b7] text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-[0_8px_28px_rgba(58,134,255,0.45)] hover:shadow-[0_12px_36px_rgba(58,134,255,0.65)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span>تتبع واستلم طلبك</span>
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>

            </div>

            {/* RIGHT COLUMN: Device Mockup Preview */}
            <div className="hidden xl:flex flex-col items-center justify-center xl:w-56 2xl:w-64">
              <div className="relative w-full">
                {/* Laptop frame */}
                <div className="relative w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-[#1a3ed8]/10 to-[#7209b7]/10 border-2 border-blue-300/40 shadow-[0_12px_40px_rgba(58,134,255,0.2)] overflow-hidden backdrop-blur-sm">
                  {/* Screen content mockup */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-blue-50/80 p-2">
                    {/* Mockup navbar */}
                    <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-blue-100">
                      <div className="flex gap-0.5">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <div className="flex-1 mx-2 h-2 rounded-full bg-slate-200/80" />
                    </div>
                    {/* Hero strip */}
                    <div className="w-full h-10 rounded-lg bg-gradient-to-r from-[#1a3ed8] to-[#7209b7] mb-1.5 flex items-center justify-center">
                      <span className="text-white text-[8px] font-black tracking-wide">ECOM SPEED PRO</span>
                    </div>
                    {/* Product cards grid */}
                    <div className="grid grid-cols-3 gap-1 mb-1.5">
                      {[
                        { color: "from-blue-100 to-cyan-100", icon: "👟" },
                        { color: "from-purple-100 to-pink-100", icon: "👜" },
                        { color: "from-emerald-100 to-teal-100", icon: "⌚" },
                      ].map((item, i) => (
                        <div key={i} className={`rounded-lg bg-gradient-to-br ${item.color} p-1.5 border border-white/80`}>
                          <div className="text-base text-center">{item.icon}</div>
                          <div className="w-full h-1.5 rounded-full bg-slate-300/60 mt-1" />
                          <div className="w-3/4 h-1.5 rounded-full bg-blue-400/40 mt-0.5" />
                        </div>
                      ))}
                    </div>
                    {/* CTA button */}
                    <div className="w-full h-4 rounded-lg bg-gradient-to-r from-[#1a3ed8] to-[#7209b7] flex items-center justify-center">
                      <span className="text-white text-[7px] font-black">اطلب الآن</span>
                    </div>
                  </div>
                </div>
                {/* Laptop bottom stand */}
                <div className="w-3/5 h-2 mx-auto bg-gradient-to-r from-slate-300/60 via-slate-400/60 to-slate-300/60 rounded-b-xl shadow-md" />
                <div className="w-4/5 h-1 mx-auto bg-slate-300/40 rounded-full mt-0.5" />

                {/* Phone floating overlay */}
                <div className="absolute -bottom-4 -left-4 w-16 h-24 rounded-2xl border-2 border-blue-300/50 shadow-[0_8px_24px_rgba(58,134,255,0.25)] overflow-hidden bg-white/90">
                  {/* Phone screen */}
                  <div className="w-full h-full bg-gradient-to-b from-[#1a3ed8] to-[#7209b7] p-1.5 flex flex-col gap-1">
                    <div className="w-full h-5 rounded bg-white/20 flex items-center justify-center">
                      <span className="text-white text-[5px] font-black">متجر ESP</span>
                    </div>
                    <div className="w-full h-6 rounded bg-white/15 flex items-center justify-center">
                      <span className="text-[8px]">👟</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-white/80 flex items-center justify-center">
                      <span className="text-[5px] font-black text-blue-700">اشتري الآن</span>
                    </div>
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="h-4 rounded bg-white/20 flex items-center justify-center text-[6px]">👜</div>
                      <div className="h-4 rounded bg-white/20 flex items-center justify-center text-[6px]">⌚</div>
                    </div>
                  </div>
                </div>

                {/* Decorative glow under devices */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-blue-400/20 rounded-full blur-xl" />
              </div>
            </div>

          </div>

          {/* ── ROW 3: Copyright ── */}
          <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
            <div className="flex-1 max-w-24 h-px bg-gradient-to-r from-transparent to-blue-400/40" />
            <p className="text-[12px] sm:text-sm font-bold text-[#3a6ccc]/70 whitespace-nowrap">
              © 2026 ECOM SPEED PRO
            </p>
            <div className="flex-1 max-w-24 h-px bg-gradient-to-l from-transparent to-blue-400/40" />
          </div>

        </div>
      </div>
    </footer>
  );
}
