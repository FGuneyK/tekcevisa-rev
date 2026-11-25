"use client";

import { useState } from "react";
import { MoveRight, Check } from "lucide-react";

const field =
  "w-full bg-transparent border-b border-neutral-200 py-3 text-[15px] text-black focus:border-black outline-none transition-colors";
const label = "block text-[10px] text-neutral-400 uppercase tracking-wider mb-2 font-medium";

export function OfficeContactForm({ office }: { office: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="bg-[#fcfcfc] border border-neutral-100 p-8 md:p-12 rounded-[2rem]">
        <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-6">
          <Check size={20} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-serif text-black mb-3">Thank you.</h3>
        <p className="text-neutral-500 text-[15px] font-light leading-relaxed max-w-md">
          Your message has been sent to our {office} office. Our team will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] border border-neutral-100 p-8 md:p-12 rounded-[2rem]">
      <h3 className="text-2xl font-serif text-black mb-10">Send a message to our {office} office</h3>
      <form
        className="space-y-10"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <input type="hidden" name="office" value={office} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <label className={label} htmlFor="oc-name">Full Name</label>
            <input id="oc-name" name="name" type="text" required className={field} placeholder="John Doe" />
          </div>
          <div>
            <label className={label} htmlFor="oc-email">Email Address</label>
            <input id="oc-email" name="email" type="email" required className={field} placeholder="john@example.com" />
          </div>
        </div>
        <div>
          <label className={label} htmlFor="oc-phone">Phone Number</label>
          <input id="oc-phone" name="phone" type="tel" className={field} placeholder="+1 (555) 000-0000" />
        </div>
        <div>
          <label className={label} htmlFor="oc-message">How can we assist you?</label>
          <textarea
            id="oc-message"
            name="message"
            rows={4}
            className={`${field} resize-none`}
            placeholder="Briefly describe your goals..."
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-black/80 transition-colors"
        >
          Send Message <MoveRight size={14} strokeWidth={1.5} />
        </button>
      </form>
    </div>
  );
}
