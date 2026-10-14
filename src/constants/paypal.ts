/**
 * إعدادات وروابط الدفع المباشر عبر PayPal لوكالة Ecom Speed Pro
 * -------------------------------------------------------------
 * يتم ربط كل باقة برابط الدفع المباشر الخاص بها على PayPal.
 * بمجرد توفر روابط الباقات الأخرى (1500 درهم و 5000 درهم)،
 * يكفي وضع الرابط في الخانة المخصصة له ليتم تفعيله تلقائياً في صفحة الدفع.
 */

export const PAYPAL_PLAN_LINKS: Record<number, string> = {
  // باقة صفحة الهبوط Landing Page (500 MAD)
  500: "https://www.paypal.com/ncp/payment/Y3XY2UHJXNPNQ",

  // باقة المتجر القياسي Standard Store (1,500 MAD)
  1500: "https://www.paypal.com/ncp/payment/F9LVZY4SZ69YS",

  // باقة منصة التجارة المتقدمة Advanced SaaS / VIP (5,000 MAD)
  5000: "https://www.paypal.com/ncp/payment/SQST993PM5JW2",
};

export const PAYPAL_SLUG_LINKS: Record<string, string> = {
  landing: "https://www.paypal.com/ncp/payment/Y3XY2UHJXNPNQ",
  standard: "https://www.paypal.com/ncp/payment/F9LVZY4SZ69YS",
  saas: "https://www.paypal.com/ncp/payment/SQST993PM5JW2",
  vip: "https://www.paypal.com/ncp/payment/SQST993PM5JW2",
};

/**
 * دالة مساعدة للتحقق مما إذا كان للباقة رابط دفع PayPal واسترجاعه
 */
export function getPayPalPaymentLink(
  amount?: number | string | null,
  planSlugOrTitle?: string | null
): string | null {
  // 1. فحص بالسعر الرقمي
  if (amount !== undefined && amount !== null) {
    const num = typeof amount === "number" ? amount : parseInt(String(amount).replace(/[^0-9]/g, ""), 10);
    if (!isNaN(num) && PAYPAL_PLAN_LINKS[num] && PAYPAL_PLAN_LINKS[num].trim() !== "") {
      return PAYPAL_PLAN_LINKS[num].trim();
    }
  }

  // 2. فحص بالمعرّف أو اسم الباقة
  if (planSlugOrTitle) {
    const slug = planSlugOrTitle.toLowerCase().trim();
    if (slug.includes("landing") || slug.includes("هبوط") || slug === "500") {
      return PAYPAL_PLAN_LINKS[500];
    }
    if (slug.includes("standard") || slug.includes("قياسي") || slug.includes("1500")) {
      return PAYPAL_PLAN_LINKS[1500] || null;
    }
    if (slug.includes("saas") || slug.includes("متقدمة") || slug.includes("vip") || slug.includes("5000")) {
      return PAYPAL_PLAN_LINKS[5000] || null;
    }
  }

  return null;
}
