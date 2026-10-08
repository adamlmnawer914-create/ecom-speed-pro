"use client";

import React from "react";
import Image from "next/image";

export default function FeaturesRibbon() {
  return (
    <section id="features" className="w-full px-4 py-3 md:py-4 relative z-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative rounded-full overflow-hidden drop-shadow-[0_10px_35px_rgba(37,99,235,0.16)] transition-all duration-300 hover:scale-[1.008] hover:drop-shadow-[0_14px_45px_rgba(37,99,235,0.26)]">
          <Image
            src="/images/ribbon_exact_clean.png"
            alt="مميزات وثقة Ecom Speed Pro: تخصيص متكامل، تصميم احترافي، تسليم سريع، أمان وحماية، دعم فني مستمر"
            width={2172}
            height={230}
            priority
            className="w-full h-auto object-contain block"
          />

          {/* Interactive grid overlay for subtle hover ripples and tooltips */}
          <div className="absolute inset-0 grid grid-cols-5 pointer-events-auto">
            <div className="hover:bg-blue-500/5 transition-colors cursor-pointer rounded-r-full" title="تخصيص متكامل حسب احتياجاتك" />
            <div className="hover:bg-blue-500/5 transition-colors cursor-pointer" title="تصميم احترافي يتناسب مع علامتك التجارية" />
            <div className="hover:bg-blue-500/5 transition-colors cursor-pointer" title="تسليم سريع في أقل وقت ممكن" />
            <div className="hover:bg-blue-500/5 transition-colors cursor-pointer" title="أمان وحماية لحسابك وبياناتك ومعلوماتك" />
            <div className="hover:bg-blue-500/5 transition-colors cursor-pointer rounded-l-full" title="دعم فني مستمر نحن معك دائماً" />
          </div>
        </div>
      </div>
    </section>
  );
}
