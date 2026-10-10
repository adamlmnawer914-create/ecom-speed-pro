"use client";

import React from "react";
import Image from "next/image";
import {
  Award,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle,
  Clock,
  Sparkles,
  Crown,
  HeartHandshake,
  TrendingUp,
  Cpu,
  Lock,
  Compass,
} from "lucide-react";
import Logo from "@/components/Logo";

export default function AboutSection() {
  const stats = [
    {
      num: "+500",
      label: "متجر تم إطلاقه بنجاح",
      sub: "في المغرب والعالم العربي",
      gradient: "from-blue-600 to-cyan-500",
      icon: TrendingUp,
    },
    {
      num: "99.9%",
      label: "نسبة رضا عملائنا",
      sub: "تقييمات 5 نجوم معتمدة",
      gradient: "from-emerald-600 to-teal-500",
      icon: ShieldCheck,
    },
    {
      num: "48 ساعة",
      label: "متوسط وقت التسليم",
      sub: "تسليم قياسي وجاهزية فورية",
      gradient: "from-amber-500 to-orange-500",
      icon: Clock,
    },
    {
      num: "24/7",
      label: "دعم ومرافقة استشارية",
      sub: "طيلة أيام الأسبوع بلا انقطاع",
      gradient: "from-purple-600 to-fuchsia-500",
      icon: Users,
    },
  ];

  const pillars = [
    {
      icon: Cpu,
      title: "الهندسة فائقة السرعة",
      desc: "بنية سحابية حديثة من Next.js تمنح متجرك سرعة تحميل أقل من ثانية ونصف لتفوق إعلاني ساحق.",
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      icon: Lock,
      title: "الأمان والربط البنكي الرسمي",
      desc: "دمج مباشر مع بوابات YouCan Pay و CMI للدفع ببطاقات فيزا وماستركارد بأعلى درجات التشفير.",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      icon: TrendingUp,
      title: "التصميم الموجه للتحويل",
      desc: "هندسة واجهات مدروسة ومحفزة للشراء الفوري بنظام النقرة الواحدة لتقليل سلات الشراء المتروكة.",
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
    {
      icon: Crown,
      title: "الملكية البرمجية التامة 100%",
      desc: "متجرك ملكك بالكامل مدى الحياة بدون أي اشتراكات شهرية، اقتطاعات، أو قيود على أرباحك.",
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <section id="about" className="w-full py-10 md:py-16 relative z-10 overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-black mb-3 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>المؤسسة الرائدة في هندسة التجارة الإلكترونية بالمغرب 🇲🇦</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex items-center">
              <span className="w-10 sm:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#2563eb] rounded-full"></span>
              <span className="w-2 h-2 rounded-full bg-[#2563eb] -mr-1"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1739] tracking-tight px-3 drop-shadow-xs flex items-center gap-2">
              <span>من نحن ورؤيتنا</span>
              <Award className="w-7 h-7 text-[#2563eb]" />
            </h2>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#2563eb] -ml-1"></span>
              <span className="w-10 sm:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#2563eb] rounded-full"></span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-bold leading-relaxed">
            نحن لا نبيع مجرد تصاميم، بل نبني لك ماكينات بيع فائقة السرعة والأداء تمنحك استقلالية تامة ومضاعفة حقيقية للأرباح.
          </p>
        </div>

        {/* Master Corporate Showcase Suite */}
        <div className="relative rounded-[36px] sm:rounded-[44px] bg-gradient-to-b from-white via-[#f8fafc] to-[#edf4fd] border border-blue-200/90 p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(30,58,138,0.12)] mb-12 overflow-hidden">
          
          {/* Subtle Ambient Watermark Glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Right Column: Mission, Narrative, and Certifications */}
            <div className="lg:col-span-8 space-y-5 text-right">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>شريك التحول الرقمي الموثوق لأكثر من 500 علامة تجارية</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-[34px] font-black text-[#0b1739] leading-tight">
                رؤيتنا: تمكين التاجر العربي بحلول برمجية{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">
                  تفوق المعايير العالمية
                </span>
              </h3>

              <p className="text-sm sm:text-base text-slate-600 font-bold leading-relaxed">
                انطلقت <strong>ECOM SPEED PRO</strong> لسد الفجوة الكبيرة في سوق التجارة الرقمية: التخلص من بطء المتاجر التقليدية، القضاء على قيود الاشتراكات الشهرية المستنزفة، وحل مشاكل تعثر الدفع الإلكتروني بالمغرب. نحن نجمع بين الفن التصميمي والهندسة البرمجية المتطورة لنقدم لك متجراً فائق الفخامة والسرعة، جاهزاً فورياً لتحقيق أعلى معدل تحويل وأرباح قياسية.
              </p>

              {/* 4 Trust Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">تشفير بنكي 100% معتمد</span>
                    <span className="text-[11px] text-slate-500 font-semibold">بوابات CMI و YouCan Pay الرسمية</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">ملكية برمجية دائمة مدى الحياة</span>
                    <span className="text-[11px] text-slate-500 font-semibold">بدون أي رسوم أو اشتراك شهري إطلاقاً</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">سرعة تحميل أقل من 1.5 ثانية</span>
                    <span className="text-[11px] text-slate-500 font-semibold">تقييم 99+ على Google PageSpeed</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">مرافقة استشارية وتدريب مجاني</span>
                    <span className="text-[11px] text-slate-500 font-semibold">دعم فني متخصص على مدار الساعة</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Left Column: Official 3D Holographic Seal Badge */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[340px] p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-white via-blue-50/50 to-indigo-50 border-2 border-blue-200 shadow-xl flex flex-col items-center text-center relative group hover:scale-[1.02] transition-transform duration-300">
                
                {/* Floating Crown Badge */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shadow-lg -mt-12 mb-4 border-2 border-white">
                  <Crown className="w-6 h-6" />
                </div>

                {/* Brand Logo Display */}
                <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 mb-4 w-full flex items-center justify-center">
                  <Logo size="lg" />
                </div>

                <div className="space-y-1 mb-4">
                  <span className="text-sm font-black text-blue-900 font-mono tracking-wider block">
                    ECOM SPEED PRO
                  </span>
                  <span className="text-xs font-bold text-slate-500 block">
                    معايير الفخامة والسرعة الرقمية 2026
                  </span>
                </div>

                <div className="w-full pt-4 border-t border-blue-100/80 flex items-center justify-around text-center">
                  <div>
                    <span className="text-sm font-black text-blue-600 block">+15M</span>
                    <span className="text-[10px] text-slate-500 font-bold">درهم مبيعات لعملائنا</span>
                  </div>
                  <div className="w-[1px] h-8 bg-blue-200" />
                  <div>
                    <span className="text-sm font-black text-emerald-600 block">100%</span>
                    <span className="text-[10px] text-slate-500 font-bold">جاهزية تشغيلية</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillars of Excellence Grid */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-black text-[#0b1739]">
              ركائز التميز في ECOM SPEED PRO
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pil, idx) => {
              const PilIcon = pil.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white/95 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs mb-4 ${pil.color}`}>
                      <PilIcon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-black text-[#0b1739] mb-2 group-hover:text-blue-600 transition-colors">
                      {pil.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      {pil.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Executive Numeric Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const StatIcon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl bg-white/95 backdrop-blur-md border border-blue-200/90 p-5 sm:p-6 text-center shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <StatIcon className="w-5 h-5" />
                </div>
                <span className={`text-2xl sm:text-3xl md:text-4xl font-black font-mono block mb-1 text-transparent bg-clip-text bg-gradient-to-r ${s.gradient}`}>
                  {s.num}
                </span>
                <h5 className="text-xs sm:text-sm font-black text-[#0b1739] mb-0.5">
                  {s.label}
                </h5>
                <p className="text-[10px] sm:text-xs text-slate-400 font-bold">
                  {s.sub}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
