"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ShieldCheck,
  Lock,
  CreditCard,
  Calendar,
  User,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Check,
  Phone,
  Zap,
  Award,
  ChevronLeft,
} from "lucide-react";
import Logo from "@/components/Logo";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  selectedPrice: string;
  onOpenPolicyModal?: (type: "privacy" | "terms" | "guarantee") => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  selectedPlan,
  selectedPrice,
  onOpenPolicyModal,
}: OrderModalProps) {
  // Payment methods: "card" | "youcan" | "cmi" | "whatsapp"
  const [paymentMethod, setPaymentMethod] = useState<"card" | "youcan" | "cmi" | "whatsapp">("card");

  // Customer contact info
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Card Inputs
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  // Submission state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setIsProcessing(false);
      setOrderId("ESP-" + Math.floor(100000 + Math.random() * 900000));
      // Lock background scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Plan visual characteristics
  const isLanding = selectedPlan.includes("الهبوط") || selectedPlan.includes("Landing");
  const isSaaS = selectedPlan.includes("المتقدمة") || selectedPlan.includes("SaaS");

  const planTitle = isLanding
    ? "صفحة الهبوط (Landing Page)"
    : isSaaS
    ? "منصة التجارة المتقدمة (Advanced SaaS)"
    : "المتجر القياسي (Standard Store)";

  const planSubtitle = isLanding
    ? "تصميم مخصص لتحقيق أعلى معدل تحويل لمنتج رابح"
    : isSaaS
    ? "حل برمجي VIP متكامل لكبار التجار والشركات التوسعية"
    : "متجر متكامل متعدد المنتجات للعلامات التجارية الطموحة";

  const planImage = isLanding
    ? "/images/card_landing_new.webp"
    : isSaaS
    ? "/images/card_saas_new.webp"
    : "/images/card_standard_new.webp";

  const planBadgeColor = isLanding
    ? "from-rose-500 to-purple-600 text-white"
    : isSaaS
    ? "from-amber-400 to-yellow-500 text-slate-950"
    : "from-cyan-500 to-blue-600 text-white";

  // Price formatting
  const rawNumericPrice = parseInt(selectedPrice.replace(/[^0-9]/g, ""), 10) || 1500;
  const formattedPrice = `${rawNumericPrice.toLocaleString()} درهم`;

  // Format Card Number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = val.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  // Format Expiry Date
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 3) {
      setExpiryDate(`${val.slice(0, 2)}/${val.slice(2)}`);
    } else {
      setExpiryDate(val);
    }
  };

  // Format CVV
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvv(val);
  };

  // Submit Order
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1100);
  };

  // WhatsApp VIP Redirect
  const handleProceedWhatsApp = () => {
    const message = `مرحباً وكالة ECOM SPEED PRO 🚀%0Aتم حجز طلب جديد عبر شاشة الدفع الفاخرة:%0A%0A*رقم الطلب:* ${orderId}%0A*الباقة المختارة:* ${encodeURIComponent(
      planTitle
    )}%0A*المبلغ:* ${rawNumericPrice} درهم%0A*طريقة الدفع:* ${
      paymentMethod === "card"
        ? "بطاقة بنكية (VISA / Mastercard)"
        : paymentMethod === "youcan"
        ? "YouCan Pay المغربية"
        : paymentMethod === "cmi"
        ? "بوابة CMI المركز النقدي"
        : "تأكيد واتساب VIP المباشر"
    }%0A*الاسم:* ${encodeURIComponent(
      customerName || cardHolder || "عميل مميز"
    )}%0A*الهاتف:* ${encodeURIComponent(customerPhone || "+212...")}%0A%0Aأرجو بدء تجهيز المشروع والتسليم في الوقت المحدد.`;

    const url = `https://wa.me/212762357491?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#020718]/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-5 md:p-6 animate-in fade-in duration-300">
      
      {/* Background Ambient Cosmic Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/15 rounded-full blur-[120px]" />
      </div>

      <div
        className="relative w-full max-w-[1100px] my-auto flex flex-col items-center gap-3 sm:gap-4"
        dir="rtl"
      >
        {/* ======================================================== */}
        {/* TOP VIP HEADER: BRAND LOGO + SECURITY CAPSULE + CLOSE     */}
        {/* ======================================================== */}
        <div className="w-full flex items-center justify-between px-2 sm:px-4 text-white">
          
          {/* Right in RTL: Logo & Badge */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-2xl bg-white shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <Logo size="sm" showSlogan={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black text-white tracking-wide">
                  ECOM SPEED PRO
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-black text-cyan-300">
                  بوابة الدفع الآمن
                </span>
              </div>
              <span className="text-[11px] text-blue-200/80 font-bold hidden sm:block">
                منصة رسمية معتمدة • تسليم قياسي خلال 48 ساعة ⚡
              </span>
            </div>
          </div>

          {/* Center in RTL: SSL Encryption Capsule */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#051842]/80 border border-cyan-400/40 text-cyan-300 text-xs font-black shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Lock className="w-3.5 h-3.5 text-emerald-300" />
            <span>تشفير مصرفي 256-Bit SSL آمن ومحمي 100%</span>
          </div>

          {/* Left in RTL: Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 hover:bg-rose-500/20 border border-white/20 hover:border-rose-400/50 text-white hover:text-rose-300 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg group"
            title="إغلاق والعودة للمتجر"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* MAIN LUXURY CHECKOUT CARD (ROYAL SAPPHIRE OBSIDIAN)      */}
        {/* ======================================================== */}
        <div className="relative w-full rounded-[30px] sm:rounded-[36px] bg-gradient-to-br from-[#040e2b]/95 via-[#06184a]/95 to-[#03091e]/95 border-2 border-cyan-400/35 shadow-[0_30px_90px_rgba(2,10,35,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] text-white p-5 sm:p-7 md:p-8 overflow-hidden">
          
          {/* Laser Accent Line on Top */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 via-blue-500 via-emerald-400 to-transparent pointer-events-none" />

          {isSuccess ? (
            /* ======================================================== */
            /* SUCCESS CONFIRMATION SCREEN (شاشة نجاح أسطورية)          */
            /* ======================================================== */
            <div className="py-8 sm:py-12 px-4 flex flex-col items-center text-center max-w-xl mx-auto animate-in zoom-in-95 duration-300">
              
              {/* Pulsing 3D Check Jewel */}
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-400 p-[3px] shadow-[0_0_40px_rgba(16,185,129,0.6)] mb-6 animate-bounce">
                <div className="w-full h-full bg-[#051c2e] rounded-[22px] flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-black mb-3 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>تم تأكيد حجزك بنجاح تام!</span>
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
                تهانينا! رقم طلبك الرسمي:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 font-mono">
                  {orderId}
                </span>
              </h3>

              <p className="text-blue-200/90 text-sm font-semibold mb-6 leading-relaxed max-w-md">
                تم تسجيل حجزك لباقة <strong className="text-white">{planTitle}</strong> بقيمة{" "}
                <strong className="text-emerald-300 font-mono">{formattedPrice}</strong>. 
                اضغط أدناه للبدء فوراً وتنسيق تفاصيل مشروعك مع فريقنا عبر واتساب.
              </p>

              {/* Package Summary Capsule in Success Screen */}
              <div className="w-full bg-[#071a48]/80 border border-blue-400/30 rounded-2xl p-4 mb-6 flex items-center justify-between text-right">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/20 shrink-0">
                    <Image src={planImage} alt={planTitle} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block">{planTitle}</span>
                    <span className="text-[11px] text-cyan-300 font-bold block">تسليم قياسي خلال 48 ساعة</span>
                  </div>
                </div>
                <div className="text-left font-mono text-base font-black text-emerald-300">
                  {formattedPrice}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center">
                <button
                  onClick={handleProceedWhatsApp}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm sm:text-base shadow-[0_0_25px_rgba(16,185,129,0.55)] hover:shadow-[0_0_35px_rgba(16,185,129,0.85)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <WhatsAppIcon size={22} />
                  <span>تأكيد وانطلاق المشروع على واتساب فوراً</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm transition-colors cursor-pointer"
                >
                  العودة للمتجر
                </button>
              </div>

            </div>
          ) : (
            /* ======================================================== */
            /* 2-COLUMN LUXURY FOCUSED CHECKOUT FORM                    */
            /* ======================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* ==================================================== */}
              {/* RIGHT COLUMN (Col 5): PACKAGE SHOWCASE & CARD PREVIEW */}
              {/* ==================================================== */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                
                {/* 1. Selected Package Master Card */}
                <div className="relative rounded-3xl bg-[#06163f]/90 border border-cyan-400/30 p-4 sm:p-5 shadow-[0_10px_30px_rgba(2,10,35,0.6)] overflow-hidden group">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0">
                      <Image
                        src={planImage}
                        alt={planTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-right flex-1 min-w-0">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r ${planBadgeColor} mb-1 shadow-sm`}>
                        الباقة المختارة
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-white tracking-tight truncate">
                        {planTitle}
                      </h4>
                      <p className="text-[11px] text-blue-200/80 font-medium line-clamp-1 mt-0.5">
                        {planSubtitle}
                      </p>
                    </div>
                  </div>

                  {/* Guaranteed Trust Pillars (Clean & Minimal) */}
                  <div className="pt-3 border-t border-blue-900/60 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-100">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>تسليم متكامل وجاهز للبيع خلال 48 ساعة ⚡</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-100">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>ربط بوابات الدفع الإلكتروني المؤتمتة 100%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-100">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>ضمان ذهبي ودعم فني متواصل 🛡️</span>
                    </div>
                  </div>

                  {/* Price Banner Ribbon */}
                  <div className="mt-4 pt-3 border-t border-blue-900/60 flex items-center justify-between">
                    <span className="text-xs text-blue-200/90 font-bold">المبلغ المستحق للدفع:</span>
                    <div className="px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-mono text-base sm:text-lg font-black shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                      {formattedPrice}
                    </div>
                  </div>
                </div>

                {/* 2. Interactive 3D Luxury Credit Card Mockup (WOW FACTOR) */}
                <div className="relative rounded-3xl bg-gradient-to-br from-[#0a1f55] via-[#0e2c7a] to-[#06143c] border-2 border-cyan-400/50 p-5 shadow-[0_15px_35px_rgba(2,10,35,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] text-white overflow-hidden transition-all duration-300">
                  
                  {/* Card Light Reflection */}
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

                  {/* Card Header: Chip + Contactless + Brand */}
                  <div className="relative z-10 flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      {/* Gold Chip Graphic */}
                      <div className="w-10 h-7 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-yellow-300/80 shadow-md flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-700/60" />
                        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-amber-700/60" />
                        <div className="w-4 h-3 rounded border border-amber-800/40" />
                      </div>
                      {/* Contactless waves */}
                      <span className="text-cyan-300 text-xs font-mono font-bold tracking-widest opacity-80">
                        ))))
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black tracking-wider text-cyan-200">
                        ECOM VIP PAY
                      </span>
                      <div className="flex -space-x-1.5">
                        <span className="w-4 h-4 rounded-full bg-[#eb001b] inline-block opacity-90 shadow-sm" />
                        <span className="w-4 h-4 rounded-full bg-[#f79e1b] inline-block opacity-90 shadow-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Card Number (Dynamic) */}
                  <div className="relative z-10 mb-5 text-left font-mono tracking-widest text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white drop-shadow-sm" dir="ltr">
                    {cardNumber ? cardNumber : "•••• •••• •••• ••••"}
                  </div>

                  {/* Card Footer: Holder Name + Expiry */}
                  <div className="relative z-10 flex items-end justify-between text-xs">
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-cyan-300/70 font-bold block mb-0.5">
                        حامل البطاقة
                      </span>
                      <span className="font-bold text-white uppercase tracking-wide truncate max-w-[170px] block">
                        {cardHolder ? cardHolder : (customerName ? customerName : "اسم العميل المميز")}
                      </span>
                    </div>

                    <div className="text-left" dir="ltr">
                      <span className="text-[9px] uppercase tracking-wider text-cyan-300/70 font-bold block mb-0.5">
                        EXPIRES
                      </span>
                      <span className="font-mono font-bold text-white">
                        {expiryDate ? expiryDate : "MM/YY"}
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* ==================================================== */}
              {/* LEFT COLUMN (Col 7): ULTRA-CLEAN FOCUSED CHECKOUT   */}
              {/* ==================================================== */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                
                {/* 1. Payment Method Pills Selection */}
                <div>
                  <label className="text-xs font-black text-cyan-200 block mb-2 text-right">
                    اختر وسيلة الدفع المعتمدة:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    
                    {/* Method 1: Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`relative p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02]"
                          : "border-blue-900/70 bg-[#06143c]/70 hover:bg-[#0a205a]/70 hover:border-blue-700"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-cyan-300" />
                      <span className="text-[11px] font-black text-white">بطاقة بنكية</span>
                      <span className="text-[9px] text-cyan-300/80 font-bold">VISA / Master</span>
                    </button>

                    {/* Method 2: YouCan Pay */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("youcan")}
                      className={`relative p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === "youcan"
                          ? "border-emerald-400 bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-[1.02]"
                          : "border-blue-900/70 bg-[#06143c]/70 hover:bg-[#0a205a]/70 hover:border-blue-700"
                      }`}
                    >
                      <Zap className="w-5 h-5 text-emerald-400" />
                      <span className="text-[11px] font-black text-white">YouCan Pay</span>
                      <span className="text-[9px] text-emerald-300 font-bold">المغرب 🇲🇦</span>
                    </button>

                    {/* Method 3: CMI */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cmi")}
                      className={`relative p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === "cmi"
                          ? "border-blue-400 bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-[1.02]"
                          : "border-blue-900/70 bg-[#06143c]/70 hover:bg-[#0a205a]/70 hover:border-blue-700"
                      }`}
                    >
                      <ShieldCheck className="w-5 h-5 text-blue-300" />
                      <span className="text-[11px] font-black text-white">CMI المركز</span>
                      <span className="text-[9px] text-blue-300 font-bold">بنوك المغرب</span>
                    </button>

                    {/* Method 4: WhatsApp VIP Concierge */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("whatsapp")}
                      className={`relative p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === "whatsapp"
                          ? "border-emerald-400 bg-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.45)] scale-[1.02]"
                          : "border-blue-900/70 bg-[#06143c]/70 hover:bg-[#0a205a]/70 hover:border-blue-700"
                      }`}
                    >
                      <WhatsAppIcon size={20} />
                      <span className="text-[11px] font-black text-white">واتساب VIP</span>
                      <span className="text-[9px] text-emerald-300 font-bold">تأكيد فوري</span>
                    </button>

                  </div>
                </div>

                {/* 2. Streamlined Form Inputs */}
                <form onSubmit={handleSubmitOrder} className="space-y-3.5">
                  
                  {/* Step A: Basic Customer Contact (Always required) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-black text-blue-100 block mb-1">
                        الاسم الكامل *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="مثال: محمد العلوي"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-2xl bg-[#061845]/90 border border-blue-400/40 text-xs font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all pl-9"
                        />
                        <User className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-blue-100 block mb-1">
                        رقم الهاتف / واتساب *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          placeholder="+212 6 XX XX XX XX"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-2xl bg-[#061845]/90 border border-blue-400/40 text-xs font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all pl-9 text-right font-mono"
                        />
                        <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                      </div>
                    </div>
                  </div>

                  {/* Step B: Card Inputs (Visible when 'card' is selected) */}
                  {paymentMethod === "card" && (
                    <div className="rounded-2xl bg-[#071a48]/75 border border-cyan-400/30 p-3.5 space-y-3 animate-in fade-in duration-200">
                      
                      {/* Card Number */}
                      <div>
                        <label className="text-[11px] font-bold text-cyan-200 block mb-1">
                          رقم البطاقة المصرفية
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            dir="ltr"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#05143a] border border-blue-400/40 text-xs font-mono font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 pl-10 tracking-widest"
                          />
                          <CreditCard className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                        </div>
                      </div>

                      {/* Expiry & CVV */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-cyan-200 block mb-1">
                            تاريخ الانتهاء
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              dir="ltr"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={handleExpiryChange}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-[#05143a] border border-blue-400/40 text-xs font-mono font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 pl-9"
                            />
                            <Calendar className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-cyan-200 block mb-1">
                            رمز الأمان (CVV)
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              required
                              dir="ltr"
                              placeholder="123"
                              value={cvv}
                              onChange={handleCvvChange}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-[#05143a] border border-blue-400/40 text-xs font-mono font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 pl-9 tracking-widest"
                            />
                            <Lock className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                          </div>
                        </div>
                      </div>

                      {/* Cardholder Name */}
                      <div>
                        <label className="text-[11px] font-bold text-cyan-200 block mb-1">
                          اسم صاحب البطاقة (كما يظهر عليها)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="MOHAMED EL ALAOUI"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#05143a] border border-blue-400/40 text-xs font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 pl-9 uppercase"
                          />
                          <User className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Notice when YouCan Pay is selected */}
                  {paymentMethod === "youcan" && (
                    <div className="rounded-2xl bg-emerald-950/40 border border-emerald-400/40 p-4 text-center space-y-1.5 animate-in fade-in duration-200">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black">
                        <span>YouCan Pay المغربية 🇲🇦</span>
                      </div>
                      <p className="text-xs text-blue-100 font-bold leading-relaxed">
                        دفع فوري ومؤتمت ومحمي عبر بوابة YouCan Pay الرسمية. سيتم معالجة العملية بأمان دون أي عمولات إضافية.
                      </p>
                    </div>
                  )}

                  {/* Notice when CMI is selected */}
                  {paymentMethod === "cmi" && (
                    <div className="rounded-2xl bg-blue-950/40 border border-blue-400/40 p-4 text-center space-y-1.5 animate-in fade-in duration-200">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 text-[11px] font-black">
                        <span>Centre Monétique Interbancaire (CMI) 🏛️</span>
                      </div>
                      <p className="text-xs text-blue-100 font-bold leading-relaxed">
                        الدفع البنكي المغربي الرسمي المعتمد لجميع الأبناك المغربية (CIH, Attijariwafa, Banque Populaire) بحماية 3D-Secure.
                      </p>
                    </div>
                  )}

                  {/* Notice when WhatsApp VIP is selected */}
                  {paymentMethod === "whatsapp" && (
                    <div className="rounded-2xl bg-emerald-950/40 border border-emerald-400/50 p-4 text-center space-y-2 animate-in fade-in duration-200">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black">
                        <span>تأكيد VIP عبر مستشارك الخاص ⚡</span>
                      </div>
                      <p className="text-xs text-blue-100 font-bold leading-relaxed">
                        سيتم ربطك فوراً بمستشار التجارة الإلكترونية المخصص لبدء تجهيز متجرك ومتابعة تفاصيل الدفع والتسليم.
                      </p>
                    </div>
                  )}

                  {/* 3. The Grand CTA Button (فخم وخرافي) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-cyan-400 via-blue-600 to-fuchsia-600 hover:from-cyan-300 hover:via-blue-500 hover:to-fuchsia-500 text-white font-black text-sm sm:text-base shadow-[0_0_30px_rgba(6,182,212,0.55)] hover:shadow-[0_0_45px_rgba(6,182,212,0.85)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 group"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>جاري تأكيد وتشفير الطلب بأمان...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
                          <span>
                            تأكيد الطلب والدفع الآمن ({formattedPrice})
                          </span>
                          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Micro Trust Line */}
                  <div className="text-center pt-1">
                    <p className="text-[11px] text-blue-200/70 font-bold flex items-center justify-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>بياناتك مشفرة ومحمية بالكامل • ضمان ذهبي لراحة البال 100%</span>
                    </p>
                  </div>

                </form>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
