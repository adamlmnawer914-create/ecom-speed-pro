"use client";

import React, { useState } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesRibbon from "@/components/FeaturesRibbon";
import PricingSection from "@/components/PricingSection";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import PolicyModal from "@/components/PolicyModal";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("منصة التجارة المتقدمة (Advanced SaaS)");
  const [selectedPrice, setSelectedPrice] = useState("5000 درهم");

  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyType, setPolicyType] = useState<"privacy" | "terms" | "guarantee">("privacy");

  const handleOpenOrder = (plan = "منصة التجارة المتقدمة (Advanced SaaS)", price = "5000 درهم") => {
    setSelectedPlan(plan);
    setSelectedPrice(price);
    setModalOpen(true);
  };

  const handleOpenPolicy = (type: "privacy" | "terms" | "guarantee") => {
    setPolicyType(type);
    setPolicyModalOpen(true);
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-[#eaf4fd] text-[#0c1833] overflow-x-hidden">
      {/* Store Background matching attached image exactly */}
      <div 
        className="fixed inset-0 w-full h-full bg-[url('/images/store_bg_master.png')] bg-cover bg-top bg-no-repeat -z-20 pointer-events-none" 
      />
      
      {/* Top Bar */}
      <TopBar />

      {/* Main Navbar with Crisp Vector Logo */}
      <Navbar onOpenOrderModal={handleOpenOrder} />

      {/* Hero Section */}
      <HeroSection onOpenOrderModal={handleOpenOrder} />

      {/* Features Ribbon */}
      <FeaturesRibbon />

      {/* Services & Pricing Section */}
      <PricingSection onSelectPlan={handleOpenOrder} />

      {/* Futuristic 3D Social Media Stage Section matching user attachment */}
      <SocialSection />

      {/* Redesigned Luxury Master Footer Suite */}
      <Footer
        onOpenOrderModal={handleOpenOrder}
        onOpenPolicyModal={handleOpenPolicy}
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
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-green-500 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(16,185,129,0.5)] hover:shadow-[0_4px_35px_rgba(16,185,129,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
        title="تواصل معنا عبر واتساب"
      >
        <WhatsAppIcon size={30} />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          تحدث معنا الآن
        </span>
      </a>
    </main>
  );
}
