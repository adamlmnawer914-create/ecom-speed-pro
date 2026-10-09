"use client";

import React from "react";
import Image from "next/image";

interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

export default function WhatsAppIcon({
  className = "",
  size = 28,
}: WhatsAppIconProps) {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 filter drop-shadow-[0_4px_12px_rgba(37,211,102,0.45)] transition-transform hover:scale-110 duration-200 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/whatsapp_exact_icon.png"
        alt="واتساب Ecom Speed Pro"
        width={120}
        height={120}
        priority
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
}
