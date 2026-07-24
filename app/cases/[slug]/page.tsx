import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MoveRight, Quote, X } from "lucide-react";
import {
  caseStudies,
  getCaseStudy,
  getRelatedCases,
  type CaseOption,
} from "@/lib/casesData";
import { getTeamMember } from "@/lib/teamData";
import { CaseFaq } from "@/components/CaseFaq";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { PodcastCTA } from "@/components/PodcastCTA";

/* ------------------------------------------------------------------ */
/*  ROUTING                                                            */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return { title: "Case Study — TEKCE Visa" };

  return {
    title: `${study.title} — TEKCE Visa`,
    description: study.excerpt,
    openGraph: {
      title: study.title,
      description: study.excerpt,
      images: [study.image],
      type: "article",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

const verdictStyles: Record<CaseOption["verdict"], string> = {
  chosen: "bg-accent text-white border-accent",
  rejected: "bg-white text-neutral-400 border-neutral-200",
  considered: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

const verdictLabels: Record<CaseOption["verdict"], string> = {
  chosen: "Chosen",
  rejected: "Rejected",
  considered: "Considered",
};

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const advisor = getTeamMember(study.advisor);
  const related = getRelatedCases(study);
  const interviewHost = study.interview
    ? getTeamMember(study.interview.host)
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* ---------------------------------------------------------- */}
      {/*  HERO                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="relative min-h-[68vh] lg:min-h-[76vh] flex flex-col justify-end pt-36 bg-black">
        <div className="absolute inset-0">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/60" />
        </div>

        {/* Headline block */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-[5vw] lg:px-10 w-full pb-12">
          <div className="max-w-3xl">
            <nav className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-white/50 font-medium mb-7">
              <Link href="/cases" className="hover:text-white transition-colors">
                Case Studies
              </Link>
              <span className="text-white/25">/</span>
              <span className="text-accent">{study.program}</span>
            </nav>

            <h1 className="text-[28px] sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-serif text-white leading-[1.15] tracking-tight mb-6 drop-shadow-sm text-balance">
              {study.title}
            </h1>

            <p className="text-white/70 text-[15px] md:text-base font-light leading-relaxed max-w-xl drop-shadow-sm">
              {study.excerpt}
            </p>
          </div>
        </div>

        {/* Byline bar */}
        <div className="relative z-10 border-t border-white/10 bg-black/25 backdrop-blur-sm">
          <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10 py-5 flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
            <div className="flex items-center gap-3.5">
              <img
                src={advisor.image}
                alt={advisor.name}
                className="w-10 h-10 rounded-full bg-white/10 object-cover object-top border border-white/20"
              />
              <div>
                <div className="text-[14px] font-medium text-white leading-tight">
                  {advisor.name}
                </div>
                <div className="text-[11px] text-white/50 leading-tight mt-0.5">
                  Led the file &middot; {advisor.title}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              {[
                { label: "Location", value: study.country },
                { label: "Published", value: study.date },
                { label: "Read time", value: study.readTime },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-[10px] uppercase tracking-wider text-white/35 mb-1">
                    {item.label}
                  </div>
                  <div className="text-[13px] text-white/80">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  KEY FACTS STRIP                                            */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200">
            {study.keyFacts.map((fact) => (
              <div key={fact.label} className="py-8 px-6 first:pl-0">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-2">
                  {fact.label}
                </div>
                <div className="text-xl lg:text-2xl font-serif text-black leading-snug">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  CLIENT PROFILE + CHALLENGE                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-start">
            {/* Profile card */}
            <div className="lg:sticky lg:top-32">
              <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                <div className="px-7 py-5 border-b border-neutral-100 bg-neutral-50 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-[12px] font-medium tracking-wide">
                    {study.client.initials}
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
                      The client
                    </div>
                    <div className="text-[15px] font-serif text-black">
                      {study.client.alias}
                    </div>
                  </div>
                </div>

                <dl className="divide-y divide-neutral-100">
                  {[
                    { label: "Age", value: study.client.age },
                    { label: "Citizenship", value: study.client.citizenship },
                    { label: "Household", value: study.client.household },
                    { label: "Profession", value: study.client.profession },
                  ].map((row) => (
                    <div key={row.label} className="px-7 py-4">
                      <dt className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1.5">
                        {row.label}
                      </dt>
                      <dd className="text-[14px] text-neutral-700 font-light leading-relaxed">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                  <div className="px-7 py-5 bg-neutral-50/60">
                    <dt className="text-[10px] text-neutral-400 uppercase tracking-wider mb-2">
                      What they wanted
                    </dt>
                    <dd className="text-[14px] text-neutral-600 font-light leading-relaxed">
                      {study.client.motivation}
                    </dd>
                  </div>
                </dl>

                <div className="px-7 py-5 border-t border-neutral-100">
                  <Link
                    href={study.programHref}
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-black hover:text-accent transition-colors"
                  >
                    {study.program} programme <MoveRight size={14} />
                  </Link>
                </div>
              </div>

              <p className="text-[12px] text-neutral-400 font-light leading-relaxed mt-5 px-1">
                Names and identifying details changed at the client&apos;s request.
                Figures, dates and sequences are taken from the file.
              </p>
            </div>

            {/* Challenge */}
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-6">
                The brief
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-black mb-8 leading-tight">
                What made this file difficult
              </h2>
              <p className="text-neutral-500 text-[17px] font-light leading-relaxed mb-12 max-w-3xl">
                {study.challenge.intro}
              </p>

              <div className="space-y-0 border-t border-neutral-200">
                {study.challenge.points.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-6 py-6 border-b border-neutral-100"
                  >
                    <div className="text-2xl font-serif text-neutral-200 leading-none pt-1 w-8 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-neutral-600 text-[15px] font-light leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  OPTIONS COMPARISON TABLE                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-14">
            <h2 className="text-4xl font-serif text-black mb-4">
              Options on the table
            </h2>
            <p className="text-neutral-500 text-lg font-light">
              Every route evaluated for this family — including the ones we advised
              against, and why.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
            {/* Header — desktop only */}
            <div className="hidden lg:grid grid-cols-12 gap-6 px-8 py-4 bg-neutral-50 border-b border-neutral-200">
              <div className="col-span-3 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Route
              </div>
              <div className="col-span-2 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Investment
              </div>
              <div className="col-span-2 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Timeline
              </div>
              <div className="col-span-1 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Verdict
              </div>
              <div className="col-span-4 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Reasoning
              </div>
            </div>

            {study.options.map((option) => (
              <div
                key={option.option}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 px-6 lg:px-8 py-6 border-b border-neutral-100 last:border-b-0 ${option.verdict === "chosen" ? "bg-accent/[0.04]" : ""
                  }`}
              >
                <div className="lg:col-span-3">
                  <div className="text-[15px] font-medium text-black leading-snug">
                    {option.option}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider lg:hidden mb-1">
                    Investment
                  </div>
                  <div className="text-[14px] text-neutral-700 font-light">
                    {option.investment}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider lg:hidden mb-1">
                    Timeline
                  </div>
                  <div className="text-[14px] text-neutral-700 font-light">
                    {option.timeline}
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-medium whitespace-nowrap ${verdictStyles[option.verdict]
                      }`}
                  >
                    {option.verdict === "chosen" && <Check size={11} />}
                    {option.verdict === "rejected" && <X size={11} />}
                    {verdictLabels[option.verdict]}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[14px] text-neutral-500 font-light leading-relaxed">
                    {option.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  NARRATIVE SECTIONS                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">The approach</h2>
            <p className="text-neutral-500 text-lg font-light">
              How the file was actually sequenced, decision by decision.
            </p>
          </div>

          <div className="space-y-24">
            {study.sections.map((section, i) => (
              <div key={section.heading}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                  {/* Sticky section number + heading */}
                  <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-32">
                      <div className="text-5xl font-serif text-neutral-200 mb-5">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif text-black leading-tight">
                        {section.heading}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="lg:col-span-8">
                    <div
                      className="prose prose-lg prose-neutral max-w-none font-light leading-loose text-neutral-600
                        prose-headings:font-serif prose-headings:font-normal prose-headings:text-black
                        prose-p:mb-7
                        prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:pl-8 prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:font-serif prose-blockquote:leading-relaxed prose-blockquote:text-black prose-blockquote:my-10
                        prose-ul:my-7 prose-li:mb-2
                        prose-em:italic prose-em:text-neutral-500
                        prose-strong:font-medium prose-strong:text-black"
                      dangerouslySetInnerHTML={{ __html: section.body }}
                    />

                    {section.image && (
                      <figure className="mt-10">
                        <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-100 rounded-2xl">
                          <img
                            src={section.image}
                            alt={section.imageCaption ?? section.heading}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {section.imageCaption && (
                          <figcaption className="text-[13px] text-neutral-400 font-light mt-3">
                            {section.imageCaption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  EXPERT NOTES                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-14">
            <h2 className="text-4xl font-serif text-black mb-4">
              Notes from the advisors
            </h2>
            <p className="text-neutral-500 text-lg font-light">
              The points our team raises repeatedly on files of this kind.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {study.expertNotes.map((note, i) => {
              const author = getTeamMember(note.author);
              return (
                <div
                  key={i}
                  className="border border-neutral-200 rounded-2xl bg-white p-8 md:p-10 flex flex-col"
                >
                  <Quote
                    size={22}
                    className="text-accent mb-6 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <p className="text-[16px] text-neutral-600 font-light leading-relaxed mb-8 flex-1">
                    {note.text}
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-neutral-100">
                    <img
                      src={author.image}
                      alt={author.name}
                      className="w-11 h-11 rounded-full bg-neutral-100 object-cover object-top border border-neutral-200"
                    />
                    <div>
                      <div className="text-[14px] font-medium text-black">
                        {author.name}
                      </div>
                      <div className="text-[12px] text-neutral-400">
                        {author.title}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  TIMELINE TABLE                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div className="max-w-xl">
              <h2 className="text-4xl font-serif text-black mb-4">
                The timeline, week by week
              </h2>
              <p className="text-neutral-500 text-lg font-light">
                Every phase of the file, with the dates and costs attached to each.
              </p>
            </div>
            <div className="flex gap-10 flex-shrink-0">
              <div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1.5">
                  Total duration
                </div>
                <div className="text-2xl font-serif text-black">
                  {study.timelineSummary.totalDuration}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1.5">
                  Total fees
                </div>
                <div className="text-2xl font-serif text-black">
                  {study.timelineSummary.totalCost}
                </div>
              </div>
            </div>
          </div>

          <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
            <div className="hidden lg:grid grid-cols-12 gap-6 px-8 py-4 bg-neutral-50 border-b border-neutral-200">
              <div className="col-span-1 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                #
              </div>
              <div className="col-span-3 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Phase
              </div>
              <div className="col-span-2 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Date
              </div>
              <div className="col-span-1 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Duration
              </div>
              <div className="col-span-2 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Cost
              </div>
              <div className="col-span-3 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Detail
              </div>
            </div>

            {study.timeline.map((step, i) => (
              <div
                key={step.phase}
                className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 px-6 lg:px-8 py-6 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/50 transition-colors"
              >
                <div className="lg:col-span-1">
                  <div className="text-lg font-serif text-neutral-300">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="text-[15px] font-medium text-black leading-snug">
                    {step.phase}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider lg:hidden mb-1">
                    Date
                  </div>
                  <div className="text-[14px] text-neutral-700 font-light">
                    {step.date}
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider lg:hidden mb-1">
                    Duration
                  </div>
                  <div className="text-[14px] text-neutral-700 font-light">
                    {step.duration}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider lg:hidden mb-1">
                    Cost
                  </div>
                  <div
                    className={`text-[14px] font-light ${step.cost === "—" ? "text-neutral-300" : "text-black"
                      }`}
                  >
                    {step.cost}
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-[14px] text-neutral-500 font-light leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}

            <div className="px-6 lg:px-8 py-5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-[13px] text-neutral-500 font-light">
                {study.timelineSummary.note}
              </div>
              <div className="text-[14px] font-medium text-black">
                {study.timelineSummary.totalDuration} &middot;{" "}
                {study.timelineSummary.totalCost}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  COST BREAKDOWN                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-14">
            <h2 className="text-4xl font-serif text-black mb-4">
              What it actually cost
            </h2>
            <p className="text-neutral-500 text-lg font-light">
              Itemised in full, with the recoverable investment separated from money
              that is spent.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
            <div className="hidden lg:grid grid-cols-12 gap-6 px-8 py-4 bg-neutral-50 border-b border-neutral-200">
              <div className="col-span-4 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Item
              </div>
              <div className="col-span-2 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Category
              </div>
              <div className="col-span-2 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Amount
              </div>
              <div className="col-span-4 text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                Note
              </div>
            </div>

            {study.costs.map((cost) => (
              <div
                key={cost.item}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 px-6 lg:px-8 py-5 border-b border-neutral-100 last:border-b-0 ${cost.category === "Investment" ? "bg-accent/[0.04]" : ""
                  }`}
              >
                <div className="lg:col-span-4">
                  <div className="text-[15px] font-medium text-black leading-snug">
                    {cost.item}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-500 text-[11px] font-medium">
                    {cost.category}
                  </span>
                </div>
                <div className="lg:col-span-2">
                  <div className="text-[15px] font-serif text-black">
                    {cost.amount}
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[14px] text-neutral-500 font-light leading-relaxed">
                    {cost.note}
                  </p>
                </div>
              </div>
            ))}

            <div className="px-6 lg:px-8 py-6 bg-black text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium">
                Total
              </div>
              <div className="text-lg md:text-xl font-serif">
                {study.costTotal}
              </div>
            </div>
          </div>

          <p className="text-[12px] text-neutral-400 font-light mt-5 max-w-3xl">
            Figures are those recorded on this file at the time it ran. Government
            fees, thresholds and tax treatment change; they are not a quotation for
            any other application.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  PULL QUOTE                                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] text-white">
        <div className="max-w-[1000px] mx-auto px-[5vw] lg:px-10 text-center">
          <Quote
            size={28}
            className="text-accent mx-auto mb-10"
            strokeWidth={1.5}
          />
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.35] mb-10">
            &ldquo;{study.pullQuote.text}&rdquo;
          </blockquote>
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-medium">
            {study.pullQuote.attribution}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  INTERVIEW                                                  */}
      {/* ---------------------------------------------------------- */}
      {study.interview && interviewHost && (
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-20 items-start">
              {/* Host panel */}
              <div className="lg:sticky lg:top-32">
                <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-6">
                  In conversation
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-black mb-6 leading-tight">
                  {study.interview.title}
                </h2>
                <p className="text-neutral-500 text-[15px] font-light leading-relaxed mb-10">
                  {study.interview.intro}
                </p>

                <div className="flex items-center gap-4 pt-8 border-t border-neutral-100">
                  <img
                    src={interviewHost.image}
                    alt={interviewHost.name}
                    className="w-14 h-14 rounded-full bg-neutral-100 object-cover object-top border border-neutral-200"
                  />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Interviewed by
                    </div>
                    <div className="text-[16px] font-serif text-black">
                      {interviewHost.name}
                    </div>
                    <div className="text-[12px] text-neutral-400">
                      {interviewHost.title}
                    </div>
                  </div>
                </div>

                <div className="text-[12px] text-neutral-400 font-light mt-6">
                  {study.interview.recordedAt}
                </div>
              </div>

              {/* Transcript */}
              <div className="border-l border-neutral-100 pl-0 lg:pl-12">
                <div className="space-y-10">
                  {study.interview.lines.map((line, i) => {
                    const isHost = line.speaker === "host";
                    return (
                      <div key={i} className="flex items-start gap-5">
                        {isHost ? (
                          <img
                            src={interviewHost.image}
                            alt={line.name}
                            className="w-11 h-11 rounded-full bg-neutral-100 object-cover object-top border border-neutral-200 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[12px] font-medium text-neutral-500 flex-shrink-0">
                            {initialsOf(line.name)}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2.5">
                            <span
                              className={`text-[14px] font-medium ${isHost ? "text-accent" : "text-black"
                                }`}
                            >
                              {line.name}
                            </span>
                            <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
                              {line.role}
                            </span>
                          </div>
                          <p
                            className={`text-[16px] leading-relaxed ${isHost
                                ? "text-neutral-500 font-light italic"
                                : "text-neutral-700 font-light"
                              }`}
                          >
                            {line.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-100 text-[12px] text-neutral-400 font-light">
                  Transcript edited for length and clarity. Published with the
                  family&apos;s consent.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- */}
      {/*  RESULTS                                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-14">
            <h2 className="text-4xl font-serif text-black mb-4">The outcome</h2>
            <p className="text-neutral-500 text-lg font-light">
              What the family holds today, and what it took to get there.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {study.results.map((result) => (
              <div
                key={result.label}
                className="border border-neutral-200 rounded-2xl bg-white p-8"
              >
                <div className="text-4xl font-serif text-black mb-3">
                  {result.value}
                </div>
                <div className="text-[14px] font-medium text-black mb-3">
                  {result.label}
                </div>
                <p className="text-[13px] text-neutral-500 font-light leading-relaxed">
                  {result.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  GALLERY                                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-10">
            On location
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {study.gallery.map((item) => (
              <figure key={item.image}>
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100 rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="text-[13px] text-neutral-400 font-light mt-3">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <PodcastCTA
        title="Hear the long version"
        description={`Özkan Tekçe and the TEKCE Visa team discuss the ${study.program} in depth — thresholds, timelines, the mistakes that cost families a year, and the questions to ask before you place a deposit.`}
      />

      {/* ---------------------------------------------------------- */}
      {/*  FAQ                                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif text-black mb-12 text-center">
              Questions this file raised
            </h2>
            <CaseFaq faqs={study.faqs} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  RELATED CASES                                              */}
      {/* ---------------------------------------------------------- */}
      {related.length > 0 && (
        <section className="py-20 bg-[#fcfcfc] border-t border-neutral-100">
          <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
            <div className="flex items-end justify-between gap-8 mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-black">
                Comparable files
              </h2>
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-accent transition-colors flex-shrink-0"
              >
                All case studies <MoveRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  href={`/cases/${item.slug}`}
                  key={item.slug}
                  className="group flex flex-col h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300"
                >
                  <div className="aspect-[3/2] overflow-hidden bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-neutral-400 font-medium mb-4">
                      <span className="text-accent">{item.program}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-200" />
                      <span>{item.readTime}</span>
                    </div>
                    <h3 className="text-xl font-serif text-black leading-snug mb-3 group-hover:text-accent transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-neutral-500 text-[14px] font-light leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="mt-auto pt-6 flex items-center gap-2 text-[13px] font-medium text-neutral-400 group-hover:text-accent transition-colors">
                      Read the file <MoveRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ConsultationCTA consultant={study.advisor} />
    </div>
  );
}
