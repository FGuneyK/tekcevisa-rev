"use client";

import { MoveRight } from "lucide-react";
import React, { useState, useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  MOCK DATA — Broad immigration & country intelligence               */
/* ------------------------------------------------------------------ */

// Population growth of key immigration destinations (millions)
const populationTrends = [
  { year: "2018", turkiye: 82.0, portugal: 10.3, malta: 0.49, spain: 46.7, uae: 9.5 },
  { year: "2019", turkiye: 83.2, portugal: 10.3, malta: 0.50, spain: 47.0, uae: 9.7 },
  { year: "2020", turkiye: 84.0, portugal: 10.3, malta: 0.52, spain: 47.3, uae: 9.9 },
  { year: "2021", turkiye: 84.7, portugal: 10.3, malta: 0.52, spain: 47.4, uae: 9.9 },
  { year: "2022", turkiye: 85.3, portugal: 10.4, malta: 0.53, spain: 47.6, uae: 9.4 },
  { year: "2023", turkiye: 85.8, portugal: 10.5, malta: 0.54, spain: 48.0, uae: 9.5 },
  { year: "2024", turkiye: 86.3, portugal: 10.6, malta: 0.55, spain: 48.6, uae: 10.1 },
];

// Average residential real estate price per m² (EUR)
const realEstatePrices = [
  { city: "Istanbul", price: 1850, country: "Türkiye" },
  { city: "Lisbon", price: 4200, country: "Portugal" },
  { city: "Valletta", price: 4800, country: "Malta" },
  { city: "Barcelona", price: 4350, country: "Spain" },
  { city: "Dubai Marina", price: 5100, country: "UAE" },
  { city: "Riga", price: 1950, country: "Latvia" },
  { city: "Antalya", price: 1200, country: "Türkiye" },
];

// Cost of living index (New York = 100)
const costOfLiving = [
  { metric: "Rent", turkiye: 18, portugal: 42, malta: 48, spain: 38, uae: 55 },
  { metric: "Groceries", turkiye: 28, portugal: 45, malta: 52, spain: 43, uae: 48 },
  { metric: "Transport", turkiye: 22, portugal: 40, malta: 38, spain: 42, uae: 35 },
  { metric: "Healthcare", turkiye: 30, portugal: 48, malta: 55, spain: 50, uae: 45 },
  { metric: "Education", turkiye: 25, portugal: 38, malta: 60, spain: 40, uae: 65 },
  { metric: "Dining Out", turkiye: 20, portugal: 42, malta: 50, spain: 40, uae: 52 },
];

// Visa-free access by passport (number of countries)
const visaFreeAccess = [
  { country: "Türkiye", visaFree: 118, fill: "var(--chart-1)" },
  { country: "Portugal", visaFree: 191, fill: "var(--chart-2)" },
  { country: "Malta", visaFree: 190, fill: "var(--chart-3)" },
  { country: "Spain", visaFree: 194, fill: "var(--chart-4)" },
  { country: "Caribbean", visaFree: 144, fill: "var(--chart-5)" },
];

// Golden Visa / CBI minimum investment thresholds (EUR thousands)
const investmentMinimums: Record<string, { country: string; investment: number; category: string }[]> = {
  "All": [
    { country: "Türkiye", investment: 400, category: "Real Estate" },
    { country: "Portugal", investment: 500, category: "Fund Investment" },
    { country: "Malta", investment: 690, category: "Combined" },
    { country: "Caribbean", investment: 100, category: "Donation" },
    { country: "Dubai", investment: 550, category: "Real Estate" },
    { country: "Latvia", investment: 250, category: "Real Estate" },
  ],
  "Citizenship": [
    { country: "Türkiye", investment: 400, category: "Real Estate" },
    { country: "Malta", investment: 690, category: "Combined" },
    { country: "Caribbean", investment: 100, category: "Donation" },
    { country: "Portugal", investment: 500, category: "Fund Investment" },
  ],
  "Residency": [
    { country: "Spain", investment: 500, category: "Real Estate" },
    { country: "Dubai", investment: 550, category: "Real Estate" },
    { country: "Latvia", investment: 250, category: "Real Estate" },
    { country: "Portugal", investment: 500, category: "Fund Investment" },
  ],
};

// International schools per country
const internationalSchools = [
  { country: "Türkiye", schools: 185, students: 62000 },
  { country: "Portugal", schools: 45, students: 18000 },
  { country: "Malta", schools: 12, students: 5200 },
  { country: "Spain", schools: 220, students: 85000 },
  { country: "UAE", schools: 310, students: 125000 },
  { country: "Latvia", schools: 8, students: 3100 },
];

// Expat population percentage
const expatPopulation = [
  { country: "UAE", percentage: 88.5, fill: "var(--chart-1)" },
  { country: "Malta", percentage: 21.3, fill: "var(--chart-2)" },
  { country: "Spain", percentage: 12.8, fill: "var(--chart-3)" },
  { country: "Portugal", percentage: 7.4, fill: "var(--chart-4)" },
  { country: "Türkiye", percentage: 4.6, fill: "var(--chart-5)" },
];

// Processing times
const processingTimeData = [
  { country: "Türkiye", avgDays: 90, minDays: 60 },
  { country: "Portugal", avgDays: 180, minDays: 120 },
  { country: "Malta", avgDays: 240, minDays: 180 },
  { country: "Spain", avgDays: 150, minDays: 90 },
  { country: "Dubai", avgDays: 30, minDays: 14 },
  { country: "Latvia", avgDays: 120, minDays: 90 },
  { country: "Caribbean", avgDays: 75, minDays: 45 },
];

// GDP per capita (USD thousands)
const gdpPerCapita = [
  { country: "UAE", gdp: 53.7 },
  { country: "Malta", gdp: 34.8 },
  { country: "Spain", gdp: 30.1 },
  { country: "Portugal", gdp: 26.2 },
  { country: "Latvia", gdp: 21.9 },
  { country: "Türkiye", gdp: 13.1 },
];

// Healthcare quality index (0-100)
const healthcareIndex = [
  { country: "Spain", score: 92 },
  { country: "Portugal", score: 87 },
  { country: "Malta", score: 85 },
  { country: "UAE", score: 82 },
  { country: "Türkiye", score: 69 },
  { country: "Latvia", score: 64 },
];

// Personal income tax top rate (%)
const taxRates = [
  { country: "UAE", rate: 0 },
  { country: "Malta", rate: 35 },
  { country: "Latvia", rate: 31 },
  { country: "Türkiye", rate: 40 },
  { country: "Spain", rate: 47 },
  { country: "Portugal", rate: 48 },
];

/* ------------------------------------------------------------------ */
/*  CHART CONFIGS — neutral palette, accent only for highlights         */
/* ------------------------------------------------------------------ */

const populationConfig: ChartConfig = {
  turkiye: { label: "Türkiye", color: "#00b7d0" },
  portugal: { label: "Portugal", color: "#b0b0b0" },
  spain: { label: "Spain", color: "#d4d4d4" },
  uae: { label: "UAE", color: "#737373" },
};

const realEstateConfig: ChartConfig = {
  price: { label: "Price (€/m²)", color: "#d4d4d4" },
};

const costOfLivingConfig: ChartConfig = {
  turkiye: { label: "Türkiye", color: "#00b7d0" },
  portugal: { label: "Portugal", color: "#a3a3a3" },
  malta: { label: "Malta", color: "#d4d4d4" },
  spain: { label: "Spain", color: "#737373" },
  uae: { label: "UAE", color: "#525252" },
};

const visaFreeConfig: ChartConfig = {
  visaFree: { label: "Countries" },
  "Türkiye": { label: "Türkiye", color: "#d4d4d4" },
  "Portugal": { label: "Portugal", color: "#a3a3a3" },
  "Malta": { label: "Malta", color: "#b0b0b0" },
  "Spain": { label: "Spain", color: "#00b7d0" },
  "Caribbean": { label: "Caribbean", color: "#e5e5e5" },
};

const investmentConfig: ChartConfig = {
  investment: { label: "Min. Investment (€K)", color: "#d4d4d4" },
};

const schoolsConfig: ChartConfig = {
  schools: { label: "Schools", color: "#d4d4d4" },
  students: { label: "Students", color: "#a3a3a3" },
};

const expatConfig: ChartConfig = {
  percentage: { label: "Expat %" },
  "UAE": { label: "UAE", color: "#00b7d0" },
  "Malta": { label: "Malta", color: "#a3a3a3" },
  "Spain": { label: "Spain", color: "#c4c4c4" },
  "Portugal": { label: "Portugal", color: "#d4d4d4" },
  "Türkiye": { label: "Türkiye", color: "#e5e5e5" },
};

const processingConfig: ChartConfig = {
  avgDays: { label: "Average Days", color: "#d4d4d4" },
  minDays: { label: "Minimum Days", color: "#00b7d0" },
};

const gdpConfig: ChartConfig = {
  gdp: { label: "GDP per Capita ($K)", color: "#d4d4d4" },
};

const healthcareConfig: ChartConfig = {
  score: { label: "Healthcare Index", color: "#d4d4d4" },
};

const taxConfig: ChartConfig = {
  rate: { label: "Top Tax Rate %", color: "#d4d4d4" },
};

/* ------------------------------------------------------------------ */
/*  KPI CARDS                                                          */
/* ------------------------------------------------------------------ */

const kpis = [
  {
    title: "Countries Covered",
    value: "7",
    change: "+2 this year",
    trend: "up" as const,
  },
  {
    title: "Avg. Processing",
    value: "126 days",
    change: "-8 days vs Q1",
    trend: "up" as const,
  },
  {
    title: "Visa-Free Access",
    value: "194",
    change: "Best: Spain",
    trend: "neutral" as const,
  },
  {
    title: "Expat Communities",
    value: "3.2M+",
    change: "Across programs",
    trend: "up" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function DataPage() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedProgramType, setSelectedProgramType] = useState("All");

  const filteredInvestmentData = useMemo(() => {
    return investmentMinimums[selectedProgramType] || investmentMinimums["All"];
  }, [selectedProgramType]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section — TEKCE Data specific */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-end">
        <div
          className="absolute inset-0 bg-gray-900 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1562519990-50eb51e282b2?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-16">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white mb-4">
              Data that moves with you.
            </h1>
            <p className="text-white/80 text-lg max-w-xl">
              Market insights, demographic trends, and country-level analytics across every TEKCE destination.
            </p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10 pt-10 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-[180px] bg-white border-neutral-200 rounded-xl">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Countries</SelectItem>
                <SelectItem value="Türkiye">Türkiye</SelectItem>
                <SelectItem value="Portugal">Portugal</SelectItem>
                <SelectItem value="Malta">Malta</SelectItem>
                <SelectItem value="Spain">Spain</SelectItem>
                <SelectItem value="Dubai">Dubai / UAE</SelectItem>
                <SelectItem value="Latvia">Latvia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((kpi) => (
            <Card key={kpi.title} className="border-neutral-200 shadow-none rounded-2xl">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{kpi.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif text-black mb-1.5">{kpi.value}</div>
                <div className="flex items-center gap-1.5">
                  {kpi.trend === "up" && <TrendingUp className="w-3 h-3 text-neutral-400" />}
                  {kpi.trend === "down" && <TrendingDown className="w-3 h-3 text-neutral-400" />}
                  <span className="text-xs text-neutral-400">{kpi.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 1. Population Trends — Area Chart (Full width) */}
          <Card className="lg:col-span-2 border-neutral-200 shadow-none rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-neutral-300" />
                <CardTitle className="font-serif text-xl">Population Trends</CardTitle>
              </div>
              <CardDescription>Population growth across key immigration destinations (millions)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={populationConfig} className="h-[350px] w-full">
                <AreaChart data={populationTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <defs>
                    <linearGradient id="fillTurkiye" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-turkiye)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-turkiye)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="fillSpain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-spain)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--color-spain)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="turkiye" type="natural" fill="url(#fillTurkiye)" stroke="var(--color-turkiye)" strokeWidth={2} />
                  <Area dataKey="spain" type="natural" fill="url(#fillSpain)" stroke="var(--color-spain)" strokeWidth={2} />
                  <Area dataKey="uae" type="natural" fill="transparent" stroke="var(--color-uae)" strokeWidth={2} strokeDasharray="5 5" />
                  <Area dataKey="portugal" type="natural" fill="transparent" stroke="var(--color-portugal)" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 2. Real Estate Prices — Bar Chart */}
          <Card className="border-neutral-200 shadow-none rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-neutral-300" />
                <CardTitle className="font-serif text-xl">Real Estate Prices</CardTitle>
              </div>
              <CardDescription>Average residential price per m² in major cities (EUR)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={realEstateConfig} className="h-[300px] w-full">
                <BarChart data={realEstatePrices} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="city" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="price" radius={[6, 6, 0, 0]}>
                    {realEstatePrices.map((entry, i) => (
                      <Cell key={i} fill={i === 0 || i === 6 ? "var(--chart-1)" : "var(--chart-2)"} fillOpacity={i === 0 || i === 6 ? 1 : 0.6} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 3. Expat Population — Pie/Donut Chart */}
          <Card className="border-neutral-200 shadow-none rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-neutral-300" />
                <CardTitle className="font-serif text-xl">Expat Population</CardTitle>
              </div>
              <CardDescription>Percentage of expats in total population</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={expatConfig} className="h-[300px] w-full mx-auto aspect-square max-h-[300px]">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="country" hideLabel />} />
                  <Pie
                    data={expatPopulation}
                    dataKey="percentage"
                    nameKey="country"
                    innerRadius={60}
                    strokeWidth={3}
                    stroke="white"
                  />
                  <ChartLegend content={<ChartLegendContent nameKey="country" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center" />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 4. Cost of Living — Radar Chart (Full width) */}
          <Card className="lg:col-span-2 border-neutral-200 shadow-none rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-neutral-300" />
                <CardTitle className="font-serif text-xl">Cost of Living Index</CardTitle>
              </div>
              <CardDescription>Comparative index across key categories (New York = 100)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={costOfLivingConfig} className="h-[400px] w-full mx-auto max-w-3xl">
                <RadarChart data={costOfLiving}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tickLine={false} className="text-[12px]" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Radar dataKey="turkiye" fill="var(--color-turkiye)" fillOpacity={0.2} stroke="var(--color-turkiye)" strokeWidth={2} />
                  <Radar dataKey="portugal" fill="var(--color-portugal)" fillOpacity={0.1} stroke="var(--color-portugal)" strokeWidth={2} />
                  <Radar dataKey="spain" fill="var(--color-spain)" fillOpacity={0.1} stroke="var(--color-spain)" strokeWidth={2} />
                  <Radar dataKey="uae" fill="var(--color-uae)" fillOpacity={0.1} stroke="var(--color-uae)" strokeWidth={2} />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 5. Processing Times — Grouped Bar */}
          <Card className="border-neutral-200 shadow-none rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-neutral-300" />
                <CardTitle className="font-serif text-xl">Processing Times</CardTitle>
              </div>
              <CardDescription>Average and minimum processing durations (days)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={processingConfig} className="h-[300px] w-full">
                <BarChart data={processingTimeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="country" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="avgDays" fill="var(--color-avgDays)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="minDays" fill="var(--color-minDays)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 6. Investment Minimums — Bar Chart with filter */}
          <Card className="border-neutral-200 shadow-none rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full bg-neutral-300" />
                  <div>
                    <CardTitle className="font-serif text-xl">Investment Minimums</CardTitle>
                    <CardDescription>Minimum investment thresholds (€K)</CardDescription>
                  </div>
                </div>
                <Select value={selectedProgramType} onValueChange={setSelectedProgramType}>
                  <SelectTrigger className="w-[140px] bg-neutral-50 border-neutral-200 rounded-xl h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Programs</SelectItem>
                    <SelectItem value="Citizenship">Citizenship</SelectItem>
                    <SelectItem value="Residency">Residency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={investmentConfig} className="h-[300px] w-full">
                <BarChart data={filteredInvestmentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="country" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="investment" radius={[6, 6, 0, 0]}>
                    {filteredInvestmentData.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? "var(--chart-1)" : "var(--chart-2)"} fillOpacity={i === 0 ? 1 : 0.5 + (i * 0.1)} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 7. International Schools — Bar Chart */}
          <Card className="border-neutral-200 shadow-none rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-neutral-300" />
                <CardTitle className="font-serif text-xl">International Schools</CardTitle>
              </div>
              <CardDescription>Number of accredited international schools by country</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={schoolsConfig} className="h-[300px] w-full">
                <BarChart data={internationalSchools} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <YAxis dataKey="country" type="category" tickLine={false} axisLine={false} tickMargin={8} width={70} />
                  <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="schools" fill="var(--color-schools)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 8. Visa-Free Access — Horizontal Bar (Full width) */}
          <Card className="lg:col-span-2 border-neutral-200 shadow-none rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-neutral-300" />
                <CardTitle className="font-serif text-xl">Visa-Free Access by Passport</CardTitle>
              </div>
              <CardDescription>Number of countries accessible without a visa</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={visaFreeConfig} className="h-[280px] w-full">
                <BarChart data={visaFreeAccess} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <YAxis dataKey="country" type="category" tickLine={false} axisLine={false} tickMargin={8} width={80} />
                  <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} domain={[0, 200]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="visaFree" radius={[0, 6, 6, 0]}>
                    {visaFreeAccess.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 9. GDP per Capita */}
          <Card className="border-neutral-200 shadow-none rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-neutral-300" />
                <CardTitle className="font-serif text-xl">GDP per Capita</CardTitle>
              </div>
              <CardDescription>Gross domestic product per person (USD thousands)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={gdpConfig} className="h-[300px] w-full">
                <BarChart data={gdpPerCapita} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <YAxis dataKey="country" type="category" tickLine={false} axisLine={false} tickMargin={8} width={70} />
                  <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="gdp" radius={[0, 6, 6, 0]}>
                    {gdpPerCapita.map((entry, i) => (
                      <Cell key={i} fill={i === 0 ? "#00b7d0" : "#d4d4d4"} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 10. Healthcare Quality */}
          <Card className="border-neutral-200 shadow-none rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-neutral-300" />
                <CardTitle className="font-serif text-xl">Healthcare Quality</CardTitle>
              </div>
              <CardDescription>Healthcare system quality index (0–100 scale)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={healthcareConfig} className="h-[300px] w-full">
                <BarChart data={healthcareIndex} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <YAxis dataKey="country" type="category" tickLine={false} axisLine={false} tickMargin={8} width={70} />
                  <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                    {healthcareIndex.map((entry, i) => (
                      <Cell key={i} fill={i === 0 ? "#00b7d0" : "#d4d4d4"} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 11. Personal Income Tax Rates (Full width) */}
          <Card className="lg:col-span-2 border-neutral-200 shadow-none rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-neutral-300" />
                <CardTitle className="font-serif text-xl">Personal Income Tax</CardTitle>
              </div>
              <CardDescription>Top marginal personal income tax rate by country (%)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={taxConfig} className="h-[280px] w-full">
                <BarChart data={taxRates} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="country" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[0, 55]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
                    {taxRates.map((entry, i) => (
                      <Cell key={i} fill={i === 0 ? "#00b7d0" : "#d4d4d4"} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
