"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Lock, AlertCircle, Loader2 } from "lucide-react";

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
      setError("حدث خطأ أثناء تهيئة بوابة الدفع.");
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
      // On success YouCan Pay will redirect to success_url.
      // But also call onSuccess so our modal can show tracking screen.
      const res = await fetch(`/api/orders?id=${createdOrderId}`);
      const data = await res.json();
      if (data.success && data.order) {
        onSuccess(data.order);
      } else {
        // Fallback — construct a minimal order object so redirect still works
        onSuccess({ id: createdOrderId, order_number: "#ESP-" + createdOrderId.slice(0, 6).toUpperCase() });
      }
    } catch (err: any) {
      setError(err?.message || "فشل الدفع. تحقق من بيانات بطاقتك وحاول مجدداً.");
      setPaying(false);
      onProcessingChange(false);
    }
  };

  const isLoading = !tokenId || !sdkReady;

  return (
    <div className="rounded-2xl bg-[#071a48]/90 border border-cyan-400/40 p-3.5 space-y-3 shadow-lg">
      {/* Header */}
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
              معتمدة من CMI – تشفير 3D-Secure{isSandbox ? " (Sandbox)" : ""}
            </span>
          </div>
        </div>
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

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-rose-900/30 border border-rose-500/40 rounded-xl px-3 py-2 text-xs text-rose-200 font-bold">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && !error && (
        <div className="flex flex-col items-center gap-2 py-6">
          <Loader2 className="w-7 h-7 text-cyan-400 animate-spin" />
          <span className="text-xs text-cyan-200 font-bold">
            جاري تهيئة بوابة الدفع الآمن...
          </span>
        </div>
      )}

      {/* YouCan Pay error messages */}
      <div id="ycpay-error-container" className="text-xs text-rose-300 font-bold" />

      {/* YouCan Pay credit card form — rendered by ycpay.js */}
      <div
        id="ycpay-form-container"
        ref={containerRef}
        className={isLoading ? "opacity-0 h-0 overflow-hidden" : "opacity-100 transition-opacity duration-300"}
        style={{ direction: "ltr" }}
      />

      {/* Pay Button */}
      {!isLoading && (
        <div className="pt-1">
          <button
            type="button"
            onClick={handlePay}
            disabled={paying || isProcessing}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-600 hover:from-cyan-300 hover:via-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-[0_0_30px_rgba(6,182,212,0.55)] hover:shadow-[0_0_45px_rgba(6,182,212,0.85)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 group"
          >
            {paying || isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري معالجة الدفع الآمن عبر YouCan Pay...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
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
