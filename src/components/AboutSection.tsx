"use client";

import React from "react";
import Image from "next/image";
import { Award, ShieldCheck, Zap, Users, CheckCircle, Clock } from "lucide-react";
import Logo from "@/components/Logo";

export default function AboutSection() {
  const stats = [
    { num: "+500", label: "متجر تم إطلاقه بنجاح", sub: "في المغرب والعالم العربي" },
    { num: "99.9%", label: "نسبة رضا العملاء", sub: "وتقييمات 5 نجوم معتمدة" },
    { num: "48 ساعة", label: "متوسط وقت التسليم", sub: "تسليم قياسي وجاهزية فورية" },
    { num: "24/7", label: "دعم فني استشاري", sub: "طيلة أيام الأسبوع بلا انقطاع" },
  ];

  return (
    <section id="about" className="w-full py-8 md:py-12 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center">
            <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#2563eb] rounded-full"></span>
            <span className="w-2 h-2 rounded-full bg-[#2563eb] -mr-1"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black text-[#1d4ed8] tracking-tight px-3 drop-shadow-xs flex items-center gap-2">
            <span>من نحن ورؤيتنا</span>
            <Award className="w-6 h-6 text-[#2563eb]" />
          </h2>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] -ml-1"></span>
            <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#2563eb] rounded-full"></span>
          </div>
        </div>

        {/* Story Card */}
        <div className="rounded-[36px] bg-white/95 backdrop-blur-xl border border-blue-200/90 p-6 sm:p-10 shadow-[0_15px_50px_rgba(37,99,235,0.1)] mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>الشركة الرائدة في هندسة التجارة الإلكترونية بالمغرب 🇲🇦</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0a193c] leading-snug">
                نحن لا نبني مجرد متاجر، بل نصنع{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">
                  ماكينات مبيعات فائقة السرعة
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                تأسست <strong>ECOM SPEED PRO</strong> برؤية واضحة: حل المشكلة الأكبر التي يواجهها التجار الرقميون وهي بطء المتاجر، تعقيدات الدفع الإلكتروني، وتكاليف الاشتراكات الشهرية المرتفعة. نقدم حلولاً برمجية وتصميمية متكاملة تمنحك متجراً عصرياً فائق السرعة، ملكية مدى الحياة، وربطاً سلساً ببوابات الدفع الرسمية بالمغرب.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تشفير مالي وبنكي معتمد 100%</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ملكية برمجية دائمة بدون اشتراك شهري</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 border border-blue-200 shadow-inner flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-2xl shadow-md mb-3">
                  <Logo size="lg" />
                </div>
                <span className="text-xs font-black text-blue-900 font-mono">
                  ECOM SPEED PRO
                </span>
                <span className="text-[11px] text-slate-500 font-bold mt-1">
                  معايير الفخامة والسرعة العالمية
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-blue-200 text-center shadow-sm hover:shadow-md hover:border-blue-400 transition-all"
            >
              <span className="text-2xl sm:text-3xl font-black text-blue-700 font-mono block mb-1">
                {s.num}
              </span>
              <h5 className="text-xs sm:text-sm font-bold text-[#0a193c]">
                {s.label}
              </h5>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
