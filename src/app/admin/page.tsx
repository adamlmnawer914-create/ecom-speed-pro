"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
  Trash,
  Undo2,
  CheckSquare,
  XCircle,
  Plus,
  Store,
  Monitor,
  ShieldCheck,
  Edit3,
  TrendingUp,
  Rocket,
  Tag,
  Phone,
  ImageIcon,
  Eye,
  Mail,
  Shield,
  Volume2,
  Bell,
  AlertTriangle,
  Flame,
  Zap,
  Crown,
  Filter,
  DollarSign,
} from "lucide-react";
import PayPalIcon from "@/components/PayPalIcon";

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
  status: "pending" | "pending_payment" | "in_progress" | "completed" | string;
  delivered_url: string | null;
  payment_method?: string;
  payment_status?: "paid" | "unpaid" | "pending" | string;
  white_label?: boolean;
  product_notes?: string;
  product_images?: string[];
  created_at: string;
}

const ADMIN_TOKEN = "ESP_SECURE_DESKTOP_TOKEN_2026_9f8d1c7a4b";

// ─── The 4 Official Packages Configuration ────────────────────────────────
export const OFFICIAL_PACKAGES = [
  {
    id: "landing-local",
    name: "صفحة هبوط محلية",
    market: "المغرب 🇲🇦",
    price: 1500,
    priceFormatted: "1,500 DH",
    tierValue: "صفحة هبوط — السوق المحلي 🇲🇦 (1,500 MAD)",
    paypalUrl: "https://www.paypal.com/ncp/payment/79PH2FAVN728E",
    emoji: "🇲🇦",
    gradient: "from-rose-500 via-pink-600 to-purple-600",
    badge: "الأكثر طلباً محلياً 🔥",
    desc: "صفحة هبوط سريعة ذات معدل تحويل مرتفع مع ربط أوتوماتيكي لبوابات الدفع والدومين",
  },
  {
    id: "store-local",
    name: "متجر محلي متكامل",
    market: "المغرب 🇲🇦",
    price: 3000,
    priceFormatted: "3,000 DH",
    tierValue: "متجر متكامل + لوحة تحكم — السوق المحلي 🇲🇦 (3,000 MAD)",
    paypalUrl: "https://www.paypal.com/ncp/payment/7XSF6ZSN9BSYG",
    emoji: "🇲🇦",
    gradient: "from-cyan-500 via-blue-600 to-indigo-600",
    badge: "متجر متعدد المنتجات ⚡",
    desc: "متجر مغربي متكامل بلوحة تحكم متقدمة، بوابات دفع محلية وتتبع الطلبيات",
  },
  {
    id: "landing-intl",
    name: "صفحة هبوط دولية",
    market: "دولي 🌐 (US/EU/GCC)",
    price: 4500,
    priceFormatted: "4,500 DH",
    tierValue: "صفحة هبوط — السوق الدولي 🌐 (4,500 MAD)",
    paypalUrl: "https://www.paypal.com/ncp/payment/J9ZQCGQ7J2PJN",
    emoji: "🌐",
    gradient: "from-emerald-500 via-teal-600 to-cyan-600",
    badge: "معدل تحويل دولي 🚀",
    desc: "صفحة هبوط فائقة السرعة مهيأة للأسواق الأمريكية والأوروبية مع Stripe & PayPal",
  },
  {
    id: "store-intl",
    name: "متجر دولي VIP",
    market: "عالمي 👑 (US/EU/GCC)",
    price: 9000,
    priceFormatted: "9,000 DH",
    tierValue: "متجر متكامل + لوحة تحكم — السوق الدولي 🌐 (9,000 MAD)",
    paypalUrl: "https://www.paypal.com/ncp/payment/PNG5TW29Q96P6",
    emoji: "👑",
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    badge: "VIP سحابي عالمي 💎",
    desc: "أقوى بنية برمجية تجارية دولية متعددة العملات واللغات مع بوابات دفع عالمية",
  },
];

