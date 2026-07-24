"use client";

import { useState } from "react";
import type { CaseFaq as CaseFaqItem } from "@/lib/casesData";

export function CaseFaq({ faqs }: { faqs: CaseFaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-0">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-neutral-200 first:border-t">
          <button
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            className="w-full flex items-center justify-between py-6 text-left group"
          >
            <span className="text-[16px] font-medium text-black pr-8">{faq.q}</span>
            <span
              className={`text-neutral-400 transition-transform duration-300 flex-shrink-0 ${
                openFaq === i ? "rotate-45" : ""
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M8 3v10M3 8h10" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openFaq === i ? "max-h-80 pb-6" : "max-h-0"
            }`}
          >
            <p className="text-neutral-500 text-[15px] font-light leading-relaxed pr-12">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
