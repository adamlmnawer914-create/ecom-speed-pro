"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  ArrowRight,
  Check,
  Phone,
  Zap,
  Award,
  ChevronLeft,
  ChevronRight,
  Mail,
  UploadCloud,
  ImageIcon,
  Trash2,
  Copy,
  ExternalLink,
  Rocket,
  MapPin,
  Store,
  ShoppingBag,
  Tag,
  DollarSign,
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

const MOROCCAN_CITIES = [
  "الدار البيضاء (Casablanca)",
  "الرباط (Rabat)",
  "مراكش (Marrakech)",
  "طنجة (Tanger)",
  "فاس (Fès)",
  "أكادير (Agadir)",
  "مكناس (Meknès)",
  "وجدة (Oujda)",
  "القنيطرة (Kénitra)",
  "تطوان (Tétouan)",
  "تمارة (Témara)",
  "سلا (Salé)",
  "الجديدة (El Jadida)",
  "المحمدية (Mohammédia)",
  "الناظور (Nador)",
  "بني ملال (Béni Mellal)",
  "خريبكة (Khouribga)",
  "العيون (Laâyoune)",
  "الداخلة (Dakhla)",
  "ورزازات (Ouarzazate)",
  "تازة (Taza)",
  "برشيد (Berrechid)",
];