// Identify package safely
export const identifyPackage = (o: Order) => {
  const t = (o.plan_tier || "").toLowerCase();
  if (t.includes("9,000") || t.includes("9000") || (t.includes("دولي") && t.includes("متجر")) || t.includes("vip")) {
    return OFFICIAL_PACKAGES[3];
  }
  if (t.includes("4,500") || t.includes("4500") || (t.includes("دولي") && t.includes("هبوط"))) {
    return OFFICIAL_PACKAGES[2];
  }
  if (t.includes("3,000") || t.includes("3000") || (t.includes("محلي") && t.includes("متجر")) || t.includes("متكامل")) {
    return OFFICIAL_PACKAGES[1];
  }
  return OFFICIAL_PACKAGES[0];
};

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [packageFilter, setPackageFilter] = useState<string>("all");
  const [whiteLabelFilter, setWhiteLabelFilter] = useState<string>("all");

  const [currentTab, setCurrentTab] = useState<
    "orders" | "home" | "customers" | "products" | "payments" | "reports" | "settings" | "trash"
  >("orders");

  // Trash state
  const [deletedOrders, setDeletedOrders] = useState<(Order & { deleted_at: string })[]>([]);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [trashSelected, setTrashSelected] = useState<Set<string>>(new Set());

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

  // New order form (Supports the 4 official packages only & White-label)
  const [newOrderForm, setNewOrderForm] = useState({
    customer_name: "",
    customer_city: "الدار البيضاء (Casablanca)",
    phone_number: "",
    customer_email: "",
    store_name: "",
    product_price: "",
    order_phone: "",
    plan_tier: OFFICIAL_PACKAGES[0].tierValue,
    payment_method: "PayPal",
    payment_status: "pending",
    white_label: false,
    product_notes: "",
  });

  // Real-time & Notifications
  const lastOrderIdRef = useRef<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>("default");
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [lastPingTime, setLastPingTime] = useState<string | null>(null);

  // UI state
  const [zoomLevel, setZoomLevel] = useState<number>(0.80);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showLiveBanner, setShowLiveBanner] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Play alert beep (harmonic luxury chime)
  const playAlertBeep = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // Note 1: E5
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Note 2: G#5
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(830.61, now + 0.12);
      gain2.gain.setValueAtTime(0.4, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.5);

      // Note 3: B5
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(987.77, now + 0.24);
      gain3.gain.setValueAtTime(0.5, now + 0.24);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(now + 0.24);
      osc3.stop(now + 0.7);
    } catch (e) {
      console.warn("Audio chime error:", e);
    }
  }, []);

  // Send browser push notification
  const sendPushNotification = useCallback((title: string, body: string) => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission === "granted") {
      try {
        new Notification(title, {
          body,
          icon: "/images/ecom_brand_logo_transparent.webp",
          badge: "/images/ecom_brand_logo_transparent.webp",
          tag: "ecom-order-" + Date.now(),
          requireInteraction: true,
        });
      } catch (e) {}
    }
  }, []);

  // Request notification permission
  const requestNotifPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      showToast("متصفحك لا يدعم إشعارات سطح المكتب");
      return;
    }
    const perm = await Notification.requestPermission();
    setNotifPermission(perm);
    if (perm === "granted") {
      playAlertBeep();
      sendPushNotification("✅ تم تفعيل الإشعارات بنجاح", "ستتلقى تنبيهاً فورياً لكل عملية شراء أو طلب جديد!");
      showToast("✅ تم تفعيل إشعارات المتصفح بنجاح!");
    } else {
      showToast("⚠️ لم يتم منح إذن الإشعارات — سيتم التنبيه الصوتي فقط");
    }
  }, [playAlertBeep, sendPushNotification]);

  // Trigger new order alert
  const triggerNewOrderAlert = useCallback(
    (order: Order) => {
      playAlertBeep();
      const pkg = identifyPackage(order);
      sendPushNotification(
        `🔔 طلب جديد وارد: ${order.order_number}`,
        `${order.customer_name} (${order.customer_city || "المغرب"}) — ${pkg.name} (${pkg.priceFormatted})`
      );
      showToast(`🔔 طلب جديد وصل الآن: ${order.order_number} — ${order.customer_name} (${pkg.priceFormatted})`);
    },
    [playAlertBeep, sendPushNotification]
  );

  // Load/Save deleted IDs from localStorage
  const loadDeletedData = useCallback(() => {
    try {
      const storedIds = localStorage.getItem("esp_admin_deleted_ids");
      if (storedIds) {
        setDeletedIds(new Set(JSON.parse(storedIds)));
      }
      const storedOrders = localStorage.getItem("esp_admin_deleted_orders");
      if (storedOrders) {
        setDeletedOrders(JSON.parse(storedOrders) || []);
      }
    } catch (e) {}
  }, []);

  const saveDeletedData = useCallback((ids: Set<string>, orders: (Order & { deleted_at: string })[]) => {
    try {
      localStorage.setItem("esp_admin_deleted_ids", JSON.stringify([...ids]));
      localStorage.setItem("esp_admin_deleted_orders", JSON.stringify(orders));
    } catch (e) {}
  }, []);

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
        const currentDeletedIds = (() => {
          try {
            const stored = localStorage.getItem("esp_admin_deleted_ids");
            return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
          } catch {
            return new Set<string>();
          }
        })();
        const filtered = data.orders.filter((o: Order) => !currentDeletedIds.has(o.id));
        setOrders(filtered);
        if (selectedOrder) {
          const fresh = filtered.find((o: Order) => o.id === selectedOrder.id);
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
    loadDeletedData();
    fetchOrders();

    // Polling backup every 10s
    const interval = setInterval(fetchOrders, 10000);

    // SSE Real-time connection
    let es: EventSource | null = null;
    const connectSSE = () => {
      try {
        es = new EventSource(`/api/orders/stream?token=${ADMIN_TOKEN}`);
        es.onopen = () => {
          setRealtimeConnected(true);
          setLastPingTime(new Date().toLocaleTimeString("ar-MA"));
        };

        es.addEventListener("new_order", (evt) => {
          try {
            const order: Order = JSON.parse(evt.data);
            if (lastOrderIdRef.current !== order.id) {
              lastOrderIdRef.current = order.id;
              setOrders((prev) => {
                if (prev.some((o) => o.id === order.id)) return prev;
                return [order, ...prev];
              });
              triggerNewOrderAlert(order);
            }
          } catch (e) {}
        });

        es.addEventListener("order_updated", (evt) => {
          try {
            const updated: Order = JSON.parse(evt.data);
            setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
            if (selectedOrder && selectedOrder.id === updated.id) {
              setSelectedOrder(updated);
            }
            if (updated.payment_status === "paid") {
              playAlertBeep();
              showToast(`💰 دفعة مؤكدة بـ PayPal: ${updated.order_number} (${updated.customer_name})`);
            }
          } catch (e) {}
        });

        es.addEventListener("order_deleted", (evt) => {
          try {
            const data = JSON.parse(evt.data);
            if (data.orderId) {
              setOrders((prev) => prev.filter((o) => o.id !== data.orderId));
            } else {
              setOrders([]);
            }
          } catch (e) {}
        });

        es.addEventListener("ping", () => {
          setLastPingTime(new Date().toLocaleTimeString("ar-MA"));
        });

        es.onerror = () => {
          setRealtimeConnected(false);
          es?.close();
          setTimeout(connectSSE, 4000);
        };
      } catch (e) {
        setRealtimeConnected(false);
      }
    };

    connectSSE();

    if (typeof window !== "undefined" && "Notification" in window) {
      setNotifPermission(Notification.permission);
    }

    return () => {
      clearInterval(interval);
      es?.close();
    };
  }, [loadDeletedData, playAlertBeep, triggerNewOrderAlert]);

  // Purge & Wipe Mock Data Completely (Requirement 1)
  const handlePurgeAllMockData = async () => {
    if (
      !confirm(
        "⚠️ هل أنت متأكد من حذف وتطهير جميع الطلبات والتجار والبيانات الوهمية تماماً؟\nسيتم تصفير كافة العدادات إلى 0 استعداداً لاستقبال المبيعات الحقيقية."
      )
    ) {
      return;
    }

    try {
      setIsUpdating(true);
      const res = await fetch(`/api/orders?purgeAll=true`, {
        method: "DELETE",
        headers: {
          "x-admin-token": "2026",
          "x-desktop-auth-token": ADMIN_TOKEN,
        },
      });
      const data = await res.json();
      if (data && data.success) {
        setOrders([]);
        setDeletedOrders([]);
        setDeletedIds(new Set());
        try {
          localStorage.removeItem("esp_admin_deleted_ids");
          localStorage.removeItem("esp_admin_deleted_orders");
        } catch (e) {}
        showToast("🧹 تم تطهير قاعدة البيانات بنجاح وتصفير كافة العدادات إلى 0!");
      } else {
        showToast("فشل تطهير البيانات");
      }
    } catch (e) {
      showToast("حدث خطأ أثناء تطهير البيانات");
    } finally {
      setIsUpdating(false);
    }
  };

  // Quick Status Update
  const handleQuickStatusChange = async (orderId: string, newStatus: string) => {
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
        showToast("تم تحديث حالة الطلب بنجاح ✅");
      } else {
        showToast(data.message || "فشل تحديث الحالة");
      }
    } catch (err) {
      showToast("حدث خطأ أثناء تحديث الحالة");
    } finally {
      setIsUpdating(false);
    }
  };

  // Toggle White-label flag
  const handleToggleWhiteLabel = async (orderId: string, currentVal?: boolean) => {
    try {
      setIsUpdating(true);
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": "2026",
          "x-desktop-auth-token": ADMIN_TOKEN,
        },
        body: JSON.stringify({ id: orderId, white_label: !currentVal }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(data.order);
        }
        showToast(!currentVal ? "تم تفعيل خيار إزالة الحقوق (White-label) 🛡️" : "تم إلغاء خيار White-label");
      }
    } catch (e) {
      showToast("فشل تحديث خيار White-label");
    } finally {
      setIsUpdating(false);
    }
  };

  // Confirm PayPal Payment Manually
  const handleConfirmPayPalPayment = async (orderId: string) => {
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
          id: orderId,
          status: "in_progress",
          payment_status: "paid",
          payment_method: "PayPal (مؤكد)",
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(data.order);
        }
        playAlertBeep();
        showToast("✅ تم تأكيد استلام الدفعة بنجاح وإضافتها للأرباح المؤكدة!");
      } else {
        showToast(data.message || "فشل تأكيد الدفعة");
      }
    } catch (err) {
      showToast("حدث خطأ أثناء تأكيد الدفعة");
    } finally {
      setIsUpdating(false);
    }
  };

  // Deliver store URL
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
        setOrders((prev) => prev.map((o) => (o.id === quickStoreOrderId ? data.order : o)));
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
      showToast("حدث خطأ أثناء تسليم الطلب");
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete Order → Trash
  const handleDeleteOrder = async (orderId: string, orderNumber: string) => {
    if (!confirm(`هل أنت متأكد من حذف الطلب ${orderNumber} ونقله إلى سلة المحذوفات؟`)) return;
    try {
      const orderToDelete = orders.find((o) => o.id === orderId);
      if (orderToDelete) {
        const newDeleted = [{ ...orderToDelete, deleted_at: new Date().toISOString() }, ...deletedOrders];
        const newIds = new Set([...deletedIds, orderId]);
        setDeletedOrders(newDeleted);
        setDeletedIds(newIds);
        saveDeletedData(newIds, newDeleted);
      }
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
      showToast(`تم نقل الطلب ${orderNumber} إلى سلة المحذوفات 🗑️`);

      fetch(`/api/orders?id=${orderId}`, {
        method: "DELETE",
        headers: { "x-admin-token": "2026", "x-desktop-auth-token": ADMIN_TOKEN },
      }).catch(() => {});
    } catch (err) {
      showToast("حدث خطأ أثناء حذف الطلب");
    }
  };

  // Delete Merchant
  const handleDeleteMerchant = async (phone: string, name: string) => {
    if (!confirm(`هل أنت متأكد من حذف التاجر "${name}" وجميع طلباته؟`)) return;
    try {
      const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";
      const toDelete = orders.filter((o) => {
        const oPhone = (o.phone_number || "").replace(/[^0-9]/g, "");
        const matchPhone = cleanPhone && cleanPhone.length >= 6 && (oPhone.includes(cleanPhone) || cleanPhone.includes(oPhone));
        const matchName = name && o.customer_name?.trim().toLowerCase() === name.trim().toLowerCase();
        return matchPhone || matchName;
      });

      if (toDelete.length > 0) {
        const newDeleted = [
          ...toDelete.map((o) => ({ ...o, deleted_at: new Date().toISOString() })),
          ...deletedOrders,
        ];
        const newIds = new Set([...deletedIds]);
        toDelete.forEach((o) => {
          newIds.add(o.id);
          if (o.order_number) newIds.add(o.order_number);
        });
        if (cleanPhone) newIds.add(cleanPhone);

        setDeletedOrders(newDeleted);
        setDeletedIds(newIds);
        saveDeletedData(newIds, newDeleted);

        const deleteIdsSet = new Set(toDelete.map((o) => o.id));
        setOrders((prev) => prev.filter((o) => !deleteIdsSet.has(o.id)));
      }

      if (selectedMerchant && (selectedMerchant.phone === phone || selectedMerchant.name === name)) {
        setSelectedMerchant(null);
      }
      showToast(`تم نقل التاجر "${name}" إلى سلة المحذوفات 🗑️`);

      fetch(`/api/orders?phone=${encodeURIComponent(phone)}&customer=${encodeURIComponent(name)}`, {
        method: "DELETE",
        headers: { "x-admin-token": "2026", "x-desktop-auth-token": ADMIN_TOKEN },
      }).catch(() => {});
    } catch (err) {
      showToast("حدث خطأ أثناء حذف التاجر");
    }
  };

  // Trash operations
  const handleRestoreFromTrash = async (orderId: string) => {
    const restored = deletedOrders.find((o) => o.id === orderId);
    if (restored) {
      const { deleted_at, ...cleanOrder } = restored;
      setOrders((prev) => [cleanOrder as Order, ...prev]);
      const newIds = new Set([...deletedIds]);
      newIds.delete(orderId);
      if (cleanOrder.order_number) newIds.delete(cleanOrder.order_number);
      const newDeleted = deletedOrders.filter((o) => o.id !== orderId);
      setDeletedIds(newIds);
      setDeletedOrders(newDeleted);
      saveDeletedData(newIds, newDeleted);
      try {
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanOrder),
        });
      } catch (e) {}
      showToast("تمت استعادة الطلب بنجاح ✅");
    }
  };

  const handlePermanentDeleteOne = (orderId: string) => {
    if (!confirm("هل أنت متأكد من الحذف النهائي؟ لا يمكن التراجع.")) return;
    const newDeleted = deletedOrders.filter((o) => o.id !== orderId);
    setDeletedOrders(newDeleted);
    saveDeletedData(deletedIds, newDeleted);
    showToast("تم الحذف النهائي 🗑️");
  };

  const handleClearAllTrash = () => {
    if (deletedOrders.length === 0) {
      showToast("سلة المحذوفات فارغة");
      return;
    }
    if (!confirm(`إفراغ سلة المحذوفات بالكامل (${deletedOrders.length} عناصر)؟`)) return;
    setDeletedOrders([]);
    saveDeletedData(deletedIds, []);
    showToast("تم إفراغ سلة المحذوفات نهائياً 🗑️");
  };

  // Create new order
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
          status: newOrderForm.payment_status === "paid" ? "in_progress" : "pending",
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
      showToast("خطأ أثناء إنشاء الطلب");
    } finally {
      setIsUpdating(false);
    }
  };

  // Filtered orders logic
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
        (statusFilter === "completed" && o.status === "completed");

      const isPaid = o.payment_status === "paid";
      const matchesPayment =
        paymentFilter === "all" ||
        (paymentFilter === "paid" && isPaid) ||
        (paymentFilter === "pending" && !isPaid);

      const pkg = identifyPackage(o);
      const matchesPackage = packageFilter === "all" || packageFilter === pkg.id;

      const matchesWhiteLabel =
        whiteLabelFilter === "all" ||
        (whiteLabelFilter === "white_label" && Boolean(o.white_label)) ||
        (whiteLabelFilter === "standard" && !o.white_label);

      return matchesSearch && matchesStatus && matchesPayment && matchesPackage && matchesWhiteLabel;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter, packageFilter, whiteLabelFilter]);

  // Financial KPIs — Confirmed PayPal Revenue vs Pending
  const totalOrdersCount = orders.length;
  const paidOrders = useMemo(() => orders.filter((o) => o.payment_status === "paid"), [orders]);
  const pendingOrders = useMemo(() => orders.filter((o) => o.payment_status !== "paid"), [orders]);

  const paidOrdersCount = paidOrders.length;
  const pendingOrdersCount = pendingOrders.length;
  const completedOrdersCount = orders.filter((o) => o.status === "completed").length;

  // ✅ CONFIRMED REVENUE: Only orders where payment_status = "paid"
  const confirmedRevenue = useMemo(() => {
    return paidOrders.reduce((sum, o) => sum + identifyPackage(o).price, 0);
  }, [paidOrders]);

  // ⏳ PENDING REVENUE: Orders waiting for PayPal payment completion
  const pendingRevenue = useMemo(() => {
    return pendingOrders.reduce((sum, o) => sum + identifyPackage(o).price, 0);
  }, [pendingOrders]);

  const whiteLabelOrdersCount = useMemo(() => orders.filter((o) => o.white_label).length, [orders]);

  // Metrics for the 4 Official Packages
  const packageMetrics = useMemo(() => {
    return OFFICIAL_PACKAGES.map((pkg) => {
      const pkgOrders = orders.filter((o) => identifyPackage(o).id === pkg.id);
      const paidCount = pkgOrders.filter((o) => o.payment_status === "paid").length;
      const pendingCount = pkgOrders.filter((o) => o.payment_status !== "paid").length;
      const revenue = paidCount * pkg.price;
      const whiteLabelCount = pkgOrders.filter((o) => o.white_label).length;
      return {
        ...pkg,
        totalCount: pkgOrders.length,
        paidCount,
        pendingCount,
        revenue,
        whiteLabelCount,
      };
    });
  }, [orders]);

  // CRM: unique customers list
  const customersList = useMemo(() => {
    const map = new Map<
      string,
      { name: string; phone: string; city: string; email: string; ordersCount: number; totalSpend: number; lastOrder: string }
    >();
    orders.forEach((o) => {
      const key = o.phone_number || o.customer_name;
      const price = identifyPackage(o).price;
      if (!map.has(key)) {
        map.set(key, {
          name: o.customer_name,
          phone: o.phone_number,
          city: o.customer_city || "الدار البيضاء",
          email: o.customer_email || "",
          ordersCount: 1,
          totalSpend: o.payment_status === "paid" ? price : 0,
          lastOrder: o.created_at,
        });
      } else {
        const item = map.get(key)!;
        item.ordersCount += 1;
        if (o.payment_status === "paid") item.totalSpend += price;
        if (new Date(o.created_at) > new Date(item.lastOrder)) {
          item.lastOrder = o.created_at;
        }
      }
    });
    return Array.from(map.values());
  }, [orders]);

  // CSV Export
  const exportCSV = () => {
    const headers = [
      "رقم الطلب",
      "التاجر والمدينة",
      "الهاتف",
      "المتجر",
      "الباقة الرسمية",
      "السعر (د.م)",
      "حالة الدفع",
      "حالة الطلب",
      "إزالة الحقوق (White-label)",
      "رابط المتجر المسلّم",
      "تاريخ الطلب",
    ];
    const rows = filteredOrders.map((o) => {
      const pkg = identifyPackage(o);
      return [
        o.order_number,
        `${o.customer_name} (${o.customer_city || "الدار البيضاء"})`,
        o.phone_number,
        o.store_name || "",
        pkg.name,
        pkg.price,
        o.payment_status === "paid" ? "مدفوع ومؤكد بـ PayPal" : "معلق بانتظار الدفع",
        o.status,
        o.white_label ? "نعم (White-label)" : "لا",
        o.delivered_url || "",
        new Date(o.created_at).toLocaleString("ar-MA"),
      ];
    });

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

  const latestOrder = orders[0];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#02133f] via-[#052b75] to-[#011440] text-slate-800 p-3 sm:p-5 lg:p-6 relative overflow-x-hidden font-sans"
      dir="rtl"
      style={{ zoom: zoomLevel }}
    >
      {/* Background Cosmic Cosmic Rays */}
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
        {/* 1. TOP HEADER BAR                                        */}
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
                    - نظام المبيعات اللحظية والـ 4 باقات الرسمية
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: Server Pulse Ribbon */}
          <div className="hidden xl:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg">
            {/* Real-time Indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                {realtimeConnected ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                )}
              </span>
              <span className={`text-xs font-black ${realtimeConnected ? "text-emerald-300" : "text-red-400"}`}>
                {realtimeConnected ? "⚡ لحظي متصل (0ms)" : "⚠️ غير متصل"}
              </span>
              {lastPingTime && <span className="text-[10px] text-slate-400 font-mono">{lastPingTime}</span>}
            </div>

            <span className="text-slate-500 text-xs">|</span>

            {/* Audio Alert Test */}
            <button
              onClick={() => {
                playAlertBeep();
                sendPushNotification("🔔 تجربة التنبيه — Ecom Speed Pro", "نظام الإشعارات اللحظية يعمل بنجاح!");
                showToast("🔔 تم تشغيل التنبيه الصوتي والإشعار بنجاح!");
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-black transition-all cursor-pointer border border-cyan-400/40"
              title="تجربة التنبيه الصوتي وإشعارات المتصفح فوراً"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
              <span>تجربة الصوت</span>
            </button>

            <span className="text-slate-500 text-xs">|</span>

            {/* Browser Notifications Permission */}
            <button
              onClick={requestNotifPermission}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                notifPermission === "granted"
                  ? "bg-emerald-500/20 border border-emerald-400/40 text-emerald-300"
                  : "bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:bg-amber-500/30"
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{notifPermission === "granted" ? "الإشعارات مفعّلة" : "تفعيل الإشعارات"}</span>
            </button>

            <span className="text-slate-500 text-xs">|</span>

            {/* Fast Stats in ribbon */}
            <span className="text-xs font-bold text-white font-mono">{totalOrdersCount} طلب</span>
            <span className="text-slate-500 text-xs">|</span>
            <span className="text-xs font-mono font-black text-emerald-300">
              ✅ {confirmedRevenue.toLocaleString()} د.م مؤكد
            </span>
            {pendingRevenue > 0 && (
              <>
                <span className="text-slate-500 text-xs">|</span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  ⏳ {pendingRevenue.toLocaleString()} د.م معلق
                </span>
              </>
            )}
          </div>

          {/* LEFT: Actions (Purge Database, New Order, Zoom, Refresh) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Database Purge Button */}
            <button
              onClick={handlePurgeAllMockData}
              className="px-3 py-2 rounded-2xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-rose-300 hover:text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              title="تطهير قاعدة البيانات وتصفير العدادات إلى 0 لاستقبال المبيعات الحقيقية"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">تطهير العدادات (0)</span>
            </button>

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
        {/* 2. LIVE ALERT BANNER                                     */}
        {/* ======================================================== */}
        {showLiveBanner && latestOrder && (
          <div className="w-full rounded-2xl bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-teal-950/90 border border-cyan-400/40 px-4 py-2.5 shadow-[0_8px_30px_rgba(6,182,212,0.25)] flex items-center justify-between text-white animate-in fade-in duration-300">
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

            <div className="flex items-center gap-2 text-right">
              <div>
                <span className="text-xs font-black text-emerald-400 block">
                  طلب جديد وصل في نفس اللحظة! ⚡
                </span>
                <span className="text-xs text-slate-200 font-bold">
                  التاجر: <strong className="text-white font-black">{latestOrder.customer_name}</strong> •{" "}
                  {identifyPackage(latestOrder).name} ({identifyPackage(latestOrder).priceFormatted})
                  {latestOrder.white_label && (
                    <span className="mr-2 px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-[10px] font-black border border-purple-400/40">
                      🛡️ White-label
                    </span>
                  )}
                </span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-400/30">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. MAIN STAGE: SIDEBAR ON RIGHT + WORKSTATION ON LEFT    */}
        {/* ======================================================== */}
        <div className="flex flex-col xl:flex-row gap-4 items-stretch w-full">
          {/* SIDEBAR NAVIGATION */}
          <aside className="xl:w-[155px] shrink-0 rounded-[28px] bg-gradient-to-b from-[#0a2364]/95 via-[#06184a]/95 to-[#041238]/95 border border-cyan-400/40 p-3 shadow-[0_15px_40px_rgba(2,10,35,0.6)] flex flex-row xl:flex-col gap-2 justify-between xl:justify-start backdrop-blur-xl overflow-x-auto">
            {[
              { id: "orders", label: "الطلبات", icon: ShoppingCart },
              { id: "home", label: "الرئيسية", icon: Store },
              { id: "products", label: "الباقات الـ 4", icon: Package },
              { id: "customers", label: "العملاء", icon: Users },
              { id: "payments", label: "المدفوعات", icon: CreditCard },
              { id: "reports", label: "التقارير", icon: TrendingUp },
              { id: "settings", label: "الإعدادات", icon: ShieldCheck },
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

            {/* Trash Tab Button */}
            <button
              onClick={() => setCurrentTab("trash")}
              className={`tab-button flex-1 xl:flex-initial rounded-2xl flex items-center justify-between px-3.5 py-3 transition-all cursor-pointer text-xs font-bold relative ${
                currentTab === "trash"
                  ? "bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white shadow-[0_0_25px_rgba(225,29,72,0.6)] font-black"
                  : "text-rose-300/90 hover:text-white hover:bg-rose-500/20"
              }`}
            >
              <Trash2 className="w-4 h-4 shrink-0" />
              <span>المحذوفات</span>
              {deletedOrders.length > 0 && (
                <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-md">
                  {deletedOrders.length > 9 ? "9+" : deletedOrders.length}
                </span>
              )}
            </button>
          </aside>

          {/* MAIN WHITE WORKSTATION */}
          <main className="flex-1 rounded-[32px] bg-gradient-to-b from-[#f8fbff]/95 via-[#f1f6fd]/95 to-[#e8f1fc]/95 border-2 border-white/80 shadow-[0_25px_70px_rgba(0,25,80,0.3)] p-5 sm:p-6 lg:p-7 flex flex-col gap-5 backdrop-blur-2xl min-h-[680px]">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-blue-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                  <div className="w-full h-full bg-[#0a1f58] rounded-[14px] flex items-center justify-center text-cyan-300">
                    {currentTab === "orders" ? (
                      <ShoppingCart className="w-5 h-5" />
                    ) : currentTab === "home" ? (
                      <Store className="w-5 h-5" />
                    ) : currentTab === "products" ? (
                      <Package className="w-5 h-5" />
                    ) : currentTab === "customers" ? (
                      <Users className="w-5 h-5" />
                    ) : currentTab === "payments" ? (
                      <CreditCard className="w-5 h-5" />
                    ) : currentTab === "reports" ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : currentTab === "settings" ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0b1739]">
                    {currentTab === "orders" && "إدارة الطلبات والمدفوعات الحية"}
                    {currentTab === "home" && "نظرة عامة وإحصائيات الباقات الـ 4 الرسمية"}
                    {currentTab === "products" && "الباقات والخدمات الرسمية الأربع"}
                    {currentTab === "customers" && "سجل العملاء والتجار (CRM)"}
                    {currentTab === "payments" && "المدفوعات وبوابات PayPal Webhooks"}
                    {currentTab === "reports" && "التقارير المالية الدقيقة والمبيعات"}
                    {currentTab === "settings" && "إعدادات الأمان وتطهير البيانات"}
                    {currentTab === "trash" && "سلة المحذوفات والطلبات المحذوفة"}
                  </h2>
                  <p className="text-xs text-slate-500 font-bold">
                    Ecom Speed Pro — نظام إدارة المتاجر عالي الدقة والموثوقية
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-black text-emerald-700">اتصال لحظي متزامن</span>
                </div>
              </div>
            </div>

            {/* ==================================================== */}
            {/* TAB: ORDERS (الطلبات)                                */}
            {/* ==================================================== */}
            {currentTab === "orders" && (
              <div className="flex flex-col gap-5">
                {/* 4 KPI CARDS (Dignified financial precision) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {/* Card 1: Total Orders */}
                  <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#64748b] block mb-1">إجمالي الطلبات</span>
                      <div className="text-2xl sm:text-3xl font-black font-mono text-[#0b1739]">
                        {totalOrdersCount}
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {paidOrdersCount} مدفوع • {pendingOrdersCount} معلق
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3b82f6] to-[#60a5fa] text-white flex items-center justify-center shadow-md shrink-0">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card 2: Confirmed Revenue (PayPal COMPLETED) */}
                  <div className="rounded-2xl bg-white border-2 border-emerald-300/80 p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all bg-gradient-to-br from-white to-emerald-50/40">
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-800 block mb-1 flex items-center gap-1">
                        <span>إجمالي الأرباح المؤكدة</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                      <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600">
                        {confirmedRevenue.toLocaleString()} <span className="text-sm font-sans">د.م</span>
                      </div>
                      <span className="text-[10.5px] text-emerald-700 font-bold block mt-0.5">
                        مؤكد عبر PayPal Webhook فقط
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#10b981] to-[#34d399] text-white flex items-center justify-center shadow-md shrink-0">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card 3: Pending Revenue (Not yet paid) */}
                  <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all">
                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-700 block mb-1 flex items-center gap-1">
                        <span>مبيعات معلقة (قيد الدفع)</span>
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                      </span>
                      <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600">
                        {pendingRevenue.toLocaleString()} <span className="text-sm font-sans">د.م</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {pendingOrdersCount} طلب بانتظار إتمام الدفع
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f97316] to-[#fb923c] text-white flex items-center justify-center shadow-md shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card 4: White-label requests */}
                  <div className="rounded-2xl bg-white border border-[#d8e5f5] p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#64748b] block mb-1 flex items-center gap-1">
                        <span>طلبات إزالة الحقوق</span>
                        <Shield className="w-3.5 h-3.5 text-purple-600" />
                      </span>
                      <div className="text-2xl sm:text-3xl font-black font-mono text-purple-700">
                        {whiteLabelOrdersCount}
                      </div>
                      <span className="text-[10px] text-purple-600 font-bold">
                        {totalOrdersCount > 0
                          ? `${Math.round((whiteLabelOrdersCount / totalOrdersCount) * 100)}% من إجمالي التجار`
                          : "0%"}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#a855f7] to-[#c084fc] text-white flex items-center justify-center shadow-md shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* SEARCH & FILTERS BAR */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-blue-100 shadow-sm">
                  {/* Search Input */}
                  <div className="flex-1 min-w-[240px] relative">
                    <input
                      type="text"
                      placeholder="ابحث باسم التاجر، رقم الهاتف، أو رقم الطلب..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full py-2.5 px-4 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3" />
                  </div>

                  {/* Multi-Filters: Payment status, 4 packages, White-label */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Payment Status Filter */}
                    <select
                      value={paymentFilter}
                      onChange={(e) => setPaymentFilter(e.target.value)}
                      className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-black text-slate-700 cursor-pointer focus:outline-none"
                    >
                      <option value="all">💳 جميع المدفوعات</option>
                      <option value="paid">🟢 مدفوع ومؤكد بـ PayPal</option>
                      <option value="pending">⏳ معلق بانتظار الدفع</option>
                    </select>

                    {/* The 4 Official Packages Filter */}
                    <select
                      value={packageFilter}
                      onChange={(e) => setPackageFilter(e.target.value)}
                      className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-black text-slate-700 cursor-pointer focus:outline-none"
                    >
                      <option value="all">📦 الباقات الأربع (الكل)</option>
                      <option value="landing-local">🇲🇦 صفحة هبوط محلية (1,500 DH)</option>
                      <option value="store-local">🇲🇦 متجر محلي متكامل (3,000 DH)</option>
                      <option value="landing-intl">🌐 صفحة هبوط دولية (4,500 DH)</option>
                      <option value="store-intl">👑 متجر دولي VIP (9,000 DH)</option>
                    </select>

                    {/* White-label Filter */}
                    <select
                      value={whiteLabelFilter}
                      onChange={(e) => setWhiteLabelFilter(e.target.value)}
                      className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-black text-slate-700 cursor-pointer focus:outline-none"
                    >
                      <option value="all">🛡️ الحقوق: الكل</option>
                      <option value="white_label">🛡️ إزالة الحقوق (White-label)</option>
                      <option value="standard">مع حقوق الوكالة</option>
                    </select>

                    {/* Order Status Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer focus:outline-none"
                    >
                      <option value="all">جميع الحالات</option>
                      <option value="pending">🟡 قيد المراجعة</option>
                      <option value="in_progress">🔵 جاري التجهيز</option>
                      <option value="completed">🟢 مكتمل ومسلّم</option>
                    </select>

                    {/* CSV Export */}
                    <button
                      onClick={exportCSV}
                      className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>تصدير CSV</span>
                    </button>
                  </div>
                </div>

                {/* ORDERS TABLE CONTAINER */}
                <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white shadow-sm">
                  <table className="w-full min-w-[1550px] text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                      <tr>
                        <th className="p-3.5">الطلب</th>
                        <th className="p-3.5">التاجر والمدينة</th>
                        <th className="p-3.5">المتجر والمنتج</th>
                        <th className="p-3.5">الباقة الرسمية</th>
                        <th className="p-3.5">المبلغ</th>
                        <th className="p-3.5">حالة الدفع</th>
                        <th className="p-3.5">حالة التجهيز</th>
                        <th className="p-3.5 min-w-[260px] text-center">إزالة الحقوق (White-Label)</th>
                        <th className="p-3.5">رابط المتجر المسلّم</th>
                        <th className="p-3.5 text-center min-w-[340px]">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="p-12 text-center text-slate-400 font-bold">
                            {loading ? (
                              <div className="flex flex-col items-center gap-2">
                                <span className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                <span>جاري استرجاع سجل الطلبات...</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <ShoppingCart className="w-8 h-8 text-slate-300" />
                                <span>قاعدة البيانات نظيفة وجاهزة لاستقبال أول طلب حقيقي! 🚀</span>
                              </div>
                            )}
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
                          const pkg = identifyPackage(o);
                          const isPaid = o.payment_status === "paid";
                          const isWhiteLabel = Boolean(o.white_label);
                          const deliveredUrl = o.delivered_url || "";
                          const cleanPhone = phone.replace(/[^0-9]/g, "");

                          return (
                            <tr
                              key={id}
                              onClick={() => setSelectedOrder(o)}
                              className="hover:bg-blue-50/70 transition-all border-b border-slate-100/80 cursor-pointer group/row"
                              title="انقر لفتح تفاصيل الطلب ومعلومات التاجر"
                            >
                              {/* Col 1: Order Number & Date */}
                              <td className="p-3.5">
                                <span className="font-mono font-black text-blue-700 block text-xs">{num}</span>
                                <span className="text-[10px] text-slate-400 font-bold">
                                  {new Date(o.created_at).toLocaleDateString("ar-MA", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </td>

                              {/* Col 2: Merchant & City */}
                              <td className="p-3.5">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                                    {name.charAt(0) || "ت"}
                                  </div>
                                  <div>
                                    <strong className="text-slate-900 font-black block text-xs">{name}</strong>
                                    <span className="text-[10px] text-slate-500 font-bold block">{city}</span>
                                  </div>
                                </div>
                              </td>

                              {/* Col 3: Store & Price */}
                              <td className="p-3.5">
                                <span className="font-black text-slate-900 block text-xs">{storeName}</span>
                                {productPrice && (
                                  <span className="text-[10px] text-emerald-700 font-mono font-bold block">
                                    سعر البيع: {productPrice}
                                  </span>
                                )}
                              </td>

                              {/* Col 4: Package + White-label Pill */}
                              <td className="p-3.5">
                                <div className="flex flex-col gap-1">
                                  <span className="inline-flex items-center gap-1 text-xs font-black text-slate-900">
                                    <span>{pkg.emoji}</span>
                                    <span>{pkg.name}</span>
                                  </span>
                                  {isWhiteLabel ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black bg-purple-100 text-purple-800 border border-purple-200 w-fit">
                                      <Shield className="w-2.5 h-2.5 text-purple-600" />
                                      <span>White-label (بدون حقوق)</span>
                                    </span>
                                  ) : (
                                    <span className="text-[9px] text-slate-400 font-bold">عادي</span>
                                  )}
                                </div>
                              </td>

                              {/* Col 5: Price */}
                              <td className="p-3.5 font-mono font-black text-xs">
                                <span className="text-sm font-black text-blue-800 block">
                                  {pkg.price.toLocaleString()}
                                </span>
                                <span className="text-[9.5px] text-slate-500 font-sans block">د . م</span>
                              </td>

                              {/* Col 6: Payment Status Badge */}
                              <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                                {isPaid ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    <span>مدفوع ومؤكد بـ PayPal</span>
                                  </span>
                                ) : (
                                  <div className="flex items-center gap-1.5">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300">
                                      <Clock className="w-3 h-3 text-amber-600" />
                                      <span>معلق بانتظار الدفع</span>
                                    </span>
                                    <button
                                      onClick={() => handleConfirmPayPalPayment(id)}
                                      className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[9.5px] shadow-xs cursor-pointer"
                                      title="تأكيد الدفع يدوياً"
                                    >
                                      تأكيد الدفع ✓
                                    </button>
                                  </div>
                                )}
                              </td>

                              {/* Col 7: Order Workflow Status */}
                              <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                                <select
                                  value={o.status || "pending"}
                                  onChange={(e) => handleQuickStatusChange(id, e.target.value)}
                                  className={`py-1.5 px-3 rounded-full text-[11px] font-black cursor-pointer focus:outline-none transition-all shadow-xs border ${
                                    o.status === "completed"
                                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                      : o.status === "in_progress"
                                      ? "bg-blue-100 text-blue-800 border-blue-300"
                                      : "bg-amber-100 text-amber-800 border-amber-300"
                                  }`}
                                >
                                  <option value="pending">🟡 قيد المراجعة</option>
                                  <option value="in_progress">🔵 جاري التجهيز</option>
                                  <option value="completed">🟢 مكتمل ومسلّم</option>
                                </select>
                              </td>

                              {/* Col 8: White-Label Check (إزالة حقوق المطور) */}
                              <td className="p-3.5 min-w-[260px]" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => handleToggleWhiteLabel(o.id, o.white_label)}
                                  title="انقر للتبديل بين تفعيل أو إلغاء إزالة حقوق المطور"
                                  className={`w-full p-2 rounded-2xl flex items-center justify-between gap-2.5 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
                                    isWhiteLabel
                                      ? "bg-purple-50 hover:bg-purple-100/90 text-purple-950 border-purple-300 ring-1 ring-purple-400/30"
                                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 text-right">
                                    <div
                                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                                        isWhiteLabel
                                          ? "bg-purple-600 text-white shadow-xs"
                                          : "bg-slate-200 text-slate-500"
                                      }`}
                                    >
                                      <Shield className="w-4 h-4 fill-current" />
                                    </div>
                                    <div className="leading-tight">
                                      <span className="block text-xs font-black">
                                        {isWhiteLabel ? "🛡️ بدون حقوق (White-label)" : "مع شعار الوكالة"}
                                      </span>
                                      <span className="block text-[10px] font-bold text-slate-500">
                                        {isWhiteLabel ? "علامة تجارية مستقلة للتاجر" : "شعار المنصة مفعّل (افتراضي)"}
                                      </span>
                                    </div>
                                  </div>

                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                                      isWhiteLabel
                                        ? "bg-purple-200 text-purple-900 border border-purple-300"
                                        : "bg-slate-200 text-slate-600"
                                    }`}
                                  >
                                    {isWhiteLabel ? "مفعّل ✓" : "عادي"}
                                  </span>
                                </button>
                              </td>

                              {/* Col 9: Delivered Store Link */}
                              <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                                {deliveredUrl ? (
                                  <div className="flex items-center gap-1.5">
                                    <a
                                      href={deliveredUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="px-2.5 py-1 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-mono text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <ExternalLink className="w-3 h-3 text-cyan-600" />
                                      <span>المتجر</span>
                                    </a>
                                    <button
                                      onClick={() => {
                                        setQuickStoreOrderId(id);
                                        setQuickStoreUrlInput(deliveredUrl);
                                        setQuickStoreDeliveryStatus(
                                          o.status === "in_progress" ? "in_progress" : "completed"
                                        );
                                      }}
                                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setQuickStoreOrderId(id);
                                      setQuickStoreUrlInput("");
                                      setQuickStoreDeliveryStatus(
                                        o.status === "in_progress" ? "in_progress" : "completed"
                                      );
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-cyan-50 text-slate-600 hover:text-cyan-700 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3 text-cyan-600" />
                                    <span>+ تسليم</span>
                                  </button>
                                )}
                              </td>

                              {/* Col 9: Action Buttons */}
                              <td className="p-3.5 text-center min-w-[340px]" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                                  {/* تسليم الطلب */}
                                  <button
                                    onClick={() => {
                                      setQuickStoreOrderId(id);
                                      setQuickStoreUrlInput(deliveredUrl || "");
                                      setQuickStoreDeliveryStatus(
                                        o.status === "in_progress" ? "in_progress" : "completed"
                                      );
                                    }}
                                    className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white font-black text-[11px] flex items-center gap-1 shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                                  >
                                    <Rocket className="w-3.5 h-3.5" />
                                    <span>تسليم</span>
                                  </button>

                                  {/* ملف التاجر */}
                                  <button
                                    onClick={() =>
                                      setSelectedMerchant({
                                        name,
                                        phone,
                                        city,
                                        email: o.customer_email || "",
                                      })
                                    }
                                    className="px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer shrink-0"
                                  >
                                    <User className="w-3 h-3 text-blue-600" />
                                    <span>ملف التاجر</span>
                                  </button>

                                  {/* تفاصيل المتجر */}
                                  <button
                                    onClick={() => setSelectedOrder(o)}
                                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center gap-1 cursor-pointer shrink-0"
                                  >
                                    <Store className="w-3 h-3 text-slate-700" />
                                    <span>طلب المتجر</span>
                                  </button>

                                  {/* WhatsApp */}
                                  {cleanPhone && (
                                    <a
                                      href={`https://wa.me/${
                                        cleanPhone.startsWith("212") ? cleanPhone : "212" + cleanPhone.replace(/^0/, "")
                                      }?text=${encodeURIComponent(
                                        `السلام عليكم أخي ${name}، نتواصل معك من إدارة Ecom Speed Pro بخصوص طلبك (${num}).`
                                      )}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 cursor-pointer shrink-0"
                                      title="واتساب"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                    </a>
                                  )}

                                  {/* رابط التتبع */}
                                  <Link
                                    href={`/order/${id}`}
                                    target="_blank"
                                    className="p-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 cursor-pointer shrink-0"
                                    title="صفحة التتبع"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </Link>

                                  {/* Delete */}
                                  <button
                                    onClick={() => handleDeleteOrder(id, num)}
                                    className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shrink-0"
                                    title="حذف الطلب"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                  </button>
                                </div>
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
            {/* TAB: HOME (الرئيسية والـ 4 باقات الرسمية)            */}
            {/* ==================================================== */}
            {currentTab === "home" && (
              <div className="flex flex-col gap-6 text-right">
                {/* Executive Live Financial Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg shadow-emerald-600/20">
                    <span className="text-xs font-bold text-emerald-100 block mb-1">
                      ✅ إجمالي الأرباح المؤكدة عبر PayPal
                    </span>
                    <div className="text-3xl font-black font-mono">
                      {confirmedRevenue.toLocaleString()} <span className="text-sm font-sans">د.م</span>
                    </div>
                    <span className="text-[11px] text-emerald-100/90 font-bold block mt-1">
                      {paidOrdersCount} مبيعات مؤكدة بالـ Webhook
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-600/20">
                    <span className="text-xs font-bold text-amber-100 block mb-1">
                      ⏳ المبيعات المعلقة (بانتظار الدفع)
                    </span>
                    <div className="text-3xl font-black font-mono">
                      {pendingRevenue.toLocaleString()} <span className="text-sm font-sans">د.م</span>
                    </div>
                    <span className="text-[11px] text-amber-100/90 font-bold block mt-1">
                      {pendingOrdersCount} طلبات لم يتم تأكيد دفعها بعد
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20">
                    <span className="text-xs font-bold text-blue-100 block mb-1">
                      📦 إجمالي الطلبات الكلية
                    </span>
                    <div className="text-3xl font-black font-mono">{totalOrdersCount}</div>
                    <span className="text-[11px] text-blue-100/90 font-bold block mt-1">
                      {customersList.length} تاجر مسجل بالنظام
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-700 text-white shadow-lg shadow-purple-600/20">
                    <span className="text-xs font-bold text-purple-100 block mb-1">
                      🛡️ طلبات إزالة الحقوق (White-label)
                    </span>
                    <div className="text-3xl font-black font-mono">{whiteLabelOrdersCount}</div>
                    <span className="text-[11px] text-purple-100/90 font-bold block mt-1">
                      علامة تجارية مستقلة 100%
                    </span>
                  </div>
                </div>

                {/* ==================================================== */}
                {/* THE 4 OFFICIAL PACKAGES LUXURY SHOWCASE              */}
                {/* مرتبة من اليمين لليسار: 1500 ثم 3000 ثم 4500 ثم 9000   */}
                {/* ==================================================== */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-black text-slate-900">
                        الباقات والخدمات الرسمية الأربع (الأداء والمبيعات)
                      </h3>
                    </div>
                    <span className="text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                      4 باقات رسمية معتمدة فقط
                    </span>
                  </div>

                  {/* 4 Cards Grid - Exactly ordered right-to-left: 1500 -> 3000 -> 4500 -> 9000 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {packageMetrics.map((pkg, idx) => (
                      <div
                        key={pkg.id}
                        className="rounded-3xl bg-white border-2 border-slate-200 hover:border-blue-400 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-right relative overflow-hidden group"
                      >
                        {/* Top Gradient Ribbon */}
                        <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${pkg.gradient}`} />

                        <div>
                          {/* Card Header */}
                          <div className="flex items-center justify-between mb-3 pt-1">
                            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                              {pkg.market}
                            </span>
                            <span className="text-2xl">{pkg.emoji}</span>
                          </div>

                          <h4 className="text-base font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                            {pkg.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-bold mt-1 line-clamp-2">
                            {pkg.desc}
                          </p>

                          {/* Price Tag */}
                          <div className="my-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">السعر الرسمي:</span>
                            <span className={`text-xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r ${pkg.gradient}`}>
                              {pkg.priceFormatted}
                            </span>
                          </div>

                          {/* Performance Stats */}
                          <div className="space-y-2 text-xs font-bold text-slate-700 pt-1 border-t border-slate-100">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">إجمالي الطلبات:</span>
                              <span className="font-mono font-black text-slate-900">{pkg.totalCount} طلب</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">مبيعات مؤكدة (Paid):</span>
                              <span className="font-mono font-black text-emerald-600">{pkg.paidCount} مبيعات</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">أرباح الباقة المؤكدة:</span>
                              <span className="font-mono font-black text-blue-700">
                                {pkg.revenue.toLocaleString()} د.م
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">طلبات White-label:</span>
                              <span className="font-mono font-black text-purple-700">
                                {pkg.whiteLabelCount} طلب
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                          <button
                            onClick={() => {
                              setPackageFilter(pkg.id);
                              setCurrentTab("orders");
                            }}
                            className="flex-1 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-black text-xs transition-all cursor-pointer text-center"
                          >
                            عرض الطلبات ({pkg.totalCount})
                          </button>
                          <a
                            href={pkg.paypalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                            title="رابط الدفع المباشر بـ PayPal"
                          >
                            <PayPalIcon size={18} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: PRODUCTS (الباقات الـ 4 الرسمية)                 */}
            {/* ==================================================== */}
            {currentTab === "products" && (
              <div className="flex flex-col gap-6 text-right">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      قائمة الباقات الرسمية الأربع وروابط الدفع
                    </h3>
                    <p className="text-xs text-slate-500 font-bold mt-0.5">
                      روابط الدفع المباشرة عبر PayPal لجميع الباقات الأربع المعتمدة فقط
                    </p>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    4 باقات نشطة 100%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {OFFICIAL_PACKAGES.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="p-5 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-4 text-right"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{pkg.emoji}</span>
                          <div>
                            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 block w-fit mb-1">
                              {pkg.market}
                            </span>
                            <h4 className="text-base font-black text-slate-900">{pkg.name}</h4>
                          </div>
                        </div>
                        <span className={`text-xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r ${pkg.gradient}`}>
                          {pkg.priceFormatted}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 font-bold leading-relaxed">{pkg.desc}</p>

                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                        <span className="text-[10px] font-black text-slate-400 block">
                          رابط الدفع المباشر عبر PayPal:
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-bold text-blue-700 text-[11px] truncate" dir="ltr">
                            {pkg.paypalUrl}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(pkg.paypalUrl);
                              showToast(`تم نسخ رابط دفع ${pkg.name} بنجاح 📋`);
                            }}
                            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>نسخ الرابط</span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>ربط أوتوماتيكي مع الـ Webhook</span>
                        </span>
                        <a
                          href={pkg.paypalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#003087] via-[#0079C1] to-[#00457C] text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
                        >
                          <PayPalIcon size={16} />
                          <span>فتح صفحة الدفع</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: CUSTOMERS (سجل العملاء)                         */}
            {/* ==================================================== */}
            {currentTab === "customers" && (
              <div className="flex flex-col gap-4 text-right">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {customersList.length} تجار مسجلين
                    </span>
                    <button
                      onClick={() => setCurrentTab("trash")}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>المحذوفات ({deletedOrders.length})</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">سجل العملاء والتجار (CRM)</h3>
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full min-w-[950px] text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                      <tr>
                        <th className="p-3">التاجر والمدينة</th>
                        <th className="p-3">الهاتف الشخصي</th>
                        <th className="p-3">عدد الطلبات</th>
                        <th className="p-3">إجمالي المدفوعات المؤكدة</th>
                        <th className="p-3 text-center min-w-[200px]">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                      {customersList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-400 font-bold">
                            لا يوجد تجار مسجلين حالياً — اللوحة نظيفة تماماً
                          </td>
                        </tr>
                      ) : (
                        customersList.map((c, idx) => (
                          <tr key={idx} className="hover:bg-blue-50/50">
                            <td className="p-3 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                                {c.name.charAt(0) || "ت"}
                              </div>
                              <div>
                                <strong className="text-slate-900 font-black block text-xs">{c.name}</strong>
                                <span className="text-[10px] text-slate-400">{c.city}</span>
                              </div>
                            </td>
                            <td className="p-3 font-mono text-slate-700" dir="ltr">
                              {c.phone}
                            </td>
                            <td className="p-3 font-mono font-black text-blue-700">{c.ordersCount} طلبات</td>
                            <td className="p-3 font-mono font-black text-emerald-600">
                              {c.totalSpend.toLocaleString()} د.م
                            </td>
                            <td className="p-3 text-center min-w-[200px]">
                              <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                                <button
                                  onClick={() => setSelectedMerchant(c)}
                                  className="px-2.5 py-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs cursor-pointer transition-all shrink-0"
                                >
                                  ملف التاجر
                                </button>
                                <button
                                  onClick={() => handleDeleteMerchant(c.phone, c.name)}
                                  className="px-2 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all hover:scale-105 shrink-0"
                                >
                                  <Trash2 className="w-3 h-3 text-rose-600" />
                                  <span>حذف</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: PAYMENTS (المدفوعات وPayPal Webhook)             */}
            {/* ==================================================== */}
            {currentTab === "payments" && (
              <div className="flex flex-col gap-5 text-right">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">
                      بوابات الدفع الإلكتروني والـ PayPal Webhooks
                    </h3>
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    🟢 PayPal Webhook Listener Active
                  </span>
                </div>

                {/* PayPal Webhook Integration Box */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-[#001c4e] via-[#002f82] to-[#001740] text-white shadow-xl border border-blue-400/40 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <PayPalIcon size={28} />
                      <div>
                        <h4 className="text-base font-black text-white">
                          عنوان استقبال إشعارات الدفع (PayPal Webhook URL)
                        </h4>
                        <span className="text-xs text-blue-200">
                          يتم تأكيد الطلبات فورياً بمجرد ورود حدث PAYMENT.CAPTURE.COMPLETED
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black">
                      جاهز للاستقبال اللحظي
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3">
                    <span className="font-mono text-cyan-300 text-xs truncate font-bold" dir="ltr">
                      https://ecom-speed-pro.vercel.app/api/payment/paypal
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("https://ecom-speed-pro.vercel.app/api/payment/paypal");
                        showToast("تم نسخ رابط الـ PayPal Webhook بنجاح 📋");
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ الرابط</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-blue-300 block mb-1">المدفوعات المؤكدة:</span>
                      <strong className="text-lg font-mono font-black text-emerald-400 block">
                        {confirmedRevenue.toLocaleString()} د.م
                      </strong>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-blue-300 block mb-1">العمليات الناجحة:</span>
                      <strong className="text-lg font-mono font-black text-cyan-300 block">
                        {paidOrdersCount} عملية
                      </strong>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-blue-300 block mb-1">المعاملات المعلقة:</span>
                      <strong className="text-lg font-mono font-black text-amber-300 block">
                        {pendingOrdersCount} معلقة
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: REPORTS (التقارير المالية)                      */}
            {/* ==================================================== */}
            {currentTab === "reports" && (
              <div className="flex flex-col gap-5 text-right">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      التقرير المالي وتوزيع المبيعات حسب الباقات الأربع
                    </h3>
                    <p className="text-xs text-slate-500 font-bold mt-0.5">
                      حسابات الأرباح الصافية المعتمدة فقط على الدفع المكتمل (COMPLETED)
                    </p>
                  </div>
                  <button
                    onClick={exportCSV}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>تصدير تقرير كامل CSV</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageMetrics.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between"
                    >
                      <div>
                        <span className="text-2xl mb-1 block">{pkg.emoji}</span>
                        <h4 className="text-sm font-black text-slate-900">{pkg.name}</h4>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {pkg.priceFormatted} • {pkg.totalCount} طلبات
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] text-slate-400 font-bold block">الأرباح المؤكدة:</span>
                        <span className="text-xl font-mono font-black text-emerald-600">
                          {pkg.revenue.toLocaleString()} د.م
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: SETTINGS (الأمان والإعدادات وتطهير العدادات)    */}
            {/* ==================================================== */}
            {currentTab === "settings" && (
              <div className="flex flex-col gap-5 text-right">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">
                      إعدادات النظام والأمان وتطهير البيانات
                    </h3>
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                {/* 1. Database Purge Card (Requirement 1) */}
                <div className="p-5 rounded-3xl bg-rose-50 border-2 border-rose-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-rose-900">
                          تطهير قاعدة البيانات وتصفير العدادات إلى 0 (Purge Database)
                        </h4>
                        <p className="text-xs text-rose-600 font-bold">
                          إزالة جميع التجار والطلبات الوهمية والتجريبية بشكل نهائي وتصفير الإحصائيات
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    استخدم هذا الزر لحذف كافة الطلبات الوهمية والتجريبية المخزنة حالياً في النظام وإعادة ضبط عدادات
                    اللوحة إلى صفر (0 درهم، 0 طلبات، 0 تجار) لتكون اللوحة جاهزة وموثوقة لاستقبال مبيعاتك الحقيقية.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handlePurgeAllMockData}
                      disabled={isUpdating}
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>تطهير البيانات وتصفير العدادات إلى 0 الآن 🧹</span>
                    </button>
                  </div>
                </div>

                {/* 2. Notification & Sound Test Card (Requirement 4) */}
                <div className="p-5 rounded-3xl bg-blue-50 border-2 border-blue-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-blue-900">
                        نظام الإشعارات اللحظية والتنبيه الصوتي (Push & Audio Alerts)
                      </h4>
                      <p className="text-xs text-blue-600 font-bold">
                        تنبيه فوري على الحاسوب بصوت رنين وإشعار متصفح عند ورود أي طلب جديد
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap pt-2">
                    <button
                      onClick={requestNotifPermission}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Bell className="w-4 h-4" />
                      <span>{notifPermission === "granted" ? "إذن الإشعارات مفعّل ✓" : "تفعيل إشعارات المتصفح"}</span>
                    </button>

                    <button
                      onClick={() => {
                        playAlertBeep();
                        sendPushNotification("🔔 اختبار الإشعارات", "النظام الصوتي وإشعار سطح المكتب يعملان بنجاح!");
                        showToast("🔔 تم اختبار التنبيه الصوتي بنجاح!");
                      }}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>تشغيل رنين التنبيه التجريبي 🔊</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: TRASH (سلة المحذوفات)                           */}
            {/* ==================================================== */}
            {currentTab === "trash" && (
              <div className="flex flex-col gap-5 text-right">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-rose-50 border border-rose-200 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-rose-900">سلة المحذوفات</h3>
                      <p className="text-xs text-rose-600 font-bold">
                        {deletedOrders.length > 0
                          ? `${deletedOrders.length} عنصر محذوف — يمكنك استعادتهم أو حذفهم نهائياً`
                          : "السلة فارغة حالياً"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleClearAllTrash}
                      disabled={deletedOrders.length === 0}
                      className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>إفراغ السلة</span>
                    </button>
                  </div>
                </div>

                {deletedOrders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400 bg-white rounded-2xl border border-rose-100">
                    <Trash2 className="w-12 h-12 text-rose-200" />
                    <p className="font-black text-sm">سلة المحذوفات فارغة تماماً</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-rose-100 bg-white shadow-sm">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-rose-50 text-rose-700 font-bold border-b border-rose-100">
                        <tr>
                          <th className="p-3.5">الطلب / التاجر</th>
                          <th className="p-3.5">الباقة</th>
                          <th className="p-3.5">تاريخ الحذف</th>
                          <th className="p-3.5 text-center">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rose-50 font-bold text-slate-700">
                        {deletedOrders.map((o) => (
                          <tr key={o.id} className="hover:bg-rose-50/50">
                            <td className="p-3.5">
                              <span className="font-black text-slate-800 block text-xs">{o.customer_name}</span>
                              <span className="text-[10px] text-rose-500 font-mono font-bold">
                                {o.order_number || o.id}
                              </span>
                            </td>
                            <td className="p-3.5">{identifyPackage(o).name}</td>
                            <td className="p-3.5 font-mono text-[11px] text-slate-400">
                              {o.deleted_at ? new Date(o.deleted_at).toLocaleString("ar-MA") : "غير محدد"}
                            </td>
                            <td className="p-3.5 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleRestoreFromTrash(o.id)}
                                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                                >
                                  <Undo2 className="w-3.5 h-3.5" />
                                  <span>استعادة</span>
                                </button>
                                <button
                                  onClick={() => handlePermanentDeleteOne(o.id)}
                                  className="px-2.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                                >
                                  <Trash className="w-3.5 h-3.5" />
                                  <span>حذف نهائي</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL 1: STORE ORDER REQUIREMENTS & DETAILS (طلب المتجر)   */}
      {/* ======================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-[32px] bg-white border-2 border-slate-200 p-6 sm:p-8 text-slate-900 shadow-2xl space-y-5 my-auto animate-in zoom-in-95 duration-200 text-right">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      متطلبات وتفاصيل المتجر: {selectedOrder.store_name || "متجر التاجر"}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-black text-xs">
                      {selectedOrder.order_number}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold mt-0.5">
                    التاجر: {selectedOrder.customer_name} • {selectedOrder.customer_city || "المغرب"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Package, Payment & White-label Status Badges */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div>
                <span className="text-slate-400 font-bold block mb-0.5">الباقة الرسمية:</span>
                <span className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                  <span>{identifyPackage(selectedOrder).emoji}</span>
                  <span>{identifyPackage(selectedOrder).name}</span>
                  <span className="font-mono text-blue-700">({identifyPackage(selectedOrder).priceFormatted})</span>
                </span>
              </div>

              {/* Payment Status Badge + Toggle */}
              <div>
                <span className="text-slate-400 font-bold block mb-0.5">حالة الدفع (PayPal):</span>
                {selectedOrder.payment_status === "paid" ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>مدفوع ومؤكد بـ PayPal</span>
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-black text-xs border border-amber-300">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>معلق بانتظار الدفع</span>
                    </span>
                    <button
                      onClick={() => handleConfirmPayPalPayment(selectedOrder.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xs cursor-pointer"
                    >
                      تأكيد استلام الدفع ✓
                    </button>
                  </div>
                )}
              </div>

              {/* White-label Toggle */}
              <div>
                <span className="text-slate-400 font-bold block mb-0.5">إزالة الحقوق (White-label):</span>
                <button
                  onClick={() => handleToggleWhiteLabel(selectedOrder.id, selectedOrder.white_label)}
                  className={`px-3 py-1 rounded-full font-black text-xs border cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedOrder.white_label
                      ? "bg-purple-100 text-purple-800 border-purple-300 shadow-xs"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                  title="انقر لتفعيل أو إلغاء خيار White-label"
                >
                  <Shield className="w-3.5 h-3.5 text-purple-600" />
                  <span>{selectedOrder.white_label ? "🛡️ بدون حقوق (White-label)" : "مع حقوق المنصة"}</span>
                  <span className="text-[10px] text-blue-600 underline mr-1">(تغيير)</span>
                </button>
              </div>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-black text-slate-500 block flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-blue-600" />
                  <span>اسم متجر التاجر / المنتج:</span>
                </span>
                <strong className="text-slate-900 font-black text-sm block truncate pt-0.5">
                  {selectedOrder.store_name || "متجر قيد التسمية"}
                </strong>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                <span className="text-[11px] font-black text-emerald-800 block flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ثمن بيع المنتج للزبائن:</span>
                </span>
                <strong className="text-emerald-700 font-mono font-black text-base block pt-0.5">
                  {selectedOrder.product_price || "غير محدد"}
                </strong>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-black text-slate-500 block flex items-center gap-1.5 mb-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>هاتف استقبال الطلبيات:</span>
                  </span>
                  <strong className="text-slate-900 font-mono font-black text-xs block" dir="ltr">
                    {selectedOrder.order_phone || selectedOrder.phone_number || "—"}
                  </strong>
                </div>

                {(() => {
                  const rawP = (selectedOrder.order_phone || selectedOrder.phone_number || "").replace(/[^0-9]/g, "");
                  if (!rawP) return null;
                  const waNumber = rawP.startsWith("212") ? rawP : "212" + rawP.replace(/^0/, "");
                  return (
                    <a
                      href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                        `السلام عليكم، نتواصل معك بخصوص رقم استقبال طلبيات متجرك (${selectedOrder.store_name || "متجرك"}).`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2.5 py-1.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10.5px] flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>اختبار ومراسلة واتساب</span>
                    </a>
                  );
                })()}
              </div>
            </div>

            {/* Uploaded Product Images Gallery */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span>صور المنتج المرفوعة من التاجر:</span>
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {Array.isArray(selectedOrder.product_images) && selectedOrder.product_images.length > 0
                    ? `${selectedOrder.product_images.length} صور مرفوعة`
                    : "لا توجد صور مرفوعة"}
                </span>
              </div>

              {Array.isArray(selectedOrder.product_images) && selectedOrder.product_images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-1">
                  {selectedOrder.product_images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setPreviewImage(img)}
                      className="group relative rounded-2xl overflow-hidden border-2 border-slate-200 aspect-square bg-white cursor-pointer shadow-xs hover:shadow-lg transition-all hover:scale-105"
                    >
                      <img
                        src={img}
                        alt={`منتج ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Eye className="w-6 h-6" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
                  <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-bold">
                    لم يقم التاجر برفع صور للمنتج بعد (يمكنه إرسالها لك عبر واتساب)
                  </p>
                </div>
              )}
            </div>

            {/* Notes */}
            {selectedOrder.product_notes && (
              <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-xs">
                <span className="text-[10.5px] text-blue-800 font-black block mb-1">
                  ملاحظات إضافية وتفاصيل خاصة من التاجر:
                </span>
                <p className="text-slate-700 font-bold leading-relaxed">{selectedOrder.product_notes}</p>
              </div>
            )}

            {/* Footer */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs cursor-pointer transition-colors shadow-sm"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: MERCHANT PROFILE MODAL                          */}
      {/* ======================================================== */}
      {selectedMerchant && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-[32px] bg-white p-6 sm:p-7 text-slate-900 shadow-2xl space-y-4 my-auto animate-in zoom-in-95 duration-200 text-right">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-700 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0">
                  {selectedMerchant.name.charAt(0) || "ت"}
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{selectedMerchant.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span>{selectedMerchant.city}</span>
                    </span>
                    <span className="font-mono text-slate-500" dir="ltr">
                      {selectedMerchant.phone}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedMerchant(null)}
                className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Contact */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
              <span className="font-mono font-black text-xs text-slate-900" dir="ltr">
                {selectedMerchant.phone}
              </span>

              <div className="flex items-center gap-1.5">
                {selectedMerchant.phone && (
                  <a
                    href={`https://wa.me/${
                      selectedMerchant.phone.replace(/[^0-9]/g, "").startsWith("212")
                        ? selectedMerchant.phone.replace(/[^0-9]/g, "")
                        : "212" + selectedMerchant.phone.replace(/[^0-9]/g, "").replace(/^0/, "")
                    }?text=${encodeURIComponent(
                      `السلام عليكم أخي الكريم ${selectedMerchant.name}، نتواصل معك من إدارة Ecom Speed Pro.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>واتساب التاجر</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMerchant.phone);
                    showToast("تم نسخ رقم هاتف التاجر بنجاح 📋");
                  }}
                  className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 cursor-pointer"
                  title="نسخ رقم الهاتف"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDeleteMerchant(selectedMerchant.phone, selectedMerchant.name)}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-xs flex items-center gap-1.5 cursor-pointer border border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>حذف التاجر بالكامل 🗑️</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMerchant(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs cursor-pointer"
              >
                إغلاق الملف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: تسليم الطلب الآن ورابط المتجر النهائي           */}
      {/* ======================================================== */}
      {quickStoreOrderId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] max-w-xl w-full p-7 sm:p-8 shadow-2xl border-2 border-slate-200 text-right animate-in zoom-in-95 duration-200 space-y-5 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 shrink-0">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">تسليم الطلب الآن للعميل</h3>
                  <p className="text-xs text-slate-500 font-bold mt-0.5">
                    إدخال رابط المتجر النهائي وتحديث صفحة التتبع فوراً
                  </p>
                </div>
              </div>
              <button
                onClick={() => setQuickStoreOrderId(null)}
                className="w-10 h-10 rounded-2xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-black text-slate-900 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>رابط المتجر النهائي (Final Store Website URL):</span>
                </label>
                <input
                  type="url"
                  placeholder="https://mon-magasin.com"
                  value={quickStoreUrlInput}
                  onChange={(e) => setQuickStoreUrlInput(e.target.value)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 font-mono text-slate-900 text-sm font-bold focus:outline-none focus:border-blue-600 focus:bg-white shadow-inner transition-all"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block font-black text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>قائمة اختيار حالة التسليم:</span>
                </label>
                <select
                  value={quickStoreDeliveryStatus}
                  onChange={(e) => setQuickStoreDeliveryStatus(e.target.value as any)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-black text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white cursor-pointer shadow-inner transition-all"
                >
                  <option value="completed">🟢 مكتمل ومسلّم (المتجر جاهز وتم التسليم النهائي للعميل)</option>
                  <option value="in_progress">🔵 جاهز / جاري التجهيز (المتجر قيد المعاينة والتسليم)</option>
                </select>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setQuickStoreOrderId(null)}
                  className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleSaveStoreUrl}
                  disabled={isUpdating}
                  className="px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/25 cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
                >
                  <Rocket className="w-4 h-4" />
                  <span>تسليم الطلب الآن 🚀</span>
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
                  <h3 className="text-base font-black text-slate-900">إضافة طلب ومشروع جديد</h3>
                  <p className="text-[11px] text-slate-400 font-bold">
                    تسجيل طلب مباشر للتاجر في إحدى الباقات الأربع الرسمية فقط
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
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, customer_name: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">المدينة بالمغرب</label>
                  <input
                    type="text"
                    value={newOrderForm.customer_city}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, customer_city: e.target.value })}
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
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, phone_number: e.target.value })}
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
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, customer_email: e.target.value })}
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
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, store_name: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">سعر بيع المنتج</label>
                  <input
                    type="text"
                    placeholder="مثال: 299 د.م"
                    value={newOrderForm.product_price}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, product_price: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-emerald-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* The 4 Official Packages Selection Only */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الباقة الرسمية المحددة *</label>
                  <select
                    value={newOrderForm.plan_tier}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, plan_tier: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none cursor-pointer"
                  >
                    {OFFICIAL_PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.tierValue}>
                        {pkg.emoji} {pkg.name} ({pkg.priceFormatted})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">حالة الدفع</label>
                  <select
                    value={newOrderForm.payment_status}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, payment_status: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="pending">⏳ معلق بانتظار الدفع</option>
                    <option value="paid">🟢 مدفوع ومؤكد بـ PayPal (يحسب في الأرباح)</option>
                  </select>
                </div>
              </div>

              {/* White-label Checkbox */}
              <div
                onClick={() => setNewOrderForm({ ...newOrderForm, white_label: !newOrderForm.white_label })}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      newOrderForm.white_label ? "bg-purple-600 border-purple-600 text-white" : "border-slate-300"
                    }`}
                  >
                    {newOrderForm.white_label && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">
                      طلب إزالة حقوق الملكية (White-label)
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      متجر التاجر باسم علامته التجارية فقط بدون أي شعار للمنصة
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-purple-700">
                  {newOrderForm.white_label ? "مُفعّل ✓" : "غير مفعّل"}
                </span>
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

      {/* MODAL 5: IMAGE PREVIEW MODAL */}
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
            <img src={previewImage} alt="full view" className="w-full h-auto max-h-[80vh] rounded-2xl object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
