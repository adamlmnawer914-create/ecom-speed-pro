import { NextResponse } from "next/server";
import { getOrderById, updateOrder } from "@/lib/db";
import { broadcastOrderEvent } from "@/lib/broadcast";

/**
 * POST /api/payment/confirm
 * Called when client lands on /order/[id]?payment=success or completes payment via ycpay.js
 * Safely marks the order as in_progress and notifies admin panel in real-time
 */
export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "معرف الطلب مطلوب" },
        { status: 400 }
      );
    }

    const existing = await getOrderById(orderId);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "الطلب غير موجود" },
        { status: 404 }
      );
    }

    // Only update if still pending
    if (existing.status === "pending") {
      const updated = await updateOrder(orderId, {
        status: "in_progress",
        payment_method: "YouCan Pay (بطاقة بنكية معتمدة)",
      });

      if (updated) {
        broadcastOrderEvent({
          type: "ORDER_UPDATED",
          order: updated,
          orderId,
          timestamp: Date.now(),
        });
      }

      return NextResponse.json({ success: true, order: updated });
    }

    return NextResponse.json({ success: true, order: existing });
  } catch (err) {
    console.error("POST /api/payment/confirm error:", err);
    return NextResponse.json(
      { success: false, message: "خطأ في تأكيد الدفع" },
      { status: 500 }
    );
  }
}
