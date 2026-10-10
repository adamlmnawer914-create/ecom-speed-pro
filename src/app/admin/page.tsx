"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Zap,
  Flame,
  Crown,
  FileText,
  Printer,
  X,
  Check,
  Copy,
  ChevronLeft,
  Volume2,
  VolumeX,
} from "lucide-react";
import Logo from "@/components/Logo";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface OrderItem {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  planTitle: string;
  price: number;
  formattedPrice: string;
  paymentMethod: "card" | "youcan" | "cmi" | "whatsapp";
  productImages: string[];
  productNotes?: string;
  status: "new" | "in_progress" | "completed";
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "in_progress" | "completed">("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  
  // Selected order for detailed modal
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  
  // Lightbox for product image
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Copied indicator
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sound alert toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Live Time in Morocco
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("ar-MA", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch orders from API and localStorage
  const fetchOrders = async () => {
    setLoading(true);
    try {
      // 1. Fetch from backend API
      const res = await fetch("/api/orders");
      const data = await res.json();
      
      let serverOrders: OrderItem[] = [];
      if (data && data.success && Array.isArray(data.orders)) {
        serverOrders = data.orders;
      }

      // 2. Fetch from localStorage for any client-side cached orders
      let localOrders: OrderItem[] = [];
      try {
        const stored = localStorage.getItem("ecom_speed_pro_orders");
        if (stored) {
          localOrders = JSON.parse(stored);
        }
      } catch (e) {
        console.warn("Local storage parse error:", e);
      }

      // Merge avoiding duplicates by id
      const orderMap = new Map<string, OrderItem>();
      [...serverOrders, ...localOrders].forEach((item) => {
        if (!orderMap.has(item.id)) {
          orderMap.set(item.id, item);
        }
      });

      const merged = Array.from(orderMap.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setOrders(merged);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Poll every 10 seconds for real-time updates
    const pollInterval = setInterval(fetchOrders, 10000);
    return () => clearInterval(pollInterval);
  }, []);

  // Update order status
  const handleUpdateStatus = async (id: string, newStatus: "new" | "in_progress" | "completed") => {
    // Optimistic update
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: newStatus } : ord))
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status on server:", err);
    }
  };

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.planTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPlan =
      planFilter === "all" ||
      (planFilter === "landing" && (order.planTitle.includes("الهبوط") || order.planTitle.includes("Landing"))) ||
      (planFilter === "standard" && (order.planTitle.includes("القياسي") || order.planTitle.includes("Standard"))) ||
      (planFilter === "saas" && (order.planTitle.includes("المتقدمة") || order.planTitle.includes("SaaS")));

    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Financial KPI calculations
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.price || 0), 0);
  const totalOrdersCount = orders.length;
  const inProgressCount = orders.filter((o) => o.status === "in_progress").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;

  // Format Date in Arabic
  const formatOrderDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("ar-MA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-[#020718] text-white flex flex-col font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden" dir="rtl">
      
      {/* Background Ambient Cosmic Nebulas */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -left-40 w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-[130px]" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px]" />
      </div>

      {/* ======================================================== */}
      {/* 1. MASTER LUXURY HEADER (ROYAL OBSIDIAN WITH LASER ACCENT) */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-30 bg-[#030a1e]/90 backdrop-blur-2xl border-b border-cyan-400/30 shadow-[0_10px_35px_rgba(2,8,26,0.8)]">
        <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Right in RTL: Official Brand Emblem + Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative p-1.5 rounded-2xl bg-white shadow-[0_0_25px_rgba(6,182,212,0.6)] shrink-0">
              <Logo size="sm" showSlogan={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white tracking-wide">
                  ECOM SPEED PRO
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/60 text-[10px] font-black text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                  لوحة تحكم الإدارة الخاصة
                </span>
              </div>
              <p className="text-[11px] text-blue-200/80 font-bold flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>متصل بالنظام السحابي المباشر ⚡ • المغرب 🇲🇦</span>
              </p>
            </div>
          </div>

          {/* Center in RTL: Live Clock & Telemetry Capsule */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-2xl bg-[#061845]/90 border border-cyan-400/40 shadow-inner">
            <Clock className="w-4 h-4 text-cyan-400" />
            <div className="text-right">
              <span className="text-[10px] text-blue-300/80 block font-bold">توقيت المغرب (GMT+1):</span>
              <span className="text-xs font-mono font-black text-white">{currentTime || "17:45:00"}</span>
            </div>
            <div className="w-[1px] h-6 bg-blue-800 mx-1" />
            <span className="text-[11px] font-black text-emerald-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>جاهزية 99.9%</span>
            </span>
          </div>

          {/* Left in RTL: Quick Controls (Refresh, Sound, Store Link) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchOrders}
              className="p-2.5 rounded-2xl bg-[#061845] hover:bg-[#0c2869] border border-cyan-400/40 hover:border-cyan-300 text-cyan-300 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="تحديث قائمة الطلبات"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`} />
              <span className="hidden sm:inline">تحديث</span>
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                  : "bg-slate-800/80 border-slate-700 text-slate-400"
              }`}
              title={soundEnabled ? "التنبيه الصوتي مفعّل" : "التنبيه الصوتي معطّل"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>معاينة المتجر</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN DASHBOARD CONTENT AREA                           */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-[1550px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* KPI METRIC CARDS (4 Luxury Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Revenue */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#06153e]/90 via-[#0a2265]/90 to-[#040e2b]/90 border-2 border-amber-400/40 p-5 shadow-[0_15px_35px_rgba(2,10,35,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-200/90">إجمالي المبيعات المؤكدة</span>
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                <Crown className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400">
              {totalRevenue.toLocaleString()} د.م
            </div>
            <span className="text-[11px] font-bold text-amber-300/80 mt-1 block">
              عمليات دفع مغربية رسمية وعالمية 🇲🇦
            </span>
          </div>

          {/* Card 2: Total Orders */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#06153e]/90 via-[#0a2265]/90 to-[#040e2b]/90 border-2 border-cyan-400/40 p-5 shadow-[0_15px_35px_rgba(2,10,35,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-cyan-200/90">إجمالي عدد الطلبات</span>
              <div className="w-10 h-10 rounded-2xl bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-200">
              {totalOrdersCount} طلب
            </div>
            <span className="text-[11px] font-bold text-cyan-300/80 mt-1 block">
              من جميع مدن المملكة المغربية 🇲🇦
            </span>
          </div>

          {/* Card 3: In Progress (Active 48h Deliveries) */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#06153e]/90 via-[#0a2265]/90 to-[#040e2b]/90 border-2 border-blue-400/40 p-5 shadow-[0_15px_35px_rgba(2,10,35,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-blue-200/90">مشاريع قيد التجهيز الفوري</span>
              <div className="w-10 h-10 rounded-2xl bg-blue-400/20 border border-blue-400/50 flex items-center justify-center text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                <Flame className="w-5 h-5 text-rose-400 animate-pulse" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-blue-200">
              {inProgressCount} متجر
            </div>
            <span className="text-[11px] font-bold text-blue-300/80 mt-1 block">
              تسليم قياسي خلال 48 ساعة ⏳
            </span>
          </div>

          {/* Card 4: Completed Projects */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#06153e]/90 via-[#0a2265]/90 to-[#040e2b]/90 border-2 border-emerald-400/40 p-5 shadow-[0_15px_35px_rgba(2,10,35,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-200/90">متاجر تم إطلاقها بنجاح</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-400/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-300">
              {completedCount} متجر
            </div>
            <span className="text-[11px] font-bold text-emerald-400/80 mt-1 block">
              تحقق أعلى معدلات تحويل 🚀
            </span>
          </div>

        </div>

        {/* SEARCH, STATUS & PLAN FILTERS */}
        <div className="rounded-3xl bg-[#040e2b]/95 border-2 border-cyan-400/30 p-4 sm:p-5 shadow-[0_20px_50px_rgba(2,10,35,0.7)] flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="ابحث باسم المشتري، رقم الهاتف، الإيميل، رقم الطلب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 rounded-2xl bg-[#061845] border border-blue-400/40 text-xs font-bold text-white placeholder-blue-300/40 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
            />
            <Search className="w-4 h-4 text-cyan-400 absolute right-3.5 top-3" />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <span className="text-xs font-black text-blue-200 ml-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>الحالة:</span>
            </span>

            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                statusFilter === "all"
                  ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  : "bg-[#061845] text-blue-200 border border-blue-900 hover:border-cyan-400/50"
              }`}
            >
              الكل ({orders.length})
            </button>

            <button
              onClick={() => setStatusFilter("new")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                statusFilter === "new"
                  ? "bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]"
                  : "bg-[#061845] text-rose-300 border border-blue-900 hover:border-rose-400/50"
              }`}
            >
              جديد ({orders.filter((o) => o.status === "new").length})
            </button>

            <button
              onClick={() => setStatusFilter("in_progress")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                statusFilter === "in_progress"
                  ? "bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  : "bg-[#061845] text-amber-300 border border-blue-900 hover:border-amber-400/50"
              }`}
            >
              قيد التجهيز ({inProgressCount})
            </button>

            <button
              onClick={() => setStatusFilter("completed")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                statusFilter === "completed"
                  ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  : "bg-[#061845] text-emerald-300 border border-blue-900 hover:border-emerald-400/50"
              }`}
            >
              تم التسليم ({completedCount})
            </button>
          </div>

          {/* Package Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-blue-200">الباقة:</span>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#061845] border border-blue-400/40 text-xs font-bold text-white outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">جميع الباقات الـ 3</option>
              <option value="landing">صفحة الهبوط (500 د.م)</option>
              <option value="standard">المتجر القياسي (1500 د.م)</option>
              <option value="saas">منصة SaaS VIP (5000 د.م)</option>
            </select>
          </div>

        </div>

        {/* ======================================================== */}
        {/* ORDERS LIST & MASTER CARDS                               */}
        {/* ======================================================== */}
        {filteredOrders.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#040e2b]/80 border-2 border-dashed border-blue-900/60 p-8">
            <div className="w-16 h-16 rounded-3xl bg-blue-950/60 border border-cyan-400/30 flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-white mb-1">لا توجد طلبات تطابق هذا البحث</h3>
            <p className="text-xs text-blue-200/70 font-semibold max-w-sm mx-auto">
              تأكد من تعديل كلمات البحث أو الفلتر لرؤية جميع الطلبات والمبيعات الواردة.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const isLanding = order.planTitle.includes("الهبوط") || order.planTitle.includes("Landing");
              const isSaaS = order.planTitle.includes("المتقدمة") || order.planTitle.includes("SaaS");

              const planBadge = isLanding
                ? { color: "from-rose-500 to-purple-600 text-white", label: "صفحة الهبوط (500 د.م)" }
                : isSaaS
                ? { color: "from-amber-400 to-yellow-500 text-slate-950", label: "منصة SaaS VIP (5000 د.م)" }
                : { color: "from-cyan-500 to-blue-600 text-white", label: "المتجر القياسي (1500 د.م)" };

              const cleanPhone = order.customerPhone.replace(/[^0-9]/g, "");
              const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                `مرحباً بك ${order.customerName}، معك فريق إدارة ECOM SPEED PRO بخصوص طلبك رقم ${order.id} لباقة ${order.planTitle}. نحن جاهزون للبدء في تجهيز متجرك فوراً!`
              )}`;

              return (
                <div
                  key={order.id}
                  className="relative rounded-3xl bg-gradient-to-r from-[#040e2b] via-[#06184a] to-[#040e2b] border-2 border-cyan-400/35 hover:border-cyan-400/70 p-5 sm:p-6 shadow-[0_15px_40px_rgba(2,10,35,0.7)] transition-all duration-300 group"
                >
                  {/* Subtle Top Edge Glow */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-5">
                    
                    {/* SECTION 1: Customer Identity & Order ID */}
                    <div className="flex items-start gap-4 min-w-[280px]">
                      {/* Avatar with Status Ping */}
                      <div className="relative shrink-0 w-13 h-13 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                        <div className="w-full h-full bg-[#05143a] rounded-[14px] flex items-center justify-center font-black text-lg text-white">
                          {order.customerName.charAt(0) || "ع"}
                        </div>
                        {order.status === "new" && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-[#040e2b] animate-ping" />
                        )}
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-black text-white tracking-tight">
                            {order.customerName}
                          </h4>
                          <button
                            onClick={() => handleCopy(order.id, order.id)}
                            className="px-2 py-0.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-[10px] font-mono font-black text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                            title="نسخ رقم الطلب"
                          >
                            <span>{order.id}</span>
                            {copiedId === order.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>

                        {/* Direct WhatsApp & Email Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 mt-2">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                          >
                            <WhatsAppIcon size={14} />
                            <span>{order.customerPhone}</span>
                          </a>

                          <a
                            href={`mailto:${order.customerEmail}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-200 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <Mail className="w-3 h-3" />
                            <span className="truncate max-w-[150px]">{order.customerEmail}</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Selected Package & Price */}
                    <div className="flex flex-col items-start xl:items-center text-right xl:text-center min-w-[200px]">
                      <span className={`px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r ${planBadge.color} shadow-sm mb-1`}>
                        {planBadge.label}
                      </span>
                      <div className="text-xl font-black font-mono text-cyan-200 mt-1">
                        {order.formattedPrice || `${order.price} د.م`}
                      </div>
                      <span className="text-[11px] text-blue-200/80 font-bold flex items-center gap-1 mt-0.5">
                        <Lock className="w-3 h-3 text-cyan-400" />
                        <span>
                          {order.paymentMethod === "youcan"
                            ? "YouCan Pay 🇲🇦"
                            : order.paymentMethod === "cmi"
                            ? "CMI المركز النقدي"
                            : order.paymentMethod === "card"
                            ? "بطاقة بنكية رسمية"
                            : "واتساب VIP"}
                        </span>
                      </span>
                    </div>

                    {/* SECTION 3: Product Photos Gallery Preview (USER'S EXPLICIT REQUEST) */}
                    <div className="flex flex-col items-start min-w-[200px] w-full xl:w-auto">
                      <span className="text-xs font-black text-cyan-200 mb-1.5 flex items-center gap-1.5">
                        <span>صور المنتج المطلوب:</span>
                        <span className="px-1.5 py-0.2 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                          {order.productImages ? order.productImages.length : 0}
                        </span>
                      </span>

                      {order.productImages && order.productImages.length > 0 ? (
                        <div className="flex items-center gap-2 overflow-x-auto max-w-[260px] py-1">
                          {order.productImages.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setLightboxImage(img)}
                              className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-cyan-400/60 hover:border-cyan-300 shadow-md transition-all hover:scale-110 shrink-0 cursor-pointer group"
                              title="اضغط للتكبير بدقة عالية"
                            >
                              <img src={img} alt={`منتج ${idx + 1}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Eye className="w-4 h-4 text-white" />
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-semibold bg-white/5 px-2.5 py-1 rounded-xl border border-white/10">
                          لم يرفق صوراً (سيرسلها على واتساب)
                        </span>
                      )}

                      {order.productNotes && (
                        <p className="text-[10px] text-blue-200/70 font-semibold mt-1 truncate max-w-[220px]">
                          ملاحظة: {order.productNotes}
                        </p>
                      )}
                    </div>

                    {/* SECTION 4: Purchase Date & 48-Hour Delivery Clock */}
                    <div className="flex flex-col items-start xl:items-end text-right min-w-[190px]">
                      <span className="text-[10px] text-blue-300/80 font-bold block mb-0.5">
                        تاريخ وتوقيت الطلب:
                      </span>
                      <span className="text-xs font-black text-white font-mono flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{formatOrderDate(order.createdAt)}</span>
                      </span>
                      <div className="mt-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-[10px] font-black text-cyan-300">
                        <Clock className="w-3 h-3 text-cyan-300" />
                        <span>تسليم قياسي خلال 48 ساعة</span>
                      </div>
                    </div>

                    {/* SECTION 5: Status Dropdown & Details Action */}
                    <div className="flex items-center gap-2.5 w-full xl:w-auto justify-end pt-3 xl:pt-0 border-t xl:border-t-0 border-blue-900/60">
                      {/* Status Selector Dropdown */}
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateStatus(order.id, e.target.value as "new" | "in_progress" | "completed")
                        }
                        className={`px-3 py-2 rounded-2xl text-xs font-black outline-none border cursor-pointer transition-all ${
                          order.status === "new"
                            ? "bg-rose-950/80 border-rose-400/60 text-rose-300"
                            : order.status === "in_progress"
                            ? "bg-amber-950/80 border-amber-400/60 text-amber-300"
                            : "bg-emerald-950/80 border-emerald-400/60 text-emerald-300"
                        }`}
                      >
                        <option value="new">جديد 🆕</option>
                        <option value="in_progress">قيد التجهيز ⏳</option>
                        <option value="completed">تم التسليم بنجاح ✅</option>
                      </select>

                      {/* View Details Button */}
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3.5 py-2 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 hover:text-white text-xs font-black transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.25)] flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>تفاصيل الفاتورة</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* 3. LIGHTBOX MODAL FOR EXPANDING PRODUCT IMAGES           */}
      {/* ======================================================== */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="text-sm font-black text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>معاينة صورة المنتج المرفوعة بدقة عالية</span>
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={lightboxImage}
                  download="product_image.png"
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل الصورة للحاسوب</span>
                </a>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] bg-slate-950 max-h-[80vh] flex items-center justify-center">
              <img
                src={lightboxImage}
                alt="معاينة المنتج"
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. ORDER DETAIL DRAWER & PRINTABLE INVOICE MODAL         */}
      {/* ======================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#020718]/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#06184a] to-[#03091e] border-2 border-cyan-400/40 rounded-3xl p-6 sm:p-7 text-white shadow-[0_25px_80px_rgba(2,10,35,0.9)] max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-blue-900/60 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-1 rounded-xl bg-white">
                  <Logo size="sm" showSlogan={false} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    فاتورة وبيانات الطلب: {selectedOrder.id}
                  </h3>
                  <span className="text-xs text-cyan-300 font-bold block">
                    {formatOrderDate(selectedOrder.createdAt)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="rounded-2xl bg-[#040e2b]/80 border border-blue-400/30 p-4 mb-4 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
                <span className="text-blue-300 font-bold">اسم المشتري:</span>
                <span className="font-black text-white text-sm">{selectedOrder.customerName}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
                <span className="text-blue-300 font-bold">رقم الهاتف / واتساب:</span>
                <span className="font-mono font-black text-emerald-300">{selectedOrder.customerPhone}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
                <span className="text-blue-300 font-bold">البريد الإلكتروني:</span>
                <span className="font-mono font-bold text-white">{selectedOrder.customerEmail}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
                <span className="text-blue-300 font-bold">الباقة المطلوبة:</span>
                <span className="font-black text-cyan-300">{selectedOrder.planTitle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-300 font-bold">المبلغ الإجمالي:</span>
                <span className="font-mono text-base font-black text-amber-300">
                  {selectedOrder.formattedPrice || `${selectedOrder.price} د.م`}
                </span>
              </div>
            </div>

            {/* Product Images in Invoice */}
            <div className="mb-5">
              <h4 className="text-xs font-black text-cyan-200 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>صور المنتج المرفقة من العميل:</span>
              </h4>

              {selectedOrder.productImages && selectedOrder.productImages.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {selectedOrder.productImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-2xl overflow-hidden border border-cyan-400/50 aspect-square group shadow-md"
                    >
                      <img src={img} alt={`منتج ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                        <button
                          onClick={() => setLightboxImage(img)}
                          className="p-1.5 rounded-lg bg-cyan-500 text-black cursor-pointer"
                          title="تكبير"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={img}
                          download={`product_${idx + 1}.png`}
                          className="p-1.5 rounded-lg bg-emerald-500 text-black cursor-pointer"
                          title="تحميل"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  لا توجد صور مرفقة في هذا الطلب.
                </p>
              )}
            </div>

            {/* Product Notes */}
            {selectedOrder.productNotes && (
              <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-400/20 text-xs mb-5">
                <span className="text-blue-300 font-bold block mb-1">ملاحظات العميل:</span>
                <p className="text-white font-medium">{selectedOrder.productNotes}</p>
              </div>
            )}

            {/* Actions: Direct WhatsApp & Close */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-end pt-3 border-t border-blue-900/60">
              <a
                href={`https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `مرحباً بك ${selectedOrder.customerName}، معك إدارة ECOM SPEED PRO بخصوص طلبك رقم ${selectedOrder.id}. يسعدنا بدء تجهيز مشروعك فوراً!`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <WhatsAppIcon size={18} />
                <span>محادثة العميل على واتساب فوراً</span>
              </a>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
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
