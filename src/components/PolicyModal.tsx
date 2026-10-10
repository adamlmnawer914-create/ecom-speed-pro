"use client";

import React from "react";
import { X, ShieldCheck, FileText, Award, Lock, Sparkles, Check } from "lucide-react";

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
      badge: "تشفير وأمان معتمد SSL 256-Bit 🛡️",
      badgeStyle: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
      glowColor: "from-emerald-500 via-teal-500 to-cyan-500",
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-[2.5px] shadow-[0_0_25px_rgba(16,185,129,0.45)]">
          <div className="w-full h-full bg-[#061727] rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
      ),
      sections: [
        {
          heading: "1. جمع المعلومات وسريتها التامة",
          text: "نحن في ECOM SPEED PRO نلتزم بحماية خصوصية عملائنا بأعلى المعايير العالمية. لا نقوم بمشاركة أي بيانات شخصية أو معلومات تجارية تخص متجرك أو منتجاتك أو زبائنك مع أي طرف ثالث تحت أي ظرف.",
        },
        {
          heading: "2. أمان المعاملات المالية والدفع الإلكتروني",
          text: "جميع معاملات الدفع تتم عبر بوابات دفع بنكية معتمدة ومشفرة بأحدث بروتوكولات الأمان المصرفي SSL 256-Bit. لا يتم تخزين أو تسجيل أي بيانات بطاقات بنكية على خوادمنا نهائياً.",
        },
        {
          heading: "3. الملكية الحصرية لبيانات المتجر",
          text: "أنت المالك القانوني الحصري 100% لمتجرك الإلكتروني، قاعدة بيانات عملائك، تصاميمك، وكافة مبيعاتك فور تسليم المشروع، بدون أي عمولات خفية.",
        },
      ],
    },
    terms: {
      title: "شروط وأحكام الاستخدام والخدمة",
      badge: "اتفاقية الخدمة والتعاقد الرسمي 📜",
      badgeStyle: "bg-blue-500/10 text-blue-700 border-blue-300",
      glowColor: "from-blue-600 via-indigo-600 to-cyan-500",
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[2.5px] shadow-[0_0_25px_rgba(37,99,235,0.45)]">
          <div className="w-full h-full bg-[#061338] rounded-2xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-cyan-300" />
          </div>
        </div>
      ),
      sections: [
        {
          heading: "1. نطاق تقديم الخدمات والمواصفات",
          text: "تلتزم ECOM SPEED PRO بتسليم المتجر الإلكتروني أو صفحة الهبوط بكامل المواصفات المحددة في الباقة المختارة، متوافقة 100% مع جميع أجهزة الهواتف الذكية والحواسيب وبسرعة تحميل قياسية.",
        },
        {
          heading: "2. مدة التنفيذ والتسليم المضمونة",
          text: "يتم تسليم صفحات الهبوط والمتاجر القياسية خلال مدة قياسية تتراوح بين 48 إلى 72 ساعة، بينما تنفذ منصات SaaS المتقدمة وفق جدول زمني دقيق يتم الاتفاق عليه ومتابعته خطوة بخطوة.",
        },
        {
          heading: "3. الدعم الفني والتعديلات غير المحدودة",
          text: "نوفر لك جلسات مراجعة وتعديلات حتى وصولك إلى الرضا التام، مع توفير تدريب مجاني ودعم فني متواصل عبر واتساب لمساعدتك في إدارة ومتابعة الطلبات.",
        },
      ],
    },
    guarantee: {
      title: "الضمان الذهبي وراحة البال",
      badge: "ضمان الرضا والالتزام 100% 👑",
      badgeStyle: "bg-amber-500/10 text-amber-800 border-amber-300",
      glowColor: "from-amber-400 via-yellow-400 to-amber-600",
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600 p-[2.5px] shadow-[0_0_25px_rgba(245,158,11,0.55)]">
          <div className="w-full h-full bg-[#1e1302] rounded-2xl flex items-center justify-center">
            <Award className="w-8 h-8 text-amber-400" />
          </div>
        </div>
      ),
      sections: [
        {
          heading: "1. ضمان الجودة والأداء الخارق",
          text: "نضمن سرعة تحميل فائقة لمتجرك (أقل من ثانية واحدة) مع بنية برمجية حديثة ترفع معدل التحويل والمبيعات لأقصى درجة ممكنة.",
        },
        {
          heading: "2. مرافقة مستمرة حتى تحقيق أولى مبيعاتك",
          text: "فريقنا معك ليس فقط لتسليم المتجر، بل للتأكد من جاهزية بوابات الدفع، ضبط إعلاناتك، والتأكد من استقبال الطلبات بسلاسة تامة.",
        },
        {
          heading: "3. الشفافية والمصداقية المطلقة",
          text: "لا توجد أي رسوم أو مصاريف خفية إطلاقاً. السعر المعلن في كل باقة يشمل كل ما يلزمك لبدء تجارتك بنجاح.",
        },
      ],
    },
  };

  const current = contentMap[type] || contentMap.privacy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-blue-100 p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            {current.icon}
            <div>
              <span className={`text-[11px] font-black px-3 py-0.5 rounded-full border inline-block mb-1.5 ${current.badgeStyle}`}>
                {current.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0a193c]">
                {current.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4 text-slate-700 leading-relaxed text-sm">
          {current.sections.map((sec, idx) => (
            <div key={idx} className="bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
              <h4 className="font-extrabold text-[#0a193c] text-base mb-2 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                {sec.heading}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                {sec.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 font-black flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>ECOM SPEED PRO • موثوق ومعتمد رسمياً لعام 2026</span>
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs shadow-md transition-all cursor-pointer"
          >
            فهمت وموافق
          </button>
        </div>
      </div>
    </div>
  );
}
