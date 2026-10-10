"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Phone,
  KeyRound,
  ArrowRight,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Send,
  Lock,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function TrackOrderPage() {
  const router = useRouter();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(300); // 5 minutes (300s)
  const [timerActive, setTimerActive] = useState(false);
  const [demoOtpCode, setDemoOtpCode] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any = null;
    if (timerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (countdown === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, countdown]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const clean = phoneNumber.replace(/[^0-9]/g, "");
    if (!clean || clean.length < 6) {
      setErrorMsg("يرجى إدخال رقم واتساب صحيح (مثال: 0612345678)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: clean }),
      });

      const data = await res.json();
      if (data.success) {
        setStep("otp");
        setTimerActive(true);
        setCountdown(300);
        setDemoOtpCode(data.demoCode || null);
        setWhatsappUrl(data.whatsappUrl || null);
        setSuccessMsg("تم إرسال رمز التحقق بنجاح! صالح لمدة 5 دقائق.");
      } else {
        setErrorMsg(data.message || "فشل إرسال رمز التحقق، يرجى المحاولة لاحقاً.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("حدث خطأ أثناء الاتصال بالسيرفر. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle OTP input typing
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasted 4 digits
      const digits = value.replace(/[^0-9]/g, "").slice(0, 4).split("");
      const newOtp = [...otpCode];
      digits.forEach((d, idx) => {
        if (idx < 4) newOtp[idx] = d;
      });
      setOtpCode(newOtp);
      const nextInput = document.getElementById("otp-3");
      nextInput?.focus();
      return;
    }

    const cleanChar = value.replace(/[^0-9]/g, "");
    const newOtp = [...otpCode];
    newOtp[index] = cleanChar;
    setOtpCode(newOtp);

    // Auto focus next input
    if (cleanChar && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Step 2: Verify OTP and Redirect to /order/[id]
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const fullCode = otpCode.join("");
    if (fullCode.length !== 4) {
      setErrorMsg("يرجى إدخال رمز التحقق المكون من 4 أرقام كاملاً");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: phoneNumber,
          otp_code: fullCode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.hasOrders && data.redirectUrl) {
          setSuccessMsg("تم التحقق بنجاح! جاري تحويلك لصفحة طلبك...");
          setTimeout(() => {
            router.push(data.redirectUrl);
          }, 800);
        } else {
          setErrorMsg(
            "تم التحقق من الرمز بنجاح، ولكن لا توجد طلبات مسجلة لهذا الرقم بعد. يمكنك تقديم طلب جديد من المتجر."
          );
        }
      } else {
        setErrorMsg(data.message || "رمز التحقق غير صحيح أو منتهي الصلاحية.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("حدث خطأ أثناء التحقق. يرجى إعادة المحاولة.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#02133f] via-[#052b75] to-[#011440] text-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col justify-between font-sans relative overflow-x-hidden"
      dir="rtl"
    >
      {/* Background Cosmic Ethereal Rays */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/25 via-blue-600/10 to-transparent" />
        <div className="absolute -top-32 right-1/4 w-[750px] h-[750px] bg-cyan-400/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 left-1/4 w-[750px] h-[750px] bg-blue-500/20 rounded-full blur-[140px]" />
      </div>

      {/* Top Header */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-[2px] shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#031338] rounded-[14px] flex items-center justify-center p-1">
              <Image
                src="/images/ecom_letter_e_logo.png"
                alt="Ecom Speed Pro"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <span className="text-sm font-black text-white tracking-wider block">
              ECOM SPEED PRO
            </span>
            <span className="text-[9.5px] text-cyan-300 font-bold block">
              بوابة تتبع المتاجر للعملاء
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs transition-all flex items-center gap-1.5 backdrop-blur-md"
        >
          <span>الرئيسية</span>
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
        </Link>
      </header>

      {/* Center Card Container */}
      <main className="w-full max-w-lg mx-auto my-auto py-6">
        <div className="rounded-[32px] bg-gradient-to-b from-[#f8fbff]/95 via-[#f1f6fd]/95 to-[#e8f1fc]/95 border-2 border-white/80 shadow-[0_25px_70px_rgba(0,25,80,0.35)] p-6 sm:p-8 backdrop-blur-2xl flex flex-col gap-6 text-right">
          
          {/* Header Title & Icon */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0b1739]">
              تتبع واستلام متجرك الإلكتروني
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-bold max-w-sm mx-auto leading-relaxed">
              إذا أضعت رابط طلبك السري، يمكنك استرجاعه مباشرة وتأكيده عبر رقم الواتساب بدون الحاجة لكلمة مرور.
            </p>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Instant Demo Code Helper (for testing convenience) */}
          {demoOtpCode && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>رمز التحقق المرسل: </span>
                <span className="font-mono text-base font-black text-amber-700 tracking-wider">
                  {demoOtpCode}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const digits = demoOtpCode.split("");
                  setOtpCode(digits);
                }}
                className="px-2 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 text-[10px] font-black cursor-pointer"
              >
                تعبئة تلقائية
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 1: PHONE NUMBER INPUT                               */}
          {/* ======================================================== */}
          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  رقم الواتساب المسجل في الطلب *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="06 12 34 56 78"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-2xl bg-white border border-[#cbe1f8] focus:border-blue-500 font-mono font-bold text-sm text-[#0b1739] placeholder-slate-400 outline-none shadow-sm transition-all"
                  />
                  <Phone className="w-4 h-4 text-blue-600 absolute left-4 top-3.5 pointer-events-none" />
                </div>
                <span className="text-[10px] text-slate-400 font-bold block mt-1">
                  أدخل رقم الهاتف الذي استخدمته عند اختيار الباقة والدفع
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(37,99,235,0.35)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري إرسال الرمز...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 rotate-180" />
                    <span>إرسال رمز التأكيد (OTP)</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* ======================================================== */}
          {/* STEP 2: 4-DIGIT OTP VERIFICATION                         */}
          {/* ======================================================== */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center">
                <span className="text-xs text-slate-600 font-bold block mb-3">
                  تم إرسال رمز التأكيد إلى الرقم{" "}
                  <strong className="font-mono text-blue-600" dir="ltr">
                    {phoneNumber}
                  </strong>
                </span>

                {/* 4 Inputs for OTP */}
                <div className="flex items-center justify-center gap-3 direction-ltr" dir="ltr">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={otpCode[idx]}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-12 h-14 sm:w-14 sm:h-16 rounded-2xl bg-white border-2 border-[#cbe1f8] focus:border-blue-600 text-center font-mono font-black text-xl sm:text-2xl text-[#0b1739] outline-none shadow-sm transition-all focus:scale-105"
                    />
                  ))}
                </div>

                {/* Countdown & Resend Option */}
                <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
                  {timerActive ? (
                    <span>
                      ينتهي الرمز خلال:{" "}
                      <strong className="font-mono text-blue-600">
                        {formatTimer(countdown)}
                      </strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-blue-600 font-black hover:underline cursor-pointer"
                    >
                      إعادة إرسال رمز جديد
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>جاري التحقق...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تأكيد والدخول لصفحة الطلب 🚀</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setOtpCode(["", "", "", ""]);
                    setErrorMsg(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-all cursor-pointer"
                >
                  تغيير رقم الهاتف
                </button>
              </div>
            </form>
          )}

          {/* WhatsApp Direct Support Help Box */}
          <div className="pt-4 border-t border-slate-200/70 text-center space-y-2">
            <span className="text-xs text-slate-500 font-bold block">
              تواجه صعوبة أو ترغب في مساعدة فورية؟
            </span>
            <a
              href={`https://wa.me/212762357491?text=${encodeURIComponent(
                `مرحباً وكالة ECOM SPEED PRO، أحتاج مساعدة في تتبع متجري أو استرجاع رابط الطلب لرقم الهاتف (${phoneNumber || "..."}).`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-black transition-all border border-emerald-200"
            >
              <WhatsAppIcon size={14} />
              <span>محادثة الدعم الفني المباشر عبر واتساب</span>
            </a>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto text-center text-xs text-slate-300 font-bold py-2">
        جميع الحقوق محفوظة © 2026 ECOM SPEED PRO • منصة إدارة المتاجر الرقمية
      </footer>

    </div>
  );
}
