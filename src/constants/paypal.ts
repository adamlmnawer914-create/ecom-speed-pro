/**
 * إعدادات وروابط الدفع المباشر عبر PayPal لوكالة Ecom Speed Pro
 * -------------------------------------------------------------
 * يتم ربط كل باقة برابط الدفع المباشر الخاص بها على PayPal.
 * بمجرد توفر روابط الباقات الأخرى (1500 درهم و 5000 درهم)،
 * يكفي وضع الرابط في الخانة المخصصة له ليتم تفعيله تلقائياً في صفحة الدفع.
 */

export const PAYPAL_PLAN_LINKS: Record<number, string> = {
  // 1. باقة صفحة الهبوط المغربية (1,500 DH / مع White-Label: 2,500 DH)
  1500: "https://www.paypal.com/ncp/payment/79PH2FAVN728E",
  2500: "https://www.paypal.com/ncp/payment/79PH2FAVN728E",

  // 2. باقة المتجر المحلي المغربي (3,000 DH / مع White-Label: 4,500 DH)
  3000: "https://www.paypal.com/ncp/payment/7XSF6ZSN9BSYG",

  // 3. باقة صفحة الهبوط الدولية (4,500 DH / مع White-Label: 7,000 DH)
  4500: "https://www.paypal.com/ncp/payment/J9ZQCGQ7J2PJN",
  7000: "https://www.paypal.com/ncp/payment/J9ZQCGQ7J2PJN",

  // 4. باقة المتجر الدولي الكامل (9,000 DH / مع White-Label: 14,000 DH)
  9000: "https://www.paypal.com/ncp/payment/PNG5TW29Q96P6",
  8500: "https://www.paypal.com/ncp/payment/PNG5TW29Q96P6",
  14000: "https://www.paypal.com/ncp/payment/PNG5TW29Q96P6",

  // Legacy fallbacks
  500: "https://www.paypal.com/ncp/payment/79PH2FAVN728E",
  5000: "https://www.paypal.com/ncp/payment/PNG5TW29Q96P6",
};

export const PAYPAL_SLUG_LINKS: Record<string, string> = {
  // 🇲🇦 السوق المحلي
  "landing-local": "https://www.paypal.com/ncp/payment/79PH2FAVN728E",
  landing: "https://www.paypal.com/ncp/payment/79PH2FAVN728E",
  "store-local": "https://www.paypal.com/ncp/payment/7XSF6ZSN9BSYG",
  standard: "https://www.paypal.com/ncp/payment/7XSF6ZSN9BSYG",

  // 🌐 السوق الدولي
  "landing-intl": "https://www.paypal.com/ncp/payment/J9ZQCGQ7J2PJN",
  "store-intl": "https://www.paypal.com/ncp/payment/PNG5TW29Q96P6",
  saas: "https://www.paypal.com/ncp/payment/PNG5TW29Q96P6",
  vip: "https://www.paypal.com/ncp/payment/PNG5TW29Q96P6",
};

/**
 * دالة مساعدة للتحقق مما إذا كان للباقة رابط دفع PayPal واسترجاعه
 */
export function getPayPalPaymentLink(
  amount?: number | string | null,
  planSlugOrTitle?: string | null
): string | null {
  // 1. فحص دقيق بالاسم أو المعرف
  if (planSlugOrTitle) {
    const slug = planSlugOrTitle.toLowerCase().trim();

    // صفحة هبوط محلية (1,500 DH)
    if (
      slug.includes("landing-local") ||
      (slug.includes("هبوط") && slug.includes("محلي")) ||
      (slug.includes("landing") && (slug.includes("local") || slug.includes("morocco") || slug.includes("مغرب")))
    ) {
      return PAYPAL_SLUG_LINKS["landing-local"];
    }

    // متجر محلي (3,000 DH)
    if (
      slug.includes("store-local") ||
      (slug.includes("متجر") && slug.includes("محلي")) ||
      (slug.includes("store") && (slug.includes("local") || slug.includes("morocco")))
    ) {
      return PAYPAL_SLUG_LINKS["store-local"];
    }

    // صفحة هبوط دولية (4,500 DH)
    if (
      slug.includes("landing-intl") ||
      (slug.includes("هبوط") && (slug.includes("دولي") || slug.includes("intl")))
    ) {
      return PAYPAL_SLUG_LINKS["landing-intl"];
    }

    // متجر دولي (9,000 DH / VIP)
    if (
      slug.includes("store-intl") ||
      (slug.includes("متجر") && (slug.includes("دولي") || slug.includes("intl"))) ||
      slug.includes("saas") ||
      slug.includes("متقدمة") ||
      slug.includes("vip")
    ) {
      return PAYPAL_SLUG_LINKS["store-intl"];
    }
  }

  // 2. فحص بالسعر الرقمي
  if (amount !== undefined && amount !== null) {
    const num = typeof amount === "number" ? amount : parseInt(String(amount).replace(/[^0-9]/g, ""), 10);
    if (!isNaN(num) && PAYPAL_PLAN_LINKS[num] && PAYPAL_PLAN_LINKS[num].trim() !== "") {
      return PAYPAL_PLAN_LINKS[num].trim();
    }
  }

  // 3. فحص عام بالمعرّف أو اسم الباقة
  if (planSlugOrTitle) {
    const slug = planSlugOrTitle.toLowerCase().trim();
    if (slug.includes("landing") || slug.includes("هبوط")) {
      return PAYPAL_SLUG_LINKS["landing-local"];
    }
    if (slug.includes("standard") || slug.includes("قياسي")) {
      return PAYPAL_SLUG_LINKS["store-local"];
    }
    if (slug.includes("saas") || slug.includes("متقدمة") || slug.includes("vip")) {
      return PAYPAL_SLUG_LINKS["store-intl"];
    }
  }

  return null;
}
