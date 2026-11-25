import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Citizenship: [
    { label: "Türkiye", href: "/citizenship/turkey" },
    { label: "Portugal", href: "/citizenship/portugal" },
    { label: "Malta", href: "/citizenship/malta" },
    { label: "Caribbean", href: "/citizenship/caribbean" },
  ],
  Residence: [
    { label: "Dubai", href: "/residence/dubai" },
    { label: "Spain", href: "/residence/spain" },
    { label: "Portugal", href: "/residence/portugal" },
    { label: "Türkiye", href: "/residence/turkey" },
    { label: "Hungary", href: "/residence/hungary" },
    { label: "Latvia", href: "/residence/latvia" },
  ],
  Services: [
    { label: "Company Formation", href: "#" },
    { label: "Tax Advisory", href: "#" },
    { label: "Real Estate", href: "#" },
    { label: "Legal Counsel", href: "#" },
  ],
  Company: [
    { label: "About TEKCE", href: "#" },
    { label: "Case Studies", href: "/cases" },
    { label: "TEKCE Data", href: "/data" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#" },
  ],
};

// Each links to its office page (/contact/[slug], data in lib/officesData.ts)
const offices = [
  { label: "Málaga", slug: "malaga" },
  { label: "Alicante", slug: "alicante" },
  { label: "Lara", slug: "lara" },
  { label: "Konyaaltı", slug: "konyaalti" },
  { label: "Alanya", slug: "alanya" },
  { label: "Belek", slug: "belek" },
  { label: "Cevizlibağ", slug: "cevizlibag" },
  { label: "Göztepe", slug: "goztepe" },
  { label: "Ankara", slug: "ankara" },
  { label: "Bodrum", slug: "bodrum" },
  { label: "Fethiye", slug: "fethiye" },
  { label: "Mersin", slug: "mersin" },
  { label: "Bursa", slug: "bursa" },
  { label: "Trabzon", slug: "trabzon" },
  { label: "Yalova", slug: "yalova" },
  { label: "Girne", slug: "girne" },
  { label: "Dubai", slug: "dubai" },
  { label: "Stockholm", slug: "stockholm" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Main footer content */}
      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10 pt-20 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand column — spans 2 on lg */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/tekcevisa-logo-white.png"
                alt="TEKCE Visa Logo"
                width={140}
                height={35}
                className="h-7 w-auto opacity-90"
              />
            </Link>
            <p className="text-white/40 text-[14px] font-light leading-relaxed max-w-xs mb-8">
              Legal counsel for lives that cross borders. Citizenship, residence, and relocation guidance across 7+ countries.
            </p>
            <div className="space-y-3">
              <div className="text-[11px] text-white/30 uppercase tracking-wider font-medium mb-3">Global Offices</div>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {offices.map((office, idx) => (
                  <div key={office.slug} className="flex items-center gap-3">
                    <Link
                      href={`/contact/${office.slug}`}
                      className="text-[13px] text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {office.label}
                    </Link>
                    {idx < offices.length - 1 && <span className="w-1 h-1 rounded-full bg-white/10" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="text-[11px] text-white/30 uppercase tracking-wider font-medium mb-5">
                {category}
              </div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[13px] text-white/30 font-light">
            © {new Date().getFullYear()} TEKCE. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="#" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Terms</Link>
            <Link href="#" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
