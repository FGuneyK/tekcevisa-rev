"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export interface Country {
    name: string;
    subtitle?: string; // e.g. "Golden Visa" or a listing count — optional
    image: string;
    href: string;
}

interface CountryCarouselProps {
    countries: Country[];
}

export default function CountryCarousel({ countries }: CountryCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollStart = useRef(0);
    const [dragged, setDragged] = useState(false);

    const onPointerDown = (e: React.PointerEvent) => {
        const el = scrollRef.current;
        if (!el) return;
        isDragging.current = true;
        setDragged(false);
        startX.current = e.clientX;
        scrollStart.current = el.scrollLeft;
        el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        const el = scrollRef.current;
        if (!el || !isDragging.current) return;
        const delta = e.clientX - startX.current;
        if (Math.abs(delta) > 4) setDragged(true);
        el.scrollLeft = scrollStart.current - delta;
    };

    const onPointerUp = () => {
        isDragging.current = false;
    };

    return (
        <div
            ref={scrollRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            className="flex gap-5 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        >
            {countries.map((country) => (
                <a
                    key={country.name}
                    href={country.href}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onClick={(e) => {
                        // Prevent navigation from firing right after a drag gesture
                        if (dragged) e.preventDefault();
                    }}
                    className="group relative flex-shrink-0 w-[240px] sm:w-[270px] h-[340px] sm:h-[380px] overflow-hidden rounded-md"
                >
                    <div
                        draggable={false}
                        className="absolute inset-0 bg-gray-800 bg-cover bg-center transition-transform duration-700 ease-out pointer-events-none group-hover:scale-105"
                        style={{ backgroundImage: `url('${country.image}')` }}
                    />
                    {/* Subtle legibility gradient, only the lower part */}
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

                    <div className="relative z-10 h-full flex flex-col justify-end p-5 pointer-events-none">
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <h4 className="font-serif text-2xl text-white leading-none mb-1.5">
                                    {country.name}
                                </h4>
                                {country.subtitle && (
                                    <span className="text-[11px] tracking-widest uppercase text-white/70">
                                        {country.subtitle}
                                    </span>
                                )}
                            </div>

                            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/50 text-white transition-colors group-hover:bg-white group-hover:text-black">
                                <ArrowRight size={14} />
                            </span>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}