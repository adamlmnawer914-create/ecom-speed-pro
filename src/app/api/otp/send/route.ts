import { NextResponse } from "next/server";
import { createOtp, getOrdersByPhone } from "@/lib/db";

// POST /api/otp/send
export async function POST(req: Request) {
  try {
    const { phone_number } = await req.json();

    if (!phone_number || typeof phone_number !== "string" || phone_number.trim().length < 6) {
      return NextResponse.json(
        { success: false, message: "يرجى إدخال رقم واتساب صحيح" },
        { status: 400 }
      );
    }

    const cleanPhone = phone_number.replace(/[^0-9]/g, "");

    // Check if there are orders for this phone number
    const matchingOrders = await getOrdersByPhone(cleanPhone);
    const hasOrders = matchingOrders.length > 0;

    // Generate 4-digit OTP valid for 5 minutes
    const { code, expiresAt } = await createOtp(cleanPhone);

    // Prepare WhatsApp message link (for external gateway or manual fallback)
    const whatsappText = encodeURIComponent(
      `🔒 رمز التحقق الخاص بك لتتبع متجرك في ECOM SPEED PRO هو: *${code}*%0A(صالح لمدة 5 دقائق)`
    );
    const whatsappUrl = `https://wa.me/212${cleanPhone.replace(/^0/, "")}?text=${whatsappText}`;

    return NextResponse.json({
      success: true,
      message: "تم توليد وإرسال رمز التحقق بنجاح",
      hasOrders,
      expiresAt,
      // We provide demoCode in response so customer/admin can test directly without needing a paid SMS API
      demoCode: code,
      whatsappUrl,
    });
  } catch (error) {
    console.error("POST /api/otp/send error:", error);
    return NextResponse.json(
      { success: false, message: "فشل في إرسال رمز التحقق" },
      { status: 500 }
    );
  }
}
