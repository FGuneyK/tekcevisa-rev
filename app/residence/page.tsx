import { MoveRight } from "lucide-react";
import type { Metadata } from "next";
import { ConsultationCTA } from "@/components/ConsultationCTA";

export const metadata: Metadata = {
  title: "Residence Permits — TEKCE",
  description:
    "Secure long-term residency in Europe, the Middle East, and beyond. Residence permit programs across 7+ countries.",
};

const programs = [
  {
    country: "Spain",
    image: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=800&auto=format&fit=crop",
    investment: "From €500,000",
    timeline: "2 – 3 months",
    benefits: "EU residency",
    description: "GLive, work, and study across the Schengen area with a clear path to permanent residency.",
    href: "/residence/spain",
  },
  {
    country: "Türkiye",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
    investment: "From €75,000",
    timeline: "1 – 2 months",
    benefits: "Short-term permit",
    description: "Affordable entry point for residing in a transcontinental hub. Renewable permits with access to world-class healthcare and education.",
    href: "/residence/turkey",
  },
  {
    country: "Dubai",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop",
    investment: "From €550,000",
    timeline: "2 – 4 weeks",
    benefits: "0% income tax",
    description: "Golden Visa through property investment. Ten-year renewable residency with no income tax and a thriving business environment.",
    href: "/residence/dubai",
  },
  {
    country: "Portugal",
    image: "https://images.unsplash.com/photo-1569959220744-ff553533f492?q=80&w=800&auto=format&fit=crop",
    investment: "From €500,000",
    timeline: "4 – 6 months",
    benefits: "Path to EU citizenship",
    description: "Structured fund investment leading to permanent residency and full Portuguese citizenship. NHR tax regime for new residents.",
    href: "/residence/portugal",
  },
  {
    country: "Hungary",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=800&auto=format&fit=crop",
    investment: "From €250,000",
    timeline: "2 – 3 months",
    benefits: "EU & Schengen",
    description: "Guest Investor Programme offering residency in the heart of Europe. Real estate and government bond investment options.",
    href: "/residence/hungary",
  },
  {
    country: "Latvia",
    image: "https://images.unsplash.com/photo-1567669721460-221b82865ee0?q=80&w=800&auto=format&fit=crop",
    investment: "From €250,000",
    timeline: "1 – 3 months",
    benefits: "EU residency",
    description: "Temporary residence permit through real estate. Schengen-area access with a competitive investment threshold.",
    href: "/residence/latvia",
  },
];

const features = [
  {
    number: "01",
    title: "Live without borders",
    description: "Relocate your family to a country of your choosing with full legal rights to reside, work, and access services.",
  },
  {
    number: "02",
    title: "Flexible presence",
    description: "Many programs require minimal physical presence — ideal for global entrepreneurs and frequent travellers.",
  },
  {
    number: "03",
    title: "Path to citizenship",
    description: "Most residency permits serve as the first step toward permanent residence and eventual naturalisation.",
  },
];

export default function ResidencePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-end">
        <div
          className="absolute inset-0 bg-gray-900 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-20">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-6">
              Live and work wherever you choose.
            </h1>
            <p className="text-white/90 text-lg max-w-xl mb-6">
              Fast-track residence permits and long-term relocation pathways across the world's most desirable destinations.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Explore your options <MoveRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="py-16 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((f) => (
              <div key={f.number}>
                <div className="text-4xl font-serif text-neutral-200 mb-3">{f.number}</div>
                <h3 className="text-lg font-serif text-black mb-2">{f.title}</h3>
                <p className="text-neutral-500 text-[15px] font-light leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">Residency programs</h2>
            <p className="text-neutral-500 text-lg font-light">
              From Europe to the Middle East — each program selected for its investment merit, lifestyle quality, and legal clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <a
                key={program.country}
                href={program.href}
                className="group block border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-400 transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${program.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <h3 className="text-xl font-serif text-white">{program.country}</h3>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-neutral-500 text-[14px] font-light leading-relaxed mb-5 line-clamp-3">
                    {program.description}
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-100">
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-0.5">Investment</div>
                      <div className="text-[13px] font-medium text-black">{program.investment}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-0.5">Timeline</div>
                      <div className="text-[13px] font-medium text-black">{program.timeline}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-0.5">Benefits</div>
                      <div className="text-[13px] font-medium text-black">{program.benefits}</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA consultant={2} />
    </div>
  );
}
