import { MoveRight, Play } from "lucide-react";

interface PodcastCTAProps {
  title?: string;
  description?: string;
  href?: string;
}

const episodes = [
  { ep: "24", title: "UAE Golden Visa: 0% Tax Realities", date: "Oct 12", bg: "bg-gradient-to-br from-indigo-950 to-slate-900" },
  { ep: "23", title: "Navigating Spain's New Housing Laws", date: "Sep 28", bg: "bg-gradient-to-br from-stone-800 to-stone-950" },
  { ep: "22", title: "Turkish CIP: Real Estate vs. Funds", date: "Sep 15", bg: "bg-gradient-to-br from-teal-950 to-neutral-900" },
  { ep: "21", title: "The Rise of Digital Nomads in Dubai", date: "Aug 30", bg: "bg-gradient-to-br from-slate-800 to-zinc-950" },
  { ep: "20", title: "Global Mobility: Family Relocation", date: "Aug 14", bg: "bg-gradient-to-br from-amber-950 to-stone-950" },
  { ep: "19", title: "Cyprus Permanent Residency Guide", date: "Jul 22", bg: "bg-gradient-to-br from-blue-950 to-slate-900" },
];

export function PodcastCTA({
  title = "Global Horizons Podcast",
  description = "Gain exclusive insights into global mobility, citizenship by investment, and the world's most prestigious real estate markets. Join TEKCE Visa's leading experts as they navigate the complexities of international relocation and investment.",
  href = "#"
}: PodcastCTAProps) {
  return (
    <section className="py-24 bg-[#fcfcfc] border-y border-neutral-100 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left Side: Content */}
          <div className="lg:col-span-5 text-center lg:text-left pr-0 lg:pr-6">
            <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">
              {title}
            </h2>
            <p className="text-neutral-500 text-[15px] font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10">
              {description}
            </p>
            <a
              href={href}
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-black/80 transition-colors"
            >
              All Episodes <MoveRight size={14} strokeWidth={1.5} />
            </a>
          </div>

          {/* Middle: Latest Episodes */}
          <div className="lg:col-span-4 lg:px-4">
            <div className="flex items-center justify-between mb-5">
              <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium">Latest Episodes</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {episodes.map((episode) => (
                <div
                  key={episode.ep}
                  className={`relative aspect-square ${episode.bg} rounded-lg p-3.5 flex flex-col justify-between group cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-white/70 font-medium">EP {episode.ep}</span>
                    <div className="w-5 h-5 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:border-white transition-colors duration-500">
                      <Play size={8} className="text-white group-hover:text-black transition-colors duration-500 ml-0.5" />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-[12px] font-medium text-white leading-[1.3] mb-1.5 line-clamp-3">
                      {episode.title}
                    </h4>
                    <span className="text-[9px] text-white/50">{episode.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block lg:col-span-1 h-full relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full max-h-[240px] bg-neutral-200" />
          </div>

          {/* Right Side: Host Info */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center">
            <div className="w-36 h-36 rounded-full overflow-hidden mb-6 bg-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-neutral-200/50">
              <img
                src="/Ozkan-Tekce-profile.png"
                alt="Özkan Tekçe"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-medium mb-3">
              Your Host
            </div>
            <div className="text-[22px] font-serif text-black mb-1">
              Özkan Tekçe
            </div>
            <div className="text-[12px] text-neutral-500 font-light">
              TEKCE COO
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
