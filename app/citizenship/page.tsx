import { MoveRight } from "lucide-react";
import type { Metadata } from "next";
import { ConsultationCTA } from "@/components/ConsultationCTA";

export const metadata: Metadata = {
  title: "Citizenship by Investment — TEKCE",
  description:
    "Acquire a second passport through investment. Citizenship programs in Türkiye, Portugal, Malta, and the Caribbean.",
};

const programs = [
  {
    country: "Türkiye",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
    investment: "From €400,000",
    timeline: "3 – 6 months",
    visaFree: "118+ countries",
    description: "Real estate investment pathway with one of the fastest processing times in Europe. Full family inclusion with no residency requirement.",
    href: "/citizenship/turkey",
  },
  {
    country: "Portugal",
    image: "https://images.unsplash.com/photo-1569959220744-ff553533f492?q=80&w=800&auto=format&fit=crop",
    investment: "From €500,000",
    timeline: "12 – 18 months",
    visaFree: "191+ countries",
    description: "Golden Visa pathway leading to permanent residency and citizenship. Access to the entire European Union and Schengen area.",
    href: "/citizenship/portugal",
  },
  {
    country: "Malta",
    image: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=800&auto=format&fit=crop",
    investment: "From €690,000",
    timeline: "12 – 36 months",
    visaFree: "190+ countries",
    description: "Direct citizenship by exceptional investment. Full EU citizenship with one of the world's strongest passports.",
    href: "/citizenship/malta",
  },
  {
    country: "Caribbean",
    image: "https://images.unsplash.com/photo-1580541631950-7282082b53ce?q=80&w=800&auto=format&fit=crop",
    investment: "From €100,000",
    timeline: "2 – 4 months",
    visaFree: "144+ countries",
    description: "The most accessible citizenship programs globally. Multiple island nations offering fast-track passports through donation or real estate.",
    href: "/citizenship/caribbean",
  },
];

const advantages = [
  { title: "Global Mobility", description: "Visa-free or visa-on-arrival access to 100+ countries with a second passport." },
  { title: "Wealth Protection", description: "Diversify your assets and secure your family's future across jurisdictions." },
  { title: "Tax Optimisation", description: "Legitimate tax planning through dual residency and citizenship structures." },
  { title: "Family Legacy", description: "Pass citizenship to future generations. Spouses and children included from day one." },
];

export default function CitizenshipPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-end">
        <div
          className="absolute inset-0 bg-gray-900 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-20">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-6">
              A second passport for your family.
            </h1>
            <p className="text-white/90 text-lg max-w-xl mb-6">
              Citizenship by investment, ancestry, and naturalisation — structured with precision and discretion.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Start your application <MoveRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">Available programs</h2>
            <p className="text-neutral-500 text-lg font-light">
              Each program is tailored to different investment profiles, timelines, and mobility goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <a
                key={program.country}
                href={program.href}
                className="group block border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-400 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${program.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-5 left-6">
                    <h3 className="text-2xl font-serif text-white">{program.country}</h3>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-neutral-500 text-[15px] font-light leading-relaxed mb-6">
                    {program.description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-100">
                    <div>
                      <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-1">Investment</div>
                      <div className="text-sm font-medium text-black">{program.investment}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-1">Timeline</div>
                      <div className="text-sm font-medium text-black">{program.timeline}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-1">Visa-Free</div>
                      <div className="text-sm font-medium text-black">{program.visaFree}</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">Why a second citizenship</h2>
            <p className="text-neutral-500 text-lg font-light">
              Beyond travel freedom — a strategic decision for your family, your assets, and your future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, i) => (
              <div key={i} className="group">
                <div className="text-5xl font-serif text-neutral-200 mb-4 group-hover:text-accent transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-serif text-black mb-2">{adv.title}</h3>
                <p className="text-neutral-500 text-[15px] font-light leading-relaxed">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA consultant={4} />
    </div>
  );
}
