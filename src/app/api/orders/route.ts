import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface OrderItem {
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

const DATA_FILE_PATH = path.join(process.cwd(), "data", "orders.json");

// Initial high-profile orders to populate dashboard cleanly
const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "ESP-849201",
    customerName: "سفيان التازي (الدار البيضاء)",
    customerPhone: "+212 661 24 58 90",
    customerEmail: "soufiane.tazi@luxury-watches.ma",
    planTitle: "المتجر القياسي (Standard Store)",
    price: 1500,
    formattedPrice: "1,500 درهم",
    paymentMethod: "youcan",
    productImages: [
      "/images/card_standard_new.webp",
      "/images/card_landing_new.webp"
    ],
    productNotes: "متجر ساعات واكسسوارات رجالية فاخرة كلاسيكية - نريد واجهة سوداء وذهبية أنيقة.",
    status: "in_progress",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(), // 3 hours ago
  },
  {
    id: "ESP-910442",
    customerName: "سلمى العمراني (مراكش)",
    customerPhone: "+212 675 31 29 08",
    customerEmail: "salma.amrani@bio-cosmetics.ma",
    planTitle: "منصة التجارة المتقدمة (Advanced SaaS)",
    price: 5000,
    formattedPrice: "5,000 درهم",
    paymentMethod: "cmi",
    productImages: [
      "/images/card_saas_new.webp"
    ],
    productNotes: "علامة تجارية لمستحضرات التجميل العضوية وزيت الأركان المغربي مع ربط الدفع الإلكتروني وفواتير PDF.",
    status: "new",
    createdAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString(), // 7 hours ago
  },
  {
    id: "ESP-732019",
    customerName: "ياسين بنجلون (طنجة)",
    customerPhone: "+212 612 88 41 02",
    customerEmail: "yassine.benn@gadgetsmart.ma",
    planTitle: "صفحة الهبوط (Landing Page)",
    price: 500,
    formattedPrice: "500 درهم",
    paymentMethod: "card",
    productImages: [
      "/images/card_landing_new.webp"
    ],
    productNotes: "صفحة هبوط سريعة لمنتج ذكي مبتكر لحامل الهاتف مع مضخم صوت للسيارات.",
    status: "completed",
    createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(), // 26 hours ago
  }
];

function getStoredOrders(): OrderItem[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading orders file:", err);
  }
  return INITIAL_ORDERS;
}

function saveOrders(orders: OrderItem[]): void {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(orders, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving orders file:", err);
  }
}

// GET /api/orders
export async function GET() {
  const orders = getStoredOrders();
  return NextResponse.json({ success: true, orders });
}

// POST /api/orders
export async function POST(req: Request) {
  try {
    const newOrder: OrderItem = await req.json();

    if (!newOrder.id) {
      newOrder.id = "ESP-" + Math.floor(100000 + Math.random() * 900000);
    }
    if (!newOrder.createdAt) {
      newOrder.createdAt = new Date().toISOString();
    }
    if (!newOrder.status) {
      newOrder.status = "new";
    }

    const currentOrders = getStoredOrders();
    // Prepend to top
    const updated = [newOrder, ...currentOrders.filter((o) => o.id !== newOrder.id)];
    saveOrders(updated);

    return NextResponse.json({ success: true, order: newOrder, orders: updated });
  } catch (error) {
    console.error("Failed to save order:", error);
    return NextResponse.json(
      { success: false, message: "فشل في حفظ الطلب" },
      { status: 500 }
    );
  }
}

// PATCH /api/orders (Update status)
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, message: "معرف الطلب والحالة مطلوبان" }, { status: 400 });
    }

    const currentOrders = getStoredOrders();
    const index = currentOrders.findIndex((o) => o.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, message: "الطلب غير موجود" }, { status: 404 });
    }

    currentOrders[index].status = status;
    saveOrders(currentOrders);

    return NextResponse.json({ success: true, order: currentOrders[index], orders: currentOrders });
  } catch (error) {
    console.error("Failed to update order:", error);
    return NextResponse.json(
      { success: false, message: "فشل في تحديث حالة الطلب" },
      { status: 500 }
    );
  }
}
