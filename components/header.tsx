"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MoveRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  NAV DATA                                                           */
/* ------------------------------------------------------------------ */

interface SubItem {
  label: string;
  href: string;
  tag?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: SubItem[];
}

const NAV: NavItem[] = [
  {
    label: "Citizenship",
    href: "/citizenship",
    children: [
      { label: "Türkiye", href: "/citizenship/turkey", tag: "From €400K" },
      { label: "Portugal", href: "/citizenship/portugal", tag: "From €500K" },
      { label: "Malta", href: "/citizenship/malta", tag: "From €690K" },
      { label: "Caribbean", href: "/citizenship/caribbean", tag: "From €100K" },
    ],
  },
  {
    label: "Residence",
    href: "/residence",
    children: [
      { label: "Dubai", href: "/residence/dubai", tag: "0% Tax" },
      { label: "Spain", href: "/residence/spain", tag: "EU Residency" },
      { label: "Portugal", href: "/residence/portugal", tag: "Golden Visa" },
      { label: "Türkiye", href: "/residence/turkey", tag: "From €75K" },
      { label: "Hungary", href: "/residence/hungary", tag: "EU & Schengen" },
      { label: "Latvia", href: "/residence/latvia", tag: "EU Residency" },
    ],
  },
  { label: "Cases", href: "/cases" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "#" },
  { label: "TEKCE Data", href: "/data" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_NAV: NavItem[] = [
  NAV[0], // Citizenship
  NAV[1], // Residence
  { label: "Cases", href: "/cases" },
  { label: "Contact", href: "#" },
];

const OFFICES = [
  "Málaga", "Alicante", "Barcelona", "Antalya", "İstanbul", "Ankara",
  "Bodrum", "Muğla", "Mersin", "Bursa", "Trabzon", "Yalova",
  "İzmir", "Girne", "Dubai", "Stockholm"
];

/* ------------------------------------------------------------------ */
/*  DROPDOWN COMPONENT                                                 */
/* ------------------------------------------------------------------ */

function NavDropdown({ item, isScrolled }: { item: NavItem; isScrolled: boolean }) {
  if (!item.children) {
    return (
      <Link href={item.href} className="hover:opacity-70 transition-opacity">
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative group/nav">
      <Link
        href={item.href}
        className="hover:opacity-70 transition-opacity flex items-center gap-1"
      >
        {item.label}
        <svg className="h-2.5 w-2.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>

      {/* Dropdown */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-1 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-200 ease-out z-50">
        <div className="bg-white text-black shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl border border-neutral-100 overflow-hidden min-w-[220px]">
          <div className="py-2">
            {/* Parent link */}
            <Link
              href={item.href}
              className="flex items-center justify-between px-5 py-2.5 text-[11px] uppercase tracking-wider text-neutral-400 hover:text-accent transition-colors"
            >
              All {item.label}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <div className="mx-4 border-t border-neutral-100" />
            {/* Country links */}
            {item.children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                className="flex items-center justify-between px-5 py-3 hover:bg-neutral-50 transition-colors group/item"
              >
                <span className="text-[14px] text-neutral-700 group-hover/item:text-black transition-colors font-normal">
                  {child.label}
                </span>
                {child.tag && (
                  <span className="text-[11px] text-neutral-400 font-light">
                    {child.tag}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HEADER                                                             */
/* ------------------------------------------------------------------ */

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled
        ? "bg-white text-black shadow-md"
        : "bg-transparent text-white"
        }`}
    >
      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
        <div className="flex justify-between items-center h-[72px] relative">
          {/* Left Side: Hamburger (Mobile) */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-md md:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
              <span className="sr-only">Open menu</span>
            </button>
          </div>

          {/* Center: TEKCE Visa Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex items-center">
              <Image
                src={isScrolled ? "/tekcevisa-logo-blue.png" : "/tekcevisa-logo-white.png"}
                alt="TEKCE Visa Logo"
                width={160}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Right Side: Empty for balance */}
          <div className="hidden md:flex flex-1"></div>
        </div>
      </div>

      {/* Secondary Navigation — visible on every breakpoint, item count adapts */}
      <div className={`border-y ${isScrolled ? "border-gray-200" : "border-white/20"}`}>
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10 flex justify-between items-center h-12">
          {/* Mobile: reduced set */}
          <nav className="flex lg:hidden items-center gap-5 text-[11px] uppercase tracking-wider overflow-x-auto scrollbar-hide whitespace-nowrap">
            {MOBILE_NAV.map((item) => (
              <Link key={item.label} href={item.href} className="hover:opacity-70 transition-opacity">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop: full nav with dropdowns */}
          <nav className="hidden lg:flex items-center space-x-7 text-[11px] uppercase tracking-wider">
            {NAV.map((item) => (
              <NavDropdown key={item.label} item={item} isScrolled={isScrolled} />
            ))}
          </nav>

          {/* Language Selector — same on every breakpoint */}
          <div className="flex items-center gap-5 flex-shrink-0 pl-4">
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-1.5 hover:opacity-70 transition-opacity text-[13px] font-medium uppercase tracking-wider">
                <span>English</span>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Language Dropdown */}
              <div className="absolute top-full right-0 pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                <div className="bg-white text-black p-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-[320px] rounded-2xl border border-neutral-100">
                  <div className="font-medium mb-2 mt-1 text-[11px] tracking-widest uppercase text-neutral-400 px-3">Select Language</div>
                  <div className="grid grid-cols-2 gap-1">
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl font-medium text-accent bg-accent/5 flex items-center justify-between">
                      English
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,183,208,0.5)]"></span>
                    </Link>
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">Français</Link>
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">Русский</Link>
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">العربية</Link>
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">Türkçe</Link>
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">中文</Link>
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">Deutsch</Link>
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">Español</Link>
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">Polski</Link>
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">Svenska</Link>
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">Nederlands</Link>
                    <Link href="#" className="px-3 py-2.5 text-[14px] rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">فارسی</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FULL-SCREEN MENU */}
      <div
        className={`fixed inset-0 z-[100] bg-[#0a0a0a] text-white flex flex-col overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center h-[72px] px-[5vw] flex-shrink-0">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
            <Image
              src="/tekcevisa-logo-white.png"
              alt="TEKCE Visa Logo"
              width={160}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -mr-2 text-white hover:text-white/70 transition-colors"
          >
            <X className="h-7 w-7" strokeWidth={1.5} />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 px-[5vw] py-8 pb-20">
          <nav className="flex flex-col gap-1">
            {NAV.map((item, index) => (
              <div key={item.label} className="flex flex-col">
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif py-3 hover:text-accent transition-colors flex items-center justify-between group"
                >
                  {item.label}
                  {item.children && (
                    <MoveRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  )}
                </Link>

                {item.children && (
                  <div className="mt-2 mb-6 grid grid-cols-2 gap-y-3 gap-x-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[15px] text-white/50 hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Subtle separator */}
                {index < NAV.length - 1 && !item.children && (
                  <div className="h-px bg-white/5 my-2 w-full" />
                )}
                {index < NAV.length - 1 && item.children && (
                  <div className="h-px bg-white/5 mb-2 w-full" />
                )}
              </div>
            ))}
          </nav>

          {/* Contact info at bottom */}
          <div className="mt-16 text-[13px] text-white/40 font-light flex flex-col gap-2">
            <p className="uppercase tracking-widest text-[10px] mb-2 font-medium">Global Offices</p>

            {/* SCROLLING MARQUEE */}
            <div className="-mx-[5vw] overflow-hidden flex whitespace-nowrap mb-6 mt-1 py-3 border-y border-white/5 bg-[#111]">
              <div className="animate-marquee flex items-center min-w-max text-[16px] font-serif text-white/80">
                {[...OFFICES, ...OFFICES].map((office, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="px-6">{office}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                  </div>
                ))}
              </div>
            </div>

            <a href="mailto:info@tekcevisa.com" className="hover:text-white transition-colors">info@tekcevisa.com</a>
            <a href="tel:+905551234567" className="hover:text-white transition-colors">+90 555 123 45 67</a>
          </div>
        </div>
      </div>
    </header>
  );
}