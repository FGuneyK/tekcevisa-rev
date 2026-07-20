"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Platform = "Trustpilot" | "Google" | "Yandex";

interface Review {
  id: number;
  name: string;
  countryCode: string; // Used for emoji flag
  avatar: string;
  platform: Platform;
  text: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    name: "Angela Curry",
    countryCode: "🇺🇸",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop",
    platform: "Trustpilot",
    text: "My process became more complicated than expected, but TEKCE Visa was 100% by my side. The support and Due Diligence Process they offered were exceptional. As an American, I was a bit clueless about how things worked in Europe, but they guided me through every step of my Golden Visa application in Spain. I couldn't be happier with their dedication.",
  },
  {
    id: 2,
    name: "John Smith",
    countryCode: "🇬🇧",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    platform: "Google",
    text: "Our experience with TEKCE Visa exceeded our expectations. From the very beginning, everything was well-structured and clearly organized. The team was always available, proactive, and extremely knowledgeable about the Portuguese D7 visa. They ensured we felt confident at every stage of the process.",
  },
  {
    id: 3,
    name: "Uduak Essien",
    countryCode: "🇳🇬",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    platform: "Trustpilot",
    text: "TEKCE Visa is a highly professional and well-organized company. I would give them 5 stars without hesitation. Eunice took over my case for the Malta permanent residency, and the experience became absolutely perfect. She was proactive, paid attention to all details, and made sure all documents were seamlessly filed.",
  },
  {
    id: 4,
    name: "Robert Muller",
    countryCode: "🇩🇪",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    platform: "Trustpilot",
    text: "Outstanding service! They helped my family obtain citizenship in Türkiye smoothly. The communication was excellent, and they handled all the paperwork efficiently. Highly recommend their legal team to anyone looking for reliable representation.",
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    countryCode: "🇨🇦",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    platform: "Google",
    text: "The team at TEKCE Visa made our relocation to Dubai seamless. We were worried about the legal complexities, but they simplified everything for us. A truly premium service that delivers on its promises. I felt fully supported throughout the entire journey.",
  },
  {
    id: 6,
    name: "Liam O'Connor",
    countryCode: "🇮🇪",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    platform: "Trustpilot",
    text: "I've worked with several immigration lawyers before, but TEKCE Visa stands out. Their transparency and dedication to my Caribbean citizenship application were commendable. The process was completely stress-free and very straightforward.",
  },
  {
    id: 7,
    name: "Chloe Dubois",
    countryCode: "🇫🇷",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    platform: "Yandex",
    text: "From the initial consultation to receiving our passports, the level of professionalism was top-notch. They navigated the complex residency requirements with ease. Thank you for your exceptional support and guidance during our transition.",
  },
  {
    id: 8,
    name: "Hiroshi Tanaka",
    countryCode: "🇯🇵",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    platform: "Google",
    text: "Navigating the Hungarian residency program seemed daunting, but the experts at TEKCE Visa were incredibly supportive. They answered all our questions promptly and ensured all documents were perfectly prepared. A truly outstanding team.",
  },
  {
    id: 9,
    name: "Mateo Rossi",
    countryCode: "🇮🇹",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
    platform: "Trustpilot",
    text: "A fantastic experience from start to finish. The advisors were very knowledgeable about the various citizenship by investment programs. They helped us choose the best option for our specific needs and executed it flawlessly.",
  }
];

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  if (platform === "Trustpilot") {
    return (
      <div className="flex items-center gap-1.5 mt-3 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#00B67A">
          <path d="M12 0l3.09 9.5h10.01l-8.1 5.88 3.09 9.5-8.09-5.88-8.09 5.88 3.09-9.5-8.1-5.88h10.01z" />
        </svg>
        <span className="font-bold text-[#191919] text-[15px]">Trustpilot</span>
      </div>
    );
  }
  if (platform === "Google") {
    return (
      <div className="flex items-center gap-1.5 mt-3 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </div>
    );
  }
  if (platform === "Yandex") {
    return (
      <div className="flex items-center gap-1.5 mt-3 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#FF0000">
          <path d="M12.984 12.016l5.766-10.031h-2.531l-4.219 7.828-4.219-7.828h-2.531l5.766 10.031v9.984h2.969v-9.984z" />
        </svg>
        <span className="font-bold text-[#191919] text-[15px]">Yandex</span>
      </div>
    );
  }
  return null;
};

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Randomize the reviews on the client side to avoid hydration mismatch
    const shuffled = [...reviewsData].sort(() => 0.5 - Math.random());
    setDisplayedReviews(shuffled.slice(0, 3));
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder structure with the same layout but empty/skeleton content
    return (
      <section className="py-16 bg-neutral-100/50">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-serif text-black mb-3">Client Reviews</h2>
              <p className="text-neutral-600 text-lg">
                These clients have successfully obtained citizenship or residency with our guidance.
              </p>
            </div>
            <button className="px-5 py-2 border border-neutral-300 rounded text-sm font-medium hover:bg-neutral-50 transition-colors">
              All reviews
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 border border-neutral-200 h-[380px] animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-neutral-100/50">
      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-[2.5rem] font-serif text-black mb-3 leading-tight">Client Reviews</h2>
            <p className="text-neutral-600 text-lg">
              These clients have successfully obtained citizenship or residency with our guidance.
            </p>
          </div>
          <button className="px-6 py-2.5 border border-neutral-300 text-neutral-800 rounded-lg text-sm font-medium hover:border-neutral-400 transition-colors">
            All reviews
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-black text-[17px] leading-tight mb-1">{review.name}</h3>
                  <p className="text-neutral-500 text-sm">TEKCE Visa Client</p>
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-100">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 text-lg drop-shadow-sm bg-white rounded-full leading-none">
                    {review.countryCode}
                  </div>
                </div>
              </div>

              <PlatformIcon platform={review.platform} />

              <div className="relative flex-grow">
                <p className="text-neutral-600 text-[15px] leading-[1.7] relative z-10">
                  {review.text}
                </p>
                {/* Fade effect at the bottom in case we want to visually mimic the screenshot */}
                {review.text.length > 200 && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
