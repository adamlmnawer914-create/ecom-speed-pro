"use client";

import React from "react";
import { X, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "privacy" | "terms" | "guarantee";
}

export default function PolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  if (!isOpen) return null;

  const contentMap = {
    privacy: {
      title: "سياسة الخصوصية وحماية البيانات",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      badge: "تشفير وأمان معتمد 100%",
      sections: [
        {
          heading: "1. جمع المعلومات وسريتها",
          text: "نحن في ECOM SPEED PRO نلتزم بحماية خصوصية عملائنا. لا نقوم بمشاركة أي بيانات شخصية أو معلومات تجارية تخص متجرك أو منتجاتك أو عملائك مع أي طرف ثالث بأي شكل من الأشكال.",
        },
        {
          heading: "2. أمان المعاملات المالية",
          text: "جميع معاملات الدفع تتم عبر بوابات دفع بنكية معتمدة ومشفرة بأحدث بروتوكولات الأمان SSL 256-Bit. لا يتم تخزين أي بيانات بطاقات ائتمانية على خوادمنا.",
        },
        {
          heading: "3. ملكية المتجر والبيانات",
          text: "أنت المالك الحصري 100% لمتجرك الإلكتروني، لقاعدة بيانات عملائك، ولجميع ملفات وتصميمات موقعك بعد استلام المشروع وتسديد التكلفة المتفق عليها.",
        },
      ],
    },
    terms: {
      title: "شروط وأحكام الاستخدام والخدمة",
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      badge: "اتفاقية الخدمة الرسمية",
      sections: [
        {
          heading: "1. نطاق تقديم الخدمات",
          text: "تلتزم ECOM SPEED PRO بتسليم المتجر الإلكتروني أو صفحة الهبوط المتفق عليها بكامل المواصفات المذكورة في الباقة المختارة، متوافقة بنسبة 100% مع جميع الهواتف والحواسيب.",
        },
        {
          heading: "2. مدة التنفيذ والتسليم",
          text: "يتم تسليم صفحات الهبوط والمتاجر القياسية خلال مدة قياسية تتراوح بين 24 إلى 72 ساعة، والمنصات المتقدمة SaaS وفق الجدول الزمني المتفق عليه في العقد.",
        },
        {
          heading: "3. الدعم الفني والتعديلات",
          text: "يحق للعميل طلب التعديلات والمراجعات حتى الوصول إلى الرضا التام، مع توفير دعم فني مستمر ومجاني لمعالجة أي استفسارات تقنية.",
        },
      ],
    },
    guarantee: {
      title: "الضمان الذهبي وراحة البال",
      icon: <CheckCircle2 className="w-6 h-6 text-amber-500" />,
      badge: "ضمان رضا العميل 100%",
      sections: [
        {
          heading: "1. ضمان الجودة والأداء",
          text: "نضمن سرعة تحميل فائقة لمتجرك (أقل من ثانية واحدة) مع توافق تام وأعلى درجات تحويل الزوار إلى مشترين فعليين.",
        },
        {
          heading: "2. دعم ما بعد البيع",
          text: "فريقنا معك خطوة بخطوة بعد الإطلاق لتدريبك على إدارة المتجر ومتابعة الطلبات وتحديث المنتجات بكل سهولة.",
        },
        {
          heading: "3. الشفافية والمصداقية",
          text: "لا توجد أي رسوم خفية أو اشتراكات مفاجئة. السعر المعلن في كل باقة يشمل كل ما تحتاجه للبدء والنجاح.",
        },
      ],
    },
  };

  const current = contentMap[type] || contentMap.privacy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-blue-100 p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-inner">
              {current.icon}
            </div>
            <div>
              <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 inline-block mb-1">
                {current.badge}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0a193c]">
                {current.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center justify-center"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4 text-slate-700 leading-relaxed text-sm">
          {current.sections.map((sec, idx) => (
            <div key={idx} className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <h4 className="font-extrabold text-[#0a193c] text-base mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                {sec.heading}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                {sec.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 font-bold">
            ECOM SPEED PRO • موثوق ومعتمد رسمياً
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all"
          >
            فهمت وموافق
          </button>
        </div>
      </div>
    </div>
  );
}
