/* ------------------------------------------------------------------ */
/*  OFFICES                                                            */
/*  Addresses, hours, map points and Google ratings are taken as-is    */
/*  from https://tekce.com/corporate/contact (25.11.2026).             */
/*  Phones and e-mail are TEKCE Visa's (see `visaContact`).            */
/*  `intro` is the text shown above the office details — edit it per   */
/*  office. Separate paragraphs with a blank line.                     */
/* ------------------------------------------------------------------ */

export interface CountryContact {
  country: string;
  hours: string[];
}

/** Phones and e-mail shown on every office page — same as tekcevisa.com/contact/* */
export const visaContact = {
  email: "info@tekcevisa.com",
  phones: [
    { label: "Spain", number: "+34 951 74 45 44" },
    { label: "Türkiye", number: "+90 212 912 55 77" },
  ],
};

export interface Office {
  slug: string;
  /** Office name exactly as on tekce.com */
  title: string;
  countryCode: CountryCode;
  addressLines: string[];
  lat: number;
  lng: number;
  /** Google Maps place link */
  mapsUrl: string;
  rating: string;
  reviews: string;
  intro: string;
}

export type CountryCode = "es" | "tr" | "cy" | "ae" | "se";

export const countryContacts: Record<CountryCode, CountryContact> = {
  es: {
    country: "Spain",
    hours: ["09:00 - 18:00 Monday - Friday", "10:00 - 15:00 Saturday"],
  },
  tr: {
    country: "Türkiye",
    hours: ["08:30 - 18:00 Monday - Friday", "10:00 - 15:00 Saturday"],
  },
  cy: {
    country: "Cyprus",
    hours: ["08:30 - 18:00 Monday - Friday", "10:00 - 15:00 Saturday"],
  },
  ae: {
    country: "United Arab Emirates",
    hours: ["09:00 - 18:00 Monday - Friday", "10:00 - 15:00 Saturday"],
  },
  se: {
    country: "Sweden",
    hours: ["08:30 - 18:00 Monday - Friday", "10:00 - 15:00 Saturday"],
  },
};

const intro = (title: string) =>
  `Visit our ${title} office or reach us by phone or e-mail. Our team will get back to you soon.`;

const cevizlibagIntro = `Welcome to the contact page of Tekce Visa’s Istanbul, Cevizlibag office. On this page, you may find all the contact information to get in touch with our consultants in the Cevizlibag office. Our professional team experienced in residency applications, citizenship, immigration, and overseas law are located here to give the best possible services.

We have 2 offices in Istanbul. While the Cevizlibag office is on the European side, we have the Goztepe office on the Asian side. By having 2 offices on each side of Istanbul, we are always easily accessible to our customers.

Our team of overseas law experts gives the best consultancy to ensure %100 Happiness for our clients. Our team understands your needs and desires in your situation. Our consultants always work on a case basis to give the most tailored solutions.

You may reach our Cevizlibag office anytime by using all possible methods. You may call us, send an e-mail, or easily fill out the contact form. We will reach you as soon as possible. After the first contact, we will learn about your situation and give the first information in the beginning.

Our company values are based on Goodness with %100 customer happiness and Excellence with zero failure. So, you will experience professional consultancy beginning from the first contact with our expert consultants.

We understand that dealing with overseas laws is mostly challenging. Our professional consultants speaking in your language have years of experience in citizenship applications, residence permits, the law of succession and obligations for foreigners, and immigration.

You may use the following contact options to arrange a meeting with our consultants. You may also visit our office to meet in person first. We will be happily waiting to give you the best overseas legal consultation services.`;

