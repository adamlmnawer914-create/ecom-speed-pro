import { NextResponse } from "next/server";
import { getOrderById, updateOrder } from "@/lib/db";
import { broadcastOrderEvent } from "@/lib/broadcast";
import crypto from "crypto";

const DEFAULT_SANDBOX_PRIV_KEY = "pri_sandbox_e62e8f46-d58b-411e-bd4f-5235c";
const YOUCAN_PRIVATE_KEY = process.env.YOUCAN_PRIVATE_KEY || DEFAULT_SANDBOX_PRIV_KEY;

/**
 * POST /api/payment/callback
 * YouCan Pay Webhook — fires after successful payment
 * Verifies HMAC signature then marks the order as "in_progress"
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-youcan-hmac-sha256") || "";

    // ─── 1. Verify HMAC Signature ─────────────────────────────
    if (YOUCAN_PRIVATE_KEY && signature) {
      const computedHmac = crypto
        .createHmac("sha256", YOUCAN_PRIVATE_KEY)
        .update(rawBody)
        .digest("hex");

      if (computedHmac !== signature) {
        console.warn("YouCan Pay HMAC verification failed");
        return NextResponse.json(
          { success: false, message: "توقيع HMAC غير صحيح" },
          { status: 401 }
        );
      }
    }

    const payload = JSON.parse(rawBody);
    const { event, payment_status, transaction, metadata } = payload;

    console.log("YouCan Pay Webhook received:", {
      event,
      payment_status,
      transaction,
    });

    // ─── 2. Parse order UUID from metadata ────────────────────
    let orderUuid: string | null = null;
    let orderNumber: string | null = null;

    try {
      const meta =
        typeof metadata === "string" ? JSON.parse(metadata) : metadata;
      orderUuid = meta?.order_uuid || null;
      orderNumber = meta?.order_number || null;
    } catch (e) {}

    // Fallback: try from transaction.order_id
    if (!orderUuid && transaction?.order_id) {
      orderNumber = transaction.order_id;
    }

    if (!orderUuid && !orderNumber) {
      return NextResponse.json(
        { success: false, message: "لم يتم العثور على معرف الطلب" },
        { status: 400 }
      );
    }

    // ─── 3. Handle Payment Success ────────────────────────────
    const isPaid =
      payment_status === "paid" ||
      payment_status === "success" ||
      event === "payment.success";

    if (isPaid && orderUuid) {
      const existing = await getOrderById(orderUuid);
      if (existing) {
        const updated = await updateOrder(orderUuid, {
          status: "in_progress",
          payment_method: `YouCan Pay (${
            transaction?.payment_method || "بطاقة بنكية"
          })`,
        });

        if (updated) {
          broadcastOrderEvent({
            type: "ORDER_UPDATED",
            order: updated,
            orderId: orderUuid,
            timestamp: Date.now(),
          });
        }
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("POST /api/payment/callback error:", error);
    return NextResponse.json(
      { success: false, message: "خطأ في معالجة إشعار الدفع" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/payment/callback
 * YouCan Pay Success/Error redirect handler
 * Parses the token from query params and redirects to tracking page
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") || "";
  const status = searchParams.get("status") || "";

  // YouCan Pay sends: /callback?token=xxx&status=paid
  // We embedded order UUID in metadata — look it up via token if possible
  // For now just redirect to track page if we have any identifier
  const forwardedProto = req.headers.get("x-forwarded-proto") || "https";
  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    "ecom-speed-pro.vercel.app";
  const detectedOrigin = host.includes("localhost")
    ? `http://${host}`
    : `${forwardedProto}://${host}`;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || detectedOrigin;

  if (status === "canceled" || status === "error" || status === "failed") {
    return NextResponse.redirect(`${appUrl}/?payment=canceled`);
  }

  // Redirect to general track page — they can use OTP to find their order
  return NextResponse.redirect(`${appUrl}/track?payment=success`);
}
