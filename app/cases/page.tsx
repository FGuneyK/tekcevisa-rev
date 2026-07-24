"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveRight, Check } from "lucide-react";
import { caseStudies, caseCategories } from "@/lib/casesData";
import { getTeamMember } from "@/lib/teamData";
import { ConsultationCTA } from "@/components/ConsultationCTA";

/* ------------------------------------------------------------------ */
/*  STATIC CONTENT                                                     */
/* ------------------------------------------------------------------ */

const headlineStats = [
  { label: "Documented case files", value: "5" },
  { label: "Family members relocated", value: "18" },
  { label: "Programmes covered", value: "5" },
  { label: "Average time to status", value: "5.6 months" },
];

const methodology = [
  {
    number: "01",
    title: "Real files, anonymised",
    description:
      "Every case below is a file our team ran from first consultation to issued document. Names, and occasionally professions, are changed at the client's request. Figures, dates and sequences are not.",
  },
  {
    number: "02",
    title: "Costs shown in full",
    description:
      "Government fees, professional fees, taxes and living set-up are itemised separately from the qualifying investment — so you can see what is recoverable and what is spent.",
  },
  {
    number: "03",
    title: "Including what went wrong",
    description:
      "Rejected options, failed prior attempts, misinformation the client received elsewhere, and the parts of each timeline that ran long. A case study that only records success is marketing.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function CasesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeCategory);

  const featured = caseStudies[0];
  const grid = filtered.filter((c) => c.slug !== featured.slug);
  const featuredVisible = filtered.some((c) => c.slug === featured.slug);
  const featuredAdvisor = getTeamMember(featured.advisor);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[70vh] sm:h-[80vh] flex flex-col justify-end pb-24 pt-48 bg-black">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2000&auto=format&fit=crop"
            alt="TEKCE Visa case studies"
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto px-[5vw] lg:px-10 w-full">
          <div className="max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium mb-6">
              Case Studies
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] tracking-tight text-white mb-6 drop-shadow-sm">
              The files, in full
            </h1>
            <p className="text-neutral-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl drop-shadow-sm">
              Real relocations, documented end to end — the options we rejected, the
              costs line by line, the weeks that ran long, and conversations with the
              families afterwards.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200">
            {headlineStats.map((stat) => (
              <div key={stat.label} className="py-8 px-6 first:pl-0">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-2">
                  {stat.label}
                </div>
                <div className="text-2xl font-serif text-black">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured case */}
      {featuredVisible && (
        <section className="py-24 bg-white border-b border-neutral-100">
          <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
            <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-12">
              Featured Case
            </div>
            <Link href={`/cases/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-6">
                    <span className="text-accent">{featured.program}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-200" />
                    <span>{featured.country}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-200" />
                    <span>{featured.readTime}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-black mb-6 leading-[1.1] group-hover:text-accent transition-colors duration-500">
                    {featured.title}
                  </h2>
                  <p className="text-neutral-500 text-lg font-light leading-relaxed mb-10">
                    {featured.excerpt}
                  </p>

                  {/* Key facts inline */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 pt-8 border-t border-neutral-100">
                    {featured.keyFacts.map((fact) => (
                      <div key={fact.label}>
                        <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1.5">
                          {fact.label}
                        </div>
                        <div className="text-[15px] font-serif text-black leading-snug">
                          {fact.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={featuredAdvisor.image}
                        alt={featuredAdvisor.name}
                        className="w-12 h-12 rounded-full bg-neutral-100 object-cover object-top border border-neutral-200"
                      />
                      <div>
                        <div className="text-sm font-medium text-black">
                          {featuredAdvisor.name}
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Led the file &middot; {featuredAdvisor.title}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-black group-hover:text-accent transition-colors">
                      Read the file <MoveRight size={16} />
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter + grid */}
      <section className="py-24 bg-[#fcfcfc]">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div className="max-w-xl">
              <h2 className="text-4xl font-serif text-black mb-4">All case files</h2>
              <p className="text-neutral-500 text-lg font-light">
                Filter by the outcome each family was actually buying.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {caseCategories.map((category) => {
                const isActive = activeCategory === category;
                const count =
                  category === "All"
                    ? caseStudies.length
                    : caseStudies.filter((c) => c.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2.5 text-[13px] font-medium rounded-full border transition-colors ${isActive
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-black"
                      }`}
                  >
                    {category}
                    <span
                      className={`ml-2 text-[11px] ${isActive ? "text-white/50" : "text-neutral-300"
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-neutral-400 font-light text-lg">
                No published files in this category yet — we are documenting several.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-black hover:text-accent transition-colors"
              >
                Ask about a comparable file <MoveRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grid.map((study) => {
                const advisor = getTeamMember(study.advisor);
                return (
                  <Link
                    href={`/cases/${study.slug}`}
                    key={study.slug}
                    className="group flex flex-col h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300"
                  >
                    {/* Cover */}
                    <div className="aspect-[3/2] bg-neutral-100 relative overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-medium text-black">
                        {study.category}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-neutral-400 font-medium mb-4">
                        <span className="text-accent">{study.program}</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-200" />
                        <span>{study.readTime}</span>
                      </div>

                      <h3 className="text-[22px] font-serif text-black leading-snug mb-3 group-hover:text-accent transition-colors duration-500">
                        {study.title}
                      </h3>

                      <p className="text-neutral-500 text-[14px] font-light leading-relaxed line-clamp-3">
                        {study.excerpt}
                      </p>

                      {/* Mini fact rows */}
                      <div className="mt-6 pt-5 border-t border-neutral-100 divide-y divide-neutral-100">
                        {study.keyFacts.slice(1, 4).map((fact) => (
                          <div
                            key={fact.label}
                            className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
                          >
                            <span className="text-[12px] text-neutral-400">
                              {fact.label}
                            </span>
                            <span className="text-[13px] text-black font-medium text-right">
                              {fact.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto px-7 py-5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={advisor.image}
                          alt={advisor.name}
                          className="w-9 h-9 rounded-full bg-white object-cover object-top border border-neutral-200 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
                            Led by
                          </div>
                          <div className="text-[13px] text-neutral-700 font-medium truncate">
                            {advisor.name}
                          </div>
                        </div>
                      </div>
                      <MoveRight
                        size={16}
                        className="text-neutral-300 group-hover:text-accent transition-colors flex-shrink-0"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">
              How we document a file
            </h2>
            <p className="text-neutral-500 text-lg font-light">
              Three rules we apply to every case study published here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {methodology.map((item) => (
              <div key={item.number} className="group">
                <div className="text-4xl font-serif text-neutral-200 mb-4 group-hover:text-accent transition-colors duration-500">
                  {item.number}
                </div>
                <h3 className="text-lg font-serif text-black mb-2">{item.title}</h3>
                <p className="text-neutral-500 text-[15px] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                "Figures verified against the file",
                "Client-approved before publication",
                "Names changed on request",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <Check size={14} className="text-accent flex-shrink-0" />
                  <span className="text-[14px] text-neutral-500 font-light">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 text-sm font-medium hover:bg-accent/90 transition-colors flex-shrink-0"
            >
              Discuss your own file <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ConsultationCTA consultant="ozkan-tekce" />
    </div>
  );
}
