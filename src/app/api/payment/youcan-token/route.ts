import { NextResponse } from "next/server";

// GET /api/payment/youcan-token?orderId=xxx
// Returns a fresh YouCan Pay token for a given order UUID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId") || "";
  const amount = parseInt(searchParams.get("amount") || "1500", 10);
  const currency = searchParams.get("currency") || "MAD";
  const customerName = searchParams.get("name") || "عميل مميز";
  const customerEmail = searchParams.get("email") || "";
  const customerPhone = searchParams.get("phone") || "";
  const customerCity = searchParams.get("city") || "المغرب";

  const PRIV_KEY = process.env.YOUCAN_PRIVATE_KEY || "pri_sandbox_e62e8f46-d58b-411e-bd4f-5235c";
  const isSandbox = PRIV_KEY.includes("sandbox");
  const apiBase = isSandbox
    ? "https://youcanpay.com/sandbox/api"
    : "https://youcanpay.com/api";

  const forwardedProto = req.headers.get("x-forwarded-proto") || "https";
  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    "ecom-speed-pro.vercel.app";
  const detectedOrigin = host.includes("localhost")
    ? `http://${host}`
    : `${forwardedProto}://${host}`;
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || detectedOrigin;

  try {
    const amountInCents = Math.round(amount * 100);
    const res = await fetch(`${apiBase}/tokenize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        pri_key: PRIV_KEY,
        amount: amountInCents,
        currency,
        order_id: orderId || `ESP-${Date.now()}`,
        customer_ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
        success_url: `${APP_URL}/order/${orderId}?payment=success`,
        error_url: `${APP_URL}/order/${orderId}?payment=failed`,
        webhook_url: `${APP_URL}/api/payment/callback`,
        customer: {
          name: customerName,
          email: customerEmail || undefined,
          phone: customerPhone,
          address: customerCity,
        },
        metadata: [{ order_uuid: orderId }],
      }),
    });

    const data = await res.json();
    if (data?.token?.id) {
      return NextResponse.json({
        success: true,
        tokenId: data.token.id,
        isSandbox,
        publicKey:
          process.env.NEXT_PUBLIC_YOUCAN_PUBLIC_KEY ||
          "pub_sandbox_58ce8ec9-8ab0-44d2-a2e1-96cd8",
      });
    }

    return NextResponse.json(
      { success: false, error: data },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