export const offices: Office[] = [
  // Spain
  { slug: "malaga", title: "Málaga, Benalmádena", countryCode: "es", addressLines: ["C/El Montículo 8, 29631, Benalmádena", "Málaga, Spain"], lat: 36.601517, lng: -4.547938, mapsUrl: "https://maps.google.com/?cid=2201044622524160628", rating: "5.0", reviews: "45 Google reviews", intro: intro("Málaga, Benalmádena") },
  { slug: "alicante", title: "Alicante, Orihuela Costa", countryCode: "es", addressLines: ["Carretera de Villamartín 12, Urbanización La Zenia II, Casa 22, 03189, Orihuela Costa", "Alicante, Spain"], lat: 37.92588, lng: -0.734569, mapsUrl: "https://maps.google.com/?cid=2219642524627475945", rating: "4.9", reviews: "36 Google reviews", intro: intro("Alicante, Orihuela Costa") },
  // Türkiye
  { slug: "lara", title: "Antalya, Lara", countryCode: "tr", addressLines: ["Çağlayan Mah. Barınaklar Bulvarı No:5, Daire:3, 07235, Muratpaşa", "Antalya, Türkiye"], lat: 36.851911, lng: 30.762841, mapsUrl: "https://maps.google.com/?cid=5804274437706294206", rating: "5.0", reviews: "19 Google reviews", intro: intro("Antalya, Lara") },
  { slug: "konyaalti", title: "Antalya, Konyaaltı", countryCode: "tr", addressLines: ["Gürsu Mah. Atatürk Bulvarı No: 183, Mustafa Altunbaş İş Merkezi, Kat:4, Daire:8, 07070, Konyaaltı", "Antalya, Türkiye"], lat: 36.86309, lng: 30.631161, mapsUrl: "https://maps.google.com/?cid=3276089937592815968", rating: "4.9", reviews: "58 Google reviews", intro: intro("Antalya, Konyaaltı") },
  { slug: "alanya", title: "Antalya, Alanya", countryCode: "tr", addressLines: ["Kızlarpınarı Mah. Kızlarpınarı Cad. No:45/B, 07460, Alanya", "Antalya, Türkiye"], lat: 36.554279, lng: 31.979494, mapsUrl: "https://maps.google.com/?cid=10370120457761001819", rating: "5.0", reviews: "30 Google reviews", intro: intro("Antalya, Alanya") },
  { slug: "belek", title: "Antalya, Belek", countryCode: "tr", addressLines: ["Belek Mah. Köprü Cad. No:17/104, 07506, Serik", "Antalya, Türkiye"], lat: 36.865427, lng: 31.052071, mapsUrl: "https://maps.google.com/?cid=6239644079809342461", rating: "5.0", reviews: "41 Google reviews", intro: intro("Antalya, Belek") },
  { slug: "cevizlibag", title: "İstanbul, Cevizlibağ", countryCode: "tr", addressLines: ["Maltepe Mah. Yedikule Çırpıcı Yolu Sok. No:2, Avrupa Ofis Blok, Ofis:12, 34010, Cevizlibağ, Zeytinburnu", "İstanbul, Türkiye"], lat: 41.018456, lng: 28.911135, mapsUrl: "https://maps.google.com/?cid=8371847751493865513", rating: "4.7", reviews: "27 Google reviews", intro: cevizlibagIntro },
  { slug: "goztepe", title: "İstanbul, Göztepe", countryCode: "tr", addressLines: ["Merdivenköy Mah. Nur Sok. Business Istanbul A Blok, No:1/A/410, 34732, Göztepe, Kadıköy", "İstanbul, Türkiye"], lat: 40.993099, lng: 29.067157, mapsUrl: "https://maps.google.com/?cid=195779195448329720", rating: "4.9", reviews: "42 Google reviews", intro: intro("İstanbul, Göztepe") },
  { slug: "ankara", title: "Ankara", countryCode: "tr", addressLines: ["Kızılırmak Mah. Ufuk Üniversitesi Cad. 1445 Sokak No:2, Paragon Tower B134, 06530, Çankaya", "Ankara, Türkiye"], lat: 39.909076, lng: 32.812504, mapsUrl: "https://maps.google.com/?cid=3911578933100692362", rating: "5.0", reviews: "28 Google reviews", intro: intro("Ankara") },
  { slug: "bodrum", title: "Muğla, Bodrum", countryCode: "tr", addressLines: ["Konacık Mah. Atatürk Bulvarı No:285/1B, 48480, Bodrum", "Muğla, Türkiye"], lat: 37.055347, lng: 27.370211, mapsUrl: "https://maps.google.com/?cid=4006659624499223293", rating: "4.9", reviews: "71 Google reviews", intro: intro("Muğla, Bodrum") },
  { slug: "fethiye", title: "Muğla, Fethiye", countryCode: "tr", addressLines: ["Akarca Mahallesi, Adnan Menderes Blv. No:155 D:2", "Muğla, Türkiye"], lat: 36.636483, lng: 29.131187, mapsUrl: "https://maps.google.com/?cid=13952596238640085199", rating: "5.0", reviews: "25 Google reviews", intro: intro("Muğla, Fethiye") },
  { slug: "mersin", title: "Mersin, Mezitli", countryCode: "tr", addressLines: ["Cumhuriyet Mah. Gazi Mustafa Kemal Bulvarı, No:961/AA, 33200, Mezitli", "Mersin, Türkiye"], lat: 36.711281, lng: 34.473206, mapsUrl: "https://maps.google.com/?cid=17141383511515411242", rating: "4.9", reviews: "101 Google reviews", intro: intro("Mersin, Mezitli") },
  { slug: "bursa", title: "Bursa", countryCode: "tr", addressLines: ["Konak Mah. Lefkoşe Cad. Barış Sok. No:3, Ofis Artı İş Merkezi Kat:2, No:15, 16110, Nilüfer", "Bursa, Türkiye"], lat: 40.210626, lng: 28.992542, mapsUrl: "https://maps.google.com/?cid=17559692338544480887", rating: "4.9", reviews: "13 Google reviews", intro: intro("Bursa") },
  { slug: "trabzon", title: "Trabzon", countryCode: "tr", addressLines: ["Kaşüstü Mahallesi, Devlet Karayolu Caddesi, Doğan İş Merkezi No:29/408", "Trabzon, Türkiye"], lat: 40.99872, lng: 39.745783, mapsUrl: "https://maps.google.com/?cid=3082309560602739882", rating: "5.0", reviews: "28 Google reviews", intro: intro("Trabzon") },
  { slug: "yalova", title: "Yalova", countryCode: "tr", addressLines: ["Süleyman Bey Mah. İstiklal Cad. Elif Apt, No:67/1-A, 77200, Merkez", "Yalova, Türkiye"], lat: 40.658158, lng: 29.280853, mapsUrl: "https://maps.google.com/?cid=8664369184354963197", rating: "4.8", reviews: "26 Google reviews", intro: intro("Yalova") },
  // Cyprus
  { slug: "girne", title: "Cyprus, Girne", countryCode: "cy", addressLines: ["Beşparmaklar Cad. No:144, 9370, Çatalköy, Girne", "North Cyprus"], lat: 35.325554, lng: 33.395002, mapsUrl: "https://maps.google.com/?cid=13763706899860706571", rating: "5.0", reviews: "40 Google reviews", intro: intro("Girne") },
  // United Arab Emirates
  { slug: "dubai", title: "Dubai", countryCode: "ae", addressLines: ["Düsseldorf Business Point Floor: 9 Office: 906, Al Barsha 1", "Dubai, United Arab Emirates"], lat: 25.114558, lng: 55.204861, mapsUrl: "https://maps.google.com/?cid=5840746415370101642", rating: "4.9", reviews: "44 Google reviews", intro: intro("Dubai") },
  // Sweden
  { slug: "stockholm", title: "Stockholm, Bromma", countryCode: "se", addressLines: ["Bällstavägen 58, 16872, Bromma", "Sweden"], lat: 59.361237, lng: 17.946405, mapsUrl: "https://maps.google.com/?cid=14304911844058034860", rating: "5.0", reviews: "3 Google reviews", intro: intro("Stockholm, Bromma") },
];

export const countryOrder: CountryCode[] = ["tr", "es", "ae", "cy", "se"];

export function getOffice(slug: string): Office | undefined {
  return offices.find((o) => o.slug === slug);
}

export function officesByCountry() {
  return countryOrder.map((code) => ({
    code,
    country: countryContacts[code].country,
    offices: offices.filter((o) => o.countryCode === code),
  }));
}

/** Google Maps embed (no API key needed) centred on the office */
export function mapEmbedUrl(o: Office) {
  return `https://maps.google.com/maps?q=${o.lat},${o.lng}&z=16&hl=en&output=embed`;
}

export const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;
