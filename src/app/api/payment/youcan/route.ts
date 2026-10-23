import { NextResponse } from "next/server";
import { createOrder } from "@/lib/db";
import { broadcastOrderEvent } from "@/lib/broadcast";
import crypto from "crypto";

const DEFAULT_SANDBOX_PRIV_KEY = "pri_sandbox_e62e8f46-d58b-411e-bd4f-5235c";
const DEFAULT_SANDBOX_PUB_KEY = "pub_sandbox_58ce8ec9-8ab0-44d2-a2e1-96cd8";

const YOUCAN_PRIVATE_KEY = process.env.YOUCAN_PRIVATE_KEY || DEFAULT_SANDBOX_PRIV_KEY;
const YOUCAN_PUBLIC_KEY =
  process.env.YOUCAN_PUBLIC_KEY || process.env.NEXT_PUBLIC_YOUCAN_PUBLIC_KEY || DEFAULT_SANDBOX_PUB_KEY;
const isSandbox = YOUCAN_PRIVATE_KEY.includes("sandbox");
const YOUCAN_API_BASE = isSandbox
  ? "https://youcanpay.com/sandbox/api"
  : "https://youcanpay.com/api";


export interface YouCanTokenResponse {
  token?: { id: string };
  success?: boolean;
  message?: string;
  error?: string;
}

/**
 * POST /api/payment/youcan
 * 1. Creates the order record in DB
 * 2. Calls YouCan Pay API to create a payment token
 * 3. Returns the hosted checkout URL for redirect
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      customer_name,
      customer_city,
      phone_number,
      customer_email,
      store_name,
      product_price,
      order_phone,
      plan_tier,
      product_notes,
      product_images,
      amount, // numeric MAD amount (e.g. 1500)
      currency = "MAD",
      white_label,
      whiteLabel,
    } = body;

    // ─── 1. Validate required fields ─────────────────────────
    if (!customer_name || !phone_number || !amount) {
      return NextResponse.json(
        { success: false, message: "بيانات الطلب غير مكتملة" },
        { status: 400 }
      );
    }

    // ─── 2. Create order in DB first (status: pending) ────────
    const clientOrderId = crypto.randomUUID();

    const newOrder = await createOrder({
      id: clientOrderId,
      customer_name: customer_name.trim(),
      customer_city: customer_city?.trim() || "المغرب",
      phone_number: phone_number.trim(),
      customer_email: customer_email?.trim() || "",
      store_name: store_name?.trim() || `متجر ${customer_name.trim()}`,
      product_price: product_price?.trim() || "غير محدد",
      order_phone: order_phone?.trim() || phone_number.trim(),
      plan_tier: plan_tier || "المتجر القياسي (1,500 MAD)",
      payment_method: "YouCan Pay",
      white_label: Boolean(white_label ?? whiteLabel ?? false),
      product_notes: product_notes?.trim() || "",
      product_images: Array.isArray(product_images) ? product_images : [],
      status: "pending",
    });

    broadcastOrderEvent({
      type: "ORDER_CREATED",
      order: newOrder,
      orderId: newOrder.id,
      timestamp: Date.now(),
    });

    // ─── 3. Dynamic App URL & YouCan Pay token ───────────────
    const forwardedProto = req.headers.get("x-forwarded-proto") || "https";
    const host =
      req.headers.get("x-forwarded-host") ||
      req.headers.get("host") ||
      "ecom-speed-pro.vercel.app";
    const detectedOrigin = host.includes("localhost")
      ? `http://${host}`
      : `${forwardedProto}://${host}`;
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || detectedOrigin;

    const amountInCents = Math.round(Number(amount) * 100); // MAD → centimes
    const successUrl = `${APP_URL}/order/${newOrder.id}?payment=success`;
    const errorUrl = `${APP_URL}/order/${newOrder.id}?payment=failed`;
    const callbackUrl = `${APP_URL}/api/payment/callback`;

    let youcanCheckoutUrl: string | null = null;
    let youcanTokenId: string | null = null;

    const activePrivateKey = YOUCAN_PRIVATE_KEY;
    const activePublicKey = YOUCAN_PUBLIC_KEY;
    const isSandboxMode = activePrivateKey.includes("sandbox");
    const apiBase = isSandboxMode ? "https://youcanpay.com/sandbox/api" : "https://youcanpay.com/api";

    if (activePrivateKey) {
      try {
        const youcanRes = await fetch(`${apiBase}/tokenize`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            pri_key: activePrivateKey,
            amount: amountInCents,
            currency,
            order_id: newOrder.order_number,
            customer_ip:
              req.headers.get("x-forwarded-for") ||
              req.headers.get("x-real-ip") ||
              "127.0.0.1",
            success_url: successUrl,
            error_url: errorUrl,
            webhook_url: callbackUrl,
            customer: {
              name: customer_name.trim(),
              email: customer_email?.trim() || undefined,
              phone: phone_number.trim(),
              address: customer_city?.trim() || "المغرب",
            },
            metadata: [
              { order_uuid: newOrder.id },
              { order_number: newOrder.order_number },
              { plan_tier: plan_tier || "" },
            ],
          }),
        });

        const youcanData: YouCanTokenResponse = await youcanRes.json();
        console.log(`[YouCan Pay Status] HTTP ${youcanRes.status}:`, youcanData);

        if (youcanData?.token?.id) {
          youcanTokenId = youcanData.token.id;
          console.log(`[YouCan Pay ${isSandboxMode ? "Sandbox" : "Production"}] Token generated: ${youcanTokenId}`);
        } else {
          console.warn("YouCan Pay tokenization warning:", youcanData);
        }
      } catch (err) {
        console.error("YouCan Pay API error:", err);
      }
    } else {
      console.warn("[YouCan Pay] No private key found in process.env");
    }

    // ─── 4. Return response ───────────────────────────────────
    return NextResponse.json({
      success: true,
      order: newOrder,
      trackingUrl: `/order/${newOrder.id}`,
      youcanTokenId,
      checkoutUrl: youcanCheckoutUrl,
      // If YouCan Pay failed, we fall back to the tracking page directly
      fallback: !youcanCheckoutUrl,
    });
  } catch (error) {
    console.error("POST /api/payment/youcan error:", error);
    return NextResponse.json(
      { success: false, message: "فشل في إنشاء رابط الدفع" },
      { status: 500 }
    );
  }
}
