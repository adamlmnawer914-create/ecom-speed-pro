"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Rocket,
  Code2,
  Layers,
  ArrowRight,
  Headphones,
  Lock,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface OrderData {
  id: string;
  order_number: string;
  customer_name: string;
  phone_number: string;
  plan_tier: string;
  status: "pending" | "in_progress" | "completed";
  delivered_url: string | null;
  payment_method?: string;
  product_notes?: string;
  created_at: string;
}

function OrderTrackingSkeleton() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#02133f] via-[#052b75] to-[#011440] text-white flex flex-col items-center justify-center p-4 font-sans"
      dir="rtl"
    >
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-[2px] shadow-[0_0_30px_rgba(6,182,212,0.6)]">
          <div className="w-full h-full bg-[#031338] rounded-[14px] flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-cyan-300 animate-spin" />
          </div>
        </div>
        <p className="text-sm font-black text-cyan-200">
          جاري استرجاع بيانات متجرك وحالة الإنجاز...
        </p>
      </div>
    </div>
  );
}

function OrderTrackingContent() {
  const routerParams = useParams();
  const orderId = (routerParams?.id as string) || "";

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [lastCheck, setLastCheck] = useState("");

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders?id=${orderId}&t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });

      let foundOrder: OrderData | null = null;

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.order) {
          foundOrder = data.order;
        }
      }

      // Check if order was explicitly deleted
      let isDeleted = false;
      try {
        const deletedRaw = localStorage.getItem("ecom_speed_pro_deleted_order_ids");
        if (deletedRaw) {
          const deletedArr = JSON.parse(deletedRaw);
          if (Array.isArray(deletedArr) && (deletedArr.includes(orderId) || deletedArr.includes(orderId.replace(/^#/, "")) || deletedArr.includes("#" + orderId.replace(/^#/, "")))) {
            isDeleted = true;
          }
        }
      } catch (e) {}

      if (isDeleted || res.status === 404) {
        // Clean from localStorage so it never resurrects
        try {
          const stored = localStorage.getItem("ecom_speed_pro_orders");
          if (stored) {
            const list = JSON.parse(stored);
            if (Array.isArray(list)) {
              localStorage.setItem(
                "ecom_speed_pro_orders",
                JSON.stringify(list.filter((item: any) => item && item.id !== orderId && item.order_number !== orderId && item.orderNumber !== orderId))
              );
            }
          }
        } catch (e) {}

        setOrder(null);
        setNotFound(true);
        return;
      }

      // If not returned by server (e.g. offline fallback), check client localStorage
      if (!foundOrder && !isDeleted) {
        try {
          const stored = localStorage.getItem("ecom_speed_pro_orders");
          if (stored) {
            const list = JSON.parse(stored);
            if (Array.isArray(list)) {
              const localMatch = list.find(
                (item: any) =>
                  item &&
                  (item.id === orderId ||
                    item.order_number === orderId ||
                    item.orderNumber === orderId)
              );
              if (localMatch) {
                foundOrder = {
                  id: localMatch.id,
                  order_number: localMatch.order_number || localMatch.orderNumber || `#ESP-101`,
                  customer_name: localMatch.customer_name || localMatch.customerName || "عميل مميز",
                  phone_number: localMatch.phone_number || localMatch.customerPhone || localMatch.phone || "",
                  plan_tier: localMatch.plan_tier || localMatch.planTitle || "المتجر القياسي (1,500 MAD)",
                  status: (localMatch.status === "completed" || localMatch.status === "paid") ? "completed" : (localMatch.status === "in_progress" ? "in_progress" : "pending"),
                  delivered_url: localMatch.delivered_url || localMatch.deliveredUrl || null,
                  payment_method: localMatch.payment_method || localMatch.paymentMethod || "بطاقة بنكية",
                  product_notes: localMatch.product_notes || localMatch.productNotes || "",
                  created_at: localMatch.created_at || localMatch.createdAt || new Date().toISOString(),
                };
              }
            }
          }
        } catch (e) {
          console.warn("Local storage order fallback error:", e);
        }
      }

      if (foundOrder) {
        setOrder(foundOrder);
        setNotFound(false);
        setLastCheck(
          new Date().toLocaleTimeString("ar-MA", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        );
      } else {
        setOrder(null);
        setNotFound(true);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      // Even on network error, check localStorage before declaring 404
      try {
        const stored = localStorage.getItem("ecom_speed_pro_orders");
        if (stored) {
          const list = JSON.parse(stored);
          const localMatch = list.find((item: any) => item && (item.id === orderId || item.order_number === orderId));
          if (localMatch) {
            setOrder({
              id: localMatch.id,
              order_number: localMatch.order_number || `#ESP-101`,
              customer_name: localMatch.customer_name || "عميل مميز",
              phone_number: localMatch.phone_number || "",
              plan_tier: localMatch.plan_tier || "المتجر القياسي",
              status: localMatch.status || "pending",
              delivered_url: localMatch.delivered_url || null,
              created_at: localMatch.created_at || new Date().toISOString(),
            });
            setNotFound(false);
            return;
          }
        }
      } catch (e) {}
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder();
      // Real-time live polling every 5 seconds to reflect status changes instantly
      const interval = setInterval(fetchOrder, 5000);
      return () => clearInterval(interval);
    }
  }, [orderId]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // ----------------------------------------------------
  // LOADING SKELETON STATE
  // ----------------------------------------------------
  if (loading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-[#02133f] via-[#052b75] to-[#011440] text-white flex flex-col items-center justify-center p-4 font-sans"
        dir="rtl"
      >
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-[2px] shadow-[0_0_30px_rgba(6,182,212,0.6)]">
            <div className="w-full h-full bg-[#031338] rounded-[14px] flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-cyan-300 animate-spin" />
            </div>
          </div>
          <p className="text-sm font-black text-cyan-200">
            جاري استرجاع بيانات متجرك وحالة الإنجاز...
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 404 NOT FOUND STATE (ELEGANT LUXURY SCREEN)
  // ----------------------------------------------------
  if (notFound || !order) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-[#02133f] via-[#052b75] to-[#011440] text-slate-800 p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans relative overflow-hidden"
        dir="rtl"
      >
        {/* Glow ambient rays */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white/95 border-2 border-white/80 shadow-[0_25px_70px_rgba(0,25,80,0.4)] p-6 sm:p-8 text-center backdrop-blur-2xl flex flex-col items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shadow-inner">
            <AlertCircle className="w-9 h-9 sm:w-11 sm:h-11 text-rose-500" />
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-700 mb-2">
              خطأ 404 • الرابط السري غير مسجل
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-[#0b1739]">
              لم يتم العثور على هذا الطلب
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-bold mt-2 max-w-md mx-auto leading-relaxed">
              تأكد من صحة الرابط السري الخاص بك، أو استخدم صفحة البحث العامة عبر رقم الواتساب ورمز OTP لاسترجاع متجرك.
            </p>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/track"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>البحث برقم الواتساب (OTP)</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>العودة للرئيسية</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // PROGRESS STAGES
  // ----------------------------------------------------
  const currentStep =
    order.status === "completed" ? 3 : order.status === "in_progress" ? 2 : 1;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#02133f] via-[#052b75] to-[#011440] text-slate-800 p-3 sm:p-5 lg:p-7 relative overflow-x-hidden font-sans selection:bg-cyan-500 selection:text-black"
      dir="rtl"
    >
      {/* Background Cosmic Ethereal Rays */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/25 via-blue-600/10 to-transparent" />
        <div className="absolute -top-32 right-1/4 w-[750px] h-[750px] bg-cyan-400/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 left-1/4 w-[750px] h-[750px] bg-blue-500/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1100px] mx-auto flex flex-col gap-5">
        
        {/* ======================================================== */}
        {/* TOP BAR / BRAND HEADER                                   */}
        {/* ======================================================== */}
        <header className="w-full flex items-center justify-between px-2 sm:px-4 py-2">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.6)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#031338] rounded-[14px] flex items-center justify-center overflow-hidden p-1">
                <Image
                  src="/images/ecom_letter_e_logo.png"
                  alt="ECOM SPEED PRO"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <span className="text-sm font-black text-white tracking-wider block">
                ECOM SPEED PRO
              </span>
              <span className="text-[10px] text-cyan-300 font-bold block">
                نظام تتبع وإطلاق المتاجر السحابية
              </span>
            </div>
          </Link>

          {/* Secure Guest Tracking Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-xl text-xs font-black">
            <Lock className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">رابط سري ومحمي للعميل</span>
            <span className="sm:hidden">رابط محمي</span>
          </div>
        </header>

        {/* ======================================================== */}
        {/* MAIN ORDER TRACKING WORKSTATION                          */}
        {/* ======================================================== */}
        <main className="rounded-[32px] bg-gradient-to-b from-[#f8fbff]/95 via-[#f1f6fd]/95 to-[#e8f1fc]/95 border-2 border-white/80 shadow-[0_25px_70px_rgba(0,25,80,0.3)] p-5 sm:p-7 lg:p-9 flex flex-col gap-7 backdrop-blur-2xl">
          
          {/* --- 1. HERO ORDER STATUS CARD --- */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-blue-100 pb-5">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800 font-mono">
                  {order.order_number}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-100 text-cyan-800">
                  {order.plan_tier}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0b1739] tracking-tight">
                مرحباً بك {order.customer_name} 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1">
                نتابع إنجاز وتطوير متجرك الإلكتروني لحظياً عبر هذا الرابط السري المخصص لك.
              </p>
            </div>

            {/* Copy Secret Link & Live Sync Status */}
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-2xl bg-white border border-[#cbe1f8] hover:border-blue-500 text-[#0b1739] font-black text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="نسخ الرابط السري لحفظه والعودة إليه لاحقاً"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">تم نسخ الرابط السري ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-blue-600" />
                    <span>نسخ الرابط السري لطلبك</span>
                  </>
                )}
              </button>
              {lastCheck && (
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>تحديث حي تلقائي ({lastCheck})</span>
                </span>
              )}
            </div>
          </div>

          {/* --- 2. 3-PHASE PROGRESS TRACKER BAR --- */}
          <div className="rounded-3xl bg-white border border-[#d2e4f8] p-5 sm:p-7 shadow-sm">
            <h2 className="text-sm sm:text-base font-black text-[#0b1739] mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>مراحل العمل وتجهيز المتجر</span>
            </h2>

            {/* Horizontal Step Indicator */}
            <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto mb-6">
              {/* Background Connecting Bar */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2 bg-slate-100 rounded-full -z-0">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-500 rounded-full transition-all duration-700"
                  style={{
                    width:
                      currentStep === 1
                        ? "15%"
                        : currentStep === 2
                        ? "55%"
                        : "100%",
                  }}
                />
              </div>

              {/* Step 1: قيد المراجعة 🟡 */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-md ${
                    currentStep >= 1
                      ? "bg-amber-400 text-slate-950 ring-4 ring-amber-100"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {currentStep > 1 ? (
                    <CheckCircle2 className="w-6 h-6 text-slate-950" />
                  ) : (
                    <span>1</span>
                  )}
                </div>
                <span className="text-xs font-black text-[#0b1739]">
                  قيد المراجعة 🟡
                </span>
                <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
                  تأكيد المتطلبات
                </span>
              </div>

              {/* Step 2: جاري التجهيز والبرمجة 🔵 */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-md ${
                    currentStep >= 2
                      ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {currentStep > 2 ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : (
                    <span>2</span>
                  )}
                </div>
                <span className="text-xs font-black text-[#0b1739]">
                  جاري التجهيز والبرمجة 🔵
                </span>
                <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
                  تطوير الواجهة والتصميم
                </span>
              </div>

              {/* Step 3: تم التسليم بنجاح 🟢 */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-md ${
                    currentStep >= 3
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-100 animate-bounce"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  <Rocket className="w-6 h-6" />
                </div>
                <span className="text-xs font-black text-[#0b1739]">
                  تم التسليم بنجاح 🟢
                </span>
                <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
                  متجرك جاهز للعمل
                </span>
              </div>
            </div>

            {/* Current Phase Message Box */}
            <div className="rounded-2xl bg-blue-50/70 border border-blue-200/60 p-4 text-xs font-bold text-slate-700 leading-relaxed">
              {currentStep === 1 && (
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping shrink-0" />
                  <p>
                    <strong>المرحلة الحالية:</strong> تم استلام طلبك وبدأت الإدارة في مراجعة بيانات المنتجات والتصميم المناسب لمشروعك.
                  </p>
                </div>
              )}
              {currentStep === 2 && (
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping shrink-0" />
                  <p>
                    <strong>المرحلة الحالية:</strong> فريق التطوير يعمل الآن على بناء وبرمجة متجرك وربط بوابات الدفع وقوالب السرعة القصوى.
                  </p>
                </div>
              )}
              {currentStep === 3 && (
                <div className="flex items-center gap-3 text-emerald-800">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <p>
                    <strong>تهانينا!</strong> تم الانتهاء بنجاح من كافة أعمال البرمجة وتجهيز المتجر وأصبح جاهزاً للاستلام فوراً!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* --- 3. FINAL STORE DELIVERY HERO SECTION (COMPLETED) --- */}
          {order.status === "completed" && (
            <div className="rounded-3xl bg-gradient-to-r from-[#031d56] via-[#072a78] to-[#041a4a] text-white p-6 sm:p-8 shadow-[0_15px_40px_rgba(2,16,56,0.6)] border-2 border-cyan-400/50 relative overflow-hidden">
              {/* Glow Accent */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-right">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md">
                      تم التسليم بنجاح • جاهز للإطلاق
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-amber-200">
                    متجرك الإلكتروني جاهز للاستلام الآن!
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-100/80 font-medium max-w-xl leading-relaxed">
                    تم إكمال جميع الإعدادات وربط البوابات وضبط سرعة التحميل الفائقة. يمكنك الآن الدخول لمتجرك ومعاينته مباشرة.
                  </p>
                </div>

                {/* THE PROMINENT DELIVERY BUTTON */}
                <div className="shrink-0 w-full md:w-auto">
                  <a
                    href={order.delivered_url || "https://ecom-speed-pro.vercel.app/"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Rocket className="w-5 h-5" />
                    <span>معاينة واستلام متجرك الآن 🚀</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* --- 4. ORDER SUMMARY & DETAILS GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box 1: معلومات الطلب */}
            <div className="rounded-2xl bg-white border border-[#d2e4f8] p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-blue-600" />
                <span>بيانات الحجز والطلب</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="font-bold text-slate-500">رقم الطلب:</span>
                  <span className="font-mono font-black text-[#0b1739]">{order.order_number}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="font-bold text-slate-500">الباقة المختارة:</span>
                  <span className="font-black text-blue-700">{order.plan_tier}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="font-bold text-slate-500">تاريخ الحجز:</span>
                  <span className="font-bold text-slate-700 font-mono">
                    {new Date(order.created_at).toLocaleDateString("ar-MA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-bold text-slate-500">طريقة الدفع:</span>
                  <span className="font-bold text-emerald-700">{order.payment_method || "دفع إلكتروني مؤكد"}</span>
                </div>
              </div>
            </div>

            {/* Box 2: الدعم الفني والتواصل المباشر */}
            <div className="rounded-2xl bg-white border border-[#d2e4f8] p-5 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-blue-600" />
                  <span>الدعم الفني واستفسارات مشروعك</span>
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                  هل ترغب في إضافة أي تعديلات على التصميم أو متابعة المشرف المباشر على مشروعك؟ تواصل معنا فوراً عبر واتساب.
                </p>
              </div>

              <a
                href={`https://wa.me/212762357491?text=${encodeURIComponent(
                  `مرحباً وكالة ECOM SPEED PRO، أتابع طلبي رقم ${order.order_number} الخاص بـ (${order.customer_name}) وأرغب في استفسار بخصوص المتجر.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <WhatsAppIcon size={16} />
                <span>مراسلة مهندس مشروعك عبر واتساب VIP</span>
              </a>
            </div>

          </div>

          {/* Footer note */}
          <div className="text-center text-[11px] text-slate-400 font-bold pt-2 border-t border-slate-200/60">
            رابط هذا الطلب فريد وسري ومشفر (UUID). احتفظ به دائماً في مفضلتك لمتابعة مراحل المتجر.
          </div>

        </main>

      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<OrderTrackingSkeleton />}>
      <OrderTrackingContent />
    </Suspense>
  );
}
