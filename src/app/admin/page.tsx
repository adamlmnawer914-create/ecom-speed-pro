"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShoppingBag,
  User,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle2,
  Clock,
  Save,
  Search,
  Filter,
  RefreshCw,
  Eye,
  X,
  Copy,
  Layers,
  ArrowRight,
  TrendingUp,
  Package,
  Check,
  Sparkles,
  Lock,
  Globe,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import Logo from "@/components/Logo";

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deliveredUrlInput, setDeliveredUrlInput] = useState("");
  const [isSavingUrl, setIsSavingUrl] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

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
        // If an order is currently selected, refresh its details
        if (selectedOrder) {
          const fresh = data.orders.find((o: Order) => o.id === selectedOrder.id);
          if (fresh) {
            setSelectedOrder(fresh);
            setDeliveredUrlInput(fresh.delivered_url || "");
          }
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
    const interval = setInterval(fetchOrders, 10000); // 10s auto refresh
    return () => clearInterval(interval);
  }, []);

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setDeliveredUrlInput(order.delivered_url || "");
    setCopiedLink(false);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
  };

  const handleUpdateStatus = async (orderId: string, newStatus: "pending" | "in_progress" | "completed") => {
    try {
      setIsUpdatingStatus(true);
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": "2026",
          "x-desktop-auth-token": ADMIN_TOKEN,
        },
        body: JSON.stringify({
          id: orderId,
          status: newStatus,
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        showToast(newStatus === "completed" ? "تم تغيير حالة الطلب إلى 'مكتمل' بنجاح 🟢" : "تم تحديث حالة الطلب بنجاح");
        // Update local state
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
        setSelectedOrder(data.order);
      } else {
        showToast(data.message || "فشل في تحديث حالة الطلب");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      showToast("حدث خطأ أثناء تحديث حالة الطلب");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveDeliveredUrl = async (orderId: string) => {
    try {
      setIsSavingUrl(true);
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": "2026",
          "x-desktop-auth-token": ADMIN_TOKEN,
        },
        body: JSON.stringify({
          id: orderId,
          delivered_url: deliveredUrlInput.trim(),
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        showToast("تم حفظ وتحديث رابط المتجر النهائي بنجاح 💾");
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
        setSelectedOrder(data.order);
      } else {
        showToast(data.message || "فشل حفظ رابط المتجر");
      }
    } catch (err) {
      console.error("Error saving delivered url:", err);
      showToast("حدث خطأ أثناء حفظ رابط المتجر");
    } finally {
      setIsSavingUrl(false);
    }
  };

  const handleCopyTrackingLink = (orderId: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const trackingUrl = `${origin}/order/${orderId}`;
    navigator.clipboard.writeText(trackingUrl);
    setCopiedLink(true);
    showToast("تم نسخ رابط التتبع السري للتاجر إلى الحافظة 📋");
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const parseOrderPrice = (o: Order) => {
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
  const filteredOrders = orders.filter((o) => {
    const name = (o.customer_name || "").toLowerCase();
    const phone = (o.phone_number || "").toLowerCase();
    const store = (o.store_name || "").toLowerCase();
    const num = (o.order_number || "").toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch = !query || name.includes(query) || phone.includes(query) || store.includes(query) || num.includes(query);
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalOrdersCount = orders.length;
  const completedOrdersCount = orders.filter((o) => o.status === "completed").length;
  const inProgressOrdersCount = orders.filter((o) => o.status === "in_progress").length;
  const pendingOrdersCount = orders.filter((o) => o.status === "pending" || !o.status).length;
  const totalRevenue = orders.reduce((sum, o) => sum + parseOrderPrice(o), 0);

  return (
    <div className="min-h-screen bg-[#070e24] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 text-cyan-200 px-5 py-3 rounded-2xl shadow-[0_10px_35px_rgba(6,182,212,0.3)] flex items-center gap-2.5 text-xs font-black animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0a1538]/90 backdrop-blur-xl border-b border-blue-900/40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer" title="العودة للرئيسية">
            <Logo size="sm" />
          </Link>
          <div className="hidden sm:block h-6 w-px bg-blue-800/60" />
          <div>
            <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>لوحة التحكم الإدارية الفاخرة</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                Admin Panel v2.6
              </span>
            </h1>
            <p className="text-[11px] text-blue-300 font-bold hidden md:block">
              إدارة طلبات المتاجر، بيانات التجار، وتحديثات التسليم الفورية
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={fetchOrders}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-blue-950/80 hover:bg-blue-900/90 border border-blue-700/50 text-blue-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="تحديث البيانات الآن"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
            <span className="hidden sm:inline">تحديث فوري</span>
          </button>

          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>عرض المتجر</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* KPI Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Card 1: Total Orders */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0c1c49] to-[#0a1538] border border-blue-800/50 shadow-lg">
            <div className="flex items-center justify-between text-blue-400 mb-2">
              <span className="text-xs font-bold">إجمالي الطلبات</span>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">
              {totalOrdersCount}
            </div>
            <span className="text-[10px] text-cyan-400 font-bold block mt-1">مسجلة في النظام</span>
          </div>

          {/* Card 2: Completed Orders */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#063327] to-[#0a1538] border border-emerald-700/50 shadow-lg">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-bold">المكتملة والمسلّمة</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-300">
              {completedOrdersCount}
            </div>
            <span className="text-[10px] text-emerald-400 font-bold block mt-1">متاجر جاهزة 🟢</span>
          </div>

          {/* Card 3: In Progress */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0d2757] to-[#0a1538] border border-blue-600/50 shadow-lg">
            <div className="flex items-center justify-between text-blue-400 mb-2">
              <span className="text-xs font-bold">قيد البرمجة والتجهيز</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-blue-200">
              {inProgressOrdersCount}
            </div>
            <span className="text-[10px] text-blue-400 font-bold block mt-1">جاري العمل عليها 🔵</span>
          </div>

          {/* Card 4: Pending / Review */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#3b2707] to-[#0a1538] border border-amber-600/50 shadow-lg">
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-xs font-bold">قيد المراجعة</span>
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300">
              {pendingOrdersCount}
            </div>
            <span className="text-[10px] text-amber-400 font-bold block mt-1">طلبات جديدة 🟡</span>
          </div>

          {/* Card 5: Total Revenue */}
          <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-gradient-to-br from-[#1b124a] to-[#0a1538] border border-purple-700/50 shadow-lg">
            <div className="flex items-center justify-between text-purple-400 mb-2">
              <span className="text-xs font-bold">إجمالي المبيعات</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-purple-200">
              {totalRevenue.toLocaleString()}{" "}
              <span className="text-xs font-sans text-purple-400">د.م</span>
            </div>
            <span className="text-[10px] text-purple-400 font-bold block mt-1">درهم مغربي 🇲🇦</span>
          </div>
        </div>

        {/* Filters and Search Bar Bar */}
        <div className="p-4 rounded-3xl bg-[#0b1739]/80 backdrop-blur-md border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-blue-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث باسم التاجر، اسم المتجر، الهاتف، أو رقم الطلب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#070e24] border border-blue-800/60 focus:border-cyan-400 rounded-2xl pr-10 pl-4 py-2.5 text-xs text-white placeholder:text-blue-400/60 outline-none font-bold transition-all"
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs font-black">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === "all"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "bg-blue-950/60 text-blue-300 hover:bg-blue-900/60 border border-blue-800/40"
              }`}
            >
              الكل ({orders.length})
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === "pending"
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-blue-950/60 text-amber-300 hover:bg-blue-900/60 border border-blue-800/40"
              }`}
            >
              قيد المراجعة ({pendingOrdersCount})
            </button>
            <button
              onClick={() => setStatusFilter("in_progress")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === "in_progress"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-blue-950/60 text-blue-300 hover:bg-blue-900/60 border border-blue-800/40"
              }`}
            >
              جاري التجهيز ({inProgressOrdersCount})
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === "completed"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-blue-950/60 text-emerald-300 hover:bg-blue-900/60 border border-blue-800/40"
              }`}
            >
              مكتمل ومسلّم ({completedOrdersCount})
            </button>
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="rounded-3xl bg-[#0b1739]/80 backdrop-blur-md border border-blue-900/50 shadow-xl overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-blue-900/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm sm:text-base font-black text-white">
                سجل طلبات المتاجر وصفحات الهبوط ({filteredOrders.length} طلب)
              </h2>
            </div>
            <span className="text-xs text-blue-300/80 font-bold hidden sm:block">
              انقر على أي صف في الجدول لفتح تفاصيل الطلب بالقسمين وتغيير حالته
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-[#070e24]/90 border-b border-blue-900/50 text-blue-300 font-black">
                  <th className="p-3.5 whitespace-nowrap">رقم وتاريخ الطلب</th>
                  <th className="p-3.5 whitespace-nowrap">التاجر والمدينة</th>
                  <th className="p-3.5 whitespace-nowrap">اسم المتجر والمنتج</th>
                  <th className="p-3.5 whitespace-nowrap">باقة المتجر</th>
                  <th className="p-3.5 whitespace-nowrap">السعر</th>
                  <th className="p-3.5 whitespace-nowrap">هاتف المبيعات</th>
                  <th className="p-3.5 whitespace-nowrap">الحالة</th>
                  <th className="p-3.5 whitespace-nowrap">رابط المتجر المسلّم</th>
                  <th className="p-3.5 text-center whitespace-nowrap">إجراء فوري</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/30">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-blue-400/60 font-bold">
                      لا توجد طلبات مطابقة للبحث حالياً
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => {
                    const price = parseOrderPrice(o);
                    const isCompleted = o.status === "completed";
                    const isInProgress = o.status === "in_progress";
                    const isPending = o.status === "pending" || !o.status;
                    const dateStr = o.created_at
                      ? new Date(o.created_at).toLocaleDateString("ar-MA", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "اليوم";

                    return (
                      <tr
                        key={o.id}
                        onClick={() => openOrderModal(o)}
                        className="hover:bg-blue-600/10 transition-colors cursor-pointer group"
                        title="انقر لعرض تفاصيل الطلب"
                      >
                        {/* 1. Order Number & Date */}
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="font-mono font-black text-cyan-300 block">
                            {o.order_number || `#ESP-${o.id.slice(0, 6)}`}
                          </span>
                          <span className="text-[10px] text-blue-400/80 font-bold">{dateStr}</span>
                        </td>

                        {/* 2. Merchant & City */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-200 font-black text-xs flex items-center justify-center shrink-0">
                              {(o.customer_name || "ت").charAt(0)}
                            </div>
                            <div>
                              <strong className="text-white block font-black">{o.customer_name}</strong>
                              <span className="text-[10.5px] text-cyan-400 font-bold flex items-center gap-0.5">
                                <MapPin className="w-2.5 h-2.5" />
                                <span>{o.customer_city || "الدار البيضاء"}</span>
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 3. Store Name */}
                        <td className="p-3.5">
                          <strong className="text-white block font-black group-hover:text-cyan-300 transition-colors">
                            {o.store_name || "متجر قيد التسمية"}
                          </strong>
                          {o.product_price && (
                            <span className="text-[10px] text-emerald-400 font-mono font-bold block mt-0.5">
                              ثمن البيع: {o.product_price}
                            </span>
                          )}
                        </td>

                        {/* 4. Plan */}
                        <td className="p-3.5 text-blue-200 font-bold whitespace-nowrap">
                          {o.plan_tier}
                        </td>

                        {/* 5. Price */}
                        <td className="p-3.5 font-mono font-black text-emerald-400 whitespace-nowrap">
                          {price.toLocaleString()} د.م
                        </td>

                        {/* 6. Order Phone */}
                        <td className="p-3.5 font-mono text-blue-200 whitespace-nowrap" dir="ltr">
                          {o.order_phone || o.phone_number || "—"}
                        </td>

                        {/* 7. Status */}
                        <td className="p-3.5 whitespace-nowrap">
                          {isCompleted ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black text-[10.5px] inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>مكتمل ومسلّم 🟢</span>
                            </span>
                          ) : isInProgress ? (
                            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-black text-[10.5px] inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                              <span>جاري التجهيز 🔵</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black text-[10.5px] inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                              <span>قيد المراجعة 🟡</span>
                            </span>
                          )}
                        </td>

                        {/* 8. Delivered Store URL */}
                        <td className="p-3.5 whitespace-nowrap">
                          {o.delivered_url ? (
                            <a
                              href={o.delivered_url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] inline-flex items-center gap-1 hover:bg-cyan-900 transition-colors"
                            >
                              <Globe className="w-3 h-3 text-cyan-400" />
                              <span className="truncate max-w-[120px]">{o.delivered_url.replace(/^https?:\/\//, '')}</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-blue-400/50 font-bold">لم يسلم بعد</span>
                          )}
                        </td>

                        {/* 9. Distinct Action Button */}
                        <td className="p-3.5 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => openOrderModal(o)}
                            className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/60 border border-blue-500/40 text-cyan-300 font-black text-[11px] inline-flex items-center gap-1 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>عرض التفاصيل</span>
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
      </main>

      {/* ======================================================== */}
      {/* 🚀 THE EXACT ORDER DETAILS MODAL REQUESTED BY THE USER    */}
      {/* ======================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl bg-[#0a1538] border-2 border-blue-500/50 rounded-3xl shadow-[0_25px_80px_rgba(2,8,28,0.8)] p-5 sm:p-7 overflow-y-auto max-h-[92vh] space-y-5 text-right text-slate-100"
            dir="rtl"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-blue-900/60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shrink-0">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {selectedOrder.store_name || "متجر قيد التسمية"}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-black text-xs">
                      {selectedOrder.order_number || `#ESP-${selectedOrder.id.slice(0, 6)}`}
                    </span>
                    {selectedOrder.status === "completed" ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>مكتمل ومسلّم 🟢</span>
                      </span>
                    ) : selectedOrder.status === "in_progress" ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-black text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        <span>جاري التجهيز 🔵</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span>قيد المراجعة 🟡</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-blue-300 font-bold">
                    <span>{selectedOrder.plan_tier}</span>
                    <span>•</span>
                    <span className="font-mono text-emerald-400 font-black">
                      {parseOrderPrice(selectedOrder).toLocaleString()} د.م
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={closeOrderModal}
                className="w-9 h-9 rounded-full bg-blue-950 hover:bg-blue-900 border border-blue-700/60 text-blue-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ======================================================== */}
            {/* 👤 القسم 1: قسم معلومات وبيانات التاجر                    */}
            {/* ======================================================== */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0c1c49]/90 to-[#0a1538]/90 border border-blue-700/60 shadow-md space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-blue-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-black text-white">
                    القسم الأول: معلومات وبيانات التاجر (Merchant Info)
                  </h4>
                </div>
                <span className="text-[11px] text-cyan-300 font-bold">
                  الاسم، البريد، الواتساب، والمدينة
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* 1. Merchant Full Name */}
                <div className="p-3 rounded-xl bg-[#070e24] border border-blue-800/40">
                  <span className="text-[10px] text-blue-400 font-bold block mb-1">الاسم الكامل للتاجر:</span>
                  <strong className="text-white font-black text-sm block">{selectedOrder.customer_name}</strong>
                  <span className="text-[10px] text-cyan-400 font-bold block mt-0.5">صاحب المتجر</span>
                </div>

                {/* 2. Email */}
                <div className="p-3 rounded-xl bg-[#070e24] border border-blue-800/40">
                  <span className="text-[10px] text-blue-400 font-bold block mb-1">البريد الإلكتروني:</span>
                  <strong className="text-white font-mono font-bold text-xs block truncate" dir="ltr">
                    {selectedOrder.customer_email || "غير محدد"}
                  </strong>
                  <span className="text-[10px] text-purple-400 font-bold block mt-0.5">لإرسال التقارير والفاتورة</span>
                </div>

                {/* 3. WhatsApp / Phone */}
                <div className="p-3 rounded-xl bg-[#070e24] border border-blue-800/40 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-blue-400 font-bold block mb-1">الواتساب / هاتف التاجر:</span>
                    <strong className="text-white font-mono font-black text-xs block" dir="ltr">
                      {selectedOrder.phone_number || "—"}
                    </strong>
                  </div>
                  {selectedOrder.phone_number && (
                    <a
                      href={`https://wa.me/${selectedOrder.phone_number.replace(/[^0-9]/g, "").startsWith("212") ? selectedOrder.phone_number.replace(/[^0-9]/g, "") : "212" + selectedOrder.phone_number.replace(/[^0-9]/g, "").replace(/^0/, "")}?text=${encodeURIComponent("السلام عليكم أخي " + selectedOrder.customer_name + "، نتواصل معك من إدارة Ecom Speed Pro بخصوص طلبك.")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center gap-1 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>مراسلة واتساب</span>
                    </a>
                  )}
                </div>

                {/* 4. City */}
                <div className="p-3 rounded-xl bg-[#070e24] border border-blue-800/40">
                  <span className="text-[10px] text-blue-400 font-bold block mb-1">المدينة بالمغرب:</span>
                  <strong className="text-white font-black text-sm block flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{selectedOrder.customer_city || "الدار البيضاء"}</span>
                  </strong>
                  <span className="text-[10px] text-blue-400 font-bold block mt-0.5">المملكة المغربية 🇲🇦</span>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 🛍️ القسم 2: قسم معلومات ومواصفات المنتج                    */}
            {/* ======================================================== */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#062c22]/90 to-[#0a1538]/90 border border-emerald-600/60 shadow-md space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-black text-white">
                    القسم الثاني: معلومات ومواصفات المنتج (Product & Store Info)
                  </h4>
                </div>
                <span className="text-[11px] text-emerald-300 font-bold">
                  الصور، ثمن البيع، ورقم هاتف المبيعات
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* 1. Store Name */}
                <div className="p-3 rounded-xl bg-[#070e24] border border-emerald-800/40">
                  <span className="text-[10px] text-emerald-400 font-bold block mb-1">اسم المتجر أو المنتج:</span>
                  <strong className="text-white font-black text-sm block truncate">
                    {selectedOrder.store_name || "متجر قيد التسمية"}
                  </strong>
                  <span className="text-[10px] text-cyan-400 font-bold block mt-0.5">{selectedOrder.plan_tier}</span>
                </div>

                {/* 2. Product Selling Price */}
                <div className="p-3 rounded-xl bg-[#070e24] border border-emerald-600/40">
                  <span className="text-[10px] text-emerald-400 font-bold block mb-1">ثمن بيع المنتج للزبائن:</span>
                  <strong className="text-emerald-300 font-mono font-black text-base block">
                    {selectedOrder.product_price || "غير محدد"}
                  </strong>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                    سعر البيع المقترح في المتجر
                  </span>
                </div>

                {/* 3. Order Phone with WhatsApp Test */}
                <div className="p-3 rounded-xl bg-[#070e24] border border-emerald-800/40 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold block mb-1">
                      رقم هاتف استقبال المبيعات والطلبيات:
                    </span>
                    <strong className="text-white font-mono font-black text-xs block" dir="ltr">
                      {selectedOrder.order_phone || selectedOrder.phone_number || "—"}
                    </strong>
                  </div>
                  {(selectedOrder.order_phone || selectedOrder.phone_number) && (
                    <a
                      href={`https://wa.me/${(selectedOrder.order_phone || selectedOrder.phone_number || "").replace(/[^0-9]/g, "").startsWith("212") ? (selectedOrder.order_phone || selectedOrder.phone_number || "").replace(/[^0-9]/g, "") : "212" + (selectedOrder.order_phone || selectedOrder.phone_number || "").replace(/[^0-9]/g, "").replace(/^0/, "")}?text=${encodeURIComponent("السلام عليكم، هذا اختبار رقم استقبال طلبات ومبيعات متجر " + (selectedOrder.store_name || "") + ".")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[10px] flex items-center justify-center gap-1 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>اختبار رقم الطلبيات</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Product Images Gallery */}
              <div className="p-3.5 rounded-xl bg-[#070e24] border border-emerald-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>صور المنتج المرفقة</span>
                    <span className="text-emerald-400">
                      ({(selectedOrder.product_images || []).length} صورة):
                    </span>
                  </span>
                  <span className="text-[10px] text-blue-300 font-bold">انقر على أي صورة لتكبيرها</span>
                </div>

                {(!selectedOrder.product_images || selectedOrder.product_images.length === 0) ? (
                  <div className="py-4 text-center bg-blue-950/30 rounded-xl border border-dashed border-blue-800/40">
                    <p className="text-xs text-blue-400/70 font-bold">لم يقم التاجر برفع صور للمنتج بعد</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {selectedOrder.product_images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setPreviewImage(img)}
                        className="relative group rounded-xl overflow-hidden border border-emerald-500/40 aspect-square bg-slate-900 cursor-pointer hover:border-cyan-400 transition-all shadow-sm"
                      >
                        <img
                          src={img}
                          alt={`صورة ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <Eye className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Merchant Notes */}
              {selectedOrder.product_notes && (
                <div className="p-3 rounded-xl bg-[#070e24] border border-emerald-800/40">
                  <span className="text-[10px] text-emerald-400 font-bold block mb-1">
                    ملاحظات التاجر وتفاصيل إضافية:
                  </span>
                  <p className="text-xs text-white leading-relaxed font-bold">
                    {selectedOrder.product_notes}
                  </p>
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* 🚀 تسليم المتجر وتحديث الحالة فورياً (Delivered URL + Completed) */}
            {/* ======================================================== */}
            <div className="space-y-3.5">
              
              {/* 1. DELIVERED STORE FINAL URL INPUT FIELD */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0b1739] to-[#070e24] border-2 border-cyan-500/50 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-white flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>خانة رابط المتجر النهائي (Final Store Website URL):</span>
                  </label>
                  <span className="text-[10px] text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded-md border border-cyan-500/30">
                    يظهر مباشرة في صفحة تتبع التاجر
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <input
                    type="url"
                    placeholder="مثال: https://mon-magasin-maroc.com أو رابط YouCan"
                    value={deliveredUrlInput}
                    onChange={(e) => setDeliveredUrlInput(e.target.value)}
                    className="flex-1 min-w-[220px] py-2.5 px-3.5 rounded-xl bg-[#070e24] border border-blue-700/60 focus:border-cyan-400 text-cyan-200 font-mono text-xs font-bold outline-none"
                    dir="ltr"
                  />

                  <button
                    onClick={() => handleSaveDeliveredUrl(selectedOrder.id)}
                    disabled={isSavingUrl}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSavingUrl ? "جاري الحفظ..." : "حفظ الرابط"}</span>
                  </button>

                  {selectedOrder.delivered_url && (
                    <a
                      href={selectedOrder.delivered_url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>زيارة المتجر</span>
                    </a>
                  )}
                </div>
              </div>

              {/* 2. PROMINENT ACTION BUTTON: CHANGE STATUS TO COMPLETED */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-emerald-950/60 border-2 border-emerald-500/70 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl ${
                      selectedOrder.status === "completed"
                        ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                        : "bg-emerald-500/20 text-emerald-400"
                    } flex items-center justify-center font-bold shrink-0`}
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-black text-white">
                      {selectedOrder.status === "completed"
                        ? "حالة الطلب: مكتمل ومسلّم للتاجر بنجاح 🟢"
                        : "زر تغيير حالة الطلب إلى 'مكتمل' (Completed)"}
                    </h5>
                    <p className="text-[11px] text-emerald-300/80 font-bold">
                      ينعكس هذا الإجراء فورياً على صفحة التتبع السرية للتاجر ويتيح له استلام متجره مباشرة
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, "completed")}
                  disabled={isUpdatingStatus}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer ${
                    selectedOrder.status === "completed"
                      ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400"
                      : "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isUpdatingStatus
                      ? "جاري التحديث..."
                      : selectedOrder.status === "completed"
                      ? "✅ الحالة مكتملة حالياً (تأكيد)"
                      : "تغيير الحالة إلى 'مكتمل' 🟢 (تحديث فوري)"}
                  </span>
                </button>
              </div>

              {/* 3. MULTI-STATUS BUTTONS FOR FLEXIBILITY */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, "pending")}
                  className={`p-2.5 rounded-xl border font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedOrder.status === "pending"
                      ? "bg-amber-500/30 border-amber-500 text-amber-300"
                      : "bg-[#070e24] border-blue-900/60 text-slate-400 hover:border-amber-500/50"
                  }`}
                >
                  <span>قيد المراجعة 🟡</span>
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, "in_progress")}
                  className={`p-2.5 rounded-xl border font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedOrder.status === "in_progress"
                      ? "bg-blue-500/30 border-blue-500 text-cyan-300"
                      : "bg-[#070e24] border-blue-900/60 text-slate-400 hover:border-blue-500/50"
                  }`}
                >
                  <span>جاري التجهيز 🔵</span>
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, "completed")}
                  className={`p-2.5 rounded-xl border font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedOrder.status === "completed"
                      ? "bg-emerald-500/30 border-emerald-500 text-emerald-300"
                      : "bg-[#070e24] border-blue-900/60 text-slate-400 hover:border-emerald-500/50"
                  }`}
                >
                  <span>مكتمل ومسلّم 🟢</span>
                </button>
              </div>

              {/* 4. MERCHANT SECRET TRACKING LINK CAPSULE (UUID) */}
              <div className="rounded-2xl bg-gradient-to-br from-[#071947] via-[#0b286d] to-[#041238] p-3.5 sm:p-4 border border-cyan-400/40 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-black text-cyan-200">
                      رابط تتبع الطلب السري الخاص بالتاجر (UUID):
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-mono text-[10px] font-bold">
                    محمي 🔒
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/order/${selectedOrder.id}`}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-black/40 border border-white/20 text-xs font-mono text-cyan-300 font-bold select-all outline-none"
                    dir="ltr"
                  />
                  <button
                    onClick={() => handleCopyTrackingLink(selectedOrder.id)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "تم النسخ" : "نسخ"}</span>
                  </button>
                  <Link
                    href={`/order/${selectedOrder.id}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>فتح بالمتصفح</span>
                  </Link>
                </div>
              </div>

            </div>

            {/* Bottom Modal Actions */}
            <div className="pt-3 border-t border-blue-900/60 flex items-center justify-end">
              <button
                onClick={closeOrderModal}
                className="px-6 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 border border-blue-700/60 text-white font-black text-xs transition-colors cursor-pointer"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Lightbox */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-2xl max-h-[90vh]">
            <img src={previewImage} alt="تكبير صورة المنتج" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
