import React from "react";
import { Building2, Landmark, Map, Scale, MoveRight } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Company Formation",
    description: "Seamlessly establish your business abroad with full compliance and structural optimization.",
    link: "/services/company-formation"
  },
  {
    icon: Landmark,
    title: "Tax Advisory",
    description: "Navigate complex international tax systems with our expert cross-border tax planning strategies.",
    link: "/services/tax-advisory"
  },
  {
    icon: Map,
    title: "Real Estate Acquisition",
    description: "Premium property sourcing, legal due diligence, and secure transaction management globally.",
    link: "/services/real-estate"
  },
  {
    icon: Scale,
    title: "Legal Consulting",
    description: "Expert legal representation for cross-border disputes, family law, and international corporate affairs.",
    link: "/services/legal-consulting"
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <h2 className="text-[2.5rem] md:text-5xl font-serif text-black mb-6 leading-tight">
            Comprehensive legal & advisory services
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl font-light leading-relaxed">
            Beyond residency and citizenship, our expert team provides holistic solutions for your business, assets, and global lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a
                key={index}
                href={service.link}
                className="group block p-8 md:p-10 bg-white border border-neutral-200 hover:border-neutral-400 transition-all duration-500 flex flex-col h-full rounded-2xl relative overflow-hidden"
              >
                {/* Subtle gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-12">
                    <div className="w-12 h-12 rounded-full border border-neutral-100 bg-neutral-50 flex items-center justify-center text-neutral-600 group-hover:text-black group-hover:border-neutral-200 group-hover:bg-white transition-colors duration-500">
                      <Icon strokeWidth={1.5} size={22} />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-serif text-black mb-4">
                      {service.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed text-[15px] font-light mb-8">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-400 group-hover:text-black transition-colors duration-300">
                      <span>Explore service</span>
                      <MoveRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
