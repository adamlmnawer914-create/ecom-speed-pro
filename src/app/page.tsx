"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesRibbon from "@/components/FeaturesRibbon";
import PricingSection from "@/components/PricingSection";
import SocialSection from "@/components/SocialSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import PolicyModal from "@/components/PolicyModal";
import CartModal from "@/components/CartModal";
import WishlistModal from "@/components/WishlistModal";
import AccountModal from "@/components/AccountModal";
import SearchModal from "@/components/SearchModal";
import PackageSelectModal from "@/components/PackageSelectModal";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [packageSelectOpen, setPackageSelectOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("منصة التجارة المتقدمة (Advanced SaaS)");
  const [selectedPrice, setSelectedPrice] = useState("5000 درهم");

  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyType, setPolicyType] = useState<"privacy" | "terms" | "guarantee">("privacy");

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Remove hashtag (#) from URL automatically on page mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const handleOpenOrder = (plan = "منصة التجارة المتقدمة (Advanced SaaS)", price = "5000 درهم") => {
    setSelectedPlan(plan);
    setSelectedPrice(price);
    setModalOpen(true);
  };

  const handleOpenPolicy = (type: "privacy" | "terms" | "guarantee") => {
    setPolicyType(type);
    setPolicyModalOpen(true);
  };

  const handleOpenSearch = (query: string) => {
    setSearchQuery(query);
    setSearchOpen(true);
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-[#eaf4fd] text-[#0c1833] overflow-x-hidden">
      {/* Store Background matching attached image exactly */}
      <div 
        className="fixed inset-0 w-full h-full bg-[url('/images/store_bg_master.png')] bg-cover bg-top bg-no-repeat -z-20 pointer-events-none" 
      />
      
      {/* Main Navbar with Crisp 3D Letter E Logo and complete mobile ribbon */}
      <Navbar
        onOpenOrderModal={handleOpenOrder}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        onOpenSearch={handleOpenSearch}
      />

      {/* Hero Section */}
      <HeroSection
        onOpenOrderModal={handleOpenOrder}
        onOpenPackageSelect={() => setPackageSelectOpen(true)}
      />

      {/* Features Ribbon */}
      <FeaturesRibbon />

      {/* Services & Pricing Section */}
      <PricingSection onSelectPlan={handleOpenOrder} />

      {/* Futuristic 3D Social Media Stage Section matching user attachment */}
      <SocialSection />

      {/* About Us & Vision Section */}
      <AboutSection />

      {/* Redesigned Luxury Master Footer Suite */}
      <Footer
        onOpenOrderModal={handleOpenOrder}
        onOpenPolicyModal={handleOpenPolicy}
      />

      {/* Shopping Cart Modal */}
      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onOpenOrderModal={handleOpenOrder}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onOpenOrderModal={handleOpenOrder}
      />

      {/* Client & Investor Account Portal Modal */}
      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        onOpenOrderModal={handleOpenOrder}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        query={searchQuery}
        onSelectPlan={handleOpenOrder}
      />

      {/* Interactive Package Selection Modal (When clicking Order Now) */}
      <PackageSelectModal
        isOpen={packageSelectOpen}
        onClose={() => setPackageSelectOpen(false)}
        onSelectPlan={handleOpenOrder}
      />

      {/* Interactive Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        selectedPrice={selectedPrice}
        onOpenPolicyModal={handleOpenPolicy}
      />

      {/* Interactive Policy & Guarantees Modal */}
      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        type={policyType}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/212762357491?text=مرحباً%20Ecom%20Speed%20Pro%20أريد%20الاستفسار%20عن%20خدماتكم"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-[#059669] via-[#10b981] to-[#34d399] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(16,185,129,0.5),0_0_15px_rgba(52,211,153,0.35)] hover:shadow-[0_12px_45px_rgba(16,185,129,0.7),0_0_25px_rgba(52,211,153,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer border-2 border-white/40"
        title="تواصل معنا عبر واتساب"
      >
        {/* Soft Radar Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30 pointer-events-none" />

        {/* Crisp Pure White Vector WhatsApp Icon */}
        <WhatsAppIcon size={30} color="white" />

        {/* Luxury Glass Hover Tooltip */}
        <span className="absolute right-16 sm:right-18 bg-[#0a193d]/95 backdrop-blur-md text-white text-xs font-bold py-2 px-3.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl border border-blue-400/30">
          تحدث معنا عبر واتساب الآن
        </span>
      </a>
    </main>
  );
}
