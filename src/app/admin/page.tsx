"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  User,
  Bell,
  LogOut,
  Home,
  ShoppingCart,
  Users,
  Package,
  CreditCard,
  TrendingUp,
  Settings,
  FileSpreadsheet,
  CheckCircle2,
  Hourglass,
  Wallet,
  Search,
  Download,
  ChevronDown,
  Calendar,
  Mail,
  MapPin,
  Building2,
  Coins,
  Eye,
  ShieldCheck,
  X,
  Phone,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Logo from "@/components/Logo";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface OrderItem {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  planTitle: string;
  price: number;
  formattedPrice: string;
  paymentMethod: string;
  productImages: string[];
  productNotes?: string;
  status: "paid" | "review" | "pending";
  dateFormatted: string;
  createdAt: string;
}

const DEFAULT_ORDERS: OrderItem[] = [
  {
    id: "ESP-1028",
    customerName: "محمد العلوي",
    customerPhone: "06 12 34 56 78",
    customerEmail: "m.alaoui@example.com",
    city: "الدار البيضاء",
    planTitle: "المتجر القياسي",
    price: 1500,
    formattedPrice: "1500 درهم",
    paymentMethod: "تحويل بنكي",
    productImages: ["/images/card_standard_new.webp", "/images/card_landing_new.webp"],
    productNotes: "متجر متكامل متعدد المنتجات للعلامات التجارية الطموحة",
    status: "paid",
    dateFormatted: "10 أكتوبر 2026 في 14:32",
    createdAt: "2026-10-10T14:32:00Z",
  },
  {
    id: "ESP-1027",
    customerName: "سارة بناني",
    customerPhone: "06 98 76 54 32",
    customerEmail: "s.bennani@example.com",
    city: "الرباط",
    planTitle: "صفحة الهبوط",
    price: 500,
    formattedPrice: "500 درهم",
    paymentMethod: "بطاقة بنكية",
    productImages: ["/images/card_landing_new.webp"],
    productNotes: "تصميم مخصص لتحقيق أعلى معدل تحويل لمنتج رابح",
    status: "paid",
    dateFormatted: "09 أكتوبر 2026 في 11:20",
    createdAt: "2026-10-09T11:20:00Z",
  },
  {
    id: "ESP-1026",
    customerName: "يوسف أمين",
    customerPhone: "06 45 67 89 01",
    customerEmail: "y.amine@example.com",
    city: "مراكش",
    planTitle: "منصة التجارة المتقدمة",
    price: 5000,
    formattedPrice: "5000 درهم",
    paymentMethod: "PayPal",
    productImages: ["/images/card_saas_new.webp"],
    productNotes: "حل برمجي VIP متكامل لكبار التجار والشركات التوسعية",
    status: "review",
    dateFormatted: "08 أكتوبر 2026 في 16:45",
    createdAt: "2026-10-08T16:45:00Z",
  },
];

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<OrderItem[]>(DEFAULT_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem>(DEFAULT_ORDERS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("orders");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Sync orders with API / localStorage
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        let apiOrders: any[] = [];
        if (data && data.success && Array.isArray(data.orders)) {
          apiOrders = data.orders;
        }

        let localOrders: any[] = [];
        try {
          const stored = localStorage.getItem("ecom_speed_pro_orders");
          if (stored) localOrders = JSON.parse(stored);
        } catch (e) {
          console.warn("Storage warning:", e);
        }

        const formattedMerged: OrderItem[] = [...DEFAULT_ORDERS];

        [...apiOrders, ...localOrders].forEach((item) => {
          if (!formattedMerged.find((o) => o.id === item.id)) {
            formattedMerged.unshift({
              id: item.id || `ESP-${Math.floor(1000 + Math.random() * 9000)}`,
              customerName: item.customerName || "عميل مميز",
              customerPhone: item.customerPhone || "06 00 00 00 00",
              customerEmail: item.customerEmail || "client@example.com",
              city: item.city || "الدار البيضاء",
              planTitle: item.planTitle || "المتجر القياسي",
              price: item.price || 1500,
              formattedPrice: item.formattedPrice || `${item.price || 1500} درهم`,
              paymentMethod:
                item.paymentMethod === "card"
                  ? "بطاقة بنكية"
                  : item.paymentMethod === "youcan"
                  ? "YouCan Pay"
                  : item.paymentMethod === "cmi"
                  ? "بوابة CMI"
                  : item.paymentMethod === "whatsapp"
                  ? "واتساب VIP"
                  : item.paymentMethod || "تحويل بنكي",
              productImages: item.productImages || ["/images/card_standard_new.webp"],
              productNotes: item.productNotes || "",
              status: item.status === "completed" ? "paid" : item.status === "new" ? "review" : "paid",
              dateFormatted: "اليوم في " + new Date(item.createdAt || Date.now()).toLocaleTimeString("ar-MA", { hour: "2-digit", minute: "2-digit" }),
              createdAt: item.createdAt || new Date().toISOString(),
            });
          }
        });

        setOrders(formattedMerged);
        if (formattedMerged.length > 0) {
          setSelectedOrder(formattedMerged[0]);
        }
      } catch (err) {
        console.error("Error loading orders:", err);
      }
    };

    loadOrders();
  }, []);

  // Filtered orders
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerPhone.includes(searchQuery) ||
      ord.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && ord.status === "paid") ||
      (statusFilter === "review" && ord.status === "review");

    const matchesMethod = methodFilter === "all" || ord.paymentMethod.includes(methodFilter);
    const matchesPlan = planFilter === "all" || ord.planTitle.includes(planFilter);

    return matchesSearch && matchesStatus && matchesMethod && matchesPlan;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["ID", "Customer", "Phone", "Email", "Plan", "Price", "Method", "City", "Status", "Date"];
    const rows = filteredOrders.map((o) => [
      o.id,
      o.customerName,
      o.customerPhone,
      o.customerEmail,
      o.planTitle,
      o.price,
      o.paymentMethod,
      o.city,
      o.status,
      o.dateFormatted,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ecom_speed_pro_orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#02133f] via-[#052b75] to-[#011440] text-slate-800 p-3 sm:p-5 lg:p-6 relative overflow-x-hidden font-sans selection:bg-cyan-500 selection:text-black"
      dir="rtl"
    >
      {/* Background Cosmic Ethereal Rays */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/25 via-blue-600/10 to-transparent" />
        <div className="absolute -top-32 right-1/4 w-[750px] h-[750px] bg-cyan-400/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 left-1/4 w-[750px] h-[750px] bg-blue-500/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1720px] mx-auto flex flex-col gap-4">
        
        {/* ======================================================== */}
        {/* 1. TOP HEADER (EXACTLY MATCHING ATTACHED SCREENSHOT)     */}
        {/* ======================================================== */}
        <header className="w-full flex items-center justify-between px-2 sm:px-4 py-1">
          
          {/* Right side in RTL: Official Brand Logo Capsule */}
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white px-3.5 py-1.5 shadow-[0_4px_20px_rgba(0,30,80,0.25)] border border-white/80 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-fuchsia-600 p-[2px] shadow-sm flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-cyan-500 to-purple-600 text-lg">
                  E
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-[#0b1739] tracking-wider block">
                  ECOM SPEED PRO
                </span>
                <span className="text-[9.5px] text-[#475569] font-bold block">
                  حلول التجارة الإلكترونية والتسويق الرقمي
                </span>
              </div>
            </div>
          </div>

          {/* Center: Luminous "لوحة التحكم" with Grid Icon */}
          <div className="flex items-center gap-2.5 text-white font-black text-xl sm:text-2xl drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">
            <LayoutGrid className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            <span>لوحة التحكم</span>
          </div>

          {/* Left side in RTL: Profile Pill + Notification + Exit */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* User Profile Pill */}
            <div className="rounded-full bg-white px-3.5 py-1.5 shadow-[0_4px_20px_rgba(0,30,80,0.2)] border border-white/70 flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] flex items-center justify-center text-white shrink-0 shadow-sm">
                <User className="w-4 h-4 fill-current" />
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs font-black text-[#0a193c] block leading-tight">
                  أحمد المدير
                </span>
                <span className="text-[9.5px] text-blue-600 font-bold block leading-tight">
                  مدير النظام
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Notification Bell with Badge 3 */}
            <div className="w-10 h-10 rounded-full bg-white shadow-md border border-white/70 flex items-center justify-center relative hover:scale-105 transition-all text-slate-700 cursor-pointer">
              <Bell className="w-4 h-4 text-slate-700" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ec4899] text-white text-[9px] font-black flex items-center justify-center shadow-sm">
                3
              </span>
            </div>

            {/* Logout / Exit Button */}
            <a
              href="/"
              className="w-10 h-10 rounded-full bg-white shadow-md border border-white/70 flex items-center justify-center text-slate-700 hover:text-rose-600 hover:scale-105 transition-all cursor-pointer"
              title="العودة للمتجر"
            >
              <LogOut className="w-4 h-4 rotate-180" />
            </a>

          </div>

        </header>

        {/* ======================================================== */}
        {/* 2. MAIN STAGE (SIDEBAR + MAIN GLASS CARD)                */}
        {/* ======================================================== */}
        <div className="flex flex-col xl:flex-row gap-4 items-stretch w-full">
          
          {/* ==================================================== */}
          {/* RIGHT SIDEBAR (FLOATING VERTICAL MENU RAIL)          */}
          {/* ==================================================== */}
          <aside className="xl:w-[150px] shrink-0 rounded-[28px] bg-gradient-to-b from-[#0a2364]/95 via-[#06184a]/95 to-[#041238]/95 border border-cyan-400/40 p-3 shadow-[0_15px_40px_rgba(2,10,35,0.6)] flex flex-row xl:flex-col gap-2 justify-between xl:justify-start backdrop-blur-xl overflow-x-auto">
            
            {/* 1. الرئيسية */}
            <button
              onClick={() => setActiveTab("home")}
              className={`flex-1 xl:flex-initial rounded-2xl flex items-center justify-between px-3.5 py-3 transition-all cursor-pointer text-xs font-bold ${
                activeTab === "home"
                  ? "bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#3b82f6] text-white shadow-[0_0_25px_rgba(217,70,239,0.7)] font-black"
                  : "text-cyan-100/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>الرئيسية</span>
            </button>

            {/* 2. الطلبات (ACTIVE GLOWING CAPSULE AS IN SCREENSHOT) */}
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 xl:flex-initial rounded-2xl flex items-center justify-between px-3.5 py-3 transition-all cursor-pointer text-xs ${
                activeTab === "orders"
                  ? "bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#3b82f6] text-white shadow-[0_0_25px_rgba(217,70,239,0.7),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-fuchsia-300/60 font-black scale-[1.02]"
                  : "text-cyan-100/90 hover:text-white hover:bg-white/10 font-bold"
              }`}
            >
              <ShoppingCart className="w-4 h-4 shrink-0" />
              <span>الطلبات</span>
            </button>

            {/* 3. العملاء */}
            <button
              onClick={() => setActiveTab("customers")}
              className={`flex-1 xl:flex-initial rounded-2xl flex items-center justify-between px-3.5 py-3 transition-all cursor-pointer text-xs font-bold ${
                activeTab === "customers"
                  ? "bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#3b82f6] text-white shadow-[0_0_25px_rgba(217,70,239,0.7)] font-black"
                  : "text-cyan-100/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>العملاء</span>
            </button>

            {/* 4. الباقات */}
            <button
              onClick={() => setActiveTab("packages")}
              className={`flex-1 xl:flex-initial rounded-2xl flex items-center justify-between px-3.5 py-3 transition-all cursor-pointer text-xs font-bold ${
                activeTab === "packages"
                  ? "bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#3b82f6] text-white shadow-[0_0_25px_rgba(217,70,239,0.7)] font-black"
                  : "text-cyan-100/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <Package className="w-4 h-4 shrink-0" />
              <span>الباقات</span>
            </button>

            {/* 5. المدفوعات */}
            <button
              onClick={() => setActiveTab("payments")}
              className={`flex-1 xl:flex-initial rounded-2xl flex items-center justify-between px-3.5 py-3 transition-all cursor-pointer text-xs font-bold ${
                activeTab === "payments"
                  ? "bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#3b82f6] text-white shadow-[0_0_25px_rgba(217,70,239,0.7)] font-black"
                  : "text-cyan-100/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <CreditCard className="w-4 h-4 shrink-0" />
              <span>المدفوعات</span>
            </button>

            {/* 6. التقارير */}
            <button
              onClick={() => setActiveTab("reports")}
              className={`flex-1 xl:flex-initial rounded-2xl flex items-center justify-between px-3.5 py-3 transition-all cursor-pointer text-xs font-bold ${
                activeTab === "reports"
                  ? "bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#3b82f6] text-white shadow-[0_0_25px_rgba(217,70,239,0.7)] font-black"
                  : "text-cyan-100/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>التقارير</span>
            </button>

            {/* 7. الإعدادات */}
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 xl:flex-initial rounded-2xl flex items-center justify-between px-3.5 py-3 transition-all cursor-pointer text-xs font-bold ${
                activeTab === "settings"
                  ? "bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#3b82f6] text-white shadow-[0_0_25px_rgba(217,70,239,0.7)] font-black"
                  : "text-cyan-100/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>الإعدادات</span>
            </button>

          </aside>

          {/* ==================================================== */}
          {/* MAIN WHITE GLASSMORPHIC CARD (LARGE WORKSTATION)     */}
          {/* ==================================================== */}
          <main className="flex-1 rounded-[32px] bg-gradient-to-b from-[#f8fbff]/95 via-[#f1f6fd]/95 to-[#e8f1fc]/95 border-2 border-white/80 shadow-[0_25px_70px_rgba(0,25,80,0.3),inset_0_1px_2px_rgba(255,255,255,0.9)] p-5 sm:p-6 lg:p-7 flex flex-col gap-5 backdrop-blur-2xl">
            
            {/* --- SECTION TITLE --- */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <div className="w-full h-full bg-[#0a1f58] rounded-[14px] flex items-center justify-center text-cyan-300">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0b1739] tracking-tight">
                إدارة الطلبات والمدفوعات
              </h2>
            </div>

            {/* --- TOP 4 KPI METRIC CARDS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              
              {/* KPI 1 (Far Right in RTL): إجمالي الطلبات (128) */}
              <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-[0_4px_20px_rgba(37,99,235,0.06)] flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#60a5fa] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(59,130,246,0.35)] shrink-0">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#64748b] block mb-1">إجمالي الطلبات</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">128</div>
                  <span className="text-[10px] text-[#475569] font-bold mt-1 block">100% من إجمالي الطلبات</span>
                </div>
              </div>

              {/* KPI 2: الطلبات المدفوعة (96) */}
              <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-[0_4px_20px_rgba(37,99,235,0.06)] flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#10b981] to-[#34d399] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(16,185,129,0.35)] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#64748b] block mb-1">الطلبات المدفوعة</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">96</div>
                  <span className="text-[10px] text-[#475569] font-bold mt-1 block">75% من إجمالي الطلبات</span>
                </div>
              </div>

              {/* KPI 3: قيد المراجعة (12) */}
              <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-[0_4px_20px_rgba(37,99,235,0.06)] flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f97316] to-[#fb923c] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(249,115,22,0.35)] shrink-0">
                  <Hourglass className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#64748b] block mb-1">قيد المراجعة</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">12</div>
                  <span className="text-[10px] text-[#475569] font-bold mt-1 block">9.4% من إجمالي الطلبات</span>
                </div>
              </div>

              {/* KPI 4 (Far Left in RTL): إجمالي المبيعات (87,500 درهم) */}
              <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-[0_4px_20px_rgba(37,99,235,0.06)] flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#a855f7] to-[#c084fc] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(168,85,247,0.35)] shrink-0">
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#64748b] block mb-1">إجمالي المبيعات</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">87,500 درهم</div>
                  <span className="text-[10px] text-[#16a34a] font-black mt-1 flex items-center justify-end gap-1">
                    <span>12%+ من الشهر الماضي</span>
                    <span>↑</span>
                  </span>
                </div>
              </div>

            </div>

            {/* --- ACTION & FILTER TOOLBAR (MATCHING EXACT POSITION IN ATTACHED SCREENSHOT) --- */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full pt-1">
              
              {/* Right Side in RTL: Large Search Bar */}
              <div className="relative w-full md:w-[360px] lg:w-[420px]">
                <input
                  type="text"
                  placeholder="ابحث باسم العميل أو رقم الهاتف..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 rounded-2xl bg-white border border-[#d2e2f3] text-xs font-bold text-[#0b1739] placeholder-[#94a3b8] outline-none focus:border-blue-500 shadow-sm transition-all"
                />
                <Search className="w-4 h-4 text-blue-500 absolute right-3.5 top-3" />
              </div>

              {/* Middle: Filter Dropdowns */}
              <div className="flex flex-wrap items-center gap-2.5">
                
                {/* Dropdown 1: حالة الدفع */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none px-4 py-2.5 pl-8 rounded-2xl bg-white border border-[#d2e2f3] text-xs font-bold text-[#0b1739] outline-none shadow-sm cursor-pointer pr-3"
                  >
                    <option value="all">حالة الدفع</option>
                    <option value="paid">مدفوع</option>
                    <option value="review">قيد المراجعة</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3.5 pointer-events-none" />
                </div>

                {/* Dropdown 2: طريقة الدفع */}
                <div className="relative">
                  <select
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                    className="appearance-none px-4 py-2.5 pl-8 rounded-2xl bg-white border border-[#d2e2f3] text-xs font-bold text-[#0b1739] outline-none shadow-sm cursor-pointer pr-3"
                  >
                    <option value="all">طريقة الدفع</option>
                    <option value="تحويل">تحويل بنكي</option>
                    <option value="بطاقة">بطاقة بنكية</option>
                    <option value="PayPal">PayPal</option>
                    <option value="YouCan">YouCan Pay</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3.5 pointer-events-none" />
                </div>

                {/* Dropdown 3: كل الباقات */}
                <div className="relative">
                  <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="appearance-none px-4 py-2.5 pl-8 rounded-2xl bg-white border border-[#d2e2f3] text-xs font-bold text-[#0b1739] outline-none shadow-sm cursor-pointer pr-3"
                  >
                    <option value="all">كل الباقات</option>
                    <option value="الهبوط">صفحة الهبوط</option>
                    <option value="القياسي">المتجر القياسي</option>
                    <option value="المتقدمة">منصة التجارة المتقدمة</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3.5 pointer-events-none" />
                </div>

              </div>

              {/* Far Left in RTL: Export Button (Vibrant Magenta-Blue Gradient) */}
              <div className="ms-auto md:ms-0">
                <button
                  onClick={handleExportCSV}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#d946ef] via-[#9333ea] to-[#3b82f6] hover:from-[#c026d3] hover:to-[#2563eb] text-white font-black text-xs shadow-[0_4px_18px_rgba(147,51,234,0.35)] flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>تصدير البيانات</span>
                </button>
              </div>

            </div>

            {/* --- TWO-COLUMN LOWER WORKSTATION (MATCHING EXACT SCREENSHOT COLUMNS) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* ==================================================== */}
              {/* RIGHT PART (COL 4 / RTL): تفاصيل الطلب #ESP-1028     */}
              {/* ==================================================== */}
              <div className="lg:col-span-4 rounded-3xl bg-white border border-[#d4e4f7] p-4 sm:p-5 shadow-sm flex flex-col gap-3.5 order-1">
                
                {/* Header Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-white p-3 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-cyan-200" />
                    <span className="text-xs sm:text-sm font-black">
                      تفاصيل الطلب #{selectedOrder.id}
                    </span>
                  </div>
                </div>

                {/* Info Fields: Labels on RIGHT, Values on LEFT */}
                <div className="space-y-2.5 text-xs">
                  
                  {/* Field 1: اسم المشتري */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                    <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      <span>اسم المشتري</span>
                    </span>
                    <span className="font-bold text-[#0b1739]">{selectedOrder.customerName}</span>
                  </div>

                  {/* Field 2: رقم الهاتف */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                    <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-600" />
                      <span>رقم الهاتف</span>
                    </span>
                    <a
                      href={`https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span dir="ltr">{selectedOrder.customerPhone}</span>
                    </a>
                  </div>

                  {/* Field 3: الباقة المشتراة */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                    <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-blue-600" />
                      <span>الباقة المشتراة</span>
                    </span>
                    <span className="font-bold text-[#0b1739]">{selectedOrder.planTitle}</span>
                  </div>

                  {/* Field 4: المبلغ */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                    <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-blue-600" />
                      <span>المبلغ</span>
                    </span>
                    <span className="font-black text-[#0b1739] font-mono">{selectedOrder.formattedPrice}</span>
                  </div>

                  {/* Field 5: تاريخ ووقت الدفع */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                    <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>تاريخ ووقت الدفع</span>
                    </span>
                    <span className="font-bold text-[#334155]">{selectedOrder.dateFormatted}</span>
                  </div>

                  {/* Field 6: طريقة الدفع */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                    <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>طريقة الدفع</span>
                    </span>
                    <span className="font-bold text-[#0b1739]">{selectedOrder.paymentMethod}</span>
                  </div>

                  {/* Field 7: البريد الإلكتروني */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                    <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      <span>البريد الإلكتروني</span>
                    </span>
                    <span className="font-mono text-[#475569] text-[11px]">{selectedOrder.customerEmail}</span>
                  </div>

                  {/* Field 8: المدينة */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                    <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>المدينة</span>
                    </span>
                    <span className="font-bold text-[#0b1739]">{selectedOrder.city}</span>
                  </div>

                  {/* Field 9: حالة الدفع */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>حالة الدفع</span>
                    </span>
                    {selectedOrder.status === "paid" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>مدفوع</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-xs">
                        <Hourglass className="w-3.5 h-3.5 text-amber-600" />
                        <span>قيد المراجعة</span>
                      </span>
                    )}
                  </div>

                </div>

                {/* Uploaded Product Photos Section */}
                {selectedOrder.productImages && selectedOrder.productImages.length > 0 && (
                  <div className="pt-2 border-t border-[#f1f5f9]">
                    <span className="text-[11px] font-black text-[#0b1739] block mb-1.5">
                      صور المنتج المرفقة ({selectedOrder.productImages.length}):
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {selectedOrder.productImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setLightboxImage(img)}
                          className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#d2e2f3] hover:border-blue-500 shadow-sm shrink-0 cursor-pointer hover:scale-105 transition-transform"
                          title="تكبير الصورة"
                        >
                          <img src={img} alt={`منتج ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Action Button: عرض التفاصيل */}
                <div className="pt-2">
                  <button
                    onClick={() => setDetailModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-full border border-blue-600/30 hover:border-blue-600 text-blue-700 hover:bg-blue-50/70 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>عرض التفاصيل</span>
                  </button>
                </div>

              </div>

              {/* ==================================================== */}
              {/* LEFT PART (COL 8 / RTL): سجل المشتريات (PURCHASES TABLE) */}
              {/* ==================================================== */}
              <div className="lg:col-span-8 flex flex-col gap-4 order-2">
                
                {/* Section Title */}
                <div className="flex items-center gap-2 text-base font-black text-[#0b1739]">
                  <ShoppingCart className="w-5 h-5 text-purple-600" />
                  <span>سجل المشتريات</span>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto rounded-2xl border border-[#d8e5f5] bg-white shadow-sm">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="bg-[#f0f6fd] border-b border-[#e1ecf8] text-[#475569] font-black">
                        <th className="py-3 px-3.5">العميل</th>
                        <th className="py-3 px-3.5">رقم الهاتف</th>
                        <th className="py-3 px-3.5">الباقة المشتراة</th>
                        <th className="py-3 px-3.5">المبلغ</th>
                        <th className="py-3 px-3.5">تاريخ الدفع</th>
                        <th className="py-3 px-3.5">طريقة الدفع</th>
                        <th className="py-3 px-3.5">البريد الإلكتروني</th>
                        <th className="py-3 px-3.5">المدينة</th>
                        <th className="py-3 px-3.5 text-center">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#edf3fa]">
                      {filteredOrders.map((ord) => {
                        const isSelected = selectedOrder?.id === ord.id;
                        return (
                          <tr
                            key={ord.id}
                            onClick={() => setSelectedOrder(ord)}
                            className={`transition-colors cursor-pointer ${
                              isSelected ? "bg-blue-50/80 font-bold" : "hover:bg-slate-50/80"
                            }`}
                          >
                            {/* العميل */}
                            <td className="py-3.5 px-3.5">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                                  <User className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-bold text-[#0b1739] whitespace-nowrap">
                                  {ord.customerName}
                                </span>
                              </div>
                            </td>

                            {/* رقم الهاتف */}
                            <td className="py-3.5 px-3.5 whitespace-nowrap text-[#334155] font-mono">
                              <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                <span dir="ltr">{ord.customerPhone}</span>
                              </div>
                            </td>

                            {/* الباقة المشتراة */}
                            <td className="py-3.5 px-3.5 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 font-bold text-[#0b1739]">
                                <Package className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                <span>{ord.planTitle}</span>
                              </div>
                            </td>

                            {/* المبلغ */}
                            <td className="py-3.5 px-3.5 whitespace-nowrap font-black font-mono text-[#0b1739]">
                              <div className="flex items-center gap-1">
                                <Coins className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                <span>{ord.price} درهم</span>
                              </div>
                            </td>

                            {/* تاريخ الدفع */}
                            <td className="py-3.5 px-3.5 whitespace-nowrap text-[#475569] font-medium">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>{ord.dateFormatted}</span>
                              </div>
                            </td>

                            {/* طريقة الدفع */}
                            <td className="py-3.5 px-3.5 whitespace-nowrap text-[#334155] font-bold">
                              <div className="flex items-center gap-1.5">
                                {ord.paymentMethod.includes("تحويل") ? (
                                  <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                ) : (
                                  <CreditCard className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                )}
                                <span>{ord.paymentMethod}</span>
                              </div>
                            </td>

                            {/* البريد الإلكتروني */}
                            <td className="py-3.5 px-3.5 whitespace-nowrap text-[#475569] font-mono text-[11px]">
                              <div className="flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>{ord.customerEmail}</span>
                              </div>
                            </td>

                            {/* المدينة */}
                            <td className="py-3.5 px-3.5 whitespace-nowrap text-[#334155] font-bold">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{ord.city}</span>
                              </div>
                            </td>

                            {/* الحالة */}
                            <td className="py-3.5 px-3.5 whitespace-nowrap text-center">
                              {ord.status === "paid" ? (
                                <span className="inline-block px-3 py-1 rounded-full bg-[#10b981] text-white font-black text-[11px] shadow-sm">
                                  مدفوع
                                </span>
                              ) : (
                                <span className="inline-block px-3 py-1 rounded-full bg-[#f59e0b] text-slate-950 font-black text-[11px] shadow-sm">
                                  قيد المراجعة
                                </span>
                              )}
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* --- BOTTOM PROMO & FUTURE BANNER (EXACTLY AS IN SCREENSHOT) --- */}
                <div className="rounded-2xl bg-gradient-to-r from-[#f0f7ff] via-[#e6f1fd] to-[#f4f9ff] border border-[#d4e4f7] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden relative shadow-sm">
                  
                  {/* Right side in RTL: 3D Blue Shield + Text */}
                  <div className="flex items-center gap-3.5 text-right z-10">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] shadow-md shrink-0">
                      <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-blue-600">
                        <ShieldCheck className="w-7 h-7 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-[#0b1739]">
                        معاً نحو مستقبل رقمي أفضل
                      </h4>
                      <p className="text-xs text-[#475569] font-medium mt-0.5">
                        نقدم لك أفضل الحلول والخدمات لتحقيق نجاحك في عالم التجارة الإلكترونية
                      </p>
                    </div>
                  </div>

                  {/* Left side in RTL: 3D Tech Graphic Illustration */}
                  <div className="relative shrink-0 w-64 h-24 sm:w-80 sm:h-28 z-10">
                    <Image
                      src="/images/admin_bottom_tech_graphic.webp"
                      alt="مستقبل التجارة الرقمية والحلول السحابية"
                      fill
                      className="object-contain filter drop-shadow-md"
                    />
                  </div>

                </div>

              </div>

            </div>

          </main>

        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. LIGHTBOX FOR EXPANDING PRODUCT IMAGES                 */}
      {/* ======================================================== */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl max-h-[90vh] flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="text-xs font-black text-cyan-300">معاينة صورة المنتج بدقة عالية</span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden border-2 border-cyan-400 bg-slate-950">
              <img src={lightboxImage} alt="صورة المنتج" className="max-w-full max-h-[75vh] object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. MODAL DIALOG FOR "عرض التفاصيل" (FULL ORDER DETAILS)   */}
      {/* ======================================================== */}
      {detailModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-blue-100 flex flex-col gap-4 text-right">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-base text-[#0b1739]">
                  وثيقة الطلب #{selectedOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setDetailModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-bold text-slate-500">اسم المشتري:</span>
                <span className="font-black text-[#0b1739]">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-bold text-slate-500">رقم الهاتف:</span>
                <span className="font-mono font-bold text-blue-600">{selectedOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-bold text-slate-500">البريد الإلكتروني:</span>
                <span className="font-mono text-slate-700">{selectedOrder.customerEmail}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-bold text-slate-500">الباقة:</span>
                <span className="font-black text-purple-700">{selectedOrder.planTitle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-bold text-slate-500">المبلغ:</span>
                <span className="font-black text-emerald-700 font-mono">{selectedOrder.formattedPrice}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-bold text-slate-500">طريقة الدفع:</span>
                <span className="font-bold text-slate-800">{selectedOrder.paymentMethod}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `مرحباً بك ${selectedOrder.customerName}، معك إدارة ECOM SPEED PRO بخصوص طلبك رقم ${selectedOrder.id}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <WhatsAppIcon size={16} />
                <span>محادثة واتساب فوراً</span>
              </a>
              <button
                onClick={() => setDetailModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
