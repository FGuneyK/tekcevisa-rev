import { DataDashboard } from "@/components/data/DataDashboard";

export default function DataPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero — compact, because the dashboard is the page */}
      <section className="relative flex items-end min-h-[46vh] sm:min-h-[54vh] bg-black pt-36">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1562519990-50eb51e282b2?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/70" />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-14">
          <div className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium mb-5">
              TEKCE Data
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight text-white mb-5">
              Every destination, on the same scale.
            </h1>
            <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-xl">
              Fourteen comparable metrics across seven markets. Filter by the service
              you are weighing up, narrow to the destinations you are considering,
              and the whole board answers together.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-24">
        <DataDashboard />
      </div>
    </div>
  );
}
