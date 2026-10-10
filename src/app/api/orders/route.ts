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

// Clean initial orders (starts empty waiting for real customer purchases)
const INITIAL_ORDERS: OrderItem[] = [];

function getStoredOrders(): OrderItem[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading orders file:", err);
  }
  return [];
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

// DELETE /api/orders (Delete an order)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "معرف الطلب مطلوب" }, { status: 400 });
    }

    const currentOrders = getStoredOrders();
    const updated = currentOrders.filter((o) => o.id !== id);
    saveOrders(updated);

    return NextResponse.json({ success: true, message: "تم حذف الطلب بنجاح", orders: updated });
  } catch (error) {
    console.error("Failed to delete order:", error);
    return NextResponse.json({ success: false, message: "فشل في حذف الطلب" }, { status: 500 });
  }
}

