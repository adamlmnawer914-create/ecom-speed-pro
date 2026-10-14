"use client";

import React from "react";

interface PayPalIconProps {
  className?: string;
  size?: number;
}

export default function PayPalIcon({
  className = "",
  size = 20,
}: PayPalIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Official PayPal Dual-P Vector */}
      <path
        d="M7.076 21.337H3.47a.84.84 0 0 1-.83-.956L5.787 2.45a.99.99 0 0 1 .978-.838h6.467c3.153 0 5.488 1.488 5.174 4.673-.34 3.447-2.617 5.253-5.69 5.253H9.72a.84.84 0 0 0-.83.708l-1.02 6.471-.794 2.62z"
        fill="#003087"
      />
      <path
        d="M19.143 7.828c-.34 3.447-2.617 5.253-5.69 5.253H10.46a.84.84 0 0 0-.83.708l-1.127 7.151a.63.63 0 0 0 .622.729h3.407a.84.84 0 0 0 .83-.708l.707-4.482.045-.226a.84.84 0 0 1 .83-.708h.525c2.81 0 5.01-1.141 5.654-4.475.27-1.396.113-2.557-.492-3.37a3.52 3.52 0 0 0-.681-.872z"
        fill="#0079C1"
      />
      <path
        d="M17.844 7.214a5.617 5.617 0 0 0-1.235-.929c-.775-.417-1.782-.673-3.033-.673H7.852a.99.99 0 0 0-.978.838l-1.89 12.022.023-.008.794-2.62 1.02-6.471a.84.84 0 0 1 .83-.708h2.993c3.073 0 5.35-1.806 5.69-5.253.073-.74-.012-1.365-.246-1.879"
        fill="#00457C"
      />
    </svg>
  );
}
