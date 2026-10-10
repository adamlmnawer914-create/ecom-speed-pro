"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  LayoutGrid,
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
  RefreshCw,
  Trash2,
  User,
  PlusCircle,
  ExternalLink,
  Crown,
  Activity,
  Layers,
  BarChart3,
  BadgeCheck,
  Percent,
  CircleDollarSign,
  Database,
  ArrowUpRight,
  Sliders,
  Send,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export interface OrderItem {
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
  status: "paid" | "review";
  dateFormatted: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"orders" | "home" | "customers" | "products" | "payments" | "reports" | "settings">("orders");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("");
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  // New Order Form State
  const [newOrderName, setNewOrderName] = useState("");
  const [newOrderPhone, setNewOrderPhone] = useState("");
  const [newOrderEmail, setNewOrderEmail] = useState("");
  const [newOrderCity, setNewOrderCity] = useState("الدار البيضاء");
  const [newOrderPlan, setNewOrderPlan] = useState("المتجر القياسي (Standard Store)");
  const [newOrderPrice, setNewOrderPrice] = useState("1500");
  const [newOrderMethod, setNewOrderMethod] = useState("YouCan Pay");
  const [newOrderNotes, setNewOrderNotes] = useState("");

  // Function to fetch real live orders from backend API & localStorage
  const fetchRealOrders = async () => {
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

      const map = new Map<string, OrderItem>();

      [...apiOrders, ...localOrders].forEach((item: any) => {
        if (!item || !item.id) return;
        const rawPrice =
          typeof item.price === "number"
            ? item.price
            : parseInt(String(item.price || "").replace(/[^0-9]/g, ""), 10) || 1500;

        const orderObj: OrderItem = {
          id: item.id,
          customerName: item.customerName || item.customer_name || "عميل مميز",
          customerPhone: item.customerPhone || item.phone || "06 00 00 00 00",
          customerEmail: item.customerEmail || item.email || "contact@client.ma",
          city: item.city || "المغرب",
          planTitle: item.planTitle || item.plan || "المتجر القياسي (Standard Store)",
          price: rawPrice,
          formattedPrice: item.formattedPrice || `${rawPrice.toLocaleString()} درهم`,
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
          productImages:
            Array.isArray(item.productImages) && item.productImages.length > 0
              ? item.productImages
              : ["/images/card_standard_new.webp"],
          productNotes: item.productNotes || "",
          status:
            item.status === "completed" || item.status === "paid" ? "paid" : "review",
          dateFormatted:
            item.dateFormatted ||
            "اليوم في " +
              new Date(item.createdAt || Date.now()).toLocaleTimeString("ar-MA", {
                hour: "2-digit",
                minute: "2-digit",
              }),
          createdAt: item.createdAt || new Date().toISOString(),
        };

        if (!map.has(orderObj.id)) {
          map.set(orderObj.id, orderObj);
        }
      });

      const sortedList = Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      if (sortedList.length > 0) {
        setOrders(sortedList);
        setSelectedOrder((prev) => {
          if (!prev) return sortedList[0];
          const found = sortedList.find((o) => o.id === prev.id);
          return found || sortedList[0];
        });
      }
      setLastSyncTime(
        new Date().toLocaleTimeString("ar-MA", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    } catch (err) {
      console.error("Error fetching live orders:", err);
    }
  };

  // Sync orders with API on mount + Real-time auto-polling every 4 seconds
  useEffect(() => {
    fetchRealOrders();
    const interval = setInterval(fetchRealOrders, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update order status live
  const handleUpdateStatus = async (orderId: string, newStatus: "paid" | "review") => {
    try {
      // 1. Update in State immediately
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      // 2. Update in localStorage
      try {
        const stored = localStorage.getItem("ecom_speed_pro_orders");
        if (stored) {
          const list = JSON.parse(stored);
          const updated = list.map((o: any) =>
            o.id === orderId ? { ...o, status: newStatus === "paid" ? "completed" : "in_progress" } : o
          );
          localStorage.setItem("ecom_speed_pro_orders", JSON.stringify(updated));
        }
      } catch (e) {
        console.warn(e);
      }

      // 3. Update in Backend API
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: orderId,
          status: newStatus === "paid" ? "completed" : "in_progress",
        }),
      });

      triggerNotification(`تم تحديث حالة الطلب #${orderId} بنجاح إلى: ${newStatus === "paid" ? "مكتمل / مدفوع" : "قيد المراجعة"}`);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete / Archive order live
  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm(`هل أنت متأكد من حذف الطلب #${orderId} نهائياً من قاعدة البيانات؟`)) return;

    try {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      if (selectedOrder?.id === orderId) {
        const remaining = orders.filter((o) => o.id !== orderId);
        setSelectedOrder(remaining.length > 0 ? remaining[0] : null);
      }

      // Remove from localStorage
      try {
        const stored = localStorage.getItem("ecom_speed_pro_orders");
        if (stored) {
          const list = JSON.parse(stored);
          localStorage.setItem(
            "ecom_speed_pro_orders",
            JSON.stringify(list.filter((o: any) => o.id !== orderId))
          );
        }
      } catch (e) {
        console.warn(e);
      }

      // Remove from API
      await fetch(`/api/orders?id=${orderId}`, { method: "DELETE" });
      triggerNotification(`تم حذف الطلب #${orderId} بنجاح`);
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  // Create Manual Real Order
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderName.trim() || !newOrderPhone.trim()) {
      alert("يرجى إدخال اسم العميل ورقم الهاتف على الأقل");
      return;
    }

    const priceNum = parseInt(newOrderPrice.replace(/[^0-9]/g, ""), 10) || 1500;
    const newId = "ESP-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder: OrderItem = {
      id: newId,
      customerName: newOrderName.trim(),
      customerPhone: newOrderPhone.trim(),
      customerEmail: newOrderEmail.trim() || `${newOrderPhone.replace(/[^0-9]/g, "")}@client.ma`,
      city: newOrderCity.trim() || "الدار البيضاء",
      planTitle: newOrderPlan,
      price: priceNum,
      formattedPrice: `${priceNum.toLocaleString()} درهم`,
      paymentMethod: newOrderMethod,
      productImages: ["/images/card_standard_new.webp"],
      productNotes: newOrderNotes.trim(),
      status: "paid",
      dateFormatted: "اليوم في " + new Date().toLocaleTimeString("ar-MA", { hour: "2-digit", minute: "2-digit" }),
      createdAt: new Date().toISOString(),
    };

    // 1. Update State
    setOrders((prev) => [newOrder, ...prev]);
    setSelectedOrder(newOrder);

    // 2. Save in localStorage
    try {
      const stored = localStorage.getItem("ecom_speed_pro_orders");
      const list = stored ? JSON.parse(stored) : [];
      localStorage.setItem("ecom_speed_pro_orders", JSON.stringify([newOrder, ...list]));
    } catch (e) {
      console.warn(e);
    }

    // 3. Save via API
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
    } catch (e) {
      console.warn("API save err:", e);
    }

    // Reset Form
    setNewOrderName("");
    setNewOrderPhone("");
    setNewOrderEmail("");
    setNewOrderNotes("");
    setCreateModalOpen(false);
    triggerNotification(`تم تسجيل طلب حقيقي جديد بنجاح برقم #${newId}`);
  };

  const triggerNotification = (msg: string) => {
    setNotificationBanner(msg);
    setTimeout(() => setNotificationBanner(null), 4000);
  };

  // Manual fast reload
  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await fetchRealOrders();
    setTimeout(() => {
      setIsRefreshing(false);
      triggerNotification("تم مزامنة كافة الطلبات والبيانات الحية بنجاح");
    }, 600);
  };

  // Filtered orders
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerPhone.includes(searchQuery) ||
      ord.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && ord.status === "paid") ||
      (statusFilter === "review" && ord.status === "review");

    const matchesMethod = methodFilter === "all" || ord.paymentMethod.includes(methodFilter);
    const matchesPlan = planFilter === "all" || ord.planTitle.includes(planFilter);

    return matchesSearch && matchesStatus && matchesMethod && matchesPlan;
  });

  // Calculate Real Dynamic Metrics
  const totalOrdersCount = orders.length;
  const paidOrdersCount = orders.filter((o) => o.status === "paid").length;
  const reviewOrdersCount = orders.filter((o) => o.status === "review").length;
  const totalRevenueSum = orders.reduce((acc, o) => acc + (o.price || 0), 0);
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenueSum / totalOrdersCount) : 0;

  // Real Unique Customers
  const uniqueCustomers = useMemo(() => {
    const map = new Map<string, {
      name: string;
      phone: string;
      email: string;
      city: string;
      ordersCount: number;
      totalSpent: number;
      lastOrderDate: string;
    }>();

    orders.forEach((o) => {
      const key = o.customerPhone.replace(/[^0-9]/g, "") || o.customerName;
      if (!map.has(key)) {
        map.set(key, {
          name: o.customerName,
          phone: o.customerPhone,
          email: o.customerEmail,
          city: o.city,
          ordersCount: 1,
          totalSpent: o.price,
          lastOrderDate: o.dateFormatted,
        });
      } else {
        const item = map.get(key)!;
        item.ordersCount += 1;
        item.totalSpent += o.price;
      }
    });

    return Array.from(map.values());
  }, [orders]);

  // Real Package Breakdown
  const packageStats = useMemo(() => {
    const stats: Record<string, { count: number; revenue: number; priceText: string }> = {
      "صفحة الهبوط (Landing Page)": { count: 0, revenue: 0, priceText: "500 د.م" },
      "المتجر القياسي (Standard Store)": { count: 0, revenue: 0, priceText: "1,500 د.م" },
      "منصة التجارة المتقدمة (Advanced SaaS)": { count: 0, revenue: 0, priceText: "5,000 د.م" },
    };

    orders.forEach((o) => {
      if (o.planTitle.includes("الهبوط") || o.planTitle.includes("Landing")) {
        stats["صفحة الهبوط (Landing Page)"].count += 1;
        stats["صفحة الهبوط (Landing Page)"].revenue += o.price;
      } else if (o.planTitle.includes("المتقدمة") || o.planTitle.includes("SaaS")) {
        stats["منصة التجارة المتقدمة (Advanced SaaS)"].count += 1;
        stats["منصة التجارة المتقدمة (Advanced SaaS)"].revenue += o.price;
      } else {
        stats["المتجر القياسي (Standard Store)"].count += 1;
        stats["المتجر القياسي (Standard Store)"].revenue += o.price;
      }
    });

    return stats;
  }, [orders]);

  // Real Payment Gateway Stats
  const paymentStats = useMemo(() => {
    const stats: Record<string, { count: number; total: number; color: string }> = {
      "YouCan Pay": { count: 0, total: 0, color: "text-amber-500" },
      "بوابة CMI": { count: 0, total: 0, color: "text-blue-500" },
      "بطاقة بنكية": { count: 0, total: 0, color: "text-emerald-500" },
      "واتساب VIP / أخرى": { count: 0, total: 0, color: "text-purple-500" },
    };

    orders.forEach((o) => {
      if (o.paymentMethod.toLowerCase().includes("youcan")) {
        stats["YouCan Pay"].count += 1;
        stats["YouCan Pay"].total += o.price;
      } else if (o.paymentMethod.toLowerCase().includes("cmi")) {
        stats["بوابة CMI"].count += 1;
        stats["بوابة CMI"].total += o.price;
      } else if (o.paymentMethod.includes("بطاقة") || o.paymentMethod.toLowerCase().includes("card")) {
        stats["بطاقة بنكية"].count += 1;
        stats["بطاقة بنكية"].total += o.price;
      } else {
        stats["واتساب VIP / أخرى"].count += 1;
        stats["واتساب VIP / أخرى"].total += o.price;
      }
    });

    return stats;
  }, [orders]);

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
    link.setAttribute("download", `ecom_speed_pro_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification("تم تنزيل ملف التقرير CSV بنجاح");
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

      {/* Floating Notification Toast */}
      {notificationBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-5 py-2.5 shadow-[0_10px_35px_rgba(16,185,129,0.5)] border border-emerald-300/40 flex items-center gap-2.5 text-xs font-black">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{notificationBanner}</span>
          </div>
        </div>
      )}

      <div className="max-w-[1720px] mx-auto flex flex-col gap-4">
        
        {/* ======================================================== */}
        {/* 1. TOP HEADER - ULTRA LUXURIOUS & PRESTIGIOUS           */}
        {/* ======================================================== */}
        <header className="w-full flex flex-wrap items-center justify-between gap-3 px-2 sm:px-4 py-1.5">
          
          {/* Right side in RTL: 3D Emblem Logo + Prestigious "لوحة التحكم" Title */}
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-gradient-to-r from-[#071d52]/95 via-[#0b2b7b]/95 to-[#041643]/95 px-4 py-2 shadow-[0_8px_35px_rgba(2,16,56,0.6)] border border-cyan-400/45 backdrop-blur-2xl flex items-center gap-3.5 hover:border-cyan-300 transition-all">
              
              {/* 3D Brand Logo with Holographic Glow */}
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-amber-300 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300" />
                <div className="relative w-11 h-11 rounded-2xl bg-[#031338] border border-cyan-300/50 p-1 flex items-center justify-center overflow-hidden shadow-inner">
                  <Image
                    src="/images/ecom_letter_e_logo.png"
                    alt="Ecom Speed Pro Logo"
                    width={36}
                    height={36}
                    priority
                    className="object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.85)]"
                  />
                </div>
              </div>

              {/* Title & Brand Slogan */}
              <div className="text-right flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-amber-300 drop-shadow-[0_2px_15px_rgba(6,182,212,0.7)]">
                    لوحة التحكم
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.55)]">
                    <Sparkles className="w-2.5 h-2.5 text-slate-950 animate-pulse" />
                    <span>مباشر LIVE</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-black tracking-wider text-cyan-300 drop-shadow">
                    ECOM SPEED PRO
                  </span>
                  <span className="text-[9.5px] text-blue-200/80 font-bold hidden sm:inline">
                    • نظام إدارة المبيعات والطلبات الحية
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Live Server Pulse Ribbon */}
          <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-black text-emerald-300">
                السيرفر متصل لحظياً {lastSyncTime && `(${lastSyncTime})`}
              </span>
            </div>
            <span className="text-slate-400 text-xs">|</span>
            <span className="text-xs font-bold text-white">
              {totalOrdersCount} طلبات مسجلة
            </span>
            <span className="text-slate-400 text-xs">|</span>
            <span className="text-xs font-black text-amber-300 font-mono">
              {totalRevenueSum.toLocaleString()} د.م مبيعات
            </span>
          </div>

          {/* Left side in RTL: "Ecom Speed Pro" Admin Profile Pill + Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* ➕ Manual Real Order Creation Button */}
            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs shadow-[0_4px_18px_rgba(16,185,129,0.4)] flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="تسجيل طلب عميل جديد يدوياً وحفظه في السيرفر"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">طلب جديد</span>
            </button>

            {/* Profile Capsule: Strictly Ecom Speed Pro */}
            <div className="rounded-2xl bg-white/95 px-3 py-1.5 shadow-[0_4px_22px_rgba(0,30,80,0.25)] border border-white/80 flex items-center gap-2.5 hover:bg-white transition-all">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-[1.5px] flex items-center justify-center shrink-0 shadow-sm">
                <div className="w-full h-full bg-[#031338] rounded-[10px] flex items-center justify-center p-0.5">
                  <Image
                    src="/images/ecom_letter_e_logo.png"
                    alt="Ecom Speed Pro"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="text-right hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-[#0a193c] block leading-tight">
                    Ecom Speed Pro
                  </span>
                  <BadgeCheck className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span className="text-[9.5px] text-blue-600 font-black block leading-tight">
                  حساب الإدارة الرسمي
                </span>
              </div>
            </div>

            {/* Live Refresh Button */}
            <button
              onClick={handleManualRefresh}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/95 shadow-md border border-white/70 flex items-center justify-center text-slate-700 hover:text-cyan-600 hover:scale-105 transition-all cursor-pointer ${
                isRefreshing ? "animate-spin text-cyan-600" : ""
              }`}
              title="تحديث البيانات لحظياً من السيرفر"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Notification Bell */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/95 shadow-md border border-white/70 flex items-center justify-center relative hover:scale-105 transition-all text-slate-700 cursor-pointer">
              <Bell className="w-4 h-4 text-slate-700" />
              {reviewOrdersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ec4899] text-white text-[9px] font-black flex items-center justify-center shadow-sm animate-pulse">
                  {reviewOrdersCount}
                </span>
              )}
            </div>

            {/* Exit to Store */}
            <a
              href="/"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/95 shadow-md border border-white/70 flex items-center justify-center text-slate-700 hover:text-rose-600 hover:scale-105 transition-all cursor-pointer"
              title="العودة للمتجر الرئيسي"
            >
              <LogOut className="w-4 h-4 rotate-180" />
            </a>

          </div>

        </header>

        {/* ======================================================== */}
        {/* 2. MAIN STAGE (SIDEBAR + MAIN GLASS CARD)                */}
        {/* ======================================================== */}
        <div className="flex flex-col xl:flex-row gap-4 items-stretch w-full">
          
          {/* RIGHT SIDEBAR (FLOATING VERTICAL MENU RAIL) */}
          <aside className="xl:w-[155px] shrink-0 rounded-[28px] bg-gradient-to-b from-[#0a2364]/95 via-[#06184a]/95 to-[#041238]/95 border border-cyan-400/40 p-3 shadow-[0_15px_40px_rgba(2,10,35,0.6)] flex flex-row xl:flex-col gap-2 justify-between xl:justify-start backdrop-blur-xl overflow-x-auto">
            
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

            {/* 2. الطلبات */}
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 xl:flex-initial rounded-2xl flex items-center justify-between px-3.5 py-3 transition-all cursor-pointer text-xs font-bold ${
                activeTab === "orders"
                  ? "bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#3b82f6] text-white shadow-[0_0_25px_rgba(217,70,239,0.7)] font-black"
                  : "text-cyan-100/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <ShoppingCart className="w-4 h-4 shrink-0" />
              <span>الطلبات ({totalOrdersCount})</span>
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
              <span>العملاء ({uniqueCustomers.length})</span>
            </button>

            {/* 4. المنتجات / الباقات */}
            <button
              onClick={() => setActiveTab("products")}
              className={`flex-1 xl:flex-initial rounded-2xl flex items-center justify-between px-3.5 py-3 transition-all cursor-pointer text-xs font-bold ${
                activeTab === "products"
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

          {/* MAIN WHITE GLASSMORPHIC WORKSTATION */}
          <main className="flex-1 rounded-[32px] bg-gradient-to-b from-[#f8fbff]/95 via-[#f1f6fd]/95 to-[#e8f1fc]/95 border-2 border-white/80 shadow-[0_25px_70px_rgba(0,25,80,0.3),inset_0_1px_2px_rgba(255,255,255,0.9)] p-5 sm:p-6 lg:p-7 flex flex-col gap-5 backdrop-blur-2xl">
            
            {/* Section Title & Real Sync Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-blue-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                  <div className="w-full h-full bg-[#0a1f58] rounded-[14px] flex items-center justify-center text-cyan-300">
                    {activeTab === "orders" && <FileSpreadsheet className="w-5 h-5" />}
                    {activeTab === "home" && <Home className="w-5 h-5" />}
                    {activeTab === "customers" && <Users className="w-5 h-5" />}
                    {activeTab === "products" && <Package className="w-5 h-5" />}
                    {activeTab === "payments" && <CreditCard className="w-5 h-5" />}
                    {activeTab === "reports" && <BarChart3 className="w-5 h-5" />}
                    {activeTab === "settings" && <Settings className="w-5 h-5" />}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0b1739] tracking-tight">
                    {activeTab === "orders" && "إدارة الطلبات والمدفوعات الحية"}
                    {activeTab === "home" && "نظرة عامة على أداء المتجر والمبيعات"}
                    {activeTab === "customers" && "سجل العملاء والمشترين الفعليين"}
                    {activeTab === "products" && "إحصائيات باقات الخدمات والمنتجات"}
                    {activeTab === "payments" && "سجل بوابات الدفع والمعاملات المالية"}
                    {activeTab === "reports" && "التقارير التحليلية والمؤشرات المالية"}
                    {activeTab === "settings" && "إعدادات المنظومة والنظام الإداري"}
                  </h2>
                  <p className="text-xs text-slate-500 font-bold">
                    قاعدة بيانات حقيقية متصلة بالسيرفر ومحدثة لحظياً
                  </p>
                </div>
              </div>

              {/* Real-time pulse indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-black text-emerald-700">
                  متصل لحظياً {lastSyncTime && `(${lastSyncTime})`}
                </span>
              </div>
            </div>

            {/* --- TOP 4 DYNAMIC REAL KPI METRIC CARDS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              
              {/* KPI 1: إجمالي الطلبات الحقيقية */}
              <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-[0_4px_20px_rgba(37,99,235,0.06)] flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#60a5fa] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(59,130,246,0.35)] shrink-0">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#64748b] block mb-1">إجمالي الطلبات</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">{totalOrdersCount}</div>
                  <span className="text-[10px] text-[#475569] font-bold mt-1 block">100% من إجمالي الطلبات</span>
                </div>
              </div>

              {/* KPI 2: الطلبات المكتملة الحقيقية */}
              <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-[0_4px_20px_rgba(37,99,235,0.06)] flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#10b981] to-[#34d399] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(160,185,129,0.35)] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#64748b] block mb-1">الطلبات المكتملة</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">{paidOrdersCount}</div>
                  <span className="text-[10px] text-emerald-700 font-bold mt-1 block">
                    {totalOrdersCount > 0 ? Math.round((paidOrdersCount / totalOrdersCount) * 100) : 0}% نسبة الإنجاز
                  </span>
                </div>
              </div>

              {/* KPI 3: قيد المراجعة الحقيقية */}
              <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-[0_4px_20px_rgba(37,99,235,0.06)] flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f97316] to-[#fb923c] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(249,115,22,0.35)] shrink-0">
                  <Hourglass className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#64748b] block mb-1">قيد المراجعة</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">{reviewOrdersCount}</div>
                  <span className="text-[10px] text-amber-700 font-bold mt-1 block">
                    {totalOrdersCount > 0 ? Math.round((reviewOrdersCount / totalOrdersCount) * 100) : 0}% مشاريع قيد المعالجة
                  </span>
                </div>
              </div>

              {/* KPI 4: إجمالي المبيعات الحقيقية */}
              <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-[0_4px_20px_rgba(37,99,235,0.06)] flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#a855f7] to-[#c084fc] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(168,85,247,0.35)] shrink-0">
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#64748b] block mb-1">إجمالي المبيعات الحقيقية</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">
                    {totalRevenueSum.toLocaleString()} درهم
                  </div>
                  <span className="text-[10px] text-[#16a34a] font-black mt-1 flex items-center justify-end gap-1">
                    <span>مبيعات مؤكدة</span>
                    <span>✓</span>
                  </span>
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* VIEW 1: ORDERS TAB (MAIN WORKSTATION)                   */}
            {/* ======================================================== */}
            {activeTab === "orders" && (
              <>
                {/* --- ACTION & FILTER TOOLBAR --- */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full pt-1">
                  
                  {/* Search Bar */}
                  <div className="relative w-full md:w-[360px] lg:w-[420px]">
                    <input
                      type="text"
                      placeholder="ابحث باسم العميل أو رقم الهاتف أو المدينة..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2.5 pr-10 rounded-2xl bg-white border border-[#d2e2f3] text-xs font-bold text-[#0b1739] placeholder-[#94a3b8] outline-none focus:border-blue-500 shadow-sm transition-all"
                    />
                    <Search className="w-4 h-4 text-blue-500 absolute right-3.5 top-3" />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    
                    {/* Filter 1: حالة الدفع */}
                    <div className="relative">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="appearance-none px-4 py-2.5 pl-8 rounded-2xl bg-white border border-[#d2e2f3] text-xs font-bold text-[#0b1739] outline-none shadow-sm cursor-pointer pr-3"
                      >
                        <option value="all">جميع الحالات</option>
                        <option value="paid">مدفوع ومكتمل</option>
                        <option value="review">قيد المراجعة</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3.5 pointer-events-none" />
                    </div>

                    {/* Filter 2: طريقة الدفع */}
                    <div className="relative">
                      <select
                        value={methodFilter}
                        onChange={(e) => setMethodFilter(e.target.value)}
                        className="appearance-none px-4 py-2.5 pl-8 rounded-2xl bg-white border border-[#d2e2f3] text-xs font-bold text-[#0b1739] outline-none shadow-sm cursor-pointer pr-3"
                      >
                        <option value="all">كل طرق الدفع</option>
                        <option value="بطاقة">بطاقة بنكية</option>
                        <option value="YouCan">YouCan Pay</option>
                        <option value="CMI">بوابة CMI</option>
                        <option value="واتساب">واتساب VIP</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3.5 pointer-events-none" />
                    </div>

                    {/* Filter 3: الباقات */}
                    <div className="relative">
                      <select
                        value={planFilter}
                        onChange={(e) => setPlanFilter(e.target.value)}
                        className="appearance-none px-4 py-2.5 pl-8 rounded-2xl bg-white border border-[#d2e2f3] text-xs font-bold text-[#0b1739] outline-none shadow-sm cursor-pointer pr-3"
                      >
                        <option value="all">كل الباقات</option>
                        <option value="الهبوط">صفحة الهبوط (500 د.م)</option>
                        <option value="القياسي">المتجر القياسي (1500 د.م)</option>
                        <option value="المتقدمة">منصة SaaS (5000 د.م)</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3.5 pointer-events-none" />
                    </div>

                  </div>

                  {/* Export Button */}
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

                {/* --- TWO-COLUMN WORKSTATION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  
                  {/* RIGHT PART (COL 4): SELECTED ORDER DETAILS */}
                  <div className="lg:col-span-4 rounded-3xl bg-white border border-[#d4e4f7] p-4 sm:p-5 shadow-sm flex flex-col gap-3.5 order-1">
                    {selectedOrder ? (
                      <>
                        {/* Header Banner */}
                        <div className="rounded-2xl bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-white p-3 flex items-center justify-between shadow-md">
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="w-4 h-4 text-cyan-200" />
                            <span className="text-xs sm:text-sm font-black">
                              تفاصيل الطلب #{selectedOrder.id}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteOrder(selectedOrder.id)}
                            className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-600 text-white transition-colors"
                            title="حذف هذا الطلب"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Status Switcher Bar */}
                        <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                          <span className="text-xs font-bold text-slate-600">تعديل الحالة:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleUpdateStatus(selectedOrder.id, "paid")}
                              className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                                selectedOrder.status === "paid"
                                  ? "bg-emerald-600 text-white shadow-sm"
                                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              مكتمل / مدفوع
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(selectedOrder.id, "review")}
                              className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                                selectedOrder.status === "review"
                                  ? "bg-amber-500 text-white shadow-sm"
                                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              قيد المراجعة
                            </button>
                          </div>
                        </div>

                        {/* Info Fields */}
                        <div className="space-y-2.5 text-xs">
                          
                          {/* اسم المشتري */}
                          <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                            <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-blue-600" />
                              <span>اسم المشتري</span>
                            </span>
                            <span className="font-bold text-[#0b1739]">{selectedOrder.customerName}</span>
                          </div>

                          {/* رقم الهاتف */}
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

                          {/* المدينة */}
                          <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                            <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-blue-600" />
                              <span>المدينة</span>
                            </span>
                            <span className="font-bold text-[#0b1739]">{selectedOrder.city}</span>
                          </div>

                          {/* الباقة المشتراة */}
                          <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                            <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                              <Package className="w-3.5 h-3.5 text-blue-600" />
                              <span>الباقة المشتراة</span>
                            </span>
                            <span className="font-bold text-[#0b1739]">{selectedOrder.planTitle}</span>
                          </div>

                          {/* المبلغ */}
                          <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                            <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                              <Coins className="w-3.5 h-3.5 text-blue-600" />
                              <span>المبلغ</span>
                            </span>
                            <span className="font-black text-emerald-700 font-mono text-sm">{selectedOrder.formattedPrice}</span>
                          </div>

                          {/* تاريخ الدفع */}
                          <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                            <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-blue-600" />
                              <span>تاريخ الدفع</span>
                            </span>
                            <span className="font-bold text-[#334155]">{selectedOrder.dateFormatted}</span>
                          </div>

                          {/* طريقة الدفع */}
                          <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                            <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>طريقة الدفع</span>
                            </span>
                            <span className="font-bold text-[#0b1739]">{selectedOrder.paymentMethod}</span>
                          </div>

                          {/* البريد الإلكتروني */}
                          <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
                            <span className="text-[#64748b] font-bold flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-blue-600" />
                              <span>البريد الإلكتروني</span>
                            </span>
                            <span className="font-mono text-[#475569] text-[11px]">{selectedOrder.customerEmail}</span>
                          </div>

                          {/* ملاحظات العميل */}
                          {selectedOrder.productNotes && (
                            <div className="py-2 border-b border-[#f1f5f9]">
                              <span className="text-[#64748b] font-bold block mb-1">ملاحظات العميل:</span>
                              <p className="text-[#0b1739] bg-slate-50 p-2 rounded-xl border border-slate-100 text-[11px] leading-relaxed">
                                {selectedOrder.productNotes}
                              </p>
                            </div>
                          )}

                        </div>

                        {/* Uploaded Product Photos */}
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
                                  className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#d2e2f3] hover:border-blue-500 shadow-sm shrink-0 cursor-pointer hover:scale-105 transition-transform"
                                  title="انقر لتكبير صورة المنتج بدقة عالية"
                                >
                                  <img src={img} alt={`منتج ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions: WhatsApp + Details */}
                        <div className="pt-2 flex items-center gap-2">
                          <a
                            href={`https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `مرحباً بك ${selectedOrder.customerName}، معك إدارة ECOM SPEED PRO بخصوص طلبك رقم ${selectedOrder.id}.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-2.5 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                          >
                            <WhatsAppIcon size={14} />
                            <span>مراسلة واتساب</span>
                          </a>
                          <button
                            onClick={() => setDetailModalOpen(true)}
                            className="py-2.5 px-4 rounded-full border border-blue-600/30 hover:border-blue-600 text-blue-700 hover:bg-blue-50/70 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span>عرض الوثيقة</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 text-slate-400 font-bold text-xs">
                        اختر طلباً من الجدول لعرض التفاصيل
                      </div>
                    )}
                  </div>

                  {/* LEFT PART (COL 8): REAL PURCHASES TABLE */}
                  <div className="lg:col-span-8 flex flex-col gap-4 order-2">
                    
                    {/* Table Header with Real Count */}
                    <div className="flex items-center justify-between text-base font-black text-[#0b1739]">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-purple-600" />
                        <span>سجل المشتريات المباشرة ({filteredOrders.length})</span>
                      </div>
                      <span className="text-xs text-blue-600 font-bold">
                        انقر على أي سطر لمشاهدة تفاصيله وصور المنتج
                      </span>
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
                            <th className="py-3 px-3.5 text-center">الحالة</th>
                            <th className="py-3 px-3.5 text-center">إجراء</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#edf3fa]">
                          {filteredOrders.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="text-center py-10 text-slate-400 font-bold">
                                لا توجد طلبات مطابقة للبحث حالياً
                              </td>
                            </tr>
                          ) : (
                            filteredOrders.map((ord) => {
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
                                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center font-black text-[10px] shrink-0">
                                        {ord.customerName.charAt(0)}
                                      </div>
                                      <div>
                                        <span className="font-black text-[#0b1739] block">{ord.customerName}</span>
                                        <span className="text-[10px] text-slate-400 block font-mono">{ord.id}</span>
                                      </div>
                                    </div>
                                  </td>

                                  {/* رقم الهاتف */}
                                  <td className="py-3.5 px-3.5 font-mono text-blue-600 font-bold" dir="ltr">
                                    {ord.customerPhone}
                                  </td>

                                  {/* الباقة المشتراة */}
                                  <td className="py-3.5 px-3.5 font-bold text-[#1e293b]">
                                    {ord.planTitle}
                                  </td>

                                  {/* المبلغ */}
                                  <td className="py-3.5 px-3.5 font-black text-emerald-700 font-mono">
                                    {ord.formattedPrice}
                                  </td>

                                  {/* تاريخ الدفع */}
                                  <td className="py-3.5 px-3.5 text-slate-500 font-bold">
                                    {ord.dateFormatted}
                                  </td>

                                  {/* طريقة الدفع */}
                                  <td className="py-3.5 px-3.5 text-slate-700 font-bold">
                                    {ord.paymentMethod}
                                  </td>

                                  {/* البريد الإلكتروني */}
                                  <td className="py-3.5 px-3.5 font-mono text-slate-500 text-[11px]">
                                    {ord.customerEmail}
                                  </td>

                                  {/* الحالة */}
                                  <td className="py-3.5 px-3.5 text-center">
                                    {ord.status === "paid" ? (
                                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                        <span>مكتمل</span>
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px]">
                                        <Hourglass className="w-3 h-3 text-amber-600" />
                                        <span>قيد المراجعة</span>
                                      </span>
                                    )}
                                  </td>

                                  {/* إجراءات سريعة */}
                                  <td className="py-3.5 px-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                                    <button
                                      onClick={() => handleDeleteOrder(ord.id)}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                      title="حذف هذا الطلب"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* --- BOTTOM PROMO & FUTURE BANNER --- */}
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
              </>
            )}

            {/* ======================================================== */}
            {/* VIEW 2: HOME TAB (EXECUTIVE SUMMARY)                     */}
            {/* ======================================================== */}
            {activeTab === "home" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="rounded-3xl bg-white border border-blue-100 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <CircleDollarSign className="w-5 h-5" />
                      </div>
                      <h3 className="font-black text-sm text-[#0b1739]">متوسط قيمة الطلب (AOV)</h3>
                    </div>
                    <div className="text-3xl font-black font-mono text-blue-600">{avgOrderValue.toLocaleString()} درهم</div>
                    <p className="text-xs text-slate-500 mt-2">محسوبة من كافة طلبات المتجر المؤكدة</p>
                  </div>

                  <div className="rounded-3xl bg-white border border-emerald-100 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <h3 className="font-black text-sm text-[#0b1739]">العملاء الفريدين</h3>
                    </div>
                    <div className="text-3xl font-black font-mono text-emerald-600">{uniqueCustomers.length} عميل</div>
                    <p className="text-xs text-slate-500 mt-2">سجلات عملاء مميزين تم استخراجهم مباشرة</p>
                  </div>

                  <div className="rounded-3xl bg-white border border-purple-100 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Percent className="w-5 h-5" />
                      </div>
                      <h3 className="font-black text-sm text-[#0b1739]">نسبة الإنجاز المالي</h3>
                    </div>
                    <div className="text-3xl font-black font-mono text-purple-600">
                      {totalOrdersCount > 0 ? Math.round((paidOrdersCount / totalOrdersCount) * 100) : 0}%
                    </div>
                    <p className="text-xs text-slate-500 mt-2">نسبة الطلبات المدفوعة والمنتهية</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-3xl bg-white border border-blue-100 p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-black text-base text-[#0b1739]">إجراءات سريعة لإدارة المتجر</h3>
                    <p className="text-xs text-slate-500 mt-1">أدوات تحكم مباشرة للسيرفر وقاعدة البيانات</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCreateModalOpen(true)}
                      className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>إضافة طلب يدوي</span>
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      <span>تنزيل تقرير مالي CSV</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>عرض جدول الطلبات</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 3: CUSTOMERS TAB (REAL BUYERS DIRECTORY)           */}
            {/* ======================================================== */}
            {activeTab === "customers" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-base text-[#0b1739]">
                    قائمة المشترين والعملاء الفعليين ({uniqueCustomers.length})
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">
                    تم استخراجهم آلياً من سجل الطلبات الحقيقية
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uniqueCustomers.map((c, idx) => (
                    <div
                      key={idx}
                      className="rounded-3xl bg-white border border-blue-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 text-white flex items-center justify-center font-black text-xs">
                              {c.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-black text-sm text-[#0b1739]">{c.name}</h4>
                              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                                <MapPin className="w-3 h-3 text-blue-500" />
                                <span>{c.city}</span>
                              </span>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black">
                            {c.ordersCount} {c.ordersCount === 1 ? "طلب" : "طلبات"}
                          </span>
                        </div>

                        <div className="mt-3 space-y-2 text-xs">
                          <div className="flex justify-between text-slate-600">
                            <span>الهاتف:</span>
                            <span className="font-mono font-bold text-blue-600" dir="ltr">{c.phone}</span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>البريد:</span>
                            <span className="font-mono text-slate-500 text-[11px]">{c.email}</span>
                          </div>
                          <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-100">
                            <span>إجمالي المشتريات:</span>
                            <span className="font-mono font-black text-emerald-700">{c.totalSpent.toLocaleString()} درهم</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `مرحباً بك ${c.name}، معك إدارة ECOM SPEED PRO.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <WhatsAppIcon size={14} />
                        <span>مراسلة العميل واتساب</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 4: PRODUCTS / PACKAGES TAB                          */}
            {/* ======================================================== */}
            {activeTab === "products" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-base text-[#0b1739]">
                    أداء باقات الخدمات والمنتجات الرقمية
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">
                    إجمالي إيرادات كل باقة محسوبة لحظياً
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {Object.entries(packageStats).map(([title, st], idx) => (
                    <div
                      key={idx}
                      className="rounded-3xl bg-white border border-blue-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-50 text-cyan-700">
                            {st.priceText}
                          </span>
                          <span className="font-mono text-sm font-black text-blue-600">
                            {st.count} مبيعات
                          </span>
                        </div>
                        <h4 className="font-black text-base text-[#0b1739] mt-3">{title}</h4>
                        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <span className="text-xs font-bold text-slate-500 block mb-1">إجمالي الإيرادات:</span>
                          <div className="text-2xl font-black font-mono text-emerald-700">
                            {st.revenue.toLocaleString()} درهم
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setPlanFilter(title.includes("الهبوط") ? "الهبوط" : title.includes("SaaS") ? "المتقدمة" : "القياسي");
                          setActiveTab("orders");
                        }}
                        className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>عرض طلبات هذه الباقة</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 5: PAYMENTS TAB                                     */}
            {/* ======================================================== */}
            {activeTab === "payments" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-base text-[#0b1739]">
                    سجل بوابات الدفع والمعاملات المالية
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">
                    إجمالي الإيرادات حسب كل طريقة دفع
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(paymentStats).map(([name, st], idx) => (
                    <div key={idx} className="rounded-3xl bg-white border border-blue-100 p-5 shadow-sm">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <h4 className="font-black text-sm text-[#0b1739]">{name}</h4>
                        <span className="text-xs font-black text-slate-500 font-mono">{st.count} عمليات</span>
                      </div>
                      <div className="mt-3">
                        <span className="text-xs text-slate-500 font-bold block mb-1">المبلغ الإجمالي:</span>
                        <div className={`text-xl sm:text-2xl font-black font-mono ${st.color}`}>
                          {st.total.toLocaleString()} درهم
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl bg-white border border-blue-100 p-6 shadow-sm">
                  <h4 className="font-black text-sm text-[#0b1739] mb-3">حالة البوابات الإلكترونية</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="font-black text-xs text-slate-800">YouCan Pay المغربية</span>
                      </div>
                      <span className="text-xs text-emerald-700 font-bold">مفعلة وتعمل مباشرة</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="font-black text-xs text-slate-800">بوابة CMI للمركز النقدي</span>
                      </div>
                      <span className="text-xs text-emerald-700 font-bold">مفعلة وتعمل مباشرة</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="font-black text-xs text-slate-800">تأكيد واتساب VIP المباشر</span>
                      </div>
                      <span className="text-xs text-emerald-700 font-bold">مفعل على الرقم +212 762 35 74 91</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 6: REPORTS TAB                                      */}
            {/* ======================================================== */}
            {activeTab === "reports" && (
              <div className="space-y-5">
                <div className="rounded-3xl bg-white border border-blue-100 p-6 shadow-sm">
                  <h3 className="font-black text-base text-[#0b1739] mb-4">تقرير الأداء والتحليلات</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                      <span className="text-xs font-bold text-blue-700">إجمالي المبيعات المؤكدة</span>
                      <div className="text-2xl font-black font-mono text-blue-900 mt-1">{totalRevenueSum.toLocaleString()} د.م</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <span className="text-xs font-bold text-emerald-700">عدد المعاملات الناجحة</span>
                      <div className="text-2xl font-black font-mono text-emerald-900 mt-1">{paidOrdersCount} طلب</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                      <span className="text-xs font-bold text-amber-700">طلبات قيد المتابعة</span>
                      <div className="text-2xl font-black font-mono text-amber-900 mt-1">{reviewOrdersCount} طلب</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                      <span className="text-xs font-bold text-purple-700">معدل قيمة السلة</span>
                      <div className="text-2xl font-black font-mono text-purple-900 mt-1">{avgOrderValue.toLocaleString()} د.م</div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleExportCSV}
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      <span>تصدير التقرير الكامل كملف CSV</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 7: SETTINGS TAB                                     */}
            {/* ======================================================== */}
            {activeTab === "settings" && (
              <div className="space-y-5">
                <div className="rounded-3xl bg-white border border-blue-100 p-6 shadow-sm">
                  <h3 className="font-black text-base text-[#0b1739] mb-4">إعدادات المنظومة الإدارية</h3>
                  
                  <div className="space-y-4 max-w-2xl text-xs">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div>
                        <span className="font-black text-[#0b1739] block">اسم المسؤول الإداري</span>
                        <span className="text-slate-400">الحساب الرئيسي للوحة التحكم</span>
                      </div>
                      <span className="font-black text-blue-600 text-sm">Ecom Speed Pro</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div>
                        <span className="font-black text-[#0b1739] block">رقم واتساب الإدارة المعتمد</span>
                        <span className="text-slate-400">الرقم المستلم لإشعارات الطلبات</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-700 text-sm" dir="ltr">+212 762 35 74 91</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div>
                        <span className="font-black text-[#0b1739] block">قاعدة البيانات المحلية</span>
                        <span className="text-slate-400">ملف التخزين الدائم للطلبات</span>
                      </div>
                      <span className="font-mono text-slate-600 text-xs">data/orders.json (نشط ومحدث)</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div>
                        <span className="font-black text-[#0b1739] block">المزامنة التلقائية الحية</span>
                        <span className="text-slate-400">فحص التحديثات كل 4 ثوانٍ</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                        مفعلة (Auto-Polling 4s)
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={handleManualRefresh}
                      className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>مزامنة يدوية فورية</span>
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>تنزيل نسخة احتياطية للبيانات</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

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
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
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
      {detailModalOpen && selectedOrder && (
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
                <span className="font-mono font-bold text-blue-600" dir="ltr">{selectedOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-bold text-slate-500">المدينة:</span>
                <span className="font-black text-[#0b1739]">{selectedOrder.city}</span>
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

      {/* ======================================================== */}
      {/* 5. MODAL DIALOG FOR "تسجيل طلب جديد" (MANUAL REAL ORDER) */}
      {/* ======================================================== */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-blue-100 flex flex-col gap-4 text-right">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-base text-[#0b1739]">
                  تسجيل طلب حقيقي جديد في السيرفر
                </h3>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">اسم العميل *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: محمد العمري"
                  value={newOrderName}
                  onChange={(e) => setNewOrderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">رقم الهاتف *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: 06 12 34 56 78"
                    value={newOrderPhone}
                    onChange={(e) => setNewOrderPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">المدينة</label>
                  <input
                    type="text"
                    placeholder="مثال: الدار البيضاء"
                    value={newOrderCity}
                    onChange={(e) => setNewOrderCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="مثال: client@domain.ma"
                  value={newOrderEmail}
                  onChange={(e) => setNewOrderEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">الباقة</label>
                  <select
                    value={newOrderPlan}
                    onChange={(e) => {
                      setNewOrderPlan(e.target.value);
                      if (e.target.value.includes("الهبوط")) setNewOrderPrice("500");
                      else if (e.target.value.includes("المتقدمة")) setNewOrderPrice("5000");
                      else setNewOrderPrice("1500");
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold outline-none"
                  >
                    <option value="صفحة الهبوط (Landing Page)">صفحة الهبوط (500 د.م)</option>
                    <option value="المتجر القياسي (Standard Store)">المتجر القياسي (1,500 د.م)</option>
                    <option value="منصة التجارة المتقدمة (Advanced SaaS)">منصة SaaS (5,000 د.م)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">المبلغ (درهم)</label>
                  <input
                    type="text"
                    value={newOrderPrice}
                    onChange={(e) => setNewOrderPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">طريقة الدفع</label>
                <select
                  value={newOrderMethod}
                  onChange={(e) => setNewOrderMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold outline-none"
                >
                  <option value="YouCan Pay">YouCan Pay</option>
                  <option value="بوابة CMI">بوابة CMI</option>
                  <option value="بطاقة بنكية">بطاقة بنكية</option>
                  <option value="واتساب VIP">واتساب VIP</option>
                  <option value="تحويل بنكي مباشر">تحويل بنكي مباشر</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">ملاحظات المشروع أو العميل</label>
                <textarea
                  rows={2}
                  placeholder="أدخل أي ملاحظات خاصة بمتجر العميل أو رغباته..."
                  value={newOrderNotes}
                  onChange={(e) => setNewOrderNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>حفظ الطلب فوراً في قاعدة البيانات</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
