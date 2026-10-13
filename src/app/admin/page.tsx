"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  User,
  Users,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Clock,
  Save,
  Search,
  RefreshCw,
  X,
  Copy,
  Package,
  Check,
  Sparkles,
  Globe,
  MessageCircle,
  CreditCard,
  Download,
  Trash2,
  Plus,
  Store,
  Monitor,
  ShieldCheck,
  Edit3,
  TrendingUp,
  Rocket,
} from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_city?: string;
  phone_number: string;
  customer_email?: string;
  store_name?: string;
  product_price?: string | number;
  order_phone?: string;
  plan_tier: string;
  status: "pending" | "in_progress" | "completed";
  delivered_url: string | null;
  payment_method?: string;
  product_notes?: string;
  product_images?: string[];
  created_at: string;
}

const ADMIN_TOKEN = "ESP_SECURE_DESKTOP_TOKEN_2026_9f8d1c7a4b";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentTab, setCurrentTab] = useState<
    "orders" | "home" | "customers" | "products" | "payments" | "reports" | "settings"
  >("orders");

  // Modals state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<{
    name: string;
    phone: string;
    city: string;
    email: string;
  } | null>(null);
  const [quickStoreOrderId, setQuickStoreOrderId] = useState<string | null>(null);
  const [quickStoreUrlInput, setQuickStoreUrlInput] = useState("");
  const [quickStoreDeliveryStatus, setQuickStoreDeliveryStatus] = useState<"completed" | "in_progress">("completed");
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // New order form
  const [newOrderForm, setNewOrderForm] = useState({
    customer_name: "",
    customer_city: "الدار البيضاء (Casablanca)",
    phone_number: "",
    customer_email: "",
    store_name: "",
    product_price: "299 د.م",
    order_phone: "",
    plan_tier: "المتجر القياسي (1,500 MAD)",
    payment_method: "YouCan Pay 🇲🇦 (Sandbox)",
    product_notes: "",
  });

  // UI state
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showLiveBanner, setShowLiveBanner] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/orders?token=${ADMIN_TOKEN}&t=${Date.now()}`, {
        headers: {
          "x-admin-token": "2026",
          "x-desktop-auth-token": ADMIN_TOKEN,
        },
      });
      const data = await res.json();
      if (data && data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
        if (selectedOrder) {
          const fresh = data.orders.find((o: Order) => o.id === selectedOrder.id);
          if (fresh) setSelectedOrder(fresh);
        }
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      showToast("تعذر جلب الطلبات من الخادم");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  // Quick Status Update directly from table row dropdown
  const handleQuickStatusChange = async (
    orderId: string,
    newStatus: "pending" | "in_progress" | "completed"
  ) => {
    try {
      setIsUpdating(true);
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": "2026",
          "x-desktop-auth-token": ADMIN_TOKEN,
        },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(data.order);
        }
        showToast(
          newStatus === "completed"
            ? "تم تغيير حالة الطلب إلى 'مكتمل ومسلّم' 🟢"
            : newStatus === "in_progress"
            ? "تم تغيير حالة الطلب إلى 'جاري التجهيز' 🔵"
            : "تم تغيير حالة الطلب إلى 'قيد المراجعة' 🟡"
        );
      } else {
        showToast(data.message || "فشل تحديث الحالة");
      }
    } catch (err) {
      console.error(err);
      showToast("حدث خطأ أثناء تحديث الحالة");
    } finally {
      setIsUpdating(false);
    }
  };

  // Quick Save Store URL & Deliver Order Modal
  const handleSaveStoreUrl = async () => {
    if (!quickStoreOrderId) return;
    try {
      setIsUpdating(true);
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": "2026",
          "x-desktop-auth-token": ADMIN_TOKEN,
        },
        body: JSON.stringify({
          id: quickStoreOrderId,
          delivered_url: quickStoreUrlInput.trim(),
          status: quickStoreDeliveryStatus,
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === quickStoreOrderId ? data.order : o))
        );
        if (selectedOrder && selectedOrder.id === quickStoreOrderId) {
          setSelectedOrder(data.order);
        }
        showToast("تم تسليم الطلب وتحديث صفحة التتبع بنجاح! 🚀");
        setQuickStoreOrderId(null);
        setQuickStoreUrlInput("");
      } else {
        showToast(data.message || "فشل تسليم الطلب");
      }
    } catch (err) {
      console.error(err);
      showToast("حدث خطأ أثناء تسليم الطلب");
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete Order
  const handleDeleteOrder = async (orderId: string, orderNumber: string) => {
    if (!confirm(`هل أنت متأكد من حذف الطلب ${orderNumber} نهائياً؟`)) return;
    try {
      const res = await fetch(`/api/orders?id=${orderId}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": "2026",
          "x-desktop-auth-token": ADMIN_TOKEN,
        },
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
        if (selectedOrder?.id === orderId) setSelectedOrder(null);
        showToast(`تم حذف الطلب ${orderNumber} بنجاح 🗑️`);
      } else {
        showToast(data.message || "فشل حذف الطلب");
      }
    } catch (err) {
      console.error(err);
      showToast("حدث خطأ أثناء حذف الطلب");
    }
  };

  // Submit New Order from Admin Modal
  const handleCreateNewOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderForm.customer_name || !newOrderForm.phone_number) {
      alert("يرجى إدخال اسم التاجر ورقم هاتفه");
      return;
    }
    try {
      setIsUpdating(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newOrderForm,
          order_phone: newOrderForm.order_phone || newOrderForm.phone_number,
          status: "pending",
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) => [data.order, ...prev]);
        setIsNewOrderModalOpen(false);
        showToast(`تم تسجيل الطلب ${data.order.order_number} بنجاح ✨`);
      } else {
        showToast("فشل إنشاء الطلب");
      }
    } catch (err) {
      console.error(err);
      showToast("خطأ أثناء إنشاء الطلب");
    } finally {
      setIsUpdating(false);
    }
  };

  // Helper price parser
  const parsePrice = (o: Order) => {
    if (typeof o.product_price === "number") return o.product_price;
    const str = String(o.plan_tier || "1500");
    const match = str.match(/([0-9,]+)/);
    if (match) {
      const num = parseInt(match[1].replace(/,/g, ""), 10);
      if (!isNaN(num) && num > 0) return num;
    }
    return 1500;
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.order_number?.toLowerCase().includes(q) ||
        o.customer_name?.toLowerCase().includes(q) ||
        o.phone_number?.includes(q) ||
        o.store_name?.toLowerCase().includes(q) ||
        o.customer_city?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "pending" && (o.status === "pending" || !o.status)) ||
        (statusFilter === "in_progress" && o.status === "in_progress") ||
        (statusFilter === "completed" && (o.status === "completed" || (o as any).status === "paid"));

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  // KPIs
  const totalOrdersCount = orders.length;
  const completedOrdersCount = orders.filter(
    (o) => o.status === "completed" || (o as any).status === "paid"
  ).length;
  const pendingOrdersCount = orders.filter(
    (o) => o.status === "pending" || !o.status
  ).length;
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + parsePrice(o), 0);
  }, [orders]);

  // CSV Export
  const exportCSV = () => {
    const headers = [
      "الطلب",
      "التاجر والمدينة",
      "المتجر والمنتج",
      "الباقة",
      "المبلغ",
      "هاتف استقبال الطلبات",
      "الحالة",
      "رابط المتجر",
      "تاريخ الطلب",
    ];
    const rows = filteredOrders.map((o) => [
      o.order_number,
      `${o.customer_name} (${o.customer_city || "الدار البيضاء"})`,
      `${o.store_name || ""} - ${o.product_price || ""}`,
      o.plan_tier,
      parsePrice(o),
      o.order_phone || o.phone_number,
      o.status,
      o.delivered_url || "",
      new Date(o.created_at).toLocaleString("ar-MA"),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ecom-speed-pro-orders-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("تم تحميل ملف CSV بنجاح 📥");
  };

  // CRM: unique customers list
  const customersList = useMemo(() => {
    const map = new Map<string, { name: string; phone: string; city: string; email: string; ordersCount: number; totalSpend: number; lastOrder: string }>();
    orders.forEach((o) => {
      const key = o.phone_number || o.customer_name;
      if (!map.has(key)) {
        map.set(key, {
          name: o.customer_name,
          phone: o.phone_number,
          city: o.customer_city || "الدار البيضاء",
          email: o.customer_email || "",
          ordersCount: 1,
          totalSpend: parsePrice(o),
          lastOrder: o.created_at,
        });
      } else {
        const item = map.get(key)!;
        item.ordersCount += 1;
        item.totalSpend += parsePrice(o);
        if (new Date(o.created_at) > new Date(item.lastOrder)) {
          item.lastOrder = o.created_at;
        }
      }
    });
    return Array.from(map.values());
  }, [orders]);

  // Latest Order for Banner
  const latestOrder = orders[0];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#02133f] via-[#052b75] to-[#011440] text-slate-800 p-3 sm:p-5 lg:p-6 relative overflow-x-hidden font-sans"
      dir="rtl"
      style={{ zoom: zoomLevel }}
    >
      {/* Background Cosmic Ethereal Rays */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/25 via-blue-600/10 to-transparent" />
        <div className="absolute -top-32 right-1/4 w-[750px] h-[750px] bg-cyan-400/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 left-1/4 w-[750px] h-[750px] bg-blue-500/20 rounded-full blur-[140px]" />
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-5 py-2.5 shadow-[0_10px_35px_rgba(16,185,129,0.5)] border border-emerald-300/40 flex items-center gap-2.5 text-xs font-black">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-[1720px] mx-auto flex flex-col gap-4">
        {/* ======================================================== */}
        {/* 1. TOP HEADER BAR (EXACT ORDER: RIGHT TO LEFT)           */}
        {/* ======================================================== */}
        <header className="w-full flex flex-wrap items-center justify-between gap-3 px-2 sm:px-4 py-1.5">
          {/* RIGHT: Logo & Title Capsule */}
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-gradient-to-r from-[#071d52]/95 via-[#0b2b7b]/95 to-[#041643]/95 px-4 py-2 shadow-[0_8px_35px_rgba(2,16,56,0.6)] border border-cyan-400/45 backdrop-blur-2xl flex items-center gap-3.5">
              <div className="relative w-11 h-11 rounded-2xl bg-[#031338] border border-cyan-300/50 p-1 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 via-blue-400 to-amber-300">
                  E
                </span>
              </div>
              <div className="text-right flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-amber-300 drop-shadow-[0_2px_15px_rgba(6,182,212,0.7)]">
                    لوحة التحكم
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.55)]">
                    <Sparkles className="w-2.5 h-2.5 text-slate-950 animate-pulse" />
                    <span>برنامج سطح المكتب المستقل</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-black tracking-wider text-cyan-300">
                    ECOM SPEED PRO
                  </span>
                  <span className="text-[9.5px] text-blue-200/80 font-bold hidden sm:inline">
                    - تطبيق آمن 100% غير متاح على المتصفح
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: Server Pulse Ribbon */}
          <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-black text-emerald-300">
                ⚡ البث المباشر متصل لحظياً
              </span>
            </div>
            <span className="text-slate-400 text-xs">|</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-[11px] font-black text-cyan-200">
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              <span>حاسوبك الشخصي فقط</span>
            </div>
            <span className="text-slate-400 text-xs">|</span>
            <span className="text-xs font-bold text-white">
              {totalOrdersCount} طلبات مسجلة
            </span>
            <span className="text-slate-400 text-xs">|</span>
            <span className="text-xs font-mono font-black text-amber-300">
              {totalRevenue.toLocaleString()} د.م مبيعات
            </span>
          </div>

          {/* LEFT: Controls (Zoom, New Order, Refresh) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Zoom Controls */}
            <div className="flex items-center bg-[#071d52]/80 border border-cyan-400/30 rounded-2xl px-2 py-1 gap-1.5 shadow-md">
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.2, z + 0.05))}
                className="w-6 h-6 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-cyan-300 flex items-center justify-center font-black text-xs cursor-pointer transition-colors"
                title="تكبير العرض"
              >
                +
              </button>
              <span className="text-[11px] font-mono font-black text-cyan-200 px-1">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.05))}
                className="w-6 h-6 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-cyan-300 flex items-center justify-center font-black text-xs cursor-pointer transition-colors"
                title="تصغير العرض"
              >
                -
              </button>
            </div>

            {/* + طلب جديد Button */}
            <button
              onClick={() => setIsNewOrderModalOpen(true)}
              className="px-3.5 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_4px_20px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>طلب جديد</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={fetchOrders}
              className="w-10 h-10 rounded-2xl bg-[#071d52]/90 border border-cyan-400/40 text-cyan-300 hover:text-white hover:bg-blue-800/90 flex items-center justify-center shadow-md transition-all cursor-pointer hover:rotate-180"
              title="تحديث البيانات فوراً"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ======================================================== */}
        {/* 2. LIVE ALERT BANNER (طلب جديد وصل الآن في نفس اللحظة)   */}
        {/* ======================================================== */}
        {showLiveBanner && latestOrder && (
          <div className="w-full rounded-2xl bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-teal-950/90 border border-cyan-400/40 px-4 py-2.5 shadow-[0_8px_30px_rgba(6,182,212,0.25)] flex items-center justify-between text-white animate-in fade-in duration-300">
            {/* Left: Close button + Time */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLiveBanner(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-cyan-300 font-mono font-bold" dir="ltr">
                {new Date(latestOrder.created_at).toLocaleTimeString("ar-MA")}
              </span>
            </div>

            {/* Right: Sparkle + Message */}
            <div className="flex items-center gap-2 text-right">
              <div>
                <span className="text-xs font-black text-emerald-400 block">
                  طلب جديد وصل الآن في نفس اللحظة! ⚡
                </span>
                <span className="text-xs text-slate-200 font-bold">
                  العميل:{" "}
                  <strong className="text-white font-black">
                    {latestOrder.customer_name}
                  </strong>{" "}
                  — {latestOrder.plan_tier} ({parsePrice(latestOrder).toLocaleString()} د.م)
                </span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-400/30">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. MAIN STAGE: SIDEBAR ON RIGHT + WORKSTATION ON LEFT   */}
        {/* ======================================================== */}
        <div className="flex flex-col xl:flex-row gap-4 items-stretch w-full">
          {/* ====================================================== */}
          {/* SIDEBAR NAVIGATION (ON THE FAR RIGHT IN RTL)           */}
          {/* ====================================================== */}
          <aside className="xl:w-[155px] shrink-0 rounded-[28px] bg-gradient-to-b from-[#0a2364]/95 via-[#06184a]/95 to-[#041238]/95 border border-cyan-400/40 p-3 shadow-[0_15px_40px_rgba(2,10,35,0.6)] flex flex-row xl:flex-col gap-2 justify-between xl:justify-start backdrop-blur-xl overflow-x-auto">
            {[
              { id: "orders", label: "الطلبات", icon: ShoppingCart },
              { id: "home", label: "الرئيسية", icon: Store },
              { id: "customers", label: "العملاء", icon: Users },
              { id: "products", label: "الباقات", icon: Package },
              { id: "payments", label: "المدفوعات", icon: CreditCard },
              { id: "reports", label: "التقارير", icon: TrendingUp },
              { id: "settings", label: "الأمان", icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id as any)}
                  className={`tab-button flex-1 xl:flex-initial rounded-2xl flex items-center justify-between px-3.5 py-3 transition-all cursor-pointer text-xs font-bold ${
                    isActive
                      ? "bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#3b82f6] text-white shadow-[0_0_25px_rgba(217,70,239,0.7)] font-black"
                      : "text-cyan-100/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </aside>

          {/* ====================================================== */}
          {/* MAIN WHITE WORKSTATION (TO THE LEFT OF SIDEBAR)        */}
          {/* ====================================================== */}
          <main className="flex-1 rounded-[32px] bg-gradient-to-b from-[#f8fbff]/95 via-[#f1f6fd]/95 to-[#e8f1fc]/95 border-2 border-white/80 shadow-[0_25px_70px_rgba(0,25,80,0.3)] p-5 sm:p-6 lg:p-7 flex flex-col gap-5 backdrop-blur-2xl min-h-[680px]">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-blue-100 pb-3">
              {/* Right: Icon + Title */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                  <div className="w-full h-full bg-[#0a1f58] rounded-[14px] flex items-center justify-center text-cyan-300">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0b1739]">
                    إدارة الطلبات والمدفوعات الحية
                  </h2>
                  <p className="text-xs text-slate-500 font-bold">
                    سجل الطلبات الواردة لحظياً — فوري ومحمي
                  </p>
                </div>
              </div>

              {/* Left: Online pulse badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-black text-emerald-700">متصل لحظياً</span>
              </div>
            </div>

            {/* ==================================================== */}
            {/* TAB: ORDERS (الطلبات)                                */}
            {/* ==================================================== */}
            {currentTab === "orders" && (
              <div className="flex flex-col gap-5">
                {/* 4 KPI CARDS (ORDER: TOTAL -> COMPLETED -> PENDING -> REVENUE) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {/* Card 1: Total Orders */}
                  <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#64748b] block mb-1">
                        إجمالي الطلبات
                      </span>
                      <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">
                        {totalOrdersCount}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3b82f6] to-[#60a5fa] text-white flex items-center justify-center shadow-md shrink-0">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card 2: Completed Orders */}
                  <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#64748b] block mb-1">
                        الطلبات المكتملة
                      </span>
                      <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">
                        {completedOrdersCount}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#10b981] to-[#34d399] text-white flex items-center justify-center shadow-md shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card 3: Pending Review */}
                  <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#64748b] block mb-1">
                        قيد المراجعة
                      </span>
                      <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">
                        {pendingOrdersCount}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f97316] to-[#fb923c] text-white flex items-center justify-center shadow-md shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card 4: Total Revenue */}
                  <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#64748b] block mb-1">
                        إجمالي المبيعات
                      </span>
                      <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">
                        {totalRevenue.toLocaleString()} درهم
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#a855f7] to-[#c084fc] text-white flex items-center justify-center shadow-md shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* SEARCH & FILTER BAR */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-blue-100 shadow-sm">
                  {/* Search Input (Takes right) */}
                  <div className="flex-1 min-w-[240px] relative">
                    <input
                      type="text"
                      placeholder="ابحث باسم العميل أو رقم الهاتف..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full py-2.5 px-4 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3" />
                  </div>

                  {/* Filters & Action Buttons (Takes left) */}
                  <div className="flex items-center gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer focus:outline-none"
                    >
                      <option value="all">جميع الحالات</option>
                      <option value="pending">قيد المراجعة</option>
                      <option value="in_progress">جاري التجهيز</option>
                      <option value="completed">مكتمل ومسلّم</option>
                    </select>

                    <button
                      onClick={fetchOrders}
                      className="px-3.5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      title="تحديث لحظي لجميع الطلبات"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>تحديث فوري</span>
                    </button>

                    <button
                      onClick={exportCSV}
                      className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>تصدير CSV</span>
                    </button>
                  </div>
                </div>

                {/* ORDERS TABLE CONTAINER (EXACT 9 COLUMNS) */}
                <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white shadow-sm">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                      <tr>
                        <th className="p-3.5">الطلب</th>
                        <th className="p-3.5">التاجر والمدينة</th>
                        <th className="p-3.5">المتجر والمنتج</th>
                        <th className="p-3.5">الباقة</th>
                        <th className="p-3.5">المبلغ</th>
                        <th className="p-3.5">هاتف استقبال الطلبات</th>
                        <th className="p-3.5">الحالة</th>
                        <th className="p-3.5">رابط المتجر</th>
                        <th className="p-3.5 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="p-8 text-center text-slate-400 font-bold">
                            {loading ? "جاري تحميل الطلبات..." : "لا توجد طلبات تطابق البحث"}
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((o) => {
                          const id = o.id;
                          const num = o.order_number || `#ESP-${id.slice(0, 6)}`;
                          const name = o.customer_name || "تاجر مميز";
                          const city = o.customer_city || "الدار البيضاء";
                          const phone = o.phone_number || "—";
                          const storeName = o.store_name || "متجر قيد التسمية";
                          const productPrice = o.product_price || "";
                          const orderPhone = o.order_phone || o.phone_number || "—";
                          const productImages = Array.isArray(o.product_images)
                            ? o.product_images
                            : [];
                          const plan = o.plan_tier || "المتجر القياسي";
                          const price = parsePrice(o);
                          const status = o.status || "pending";
                          const deliveredUrl = o.delivered_url || "";
                          const cleanPhone = phone.replace(/[^0-9]/g, "");
                          const cleanOrderPhone = orderPhone.replace(/[^0-9]/g, "");
                          const date = o.created_at
                            ? new Date(o.created_at).toLocaleDateString("ar-MA", {
                                month: "short",
                                day: "numeric",
                              })
                            : "اليوم";

                          return (
                            <tr
                              key={id}
                              onClick={() => setSelectedOrder(o)}
                              className="hover:bg-blue-50/70 transition-all border-b border-slate-100/80 cursor-pointer group/row"
                              title="انقر لفتح تفاصيل الطلب ومعلومات التاجر والمنتج"
                            >
                              {/* Col 1: Order ID & Date */}
                              <td className="p-3.5">
                                <span className="font-mono font-black text-blue-700 block">
                                  {num}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold">
                                  {date}
                                </span>
                              </td>

                              {/* Col 2: Merchant & City */}
                              <td className="p-3.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-blue-700 font-black text-xs flex items-center justify-center border border-blue-200 shrink-0">
                                    {name.charAt(0) || "ت"}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <strong className="text-slate-900 font-black block text-xs">
                                        {name}
                                      </strong>
                                      <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                                        <MapPin className="w-2.5 h-2.5 text-blue-500" />
                                        <span>{city}</span>
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span
                                        className="text-[10px] text-slate-400 font-mono font-bold"
                                        dir="ltr"
                                      >
                                        {phone}
                                      </span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedMerchant({
                                            name,
                                            phone,
                                            city,
                                            email: o.customer_email || "",
                                          });
                                        }}
                                        className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                                        title="فتح الملف الشخصي للتاجر"
                                      >
                                        <User className="w-2.5 h-2.5" />
                                        <span>بروفايل التاجر</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Col 3: Store & Product */}
                              <td className="p-3.5">
                                <div>
                                  <span className="font-black text-slate-900 group-hover/row:text-blue-600 transition-colors block text-xs">
                                    {storeName}
                                  </span>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    {productPrice ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                        <span>ثمن البيع:</span>
                                        <strong className="font-mono">{productPrice}</strong>
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-slate-400">
                                        ثمن البيع: غير محدد
                                      </span>
                                    )}
                                  </div>
                                  {productImages.length > 0 && (
                                    <div className="flex items-center gap-1 mt-1">
                                      {productImages.slice(0, 2).map((img, idx) => (
                                        <img
                                          key={idx}
                                          src={img}
                                          alt="preview"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setPreviewImage(img);
                                          }}
                                          className="w-6 h-6 rounded-md object-cover border border-slate-200 hover:scale-125 transition-transform cursor-pointer shadow-xs"
                                        />
                                      ))}
                                      {productImages.length > 2 && (
                                        <span className="text-[9px] font-black text-slate-500 bg-slate-100 px-1 py-0.5 rounded">
                                          +{productImages.length - 2}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </td>

                              {/* Col 4: Plan + Payment Gateway Badge */}
                              <td className="p-3.5">
                                <span className="font-bold text-xs text-slate-700 block">
                                  {plan}
                                </span>
                                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[9.5px] font-black bg-cyan-50 text-cyan-800 border border-cyan-200">
                                  <CreditCard className="w-2.5 h-2.5 text-cyan-600" />
                                  <span>{o.payment_method || "YouCan Pay 🇲🇦"}</span>
                                </span>
                              </td>

                              {/* Col 5: Price */}
                              <td className="p-3.5 font-mono font-black text-emerald-600 text-xs">
                                <span className="text-sm block">{price.toLocaleString()}</span>
                                <span className="text-[10px] text-emerald-600 font-sans block">
                                  د . م
                                </span>
                              </td>

                              {/* Col 6: Order Receiving Phone */}
                              <td className="p-3.5">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="font-mono font-bold text-xs text-slate-800"
                                    dir="ltr"
                                  >
                                    {orderPhone}
                                  </span>
                                  {cleanOrderPhone && (
                                    <a
                                      href={`https://wa.me/${
                                        cleanOrderPhone.startsWith("212")
                                          ? cleanOrderPhone
                                          : "212" + cleanOrderPhone.replace(/^0/, "")
                                      }?text=${encodeURIComponent(
                                        "السلام عليكم، نتواصل معك من إدارة Ecom Speed Pro لتأكيد رقم استقبال طلبات متجرك (" +
                                          storeName +
                                          ")."
                                      )}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="p-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                                      title="اختبار ومراسلة رقم استقبال الطلبات"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                </div>
                              </td>

                              {/* Col 7: Status Dropdown Pill */}
                              <td className="p-3.5">
                                <div
                                  className="relative inline-block"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <select
                                    value={status}
                                    onChange={(e) =>
                                      handleQuickStatusChange(id, e.target.value as any)
                                    }
                                    className={`py-1.5 px-3 rounded-full text-xs font-black cursor-pointer focus:outline-none transition-all shadow-xs border ${
                                      status === "completed"
                                        ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                                        : status === "in_progress"
                                        ? "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200"
                                        : "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
                                    }`}
                                  >
                                    <option value="pending">🟡 قيد المراجعة</option>
                                    <option value="in_progress">🔵 جاري التجهيز</option>
                                    <option value="completed">🟢 مكتمل ومسلّم</option>
                                  </select>
                                </div>
                              </td>

                              {/* Col 8: Delivered Store URL */}
                              <td className="p-3.5">
                                {deliveredUrl ? (
                                  <div
                                    className="flex items-center gap-1.5"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <a
                                      href={deliveredUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="px-2 py-1 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-mono text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                                      title="زيارة المتجر مباشرة"
                                    >
                                      <ExternalLink className="w-3 h-3 text-cyan-600" />
                                      <span>زيارة المتجر</span>
                                    </a>
                                    <button
                                      onClick={() => {
                                        setQuickStoreOrderId(id);
                                        setQuickStoreUrlInput(deliveredUrl);
                                        setQuickStoreDeliveryStatus(status === "pending" ? "completed" : status);
                                      }}
                                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 cursor-pointer"
                                      title="تعديل وتسليم رابط المتجر"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <button
                                      onClick={() => {
                                        setQuickStoreOrderId(id);
                                        setQuickStoreUrlInput("");
                                        setQuickStoreDeliveryStatus(status === "pending" ? "completed" : status);
                                      }}
                                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-cyan-50 text-slate-600 hover:text-cyan-700 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                                      title="تسليم رابط المتجر للعميل"
                                    >
                                      <Plus className="w-3 h-3 text-cyan-600" />
                                      <span>+ إضافة رابط</span>
                                    </button>
                                  </div>
                                )}
                              </td>

                              {/* Col 9: Distinct Actions (with 'تسليم الطلب الآن' at the far left) */}
                              <td
                                className="p-3.5 text-center flex items-center justify-center gap-1.5 flex-nowrap"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {/* Required Feature: تسليم الطلب الآن */}
                                <button
                                  onClick={() => {
                                    setQuickStoreOrderId(id);
                                    setQuickStoreUrlInput(deliveredUrl || "");
                                    setQuickStoreDeliveryStatus(status === "pending" ? "completed" : status);
                                  }}
                                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-black text-[11px] flex items-center gap-1.5 shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                                  title="تسليم المتجر للعميل وتحديث صفحة التتبع فوراً"
                                >
                                  <Rocket className="w-3.5 h-3.5" />
                                  <span>تسليم الطلب الآن</span>
                                </button>
                                {/* Action 1: Merchant Profile */}
                                <button
                                  onClick={() =>
                                    setSelectedMerchant({
                                      name,
                                      phone,
                                      city,
                                      email: o.customer_email || "",
                                    })
                                  }
                                  className="px-2 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10.5px] flex items-center gap-1 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                                  title="الملف الشخصي للتاجر"
                                >
                                  <User className="w-3 h-3 text-blue-600" />
                                  <span>ملف التاجر</span>
                                </button>

                                {/* Action 2: Store & Order Dossier */}
                                <button
                                  onClick={() => setSelectedOrder(o)}
                                  className="px-2 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10.5px] flex items-center gap-1 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                                  title="تفاصيل طلب المتجر ومشروعه"
                                >
                                  <Store className="w-3 h-3 text-slate-700" />
                                  <span>طلب المتجر</span>
                                </button>

                                {/* Action 3: Secret Tracking Link */}
                                <Link
                                  href={`/order/${id}`}
                                  target="_blank"
                                  className="p-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-bold text-[10.5px] flex items-center shadow-xs cursor-pointer"
                                  title="فتح صفحة التتبع السرية للتاجر"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>

                                {/* Action 4: WhatsApp Merchant */}
                                {cleanPhone && (
                                  <a
                                    href={`https://wa.me/${
                                      cleanPhone.startsWith("212")
                                        ? cleanPhone
                                        : "212" + cleanPhone.replace(/^0/, "")
                                    }?text=${encodeURIComponent(
                                      "السلام عليكم أخي الكريم " +
                                        name +
                                        "، نتواصل معك من إدارة Ecom Speed Pro بخصوص طلبك (" +
                                        num +
                                        ")."
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 cursor-pointer transition-colors"
                                    title="مراسلة التاجر عبر واتساب"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                )}

                                {/* Action 5: Delete */}
                                <button
                                  onClick={() => handleDeleteOrder(id, num)}
                                  className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer transition-colors"
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
              </div>
            )}

            {/* ==================================================== */}
            {/* OTHER TABS: PAYMENTS, CUSTOMERS, ETC.                */}
            {/* ==================================================== */}
            {currentTab === "payments" && (
              <div className="flex flex-col gap-4 text-right">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-black">
                    YouCan Pay Sandbox 🇲🇦
                  </span>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">سجل المدفوعات</h3>
                    <CreditCard className="w-5 h-5 text-cyan-600" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950 to-blue-950 text-white border border-cyan-400/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-300 text-xs font-black">
                      🟢 متصلة بنجاح (Sandbox)
                    </span>
                    <strong className="text-sm font-black">بوابة YouCan Pay</strong>
                  </div>
                  <p className="text-xs text-slate-300 font-mono" dir="ltr">
                    Public Key: pub_sandbox_58ce8ec9-8ab0-44d2-a2e1-96cd8
                  </p>
                </div>
              </div>
            )}

            {currentTab === "customers" && (
              <div className="flex flex-col gap-4 text-right">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {customersList.length} تجار مسجلين
                  </span>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">سجل العملاء (CRM)</h3>
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                      <tr>
                        <th className="p-3">التاجر والمدينة</th>
                        <th className="p-3">الهاتف الشخصي</th>
                        <th className="p-3">عدد المشاريع</th>
                        <th className="p-3">إجمالي المدفوعات</th>
                        <th className="p-3 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                      {customersList.map((c, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/50">
                          <td className="p-3 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                              {c.name.charAt(0) || "ت"}
                            </div>
                            <div>
                              <strong className="text-slate-900 font-black block text-xs">
                                {c.name}
                              </strong>
                              <span className="text-[10px] text-slate-400">{c.city}</span>
                            </div>
                          </td>
                          <td className="p-3 font-mono text-slate-700" dir="ltr">
                            {c.phone}
                          </td>
                          <td className="p-3 font-mono font-black text-blue-700">
                            {c.ordersCount} طلبات
                          </td>
                          <td className="p-3 font-mono font-black text-emerald-600">
                            {c.totalSpend.toLocaleString()} د.م
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => setSelectedMerchant(c)}
                              className="px-2.5 py-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs"
                            >
                              ملف التاجر
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL 1: STORE & ORDER DOSSIER (طلب المتجر والمنتج)      */}
      {/* ======================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#081538] border border-blue-500/50 p-5 sm:p-6 text-white shadow-2xl space-y-4 my-auto animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-blue-800/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-white">
                      ملف مشروع المتجر: {selectedOrder.order_number}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        selectedOrder.status === "completed"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                          : selectedOrder.status === "in_progress"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/40"
                          : "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                      }`}
                    >
                      {selectedOrder.status === "completed"
                        ? "مكتمل ومسلّم 🟢"
                        : selectedOrder.status === "in_progress"
                        ? "جاري التجهيز 🔵"
                        : "قيد المراجعة 🟡"}
                    </span>
                  </div>
                  <span className="text-xs text-blue-300 font-bold">
                    {selectedOrder.plan_tier} —{" "}
                    <strong className="text-emerald-400 font-mono">
                      {parsePrice(selectedOrder).toLocaleString()} د.م
                    </strong>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-9 h-9 rounded-full bg-blue-950 hover:bg-blue-900 border border-blue-700/60 text-blue-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product & Store Details Section */}
            <div className="p-4 rounded-2xl bg-[#062c22]/80 border border-emerald-600/60 space-y-3">
              <h4 className="text-xs font-black text-emerald-300 flex items-center gap-1.5 border-b border-emerald-800/60 pb-2">
                <Store className="w-4 h-4" />
                <span>معلومات ومواصفات المتجر والمنتج (Product & Store Info):</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#070e24] border border-emerald-800/40">
                  <span className="text-[10px] text-emerald-400 font-bold block mb-1">
                    اسم المتجر أو المنتج:
                  </span>
                  <strong className="text-white font-black text-sm block">
                    {selectedOrder.store_name || "متجر قيد التسمية"}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-[#070e24] border border-emerald-800/40">
                  <span className="text-[10px] text-emerald-400 font-bold block mb-1">
                    ثمن بيع المنتج للزبائن:
                  </span>
                  <strong className="text-emerald-300 font-mono font-black text-base block">
                    {selectedOrder.product_price || "غير محدد"}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-[#070e24] border border-emerald-800/40">
                  <span className="text-[10px] text-emerald-400 font-bold block mb-1">
                    هاتف استقبال الطلبات والمبيعات:
                  </span>
                  <strong className="text-white font-mono font-black text-xs block" dir="ltr">
                    {selectedOrder.order_phone || selectedOrder.phone_number || "—"}
                  </strong>
                </div>
              </div>

              {/* Product Images Thumbnails */}
              {Array.isArray(selectedOrder.product_images) &&
                selectedOrder.product_images.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] text-emerald-300 font-bold block mb-1.5">
                      صور المنتج المرفقة ({selectedOrder.product_images.length} صور):
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {selectedOrder.product_images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="preview"
                          onClick={() => setPreviewImage(img)}
                          className="w-14 h-14 rounded-xl object-cover border border-emerald-500/40 hover:scale-110 transition-transform cursor-pointer shadow-md"
                        />
                      ))}
                    </div>
                  </div>
                )}

              {/* Product Notes */}
              {selectedOrder.product_notes && (
                <div className="p-3 rounded-xl bg-[#070e24] border border-emerald-800/40 text-xs">
                  <span className="text-[10px] text-emerald-400 font-bold block mb-1">
                    ملاحظات ومتطلبات التجهيز:
                  </span>
                  <p className="text-slate-200">{selectedOrder.product_notes}</p>
                </div>
              )}
            </div>

            {/* Payment & Tracking Section */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0c1c49] to-[#071330] border border-blue-700/60 space-y-3">
              <h4 className="text-xs font-black text-cyan-300 flex items-center gap-1.5 border-b border-blue-800/60 pb-2">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>بوابة الدفع ورابط التتبع السري:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#070e24] border border-blue-800/40">
                  <span className="text-[10px] text-cyan-400 font-bold block mb-1">
                    بوابة الدفع المعتمدة:
                  </span>
                  <strong className="text-white font-black text-sm flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-cyan-400" />
                    <span>{selectedOrder.payment_method || "YouCan Pay 🇲🇦 (Sandbox)"}</span>
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-[#070e24] border border-blue-800/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-bold block mb-1">
                      رابط التتبع السري للتاجر:
                    </span>
                    <span className="text-xs font-mono text-slate-300 block truncate max-w-[180px]">
                      /order/{selectedOrder.id}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const origin = typeof window !== "undefined" ? window.location.origin : "";
                      navigator.clipboard.writeText(`${origin}/order/${selectedOrder.id}`);
                      setCopiedLink(true);
                      showToast("تم نسخ رابط التتبع السري بنجاح 📋");
                      setTimeout(() => setCopiedLink(false), 2500);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedLink ? "تم النسخ" : "نسخ الرابط"}</span>
                  </button>
                </div>
              </div>

              {/* Delivered URL input in modal */}
              <div className="pt-1">
                <label className="block text-[10px] text-blue-300 font-bold mb-1">
                  رابط المتجر المسلّم للعميل (Delivered URL):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    defaultValue={selectedOrder.delivered_url || ""}
                    placeholder="https://client-store.com"
                    id="modalDeliveredUrlInput"
                    className="flex-1 py-2 px-3 rounded-xl bg-[#070e24] border border-blue-700/60 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
                    dir="ltr"
                  />
                  <button
                    onClick={async () => {
                      const input = document.getElementById(
                        "modalDeliveredUrlInput"
                      ) as HTMLInputElement;
                      if (!input) return;
                      const val = input.value.trim();
                      await fetch("/api/orders", {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          "x-admin-token": "2026",
                          "x-desktop-auth-token": ADMIN_TOKEN,
                        },
                        body: JSON.stringify({
                          id: selectedOrder.id,
                          delivered_url: val,
                        }),
                      });
                      setSelectedOrder((prev) =>
                        prev ? { ...prev, delivered_url: val } : null
                      );
                      setOrders((prev) =>
                        prev.map((o) =>
                          o.id === selectedOrder.id ? { ...o, delivered_url: val } : o
                        )
                      );
                      showToast("تم حفظ رابط المتجر المسلّم بنجاح 💾");
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white font-black text-xs cursor-pointer shadow-md"
                  >
                    حفظ الرابط
                  </button>
                </div>
              </div>
            </div>

            {/* Status Change Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-blue-900/60">
              <span className="text-xs text-slate-400 font-bold">تغيير حالة الطلب:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuickStatusChange(selectedOrder.id, "pending")}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs cursor-pointer transition-all ${
                    selectedOrder.status === "pending"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "bg-[#0c1c49] text-amber-300 hover:bg-amber-950/60 border border-amber-500/40"
                  }`}
                >
                  قيد المراجعة 🟡
                </button>
                <button
                  onClick={() => handleQuickStatusChange(selectedOrder.id, "in_progress")}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs cursor-pointer transition-all ${
                    selectedOrder.status === "in_progress"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-[#0c1c49] text-blue-300 hover:bg-blue-950/60 border border-blue-500/40"
                  }`}
                >
                  جاري التجهيز 🔵
                </button>
                <button
                  onClick={() => handleQuickStatusChange(selectedOrder.id, "completed")}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs cursor-pointer transition-all ${
                    selectedOrder.status === "completed"
                      ? "bg-emerald-500 text-slate-950 shadow-md"
                      : "bg-[#0c1c49] text-emerald-300 hover:bg-emerald-950/60 border border-emerald-500/40"
                  }`}
                >
                  تم التسليم والربط 🟢
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: MERCHANT PROFILE MODAL                          */}
      {/* ======================================================== */}
      {selectedMerchant && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 text-slate-900 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 text-right">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg">
                  {selectedMerchant.name.charAt(0) || "ت"}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    الملف الشخصي للتاجر: {selectedMerchant.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-600" />
                    <span>{selectedMerchant.city}</span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMerchant(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Merchant Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">
                  الاسم الكامل:
                </span>
                <strong className="text-slate-900 font-black text-sm block">
                  {selectedMerchant.name}
                </strong>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">
                  المدينة بالمغرب:
                </span>
                <strong className="text-slate-900 font-black text-sm block">
                  {selectedMerchant.city}
                </strong>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">
                  رقم الواتساب / الهاتف:
                </span>
                <strong className="text-slate-900 font-mono font-black text-xs block" dir="ltr">
                  {selectedMerchant.phone || "—"}
                </strong>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">
                  البريد الإلكتروني:
                </span>
                <strong className="text-slate-900 font-mono text-xs block truncate" dir="ltr">
                  {selectedMerchant.email || "غير محدد"}
                </strong>
              </div>
            </div>

            {/* Merchant Orders Summary */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
              <span className="text-xs font-black text-blue-900 block">
                مشاريع وطلبات هذا التاجر:
              </span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {orders
                  .filter(
                    (o) =>
                      o.phone_number === selectedMerchant.phone ||
                      o.customer_name === selectedMerchant.name
                  )
                  .map((o) => (
                    <div
                      key={o.id}
                      onClick={() => {
                        setSelectedMerchant(null);
                        setSelectedOrder(o);
                      }}
                      className="p-2 rounded-xl bg-white border border-blue-100 flex items-center justify-between text-xs cursor-pointer hover:bg-blue-50"
                    >
                      <span className="font-mono font-bold text-blue-700">{o.order_number}</span>
                      <span className="font-bold text-slate-800">{o.store_name || o.plan_tier}</span>
                      <span className="font-mono font-black text-emerald-600">
                        {parsePrice(o).toLocaleString()} د.م
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* WhatsApp Chat Button */}
            {selectedMerchant.phone && (
              <a
                href={`https://wa.me/${
                  selectedMerchant.phone.replace(/[^0-9]/g, "").startsWith("212")
                    ? selectedMerchant.phone.replace(/[^0-9]/g, "")
                    : "212" + selectedMerchant.phone.replace(/[^0-9]/g, "").replace(/^0/, "")
                }?text=${encodeURIComponent(
                  "السلام عليكم أخي الكريم " +
                    selectedMerchant.name +
                    "، نتواصل معك من إدارة منصة Ecom Speed Pro."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>مراسلة التاجر عبر واتساب مباشرة</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: تسليم الطلب الآن ورابط المتجر النهائي           */}
      {/* ======================================================== */}
      {quickStoreOrderId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-right animate-in zoom-in-95 duration-200 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    تسليم الطلب الآن
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold">
                    إدخال رابط المتجر النهائي وتحديث حالة صفحة التتبع فوراً
                  </p>
                </div>
              </div>
              <button
                onClick={() => setQuickStoreOrderId(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active order summary */}
            {(() => {
              const activeOrder = orders.find((o) => o.id === quickStoreOrderId);
              if (!activeOrder) return null;
              return (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-slate-900 block">
                      التاجر: {activeOrder.customer_name} ({activeOrder.customer_city || "المغرب"})
                    </span>
                    <span className="text-[11px] text-blue-600 font-bold block mt-0.5">
                      المتجر: {activeOrder.store_name || "متجر التاجر"} • {activeOrder.plan_tier}
                    </span>
                  </div>
                  <span className="font-mono font-black text-blue-700 bg-blue-100 px-2.5 py-1 rounded-lg">
                    {activeOrder.order_number}
                  </span>
                </div>
              );
            })()}

            {/* Form Fields */}
            <div className="space-y-3 text-xs">
              {/* Field 1: رابط المتجر النهائي */}
              <div>
                <label className="block font-black text-slate-800 mb-1.5">
                  رابط المتجر النهائي (Store URL):
                </label>
                <input
                  type="url"
                  placeholder="مثال: https://mon-magasin-maroc.com"
                  value={quickStoreUrlInput}
                  onChange={(e) => setQuickStoreUrlInput(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-800 text-xs font-bold focus:outline-none focus:border-cyan-500 shadow-inner"
                  dir="ltr"
                />
                <p className="text-[10.5px] text-slate-400 mt-1 font-bold">
                  هذا الرابط سيظهر للعميل في صفحته الخاصة لمتابعة واستلام متجره.
                </p>
              </div>

              {/* Field 2: قائمة اختيار حالة التسليم */}
              <div>
                <label className="block font-black text-slate-800 mb-1.5">
                  قائمة اختيار حالة التسليم:
                </label>
                <select
                  value={quickStoreDeliveryStatus}
                  onChange={(e) => setQuickStoreDeliveryStatus(e.target.value as any)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-black text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-inner"
                >
                  <option value="completed">
                    🟢 مكتمل ومسلّم (المتجر جاهز وتم التسليم النهائي)
                  </option>
                  <option value="in_progress">
                    🔵 جاهز / جاري التجهيز (المتجر قيد المعاينة والتسليم)
                  </option>
                </select>
                <p className="text-[10.5px] text-slate-400 mt-1 font-bold">
                  تحديث الحالة ينعكس فورياً في صفحة التتبع لدى العميل.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuickStoreOrderId(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleSaveStoreUrl}
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black shadow-md cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
                >
                  {isUpdating ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>جاري التسليم...</span>
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" />
                      <span>تسليم الطلب الآن 🚀</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: NEW ORDER CREATION MODAL (+ طلب جديد)          */}
      {/* ======================================================== */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 text-right animate-in zoom-in-95 duration-200 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    إضافة طلب ومشروع جديد
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold">
                    تسجيل طلب مباشر للتاجر في النظام
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNewOrderModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewOrder} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">اسم التاجر *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: محمد العلوي"
                    value={newOrderForm.customer_name}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, customer_name: e.target.value })
                    }
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">المدينة بالمغرب</label>
                  <input
                    type="text"
                    value={newOrderForm.customer_city}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, customer_city: e.target.value })
                    }
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">هاتف التاجر *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0612345678"
                    value={newOrderForm.phone_number}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, phone_number: e.target.value })
                    }
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-800 focus:outline-none focus:border-blue-500"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    placeholder="merchant@gmail.com"
                    value={newOrderForm.customer_email}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, customer_email: e.target.value })
                    }
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-800 focus:outline-none focus:border-blue-500"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">اسم المتجر *</label>
                  <input
                    type="text"
                    placeholder="مثال: متجر القفطان الملكي"
                    value={newOrderForm.store_name}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, store_name: e.target.value })
                    }
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">سعر بيع المنتج</label>
                  <input
                    type="text"
                    placeholder="مثال: 299 د.م"
                    value={newOrderForm.product_price}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, product_price: e.target.value })
                    }
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-emerald-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الباقة المختارة</label>
                  <select
                    value={newOrderForm.plan_tier}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, plan_tier: e.target.value })
                    }
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="المتجر القياسي (1,500 MAD)">
                      المتجر القياسي (1,500 MAD)
                    </option>
                    <option value="صفحة هبوط احترافية (500 MAD)">
                      صفحة هبوط احترافية (500 MAD)
                    </option>
                    <option value="النظام المتكامل VIP (5,000 MAD)">
                      النظام السحابي المتكامل VIP (5,000 MAD)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">بوابة الدفع</label>
                  <select
                    value={newOrderForm.payment_method}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, payment_method: e.target.value })
                    }
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="YouCan Pay 🇲🇦 (Sandbox)">YouCan Pay 🇲🇦 (Sandbox)</option>
                    <option value="الأداء بالبطاقة البنكية">الأداء بالبطاقة البنكية (CMI)</option>
                    <option value="الدفع عند الاستلام (COD)">الدفع عند الاستلام (COD)</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white font-black shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>حفظ وإنشاء الطلب الآن</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: IMAGE PREVIEW MODAL                             */}
      {/* ======================================================== */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-2xl max-h-[85vh] p-2 bg-white rounded-3xl shadow-2xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="full view"
              className="w-full h-auto max-h-[80vh] rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
