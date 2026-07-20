interface VideoSectionProps {
  videoId: string;
  title: string;
  description: string;
  tag?: string;
}

export function VideoSection({ 
  videoId, 
  title, 
  description, 
  tag = "Featured Insight" 
}: VideoSectionProps) {
  return (
    <section className="py-24 bg-white border-y border-neutral-100">
      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="text-[10px] text-neutral-400 uppercase tracking-[0.25em] font-medium mb-5">
              {tag}
            </div>
            <h2 className="text-3xl md:text-[2.5rem] font-serif text-black mb-6 leading-tight">
              {title}
            </h2>
            <div className="w-12 h-px bg-accent mb-6" />
            <p className="text-neutral-500 text-[15px] font-light leading-relaxed">
              {description}
            </p>
          </div>

          {/* Video Embed */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-100 shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-neutral-200/50 group">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
                title={title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
