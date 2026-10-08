"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, Phone, Mail, ChevronLeft } from "lucide-react";

interface FooterProps {
  onOpenOrderModal?: () => void;
}

export default function Footer({ onOpenOrderModal }: FooterProps) {
  const WHATSAPP_NUMBER = "+212 7 62 35 74 91";
  const WHATSAPP_LINK = "https://wa.me/212762357491?text=مرحباً%20Ecom%20Speed%20Pro%20أريد%20الاستفسار%20عن%20خدماتكم";
  const PHONE_LINK = "tel:+212762357491";
  const EMAIL_LINK = "mailto:support@ecomspeedpro.com";

  return (
    <footer className="w-full mt-auto relative z-20 overflow-hidden pt-2 pb-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
        
        {/* ======================================================== */}
        {/* BAR 1: CONTACT BAR (شريط تواصل معنا - مقاس مثالي وأنيق)   */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-[1100px] rounded-[40px] overflow-hidden drop-shadow-[0_10px_30px_rgba(37,99,235,0.18)] transition-all duration-300 hover:drop-shadow-[0_14px_40px_rgba(37,99,235,0.28)]">
          <Image
            src="/images/bar_contact_clean.png"
            alt="تواصل معنا - واتساب، اتصال مباشر، بريد إلكتروني Ecom Speed Pro"
            width={1672}
            height={480}
            priority
            className="w-full h-auto object-contain block"
          />

          {/* Interactive Button 1: WhatsApp (Left in visual layout / LTR coordinates) */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="group absolute top-[62%] left-[8.5%] w-[25.5%] h-[23%] rounded-full bg-gradient-to-r from-[#0088ff] to-[#7928ca] text-white text-[10px] sm:text-xs md:text-[13px] font-black flex items-center justify-between px-2 sm:px-3.5 shadow-[0_0_12px_rgba(0,136,255,0.5)] hover:shadow-[0_0_20px_rgba(121,40,202,0.8)] hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer z-10"
            title={`تواصل معنا عبر واتساب (${WHATSAPP_NUMBER})`}
          >
            <div className="flex items-center gap-1 sm:gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span dir="ltr" className="font-extrabold tracking-wide">{WHATSAPP_NUMBER}</span>
            </div>
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 shrink-0" />
          </a>

          {/* WhatsApp Orb Hotspot */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="absolute top-[35%] left-[2.5%] w-[12%] h-[45%] rounded-full cursor-pointer hover:bg-emerald-500/10 active:scale-95 transition-all z-10"
            title={`محادثة فورية على واتساب: ${WHATSAPP_NUMBER}`}
          />

          {/* Interactive Button 2: Direct Call (Center) */}
          <a
            href={PHONE_LINK}
            className="group absolute top-[62%] left-[41.5%] w-[25.5%] h-[23%] rounded-full bg-gradient-to-r from-[#0088ff] to-[#7928ca] text-white text-[10px] sm:text-xs md:text-[13px] font-black flex items-center justify-between px-2 sm:px-3.5 shadow-[0_0_12px_rgba(0,136,255,0.5)] hover:shadow-[0_0_20px_rgba(121,40,202,0.8)] hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer z-10"
            title={`اتصل بنا هاتفياً (${WHATSAPP_NUMBER})`}
          >
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span dir="ltr" className="font-extrabold tracking-wide">{WHATSAPP_NUMBER}</span>
            </div>
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 shrink-0" />
          </a>

          {/* Call Orb Hotspot */}
          <a
            href={PHONE_LINK}
            className="absolute top-[35%] left-[34%] w-[12%] h-[45%] rounded-full cursor-pointer hover:bg-blue-500/10 active:scale-95 transition-all z-10"
            title={`اتصال مباشر: ${WHATSAPP_NUMBER}`}
          />

          {/* Interactive Button 3: Email (Right in visual layout / LTR coordinates) */}
          <a
            href={EMAIL_LINK}
            className="group absolute top-[62%] left-[71.5%] w-[25.5%] h-[23%] rounded-full bg-gradient-to-r from-[#0088ff] to-[#7928ca] text-white text-[10px] sm:text-xs md:text-[13px] font-black flex items-center justify-between px-2 sm:px-3.5 shadow-[0_0_12px_rgba(0,136,255,0.5)] hover:shadow-[0_0_20px_rgba(121,40,202,0.8)] hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer z-10"
            title="راسلنا عبر البريد الإلكتروني (support@ecomspeedpro.com)"
          >
            <div className="flex items-center gap-1 sm:gap-1.5 truncate">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span dir="ltr" className="font-extrabold tracking-tight truncate">support@ecomspeedpro.com</span>
            </div>
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 shrink-0" />
          </a>

          {/* Email Orb Hotspot */}
          <a
            href={EMAIL_LINK}
            className="absolute top-[35%] left-[65%] w-[12%] h-[45%] rounded-full cursor-pointer hover:bg-blue-500/10 active:scale-95 transition-all z-10"
            title="راسلنا عبر البريد: support@ecomspeedpro.com"
          />
        </div>

        {/* ======================================================== */}
        {/* BAR 2: TRUST & PAYMENT BAR (شريط الدفع والأمان - مقاس مثالي) */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-[1250px] rounded-[36px] overflow-hidden drop-shadow-[0_10px_30px_rgba(37,99,235,0.16)] transition-all duration-300 hover:drop-shadow-[0_14px_40px_rgba(37,99,235,0.25)]">
          <Image
            src="/images/bar_payment_clean.png"
            alt="دفع آمن ومضمون، ابدأ مشروعك الآن مع Ecom Speed Pro، بوابات الدفع YouCan Pay, CMI, Visa, Mastercard"
            width={1672}
            height={175}
            priority
            className="w-full h-auto object-contain block"
          />

          {/* Center Promo CTA Hotspot 'اكتشف جميع الخدمات' */}
          <button
            onClick={onOpenOrderModal}
            className="group absolute top-[24%] left-[56%] w-[15%] h-[54%] rounded-full cursor-pointer hover:shadow-[0_0_25px_rgba(0,180,255,0.9)] hover:bg-white/10 active:scale-[0.96] transition-all flex items-center justify-center z-10"
            title="اكتشف جميع الخدمات - ابدأ مشروعك الآن"
          >
            <span className="sr-only">اكتشف جميع الخدمات</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg pointer-events-none whitespace-nowrap">
              طلب استشارة وبدء المشروع ✨
            </span>
          </button>

          {/* Left Trust Badge Hotspot */}
          <div
            className="group absolute top-[15%] left-[2%] w-[22%] h-[70%] rounded-full cursor-pointer flex items-center justify-center hover:bg-blue-400/10 transition-colors z-10"
            title="حماية متقدمة وتشفير أمني SSL 256-bit لجميع المعاملات"
          >
            <span className="sr-only">دفع آمن ومضمون مع تشفير وحماية متقدمة</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#0b1739] text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg pointer-events-none whitespace-nowrap">
              حماية وتشفير معتمد 100% 🛡️
            </span>
          </div>

          {/* Right Payment Logos Hotspot */}
          <div
            className="group absolute top-[15%] left-[73%] w-[25%] h-[70%] rounded-full cursor-pointer flex items-center justify-center hover:bg-blue-400/10 transition-colors z-10"
            title="طرق الدفع المتاحة: YouCan Pay, CMI, VISA, Mastercard"
          >
            <span className="sr-only">طرق الدفع المعتمدة: YouCan Pay, CMI, VISA, Mastercard</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#0b1739] text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg pointer-events-none whitespace-nowrap">
              بوابات دفع مغربية ودولية آمنة 💳
            </span>
          </div>
        </div>

        {/* Footer Sub-bar Copyright and Trust info */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-[#1e293b]/70 px-4 py-0.5 w-full max-w-[1250px]">
          <p>© 2026 ECOM SPEED PRO - جميع الحقوق محفوظة لشركة حلول التجارة الإلكترونية والتسويق الرقمي.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <a href="#privacy" className="hover:text-blue-600 transition-colors">سياسة الخصوصية</a>
            <span>•</span>
            <a href="#terms" className="hover:text-blue-600 transition-colors">شروط الاستخدام</a>
            <span>•</span>
            <a href={`https://wa.me/212762357491`} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
              <span>الدعم الفني:</span>
              <span dir="ltr">{WHATSAPP_NUMBER}</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
