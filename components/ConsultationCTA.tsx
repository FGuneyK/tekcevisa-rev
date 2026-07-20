import { MoveRight } from "lucide-react";
import { getTeamMember } from "@/lib/teamData";

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

interface ConsultationCTAProps {
  consultant?: number | string; // backwards compatibility with 1-based indexing, or new string IDs
}

export function ConsultationCTA({ consultant = 1 }: ConsultationCTAProps) {
  const person = getTeamMember(consultant);

  return (
    <section className="pt-24 pb-20 bg-white border-y border-neutral-100 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-stretch gap-10">
            {/* Content side */}
            <div className="py-10 lg:py-16 flex flex-col justify-center">
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium mb-4">
                Schedule a meeting
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-black mb-4 leading-tight">
                Let&apos;s discuss the details
              </h2>
              <p className="text-neutral-500 text-[16px] font-light leading-relaxed max-w-lg mb-8">
                Every global transition is unique. Schedule a private consultation with our specialized legal advisors to map out a tailored strategy for your residency or citizenship by investment, ensuring a seamless and discreet process from start to finish.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  Schedule a meeting <MoveRight size={16} />
                </a>

              </div>
            </div>

            {/* Image side */}
            <div className="relative hidden lg:block w-[400px]">
              <img
                src={person.image}
                alt={person.name}
                className="absolute bottom-0 right-[60px] w-auto h-[125%] max-w-[400px] object-contain object-bottom pointer-events-none drop-shadow-2xl z-10"
              />
              {/* Advisor info overlay */}
              <div className="absolute top-[30%] -left-[180px] z-20 text-right">
                <div className="text-[22px] font-serif text-black mb-1.5">{person.name}</div>
                <div className="text-[14px] text-neutral-500 font-light max-w-[180px] ml-auto leading-snug">{person.title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
