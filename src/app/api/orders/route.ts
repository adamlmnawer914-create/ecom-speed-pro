import { NextResponse } from "next/server";
import {
  getAllOrders,
  getOrderById,
  getOrdersByPhone,
  createOrder,
  updateOrder,
  deleteOrder,
  deleteCustomerOrders,
  Order,
} from "@/lib/db";

// GET /api/orders
// Supported queries: ?id=UUID or ?phone=06... or no param (all orders)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const phone = searchParams.get("phone");

    const noCacheHeaders = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    };

    if (id) {
      const order = await getOrderById(id);
      if (!order) {
        return NextResponse.json(
          { success: false, message: "لم يتم العثور على الطلب" },
          { status: 404, headers: noCacheHeaders }
        );
      }
      return NextResponse.json({ success: true, order }, { headers: noCacheHeaders });
    }

    if (phone) {
      const orders = await getOrdersByPhone(phone);
      return NextResponse.json({ success: true, orders }, { headers: noCacheHeaders });
    }

    const orders = await getAllOrders();
    return NextResponse.json({ success: true, orders }, { headers: noCacheHeaders });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { success: false, message: "فشل استرجاع بيانات الطلبات" },
      { status: 500 }
    );
  }
}

// POST /api/orders (Create new guest order with secret UUID)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Normalize field names
    const orderPayload: Partial<Order> = {
      customer_name: body.customer_name || body.customerName || "عميل مميز",
      phone_number: body.phone_number || body.customerPhone || body.phone || "",
      plan_tier: body.plan_tier || body.planTitle || body.plan || "المتجر القياسي (1,500 MAD)",
      status: body.status || "pending",
      delivered_url: body.delivered_url || null,
      payment_method: body.payment_method || body.paymentMethod || "بطاقة بنكية",
      product_notes: body.product_notes || body.productNotes || "",
      product_images: body.product_images || body.productImages || [],
    };

    const newOrder = await createOrder(orderPayload);

    return NextResponse.json({
      success: true,
      order: newOrder,
      trackingUrl: `/order/${newOrder.id}`,
    });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, message: "فشل في تسجيل الطلب" },
      { status: 500 }
    );
  }
}

// PATCH /api/orders (Update status / delivered_url)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, delivered_url } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "معرف الطلب مطلوب" },
        { status: 400 }
      );
    }

    const updates: Partial<Order> = {};
    if (status) updates.status = status;
    if (delivered_url !== undefined) updates.delivered_url = delivered_url;

    const updated = await updateOrder(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "الطلب غير موجود" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("PATCH /api/orders error:", error);
    return NextResponse.json(
      { success: false, message: "فشل في تحديث بيانات الطلب" },
      { status: 500 }
    );
  }
}

// DELETE /api/orders
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const phone = searchParams.get("phone");
    const customer = searchParams.get("customer");

    if (!id && !phone && !customer) {
      return NextResponse.json(
        { success: false, message: "معرف الطلب أو بيانات العميل مطلوبة للحذف" },
        { status: 400 }
      );
    }

    if (id) {
      await deleteOrder(id);
    }

    if (phone || customer) {
      await deleteCustomerOrders(phone || "", customer || "");
    }

    return NextResponse.json({ success: true, message: "تم حذف البيانات بنجاح" });
  } catch (error) {
    console.error("DELETE /api/orders error:", error);
    return NextResponse.json(
      { success: false, message: "فشل في حذف الطلب" },
      { status: 500 }
    );
  }
}
