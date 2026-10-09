"use client";

import React from "react";
import { Headphones, ShieldCheck, Truck, Mail } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-gradient-to-r from-[#051130] via-[#091b48] to-[#051130] text-white text-xs py-2 px-4 shadow-sm border-b border-blue-950/60 relative z-30">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* Right side in RTL: "تواصل معنا" + Social Icons */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-white text-[12px] tracking-wide ml-1">تواصل معنا</span>
          <div className="flex items-center gap-2.5 text-white/90">
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@EcomSpeedPro"
              target="_blank"
              rel="noreferrer"
              title="يوتيوب Ecom Speed Pro"
              className="hover:text-red-400 hover:scale-110 transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/Ecom-Speed-Pro/61595388710709/?rdid=XmASTJaHpZvxdwJi&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DjRWQFryH%2F"
              target="_blank"
              rel="noreferrer"
              title="فيسبوك Ecom Speed Pro"
              className="hover:text-blue-400 hover:scale-110 transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/ecom_speed_pro"
              target="_blank"
              rel="noreferrer"
              title="إنستغرام Ecom Speed Pro"
              className="hover:text-pink-400 hover:scale-110 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              title="تيك توك"
              className="hover:text-teal-400 hover:scale-110 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.87 2.89 2.89 0 0 1-2.88-2.87 2.89 2.89 0 0 1 2.88-2.87c.37 0 .73.07 1.05.21V9.52a6.34 6.34 0 0 0-1.05-.09A6.33 6.33 0 0 0 3 15.76a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.17 8.17 0 0 0 4.91 1.62V6.89c-.66 0-1.35-.07-2-.2z" />
              </svg>
            </a>

            {/* X */}
            <a
              href="https://x.com/EcomSpeedPro"
              target="_blank"
              rel="noreferrer"
              title="منصة X"
              className="hover:text-white hover:scale-110 transition-all duration-200"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:contact@ecomspeedpro.com"
              title="البريد الإلكتروني"
              className="hover:text-cyan-400 hover:scale-110 transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Left side in RTL: Badges matching the image */}
        <div className="hidden sm:flex items-center gap-4 md:gap-6 text-[11px] md:text-[12px] font-semibold text-white/95">
          <div className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
            <Truck className="w-4 h-4 text-white" />
            <span>شحن سريع للمنتجات</span>
          </div>

          <div className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>دفع آمن</span>
          </div>

          <div className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
            <Headphones className="w-4 h-4 text-white" />
            <span>دعم فني 24/7</span>
          </div>
        </div>

      </div>
    </div>
  );
}
