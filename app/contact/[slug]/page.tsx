import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, Clock, MessageCircle, Star, ArrowUpRight, MoveLeft } from "lucide-react";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { OfficeContactForm } from "@/components/OfficeContactForm";
import {
  offices,
  getOffice,
  countryContacts,
  officesByCountry,
  mapEmbedUrl,
  telHref,
  waHref,
} from "@/lib/officesData";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return offices.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const office = getOffice(slug);
  if (!office) return {};
  return {
    title: `${office.title} Office | TEKCE Visa`,
    description: `Address, phone, map and contact form for the TEKCE ${office.title} office.`,
  };
}

const eyebrow = "text-[11px] text-neutral-400 uppercase tracking-[0.2em] font-medium";

export default async function OfficePage({ params }: Props) {
  const { slug } = await params;
  const office = getOffice(slug);
  if (!office) notFound();
  const contact = countryContacts[office.countryCode];

  const details = [
    {
      icon: MapPin,
      label: "Address",
      body: (
        <>
          {office.addressLines.map((l) => (
            <span key={l} className="block">{l}</span>
          ))}
          <a
            href={office.mapsUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 mt-3 text-[12px] uppercase tracking-[0.15em] font-medium text-black hover:text-accent transition-colors"
          >
            Get directions <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
        </>
      ),
    },
    {
      icon: Clock,
      label: "Working Hours",
      body: contact.hours.map((h) => <span key={h} className="block">{h}</span>),
    },
  ];

  const actions = [
    { icon: Phone, label: "Call", value: contact.phone, href: telHref(contact.phone), external: false },
    { icon: MessageCircle, label: "WhatsApp", value: contact.whatsapp, href: waHref(contact.whatsapp), external: true },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false },
  ];

  const paragraphs = office.intro.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] sm:h-[65vh] flex items-end">
        <div
          className="absolute inset-0 bg-gray-900 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] lg:px-10 pb-16 sm:pb-20">
          <div className="max-w-4xl">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[11px] text-white/60 uppercase tracking-[0.2em] font-medium mb-6 hover:text-white transition-colors"
            >
              <MoveLeft size={14} strokeWidth={1.5} /> All offices
            </Link>
            <div className="text-sm text-white/60 uppercase tracking-wider mb-4 font-medium">
              {contact.country}
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] tracking-tight text-white">
              {office.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Office details + map */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className={`${eyebrow} mb-6`}>Contact</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3 mb-12">
                {actions.map(({ icon: Icon, label, value, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener" } : {})}
                    className="group flex sm:flex-col lg:flex-row xl:flex-col items-center sm:items-start lg:items-center xl:items-start gap-4 sm:gap-5 lg:gap-4 xl:gap-5 bg-[#fcfcfc] border border-neutral-100 rounded-[1.5rem] p-5 hover:border-black transition-colors"
                  >
                    <span className="w-10 h-10 shrink-0 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] text-neutral-400 uppercase tracking-[0.15em] font-medium mb-1">
                        {label}
                      </span>
                      <span className="block text-[15px] font-serif text-black whitespace-nowrap">{value}</span>
                    </span>
                  </a>
                ))}
              </div>
              <div className={`${eyebrow} mb-6`}>Office Details</div>
              <div className="divide-y divide-neutral-100 border-y border-neutral-100">
                {details.map(({ icon: Icon, label, body }) => (
                  <div key={label} className="grid grid-cols-[28px_1fr] gap-4 py-6">
                    <Icon size={18} className="text-accent mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <div className="text-sm text-neutral-400 mb-1.5">{label}</div>
                      <div className="text-[17px] font-serif text-black leading-relaxed">{body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={office.mapsUrl}
                target="_blank"
                rel="noopener"
                aria-label={`Rated ${office.rating} out of 5 from ${office.reviews} — read them on Google`}
                className="group mt-10 flex items-center gap-6 bg-[#fcfcfc] border border-neutral-100 rounded-[1.5rem] p-6 hover:border-neutral-200 transition-colors"
              >
                <div className="font-serif text-5xl leading-none text-black tracking-tight">{office.rating}</div>
                <div className="flex-1 min-w-0">
                  <div className="relative inline-flex mb-2" aria-hidden="true">
                    <div className="flex gap-0.5 text-neutral-200">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} size={16} className="fill-current" strokeWidth={0} />
                      ))}
                    </div>
                    <div
                      className="absolute inset-0 flex gap-0.5 text-[#fbbc04] overflow-hidden"
                      style={{ width: `${(parseFloat(office.rating) / 5) * 100}%` }}
                    >
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} size={16} className="fill-current shrink-0" strokeWidth={0} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-neutral-500 font-light">
                    <svg viewBox="0 0 48 48" width="16" height="16" aria-hidden="true">
                      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
                      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
                    </svg>
                    {office.reviews}
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-medium text-black group-hover:text-accent transition-colors">
                  Read reviews <ArrowUpRight size={14} strokeWidth={1.5} />
                </span>
              </a>
            </div>

            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-32 h-[380px] sm:h-[460px] lg:h-[600px] rounded-[2rem] overflow-hidden border border-neutral-100 bg-neutral-100">
                <iframe
                  title={`Map of the ${office.title} office`}
                  src={mapEmbedUrl(office)}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office text */}
      {paragraphs.length > 0 && (
        <section className="pb-20 md:pb-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
            <div className="max-w-[720px] border-t border-neutral-100 pt-12 md:pt-16 space-y-6">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-neutral-600 text-[17px] font-light leading-[1.8]">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact form + other offices */}
      <section className="pb-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-7">
              <OfficeContactForm office={office.title} />
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <div className={`${eyebrow} mb-10`}>Other Offices</div>
                <div className="space-y-10">
                  {officesByCountry().map((group) => (
                    <div key={group.code}>
                      <h4 className="text-lg font-serif text-black mb-4 flex items-center gap-3">
                        <MapPin size={16} className="text-accent" strokeWidth={1.5} />
                        {group.country}
                      </h4>
                      <ul className="flex flex-wrap gap-x-4 gap-y-3">
                        {group.offices.map((o, idx) => (
                          <li key={o.slug} className="flex items-center gap-4">
                            {o.slug === office.slug ? (
                              <span className="text-[15px] text-black font-medium">{o.title}</span>
                            ) : (
                              <Link
                                href={`/contact/${o.slug}`}
                                className="text-[15px] text-neutral-500 font-light hover:text-black transition-colors"
                              >
                                {o.title}
                              </Link>
                            )}
                            {idx < group.offices.length - 1 && <span className="w-1 h-1 rounded-full bg-neutral-200" />}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationCTA consultant={4} />
    </div>
  );
}
