import { MoveRight } from "lucide-react";
import CountryCarousel, { Country } from "@/components/CountryCarousel";

const residencyCountries: Country[] = [
  { name: "Spain", image: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=800&auto=format&fit=crop", href: "/residency/spain" },
  { name: "Türkiye", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop", href: "/residency/turkey" },
  { name: "Hungary", image: "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=800&auto=format&fit=crop", href: "/residency/hungary" },
  { name: "Dubai", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop", href: "/residency/dubai" },
  { name: "Portugal", image: "https://images.unsplash.com/photo-1569959220744-ff553533f492?q=80&w=800&auto=format&fit=crop", href: "/residency/portugal" },
  { name: "Latvia", image: "https://images.unsplash.com/photo-1567669721460-221b82865ee0?q=80&w=800&auto=format&fit=crop", href: "/residency/latvia" },
  { name: "Malta", image: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=800&auto=format&fit=crop", href: "/residency/malta" },
];

const citizenshipCountries: Country[] = [
  { name: "Türkiye", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop", href: "/citizenship/turkey" },
  { name: "Portugal", image: "https://images.unsplash.com/photo-1569959220744-ff553533f492?q=80&w=800&auto=format&fit=crop", href: "/citizenship/portugal" },
  { name: "Caribbean", image: "https://images.unsplash.com/photo-1580541631950-7282082b53ce?q=80&w=800&auto=format&fit=crop", href: "/citizenship/caribbean" },
  { name: "Malta", image: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=800&auto=format&fit=crop", href: "/citizenship/malta" },
];

import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Services from "@/components/Services";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { PodcastCTA } from "@/components/PodcastCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-end">
        <div
          className="absolute inset-0 bg-gray-900 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1604145195376-e2c8195adf29?q=100&w=2075&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-20">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-6">
              Legal counsel for lives that cross borders.
            </h1>
            <p className="text-white/90 text-lg max-w-xl mb-6">
              Citizenship, residence, and relocation guidance for individuals and
              families building a life across countries.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Book a Consultation <MoveRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Residency — white background */}
      <section className="py-12 sm:py-12 bg-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10 mb-10">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-xl">
              <h2 className="text-4xl font-serif mt-3 mb-4 text-black">
                Live and work wherever you choose
              </h2>
              <p className="text-neutral-600 text-md">
                Fast-track residence permits and long-term relocation pathways
                across various countries.
              </p>
            </div>
            <a
              href="/residency"
              className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-accent transition-colors"
            >
              View all Residency programs <MoveRight size={14} />
            </a>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto pl-[5vw] lg:pl-10">
          <CountryCarousel countries={residencyCountries} />
        </div>
      </section>

      <Process />

      <PodcastCTA />
      {/* Citizenship — tinted background for clear separation */}
      <section className="py-12 sm:py-12 bg-neutral-50 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10 mb-10">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-xl">
              <h2 className="text-4xl font-serif mt-3 mb-4 text-black">
                A second passport for your family
              </h2>
              <p className="text-neutral-600 text-lg">
                Citizenship by investment, ancestry, and naturalization across{" "}
                {citizenshipCountries.length} countries.
              </p>
            </div>
            <a
              href="/citizenship"
              className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-accent transition-colors"
            >
              View all Citizenship programs <MoveRight size={14} />
            </a>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto pl-[5vw] lg:pl-10">
          <CountryCarousel countries={citizenshipCountries} />
        </div>
      </section>


      <Testimonials />

      <Services />
      <ConsultationCTA />
    </div>
  );
}