"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShoppingCart,
  Check,
  Layers,
  Smartphone,
  Gauge,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Bot,
  CreditCard,
  TrendingUp,
  Sliders,
  CheckCircle2,
} from "lucide-react";

interface ProductsSectionProps {
  onSelectPlan: (plan: string, price: string) => void;
}

export default function ProductsSection({ onSelectPlan }: ProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<"all" | "templates" | "systems" | "payments">("all");

  const products = [
    {
      id: "prod-1",
      category: "templates",
      title: "قوالب التجارة الإلكترونية فائقة التحويل (Ultra-Conversion 2026)",
      badge: "تصميم حصري 2026 💎",
      badgeGradient: "from-blue-600 via-indigo-600 to-purple-600",
      icon: Smartphone,
      iconColor: "text-blue-600 bg-blue-50 border-blue-200",
      desc: "حزم قوالب جاهزة ومجهزة لأسرع تجربة مستخدم في المغرب والخليج، مصممة هندسياً لتحقيق أعلى معدل تحويل (Conversion Rate) لمنتجاتك الرابحة.",
      specs: ["⚡ سرعة قياسية 1.2 ثانية", "📱 متجاوب 100% مع الهواتف", "🛒 طلب بنقرة واحدة (1-Click)"],
      features: [
        "صفحات هبوط استثنائية مخصصة لمنتجات التجميل، الملابس، والإلكترونيات",
        "استمارة طلب فورية سريعة ومختصرة تقلل سلات الشراء المتروكة بنسبة 45%",
        "ربط بكسل تلقائي مع TikTok Pixel, Meta Pixel, Snapchat Pixel بنقرة واحدة",
        "استضافة سحابية فائقة السرعة مع دومين خاص مجاني مدى الحياة",
      ],
      price: "مضمن مجاناً مع الباقات",
      priceNum: "500 درهم",
      buttonText: "معاينة وطلب القالب الآن",
      planName: "صفحة الهبوط (Landing Page)",
      planPrice: "500 درهم",
      highlight: true,
    },
    {
      id: "prod-2",
      category: "systems",
      title: "نظام أتمتة المخزون والفواتير الذكية وربط الشحن (AI Logistics Hub)",
      badge: "أتمتة متطورة SaaS ⚙️",
      badgeGradient: "from-purple-600 via-fuchsia-600 to-pink-600",
      icon: Bot,
      iconColor: "text-purple-600 bg-purple-50 border-purple-200",
      desc: "لوحة تحكم مركزية متقدمة لإدارة الطلبات، إصدار الفواتير الآلية، وإرسال تنبيهات واتساب للزبائن مع الربط المباشر مع شركات التوصيل بالمغرب.",
      specs: ["📦 ربط شركات التوصيل", "📲 إشعارات واتساب أوتوماتيكية", "📊 تقارير أرباح حية"],
      features: [
        "ربط مؤتمت مع كبريات شركات الشحن بالمغرب لتوليد بوليصات الشحن تلقائياً",
        "إشعارات تلقائية عبر الواتساب لتأكيد الطلب وتتبع الشحنة للحد من نسبة الراجع",
        "نظام ذكي لتتبع المخزون ومنع نفاد المنتجات وإصدار فواتير PDF فورية للزبائن",
        "لوحة قيادة وتحليلات مالية دقيقة لحساب صافي الأرباح وعائد الإعلانات (ROAS)",
      ],
      price: "مضمن مع باقة SaaS",
      priceNum: "5000 درهم",
      buttonText: "طلب تفعيل النظام الذكي",
      planName: "منصة التجارة المتقدمة (Advanced SaaS)",
      planPrice: "5000 درهم",
      highlight: false,
    },
    {
      id: "prod-3",
      category: "payments",
      title: "بوابة الدفع الإلكتروني البنكية المعتمدة (YouCan Pay & CMI Gateway)",
      badge: "أمان بنكي 100% 🛡️",
      badgeGradient: "from-emerald-600 via-teal-600 to-cyan-600",
      icon: CreditCard,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
      desc: "تفعيل فوري لربط بطاقات فيزا، ماستركارد، والبطاقات البنكية المغربية بحسابك البنكي مباشرة دون وسطاء وبأعلى درجات التشفير المصرفي.",
      specs: ["🔒 تشفير SSL 256-Bit", "💳 دعم البطاقات المغربية", "🛡️ حماية ثلاثية 3D Secure"],
      features: [
        "قبول فوري للأداء بالبطاقات البنكية المغربية (Attijari, BCP, CIH, BMCE...)",
        "تحويل مباشر للسيولة النقدية إلى حسابك البنكي لزيادة رأس مال تجارتك",
        "تقليل نسبة رفض وتراجع الطرود عند الدفع عند الاستلام إلى أقل من 5%",
        "تشفير بنكي معتمد بأعلى معايير الأمان العالمية لحماية بيانات التاجر والزبون",
      ],
      price: "مضمن مع المتجر القياسي",
      priceNum: "1500 درهم",
      buttonText: "طلب ربط بوابة الدفع",
      planName: "المتجر القياسي (Standard Store)",
      planPrice: "1500 درهم",
      highlight: false,
    },
    {
      id: "prod-4",
      category: "systems",
      title: "محرك مضاعفة قيمة سلة الشراء والعروض الترويجية (Upsell Booster)",
      badge: "مضاعفة الأرباح 3X 📈",
      badgeGradient: "from-amber-500 via-orange-500 to-rose-500",
      icon: TrendingUp,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200",
      desc: "نظام متطور لعروض الكميات (Quantity Breaks) والبيع التكميلي بنقرة واحدة (One-Click Upsell) لرفع متوسط قيمة الطلب ومضاعفة أرباح كل زائر.",
      specs: ["🔥 زيادة السلة بنسبة 40%", "⏳ عداد تنازلي ذكي", "🎁 باقات وهدايا تلقائية"],
      features: [
        "عروض حزم المنتجات والكميات المتدرجة (اشتري 1 واحصل على الثاني بخصم 30%)",
        "عروض ما بعد إتمام الطلب (Post-Purchase Upsell) دون إعادة إدخال البيانات",
        "شريط ذكي للشحن المجاني يتفاعل لحظياً مع إضافة المنتجات إلى السلة",
        "شارات الثقة والضمان الذهبي الديناميكية لزيادة معدل إتمام الطلبات فوراً",
      ],
      price: "مضمن مع باقات المتاجر",
      priceNum: "1500 درهم",
      buttonText: "تفعيل محرك زيادة المبيعات",
      planName: "المتجر القياسي (Standard Store)",
      planPrice: "1500 درهم",
      highlight: false,
    },
  ];

  const filteredProducts =
    activeTab === "all" ? products : products.filter((p) => p.category === activeTab);

  return (
    <section id="products" className="w-full py-10 md:py-16 relative z-10 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-black mb-3 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>منظومة متكاملة من الحلول البرمجية والتسويقية 2026</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex items-center">
              <span className="w-10 sm:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#2563eb] rounded-full"></span>
              <span className="w-2 h-2 rounded-full bg-[#2563eb] -mr-1"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1739] tracking-tight px-3 drop-shadow-xs flex items-center gap-2">
              <span>المنتجات والحلول الرقمية</span>
              <Layers className="w-7 h-7 text-[#2563eb]" />
            </h2>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#2563eb] -ml-1"></span>
              <span className="w-10 sm:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#2563eb] rounded-full"></span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-bold leading-relaxed">
            حلول متقدمة مبنية بأحدث تقنيات الويب العالمية لتمنح متجرك سرعة خارقة، تحويلاً قياسياً، وأماناً مصرفياً لا يضاهى.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-105"
                  : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200/90"
              }`}
            >
              جميع الحلول (+4)
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                activeTab === "templates"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-105"
                  : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200/90"
              }`}
            >
              القوالب وتجربة المستخدم
            </button>
            <button
              onClick={() => setActiveTab("systems")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                activeTab === "systems"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-105"
                  : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200/90"
              }`}
            >
              أنظمة الأتمتة والذكاء الاصطناعي
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                activeTab === "payments"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-105"
                  : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200/90"
              }`}
            >
              بوابات الدفع البنكية
            </button>
          </div>
        </div>

        {/* 4 Luxury Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {filteredProducts.map((prod) => {
            const IconComponent = prod.icon;
            return (
              <div
                key={prod.id}
                className={`relative rounded-[32px] sm:rounded-[36px] bg-white/95 backdrop-blur-xl border p-6 sm:p-8 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1.5 ${
                  prod.highlight
                    ? "border-2 border-blue-400/80 shadow-[0_20px_60px_rgba(37,99,235,0.18)] ring-4 ring-blue-500/10"
                    : "border-slate-200/90 shadow-[0_15px_45px_rgba(15,23,42,0.06)] hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.14)]"
                }`}
              >
                {/* Background soft ambient card glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />

                <div>
                  {/* Top Bar: Icon + Badge + Price Capsule */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${prod.iconColor}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className={`px-3.5 py-1.5 rounded-full text-xs font-black text-white bg-gradient-to-r ${prod.badgeGradient} shadow-sm`}>
                        {prod.badge}
                      </span>
                    </div>

                    <div className="text-left shrink-0">
                      <span className="text-xs font-black text-blue-700 bg-blue-50/90 border border-blue-200 px-3 py-1.5 rounded-xl block shadow-inner">
                        {prod.price}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b1739] mb-2.5 leading-snug group-hover:text-blue-600 transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-bold leading-relaxed mb-5">
                    {prod.desc}
                  </p>

                  {/* Quick Specs Pills */}
                  <div className="flex items-center gap-2 flex-wrap mb-6">
                    {prod.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] sm:text-xs font-black text-slate-700 bg-slate-100/80 border border-slate-200 px-3 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Deep Feature Checklist */}
                  <div className="space-y-3 mb-6 pt-4 border-t border-slate-100">
                    {prod.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-bold text-slate-700 leading-snug">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-400/30">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 font-bold block">القيمة التقديرية</span>
                    <span className="text-base sm:text-lg font-black text-[#0b1739]">{prod.priceNum}</span>
                  </div>

                  <button
                    onClick={() => onSelectPlan(prod.planName, prod.planPrice)}
                    className="flex-1 max-w-[260px] py-3 px-5 rounded-2xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#00c8ff] via-[#3a86ff] to-[#8338ec] shadow-[0_4px_20px_rgba(58,134,255,0.35)] hover:shadow-[0_6px_28px_rgba(58,134,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{prod.buttonText}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
