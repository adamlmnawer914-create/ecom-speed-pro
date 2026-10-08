"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, ShoppingCart, Heart, User, ChevronDown, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenOrderModal?: (plan?: string) => void;
  onOpenCart?: () => void;
}

export default function Navbar({ onOpenOrderModal, onOpenCart }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);

  return (
    <header className="w-full px-4 pt-3 pb-2 sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto">
        <nav className="bg-white/95 backdrop-blur-md border border-[#cbe4fb] rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.08)] px-5 py-2 flex items-center justify-between transition-all duration-300">
          
          {/* Right in RTL: Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center group">
              <Image
                src="/images/logo_exact_clean.png"
                alt="ECOM SPEED PRO"
                width={250}
                height={50}
                priority
                className="h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </a>
          </div>

          {/* Center in RTL: Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 text-[14px] font-bold text-[#0a193d]">
            {/* Active Home Tab */}
            <a
              href="#"
              className="bg-gradient-to-r from-[#00b4d8] via-[#3a86ff] to-[#7209b7] text-white px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(58,134,255,0.5)] transition-all duration-300 hover:shadow-[0_0_22px_rgba(58,134,255,0.8)] hover:scale-105"
            >
              الرئيسية
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:text-blue-600 transition-colors"
              >
                <span>الخدمات</span>
                <ChevronDown className="w-4 h-4 text-blue-600 transition-transform duration-200" />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-blue-100 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <a
                    href="#services"
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-[#0a193d] hover:bg-blue-50 hover:text-blue-600"
                  >
                    صفحات الهبوط (Landing Pages)
                  </a>
                  <a
                    href="#services"
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-[#0a193d] hover:bg-blue-50 hover:text-blue-600"
                  >
                    المتاجر القياسية متعددة المنتجات
                  </a>
                  <a
                    href="#services"
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-[#0a193d] hover:bg-blue-50 hover:text-blue-600"
                  >
                    منصة التجارة المتقدمة (SaaS)
                  </a>
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsDropdown(true)}
              onMouseLeave={() => setProductsDropdown(false)}
            >
              <button
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:text-blue-600 transition-colors"
              >
                <span>المنتجات</span>
                <ChevronDown className="w-4 h-4 text-blue-600 transition-transform duration-200" />
              </button>

              {productsDropdown && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-blue-100 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <a
                    href="#services"
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-[#0a193d] hover:bg-blue-50 hover:text-blue-600"
                  >
                    قوالب التجارة الإلكترونية
                  </a>
                  <a
                    href="#services"
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-[#0a193d] hover:bg-blue-50 hover:text-blue-600"
                  >
                    أنظمة إدارة المخزون
                  </a>
                </div>
              )}
            </div>

            {/* Other links */}
            <a
              href="#blog"
              className="px-2.5 py-1.5 hover:text-blue-600 transition-colors"
            >
              المدونة
            </a>

            <a
              href="#about"
              className="px-2.5 py-1.5 hover:text-blue-600 transition-colors"
            >
              من نحن
            </a>

            <a
              href="#contact"
              className="px-2.5 py-1.5 hover:text-blue-600 transition-colors"
            >
              اتصل بنا
            </a>
          </div>

          {/* Left in RTL: Search & Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input Box */}
            <div className="relative hidden md:flex items-center">
              <input
                type="text"
                placeholder="... ابحث عن خدمة أو منتج"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-56 bg-white border border-[#b9dcfa] focus:border-blue-500 text-xs rounded-full pr-4 pl-10 py-1.5 outline-none transition-all placeholder:text-slate-400 text-slate-800 shadow-inner"
              />
              <button
                type="button"
                className="absolute left-1 w-7 h-7 rounded-full bg-[#1d4ed8] hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-sm"
                title="بحث"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 Action Buttons in a clean white capsule matching the image */}
            <div className="flex items-center gap-3.5 bg-white border border-[#dbeafe] rounded-full px-4 py-1.5 shadow-sm">
              {/* Shopping Cart Icon with Badge */}
              <button
                onClick={onOpenCart}
                title="سلة المشتريات"
                className="relative text-[#1d4ed8] hover:scale-110 transition-transform"
              >
                <ShoppingCart className="w-4 h-4 fill-current" />
                <span className="absolute -top-2.5 -right-2 bg-[#1d4ed8] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                  0
                </span>
              </button>

              {/* Heart Wishlist */}
              <button
                title="المفضلة"
                className="text-[#1d4ed8] hover:scale-110 transition-transform"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>

              {/* User Account */}
              <button
                title="حسابي"
                className="text-[#1d4ed8] hover:scale-110 transition-transform"
              >
                <User className="w-4 h-4 fill-current" />
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white/98 backdrop-blur-md border border-blue-100 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-3">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="... ابحث عن خدمة أو منتج"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-full pr-4 pl-10 py-2 text-xs outline-none"
              />
              <button
                type="button"
                className="absolute left-1.5 w-7 h-7 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col gap-1 text-sm font-bold text-[#0a193d] pt-1">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-center font-bold"
              >
                الرئيسية
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                الخدمات وبطاقات الأسعار
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                المميزات والضمانات
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                من نحن
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                اتصل بنا
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
