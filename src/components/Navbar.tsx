"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu, X, ArrowLeft, Sparkles, Layers, Phone } from "lucide-react";
import Logo from "@/components/Logo";

interface NavbarProps {
  onOpenOrderModal?: (plan?: string, price?: string) => void;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenAccount?: () => void;
  onOpenSearch?: (query: string) => void;
}

export default function Navbar({
  onOpenOrderModal,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenSearch,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Clean navigation helper without hashtag (#) in URL
  const navigateToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Clean hash from browser URL immediately
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenSearch?.(searchQuery.trim());
    } else {
      onOpenSearch?.("");
    }
  };

  return (
    <header className="w-full px-3 sm:px-4 pt-2.5 pb-2 sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto space-y-2">
        {/* Main Desktop & Mobile Primary Bar */}
        <nav className="bg-white/95 backdrop-blur-md border border-[#cbe4fb] rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.08)] px-3 sm:px-5 py-2 flex items-center justify-between transition-all duration-300">
          
          {/* Right in RTL: Logo with Exact 3D letter E mark */}
          <div className="flex items-center">
            <button
              onClick={() => navigateToSection("home")}
              className="flex items-center cursor-pointer"
              title="ECOM SPEED PRO"
            >
              <Logo size="md" />
            </button>
          </div>

          {/* Center in RTL: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-3 text-[14px] font-bold text-[#0a193c]">
            {/* 1. Active Home Tab */}
            <button
              onClick={() => navigateToSection("home")}
              className="bg-gradient-to-r from-[#00b4d8] via-[#3a86ff] to-[#7209b7] text-white px-5 xl:px-6 py-2 rounded-full font-black shadow-[0_0_15px_rgba(58,134,255,0.5)] transition-all duration-300 hover:shadow-[0_0_22px_rgba(58,134,255,0.8)] hover:scale-105 cursor-pointer"
            >
              الرئيسية
            </button>

            {/* 2. Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                onClick={() => navigateToSection("services")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span>الخدمات</span>
                <ChevronDown className="w-4 h-4 text-blue-600 transition-transform duration-200" />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-blue-100 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      navigateToSection("services");
                      onOpenOrderModal?.("صفحة الهبوط (Landing Page)", "500 درهم");
                    }}
                    className="w-full text-right block px-3 py-2 rounded-xl text-xs font-bold text-[#0a193c] hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    • صفحة الهبوط السريعة (500 درهم) 🔥
                  </button>
                  <button
                    onClick={() => {
                      navigateToSection("services");
                      onOpenOrderModal?.("المتجر القياسي (Standard Store)", "1500 درهم");
                    }}
                    className="w-full text-right block px-3 py-2 rounded-xl text-xs font-bold text-[#0a193c] hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    • المتجر القياسي متعدد المنتجات (1500 درهم) ⚡
                  </button>
                  <button
                    onClick={() => {
                      navigateToSection("services");
                      onOpenOrderModal?.("منصة التجارة المتقدمة (Advanced SaaS)", "5000 درهم");
                    }}
                    className="w-full text-right block px-3 py-2 rounded-xl text-xs font-bold text-[#0a193c] hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    • منصة التجارة المتقدمة SaaS (5000 درهم) 👑
                  </button>
                </div>
              )}
            </div>



            {/* 5. About Tab */}
            <button
              onClick={() => navigateToSection("about")}
              className="px-3 py-1.5 hover:text-blue-600 transition-colors cursor-pointer"
            >
              من نحن
            </button>

            {/* 6. Contact Tab */}
            <button
              onClick={() => navigateToSection("contact")}
              className="px-3 py-1.5 hover:text-blue-600 transition-colors cursor-pointer"
            >
              اتصل بنا
            </button>

            {/* 7. Track Order Tab (Public OTP Tracking) */}
            <Link
              href="/track"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 text-blue-700 border border-blue-200/90 transition-all font-black text-xs hover:scale-105 active:scale-95 shadow-xs"
              title="تتبع واستلام طلبك"
            >
              <span>تتبع طلبك</span>
              <span className="text-xs">🔍</span>
            </Link>
          </div>

          {/* Left in RTL: Search & Action Buttons Capsule */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center">
              <input
                type="text"
                placeholder="... ابحث عن خدمة أو منتج"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 xl:w-56 bg-white border border-[#b9dcfa] focus:border-blue-500 text-xs rounded-full pr-4 pl-10 py-1.5 outline-none transition-all placeholder:text-slate-400 text-slate-800 shadow-inner font-bold"
              />
              <button
                type="submit"
                className="absolute left-1 w-7 h-7 rounded-full bg-[#1d4ed8] hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                title="بحث"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>



            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer shrink-0"
              title="القائمة"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </nav>

        {/* Mobile Persistent Sub-Bar: Ensures ALL elements from the attached picture are directly visible on phone */}
        <div className="lg:hidden bg-white/95 backdrop-blur-md border border-[#cbe4fb] rounded-2xl p-2.5 shadow-sm flex flex-col gap-2">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="... ابحث عن خدمة أو منتج"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-[#b9dcfa] focus:border-blue-500 rounded-full pr-4 pl-10 py-1.5 text-xs outline-none font-bold placeholder:text-slate-400 text-slate-800"
            />
            <button
              type="submit"
              className="absolute left-1 w-6 h-6 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center shadow-xs cursor-pointer"
            >
              <Search className="w-3 h-3" />
            </button>
          </form>

          {/* Mobile Horizontal Scrollable Navigation Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs font-black whitespace-nowrap">
            <button
              onClick={() => navigateToSection("home")}
              className="bg-gradient-to-r from-[#00b4d8] via-[#3a86ff] to-[#7209b7] text-white px-3.5 py-1 rounded-full shadow-xs shrink-0 cursor-pointer"
            >
              الرئيسية
            </button>
            <button
              onClick={() => navigateToSection("services")}
              className="px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 shrink-0 cursor-pointer"
            >
              الخدمات ∨
            </button>

            <button
              onClick={() => navigateToSection("about")}
              className="px-3 py-1 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 shrink-0 cursor-pointer"
            >
              من نحن
            </button>
            <button
              onClick={() => navigateToSection("contact")}
              className="px-3 py-1 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 shrink-0 cursor-pointer"
            >
              اتصل بنا
            </button>
            <Link
              href="/track"
              className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 text-blue-700 border border-blue-200 shrink-0 cursor-pointer font-black"
            >
              تتبع طلبك 🔍
            </Link>
          </div>
        </div>

        {/* Mobile Expanded Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border border-blue-200 rounded-3xl shadow-2xl p-5 flex flex-col gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col gap-1.5 text-sm font-bold text-[#0a193c]">
              <button
                onClick={() => navigateToSection("home")}
                className="w-full text-right bg-gradient-to-r from-[#00b4d8] via-[#3a86ff] to-[#7209b7] text-white px-4 py-2.5 rounded-2xl font-black shadow-md"
              >
                الرئيسية
              </button>

              {/* Services Collapsible in Drawer */}
              <div className="rounded-2xl border border-blue-100 overflow-hidden bg-blue-50/40">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-blue-900 font-black cursor-pointer"
                >
                  <span>الخدمات وباقات الأسعار</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="px-3 pb-3 space-y-1.5 text-xs font-bold">
                    <button
                      onClick={() => {
                        navigateToSection("services");
                        onOpenOrderModal?.("صفحة الهبوط (Landing Page)", "500 درهم");
                      }}
                      className="w-full text-right p-2 rounded-xl bg-white text-slate-800 hover:text-blue-600 block shadow-xs"
                    >
                      • صفحة الهبوط السريعة (500 درهم)
                    </button>
                    <button
                      onClick={() => {
                        navigateToSection("services");
                        onOpenOrderModal?.("المتجر القياسي (Standard Store)", "1500 درهم");
                      }}
                      className="w-full text-right p-2 rounded-xl bg-white text-slate-800 hover:text-blue-600 block shadow-xs"
                    >
                      • المتجر القياسي متعدد المنتجات (1500 درهم)
                    </button>
                    <button
                      onClick={() => {
                        navigateToSection("services");
                        onOpenOrderModal?.("منصة التجارة المتقدمة (Advanced SaaS)", "5000 درهم");
                      }}
                      className="w-full text-right p-2 rounded-xl bg-white text-slate-800 hover:text-blue-600 block shadow-xs"
                    >
                      • منصة التجارة المتقدمة SaaS (5000 درهم)
                    </button>
                  </div>
                )}
              </div>



              <button
                onClick={() => navigateToSection("about")}
                className="w-full text-right px-4 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                من نحن ورؤيتنا
              </button>

              <button
                onClick={() => navigateToSection("contact")}
                className="w-full text-right px-4 py-2.5 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                اتصل بنا والدعم الفني
              </button>

              <Link
                href="/track"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-right px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 text-blue-800 font-black border border-blue-200 flex items-center justify-between"
              >
                <span>تتبع طلبك واستلام المتجر (OTP)</span>
                <span>🔍</span>
              </Link>
            </div>


          </div>
        )}

      </div>
    </header>
  );
}