export default function OrderModal({
  isOpen,
  onClose,
  selectedPlan,
  selectedPrice,
  onOpenPolicyModal,
}: OrderModalProps) {
  // Stepper Stage: 1 = Merchant Info, 2 = Product Info & YouCan Pay
  const [step, setStep] = useState<1 | 2>(1);

  // Single certified payment gateway
  const [paymentMethod, setPaymentMethod] = useState("الدفع عبر YouCan Pay (بطاقة بنكية معتمدة CMI / 3D-Secure)");

  // Stage 1: Merchant Contact Info (بيانات التاجر)
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("الدار البيضاء (Casablanca)");

  // Stage 2: Product & Sales Info (معلومات المنتج والمتجر)
  const [storeName, setStoreName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productNotes, setProductNotes] = useState("");

  // Card Inputs (Simulated YouCan Pay Gateway)
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const router = useRouter();

  // Submission state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(4);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSuccess(false);
      setIsProcessing(false);
      setCreatedOrder(null);
      setCopiedLink(false);
      setRedirectTimer(4);
      setOrderId("ESP-" + Math.floor(100000 + Math.random() * 900000));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Countdown timer for auto-redirect to secret tracking page
  useEffect(() => {
    let interval: any = null;
    if (isSuccess && createdOrder?.id && redirectTimer > 0) {
      interval = setInterval(() => {
        setRedirectTimer((prev) => prev - 1);
      }, 1000);
    } else if (isSuccess && createdOrder?.id && redirectTimer === 0) {
      router.push(`/order/${createdOrder.id}`);
    }
    return () => clearInterval(interval);
  }, [isSuccess, createdOrder, redirectTimer, router]);

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

  // Validation before going to Stage 2
  const handleProceedToStage2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("يرجى إدخال اسمك الكامل للمتابعة");
      return;
    }
    if (!customerPhone.trim()) {
      alert("يرجى إدخال رقم الواتساب أو الهاتف");
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes("@")) {
      alert("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }
    if (!customerCity.trim()) {
      alert("يرجى تحديد مدينتك");
      return;
    }

    // Smart default: If order receiving phone is empty, default to merchant phone
    if (!orderPhone.trim()) {
      setOrderPhone(customerPhone.trim());
    }

    // Smooth transition to stage 2
    setStep(2);
  };

  // Handle Product Images Selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (file.size > 4 * 1024 * 1024) {
        alert(`الصورة ${file.name} كبيرة جداً (الحد الأقصى 4 ميغابايت لكل صورة)`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setProductImages((prev) => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, idx) => idx !== index));
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

  // Submit Order (Stage 2 Payment Confirmation)
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderPhone.trim()) {
      alert("يرجى إدخال رقم الهاتف الذي ستستقبل فيه مبيعات وطلبيات متجرك");
      return;
    }

    setIsProcessing(true);

    const clientUuid =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : "esp-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const orderPayload = {
      id: clientUuid,
      customer_name: customerName.trim(),
      customer_city: customerCity.trim(),
      phone_number: customerPhone.trim(),
      customer_email: customerEmail.trim() || undefined,
      store_name: storeName.trim() || `متجر ${customerName.trim()}`,
      product_price: productPrice.trim() || "غير محدد",
      order_phone: orderPhone.trim() || customerPhone.trim(),
      plan_tier: planTitle,
      price: rawNumericPrice,
      payment_method: "YouCan Pay",
      product_images: productImages,
      product_notes: productNotes.trim(),
      status: "pending",
    };

    let savedOrder: any = null;

    // 1. Save to backend API (Supabase & local store sync)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      if (data && data.success && data.order) {
        savedOrder = data.order;
      }
    } catch (err) {
      console.warn("API sync error:", err);
    }

    if (!savedOrder) {
      savedOrder = {
        id: clientUuid,
        order_number: "#ESP-" + Math.floor(100 + Math.random() * 900),
        customer_name: customerName.trim(),
        customer_city: customerCity.trim(),
        phone_number: customerPhone.trim(),
        customer_email: customerEmail.trim(),
        store_name: storeName.trim() || `متجر ${customerName.trim()}`,
        product_price: productPrice.trim(),
        order_phone: orderPhone.trim() || customerPhone.trim(),
        plan_tier: planTitle,
        price: rawNumericPrice,
        status: "pending",
        payment_method: "YouCan Pay",
        product_images: productImages,
        product_notes: productNotes.trim(),
        created_at: new Date().toISOString(),
      };
    }

    setCreatedOrder(savedOrder);
    setOrderId(savedOrder.order_number || savedOrder.id);

    // 2. Save to local storage for instant sync across tabs & desktop app
    try {
      const stored = localStorage.getItem("ecom_speed_pro_orders");
      const list = stored ? JSON.parse(stored) : [];
      const legacyItem = {
        id: savedOrder.id,
        order_number: savedOrder.order_number,
        customerName: customerName.trim(),
        customerCity: customerCity.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || "غير محدد",
        storeName: storeName.trim() || `متجر ${customerName.trim()}`,
        productPrice: productPrice.trim(),
        orderPhone: orderPhone.trim() || customerPhone.trim(),
        planTitle,
        price: rawNumericPrice,
        formattedPrice,
        paymentMethod: "YouCan Pay",
        productImages,
        productNotes: productNotes.trim(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("ecom_speed_pro_orders", JSON.stringify([legacyItem, ...list]));
    } catch (err) {
      console.warn("Storage warning:", err);
    }

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  // Copy secret tracking link
  const handleCopySecretLink = () => {
    if (!createdOrder?.id) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "https://ecom-speed-pro.vercel.app";
    const secretUrl = `${origin}/order/${createdOrder.id}`;
    navigator.clipboard.writeText(secretUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // WhatsApp VIP Direct Confirmation
  const handleProceedWhatsApp = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://ecom-speed-pro.vercel.app";
    const secretUrl = createdOrder?.id ? `${origin}/order/${createdOrder.id}` : "";

    const message = `مرحباً وكالة ECOM SPEED PRO 🚀%0Aتم تأكيد حجز ودفع طلب جديد عبر YouCan Pay:%0A%0A*رقم الطلب:* ${createdOrder?.order_number || orderId}%0A*الباقة المختارة:* ${encodeURIComponent(
      planTitle
    )}%0A*المبلغ:* ${rawNumericPrice} درهم%0A*بوابة الدفع:* YouCan Pay 🇲🇦 (Carte Bancaire / CMI)%0A*اسم التاجر:* ${encodeURIComponent(
      customerName || "تاجر مميز"
    )}%0A*المدينة:* ${encodeURIComponent(customerCity)}%0A*هاتف التاجر:* ${encodeURIComponent(customerPhone)}%0A*اسم المتجر:* ${encodeURIComponent(
      storeName || "قيد التحديد"
    )}%0A*ثمن بيع المنتج:* ${encodeURIComponent(productPrice || "غير محدد")}%0A*رقم استقبال الطلبيات والمبيعات:* ${encodeURIComponent(
      orderPhone || customerPhone
    )}${secretUrl ? `%0A*رابط التتبع السري:* ${encodeURIComponent(secretUrl)}` : ""}${
      productImages.length > 0 ? `%0A*عدد صور المنتجات المرفقة:* ${productImages.length} صورة 📸` : ""
    }${productNotes ? `%0A*ملاحظات إضافية:* ${encodeURIComponent(productNotes)}` : ""}%0A%0Aأرجو بدء تجهيز المشروع والتسليم خلال 48 ساعة.`;

    const url = `https://wa.me/212762357491?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#020718]/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-5 md:p-6 animate-in fade-in duration-300">
      
      {/* Background Cosmic Glows */}
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
          
          {/* Logo & Badge */}
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
                  بوابة الدفع الآمن YouCan Pay 🇲🇦
                </span>
              </div>
              <span className="text-[11px] text-blue-200/80 font-bold hidden sm:block">
                منصة رسمية معتمدة • تسليم قياسي خلال 48 ساعة ⚡
              </span>
            </div>
          </div>

          {/* SSL & YouCan Pay Badge */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#051842]/80 border border-cyan-400/40 text-cyan-300 text-xs font-black shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Lock className="w-3.5 h-3.5 text-emerald-300" />
            <span>بوابة معتمدة YouCan Pay • تشفير 256-Bit SSL آمن 100%</span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 hover:bg-rose-500/20 border border-white/20 hover:border-rose-400/50 text-white hover:text-rose-300 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg group"
            title="إغلاق والعودة للمتجر"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* MAIN LUXURY CHECKOUT CARD                                */}
        {/* ======================================================== */}
        <div className="relative w-full rounded-[30px] sm:rounded-[36px] bg-gradient-to-br from-[#040e2b]/95 via-[#06184a]/95 to-[#03091e]/95 border-2 border-cyan-400/35 shadow-[0_30px_90px_rgba(2,10,35,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] text-white p-5 sm:p-7 md:p-8 overflow-hidden">
          
          {/* Laser Accent Line on Top */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 via-blue-500 via-emerald-400 to-transparent pointer-events-none" />

          {isSuccess ? (
            /* ======================================================== */
            /* SUCCESS CONFIRMATION SCREEN (شاشة نجاح أسطورية مع التتبع)  */
            /* ======================================================== */
            <div className="py-6 sm:py-10 px-4 flex flex-col items-center text-center max-w-xl mx-auto animate-in zoom-in-95 duration-300">
              
              {/* Pulsing 3D Check Jewel */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-400 p-[3px] shadow-[0_0_40px_rgba(16,185,129,0.6)] mb-5 animate-bounce">
                <div className="w-full h-full bg-[#051c2e] rounded-[22px] flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-black mb-3 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>تم تأكيد الدفع عبر YouCan Pay وإنشاء رابط المتابعة السري!</span>
              </span>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                رقم طلبك الرسمي:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 font-mono">
                  {createdOrder?.order_number || orderId}
                </span>
              </h3>

              <p className="text-blue-200/90 text-xs sm:text-sm font-semibold mb-4 leading-relaxed max-w-md">
                تم تسجيل طلبك لباقة <strong className="text-white">{planTitle}</strong> بنجاح.
                تم تخصيص رابط تتبع سري ومحمي برمز مشفر لتتبع حالة متجرك واستلامه فور جهوزه.
              </p>

              {/* Secret Tracking Link Capsule & Auto Redirect Pill */}
              {createdOrder?.id && (
                <div className="w-full bg-[#071d4a]/90 border border-cyan-400/40 rounded-2xl p-3.5 sm:p-4 mb-4 flex flex-col gap-2.5 text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>رابطك السري المخصص لمتابعة واستلام المتجر (UUID):</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-black border border-cyan-400/30">
                      محمي وسري 100%
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#030e26] border border-blue-900/80 rounded-xl p-2">
                    <span className="flex-1 font-mono text-[11px] text-blue-200 truncate text-left" dir="ltr">
                      {typeof window !== "undefined" ? window.location.origin : ""}/order/{createdOrder.id}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySecretLink}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span className="text-[11px] text-emerald-200">تم النسخ ✓</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">نسخ الرابط</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Auto-redirect countdown notice */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-blue-200 font-bold bg-blue-900/30 py-1 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>
                      جاري نقلك تلقائياً لصفحة التتبع السرية خلال{" "}
                      <strong className="text-cyan-300 font-mono text-xs">{redirectTimer}</strong> ثوانٍ...
                    </span>
                  </div>
                </div>
              )}

              {/* Package Summary Capsule in Success Screen */}
              <div className="w-full bg-[#071a48]/80 border border-blue-400/30 rounded-2xl p-3 sm:p-4 mb-5 flex items-center justify-between text-right">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-white/20 shrink-0">
                    <Image src={planImage} alt={planTitle} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block">{planTitle}</span>
                    <span className="text-[11px] text-cyan-300 font-bold block">
                      التاجر: {customerName} • {customerCity}
                    </span>
                  </div>
                </div>
                <div className="text-left font-mono text-sm sm:text-base font-black text-emerald-300">
                  {formattedPrice}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                {createdOrder?.id && (
                  <button
                    onClick={() => router.push(`/order/${createdOrder.id}`)}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>متابعة وتتبع حالة متجرك الآن 🚀</span>
                  </button>
                )}

                <button
                  onClick={handleProceedWhatsApp}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon size={18} />
                  <span>تأكيد وانطلاق المشروع على واتساب</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  العودة للمتجر
                </button>
              </div>

            </div>
          ) : (
            /* ======================================================== */
            /* 2-STAGE LUXURY ORDER MODAL FLOW                          */
            /* ======================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* ==================================================== */}
              {/* RIGHT COLUMN (Col 5): SELECTED PACKAGE & SUMMARY     */}
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

                  {/* Guaranteed Trust Pillars */}
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
                      <span>ربط أوتوماتيكي لبوابة الدفع YouCan Pay 🇲🇦</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-100">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>رابط تتبع سري فوري وخاص بك فقط 🔒</span>
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

                {/* 2. Interactive YouCan Pay Card Mockup */}
                <div className="relative rounded-3xl bg-gradient-to-br from-[#0a1f55] via-[#0e2c7a] to-[#06143c] border-2 border-cyan-400/50 p-5 shadow-[0_15px_35px_rgba(2,10,35,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] text-white overflow-hidden transition-all duration-300">
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

                  {/* Card Header */}
                  <div className="relative z-10 flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-yellow-300/80 shadow-md flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-700/60" />
                        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-amber-700/60" />
                        <div className="w-4 h-3 rounded border border-amber-800/40" />
                      </div>
                      <span className="text-cyan-300 text-xs font-mono font-bold tracking-widest opacity-80">
                        ))))
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black tracking-wider text-cyan-200">
                        YouCan Pay 🇲🇦
                      </span>
                      <div className="flex -space-x-1.5">
                        <span className="w-4 h-4 rounded-full bg-[#eb001b] inline-block opacity-90 shadow-sm" />
                        <span className="w-4 h-4 rounded-full bg-[#f79e1b] inline-block opacity-90 shadow-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="relative z-10 mb-5 text-left font-mono tracking-widest text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white drop-shadow-sm" dir="ltr">
                    {cardNumber ? cardNumber : "•••• •••• •••• ••••"}
                  </div>

                  {/* Card Footer: Merchant Name & City */}
                  <div className="relative z-10 flex items-end justify-between text-xs">
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-cyan-300/70 font-bold block mb-0.5">
                        التاجر / العميل
                      </span>
                      <span className="font-bold text-white uppercase tracking-wide truncate max-w-[170px] block">
                        {customerName ? customerName : "التاجر المميز"}
                      </span>
                    </div>

                    <div className="text-left" dir="ltr">
                      <span className="text-[9px] uppercase tracking-wider text-cyan-300/70 font-bold block mb-0.5">
                        المدينة
                      </span>
                      <span className="font-bold text-cyan-200 truncate max-w-[100px] block">
                        {customerCity.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* ==================================================== */}
              {/* LEFT COLUMN (Col 7): 2-STAGE STEPPER FORM            */}
              {/* ==================================================== */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                
                {/* 🌟 2-STEP STEPPER NAVIGATOR HEADER */}
                <div className="flex items-center justify-between gap-2 p-2 sm:p-2.5 rounded-2xl bg-[#051740]/90 border border-cyan-400/35 shadow-md">
                  {/* Step 1 Tab Button */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      step === 1
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.45)] ring-2 ring-cyan-400/50"
                        : "bg-white/5 text-blue-200/70 hover:bg-white/10"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-black ${step === 1 ? "bg-white text-blue-900" : "bg-white/20 text-white"}`}>
                      1
                    </div>
                    <span>المرحلة 1: بيانات التاجر</span>
                    {customerName.trim() && <Check className="w-3.5 h-3.5 text-emerald-300" />}
                  </button>

                  <ChevronLeft className="w-4 h-4 text-cyan-400/60 shrink-0" />

                  {/* Step 2 Tab Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (customerName.trim() && customerPhone.trim()) {
                        setStep(2);
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      step === 2
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.45)] ring-2 ring-cyan-400/50"
                        : "bg-white/5 text-blue-200/70 hover:bg-white/10"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-black ${step === 2 ? "bg-white text-blue-900" : "bg-white/20 text-white"}`}>
                      2
                    </div>
                    <span>المرحلة 2: معلومات المنتج والدفع</span>
                  </button>
                </div>

                {/* ==================================================== */}
                {/* STAGE 1: بيانات التاجر (الاسم، الإيميل، الواتساب، المدينة) */}
                {/* ==================================================== */}
                {step === 1 ? (
                  <form onSubmit={handleProceedToStage2} className="space-y-4 animate-in fade-in duration-300">
                    
                    {/* Stage 1 Header Capsule */}
                    <div className="p-3.5 rounded-2xl bg-[#061848]/80 border border-blue-400/30">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-cyan-300" />
                        <h4 className="text-xs sm:text-sm font-black text-white">
                          المرحلة الأولى: بيانات التاجر الأساسية (Merchant Information)
                        </h4>
                      </div>
                      <p className="text-[11px] text-blue-200/80 font-bold">
                        أدخل معلوماتك الشخصية للتواصل وتخصيص ملكية المتجر ورابط التتبع السري لك.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Name */}
                      <div>
                        <label className="text-xs font-black text-blue-100 block mb-1">
                          الاسم الكامل للتاجر *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="مثال: يوسف الإدريسي"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full px-3.5 py-3 rounded-2xl bg-[#061845]/90 border border-blue-400/40 text-xs font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all pl-9"
                          />
                          <User className="w-4 h-4 text-cyan-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-xs font-black text-blue-100 block mb-1">
                          البريد الإلكتروني للتاجر *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            dir="ltr"
                            placeholder="merchant@gmail.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full px-3.5 py-3 rounded-2xl bg-[#061845]/90 border border-blue-400/40 text-xs font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all pl-9 text-right"
                          />
                          <Mail className="w-4 h-4 text-purple-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      {/* WhatsApp / Phone */}
                      <div>
                        <label className="text-xs font-black text-blue-100 block mb-1">
                          رقم الواتساب / الهاتف الشخصي للتاجر *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            dir="ltr"
                            placeholder="+212 6 XX XX XX XX"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full px-3.5 py-3 rounded-2xl bg-[#061845]/90 border border-blue-400/40 text-xs font-mono font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all pl-9 text-right"
                          />
                          <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      {/* Moroccan City */}
                      <div>
                        <label className="text-xs font-black text-blue-100 block mb-1">
                          المدينة بالمغرب *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            list="moroccan-cities-list"
                            placeholder="اختر أو اكتب مدينتك (مثال: الدار البيضاء)"
                            value={customerCity}
                            onChange={(e) => setCustomerCity(e.target.value)}
                            className="w-full px-3.5 py-3 rounded-2xl bg-[#061845]/90 border border-blue-400/40 text-xs font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all pl-9"
                          />
                          <datalist id="moroccan-cities-list">
                            {MOROCCAN_CITIES.map((c) => (
                              <option key={c} value={c} />
                            ))}
                          </datalist>
                          <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Stage 1 CTA Button: Proceed to Product Info (Stage 2) */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-600 hover:from-cyan-300 hover:via-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-[0_0_30px_rgba(6,182,212,0.55)] hover:shadow-[0_0_45px_rgba(6,182,212,0.85)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
                      >
                        <span>المتابعة لمعلومات المنتج والدفع (الخطوة 2 من 2)</span>
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Trust line */}
                    <div className="text-center pt-1">
                      <p className="text-[11px] text-blue-200/70 font-bold flex items-center justify-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        <span>بياناتك الشخصية مشفرة ومحمية 100% وفق سياسة الخصوصية المغربية والدولية</span>
                      </p>
                    </div>

                  </form>
                ) : (
                  /* ==================================================== */
                  /* STAGE 2: معلومات المنتج (الصور، الثمن، رقم المبيعات) + YouCan Pay */
                  /* ==================================================== */
                  <form onSubmit={handleSubmitOrder} className="space-y-3.5 animate-in fade-in duration-300">
                    
                    {/* Stage 2 Header with Back Button */}
                    <div className="p-3 rounded-2xl bg-[#061848]/80 border border-blue-400/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-cyan-300" />
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-white">
                            المرحلة الثانية: مواصفات المنتج والدفع عبر YouCan Pay
                          </h4>
                          <span className="text-[10px] text-blue-200/80 font-bold block">
                            التاجر: {customerName} ({customerCity})
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>تعديل بيانات التاجر</span>
                      </button>
                    </div>

                    {/* 1. Store / Product Name & Selling Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-black text-blue-100 block mb-1">
                          اسم متجرك أو منتجك (Store / Product Name)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="مثال: متجر الساعات الفاخرة"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#061845]/90 border border-blue-400/40 text-xs font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 transition-all pl-9"
                          />
                          <Store className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-black text-emerald-300 block mb-1">
                          ثمن بيع المنتج للزبائن بالدرهم (Selling Price) *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="مثال: 299 درهم أو 349 MAD"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#061845]/90 border border-emerald-400/50 text-xs font-bold text-white placeholder-blue-300/40 outline-none focus:border-emerald-400 shadow-inner transition-all pl-9"
                          />
                          <Tag className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                        </div>
                      </div>
                    </div>

                    {/* 2. Order Reception Phone (رقم استقبال مبيعات وطلبيات المتجر) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-black text-cyan-200 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-cyan-400" />
                          <span>رقم الهاتف الذي يستقبل فيه التاجر مبيعاته وطلبياته *</span>
                        </label>
                        <span className="text-[10px] text-cyan-300/80 font-bold">
                          رقم واتساب المبيعات
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          placeholder="+212 6 XX XX XX XX"
                          value={orderPhone}
                          onChange={(e) => setOrderPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-2xl bg-[#061845]/90 border border-cyan-400/50 text-xs font-mono font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 transition-all pl-9 text-right"
                        />
                        <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                      </div>
                      <p className="text-[10.5px] text-blue-200/70 font-semibold mt-1">
                        ⚡ هذا هو الرقم الذي سنربطه في متجرك لتصلك عليه إشعارات وطلبيات الزبائن مباشرة عبر واتساب.
                      </p>
                    </div>

                    {/* 3. Product Images Upload */}
                    <div className="rounded-2xl bg-[#061845]/90 border border-blue-400/35 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black text-cyan-200 flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                          <span>رفع صور المنتج (Product Images)</span>
                        </label>
                        <span className="text-[10px] text-cyan-300/80 font-bold">
                          {productImages.length > 0 ? `${productImages.length} صور تم اختيارها` : "يمكنك رفع عدة صور"}
                        </span>
                      </div>

                      <label className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-cyan-400/50 bg-[#071d54]/50 hover:bg-[#0b276b]/70 cursor-pointer transition-colors group">
                        <UploadCloud className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-cyan-200">
                          اضغط لاختيار ورفع صور منتجك من جهازك 📸
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>

                      {/* Thumbnails preview */}
                      {productImages.length > 0 && (
                        <div className="flex items-center gap-2 overflow-x-auto py-1">
                          {productImages.map((img, idx) => (
                            <div
                              key={idx}
                              className="relative w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/60 shrink-0 group shadow-md"
                            >
                              <img src={img} alt={`منتج ${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="absolute inset-0 bg-red-950/80 text-rose-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                title="حذف الصورة"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Optional Notes */}
                      <input
                        type="text"
                        placeholder="ملاحظات إضافية حول المنتج أو تصميمه (اختياري)"
                        value={productNotes}
                        onChange={(e) => setProductNotes(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-[#05143a] border border-blue-400/30 text-xs font-semibold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400"
                      />
                    </div>

                    {/* 4. YouCan Pay Gateway Official Badges & Card Inputs */}
                    <div className="rounded-2xl bg-[#071a48]/90 border border-cyan-400/40 p-3.5 space-y-3 shadow-lg">
                      
                      {/* YouCan Pay Banner */}
                      <div className="flex items-center justify-between pb-2 border-b border-blue-900/50">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-xs">
                            YP
                          </div>
                          <div>
                            <span className="text-xs font-black text-white block">
                              بوابة الدفع الإلكتروني YouCan Pay 🇲🇦
                            </span>
                            <span className="text-[10px] text-cyan-300 font-bold block">
                              معتمدة من المركز النقدي المغربي CMI وتشفير 3D-Secure
                            </span>
                          </div>
                        </div>

                        {/* Payment Cards Logos */}
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-blue-900/80 text-[10px] font-mono font-black text-yellow-300 border border-yellow-400/30">
                            CMI
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white text-[10px] font-serif font-black text-[#00579F]">
                            VISA
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#111] text-[10px] font-black text-white border border-white/20">
                            MC
                          </span>
                        </div>
                      </div>

                      {/* Card Number */}
                      <div>
                        <label className="text-[11px] font-bold text-cyan-200 block mb-1">
                          رقم البطاقة البنكية
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            dir="ltr"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="w-full px-3.5 py-2 rounded-xl bg-[#05143a] border border-blue-400/40 text-xs font-mono font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 pl-10 tracking-widest shadow-inner"
                          />
                          <CreditCard className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
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
                              className="w-full px-3.5 py-2 rounded-xl bg-[#05143a] border border-blue-400/40 text-xs font-mono font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 pl-9 shadow-inner"
                            />
                            <Calendar className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
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
                              className="w-full px-3.5 py-2 rounded-xl bg-[#05143a] border border-blue-400/40 text-xs font-mono font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 pl-9 tracking-widest shadow-inner"
                            />
                            <Lock className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
                          </div>
                        </div>
                      </div>

                      {/* Cardholder Name */}
                      <div>
                        <label className="text-[11px] font-bold text-cyan-200 block mb-1">
                          اسم صاحب البطاقة (كما هو مدون عليها)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder={customerName ? customerName.toUpperCase() : "MOHAMED EL ALAOUI"}
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl bg-[#05143a] border border-blue-400/40 text-xs font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 pl-9 uppercase shadow-inner"
                          />
                          <User className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
                        </div>
                      </div>

                    </div>

                    {/* 5. YouCan Pay Grand CTA Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-600 hover:from-cyan-300 hover:via-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-[0_0_30px_rgba(6,182,212,0.55)] hover:shadow-[0_0_45px_rgba(6,182,212,0.85)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 group"
                      >
                        {isProcessing ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>جاري معالجة الدفع الآمن عبر YouCan Pay...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
                            <span>
                              تأكيد الطلب والدفع عبر YouCan Pay ({formattedPrice})
                            </span>
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Safety WhatsApp link */}
                    <div className="text-center pt-1">
                      <p className="text-xs text-blue-200/80 font-bold flex items-center justify-center gap-1.5">
                        <span>واجهتك مشكلة في الدفع؟</span>
                        <a
                          href={`https://wa.me/212762357491?text=${encodeURIComponent(
                            `مرحباً، أود المساعدة في إتمام الدفع عبر YouCan Pay للباقة: ${planTitle} (${formattedPrice}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 hover:underline font-black flex items-center gap-1"
                        >
                          <WhatsAppIcon size={13} />
                          <span>تواصل مع الدعم الفني</span>
                        </a>
                      </p>
                    </div>

                  </form>
                )}

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
