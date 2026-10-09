"use client";

import React, { useState } from "react";
import { BookOpen, Sparkles, Clock, ArrowLeft, X, CheckCircle2 } from "lucide-react";

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    category: string;
    date: string;
    readTime: string;
    content: string[];
  } | null>(null);

  const articles = [
    {
      id: "art-1",
      title: "كيف تضاعف مبيعات متجرك الإلكتروني في المغرب 5 أضعاف في 30 يوماً؟",
      category: "استراتيجيات التسويق والتحويل",
      date: "أكتوبر 2026",
      readTime: "4 دقائق قراءة",
      summary: "أسرار هندسة صفحات الهبوط وتسهيل عملية الشراء لتقليل سلات الشراء المتروكة ومضاعفة العائد الإعلاني (ROAS).",
      content: [
        "1. تقليل خطوات الشراء إلى خطوة واحدة (One-Click Checkout): أثبتت الدراسات أن كل حقل إضافي في نموذج الطلب يقلل التحويلات بنسبة 10%. متجر Ecom Speed Pro يوفر استمارة سريعة تختصر على الزبون كل التعقيدات.",
        "2. السرعة الخارقة في تحميل الصور والواجهات: سرعة التحميل التي تقل عن ثانية ونصف تضمن عدم هروب الزبون المستعجل من إعلانات تيك توك وإنستغرام وفيسبوك.",
        "3. الثقة والضمانات البصرية: إبراز شارات الأمان البنكي وتأكيد الجودة والضمان الذهبي يعطي المشتري راحة بال كاملة لإتمام الطلب فوراً.",
      ],
    },
    {
      id: "art-2",
      title: "سرعة تحميل المتجر: كيف تخسر 40% من زوارك في أول 3 ثوانٍ؟",
      category: "الأداء التقني ومعدل الارتداد",
      date: "سبتمبر 2026",
      readTime: "3 دقائق قراءة",
      summary: "تحليل دقيق لأثر سرعة الموقع على خوارزميات إعلانات Meta و TikTok، وكيف نحقق كفاءة 100% في خوادم Ecom Speed Pro.",
      content: [
        "وفقاً لأحدث إحصائيات التجارة الرقمية، فإن التأخير لثانية واحدة فقط في تحميل المتجر يؤدي إلى انخفاض بنسبة 7% في المبيعات، ومعدل ارتداد (Bounce Rate) يتجاوز 40%.",
        "في Ecom Speed Pro، نعتمد على بنية سحابية متطورة تضغط الأصول تلقائياً، وتستخدم خوادم CDN فائقة السرعة تخدم الزوار المغاربة والعرب بأعلى سرعة ممكنة.",
        "النتيجة: متجر يفتح بسرعة البرق مما يضاعف النقرات الفعالة ويخفض تكلفة الشراء للإعلان (CPA).",
      ],
    },
    {
      id: "art-3",
      title: "بوابات الدفع الإلكتروني بالمغرب (YouCan Pay & CMI): الدليل الشامل",
      category: "بوابات الدفع والأمان المالي",
      date: "أغسطس 2026",
      readTime: "5 دقائق قراءة",
      summary: "كل ما تحتاج لمعرفته لدمج بطاقات فيزا وماستركارد والبطاقات البنكية المغربية بأعلى درجات التشفير SSL 256-Bit.",
      content: [
        "الانتقال من الاعتماد الكلي على الدفع عند الاستلام إلى توفير الدفع الإلكتروني الآمن يزيد من أرباح المتجر الصافية ويقلل نسبة الرفض عند التوصيل (Return Rate).",
        "نحن ندمج رسمياً بوابات الدفع الرائدة YouCan Pay و CMI مع حسابك البنكي مباشرة دون أي وسيط.",
        "جميع المعاملات تتم بتشفير بنكي 100% وحماية ثلاثية الأبعاد 3D Secure لحماية بيانات التاجر والزبون.",
      ],
    },
  ];

  return (
    <section id="blog" className="w-full py-8 md:py-12 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center">
            <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#2563eb] rounded-full"></span>
            <span className="w-2 h-2 rounded-full bg-[#2563eb] -mr-1"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black text-[#1d4ed8] tracking-tight px-3 drop-shadow-xs flex items-center gap-2">
            <span>مدونة التجارة الرقمية</span>
            <BookOpen className="w-6 h-6 text-[#2563eb]" />
          </h2>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] -ml-1"></span>
            <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#2563eb] rounded-full"></span>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              className="rounded-3xl bg-white/95 backdrop-blur-md border border-blue-200/90 p-6 shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.18)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-black text-blue-600 mb-3">
                  <span className="bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-black text-[#0a193c] mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-4">
                  {art.summary}
                </p>
              </div>

              <button
                onClick={() => setSelectedArticle(art)}
                className="pt-2 text-xs font-black text-blue-700 hover:text-blue-800 flex items-center justify-between border-t border-slate-100 cursor-pointer group-hover:underline"
              >
                <span>قراءة المقال بالكامل</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-xl bg-white/95 rounded-3xl shadow-[0_25px_60px_rgba(2,8,28,0.35)] border border-blue-200 p-6 sm:p-8 overflow-hidden flex flex-col max-h-[90vh]"
            dir="rtl"
          >
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 inline-block mb-2">
                  {selectedArticle.category} • {selectedArticle.date}
                </span>
                <h3 className="text-lg font-black text-[#0a193c] leading-snug">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
              {selectedArticle.content.map((p, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <p>{p}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>مقال موثق من خبراء Ecom Speed Pro</span>
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-colors cursor-pointer"
              >
                تمت القراءة
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
