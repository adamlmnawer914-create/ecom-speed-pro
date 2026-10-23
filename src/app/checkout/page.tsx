"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Shield,
  Lock,
  User,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  ChevronLeft,
  Mail,
  UploadCloud,
  ImageIcon,
  Trash2,
  Copy,
  Rocket,
  MapPin,
  Store,
  ShoppingBag,
  Tag,
  Home,
} from "lucide-react";
import Logo from "@/components/Logo";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import YouCanPayEmbed from "@/components/YouCanPayEmbed";
import PolicyModal from "@/components/PolicyModal";
import PayPalIcon from "@/components/PayPalIcon";
import { getPayPalPaymentLink } from "@/constants/paypal";

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

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Query params or default values
  const paramPlan = searchParams.get("plan");
  const paramPrice = searchParams.get("price");
  const paramWhiteLabel = searchParams.get("white_label") === "true";

  const [selectedPlan, setSelectedPlan] = useState(
    paramPlan || "متجر متكامل + لوحة تحكم — السوق المحلي 🇲🇦 (3,000 MAD)"
  );
  const [selectedPrice, setSelectedPrice] = useState(paramPrice || "3000 درهم");
  const [whiteLabel, setWhiteLabel] = useState(paramWhiteLabel);

  // Keep state synced if URL params change
  useEffect(() => {
    if (paramPlan) setSelectedPlan(paramPlan);
    if (paramPrice) setSelectedPrice(paramPrice);
    if (searchParams.get("white_label") !== null) {
      setWhiteLabel(searchParams.get("white_label") === "true");
    }
  }, [paramPlan, paramPrice, searchParams]);

  // Stepper Stage: 1 = Merchant Info, 2 = Product Info & YouCan Pay
  const [step, setStep] = useState<1 | 2>(1);

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

  // Submission state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("ESP-" + Math.floor(100000 + Math.random() * 900000));
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(3);

  // Policy modal
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyType, setPolicyType] = useState<"privacy" | "terms" | "guarantee">("privacy");

  const handleOpenPolicy = (type: "privacy" | "terms" | "guarantee") => {
    setPolicyType(type);
    setPolicyModalOpen(true);
  };

  // Plan visual characteristics & Market identification with Buyout Fees
  const getPlanDetails = () => {
    const p = (selectedPlan || "").toLowerCase();
    const pr = parseInt((selectedPrice || "").replace(/[^0-9]/g, ""), 10) || 0;

    // 1. International Landing (4,500 DH base + 2,500 DH White-label = 7,000 DH)
    if (p.includes("هبوط") && (p.includes("دولي") || p.includes("intl") || pr === 4500 || pr === 7000)) {
      return {
        id: "landing-intl",
        title: "صفحة هبوط — السوق الدولي 🌐",
        subtitle: "صفحة هبوط احترافية مخصصة للأسواق الدولية بمعدل تحويل مرتفع",
        image: "/images/international_landing_showcase.jpg",
        badgeColor: "from-emerald-500 to-teal-600 text-white",
        market: "🌐 US / CA / AU",
        basePrice: 4500,
        whiteLabelFee: 2500,
      };
    }

    // 2. International Store (9,000 DH base + 5,000 DH White-label = 14,000 DH)
    if (
      (p.includes("متجر") && (p.includes("دولي") || p.includes("intl"))) ||
      p.includes("saas") ||
      p.includes("متقدمة") ||
      p.includes("vip") ||
      pr === 9000 ||
      pr === 14000 ||
      pr === 8500 ||
      pr === 10000 ||
      pr === 5000
    ) {
      return {
        id: "store-intl",
        title: "متجر متكامل + لوحة تحكم — الدولي 🌐",
        subtitle: "حل برمجي VIP متكامل للأسواق الدولية مع بوابات دفع عالمية",
        image: "/images/international_store_showcase.jpg",
        badgeColor: "from-amber-400 to-yellow-500 text-slate-950",
        market: "🌐 US / CA / AU",
        basePrice: 9000,
        whiteLabelFee: 5000,
      };
    }

    // 3. Local Store (3,000 DH base + 1,500 DH White-label = 4,500 DH)
    if ((p.includes("متجر") && (p.includes("محلي") || p.includes("local"))) || pr === 3000) {
      return {
        id: "store-local",
        title: "متجر متكامل + لوحة تحكم — المحلي 🇲🇦",
        subtitle: "متجر متكامل متعدد المنتجات مع لوحة تحكم للعلامات التجارية في المغرب",
        image: "/images/morocco_store_showcase.jpg",
        badgeColor: "from-cyan-500 to-blue-600 text-white",
        market: "🇲🇦 المغرب",
        basePrice: 3000,
        whiteLabelFee: 1500,
      };
    }

    // 4. Local Landing (1,500 DH base + 1,000 DH White-label = 2,500 DH) — default
    return {
      id: "landing-local",
      title: "صفحة هبوط — السوق المحلي 🇲🇦",
      subtitle: "تصميم مخصص لتحقيق أعلى معدل تحويل لمنتج رابح في السوق المغربي",
      image: "/images/morocco_landing_showcase.jpg",
      badgeColor: "from-rose-500 to-purple-600 text-white",
      market: "🇲🇦 المغرب",
      basePrice: 1500,
      whiteLabelFee: 1000,
    };
  };

  const planDetails = getPlanDetails();
  const planTitle = planDetails.title;
  const planSubtitle = planDetails.subtitle;
  const planImage = planDetails.image;
  const planBadgeColor = planDetails.badgeColor;

  // Dynamic price calculation strictly considering White-label
  const rawNumericPrice = planDetails.basePrice + (whiteLabel ? planDetails.whiteLabelFee : 0);
  const formattedPrice = `${rawNumericPrice.toLocaleString()} درهم`;

  // PayPal Payment Link Check
  const paypalUrl = getPayPalPaymentLink(rawNumericPrice, selectedPlan);
  const isPayPalPlan = Boolean(paypalUrl);

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

    if (!orderPhone.trim()) {
      setOrderPhone(customerPhone.trim());
    }

    setStep(2);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

  // Submit Order Stage 2 — saves order to DB, then YouCanPayEmbed handles payment
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderPhone.trim()) {
      alert("يرجى إدخال رقم الهاتف الذي ستستقبل فيه مبيعات وطلبيات متجرك");
      return;
    }

    setIsProcessing(true);

    const orderPayload = {
      customer_name: customerName.trim(),
      customer_city: customerCity.trim(),
      phone_number: customerPhone.trim(),
      customer_email: customerEmail.trim() || undefined,
      store_name: storeName.trim() || `متجر ${customerName.trim()}`,
      product_price: productPrice.trim() || "غير محدد",
      order_phone: orderPhone.trim() || customerPhone.trim(),
      plan_tier: planTitle,
      amount: rawNumericPrice,
      currency: "MAD",
      payment_method: isPayPalPlan ? "PayPal" : "YouCan Pay",
      payment_status: isPayPalPlan ? "unpaid" : "pending",
      product_images: productImages,
      product_notes: productNotes.trim(),
      white_label: whiteLabel,
      status: isPayPalPlan ? "pending_payment" : "pending",
    };

    let savedOrder: any = null;

    // ─── 1. Call YouCan Pay route (creates order in DB) ──────────────────────
    try {
      const res = await fetch("/api/payment/youcan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      if (data && data.success && data.order) {
        savedOrder = data.order;
      }
    } catch (err) {
      console.warn("YouCan Pay API error, using fallback:", err);
    }

    // ─── 2. Fallback: save via /api/orders ───────────────────────────────────
    if (!savedOrder) {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...orderPayload,
            payment_method: isPayPalPlan ? "PayPal" : "YouCan Pay",
            payment_status: isPayPalPlan ? "unpaid" : "pending",
            status: isPayPalPlan ? "pending_payment" : "pending",
          }),
        });
        const data = await res.json();
        if (data && data.success && data.order) {
          savedOrder = data.order;
        }
      } catch (err) {
        console.warn("Fallback API sync error:", err);
      }
    }

    // ─── 3. Client-side fallback ─────────────────────────────────────────────
    if (!savedOrder) {
      const clientUuid =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : "esp-" + Math.random().toString(36).substring(2, 15);
      savedOrder = {
        id: clientUuid,
        order_number: "#ESP-" + Math.floor(10000 + Math.random() * 90000),
        customer_name: customerName.trim(),
        customer_city: customerCity.trim(),
        phone_number: customerPhone.trim(),
        customer_email: customerEmail.trim(),
        store_name: storeName.trim() || `متجر ${customerName.trim()}`,
        product_price: productPrice.trim() || "غير محدد",
        order_phone: orderPhone.trim() || customerPhone.trim(),
        plan_tier: planTitle,
        amount: rawNumericPrice,
        currency: "MAD",
        payment_method: isPayPalPlan ? "PayPal" : "YouCan Pay",
        payment_status: isPayPalPlan ? "unpaid" : "pending",
        white_label: whiteLabel,
        product_images: productImages,
        product_notes: productNotes.trim(),
        status: isPayPalPlan ? "pending_payment" : "pending",
        delivered_url: null,
        created_at: new Date().toISOString(),
      };
    }

    setCreatedOrder(savedOrder);
    setOrderId(savedOrder.order_number || orderId);
    setIsProcessing(false);

    try {
      const existing = localStorage.getItem("ecom_speed_pro_orders");
      const list = existing ? JSON.parse(existing) : [];
      const legacyItem = {
        id: savedOrder.id || orderId,
        orderNumber: savedOrder.order_number || orderId,
        customerName: customerName.trim(),
        customerCity: customerCity.trim(),
        phoneNumber: customerPhone.trim(),
        customerEmail: customerEmail.trim(),
        storeName: storeName.trim() || `متجر ${customerName.trim()}`,
        productPrice: productPrice.trim() || "غير محدد",
        orderPhone: orderPhone.trim() || customerPhone.trim(),
        plan: planTitle,
        planTier: planTitle,
        price: rawNumericPrice,
        amount: rawNumericPrice,
        paymentMethod: isPayPalPlan ? "PayPal" : "YouCan Pay",
        paymentStatus: isPayPalPlan ? "unpaid" : "pending",
        white_label: whiteLabel,
        whiteLabel: whiteLabel,
        productImages: productImages,
        productNotes: productNotes.trim(),
        status: isPayPalPlan ? "pending_payment" : "pending",
        deliveredUrl: null,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("ecom_speed_pro_orders", JSON.stringify([legacyItem, ...list]));
    } catch (err) {
      console.warn("Storage warning:", err);
    }

    // إذا كانت الباقة مدعومة برابط دفع PayPal (مثل صفحة الهبوط المحلية المغربية 1500 درهم)، يتم فتح الرابط والتوجيه مباشرة للعميل
    if (paypalUrl) {
      const targetUrl = paypalUrl.trim();
      const opened = window.open(targetUrl, "_blank");
      if (!opened || opened.closed || typeof opened.closed === "undefined") {
        window.location.href = targetUrl;
      }
    }
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

  return (
    <div className="min-h-screen bg-[#eaf4fd] text-[#0c1833] py-5 sm:py-8 md:py-12 px-3 sm:px-6 relative flex flex-col justify-between">
      {/* Background Soft Glows & Store Wallpaper */}
      <div className="fixed inset-0 w-full h-full bg-[url('/images/store_bg_master.webp')] bg-cover bg-top bg-no-repeat -z-20 pointer-events-none opacity-30" />
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[1100px] mx-auto flex flex-col items-center gap-4 sm:gap-6" dir="rtl">
        {/* ======================================================== */}
        {/* TOP VIP PAGE HEADER: BRAND LOGO + SECURITY + BACK BUTTON  */}
        {/* ======================================================== */}
        <div className="w-full flex items-center justify-between px-2 sm:px-4 py-2 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-sm">
          {/* Logo & Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1.5 rounded-2xl bg-white shadow-xs border border-slate-200 hover:scale-105 transition-transform" title="الصفحة الرئيسية">
              <Logo size="sm" showSlogan={false} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Link href="/" className="text-sm sm:text-base font-black text-slate-900 tracking-wide hover:text-blue-600 transition-colors">
                  ECOM SPEED PRO
                </Link>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-black text-blue-700">
                  بوابة الدفع الآمن YouCan Pay 🇲🇦
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-bold hidden sm:block">
                منصة رسمية معتمدة • تسليم قياسي خلال 48 ساعة ⚡
              </span>
            </div>
          </div>

          {/* SSL & YouCan Pay Badge */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-black shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>بوابة معتمدة YouCan Pay • تشفير 256-Bit SSL آمن 100%</span>
          </div>

          {/* Return to Store Link */}
          <Link
            href="/"
            className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-black text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shadow-xs"
            title="العودة للصفحة الرئيسية للمتجر"
          >
            <Home className="w-4 h-4 text-slate-600" />
            <span>العودة للمتجر</span>
          </Link>
        </div>

        {/* ======================================================== */}
        {/* MAIN LUXURY CHECKOUT CARD — PURE CRISP WHITE THEME       */}
        {/* ======================================================== */}
        <div className="relative w-full rounded-[30px] sm:rounded-[36px] bg-white border-2 border-slate-200 shadow-[0_30px_90px_rgba(0,20,60,0.12)] text-slate-900 p-5 sm:p-7 md:p-8 overflow-hidden">
          {/* Accent Line on Top */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 pointer-events-none" />

          {isSuccess ? (
            /* ======================================================== */
            /* SUCCESS CONFIRMATION SCREEN (شاشة نجاح بيضاء أنيقة)       */
            /* ======================================================== */
            <div className="py-6 sm:py-10 px-4 flex flex-col items-center text-center max-w-xl mx-auto animate-in zoom-in-95 duration-300">
              {/* Pulsing 3D Check Jewel */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-400 p-[3px] shadow-[0_0_40px_rgba(16,185,129,0.35)] mb-5 animate-bounce">
                <div className="w-full h-full bg-emerald-50 rounded-[22px] flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 drop-shadow-sm" />
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>تم تأكيد الدفع عبر YouCan Pay وإنشاء رابط المتابعة السري!</span>
              </span>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
                رقم طلبك الرسمي:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-mono">
                  {createdOrder?.order_number || orderId}
                </span>
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold mb-4 leading-relaxed max-w-md">
                تم تسجيل طلبك لباقة <strong className="text-slate-900">{planTitle}</strong> بنجاح.
                تم تخصيص رابط تتبع سري ومحمي برمز مشفر لتتبع حالة متجرك واستلامه فور جهوزه.
              </p>

              {/* Secret Tracking Link Capsule & Auto Redirect Pill */}
              {createdOrder?.id && (
                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-4 mb-4 flex flex-col gap-2.5 text-right shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-blue-600" />
                      <span>رابطك السري المخصص لمتابعة واستلام المتجر (UUID):</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-200">
                      محمي وسري 100%
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
                    <span className="flex-1 font-mono text-[11px] text-slate-800 truncate text-left font-bold" dir="ltr">
                      {typeof window !== "undefined" ? window.location.origin : ""}/order/{createdOrder.id}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySecretLink}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-200" />
                          <span className="text-[11px] text-white">تم النسخ ✓</span>
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
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-blue-800 font-bold bg-blue-50 border border-blue-200/80 py-1.5 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    <span>
                      جاري نقلك تلقائياً لصفحة التتبع السرية خلال{" "}
                      <strong className="text-blue-700 font-mono text-xs">{redirectTimer}</strong> ثوانٍ...
                    </span>
                  </div>
                </div>
              )}

              {/* Package Summary Capsule in Success Screen */}
              <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 mb-5 flex items-center justify-between text-right shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-xs">
                    <Image src={planImage} alt={planTitle} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">{planTitle}</span>
                    <span className="text-[11px] text-slate-600 font-bold block">
                      التاجر: {customerName} • {customerCity}
                    </span>
                    {whiteLabel && (
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 border border-purple-200">
                        <Shield className="w-2.5 h-2.5 text-purple-600" />
                        <span>شامل إزالة حقوق المطور (White-Label)</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-left font-mono text-sm sm:text-base font-black text-emerald-700">
                  {formattedPrice}
                </div>
              </div>

              {/* Action Buttons — Tracking Only */}
              <div className="flex flex-col items-center gap-3 w-full">
                {createdOrder?.id && (
                  <button
                    onClick={() => router.push(`/order/${createdOrder.id}`)}
                    className="w-full px-7 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer animate-pulse"
                  >
                    <Rocket className="w-5 h-5" />
                    <span>متابعة وتتبع حالة متجرك الآن 🚀</span>
                  </button>
                )}

                <Link
                  href="/"
                  className="text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors cursor-pointer underline underline-offset-2"
                >
                  العودة للصفحة الرئيسية
                </Link>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* 2-STAGE LUXURY ORDER PAGE FLOW                           */
            /* ======================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* ==================================================== */}
              {/* RIGHT COLUMN (Col 5): SELECTED PACKAGE & SUMMARY     */}
              {/* ==================================================== */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* 1. Selected Package Master Card */}
                <div className="relative rounded-3xl bg-slate-50 border border-slate-200 p-4 sm:p-5 shadow-sm overflow-hidden group">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm shrink-0">
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
                      <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight truncate">
                        {planTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                        {planSubtitle}
                      </p>
                    </div>
                  </div>

                  {/* Guaranteed Trust Pillars */}
                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>تسليم متكامل وجاهز للبيع خلال 48 ساعة ⚡</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>
                        {isPayPalPlan
                          ? "دفع فوري وآمن 100% عبر PayPal 🅿️"
                          : "ربط أوتوماتيكي لبوابة الدفع YouCan Pay 🇲🇦"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>رابط تتبع سري فوري وخاص بك فقط 🔒</span>
                    </div>
                  </div>

                  {/* Price Banner Ribbon + Breakdown */}
                  <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                    {whiteLabel && (
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-1">
                        <span>سعر الباقة الأساسي:</span>
                        <span className="font-mono">{planDetails.basePrice.toLocaleString()} د.م</span>
                      </div>
                    )}
                    {whiteLabel && (
                      <div className="flex items-center justify-between text-[11px] font-bold text-purple-700 px-1">
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-purple-600" />
                          <span>رسوم إزالة حقوق المطور:</span>
                        </span>
                        <span className="font-mono">+{planDetails.whiteLabelFee.toLocaleString()} د.م</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-0.5">
                      <div>
                        <span className="text-xs text-slate-600 font-bold block">المبلغ المستحق للدفع:</span>
                        {whiteLabel && (
                          <span className="text-[10px] font-black text-purple-700 block">شامل إزالة الحقوق ✓</span>
                        )}
                      </div>
                      <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-mono text-base sm:text-lg font-black shadow-md shadow-blue-500/25">
                        {formattedPrice}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Luxury Bank Card Mockup */}
                <div className="relative rounded-3xl bg-gradient-to-br from-[#1e40af] via-[#1d4ed8] to-[#1e3a8a] border-2 border-blue-400/30 p-5 shadow-xl text-white overflow-hidden transition-all duration-300">
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Card Header */}
                  <div className="relative z-10 flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-yellow-300/80 shadow-md flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-700/60" />
                        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-amber-700/60" />
                        <div className="w-4 h-3 rounded border border-amber-800/40" />
                      </div>
                      <span className="text-blue-100 text-xs font-mono font-bold tracking-widest opacity-80">
                        ))))
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black tracking-wider text-white">
                        {isPayPalPlan ? "PayPal 🅿️" : "YouCan Pay 🇲🇦"}
                      </span>
                      <div className="flex -space-x-1.5">
                        <span className="w-4 h-4 rounded-full bg-[#0079C1] inline-block opacity-90 shadow-sm" />
                        <span className="w-4 h-4 rounded-full bg-[#003087] inline-block opacity-90 shadow-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="relative z-10 mb-5 text-left font-mono tracking-widest text-base sm:text-lg font-black text-white drop-shadow-sm" dir="ltr">
                    •••• •••• •••• ••••
                  </div>

                  {/* Card Footer: Merchant Name & City */}
                  <div className="relative z-10 flex items-end justify-between text-xs">
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-blue-200 font-bold block mb-0.5">
                        التاجر / العميل
                      </span>
                      <span className="font-bold text-white uppercase tracking-wide truncate max-w-[170px] block">
                        {customerName ? customerName : "التاجر المميز"}
                      </span>
                    </div>

                    <div className="text-left" dir="ltr">
                      <span className="text-[9px] uppercase tracking-wider text-blue-200 font-bold block mb-0.5">
                        المدينة
                      </span>
                      <span className="font-bold text-blue-100 truncate max-w-[100px] block">
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
                <div className="flex items-center justify-between gap-2 p-2 sm:p-2.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-xs">
                  {/* Step 1 Tab Button */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      step === 1
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-400"
                        : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-black ${step === 1 ? "bg-white text-blue-700" : "bg-slate-200 text-slate-700"}`}>
                      1
                    </div>
                    <span>المرحلة 1: بيانات التاجر</span>
                    {customerName.trim() && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                  </button>

                  <ChevronLeft className="w-4 h-4 text-slate-400 shrink-0" />

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
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-400"
                        : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-black ${step === 2 ? "bg-white text-blue-700" : "bg-slate-200 text-slate-700"}`}>
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
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-blue-600" />
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          المرحلة الأولى: بيانات التاجر الأساسية (Merchant Information)
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 font-bold">
                        أدخل معلوماتك الشخصية للتواصل وتخصيص ملكية المتجر ورابط التتبع السري لك.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Name */}
                      <div>
                        <label className="text-xs font-black text-slate-800 block mb-1">
                          الاسم الكامل للتاجر *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="مثال: يوسف الإدريسي"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full px-3.5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-all pl-9 shadow-inner"
                          />
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-xs font-black text-slate-800 block mb-1">
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
                            className="w-full px-3.5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-all pl-9 text-right shadow-inner"
                          />
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      {/* WhatsApp / Phone */}
                      <div>
                        <label className="text-xs font-black text-slate-800 block mb-1">
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
                            className="w-full px-3.5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-mono font-bold text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-all pl-9 text-right shadow-inner"
                          />
                          <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      {/* Moroccan City */}
                      <div>
                        <label className="text-xs font-black text-slate-800 block mb-1">
                          المدينة بالمغرب *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            list="page-moroccan-cities-list"
                            placeholder="اختر أو اكتب مدينتك (مثال: الدار البيضاء)"
                            value={customerCity}
                            onChange={(e) => setCustomerCity(e.target.value)}
                            className="w-full px-3.5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-all pl-9 shadow-inner"
                          />
                          <datalist id="page-moroccan-cities-list">
                            {MOROCCAN_CITIES.map((c) => (
                              <option key={c} value={c} />
                            ))}
                          </datalist>
                          <MapPin className="w-4 h-4 text-amber-500 absolute left-3 top-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* ── خيار إزالة حقوق المطور (White-Label) في نموذج البيانات ── */}
                    <div
                      onClick={() => setWhiteLabel((prev) => !prev)}
                      className={`w-full rounded-2xl p-3 sm:p-4 border-2 transition-all duration-300 cursor-pointer select-none flex items-center justify-between gap-3 ${
                        whiteLabel
                          ? "bg-purple-50/95 border-purple-400 shadow-[0_4px_18px_rgba(168,85,247,0.18)] ring-2 ring-purple-300/40"
                          : "bg-purple-50/30 border-purple-200/80 hover:bg-purple-50/60 hover:border-purple-300"
                      }`}
                    >
                      {/* Pill Switch */}
                      <div className="shrink-0">
                        <div
                          className={`w-11 h-6 rounded-full transition-colors duration-300 flex items-center px-0.5 ${
                            whiteLabel ? "bg-purple-600 justify-end" : "bg-slate-300 justify-start"
                          }`}
                        >
                          <div className="w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300" />
                        </div>
                      </div>

                      {/* Text details */}
                      <div className="text-right flex-1 min-w-0">
                        <div className="flex items-center justify-end gap-1.5 text-xs sm:text-sm font-black text-purple-950">
                          <span>طلب خيار إزالة حقوق المطور (White-label)</span>
                          <Shield className="w-4 h-4 text-purple-600 fill-purple-100" />
                        </div>
                        <div className="text-[11px] sm:text-xs font-bold text-purple-700/90 leading-tight mt-0.5">
                          تسليم المتجر كعلامة تجارية مستقلة لك بدون أي شعار لوكالتنا (+{planDetails.whiteLabelFee.toLocaleString()} د.م)
                        </div>
                      </div>
                    </div>

                    {/* Stage 1 CTA Button: Proceed to Product Info (Stage 2) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
                      >
                        <span>المتابعة لمعلومات المنتج والدفع (الخطوة 2 من 2)</span>
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Trust line */}
                    <div className="text-center pt-1">
                      <p className="text-[11px] text-slate-500 font-bold flex items-center justify-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span>بياناتك الشخصية مشفرة ومحمية 100% وفق سياسة الخصوصية المغربية والدولية</span>
                      </p>
                    </div>
                  </form>
                ) : (
                  /* ==================================================== */
                  /* STAGE 2a — معلومات المنتج                             */
                  /* ==================================================== */
                  !createdOrder ? (
                    <form onSubmit={handleSubmitOrder} className="space-y-3.5 animate-in fade-in duration-300">
                      {/* Stage 2 Header with Back Button */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4 text-blue-600" />
                          <div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900">
                              المرحلة الثانية: مواصفات المنتج والمتجر
                            </h4>
                            <span className="text-[10px] text-slate-500 font-bold block">
                              التاجر: {customerName} ({customerCity})
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span>تعديل بيانات التاجر</span>
                        </button>
                      </div>

                      {/* 1. Store / Product Name & Selling Price */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-black text-slate-800 block mb-1">
                            اسم متجرك أو منتجك (Store / Product Name)
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="مثال: متجر الساعات الفاخرة"
                              value={storeName}
                              onChange={(e) => setStoreName(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-all pl-9 shadow-inner"
                            />
                            <Store className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-black text-slate-800 block mb-1">
                            ثمن بيع المنتج للزبائن بالدرهم (Selling Price) *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="مثال: 299 درهم أو 349 MAD"
                              value={productPrice}
                              onChange={(e) => setProductPrice(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white shadow-inner transition-all pl-9"
                            />
                            <Tag className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                          </div>
                        </div>
                      </div>

                      {/* 2. Order Reception Phone */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-blue-600" />
                            <span>رقم الهاتف الذي يستقبل فيه التاجر مبيعاته وطلبياته *</span>
                          </label>
                          <span className="text-[10px] text-blue-600 font-bold">
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
                            className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-mono font-bold text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-all pl-9 text-right shadow-inner"
                          />
                          <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                        </div>
                        <p className="text-[10.5px] text-slate-500 font-semibold mt-1">
                          ⚡ هذا هو الرقم الذي سنربطه في متجرك لتصلك عليه إشعارات وطلبيات الزبائن مباشرة عبر واتساب.
                        </p>
                      </div>

                      {/* 3. Product Images Upload */}
                      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                            <span>رفع صور المنتج (Product Images)</span>
                          </label>
                          <span className="text-[10px] text-slate-500 font-bold">
                            {productImages.length > 0 ? `${productImages.length} صور تم اختيارها` : "يمكنك رفع عدة صور"}
                          </span>
                        </div>

                        <label className="flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 border-dashed border-slate-300 bg-white hover:bg-slate-100 cursor-pointer transition-colors group">
                          <UploadCloud className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-bold text-slate-700">
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

                        {productImages.length > 0 && (
                          <div className="flex items-center gap-2 overflow-x-auto py-1">
                            {productImages.map((img, idx) => (
                              <div
                                key={idx}
                                className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0 group shadow-xs"
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

                        <input
                          type="text"
                          placeholder="ملاحظات إضافية حول المنتج أو تصميمه (اختياري)"
                          value={productNotes}
                          onChange={(e) => setProductNotes(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600"
                        />
                      </div>

                      {/* ── خيار إزالة الحقوق (White-label Toggle - مطابق للتصميم المرفق) ── */}
                      <div
                        onClick={() => setWhiteLabel(!whiteLabel)}
                        className={`w-full rounded-2xl p-3 sm:p-3.5 border transition-all duration-300 cursor-pointer select-none flex items-center justify-between gap-3 ${
                          whiteLabel
                            ? "bg-purple-50/90 border-purple-300 shadow-[0_4px_18px_rgba(168,85,247,0.18)] ring-1 ring-purple-400/40"
                            : "bg-purple-50/30 border-purple-200/60 hover:bg-purple-50/60 hover:border-purple-300"
                        }`}
                      >
                        {/* Left: Modern Pill Toggle Switch */}
                        <div className="shrink-0">
                          <div
                            className={`w-11 h-6 rounded-full transition-colors duration-300 flex items-center px-0.5 cursor-pointer ${
                              whiteLabel ? "bg-purple-600 justify-end" : "bg-slate-300 justify-start"
                            }`}
                          >
                            <div className="w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300" />
                          </div>
                        </div>

                        {/* Right: Text Description */}
                        <div className="text-right flex-1 min-w-0">
                          <div className="flex items-center justify-end gap-1.5 text-xs sm:text-[13px] font-black text-purple-950">
                            <span>طلب خيار إزالة الحقوق (White-label)</span>
                            <span className="text-purple-600">🛡️</span>
                          </div>
                          <div className="text-[10px] sm:text-[11px] font-bold text-purple-700/85 leading-tight mt-0.5">
                            تسليم المتجر كعلامة تجارية مستقلة للتاجر بدون أي شعار للمنصة (+{planDetails.whiteLabelFee.toLocaleString()} د.م)
                          </div>
                        </div>
                      </div>

                      {/* CTA — Save order & go to payment */}
                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className={
                            isPayPalPlan
                              ? "w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#003087] via-[#0079C1] to-[#00457C] hover:from-[#002569] hover:via-[#00629c] hover:to-[#003087] text-white font-black text-sm sm:text-base shadow-lg shadow-blue-900/30 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 group"
                              : "w-full py-4 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 group"
                          }
                        >
                          {isProcessing ? (
                            <>
                              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>{isPayPalPlan ? "جاري تسجيل طلبك وفتح PayPal..." : "جاري تسجيل طلبك..."}</span>
                            </>
                          ) : isPayPalPlan ? (
                            <>
                              <PayPalIcon size={22} className="text-white group-hover:scale-110 transition-transform" />
                              <span>ادفع الآن عبر PayPal</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-5 h-5 text-blue-100" />
                              <span>متابعة إلى بوابة الدفع الآمن YouCan Pay ←</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* ==================================================== */
                    /* STAGE 2b — بوابة الدفع (PayPal أو YouCan Pay)        */
                    /* ==================================================== */
                    <div className="space-y-3.5 animate-in fade-in duration-300">
                      {/* Header */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-blue-600" />
                          <div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900">
                              {isPayPalPlan
                                ? "المرحلة الأخيرة: الدفع الآمن عبر PayPal 🅿️"
                                : "المرحلة الأخيرة: الدفع الآمن عبر YouCan Pay 🇲🇦"}
                            </h4>
                            <span className="text-[10px] text-blue-600 font-bold block">
                              طلب رقم {createdOrder?.order_number} • {formattedPrice}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCreatedOrder(null)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span>تعديل</span>
                        </button>
                      </div>

                      {isPayPalPlan ? (
                        <div className="p-6 rounded-3xl bg-gradient-to-b from-blue-50/90 via-white to-blue-50/50 border-2 border-blue-200 shadow-lg text-center flex flex-col items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#003087] to-[#0079C1] p-[3px] shadow-lg shadow-blue-900/25 flex items-center justify-center">
                            <PayPalIcon size={34} className="text-white" />
                          </div>

                          <div>
                            <h4 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                              تم تسجيل وتأكيد طلبك بنجاح!
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 font-bold max-w-md mx-auto leading-relaxed">
                              رقم طلبك الرسمي: <strong className="font-mono text-blue-700">{createdOrder?.order_number || orderId}</strong>.
                              <br />
                              اضغط بالأسفل للمتابعة وإتمام الدفع الآمن فوراً عبر PayPal.
                            </p>
                          </div>

                          <a
                            href={paypalUrl || "https://www.paypal.com/ncp/payment/79PH2FAVN728E"}
                            className="w-full max-w-md py-4 px-6 rounded-full bg-gradient-to-r from-[#003087] via-[#0079C1] to-[#00457C] hover:from-[#002569] hover:via-[#00629c] text-white font-black text-sm sm:text-base shadow-xl shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                          >
                            <PayPalIcon size={22} className="text-white" />
                            <span>المتابعة إلى صفحة PayPal لإتمام الدفع ({formattedPrice}) ←</span>
                          </a>

                          {createdOrder?.id && (
                            <Link
                              href={`/order/${createdOrder.id}`}
                              className="text-xs text-blue-600 hover:text-blue-800 font-bold underline underline-offset-4 flex items-center gap-1.5"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              <span>رابطك السري المخصص لمتابعة حالة متجرك واستلامه</span>
                            </Link>
                          )}
                        </div>
                      ) : (
                        <YouCanPayEmbed
                          createdOrderId={createdOrder?.id || ""}
                          amount={rawNumericPrice}
                          currency="MAD"
                          customerName={customerName}
                          customerEmail={customerEmail}
                          customerPhone={customerPhone}
                          customerCity={customerCity}
                          planTitle={planTitle}
                          formattedPrice={formattedPrice}
                          isProcessing={isProcessing}
                          onProcessingChange={setIsProcessing}
                          onSuccess={(order: any) => {
                            setCreatedOrder(order);
                            setOrderId(order.order_number || order.id);
                            setIsSuccess(true);
                          }}
                        />
                      )}

                      {/* Safety WhatsApp link */}
                      <div className="text-center pt-1">
                        <p className="text-xs text-slate-600 font-bold flex items-center justify-center gap-1.5">
                          <span>واجهتك مشكلة في الدفع؟</span>
                          <a
                            href={`https://wa.me/212762357491?text=${encodeURIComponent(
                              `مرحباً، أود المساعدة في إتمام الدفع للباقة: ${planTitle} (${formattedPrice}).`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-black flex items-center gap-1"
                          >
                            <WhatsAppIcon size={13} />
                            <span>تواصل مع الدعم الفني</span>
                          </a>
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Bottom Policies Bar */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-bold">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenPolicy("privacy")}
                className="hover:text-blue-600 transition-colors underline cursor-pointer"
              >
                سياسة الخصوصية
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleOpenPolicy("terms")}
                className="hover:text-blue-600 transition-colors underline cursor-pointer"
              >
                الشروط والأحكام
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleOpenPolicy("guarantee")}
                className="hover:text-blue-600 transition-colors underline cursor-pointer"
              >
                ضمان استرداد الأموال 100%
              </button>
            </div>
            <span>ECOM SPEED PRO © 2026 • جميع الحقوق محفوظة</span>
          </div>
        </div>
      </div>

      {/* Interactive Policy Modal */}
      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        type={policyType}
      />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#eaf4fd] flex items-center justify-center text-slate-800" dir="rtl">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl flex items-center gap-3">
            <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="font-bold text-sm">جاري تحميل صفحة الدفع الآمنة...</span>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
