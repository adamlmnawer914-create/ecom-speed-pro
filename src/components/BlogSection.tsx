"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Clock,
  ArrowLeft,
  X,
  CheckCircle2,
  Share2,
  TrendingUp,
  Zap,
  CreditCard,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    category: string;
    categoryColor: string;
    date: string;
    readTime: string;
    author: string;
    summary: string;
    keyTakeaway: string;
    sections: { heading: string; body: string }[];
  } | null>(null);

  const articles = [
    {
      id: "art-1",
      title: "أسرار مضاعفة مبيعات التجارة الإلكترونية في المغرب 5X: من 0 إلى 100,000 درهم شهرياً",
      category: "استراتيجيات النمو والمبيعات 🚀",
      categoryColor: "bg-blue-50 text-blue-700 border-blue-200",
      icon: TrendingUp,
      date: "أكتوبر 2026",
      readTime: "5 دقائق قراءة",
      author: "فريق خبراء النمو الرقمي",
      summary: "دليل عملي مجرب يشرح بالتفصيل كيفية تحسين استهداف إعلانات TikTok و Meta، رفع كفاءة صفحات الهبوط، وتخفيض تكلفة الاستحواذ على الزبون (CPA).",
      keyTakeaway: "التبسيط هو سر الملايين: تقليل نموذج الطلب إلى 3 حقول يضاعف مبيعاتك فورياً بنسبة 35%.",
      sections: [
        {
          heading: "1. التبسيط الجذري لاستمارة الشراء (One-Click Checkout)",
          body: "أظهرت دراسات سلوك المشتري المغربي والعربي أن 68% من الزبائن يغادرون المتجر إذا طُلب منهم التسجيل أو ملء بيانات بريدية معقدة. اعتمد فقط على الاسم ورقم الهاتف والمدينة لجعل الطلب سهلاً في 5 ثوانٍ.",
        },
        {
          heading: "2. بناء الثقة البصرية الفورية والضمانات الملموسة",
          body: "المشتري يتخذ قراره في أول 3 ثوانٍ. وجود شارات التوصيل السريع، الضمان الذهبي لاسترجاع الأموال، ومعاينة المنتج قبل الدفع يعطي العميل راحة بال تامة لضغط زر 'اطلب الآن'.",
        },
        {
          heading: "3. هندسة عروض الكميات (Quantity Breaks)",
          body: "لا تكتفِ ببيع قطعة واحدة؛ شجع العميل على شراء قطعتين بخصم مغرٍ أو إضافة ملحق مكمل. هذا التكنيك البسيط يرفع متوسط قيمة السلة (AOV) بنسبة تفوق 40% دون زيادة ميزانيتك الإعلانية.",
        },
      ],
    },
    {
      id: "art-2",
      title: "معضلة سرعة التحميل 1.2 ثانية: كيف ترفع معدل التحويل 300% وتتصدر إعلانات تيك توك وميتا؟",
      category: "الأداء التقني ومعدل التحويل ⚡",
      categoryColor: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Zap,
      date: "سبتمبر 2026",
      readTime: "4 دقائق قراءة",
      author: "قسم هندسة الأداء السحابي",
      summary: "تحليل تقني بالأرقام يوضح كيف تؤثر كل 100 ميلي ثانية من سرعة تحميل المتجر على ثقة المشتري ونسبة إتمام الطلب الفوري وتخفيض تكلفة الإعلانات.",
      keyTakeaway: "كل ثانية تأخير تفقدك 20% من مبيعاتك. السرعة هي العامل الخفي الأول للربحية الرقمية.",
      sections: [
        {
          heading: "1. لماذا يهرب زوار إعلانات تيك توك في أول ثانيتين؟",
          body: "مستخدمو الهواتف الذكية معتادون على التمرير السريع. إذا لم يفتح المتجر خلال 1.5 ثانية كحد أقصى، فإن 40% منهم يضغطون زر الرجوع قبل حتى رؤية المنتج، مما يعني إهدار نصف ميزانيتك الإعلانية.",
        },
        {
          heading: "2. المعايير البرمجية لسرعة 99+ على Google PageSpeed",
          body: "في Ecom Speed Pro، نعتمد على بنية Next.js السحابية الحديثة مع ضغط ذكي للأصول، وخوادم CDN قريبة من المستخدمين في المغرب والعالم العربي لتوفير استجابة شبه لحظية.",
        },
        {
          heading: "3. كيف تكافئك خوارزميات الإعلانات؟",
          body: "خوارزميات Meta و TikTok تقيس سرعة تفاعل الزائر بعد النقرة؛ المتاجر السريعة تحصل على تقييم جودة إعلاني أعلى (Ad Relevance Score)، مما يخفض تكلفة النقرة (CPC) بنسبة تصل إلى 30%.",
        },
      ],
    },
    {
      id: "art-3",
      title: "الدفع الإلكتروني بالمغرب (YouCan Pay & CMI): كيف تنهي مشاكل الدفع عند الاستلام وتخفض الراجع لأقل من 5%؟",
      category: "الأمان المالي وبوابات الدفع 💳",
      categoryColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: CreditCard,
      date: "أغسطس 2026",
      readTime: "6 دقائق قراءة",
      author: "مستشارو الدفع والحلول البنكية",
      summary: "مقارنة شاملة بين بوابات الدفع الرسمية بالمغرب، شروط التفعيل، وكيفية توفير الدفع بالبطاقة البنكية لزيادة التدفقات النقدية واستقرار تجارتك.",
      keyTakeaway: "الزبون الذي يدفع مسبقاً بالبطاقة تبلغ نسبة استلامه للطلب 99% مقارنة بـ 75% في الدفع عند الاستلام.",
      sections: [
        {
          heading: "1. حل أزمة السيولة النقدية ومصاريف الشحن المرتدة",
          body: "الدفع عند الاستلام (COD) يعرض التاجر لخطر رفض الطرود وتأخر تحصيل الأموال لأسابيع. إتاحة الدفع الإلكتروني تمنحك تدفقات نقدية فورية في حسابك البنكي لشراء المزيد من المخزون وتكبير حملاتك.",
        },
        {
          heading: "2. كيف تشجع المشتري المغربي على الأداء البنكي؟",
          body: "قدم حافزاً بسيطاً مثل 'شحن مجاني أو خصم 10% عند الدفع المسبق بالبطاقة'. المشتري يبحث عن الأمان، وعندما يرى شارات CMI و YouCan Pay وتشفير SSL، يشعر بثقة مطلقة للأداء.",
        },
        {
          heading: "3. الحماية البنكية ثلاثية الأبعاد 3D Secure",
          body: "كافة بوابات الدفع التي ندمجها ترسل رمز تأكيد OTP إلى هاتف الزبون من بنكه، مما يضمن أماناً قانونياً ومصرفياً كاملاً للتاجر والزبون على حد سواء.",
        },
      ],
    },
  ];

  return (
    <section id="blog" className="w-full py-10 md:py-16 relative z-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-black mb-3 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>مدونة متقدمة ودراسات حالة حصرية من أرض الواقع</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex items-center">
              <span className="w-10 sm:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#2563eb] rounded-full"></span>
              <span className="w-2 h-2 rounded-full bg-[#2563eb] -mr-1"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1739] tracking-tight px-3 drop-shadow-xs flex items-center gap-2">
              <span>مدونة التجارة الرقمية</span>
              <BookOpen className="w-7 h-7 text-[#2563eb]" />
            </h2>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#2563eb] -ml-1"></span>
              <span className="w-10 sm:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#2563eb] rounded-full"></span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-bold leading-relaxed">
            استراتيجيات مجربة وأسرار برمجية وتسويقية من كبار خبراء التجارة الإلكترونية لمساعدتك على بناء بيزنس رقمي مستدام ومربح.
          </p>
        </div>

        {/* 3 Luxury Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {articles.map((art) => {
            const IconComp = art.icon;
            return (
              <div
                key={art.id}
                className="relative rounded-[32px] bg-white/95 backdrop-blur-xl border border-slate-200/90 p-6 sm:p-7 shadow-[0_12px_40px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_55px_rgba(37,99,235,0.16)] hover:border-blue-300 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Category Pill & Read Time */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-black border ${art.categoryColor}`}>
                      {art.category}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-lg sm:text-xl font-black text-[#0b1739] mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                    {art.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed mb-5">
                    {art.summary}
                  </p>

                  {/* Golden Insight Callout Pill */}
                  <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/60 p-3.5 rounded-2xl border border-blue-100 mb-6">
                    <span className="text-[11px] font-black text-blue-800 block mb-0.5">💡 زبدة المقال:</span>
                    <p className="text-xs font-bold text-slate-700 leading-snug">{art.keyTakeaway}</p>
                  </div>
                </div>

                {/* Footer with Author and Read Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">
                      ESP
                    </div>
                    <div>
                      <span className="text-xs font-black text-[#0b1739] block leading-none">{art.author}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{art.date}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-black text-xs transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <span>قراءة كاملة</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ======================================================== */}
      {/* Exquisite Full Article Reading Modal                    */}
      {/* ======================================================== */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#070f26]/85 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedArticle(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl my-auto max-h-[90vh] flex flex-col bg-gradient-to-b from-white via-[#f8fafc] to-[#edf4fd] rounded-[32px] sm:rounded-[36px] border border-blue-200/90 shadow-[0_25px_80px_rgba(15,23,42,0.4)] z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-blue-100 bg-white/80 backdrop-blur-md flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${selectedArticle.categoryColor}`}>
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0b1739] leading-snug">
                  {selectedArticle.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                  <span>{selectedArticle.author}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all duration-200 hover:rotate-90 shrink-0 cursor-pointer shadow-xs"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Article Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Highlight Box */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-2xl shadow-md">
                <span className="text-xs font-black text-cyan-200 block mb-1">💡 الخلاصة التنفيذية للمقال:</span>
                <p className="text-sm font-bold leading-relaxed">{selectedArticle.keyTakeaway}</p>
              </div>

              {/* Full Sections */}
              <div className="space-y-6">
                {selectedArticle.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                    <h4 className="text-base sm:text-lg font-black text-[#0b1739] text-blue-700">
                      {sec.heading}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Advice Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <span className="text-xs font-black text-slate-800 block">هل تحتاج مساعدة لتطبيق هذه الاستراتيجيات في متجرك؟</span>
                <p className="text-xs text-slate-500 font-bold">فريقنا التقني في Ecom Speed Pro يجهز لك متجرك المتكامل بهذه الخصائص خلال 24 ساعة فقط.</p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-white flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">Ecom Speed Pro Knowledge Base 2026</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer mr-auto"
              >
                إغلاق المقال
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
