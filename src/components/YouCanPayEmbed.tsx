"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Lock, AlertCircle, Loader2, Copy, Check, CreditCard, Sparkles } from "lucide-react";

interface YouCanPayEmbedProps {
  createdOrderId: string;
  amount: number;
  currency?: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  customerCity?: string;
  planTitle: string;
  formattedPrice: string;
  isProcessing: boolean;
  onProcessingChange: (v: boolean) => void;
  onSuccess: (order: any) => void;
}

declare global {
  interface Window {
    YCPay: any;
  }
}

export default function YouCanPayEmbed({
  createdOrderId,
  amount,
  currency = "MAD",
  customerName,
  customerEmail,
  customerPhone,
  customerCity,
  planTitle,
  formattedPrice,
  isProcessing,
  onProcessingChange,
  onSuccess,
}: YouCanPayEmbedProps) {
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string>("");
  const [isSandbox, setIsSandbox] = useState(true);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [copiedCard, setCopiedCard] = useState(false);
  const ycPayRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── 1. Get a fresh token for this order from our backend ──────────────────
  const fetchToken = useCallback(async () => {
    if (!createdOrderId) return;
    setError(null);
    try {
      const params = new URLSearchParams({
        orderId: createdOrderId,
        amount: String(amount),
        currency,
        name: customerName,
        email: customerEmail || "",
        phone: customerPhone,
        city: customerCity || "المغرب",
      });
      const res = await fetch(`/api/payment/youcan-token?${params}`);
      const data = await res.json();
      if (data.success && data.tokenId) {
        setTokenId(data.tokenId);
        setPublicKey(data.publicKey || "");
        setIsSandbox(data.isSandbox ?? true);
      } else {
        setError("فشل في الاتصال ببوابة الدفع. حاول مرة أخرى.");
      }
    } catch (err) {
      setError("تعذّر الوصول إلى بوابة الدفع. تأكد من اتصالك بالإنترنت.");
    }
  }, [createdOrderId, amount, currency, customerName, customerEmail, customerPhone, customerCity]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  // ── 2. Load ycpay.js SDK ──────────────────────────────────────────────────
  useEffect(() => {
    if (sdkLoaded) return;
    const existing = document.querySelector('script[src*="ycpay.js"]');
    if (existing) {
      setSdkLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://pay.youcan.shop/js/ycpay.js";
    script.async = true;
    script.onload = () => setSdkLoaded(true);
    script.onerror = () =>
      setError("فشل تحميل SDK بوابة الدفع. تحقق من اتصالك بالإنترنت.");
    document.head.appendChild(script);
  }, [sdkLoaded]);

  // ── 3. Init YCPay instance & render credit card form ─────────────────────
  useEffect(() => {
    if (!sdkLoaded || !tokenId || !publicKey || !containerRef.current) return;
    if (ycPayRef.current) return; // already initialised

    try {
      // Clean error container if any previous messages exist
      const errBox = document.getElementById("ycpay-error-container");
      if (errBox) errBox.innerHTML = "";

      const instance = new window.YCPay(publicKey, {
        formContainer: "#ycpay-form-container",
        locale: "ar",
        isSandbox,
        errorContainer: "#ycpay-error-container",
      });
      instance.renderCreditCardForm();
      ycPayRef.current = instance;
      setSdkReady(true);
    } catch (err) {
      console.warn("YCPay init warning:", err);
      setSdkReady(true);
    }
  }, [sdkLoaded, tokenId, publicKey, isSandbox]);

  // ── 4. Pay handler ────────────────────────────────────────────────────────
  const handlePay = async () => {
    if (!ycPayRef.current || !tokenId || !createdOrderId) return;
    setPaying(true);
    onProcessingChange(true);
    setError(null);
    try {
      await ycPayRef.current.pay(tokenId);

      // Confirm order status in database & notify real-time admin broadcast
      try {
        await fetch("/api/payment/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: createdOrderId }),
        });
      } catch (confirmErr) {
        console.warn("Payment confirm broadcast warning:", confirmErr);
      }

      // Fetch freshest order data
      const res = await fetch(`/api/orders?id=${createdOrderId}`);
      const data = await res.json();
      if (data.success && data.order) {
        onSuccess(data.order);
      } else {
        onSuccess({ id: createdOrderId, order_number: "#ESP-" + createdOrderId.slice(0, 6).toUpperCase() });
      }
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.includes("listener already attached") || msg.includes("undefined")) {
        setError("يرجى التأكد من إدخال بطاقة تجربة صحيحة (4242...) وتاريخ مستقبلي (مثال: 12/28).");
      } else {
        setError(msg || "فشل الدفع. تحقق من بيانات بطاقتك وتاريخ الانتهاء وحاول مجدداً.");
      }
      setPaying(false);
      onProcessingChange(false);
    }
  };

  const handleCopyTestCard = () => {
    navigator.clipboard.writeText("4242424242424242");
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2500);
  };

  const isLoading = !tokenId || !sdkReady;

  return (
    <div className="rounded-3xl bg-white border-2 border-slate-200 p-4 sm:p-5 space-y-4 shadow-sm text-slate-900" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xs border border-blue-200">
            YP
          </div>
          <div>
            <span className="text-xs sm:text-sm font-black text-slate-900 block">
              بوابة الدفع الإلكتروني YouCan Pay 🇲🇦
            </span>
            <span className="text-[10.5px] text-slate-500 font-bold block">
              معتمدة من CMI – تشفير 3D-Secure آمن 100%{isSandbox ? " (وضع التجربة Sandbox)" : ""}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-yellow-50 text-[10px] font-mono font-black text-yellow-800 border border-yellow-300">
            CMI
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-50 text-[10px] font-serif font-black text-[#00579F] border border-blue-200">
            VISA
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-black text-white">
            MC
          </span>
        </div>
      </div>

      {/* 🌟 SANDBOX TEST CARD INSTRUCTIONS BANNER (صندوق معلومات بطاقة التجربة) */}
      {isSandbox && (
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 border-2 border-amber-300/80 p-3.5 space-y-2.5 text-right shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-black text-xs text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>معلومات بطاقة الدفع الاختبارية (Sandbox Test Card):</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-black border border-amber-300">
              بيانات معتمدة للتجربة
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
            {/* Card Number */}
            <div className="bg-white px-3 py-2 rounded-xl border border-amber-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[9.5px] text-slate-400 font-sans block">رقم البطاقة:</span>
                <strong className="text-slate-900 font-bold tracking-wider text-[11px] block">
                  4242 4242 4242 4242
                </strong>
              </div>
              <button
                type="button"
                onClick={handleCopyTestCard}
                className="px-2 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-sans font-bold flex items-center gap-1 cursor-pointer transition-colors"
                title="نسخ رقم البطاقة"
              >
                {copiedCard ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>تم</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>نسخ</span>
                  </>
                )}
              </button>
            </div>

            {/* Expiry */}
            <div className="bg-white px-3 py-2 rounded-xl border border-amber-200 shadow-xs flex flex-col justify-center">
              <span className="text-[9.5px] text-slate-400 font-sans">تاريخ الانتهاء:</span>
              <strong className="text-slate-900 font-bold text-[11px]">
                12/28 <span className="text-[9.5px] text-emerald-700 font-sans font-black">(أي تاريخ مستقبلي)</span>
              </strong>
            </div>

            {/* CVV */}
            <div className="bg-white px-3 py-2 rounded-xl border border-amber-200 shadow-xs flex flex-col justify-center">
              <span className="text-[9.5px] text-slate-400 font-sans">رمز الأمان (CVV):</span>
              <strong className="text-slate-900 font-bold text-[11px]">
                123
              </strong>
            </div>
          </div>

          <div className="bg-amber-100/70 rounded-xl p-2 text-[11px] text-amber-900 font-bold flex items-center gap-1.5 leading-relaxed">
            <span className="text-amber-600 font-black shrink-0">⚠️ ملاحظة:</span>
            <span>
              يرجى عدم إدخال تاريخ انتهاء قديم (مثل 2020) لأن البوابة ترفض البطاقات منتهية الصلاحية. ضع دائماً سنة مستقبلية مثل <strong>28</strong> أو <strong>29</strong>.
            </span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-rose-50 border-2 border-rose-300 rounded-2xl px-3.5 py-2.5 text-xs text-rose-800 font-bold animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* YouCan Pay error messages container */}
      <div id="ycpay-error-container" className="text-xs text-rose-700 font-bold" />

      {/* Form Container with white background & loading overlay */}
      <div className="relative w-full rounded-2xl bg-slate-50 border-2 border-slate-200 p-3 sm:p-4 min-h-[170px] shadow-inner">
        {isLoading && !error && (
          <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center gap-2 z-10 backdrop-blur-xs">
            <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
            <span className="text-xs text-slate-700 font-bold">
              جاري تجهيز بوابة الدفع الآمن YouCan Pay...
            </span>
          </div>
        )}

        {/* YouCan Pay credit card form — rendered by ycpay.js */}
        <div
          id="ycpay-form-container"
          ref={containerRef}
          className="w-full min-h-[150px] text-slate-900"
          style={{ direction: "ltr" }}
        />
      </div>

      {/* Pay Button */}
      {!isLoading && (
        <div className="pt-1">
          <button
            type="button"
            onClick={handlePay}
            disabled={paying || isProcessing}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:via-indigo-500 hover:to-emerald-500 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 group"
          >
            {paying || isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري معالجة الدفع الآمن عبر YouCan Pay...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 text-blue-100 group-hover:scale-110 transition-transform" />
                <span>
                  تأكيد الطلب والدفع عبر YouCan Pay ({formattedPrice})
                </span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
