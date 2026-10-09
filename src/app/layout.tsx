import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "ECOM SPEED PRO | حلول التجارة الإلكترونية والتسويق الرقمي",
  description:
    "متجرك الإلكتروني الاحترافي جاهز للنجاح الآن. احصل على متجر متكامل مع تصميم عصري وتجربة مستخدم استثنائية لزيادة المبيعات وتحقيق أفضل النتائج.",
  keywords: [
    "متجر إلكتروني",
    "صفحة هبوط",
    "تجارة إلكترونية",
    "Ecom Speed Pro",
    "تصميم مواقع المغرب",
    "الدفع عند الاستلام",
    "SaaS",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-cairo bg-[#edf4fe] text-[#0c1833] selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
