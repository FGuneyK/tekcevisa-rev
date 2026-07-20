"use client";

import { MoveRight, MapPin, Building, Briefcase } from "lucide-react";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { PodcastCTA } from "@/components/PodcastCTA";
import { VideoSection } from "@/components/VideoSection";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const cityPrices = [
  { city: "Bodrum", price: 3200 },
  { city: "Istanbul", price: 2100 },
  { city: "Antalya", price: 1800 },
  { city: "Mersin", price: 950 },
  { city: "Ankara", price: 850 },
];

const cityPriceConfig = {
  price: {
    label: "Price/m² (€)",
    color: "#00b7d0",
  },
} satisfies ChartConfig;

const propertyGrowth = [
  { year: "2019", index: 100 },
  { year: "2020", index: 115 },
  { year: "2021", index: 145 },
  { year: "2022", index: 210 },
  { year: "2023", index: 280 },
  { year: "2024", index: 305 },
];

const growthConfig = {
  index: {
    label: "Price Index",
    color: "#00b7d0",
  },
} satisfies ChartConfig;

export default function TurkeyResidencePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-end">
        <div
          className="absolute inset-0 bg-gray-900 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1713885639308-d953cc619ffd?q=80&w=2000&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-20">
          <div className="max-w-3xl">
            <div className="text-sm text-white/60 uppercase tracking-wider mb-4 font-medium">
              Residence by Investment & Lifestyle
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-6">
              Türkiye
            </h1>
            <p className="text-white/80 text-lg max-w-xl mb-8">
              Experience the perfect blend of modern European lifestyle and rich Anatolian heritage. Uncover residency pathways through real estate, the new Digital Nomad Visa, and strategic investments.
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
            {[
              { label: "Processing Time", value: "1-2 Months" },
              { label: "Minimum Investment", value: "From $200,000" },
              { label: "Family Inclusion", value: "Spouse & Dependents" },
              { label: "Path to Citizenship", value: "After 5 Years" },
            ].map((stat) => (
              <div key={stat.label} className="py-8 px-4 text-center">
                <div className="text-sm text-neutral-500 mb-2">{stat.label}</div>
                <div className="font-serif text-xl md:text-2xl text-black">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif text-black mb-8 leading-tight">
                A dynamic hub for expatriates, digital nomads, and global investors.
              </h2>
              <div className="space-y-6 text-neutral-600 text-lg font-light leading-relaxed">
                <p>
                  Türkiye has evolved into one of the most sought-after destinations for global mobility. With a rapidly growing expatriate community, world-class healthcare, and an exceptionally low cost of living, it offers an unparalleled Mediterranean lifestyle.
                </p>
                <p>
                  Whether you are seeking a permanent relocation through real estate investment, or taking advantage of the newly introduced Digital Nomad Visa, Türkiye provides strategic residency options designed for flexibility and security.
                </p>
              </div>
            </div>
            <div>
              <div
                className="relative h-[500px] rounded-2xl overflow-hidden bg-cover bg-center shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1582380455979-01b089609f40?q=80&w=1200&auto=format&fit=crop')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Mediterranean Coast</div>
                  <div className="text-white font-serif text-xl">Antalya, Türkiye</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section (User Requested) */}
      <VideoSection
        videoId="m3S2Qrqf7hw"
        title="0% Tax for Expats? Antalya Expat Guide in 2026"
        description="Explore the new Digital Nomad Visa and the realities of expatriate life in Türkiye. From 0% tax possibilities to the vibrant lifestyle of Antalya, discover why Türkiye is rapidly becoming the ultimate destination for global nomads and investors alike."
        tag="Digital Nomad Visa"
      />

      {/* Residency Routes */}
      <section className="py-24 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">Residency Routes</h2>
            <p className="text-neutral-500 text-lg font-light">
              Tailored pathways granting long-term residency rights for you and your family in Türkiye.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: "Real Estate Residency",
                amount: "From $200,000",
                desc: "Purchase a qualifying property worth at least $200,000 in open districts. Grants immediate residency for the entire family with a direct route to citizenship after 5 years.",
              },
              {
                icon: Briefcase,
                title: "Digital Nomad Visa",
                amount: "Income Based",
                desc: "A newly introduced visa allowing remote workers to live in Türkiye. Benefit from potential tax exemptions and a streamlined application process tailored for global professionals.",
              },
              {
                icon: MapPin,
                title: "Touristic Residence",
                amount: "Rental/Income",
                desc: "Short-term residency option typically granted for 1 year based on long-term rental agreements and proof of sufficient financial means to reside in Türkiye.",
              },
            ].map((route, i) => (
              <div key={i} className="bg-white border border-neutral-200 p-10 rounded-2xl flex flex-col group hover:border-accent hover:shadow-[0_8px_30px_rgb(0,183,208,0.1)] transition-all duration-300">
                <route.icon className="w-10 h-10 text-neutral-300 group-hover:text-accent mb-6 transition-colors" strokeWidth={1.5} />
                <h3 className="text-2xl font-serif text-black mb-2">{route.title}</h3>
                <div className="text-accent text-sm font-medium mb-6 uppercase tracking-wider">{route.amount}</div>
                <p className="text-neutral-500 font-light leading-relaxed mb-8 flex-1">
                  {route.desc}
                </p>
                <div className="mt-auto">
                  <a href="/contact" className="inline-flex items-center text-sm font-medium text-black group-hover:text-accent transition-colors">
                    Learn more <MoveRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">Market intelligence</h2>
            <p className="text-neutral-500 text-lg font-light">
              Data-driven insights into Turkish real estate, property values, and living costs.
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
                <CardDescription>Average residential price per m² (EUR) across key Turkish destinations</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={cityPriceConfig} className="h-[320px] w-full">
                  <BarChart data={cityPrices} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                    <YAxis dataKey="city" type="category" tickLine={false} axisLine={false} tickMargin={8} width={80} fontSize={12} />
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
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[80, 350]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line dataKey="index" type="natural" stroke="#00b7d0" strokeWidth={2.5} dot={{ fill: "#00b7d0", r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <PodcastCTA
        title="The Türkiye Dialogues"
        description="Gain exclusive insights into global mobility, citizenship by investment, and the world's most prestigious real estate markets. Join TEKCE Visa's leading experts as they navigate the complexities of international relocation and investment."
      />

      {/* Step-by-step Process */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-serif text-black mb-4">How it works</h2>
            <p className="text-neutral-500 text-lg font-light">
              From application to receiving your residence permit — a completely managed process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              { step: "01", title: "Document Preparation", desc: "We gather and notarize all required documents, including health insurance, tax numbers, and proof of income or investment." },
              { step: "02", title: "Property or Rental Registration", desc: "Completing the purchase process for real estate or registering your rental agreement with a local notary." },
              { step: "03", title: "Application Submission", desc: "Submitting your file to the Directorate General of Migration Management (GÖÇ) and booking your residency appointment." },
              { step: "04", title: "Appointment & Fingerprints", desc: "Attending the brief in-person appointment. Our legal team will accompany you to ensure smooth communication." },
              { step: "05", title: "Approval & Card Issuance", desc: "Your application is approved and your Turkish Residence Card (İkamet) is delivered directly to your address." },
              { step: "06", title: "Renewals & Citizenship", desc: "We monitor your residency timeline, manage annual renewals, and initiate citizenship applications at the 5-year mark." },
            ].map((item) => (
              <div key={item.step} className="group">
                <div className="text-4xl font-serif text-neutral-200 mb-4 group-hover:text-accent transition-colors duration-500">
                  {item.step}
                </div>
                <h3 className="text-xl font-medium text-black mb-3">{item.title}</h3>
                <p className="text-neutral-500 font-light leading-relaxed text-[15px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA consultant={4} />
    </div>
  );
}
