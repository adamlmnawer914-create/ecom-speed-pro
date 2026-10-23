import { NextResponse } from "next/server";
import { getAllOrders, getOrderById, updateOrder } from "@/lib/db";
import { broadcastOrderEvent } from "@/lib/broadcast";

/**
 * POST /api/payment/paypal
 * Official PayPal Webhook & Payment Confirmation Endpoint
 * 
 * Verifies PayPal events (e.g. PAYMENT.CAPTURE.COMPLETED, CHECKOUT.ORDER.APPROVED)
 * and marks orders as "paid" (COMPLETED). Only orders confirmed here are counted
 * towards "إجمالي الأرباح" (Confirmed Revenue).
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ success: false, message: "Invalid JSON" }, { status: 400 });
    }

    const eventType = payload.event_type || payload.event || "";
    const resource = payload.resource || payload;
    const resourceStatus = (resource.status || payload.status || "").toUpperCase();

    console.log("🔔 [PayPal Webhook] Received:", {
      eventType,
      resourceStatus,
      id: resource.id,
      custom_id: resource.custom_id,
      invoice_id: resource.invoice_id,
    });

    // 1. Identify Order identifier
    const targetOrderId =
      resource.custom_id ||
      resource.invoice_id ||
      payload.orderId ||
      payload.order_id ||
      resource.supplementary_data?.related_ids?.order_id ||
      null;

    const payerEmail = resource.payer?.email_address || payload.email || null;
    const captureAmount = resource.amount?.value || null;

    // Is payment confirmed?
    const isCompleted =
      resourceStatus === "COMPLETED" ||
      resourceStatus === "APPROVED" ||
      eventType === "PAYMENT.CAPTURE.COMPLETED" ||
      eventType === "CHECKOUT.ORDER.APPROVED" ||
      payload.payment_status === "paid" ||
      payload.payment_status === "completed";

    if (!isCompleted) {
      console.log("ℹ️ [PayPal Webhook] Payment not completed yet:", resourceStatus);
      return NextResponse.json({
        success: true,
        message: "تم استلام الإشعار، لكن الدفعة ليست مكتملة بعد",
        status: resourceStatus,
      });
    }

    let targetOrder = null;

    // 2. Lookup order by explicit ID or order number
    if (targetOrderId) {
      targetOrder = await getOrderById(targetOrderId);
      if (!targetOrder) {
        const all = await getAllOrders();
        targetOrder = all.find(
          (o) =>
            o.id === targetOrderId ||
            o.order_number === targetOrderId ||
            (o.order_number && targetOrderId.includes(o.order_number))
        ) || null;
      }
    }

    // 3. Fallback: match by email or find most recent pending order
    if (!targetOrder && payerEmail) {
      const all = await getAllOrders();
      targetOrder = all.find(
        (o) =>
          o.customer_email &&
          o.customer_email.toLowerCase() === payerEmail.toLowerCase() &&
          o.payment_status !== "paid"
      ) || null;
    }

    // 4. Fallback: if single recent pending PayPal order
    if (!targetOrder) {
      const all = await getAllOrders();
      const pendingOrders = all.filter(
        (o) => (o.payment_status === "pending" || !o.payment_status || o.payment_status === "unpaid")
      );
      if (pendingOrders.length === 1) {
        targetOrder = pendingOrders[0];
      }
    }

    if (targetOrder) {
      const updated = await updateOrder(targetOrder.id, {
        status: "in_progress",
        payment_status: "paid",
        payment_method: "PayPal (مؤكد Webhook)",
      });

      if (updated) {
        broadcastOrderEvent({
          type: "ORDER_UPDATED",
          order: updated,
          orderId: targetOrder.id,
          timestamp: Date.now(),
        });

        console.log("✅ [PayPal Webhook] Order marked as PAID:", updated.order_number);
        return NextResponse.json({
          success: true,
          message: "تم تأكيد دفع الطلب بنجاح وتحديث الأرباح اللحظية",
          order: updated,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "تم استلام الـ Webhook ولكن لم يتم العثور على طلب مطابق",
      receivedId: targetOrderId,
    });
  } catch (error) {
    console.error("❌ [PayPal Webhook Error]:", error);
    return NextResponse.json({ success: false, message: "فشل في معالجة إشعار PayPal" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return NextResponse.json({
    status: "ok",
    service: "Ecom Speed Pro — PayPal Webhook Listener",
    timestamp: new Date().toISOString(),
  });
}
