"use client";

import { MoveRight, Check } from "lucide-react";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { PodcastCTA } from "@/components/PodcastCTA";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

// Real estate prices across Turkish cities (EUR/m²)
const cityPrices = [
  { city: "Istanbul (EU)", price: 2400 },
  { city: "Istanbul (Asia)", price: 1800 },
  { city: "Antalya", price: 1200 },
  { city: "Bodrum", price: 2100 },
  { city: "Ankara", price: 850 },
  { city: "İzmir", price: 1100 },
  { city: "Alanya", price: 950 },
  { city: "Bursa", price: 780 },
];

// CBI comparison with competitors
const cbiComparison = [
  { metric: "Speed", turkiye: 92, malta: 35, caribbean: 85, portugal: 45 },
  { metric: "Cost", turkiye: 72, malta: 25, caribbean: 90, portugal: 55 },
  { metric: "Visa-Free", turkiye: 55, malta: 90, caribbean: 68, portugal: 92 },
  { metric: "Family", turkiye: 95, malta: 80, caribbean: 85, portugal: 88 },
  { metric: "Lifestyle", turkiye: 82, malta: 75, caribbean: 70, portugal: 85 },
  { metric: "ROI", turkiye: 80, malta: 40, caribbean: 55, portugal: 65 },
];

// Property value growth trend (index, 2019=100)
const propertyGrowth = [
  { year: "2019", index: 100 },
  { year: "2020", index: 108 },
  { year: "2021", index: 132 },
  { year: "2022", index: 168 },
  { year: "2023", index: 195 },
  { year: "2024", index: 218 },
  { year: "2025", index: 235 },
];

// Processing timeline breakdown (days)
const timelineBreakdown = [
  { stage: "Document Prep", days: 15 },
  { stage: "Application", days: 7 },
  { stage: "Due Diligence", days: 30 },
  { stage: "Title Deed", days: 14 },
  { stage: "Residency", days: 10 },
  { stage: "Citizenship", days: 30 },
];

/* Chart configs */
const cityPriceConfig: ChartConfig = {
  price: { label: "EUR/m²", color: "#d4d4d4" },
};

const comparisonConfig: ChartConfig = {
  turkiye: { label: "Türkiye", color: "#00b7d0" },
  malta: { label: "Malta", color: "#a3a3a3" },
  caribbean: { label: "Caribbean", color: "#d4d4d4" },
  portugal: { label: "Portugal", color: "#737373" },
};

const growthConfig: ChartConfig = {
  index: { label: "Price Index", color: "#00b7d0" },
};

const timelineConfig: ChartConfig = {
  days: { label: "Days", color: "#d4d4d4" },
};

/* ------------------------------------------------------------------ */
/*  STATIC CONTENT                                                     */
/* ------------------------------------------------------------------ */

const keyStats = [
  { label: "Minimum Investment", value: "€400,000" },
  { label: "Processing Time", value: "3 – 6 months" },
  { label: "Visa-Free Access", value: "118+ countries" },
  { label: "Dual Citizenship", value: "Permitted" },
];

const investmentRoutes = [
  {
    title: "Real Estate",
    minimum: "€400,000",
    description: "Purchase residential or commercial property with a 3-year holding period. The most popular route — approximately 85% of all applicants.",
    details: [
      "Property must be held for minimum 3 years",
      "Multiple properties can be combined",
      "Title deed annotation required",
      "Rental income permitted during holding period",
      "Commercial and residential properties eligible",
    ],
  },
  {
    title: "Bank Deposit",
    minimum: "$500,000",
    description: "Fixed deposit in a Turkish bank for a minimum of 3 years. A passive investment requiring no property management.",
    details: [
      "Deposit must remain for 3 years minimum",
      "Interest earned belongs to the depositor",
      "Multiple banks can be used",
      "TRY or USD denominated accounts accepted",
    ],
  },
  {
    title: "Capital Investment",
    minimum: "$500,000",
    description: "Fixed capital investment in a Turkish company or venture capital fund approved by the government.",
    details: [
      "Investment in existing or new company",
      "Government-approved venture capital funds",
      "Must maintain investment for 3 years",
      "Active business operations required",
    ],
  },
  {
    title: "Job Creation",
    minimum: "50 employees",
    description: "Create employment for at least 50 Turkish citizens. No minimum capital requirement — focused on economic contribution.",
    details: [
      "Minimum 50 Turkish national employees",
      "Social security registration required",
      "Employment must be maintained",
      "No minimum financial investment",
    ],
  },
];

