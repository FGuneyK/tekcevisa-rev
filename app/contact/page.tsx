"use client";

import { MoveRight, Phone, Mail, MapPin } from "lucide-react";
import { ConsultationCTA } from "@/components/ConsultationCTA";

export default function ContactPage() {
  const officeGroups = [
    {
      country: "Türkiye",
      cities: ["İstanbul", "Antalya", "Ankara", "Bodrum", "Muğla", "Mersin", "Bursa", "Trabzon", "Yalova", "İzmir"],
    },
    {
      country: "Spain",
      cities: ["Málaga", "Alicante", "Barcelona"],
    },
    {
      country: "United Arab Emirates",
      cities: ["Dubai"],
    },
    {
      country: "Cyprus",
      cities: ["Girne"],
    },
    {
      country: "Sweden",
      cities: ["Stockholm"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-end">
        <div
          className="absolute inset-0 bg-gray-900 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-20">
          <div className="max-w-4xl">
            <div className="text-sm text-white/60 uppercase tracking-wider mb-4 font-medium">
              Get in Touch
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] tracking-tight text-white mb-6">
              Let&apos;s start the conversation.
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Connect with our specialized legal advisors. Whether you seek strategic residency planning or seamless global relocation, our experts across offices are here to guide you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left: Contact Info & Form */}
            <div className="lg:col-span-7">
              <div className="mb-16">
                <div className="text-[11px] text-neutral-400 uppercase tracking-[0.2em] font-medium mb-6">Direct Channels</div>
                <div className="flex flex-col sm:flex-row gap-12">
                  <div>
                    <div className="text-sm text-neutral-400 mb-2">General Inquiries</div>
                    <a href="mailto:info@tekcevisa.com" className="text-xl font-serif text-black hover:text-accent transition-colors">info@tekcevisa.com</a>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400 mb-2">WhatsApp & Call</div>
                    <a href="tel:+905551234567" className="text-xl font-serif text-black hover:text-accent transition-colors">+90 555 123 45 67</a>
                  </div>
                </div>
              </div>

              {/* Minimalist Form */}
              <div className="bg-[#fcfcfc] border border-neutral-100 p-8 md:p-12 rounded-[2rem]">
                <h3 className="text-2xl font-serif text-black mb-10">Send a confidential message</h3>
                <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-wider mb-2 font-medium">Full Name</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-neutral-200 py-3 text-[15px] text-black focus:border-black outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-wider mb-2 font-medium">Email Address</label>
                      <input
                        type="email"
                        className="w-full bg-transparent border-b border-neutral-200 py-3 text-[15px] text-black focus:border-black outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-wider mb-2 font-medium">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full bg-transparent border-b border-neutral-200 py-3 text-[15px] text-black focus:border-black outline-none transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-wider mb-2 font-medium">Country of Interest</label>
                      <select
                        defaultValue=""
                        className="w-full bg-transparent border-b border-neutral-200 py-3 text-[15px] text-black focus:border-black outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-neutral-400">Select a country</option>
                        <option value="turkey">Türkiye</option>
                        <option value="spain">Spain</option>
                        <option value="uae">United Arab Emirates</option>
                        <option value="portugal">Portugal</option>
                        <option value="other">Other / Not sure</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase tracking-wider mb-2 font-medium">How can we assist you?</label>
                    <textarea
                      rows={4}
                      className="w-full bg-transparent border-b border-neutral-200 py-3 text-[15px] text-black focus:border-black outline-none transition-colors resize-none"
                      placeholder="Briefly describe your goals..."
                    />
                  </div>
                  <button className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-black/80 transition-colors">
                    Submit Inquiry <MoveRight size={14} strokeWidth={1.5} />
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Global Offices */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="text-[11px] text-neutral-400 uppercase tracking-[0.2em] font-medium mb-10">Global Presence</div>

                <div className="space-y-12">
                  {officeGroups.map((group) => (
                    <div key={group.country}>
                      <h4 className="text-lg font-serif text-black mb-5 flex items-center gap-3">
                        <MapPin size={16} className="text-accent" strokeWidth={1.5} />
                        {group.country}
                      </h4>
                      <ul className="flex flex-wrap gap-x-4 gap-y-3">
                        {group.cities.map((city, idx) => (
                          <li key={city} className="flex items-center gap-4">
                            <span className="text-[15px] text-neutral-500 font-light">{city}</span>
                            {idx < group.cities.length - 1 && (
                              <span className="w-1 h-1 rounded-full bg-neutral-200" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-16 pt-10 border-t border-neutral-100">
                  <p className="text-neutral-500 text-[14px] font-light leading-relaxed">
                    Consultations are strictly confidential and tailored to your personal requirements. Meetings can be held physically at any of our 16 offices worldwide or virtually via a secure video link.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Adding a Consultation CTA at the bottom for continuity */}
      <ConsultationCTA consultant={4} />
    </div>
  );
}
