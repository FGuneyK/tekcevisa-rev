"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const para = "text-neutral-600 text-[17px] font-light leading-[1.8]";

/** Office text: first paragraph always visible, the rest folds open. */
export function OfficeIntro({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const [first, ...rest] = paragraphs;

  return (
    <div>
      <p className={para}>{first}</p>

      {rest.length > 0 && (
        <>
          <div
            id="office-intro-more"
            className={`grid transition-[grid-template-rows] duration-500 ease-out ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-6 pt-6">
                {rest.map((p, i) => (
                  <p key={i} className={para}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="office-intro-more"
            className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] font-medium text-black hover:text-accent transition-colors"
          >
            <span className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center">
              {open ? <Minus size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
            </span>
            {open ? "Show less" : "Read more"}
          </button>
        </>
      )}
    </div>
  );
}
