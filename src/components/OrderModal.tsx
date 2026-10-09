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
  FileText,
  Check,
  Building2,
  Phone,
  MessageCircle,
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
  // Payment methods: "card" | "paypal" | "youcan" | "cmi" (4 exact payment methods)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "youcan" | "cmi">("card");
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  // Customer contact info
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Coupon state
  const [coupon, setCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  // Submission state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setIsProcessing(false);
      setOrderId("ESP-" + Math.floor(100000 + Math.random() * 900000));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine plan visual assets
  const isLanding = selectedPlan.includes("الهبوط") || selectedPlan.includes("Landing");
  const isSaaS = selectedPlan.includes("المتقدمة") || selectedPlan.includes("SaaS");

  const planTitle = isLanding
    ? "باقة صفحة الهبوط (Landing Page)"
    : isSaaS
    ? "منصة التجارة المتقدمة (Advanced SaaS)"
    : "باقة المتجر القياسي (Standard Store)";

  const planSubtitle = isLanding
    ? "صفحة بيع استثنائية لمنتج رابح"
    : isSaaS
    ? "حل برمجي متكامل لكبار التجار"
    : "متجر إلكتروني احترافي متعدد الصفحات";

  const planImage = isLanding
    ? "/images/card_landing_new.png"
    : isSaaS
    ? "/images/card_saas_new.png"
    : "/images/card_standard_new.png";

  const planFeatures = isLanding
    ? [
        "صفحة هبوط احترافية مخصصة لمنتج رابح (Winner Product)",
        "تصميم محفز ومضاعف لمعدل التحويل (High Conversion)",
        "ربط بوابات الدفع الإلكتروني المؤتمتة (YouCan Pay, CMI)",
        "واجهة تجاوبية 100% مع جميع الهواتف والحواسيب",
      ]
    : isSaaS
    ? [
        "نظام متكامل بلوحة تحكم إدارية احترافية (Dashboard)",
        "دمج بوابات الدفع الإلكترونية المؤتمتة وحسابات البنوك",
        "إرسال فواتير وإشعارات أوتوماتيكية للزبائن",
        "ملكية النظام مدى الحياة بدون أي اشتراكات شهرية",
      ]
    : [
        "متجر إلكتروني احترافي متعدد الصفحات",
        "عرض منتجات متعددة بتصميم عصري جذاب",
        "نظام سلس ومتكامل لاستقبال وتتبع الطلبات",
        "واجهة تجاوبية 100% مع جميع الهواتف والحواسيب",
      ];

  // Price calculations
  const rawNumericPrice = parseInt(selectedPrice.replace(/[^0-9]/g, ""), 10) || 1500;
  const finalPrice = Math.max(0, rawNumericPrice - discountAmount);

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SPEED20" || coupon.trim().toUpperCase() === "VIP") {
      const discount = Math.round(rawNumericPrice * 0.2);
      setDiscountAmount(discount);
      setCouponApplied(true);
    } else {
      alert("كود الخصم غير صحيح. جرب كود: SPEED20 للحصول على خصم 20%");
    }
  };

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
      setExpiryDate(`${val.slice(0, 2)} / ${val.slice(2)}`);
    } else {
      setExpiryDate(val);
    }
  };

  // Format CVV
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(val);
  };

  // Complete Order
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleProceedWhatsApp = () => {
    const message = `مرحباً وكالة Ecom Speed Pro 🚀%0Aتم تأكيد طلب جديد رقم: *${orderId}*%0A%0A*الباقة المختارة:* ${encodeURIComponent(
      planTitle
    )}%0A*طريقة الدفع:* ${
      paymentMethod === "card"
        ? "بطاقة بنكية"
        : paymentMethod === "paypal"
        ? "PayPal"
        : paymentMethod === "youcan"
        ? "YouCan Pay"
        : "بوابة CMI المغرب"
    }%0A*الإجمالي:* ${finalPrice} درهم%0A*الاسم:* ${encodeURIComponent(
      customerName || cardHolder || "عميل مميز"
    )}%0A*الهاتف:* ${encodeURIComponent(customerPhone || "+212...")}%0A%0Aأرجو بدء تجهيز المشروع.`;

    const url = `https://wa.me/212762357491?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#030a1c]/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 md:p-6 animate-in fade-in duration-300">
      
      {/* Background Ambient Stars & Glowing Lasers */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div
        className="relative w-full max-w-[1280px] my-auto flex flex-col items-center gap-4"
        dir="rtl"
      >
        {/* ======================================================== */}
        {/* TOP HEADER: SECURITY BADGES + LOGO + CLOSE BUTTON       */}
        {/* ======================================================== */}
        <div className="w-full flex items-center justify-between px-2 sm:px-6 py-2 text-white">
          
          {/* Right in RTL: Lock Security Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-[2px] shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <div className="w-full h-full bg-[#071333] rounded-2xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-xs font-black text-white block">معلوماتك محمية</span>
              <span className="text-[10px] text-cyan-300/80 font-bold">بأعلى معايير الأمان SSL</span>
            </div>
          </div>

          {/* Center in RTL: Luxury Logo */}
          <div className="flex flex-col items-center justify-center">
            <Logo size="md" lightText={true} />
          </div>

          {/* Left in RTL: Shield Safe Badge + Close Button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 text-left">
              <div className="text-left">
                <span className="text-xs font-black text-white block">دفع آمن 100%</span>
                <span className="text-[10px] text-cyan-300/80 font-bold">ومضمون بالكامل</span>
              </div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-[2px] shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <div className="w-full h-full bg-[#071333] rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              title="إغلاق والعودة للمتجر"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* ======================================================== */}
        {/* MAIN CHECKOUT FLOATING CONTAINER                         */}
        {/* ======================================================== */}
        <div className="w-full rounded-[36px] bg-white/95 backdrop-blur-2xl border border-blue-200/90 shadow-[0_20px_70px_rgba(37,99,235,0.28)] p-5 sm:p-7 md:p-8 flex flex-col gap-6 overflow-hidden">
          
          {isSuccess ? (
            /* SUCCESS CONFIRMATION SCREEN */
            <div className="py-12 px-4 flex flex-col items-center text-center max-w-xl mx-auto animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 mb-5 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                تم استلام طلبك بنجاح!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0a193c] mb-2">
                تهانينا! رقم الطلب: <span className="text-blue-600 font-mono">{orderId}</span>
              </h3>
              <p className="text-slate-600 text-sm font-semibold mb-6 leading-relaxed">
                تم تسجيل حجزك لباقة <strong className="text-blue-900">{planTitle}</strong> بقيمة <strong className="text-emerald-700">{finalPrice} درهم</strong>. اضغط أدناه للانتقال الفوري إلى واتساب لمتابعة تفاصيل التنفيذ والبدء مباشرة.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                <button
                  onClick={handleProceedWhatsApp}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <WhatsAppIcon size={22} />
                  <span>متابعة الطلب على واتساب فوراً</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </div>
          ) : (
            /* MAIN 2-COLUMN CHECKOUT FORM */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* ==================================================== */}
              {/* COLUMN 1 (Right in RTL / Col span 5): ORDER DETAILS  */}
              {/* ==================================================== */}
              <div className="lg:col-span-5 flex flex-col gap-4 bg-slate-50/80 rounded-3xl p-4 sm:p-6 border border-slate-200/80">
                
                {/* Header with Purple Document Icon */}
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center shadow-xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-[#0a193c]">
                    تفاصيل الطلب
                  </h3>
                </div>

                {/* Plan Banner Pill with Image */}
                <div className="relative rounded-2xl bg-gradient-to-r from-[#061230] via-[#0c235c] to-[#071333] border border-blue-400/40 p-4 text-white shadow-md overflow-hidden">
                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-slate-900 shadow">
                      <Image
                        src={planImage}
                        alt={planTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/40 text-[10px] font-black text-cyan-300 inline-block mb-1">
                        {planTitle}
                      </span>
                      <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                        {planSubtitle}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2 py-1">
                  {planFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs font-bold text-slate-800 leading-snug">
                      <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="pt-3 border-t border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>سعر الباقة:</span>
                    <span className="font-mono text-sm text-[#0a193c]">{rawNumericPrice} درهم</span>
                  </div>

                  {/* Coupon Code Input */}
                  <div className="flex items-center gap-2 pt-1 pb-1">
                    <input
                      type="text"
                      placeholder="كود الخصم (مثل SPEED20)"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono outline-none focus:border-blue-500 uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      تطبيق
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>الخصم المطبق:</span>
                    <span className="font-mono text-sm">
                      {couponApplied ? `-${discountAmount} درهم` : "0 درهم"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-base sm:text-lg font-black text-[#0a193c]">
                    <span>الإجمالي:</span>
                    <span className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 font-mono">
                      {finalPrice} درهم
                    </span>
                  </div>
                </div>

                {/* Agreement Pill */}
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3 flex items-center gap-2.5 text-[11px] font-bold text-blue-900">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    باختيارك هذه الباقة فأنت توافق على{" "}
                    <button
                      type="button"
                      onClick={() => onOpenPolicyModal?.("terms")}
                      className="underline text-blue-700 hover:text-blue-900 font-black cursor-pointer"
                    >
                      الشروط والأحكام
                    </button>{" "}
                    و
                    <button
                      type="button"
                      onClick={() => onOpenPolicyModal?.("privacy")}
                      className="underline text-blue-700 hover:text-blue-900 font-black cursor-pointer"
                    >
                      سياسة الخصوصية
                    </button>
                    .
                  </span>
                </div>

              </div>

              {/* ==================================================== */}
              {/* COLUMN 2 (Left in RTL / Col span 7): PAYMENT METHOD  */}
              {/* ==================================================== */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                
                {/* Header: Payment Method */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 text-lg sm:text-xl font-black text-[#0a193c]">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span>طريقة الدفع</span>
                    </div>
                    <p className="text-xs text-slate-500 font-bold mt-0.5">
                      اختر طريقة الدفع المناسبة لك لإتمام عملية الشراء بأمان
                    </p>
                  </div>
                </div>

                {/* 4 Payment Method Tabs (NO Cash on Delivery!) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  
                  {/* Tab 1: Bank Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`relative p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-blue-600 bg-blue-50/60 shadow-[0_4px_15px_rgba(37,99,235,0.18)]"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <span className="text-xs font-black text-[#0a193c]">بطاقة بنكية</span>
                  </button>

                  {/* Tab 2: PayPal */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`relative p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === "paypal"
                        ? "border-blue-600 bg-blue-50/60 shadow-[0_4px_15px_rgba(37,99,235,0.18)]"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    {paymentMethod === "paypal" && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                    <span className="text-sm font-black text-[#003087] font-mono tracking-tight">PayPal</span>
                    <span className="text-xs font-black text-[#0a193c]">باي بال</span>
                  </button>

                  {/* Tab 3: YouCan Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("youcan")}
                    className={`relative p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === "youcan"
                        ? "border-blue-600 bg-blue-50/60 shadow-[0_4px_15px_rgba(37,99,235,0.18)]"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    {paymentMethod === "youcan" && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                    <span className="text-[12px] font-black text-emerald-600 font-mono">YouCan Pay</span>
                    <span className="text-xs font-black text-[#0a193c]">يوكان باي</span>
                  </button>

                  {/* Tab 4: CMI المغرب */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cmi")}
                    className={`relative p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === "cmi"
                        ? "border-blue-600 bg-blue-50/60 shadow-[0_4px_15px_rgba(37,99,235,0.18)]"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    {paymentMethod === "cmi" && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                    <span className="text-sm font-black text-[#0066b2] font-mono tracking-tight">CMI</span>
                    <span className="text-xs font-black text-[#0a193c]">بوابة CMI المغرب</span>
                  </button>

                </div>

                {/* FORM BODY BASED ON SELECTED PAYMENT METHOD */}
                <form onSubmit={handleSubmitOrder} className="space-y-4 pt-1">
                  
                  {/* Customer Information (Shared across all methods) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1">
                        الاسم الكامل *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="الاسم الكامل"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:border-blue-500 focus:bg-white transition-all pl-9"
                        />
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1">
                        رقم الهاتف / واتساب للتواصل *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          placeholder="+212 6 XX XX XX XX"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:border-blue-500 focus:bg-white transition-all pl-9 text-right"
                        />
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      </div>
                    </div>
                  </div>

                  {/* SPECIFIC METHOD INPUTS */}
                  {paymentMethod === "card" && (
                    <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 space-y-3.5 animate-in fade-in duration-200">
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#0a193c] flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-blue-600" />
                          <span>معلومات البطاقة البنكية</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-black text-[#1a1f71] bg-white px-2 py-0.5 rounded border border-slate-200">VISA</span>
                          <span className="text-[10px] font-black text-[#eb001b] bg-white px-2 py-0.5 rounded border border-slate-200">Mastercard</span>
                        </div>
                      </div>

                      {/* Card Number */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          رقم البطاقة (Card Number)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            dir="ltr"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold outline-none focus:border-blue-500 tracking-wider pl-10"
                          />
                          <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        </div>
                      </div>

                      {/* Expiry & CVV */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 block mb-1">
                            تاريخ الانتهاء
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              dir="ltr"
                              placeholder="MM / YY"
                              value={expiryDate}
                              onChange={handleExpiryChange}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold outline-none focus:border-blue-500 pl-9"
                            />
                            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-600 block mb-1">
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
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold outline-none focus:border-blue-500 pl-9 tracking-widest"
                            />
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          </div>
                        </div>
                      </div>

                      {/* Cardholder Name */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          اسم حامل البطاقة (Cardholder Name)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="الاسم كما هو مكتوب على البطاقة"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold outline-none focus:border-blue-500 pl-9 uppercase"
                          />
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        </div>
                      </div>

                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 text-center space-y-2.5 animate-in fade-in duration-200">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm mx-auto flex items-center justify-center font-black text-xl text-[#003087] font-mono">
                        P
                      </div>
                      <h4 className="font-black text-sm text-[#0a193c]">
                        الدفع الآمن عبر حساب PayPal
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                        سيتم توجيهك بأمان لإتمام عملية السداد وحماية المشتري لضمان استلام متجرك الإلكتروني.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "youcan" && (
                    <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 text-center space-y-2.5 animate-in fade-in duration-200">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm mx-auto flex items-center justify-center font-black text-lg text-emerald-600 font-mono">
                        YouCan
                      </div>
                      <h4 className="font-black text-sm text-[#0a193c]">
                        بوابة YouCan Pay المغربية الرسمية
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                        دفع فوري ومؤتمت ومحمي عبر منصة YouCan Pay لجميع البطاقات الوطنية والدولية.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "cmi" && (
                    <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 text-center space-y-2.5 animate-in fade-in duration-200">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm mx-auto flex items-center justify-center font-black text-lg text-[#0066b2] font-mono">
                        CMI
                      </div>
                      <h4 className="font-black text-sm text-[#0a193c]">
                        بوابة CMI (Centre Monétique Interbancaire) المغربية
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                        الدفع البنكي المغربي الرسمي الآمن (التجاري وفا بنك، البنك الشعبي، بنك إفريقيا، CIH) مع بروتوكول 3D-Secure.
                      </p>
                    </div>
                  )}

                  {/* BIG VIBRANT GRADIENT CTA BUTTON */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#00b4d8] via-[#2563eb] to-[#7928ca] hover:from-[#00c8ff] hover:via-[#3b82f6] hover:to-[#9333ea] text-white font-black text-base sm:text-lg shadow-[0_6px_25px_rgba(37,99,235,0.45)] hover:shadow-[0_8px_35px_rgba(37,99,235,0.7)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>جاري معالجة وتأكيد الطلب...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 text-cyan-200" />
                          <span>إتمام الشراء الآن ({finalPrice} درهم)</span>
                          <ArrowLeft className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>

                </form>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* BOTTOM RIBBON: THE 5 LUXURY CUSTOM-DESIGNED ICONS        */}
          {/* ======================================================== */}
          <div className="pt-4 border-t border-slate-200/80">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-center">
              
              {/* Feature 1 */}
              <div className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] shadow-sm shrink-0">
                  <div className="w-full h-full bg-[#ebf5ff] rounded-full flex items-center justify-center">
                    <span className="text-base">⚙️</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-[11px] font-black text-[#0a193c]">تخصيص متكامل</h5>
                  <p className="text-[9.5px] text-slate-500 font-bold">حسب احتياجاتك</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-sm shrink-0">
                  <div className="w-full h-full bg-[#ebf5ff] rounded-full flex items-center justify-center">
                    <span className="text-base">📈</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-[11px] font-black text-[#0a193c]">تصميم احترافي</h5>
                  <p className="text-[9.5px] text-slate-500 font-bold">يتناسب مع علامتك</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px] shadow-sm shrink-0">
                  <div className="w-full h-full bg-[#ebf5ff] rounded-full flex items-center justify-center">
                    <span className="text-base">🚀</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-[11px] font-black text-[#0a193c]">تسليم سريع</h5>
                  <p className="text-[9.5px] text-slate-500 font-bold">في أقل وقت ممكن</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 p-[2px] shadow-sm shrink-0">
                  <div className="w-full h-full bg-[#ebf5ff] rounded-full flex items-center justify-center">
                    <span className="text-base">🛡️</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-[11px] font-black text-[#0a193c]">أمان وحماية</h5>
                  <p className="text-[9.5px] text-slate-500 font-bold">لحسابك وبياناتك</p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[2px] shadow-sm shrink-0">
                  <div className="w-full h-full bg-[#ebf5ff] rounded-full flex items-center justify-center">
                    <span className="text-base">🎧</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-[11px] font-black text-[#0a193c]">دعم فني مستمر</h5>
                  <p className="text-[9.5px] text-slate-500 font-bold">نحن معك دائماً</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* BOTTOM SUB-FOOTER OF CHECKOUT                            */}
        {/* ======================================================== */}
        <div className="text-center py-1">
          <div className="inline-flex items-center gap-2 text-xs font-black text-white/80 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shadow-inner">
            <span className="text-cyan-400 font-bold">ECOM SPEED PRO</span>
            <span>•</span>
            <span className="text-blue-200">شريكك في النجاح الرقمي</span>
          </div>
        </div>

      </div>
    </div>
  );
}