const eligibility = [
  "Applicant must be 18 years or older",
  "Clean criminal record from country of origin",
  "No prior deportation from Türkiye",
  "Proof of legitimate source of funds",
  "Valid passport with minimum 6-month validity",
  "Health insurance coverage in Türkiye",
  "Investment must be newly acquired (post-2022 regulations)",
];

const familyInclusion = [
  { member: "Spouse", included: true, note: "Automatically included in the application" },
  { member: "Children under 18", included: true, note: "Included regardless of number" },
  { member: "Children 18+", included: false, note: "Must apply independently if dependent" },
  { member: "Parents", included: false, note: "Not eligible under CBI program" },
  { member: "Siblings", included: false, note: "Not eligible under CBI program" },
];

const faqs = [
  {
    q: "Do I need to live in Türkiye to maintain citizenship?",
    a: "No. Turkish citizenship by investment has no residency requirement. You can live anywhere in the world and your citizenship remains valid indefinitely.",
  },
  {
    q: "Can I sell the property after receiving citizenship?",
    a: "Yes, but only after the 3-year holding period. A title deed annotation prevents sale before this period expires. After 3 years, you are free to sell with no impact on your citizenship.",
  },
  {
    q: "Does Türkiye allow dual citizenship?",
    a: "Yes. Türkiye fully permits dual and multiple citizenships. You are not required to renounce your existing nationality.",
  },
  {
    q: "How long is the Turkish passport valid?",
    a: "Turkish passports are valid for 10 years for adults and 5 years for children. Renewal is straightforward and can be done at any Turkish consulate worldwide.",
  },
  {
    q: "Can I access the E-2 US visa with a Turkish passport?",
    a: "Yes. Türkiye has an E-2 Treaty Investor Visa agreement with the United States, making Turkish citizenship a strategic pathway for US-bound investors.",
  },
  {
    q: "What if property values decrease during the holding period?",
    a: "The 3-year holding period is mandatory regardless of market conditions. However, Turkish real estate has shown consistent appreciation — particularly in Istanbul and coastal cities.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function TurkeyeCitizenshipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-end">
        <div
          className="absolute inset-0 bg-gray-900 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-20">
          <div className="max-w-3xl">
            <div className="text-sm text-white/60 uppercase tracking-wider mb-4 font-medium">
              Citizenship by Investment
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-6">
              Türkiye
            </h1>
            <p className="text-white/80 text-lg max-w-xl mb-8">
              A transcontinental gateway between Europe and Asia. Turkish citizenship through real estate investment — one of the world's fastest and most accessible CBI programs.
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

      {/* Key Stats Strip */}
      <section className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200">
            {keyStats.map((stat) => (
              <div key={stat.label} className="py-8 px-6 first:pl-0">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-2">{stat.label}</div>
                <div className="text-2xl font-serif text-black">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl font-serif text-black mb-6">Program overview</h2>
              <div className="space-y-4 text-neutral-500 text-[16px] font-light leading-relaxed">
                <p>
                  Türkiye's Citizenship by Investment program, established in 2017 and revised in 2022, offers a direct route to citizenship through qualifying investments. The minimum real estate threshold of €400,000 positions it as one of the most competitive programs globally.
                </p>
                <p>
                  Unlike many European programs, Turkish CBI imposes no physical residency requirement. Applicants and their immediate families receive full citizenship — including the right to live, work, and access education and healthcare — without ever relocating.
                </p>
                <p>
                  The Turkish passport provides visa-free or visa-on-arrival access to 118+ countries and territories, including Japan, South Korea, Singapore, and much of South America. Crucially, Türkiye maintains an E-2 Treaty Investor Visa agreement with the United States.
                </p>
              </div>
            </div>
            <div>
              <div
                className="relative h-[400px] rounded-2xl overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1661935635412-fa36cf42ae35?q=80&w=1200&auto=format&fit=crop')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Bosphorus, Istanbul</div>
                  <div className="text-white font-serif text-xl">Where continents meet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Routes */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">Investment routes</h2>
            <p className="text-neutral-500 text-lg font-light">
              Four qualifying investment pathways — each leading to full Turkish citizenship for you and your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investmentRoutes.map((route, i) => (
              <div
                key={route.title}
                className="border border-neutral-200 rounded-2xl p-8 md:p-10 bg-white"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-4xl font-serif text-neutral-200 mb-2">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-serif text-black">{route.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Minimum</div>
                    <div className="text-lg font-serif text-black">{route.minimum}</div>
                  </div>
                </div>
                <p className="text-neutral-500 text-[15px] font-light leading-relaxed mb-6">
                  {route.description}
                </p>
                <ul className="space-y-2.5">
                  {route.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[14px] text-neutral-600">
                      <Check size={14} className="mt-0.5 text-neutral-300 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">Market intelligence</h2>
            <p className="text-neutral-500 text-lg font-light">
              Data-driven insights into Turkish real estate, program benchmarks, and processing timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Prices by City */}
            <Card className="border-neutral-200 shadow-none rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full bg-neutral-300" />
                  <CardTitle className="font-serif text-xl">Property Prices by City</CardTitle>
                </div>
                <CardDescription>Average residential price per m² (EUR) across key Turkish cities</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={cityPriceConfig} className="h-[320px] w-full">
                  <BarChart data={cityPrices} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                    <YAxis dataKey="city" type="category" tickLine={false} axisLine={false} tickMargin={8} width={105} fontSize={12} />
                    <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="price" radius={[0, 6, 6, 0]}>
                      {cityPrices.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "#00b7d0" : "#d4d4d4"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Property Value Growth */}
            <Card className="border-neutral-200 shadow-none rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full bg-neutral-300" />
                  <CardTitle className="font-serif text-xl">Property Value Growth</CardTitle>
                </div>
                <CardDescription>Residential real estate price index (2019 = 100)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={growthConfig} className="h-[320px] w-full">
                  <LineChart data={propertyGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[80, 250]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line dataKey="index" type="natural" stroke="#00b7d0" strokeWidth={2.5} dot={{ fill: "#00b7d0", r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* CBI Comparison Radar */}
            <Card className="border-neutral-200 shadow-none rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full bg-neutral-300" />
                  <CardTitle className="font-serif text-xl">CBI Program Comparison</CardTitle>
                </div>
                <CardDescription>How Türkiye compares to other citizenship programs across key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={comparisonConfig} className="h-[320px] w-full mx-auto max-w-lg">
                  <RadarChart data={cbiComparison}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" tickLine={false} className="text-[11px]" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Radar dataKey="turkiye" fill="#00b7d0" fillOpacity={0.15} stroke="#00b7d0" strokeWidth={2} />
                    <Radar dataKey="malta" fill="#a3a3a3" fillOpacity={0.05} stroke="#a3a3a3" strokeWidth={1.5} />
                    <Radar dataKey="caribbean" fill="#d4d4d4" fillOpacity={0.05} stroke="#d4d4d4" strokeWidth={1.5} />
                    <Radar dataKey="portugal" fill="#737373" fillOpacity={0.05} stroke="#737373" strokeWidth={1.5} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Processing Timeline */}
            <Card className="border-neutral-200 shadow-none rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full bg-neutral-300" />
                  <CardTitle className="font-serif text-xl">Processing Timeline</CardTitle>
                </div>
                <CardDescription>Estimated duration for each stage of the application (days)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={timelineConfig} className="h-[320px] w-full">
                  <BarChart data={timelineBreakdown} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="stage" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="days" radius={[6, 6, 0, 0]}>
                      {timelineBreakdown.map((_, i) => (
                        <Cell key={i} fill={i === timelineBreakdown.length - 1 ? "#00b7d0" : "#d4d4d4"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Eligibility + Family */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Eligibility */}
            <div>
              <h2 className="text-3xl font-serif text-black mb-8">Eligibility requirements</h2>
              <ul className="space-y-4">
                {eligibility.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={10} className="text-neutral-400" />
                    </div>
                    <span className="text-neutral-600 text-[15px] font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Family Inclusion */}
            <div>
              <h2 className="text-3xl font-serif text-black mb-8">Family inclusion</h2>
              <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                <div className="grid grid-cols-3 gap-4 px-6 py-3 border-b border-neutral-100 bg-neutral-50">
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">Family Member</div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">Eligible</div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">Note</div>
                </div>
                {familyInclusion.map((member) => (
                  <div key={member.member} className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-neutral-100 last:border-b-0">
                    <div className="text-[14px] font-medium text-black">{member.member}</div>
                    <div>
                      {member.included ? (
                        <span className="inline-flex items-center gap-1 text-[13px] text-accent font-medium">
                          <Check size={12} /> Yes
                        </span>
                      ) : (
                        <span className="text-[13px] text-neutral-400">No</span>
                      )}
                    </div>
                    <div className="text-[13px] text-neutral-500 font-light">{member.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PodcastCTA
        title="The Türkiye Dialogues"
        description="Join Özkan Tekçe as he discusses the intricacies of Turkish real estate, the CIP program, and living on the Bosphorus with industry experts."
      />

      {/* Step-by-step Process */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">How it works</h2>
            <p className="text-neutral-500 text-lg font-light">
              A streamlined process from initial consultation to passport in hand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              { step: "01", title: "Initial Consultation", desc: "We assess your profile, investment preferences, and timeline. A tailored roadmap is prepared." },
              { step: "02", title: "Property Selection", desc: "Our team presents qualifying properties. Virtual and in-person viewings available across all major cities." },
              { step: "03", title: "Legal Due Diligence", desc: "Full legal review of the property, title deed verification, and compliance checks by our Turkish legal counsel." },
              { step: "04", title: "Purchase & Title Deed", desc: "Property acquisition, title deed transfer, and mandatory annotation. Power of attorney available for remote completion." },
              { step: "05", title: "Residency Permit", desc: "Short-term residency permit obtained as a prerequisite. Typically processed within 10 business days." },
              { step: "06", title: "Citizenship Grant", desc: "Application submitted to the General Directorate. Citizenship certificate and passport issued within 30–60 days." },
            ].map((item) => (
              <div key={item.step} className="group">
                <div className="text-4xl font-serif text-neutral-200 mb-4 group-hover:text-accent transition-colors duration-500">
                  {item.step}
                </div>
                <h3 className="text-lg font-serif text-black mb-2">{item.title}</h3>
                <p className="text-neutral-500 text-[15px] font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif text-black mb-12 text-center">Frequently asked questions</h2>
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-neutral-200 first:border-t">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span className="text-[16px] font-medium text-black pr-8">{faq.q}</span>
                    <span className={`text-neutral-400 transition-transform duration-300 flex-shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-60 pb-6" : "max-h-0"}`}
                  >
                    <p className="text-neutral-500 text-[15px] font-light leading-relaxed pr-12">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ConsultationCTA consultant={4} />
    </div>
  );
}
