import { NextResponse } from "next/server";
import { verifyOtp, getOrdersByPhone } from "@/lib/db";

// POST /api/otp/verify
export async function POST(req: Request) {
  try {
    const { phone_number, otp_code } = await req.json();

    if (!phone_number || !otp_code) {
      return NextResponse.json(
        { success: false, message: "رقم الهاتف ورمز التحقق مطلوبان" },
        { status: 400 }
      );
    }

    const cleanPhone = phone_number.replace(/[^0-9]/g, "");
    const cleanCode = String(otp_code).trim();

    const isValid = await verifyOtp(cleanPhone, cleanCode);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "رمز التحقق غير صحيح أو انتهت صلاحيته (5 دقائق)" },
        { status: 400 }
      );
    }

    // Retrieve the customer's orders
    const orders = await getOrdersByPhone(cleanPhone);

    if (orders.length === 0) {
      return NextResponse.json({
        success: true,
        hasOrders: false,
        message: "تم التحقق بنجاح ولكن لا توجد طلبات مسجلة لهذا الرقم حتى الآن",
      });
    }

    // Sort by latest order
    const latestOrder = orders[0];

    return NextResponse.json({
      success: true,
      hasOrders: true,
      orderId: latestOrder.id,
      orderNumber: latestOrder.order_number,
      redirectUrl: `/order/${latestOrder.id}`,
    });
  } catch (error) {
    console.error("POST /api/otp/verify error:", error);
    return NextResponse.json(
      { success: false, message: "فشل التحقق من الرمز" },
      { status: 500 }
    );
  }
}
