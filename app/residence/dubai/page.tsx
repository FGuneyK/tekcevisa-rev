"use client";

import { MoveRight, Check } from "lucide-react";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { PodcastCTA } from "@/components/PodcastCTA";
import {
  Area,
  AreaChart,
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

// Property prices by area (AED/sqft → EUR/m² approx)
const areaPrices = [
  { area: "Palm Jumeirah", price: 6200 },
  { area: "Downtown", price: 5800 },
  { area: "Dubai Marina", price: 4900 },
  { area: "JBR", price: 4500 },
  { area: "Business Bay", price: 3800 },
  { area: "JVC", price: 2200 },
  { area: "Dubai Hills", price: 3400 },
  { area: "Dubai Creek", price: 4100 },
];

// Dubai vs other residency programs
const residencyComparison = [
  { metric: "Speed", dubai: 95, spain: 55, portugal: 50, malta: 40 },
  { metric: "Tax Benefit", dubai: 100, spain: 30, portugal: 55, malta: 45 },
  { metric: "Lifestyle", dubai: 92, spain: 85, portugal: 82, malta: 72 },
  { metric: "Safety", dubai: 96, spain: 78, portugal: 85, malta: 80 },
  { metric: "Infrastructure", dubai: 98, spain: 75, portugal: 70, malta: 60 },
  { metric: "Business", dubai: 95, spain: 65, portugal: 60, malta: 55 },
];

// Dubai property market growth (index, 2019=100)
const marketGrowth = [
  { year: "2019", residential: 100, offPlan: 100 },
  { year: "2020", residential: 95, offPlan: 92 },
  { year: "2021", residential: 115, offPlan: 120 },
  { year: "2022", residential: 142, offPlan: 155 },
  { year: "2023", residential: 168, offPlan: 185 },
  { year: "2024", residential: 192, offPlan: 210 },
  { year: "2025", residential: 208, offPlan: 228 },
];

// Foreign population breakdown by nationality
const expatBreakdown = [
  { nationality: "South Asian", percentage: 42 },
  { nationality: "Southeast Asian", percentage: 18 },
  { nationality: "Arab", percentage: 14 },
  { nationality: "European", percentage: 10 },
  { nationality: "African", percentage: 8 },
  { nationality: "CIS / Russia", percentage: 5 },
  { nationality: "Other", percentage: 3 },
];

/* Chart configs */
const areaPriceConfig: ChartConfig = {
  price: { label: "EUR/m²", color: "#d4d4d4" },
};

const comparisonConfig: ChartConfig = {
  dubai: { label: "Dubai", color: "#00b7d0" },
  spain: { label: "Spain", color: "#a3a3a3" },
  portugal: { label: "Portugal", color: "#d4d4d4" },
  malta: { label: "Malta", color: "#737373" },
};

const growthConfig: ChartConfig = {
  residential: { label: "Residential", color: "#00b7d0" },
  offPlan: { label: "Off-Plan", color: "#d4d4d4" },
};

const expatBreakdownConfig: ChartConfig = {
  percentage: { label: "Percentage %", color: "#d4d4d4" },
};

/* ------------------------------------------------------------------ */
/*  STATIC CONTENT                                                     */
/* ------------------------------------------------------------------ */

const keyStats = [
  { label: "Minimum Investment", value: "AED 2M" },
  { label: "Processing Time", value: "2 – 4 weeks" },
  { label: "Visa Duration", value: "10 years" },
  { label: "Income Tax", value: "0%" },
];

const visaTypes = [
  {
    title: "Golden Visa (10-year)",
    minimum: "AED 2,000,000",
    description: "The flagship long-term residency visa. Purchase property valued at AED 2M or above — completed or off-plan — for a 10-year renewable visa with full family inclusion.",
    details: [
      "10-year renewable residency visa",
      "No minimum stay requirement",
      "Spouse, children, and domestic staff included",
      "Property can be under mortgage (must meet value threshold)",
      "Multiple properties can be combined",
      "Off-plan properties from approved developers eligible",
    ],
  },
  {
    title: "Retirement Visa (5-year)",
    minimum: "AED 1,000,000",
    description: "Designed for retirees aged 55+. Property investment, savings, or active income qualification. A peaceful and tax-free retirement destination.",
    details: [
      "Applicant must be 55 years or older",
      "Property worth AED 1M, or savings of AED 1M, or monthly income of AED 20,000",
      "5-year renewable visa",
      "Access to world-class healthcare",
      "Spouse included in the application",
    ],
  },
  {
    title: "Investor Visa (2-year)",
    minimum: "AED 750,000",
    description: "Short-term renewable visa for property investors below the Golden Visa threshold. Ideal for first-time investors testing the Dubai market.",
    details: [
      "Property must be completed (not off-plan)",
      "2-year renewable visa",
      "Spouse and children included",
      "No minimum stay requirement",
      "Property must be residential",
    ],
  },
  {
    title: "Freelancer / Remote Work",
    minimum: "No property required",
    description: "One-year virtual working visa for remote professionals and freelancers. Work for international employers while residing in a tax-free environment.",
    details: [
      "Proof of employment or freelance income",
      "Minimum monthly income of $3,500",
      "Health insurance required",
      "1-year renewable visa",
      "No local sponsor required",
    ],
  },
];

const whyDubai = [
  { number: "01", title: "Zero income tax", description: "No personal income tax, no capital gains tax, no wealth tax. Your earnings remain yours — in full." },
  { number: "02", title: "World-class infrastructure", description: "Ranked #1 globally for quality of roads and transport. Two international airports, 4 metro lines, and expanding." },
  { number: "03", title: "Strategic time zone", description: "GMT+4 places Dubai between European and Asian business hours. The ideal hub for global operations." },
  { number: "04", title: "Safety and stability", description: "Consistently ranked among the world's safest cities. Low crime, political stability, and robust legal frameworks." },
  { number: "05", title: "Education ecosystem", description: "310+ international schools offering British, American, IB, and French curricula. 30+ universities." },
  { number: "06", title: "Healthcare excellence", description: "JCI-accredited hospitals and clinics. Cleveland Clinic, Mayo Clinic affiliates, and world-class specialist centres." },
];

const eligibility = [
  "Valid passport with minimum 6-month validity",
  "Property valued at AED 2M+ for Golden Visa (or applicable threshold)",
  "Clean criminal record",
  "Health insurance valid in the UAE",
  "Emirates ID registration upon arrival",
  "Property must be freehold in a designated area",
  "No prior UAE visa violations or overstays",
];

const familyInclusion = [
  { member: "Spouse", included: true, note: "Automatically included in Golden Visa" },
  { member: "Children (any age)", included: true, note: "Unmarried children of any age included" },
  { member: "Parents", included: true, note: "Can be sponsored on dependent visa" },
  { member: "Domestic staff", included: true, note: "Up to 2 domestic helpers can be sponsored" },
  { member: "Business partners", included: false, note: "Must apply independently" },
];

const faqs = [
  {
    q: "Do I need to live in Dubai to keep my Golden Visa?",
    a: "No. The Golden Visa has no minimum stay requirement. You can live anywhere in the world and maintain your UAE residency, provided the visa remains valid. However, you will need an Emirates ID for banking and administrative purposes.",
  },
  {
    q: "Can I work or start a business on a Golden Visa?",
    a: "Yes. The Golden Visa grants full working rights in the UAE. You can be employed, start a business, or invest freely without the need for a local sponsor or partner.",
  },
  {
    q: "Is property income taxable?",
    a: "No. There is no rental income tax, no capital gains tax, and no property tax in Dubai. The only recurring costs are service charges and maintenance fees set by the building or community.",
  },
  {
    q: "Can I buy property under mortgage and still get the Golden Visa?",
    a: "Yes. Properties under mortgage are eligible as long as the property's value meets the AED 2M threshold. The total property value — not your equity — is what counts.",
  },
  {
    q: "What are freehold areas?",
    a: "Freehold areas are designated zones where foreign nationals can own property outright. Major freehold areas include Palm Jumeirah, Downtown Dubai, Dubai Marina, JBR, Business Bay, Dubai Hills, and many others across the emirate.",
  },
  {
    q: "How long does the Golden Visa application take?",
    a: "Typically 2–4 weeks from document submission. Once the title deed is registered and documents are submitted to ICP (Federal Authority for Identity, Citizenship, Customs and Ports Security), the visa is issued quickly — often within 5-10 business days.",
  },
  {
    q: "Can I get a UAE driving licence?",
    a: "Yes. Residents from most countries can exchange their existing driving licence for a UAE licence without a driving test. Others may need to complete a short course.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function DubaiResidencePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-end">
        <div
          className="absolute inset-0 bg-gray-900 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-20">
          <div className="max-w-3xl">
            <div className="text-sm text-white/60 uppercase tracking-wider mb-4 font-medium">
              Residence Permit
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-6">
              Dubai
            </h1>
            <p className="text-white/80 text-lg max-w-xl mb-8">
              The world's premier tax-free destination. Secure a 10-year Golden Visa through property investment in one of the fastest-growing real estate markets globally.
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

      {/* Why Dubai */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl font-serif text-black mb-6">Why Dubai</h2>
              <div className="space-y-4 text-neutral-500 text-[16px] font-light leading-relaxed">
                <p>
                  Dubai has transformed from a desert outpost to the world's most ambitious city in under five decades. Today it is a global centre for finance, trade, tourism, and technology — home to 3.6 million residents from over 200 nationalities.
                </p>
                <p>
                  The UAE's Golden Visa programme, launched in 2019 and expanded in 2022, offers 10-year renewable residency through property investment. With zero income tax, world-class infrastructure, and one of the planet's safest environments, Dubai has become the relocation destination of choice for high-net-worth individuals and families worldwide.
                </p>
                <p>
                  The property market has seen exceptional growth — particularly in prime areas like Palm Jumeirah, Downtown, and Dubai Marina — driven by sustained demand from international investors and an influx of professionals relocating from Europe, Asia, and the CIS region.
                </p>
              </div>
            </div>
            <div>
              <div
                className="relative h-[400px] rounded-2xl overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Burj Khalifa District</div>
                  <div className="text-white font-serif text-xl">The centre of ambition</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six Reasons Grid */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">The Dubai advantage</h2>
            <p className="text-neutral-500 text-lg font-light">
              Six reasons why Dubai consistently ranks as the world's top relocation destination.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {whyDubai.map((item) => (
              <div key={item.number} className="group">
                <div className="text-4xl font-serif text-neutral-200 mb-4 group-hover:text-accent transition-colors duration-500">
                  {item.number}
                </div>
                <h3 className="text-lg font-serif text-black mb-2">{item.title}</h3>
                <p className="text-neutral-500 text-[15px] font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Types */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">Visa categories</h2>
            <p className="text-neutral-500 text-lg font-light">
              Multiple pathways to UAE residency — from long-term Golden Visas to flexible remote work permits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visaTypes.map((visa, i) => (
              <div
                key={visa.title}
                className="border border-neutral-200 rounded-2xl p-8 md:p-10 bg-white"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-4xl font-serif text-neutral-200 mb-2">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-serif text-black">{visa.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Minimum</div>
                    <div className="text-lg font-serif text-black">{visa.minimum}</div>
                  </div>
                </div>
                <p className="text-neutral-500 text-[15px] font-light leading-relaxed mb-6">
                  {visa.description}
                </p>
                <ul className="space-y-2.5">
                  {visa.details.map((detail, j) => (
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
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">Market intelligence</h2>
            <p className="text-neutral-500 text-lg font-light">
              Real-time data on Dubai's property market, competitive positioning, and demographic landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Prices by Area */}
            <Card className="border-neutral-200 shadow-none rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full bg-neutral-300" />
                  <CardTitle className="font-serif text-xl">Property Prices by Area</CardTitle>
                </div>
                <CardDescription>Average residential price per m² (EUR) across Dubai's freehold zones</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={areaPriceConfig} className="h-[340px] w-full">
                  <BarChart data={areaPrices} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                    <YAxis dataKey="area" type="category" tickLine={false} axisLine={false} tickMargin={8} width={110} fontSize={12} />
                    <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="price" radius={[0, 6, 6, 0]}>
                      {areaPrices.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "#00b7d0" : "#d4d4d4"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Market Growth — Area Chart */}
            <Card className="border-neutral-200 shadow-none rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full bg-neutral-300" />
                  <CardTitle className="font-serif text-xl">Market Growth Trajectory</CardTitle>
                </div>
                <CardDescription>Residential and off-plan property index (2019 = 100)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={growthConfig} className="h-[340px] w-full">
                  <AreaChart data={marketGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[80, 240]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <defs>
                      <linearGradient id="fillResidential" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00b7d0" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#00b7d0" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <Area dataKey="residential" type="natural" fill="url(#fillResidential)" stroke="#00b7d0" strokeWidth={2} />
                    <Area dataKey="offPlan" type="natural" fill="transparent" stroke="#d4d4d4" strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Residency Program Comparison — Radar */}
            <Card className="border-neutral-200 shadow-none rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full bg-neutral-300" />
                  <CardTitle className="font-serif text-xl">Residency Comparison</CardTitle>
                </div>
                <CardDescription>Dubai vs European residency programs across key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={comparisonConfig} className="h-[340px] w-full mx-auto max-w-lg">
                  <RadarChart data={residencyComparison}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" tickLine={false} className="text-[11px]" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Radar dataKey="dubai" fill="#00b7d0" fillOpacity={0.15} stroke="#00b7d0" strokeWidth={2} />
                    <Radar dataKey="spain" fill="#a3a3a3" fillOpacity={0.05} stroke="#a3a3a3" strokeWidth={1.5} />
                    <Radar dataKey="portugal" fill="#d4d4d4" fillOpacity={0.05} stroke="#d4d4d4" strokeWidth={1.5} />
                    <Radar dataKey="malta" fill="#737373" fillOpacity={0.05} stroke="#737373" strokeWidth={1.5} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Expat Demographics */}
            <Card className="border-neutral-200 shadow-none rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full bg-neutral-300" />
                  <CardTitle className="font-serif text-xl">Expat Demographics</CardTitle>
                </div>
                <CardDescription>Foreign resident population breakdown by region of origin (%)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={expatBreakdownConfig} className="h-[340px] w-full">
                  <BarChart data={expatBreakdown} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="nationality" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[0, 50]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                      {expatBreakdown.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "#00b7d0" : "#d4d4d4"} />
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
      <section className="py-20 bg-white">
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
        title="The Residency Insights"
        description="Join Özkan Tekçe and our Dubai experts as they discuss the Golden Visa, 0% tax residency, and the booming real estate market of the UAE."
      />

      {/* Step-by-step Process */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">How it works</h2>
            <p className="text-neutral-500 text-lg font-light">
              From first consultation to Emirates ID — a seamless, fully managed process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              { step: "01", title: "Strategy Consultation", desc: "We assess your goals — investment, lifestyle, tax planning — and recommend the optimal visa category and property strategy." },
              { step: "02", title: "Property Selection", desc: "Curated shortlists of qualifying properties. Virtual tours, developer due diligence, and ROI projections provided." },
              { step: "03", title: "Purchase & Registration", desc: "Sales agreement, title deed transfer through the Dubai Land Department, and escrow management handled end-to-end." },
              { step: "04", title: "Visa Application", desc: "Documents submitted to ICP. Medical fitness test and Emirates ID biometrics completed in Dubai." },
              { step: "05", title: "Family Sponsorship", desc: "Spouse, children, and dependent applications processed simultaneously. Domestic staff visas arranged if needed." },
              { step: "06", title: "Settlement Support", desc: "Bank account opening, driving licence exchange, school enrollment, and healthcare registration. Full concierge service." },
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
      <section className="py-20 bg-white">
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

      <ConsultationCTA consultant={3} />
    </div>
  );
}
