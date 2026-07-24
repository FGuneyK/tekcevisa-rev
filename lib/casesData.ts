import { getTeamMember, TeamMember } from "./teamData";

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

/** A single row in the "at a glance" strip below the hero. */
export interface CaseKeyFact {
  label: string;
  value: string;
}

/** The anonymised client profile card. */
export interface CaseClient {
  alias: string;
  age: string;
  citizenship: string;
  household: string;
  profession: string;
  motivation: string;
  /** Two-letter initials used for the avatar bubble in the interview. */
  initials: string;
}

/** A narrative block. `body` is an HTML string rendered through prose styles. */
export interface CaseSection {
  heading: string;
  body: string;
  image?: string;
  imageCaption?: string;
}

/** One row of the "options we evaluated" comparison table. */
export interface CaseOption {
  option: string;
  investment: string;
  timeline: string;
  verdict: "chosen" | "rejected" | "considered";
  note: string;
}

/** One row of the process timeline table. */
export interface CaseTimelineStep {
  phase: string;
  date: string;
  duration: string;
  cost: string;
  detail: string;
}

/** One row of the cost breakdown table. */
export interface CaseCostItem {
  item: string;
  amount: string;
  category: "Investment" | "Government" | "Professional" | "Living";
  note: string;
}

/** A callout box carrying a named advisor's commentary. */
export interface CaseExpertNote {
  /** teamData id */
  author: string;
  text: string;
}

/** One turn of the recorded conversation. */
export interface CaseInterviewLine {
  speaker: "host" | "client";
  /** Who is talking — for clients this is the alias, e.g. "Elif D." */
  name: string;
  role: string;
  text: string;
}

export interface CaseInterview {
  title: string;
  intro: string;
  /** teamData id of the person conducting the interview. */
  host: string;
  recordedAt: string;
  lines: CaseInterviewLine[];
}

/** Headline outcome metrics shown after the process. */
export interface CaseResult {
  value: string;
  label: string;
  note: string;
}

export interface CaseFaq {
  q: string;
  a: string;
}

export interface CaseGalleryItem {
  image: string;
  caption: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** Short label used on cards, e.g. "Dubai Golden Visa". */
  program: string;
  country: string;
  /** Index-page filter bucket. */
  category: "Residence" | "Citizenship" | "Business";
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  /** teamData id of the advisor who led the file. */
  advisor: string;
  /** Link back to the relevant programme page. */
  programHref: string;

  client: CaseClient;
  keyFacts: CaseKeyFact[];
  challenge: {
    intro: string;
    points: string[];
  };
  options: CaseOption[];
  sections: CaseSection[];
  expertNotes: CaseExpertNote[];
  timeline: CaseTimelineStep[];
  timelineSummary: { totalDuration: string; totalCost: string; note: string };
  costs: CaseCostItem[];
  costTotal: string;
  pullQuote: { text: string; attribution: string };
  interview?: CaseInterview;
  results: CaseResult[];
  gallery: CaseGalleryItem[];
  faqs: CaseFaq[];
  /** Slugs of other cases to surface at the bottom. */
  related: string[];
}

/* ------------------------------------------------------------------ */
/*  CASES                                                              */
/* ------------------------------------------------------------------ */

export const caseStudies: CaseStudy[] = [
  /* ---------------------------------------------------------------- */
  /*  01 — DUBAI GOLDEN VISA                                          */
  /* ---------------------------------------------------------------- */
  {
    slug: "dubai-golden-visa-turkish-tech-founders",
    title:
      "Dubai Golden Visa: How a Founding Couple Moved Their Company and Their Children in One Quarter",
    program: "Dubai Golden Visa",
    country: "United Arab Emirates",
    category: "Residence",
    excerpt:
      "Kaan and Elif had built a profitable software company in Istanbul and a life around it. Relocating meant moving four people, one balance sheet and two school enrolments at the same time — without a single gap in either. Here is how the file was sequenced.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2000&auto=format&fit=crop",
    date: "May 18, 2026",
    readTime: "9 min read",
    advisor: "ozkan-yurdakul",
    programHref: "/residence/dubai",

    client: {
      alias: "Kaan & Elif D.",
      age: "41 and 38",
      citizenship: "Republic of Türkiye",
      household: "Two adults, two children (aged 11 and 7)",
      profession: "Co-founders of a B2B software company, 60 employees",
      motivation:
        "A tax-neutral base for a company billing in USD and EUR, English-curriculum schooling for the children, and a residency that does not require them to abandon the Istanbul office.",
      initials: "KE",
    },

    keyFacts: [
      { label: "Programme", value: "Golden Visa, 10-year" },
      { label: "Qualifying Investment", value: "AED 2.4M (≈ €600,000)" },
      { label: "Total Timeline", value: "11 weeks" },
      { label: "Residency Granted", value: "4 family members" },
    ],

    challenge: {
      intro:
        "The couple arrived with a deadline rather than a question. Their largest client had moved procurement to a Gulf entity, and invoices from a Turkish company were creating friction on both currency and payment terms. They wanted a UAE base — but they were unwilling to accept the three things most relocation plans quietly assume.",
      points: [
        "No academic year lost. Both children had to start the September term in Dubai, which fixed the end of the timeline before the file even opened.",
        "No dormant capital. They refused to park money in a deposit account purely to satisfy a threshold; the qualifying asset had to be something they would have bought anyway.",
        "No abandonment of Istanbul. The Turkish entity had 60 employees and would keep operating, so the structure had to survive scrutiny in both jurisdictions.",
        "A mortgage complication. Roughly 45% of the intended purchase price was to be financed, and they had been told — incorrectly — that mortgaged property does not qualify.",
      ],
    },

    options: [
      {
        option: "Golden Visa via property — AED 2M+",
        investment: "AED 2,000,000 minimum",
        timeline: "8 – 12 weeks",
        verdict: "chosen",
        note: "Ten-year term, no minimum stay, full family inclusion, and the asset is real estate they wanted regardless. Mortgaged property qualifies on total value, not equity.",
      },
      {
        option: "Investor Visa (2-year) via property",
        investment: "AED 750,000 minimum",
        timeline: "4 – 6 weeks",
        verdict: "rejected",
        note: "Cheaper and faster, but renewal every two years sits badly with a ten-year schooling horizon. The delta to the Golden Visa threshold was smaller than the cost of repeated renewals.",
      },
      {
        option: "Company-sponsored employment visa (free zone)",
        investment: "From AED 25,000 in setup",
        timeline: "3 – 5 weeks",
        verdict: "considered",
        note: "Retained as a bridge — and ultimately used for two senior employees — but it ties residency to the company. Not appropriate for the founders themselves.",
      },
      {
        option: "Portugal Golden Visa (fund route)",
        investment: "€500,000",
        timeline: "14 – 20 months",
        verdict: "rejected",
        note: "Strong long-term EU case, but the processing horizon missed the September school term by more than a year. Flagged for revisiting in 2028.",
      },
    ],

    sections: [
      {
        heading: "Fixing the end date first",
        body: `<p>Most relocation files are planned forwards: consultation, purchase, application, arrival. This one was planned backwards. The September school term was immovable, and Dubai's better international schools close their admissions well before it — so the enrolment deadline, not the visa, became the critical path.</p>
<p>Working from that date, the property had to be selected within five weeks, because title deed registration at the Dubai Land Department must complete before the Golden Visa file can be submitted, and the school offer letters required proof of a residential address in the catchment area.</p>
<p>We opened three workstreams in parallel rather than in sequence: property selection, school applications, and corporate structuring. Each had its own owner on our side, and they shared one calendar. Running them in series — the default in most relocations — would have added roughly four months.</p>`,
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
        imageCaption:
          "Downtown Dubai. The catchment area decided the district before the budget did.",
      },
      {
        heading: "Choosing the asset, not the threshold",
        body: `<p>The couple's instinct was to buy the cheapest qualifying unit and treat it as a ticket. We argued against it. A property bought purely to clear AED 2,000,000 tends to be an asset you cannot live in and would struggle to exit — and the Golden Visa does not care whether the property is one unit or several, as long as the combined value clears the threshold.</p>
<p>We shortlisted eleven properties across Dubai Creek Harbour, Business Bay and Dubai Hills, filtered by three constraints: within 25 minutes of the two shortlisted schools, handover before August, and a service charge below AED 18 per square foot. Six survived. They bought a three-bedroom apartment in Dubai Creek Harbour at AED 2.4M — the family home — and financed 45% of it.</p>
<blockquote>The threshold is measured against the registered property value, not against your equity in it. A mortgaged AED 2.4M apartment qualifies exactly as a cash-purchased one does.</blockquote>
<p>That single clarification changed the shape of the file. It freed roughly AED 1.08M of capital that the couple redeployed into their own company's Gulf expansion rather than into a title deed.</p>`,
        image:
          "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1600&auto=format&fit=crop",
        imageCaption:
          "Dubai Creek Harbour — handover schedule was the deciding filter, not the view.",
      },
      {
        heading: "Two companies, one group, no double taxation",
        body: `<p>Residency was only half the problem. The Istanbul entity would keep its 60 employees and its Turkish clients; the new UAE entity would invoice the Gulf accounts. Structured carelessly, that arrangement invites a permanent-establishment argument in one jurisdiction or both.</p>
<p>We established a DIFC-registered company with the founders as shareholders and moved the Gulf contracts onto it, with a documented intercompany services agreement covering the development work still performed by the Istanbul team at arm's-length pricing. The Türkiye–UAE double taxation treaty then does the work it was written to do.</p>
<p>The founders' personal tax residency shifted with their physical presence and their Emirates ID, evidenced by tenancy, school enrolment and utility records — the ordinary trio that tax authorities actually look at. Their Turkish company continues to pay Turkish corporate tax on Turkish profits, which was always the correct outcome.</p>`,
      },
      {
        heading: "The part nobody plans for",
        body: `<p>The visa was issued in week nine. The family's difficulties began in week ten, and none of them were legal.</p>
<p>Emirates ID appointments, the medical fitness test, bank account opening, a driving licence exchange, DEWA utility registration, salary transfers for two domestic staff, and the school's uniform and bus deadlines all landed in the same fortnight — most of them requiring the physical presence of a specific person on a specific day. Our Dubai office sequenced them into a fourteen-day arrival schedule, which is the least glamorous document we produced and the one the family says they used most.</p>
<p>The children started the September term on time. The office in Business Bay opened three weeks later.</p>`,
      },
    ],

    expertNotes: [
      {
        author: "ozkan-yurdakul",
        text: "The most common error we see in Dubai files is treating the property as a formality. It is a ten-year asset in a market with real dispersion between districts — service charges alone can differ by a factor of three for the same nominal yield. If the visa is the only reason you like the building, you have bought the wrong building.",
      },
      {
        author: "ihsan-erol",
        text: "Mortgaged property qualifying for the Golden Visa is the single most frequently misreported rule in this programme. We see families delay applications by a year saving cash they never needed to save. The threshold tests the registered value of the property.",
      },
    ],

    timeline: [
      {
        phase: "Strategy consultation & due diligence",
        date: "3 March 2026",
        duration: "1 week",
        cost: "—",
        detail:
          "Goals, tax position and school constraints mapped. Preliminary background check on both applicants.",
      },
      {
        phase: "Property shortlist & viewings",
        date: "10 March 2026",
        duration: "3 weeks",
        cost: "—",
        detail:
          "Eleven properties screened against catchment, handover date and service charge. Six viewed remotely, two in person.",
      },
      {
        phase: "School applications submitted",
        date: "17 March 2026",
        duration: "Parallel",
        cost: "AED 9,500",
        detail:
          "Two schools, both children. Assessment days scheduled ahead of the address confirmation.",
      },
      {
        phase: "Sales agreement & mortgage approval",
        date: "31 March 2026",
        duration: "2 weeks",
        cost: "AED 120,000 deposit",
        detail:
          "Form F signed, 55% cash / 45% financed. Pre-approval secured from a UAE lender before signature.",
      },
      {
        phase: "Title deed registration (DLD)",
        date: "16 April 2026",
        duration: "1 week",
        cost: "AED 100,800",
        detail:
          "Dubai Land Department transfer fee at 4% plus registration. Title deed issued in joint names.",
      },
      {
        phase: "Golden Visa submission (ICP)",
        date: "23 April 2026",
        duration: "2 weeks",
        cost: "AED 14,200",
        detail:
          "Primary applicant plus three dependants filed together. Medical fitness tests completed on arrival.",
      },
      {
        phase: "Visa issuance & Emirates ID",
        date: "12 May 2026",
        duration: "1 week",
        cost: "AED 4,600",
        detail:
          "Ten-year residency stamped for all four family members. Emirates ID biometrics completed same week.",
      },
      {
        phase: "DIFC company & settlement support",
        date: "19 May 2026",
        duration: "3 weeks",
        cost: "AED 62,000",
        detail:
          "Company incorporation, corporate bank account, tenancy registration, driving licence exchange.",
      },
    ],
    timelineSummary: {
      totalDuration: "11 weeks",
      totalCost: "AED 311,100 in fees",
      note: "Excludes the AED 2.4M qualifying property and mortgage principal.",
    },

    costs: [
      {
        item: "Qualifying property (Dubai Creek Harbour)",
        amount: "AED 2,400,000",
        category: "Investment",
        note: "45% financed. Recoverable asset, not a fee.",
      },
      {
        item: "DLD transfer fee (4%) & registration",
        amount: "AED 100,800",
        category: "Government",
        note: "Payable on title deed transfer.",
      },
      {
        item: "Golden Visa application — 4 applicants",
        amount: "AED 14,200",
        category: "Government",
        note: "ICP filing, medical fitness tests, status change.",
      },
      {
        item: "Emirates ID — 4 applicants",
        amount: "AED 4,600",
        category: "Government",
        note: "Ten-year card issuance.",
      },
      {
        item: "TEKCE Visa advisory & file management",
        amount: "AED 55,000",
        category: "Professional",
        note: "End-to-end, including property due diligence.",
      },
      {
        item: "DIFC company incorporation",
        amount: "AED 62,000",
        category: "Professional",
        note: "Licence, registered office, corporate bank account opening.",
      },
      {
        item: "Mortgage arrangement & valuation",
        amount: "AED 28,000",
        category: "Professional",
        note: "Bank processing fee, valuation, life cover.",
      },
      {
        item: "School fees — deposits, two children",
        amount: "AED 9,500",
        category: "Living",
        note: "Application and assessment fees only.",
      },
      {
        item: "Health insurance — family of four",
        amount: "AED 36,800",
        category: "Living",
        note: "Annual premium, comprehensive cover. Mandatory for residency.",
      },
    ],
    costTotal: "AED 311,100 in fees, excluding the AED 2.4M property",

    pullQuote: {
      text: "We were told to expect a year of limbo. What we got was a fourteen-day arrival schedule and a child who started school on the first day of term with everyone else.",
      attribution: "Elif D., co-founder",
    },

    interview: {
      title: "A conversation, six months in",
      intro:
        "In November 2026 our COO Özkan Tekçe sat down with Kaan and Elif at their apartment in Dubai Creek Harbour — and, for the last few minutes, with their eleven-year-old daughter. The conversation has been edited for length; names have been changed at the family's request.",
      host: "ozkan-tekce",
      recordedAt: "Recorded in Dubai, November 2026",
      lines: [
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "Let me start where most people start. What was the moment you decided this was actually happening, rather than something you discussed on Sunday evenings?",
        },
        {
          speaker: "client",
          name: "Kaan D.",
          role: "Co-founder",
          text: "It was a procurement email. Our biggest client moved their purchasing to an entity in the Gulf and told us, very politely, that invoices from Türkiye were now a problem for their side. It was not a threat. It was worse than a threat — it was logistics. We realised we had maybe two quarters before somebody else solved that problem for them.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "And Elif, was the business the deciding factor for you as well?",
        },
        {
          speaker: "client",
          name: "Elif D.",
          role: "Co-founder",
          text: "No. Honestly, no. For me it was the schools, and I felt slightly guilty about that for months. Kaan would talk about currency exposure and I would be thinking about whether my son would have friends. Those are not the same conversation, and for a while we were not having the same conversation.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "That is more common than you would think. Half of our first meetings are two people discovering they have different projects. What was the hardest part of the process itself?",
        },
        {
          speaker: "client",
          name: "Kaan D.",
          role: "Co-founder",
          text: "The waiting between week five and week nine. Everything had been submitted, nothing was in our hands, and there was nothing to do. I am not built for that. I called Özkan Yurdakul more than I should have.",
        },
        {
          speaker: "client",
          name: "Elif D.",
          role: "Co-founder",
          text: "He called him twice a day. And the answer was always the same — it is with ICP, it is normal, go and look at schools. Which was correct, and extremely annoying.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "I will pass that on as a compliment. Was there anything you were told that turned out to be wrong?",
        },
        {
          speaker: "client",
          name: "Kaan D.",
          role: "Co-founder",
          text: "Yes — and not by you. Before we came to TEKCE, two separate people told us mortgaged property does not count towards the Golden Visa. We had genuinely started planning to wait a year and buy in cash. That advice would have cost us a school year and about a million dirhams of working capital.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "What would you tell a family sitting where you were sitting eighteen months ago?",
        },
        {
          speaker: "client",
          name: "Elif D.",
          role: "Co-founder",
          text: "Decide the immovable date first. For us it was the first day of term. Everything else — the property, the company, the bank — bent around that date, and once we said it out loud the plan stopped being a debate and became a schedule.",
        },
        {
          speaker: "client",
          name: "Kaan D.",
          role: "Co-founder",
          text: "And separate the legal problem from the family problem. They need different people in the room. We kept trying to solve both at once and got nowhere for six months.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "Last question, and it is not for either of you. Zeynep — you were ten when your parents told you about this. What did you think?",
        },
        {
          speaker: "client",
          name: "Zeynep D.",
          role: "Daughter, 11",
          text: "I cried. I thought I would never see my friends again. But I video call them, and now two of them have visited, and one of them said my school here is better than hers, which I did not tell my mother until now.",
        },
        {
          speaker: "client",
          name: "Elif D.",
          role: "Co-founder",
          text: "She did not tell me until now.",
        },
      ],
    },

    results: [
      {
        value: "11 weeks",
        label: "Consultation to Emirates ID",
        note: "Against a market average of 4–6 months for comparable family files.",
      },
      {
        value: "4",
        label: "Family members granted residency",
        note: "Both parents and both children on a single ten-year file.",
      },
      {
        value: "0%",
        label: "Personal income tax",
        note: "No income, capital gains or wealth tax on UAE-sourced personal income.",
      },
      {
        value: "AED 1.08M",
        label: "Capital freed by financing",
        note: "Redeployed into the group's Gulf expansion rather than a title deed.",
      },
    ],

    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
        caption: "Downtown Dubai — the second shortlisted district.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop",
        caption: "Dubai Creek Harbour, where the family bought.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",
        caption: "Business Bay — the group's new regional office.",
      },
    ],

    faqs: [
      {
        q: "Does a mortgaged property really qualify for the Golden Visa?",
        a: "Yes. The AED 2,000,000 threshold is measured against the registered value of the property at the Dubai Land Department, not against the applicant's equity in it. In this file, 45% of the purchase price was financed and the application was unaffected.",
      },
      {
        q: "Could the children have been added later?",
        a: "They could, but it is slower and more expensive. Dependants filed alongside the primary applicant are processed on the same file; added afterwards, each becomes a separate sponsorship application with its own timeline. Where a school term is the deadline, always file together.",
      },
      {
        q: "Did the family have to give up Turkish tax residency?",
        a: "Personal tax residency followed physical presence, and was evidenced by tenancy, Emirates ID, school enrolment and utility records. The Turkish company continues to pay Turkish corporate tax on Turkish-sourced profit — that was always the correct outcome, and the double taxation treaty governs the rest.",
      },
      {
        q: "Is there a minimum stay requirement to keep the visa?",
        a: "No. The Golden Visa carries no minimum stay obligation. In practice, families who want their personal tax residency to sit in the UAE should be able to evidence genuine presence, which is a separate question from visa validity.",
      },
      {
        q: "Why was a DIFC company used rather than a mainland licence?",
        a: "The client base was international and contract-heavy, and DIFC's common-law framework and English-language courts were the better fit for the intercompany agreement. A mainland licence would have been preferable had they been selling to UAE government entities.",
      },
    ],

    related: [
      "spain-non-lucrative-visa-us-entrepreneur",
      "turkey-citizenship-jordanian-family",
      "portugal-golden-visa-fund-route",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  02 — SPAIN NON-LUCRATIVE VISA                                   */
  /* ---------------------------------------------------------------- */
  {
    slug: "spain-non-lucrative-visa-us-entrepreneur",
    title:
      "Spain Non-Lucrative Visa: How Dividend Income Opened a Door That Salary Could Not",
    program: "Spain Non-Lucrative Visa",
    country: "Spain",
    category: "Residence",
    excerpt:
      "Marissa had sold her share of a marketing agency and lived on dividends. Every visa she researched wanted an employer, a job offer or a client contract — until she stopped applying as a worker and started applying as someone who does not need to work.",
    image:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2000&auto=format&fit=crop",
    date: "April 2, 2026",
    readTime: "8 min read",
    advisor: "ihsan-erol",
    programHref: "/residence/spain",

    client: {
      alias: "Marissa R.",
      age: "44",
      citizenship: "United States",
      household: "One adult, one child (aged 10)",
      profession: "Former agency co-owner, living on dividend income",
      motivation:
        "European residency for herself and her son, a slower daily life, and a legal status that does not depend on finding work in Spain.",
      initials: "MR",
    },

    keyFacts: [
      { label: "Programme", value: "Non-Lucrative Visa (NLV)" },
      { label: "Qualifying Income", value: "€36,080 / year proven" },
      { label: "Total Timeline", value: "5 months" },
      { label: "Residency Granted", value: "2 family members" },
    ],

    challenge: {
      intro:
        "Marissa had been researching Spanish visas for fourteen months and had convinced herself she was ineligible for all of them. She was, in a sense, right — she had been reading the wrong half of the system.",
      points: [
        "No employer, no client contracts. The Digital Nomad Visa requires proof of remote work for a non-Spanish company or clients. She had neither: her income was dividends from a business she no longer operated.",
        "Income structure, not income level. Her income comfortably exceeded every threshold. The problem was documenting passive income in a form a consulate would accept.",
        "A ten-year-old in the middle of a school year. Any timeline had to land in the summer, and school registration in Valencia depends on a registered address (empadronamiento) she could not obtain before arriving.",
        "US tax exposure. As a US citizen she remains taxable on worldwide income regardless of where she lives — so the Spanish position had to be built with the US filing in mind, not after it.",
      ],
    },

    options: [
      {
        option: "Non-Lucrative Visa",
        investment: "€36,080 proven annual income",
        timeline: "4 – 6 months",
        verdict: "chosen",
        note: "Purpose-built for applicants with passive income. Prohibits work in Spain, which matched her actual situation rather than fighting it.",
      },
      {
        option: "Digital Nomad Visa",
        investment: "≈€31,752 annual income",
        timeline: "2 – 4 months",
        verdict: "rejected",
        note: "Faster and permits work, but requires an employment contract or client relationships outside Spain. Dividend income from a company she does not operate does not satisfy it.",
      },
      {
        option: "Golden Visa (property route)",
        investment: "€500,000",
        timeline: "2 – 3 months",
        verdict: "rejected",
        note: "Discontinued for new applicants in April 2025. Listed here because clients still ask for it; it is no longer an option in Spain.",
      },
      {
        option: "Portugal D7 (passive income)",
        investment: "≈€10,440 annual income",
        timeline: "6 – 10 months",
        verdict: "considered",
        note: "A genuinely strong alternative on income thresholds. Rejected on personal grounds — her sister lives in Valencia, which was the entire point.",
      },
    ],

    sections: [
      {
        heading: "Applying as who you actually are",
        body: `<p>The Non-Lucrative Visa is the most misunderstood residence permit in Spain, largely because of its name. Applicants read <em>non-lucrative</em> as a restriction and move on. It is a restriction — you may not work in Spain, for anyone, including remotely for a Spanish employer — but for someone whose income arrives without labour, it is not a limitation at all. It is a description.</p>
<p>Marissa's fourteen months of research had been spent trying to qualify as a worker. Every route she examined asked her to produce an employer, a client roster or a contract, and every route therefore failed. The moment the file was reframed around what she actually had — a documented, recurring, verifiable stream of dividends — the application became straightforward.</p>
<blockquote>The Non-Lucrative Visa does not ask what you do. It asks whether you can support yourself and your family without doing it in Spain.</blockquote>
<p>The 2026 threshold is 400% of the IPREM for the principal applicant — €28,880 — plus 100% of the IPREM for each dependant, €7,200 for her son. Total: €36,080 of proven annual income, plus private health insurance with no co-payments and no waiting periods.</p>`,
        image:
          "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=1600&auto=format&fit=crop",
        imageCaption:
          "Valencia. The city was chosen for a reason no spreadsheet captured — her sister lives there.",
      },
      {
        heading: "Documenting income that nobody pays you",
        body: `<p>This is where non-lucrative applications are actually won or lost. A consulate reviewing a salaried applicant sees a contract and twelve payslips. Reviewing Marissa, it saw a shareholding, distributions of varying size, and no employer at all.</p>
<p>We built the evidence file around continuity rather than a single snapshot: three years of dividend distributions, the shareholders' agreement establishing her entitlement, board resolutions authorising each distribution, three years of US federal returns, and twelve months of bank statements showing the money actually arriving. Every document was apostilled and translated by a sworn translator — <em>traductor jurado</em> — which is not optional and is the most common cause of avoidable rejection.</p>
<p>We also front-loaded the two documents with the shortest shelf life. The FBI criminal record check and the medical certificate both expire within 90 days of issue, and both take time to obtain. Applicants routinely order them first, then spend four months assembling everything else, and discover at submission that the clock has run out.</p>`,
      },
      {
        heading: "Renting before buying, deliberately",
        body: `<p>Marissa had assumed she would buy. We advised against it for the first year, and this is now standard counsel in our Spanish files.</p>
<p>A property purchase before residency is granted converts a reversible decision into an irreversible one, at the exact moment you know least about where you want to live. She rented a two-bedroom apartment near the Turia Gardens at €1,200 per month, on a twelve-month contract, five minutes from her sister and inside the catchment area for two schools she had shortlisted.</p>
<p>Fifteen months later she is in the process of buying — in a different district to the one she was certain about when she landed. The rental year cost roughly €14,400 and saved her from a purchase she now describes as a mistake she nearly made twice.</p>`,
        image:
          "https://images.unsplash.com/photo-1558642084-fd07fae5282e?q=80&w=1600&auto=format&fit=crop",
        imageCaption:
          "Near the Turia Gardens — a twelve-month rental, chosen over a purchase.",
      },
      {
        heading: "The American complication",
        body: `<p>US citizens do not stop filing US tax returns by moving abroad. Marissa remains taxable on worldwide income in the United States regardless of her Spanish residency, and once she passed 183 days in Spain she became a Spanish tax resident as well.</p>
<p>The US–Spain double taxation treaty and the foreign tax credit mechanism prevent the same income being taxed twice, but they do not run automatically — they run on correctly sequenced filings in both countries. We coordinated her Spanish <em>gestor</em> with her US CPA before the first Spanish filing rather than after it, and the pair of them now speak directly each January.</p>
<p>One practical note that surprises almost every American client: Spain's wealth tax and, in some autonomous communities, solidarity tax apply to worldwide assets once you are resident. Valencia's regime was reviewed before arrival, not discovered afterwards.</p>`,
      },
    ],

    expertNotes: [
      {
        author: "ihsan-erol",
        text: "The Non-Lucrative Visa prohibits working in Spain. It does not prohibit receiving passive income, and the distinction matters enormously: dividends, rental income, pensions and investment returns are all compatible. What is not compatible is remote work for any employer while physically in Spain — and that is the line applicants most often cross by accident in year one.",
      },
      {
        author: "anastasia-akay",
        text: "Order the criminal record check and the medical certificate last, not first. Both have 90-day validity windows. We have taken over files from other firms where every substantive document was perfect and the application still failed because the FBI check was four months old at submission.",
      },
    ],

    timeline: [
      {
        phase: "Due diligence & eligibility review",
        date: "1 April 2025",
        duration: "2 weeks",
        cost: "—",
        detail:
          "Income structure analysed, NLV confirmed over DNV, US tax position reviewed with her CPA.",
      },
      {
        phase: "Income evidence assembly",
        date: "15 April 2025",
        duration: "5 weeks",
        cost: "—",
        detail:
          "Three years of distributions, shareholders' agreement, board resolutions, bank statements collated.",
      },
      {
        phase: "Document legalisation & sworn translation",
        date: "20 May 2025",
        duration: "4 weeks",
        cost: "€2,300",
        detail:
          "Apostilles obtained, sworn translations completed, private health insurance policy issued.",
      },
      {
        phase: "Criminal record & medical certificate",
        date: "17 June 2025",
        duration: "3 weeks",
        cost: "€480",
        detail:
          "FBI check and medical certificate ordered last, deliberately, to preserve the 90-day validity window.",
      },
      {
        phase: "Consular appointment & submission",
        date: "8 July 2025",
        duration: "1 day",
        cost: "€140",
        detail:
          "In-person submission at the Spanish consulate. Biometrics and original documents presented.",
      },
      {
        phase: "Consular processing",
        date: "9 July 2025",
        duration: "8 weeks",
        cost: "—",
        detail:
          "Type D visa approved. No request for additional information was issued.",
      },
      {
        phase: "Arrival, rental & empadronamiento",
        date: "3 September 2025",
        duration: "2 weeks",
        cost: "€2,400",
        detail:
          "Twelve-month rental signed, municipal registration completed, school enrolment finalised.",
      },
      {
        phase: "TIE residence card issuance",
        date: "5 October 2025",
        duration: "3 weeks",
        cost: "€150",
        detail:
          "Biometrics at the police station, TIE card collected. One-year permit, renewable for two.",
      },
    ],
    timelineSummary: {
      totalDuration: "5 months",
      totalCost: "€8,320 in fees",
      note: "Excludes proven income requirement and ongoing living costs.",
    },

    costs: [
      {
        item: "TEKCE Visa advisory & file management",
        amount: "€4,850",
        category: "Professional",
        note: "End-to-end, both applicants, including consular representation.",
      },
      {
        item: "Sworn translation & apostille",
        amount: "€2,300",
        category: "Professional",
        note: "All US-issued documents. Traductor jurado required by law.",
      },
      {
        item: "Consular visa fee — 2 applicants",
        amount: "€140",
        category: "Government",
        note: "US nationals; fee varies by nationality.",
      },
      {
        item: "FBI criminal record & medical certificate",
        amount: "€480",
        category: "Government",
        note: "Both carry a 90-day validity window.",
      },
      {
        item: "TIE residence card — 2 applicants",
        amount: "€150",
        category: "Government",
        note: "Tasa modelo 790, plus biometrics appointment.",
      },
      {
        item: "Private health insurance — annual",
        amount: "€2,180",
        category: "Living",
        note: "No co-payment, no waiting period. Mandatory for the NLV.",
      },
      {
        item: "Rental deposit & first month",
        amount: "€2,400",
        category: "Living",
        note: "Two-bedroom apartment, Valencia, €1,200/month.",
      },
      {
        item: "School enrolment — one child",
        amount: "€620",
        category: "Living",
        note: "Semi-private (concertado) school, registration and materials.",
      },
    ],
    costTotal: "€13,120 including first-year living set-up (€8,320 in fees)",

    pullQuote: {
      text: "For fourteen months I was trying to prove I could work here. The answer was that I did not have to. Nobody had told me there was a visa for that.",
      attribution: "Marissa R.",
    },

    interview: {
      title: "A conversation, one year in",
      intro:
        "Özkan Tekçe spoke with Marissa in Valencia in September 2026, a year after she landed, with her son Daniel joining briefly at the end. Edited for length; the name is a pseudonym at her request.",
      host: "ozkan-tekce",
      recordedAt: "Recorded in Valencia, September 2026",
      lines: [
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "You spent fourteen months researching before you spoke to anyone. What were you actually doing in that time?",
        },
        {
          speaker: "client",
          name: "Marissa R.",
          role: "Client",
          text: "Reading forums, mostly. And getting slowly more discouraged, because every thread was written by someone with an employer. I kept finding the digital nomad visa, and I kept getting to the part where you upload your employment contract, and I do not have one. I concluded that Spain was not available to me.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "That conclusion is extremely common, and it is wrong in a specific way. You were searching as a worker.",
        },
        {
          speaker: "client",
          name: "Marissa R.",
          role: "Client",
          text: "I was. And I think it was partly identity. I had run a company for eleven years. Filling in a form that says you will not be working felt like admitting something. İhsan said something in our first call that I still think about — that the visa was not describing my ambition, it was describing my income. That reframing took about four minutes and it unlocked the entire year.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "What was the hardest part once the file was open?",
        },
        {
          speaker: "client",
          name: "Marissa R.",
          role: "Client",
          text: "The paperwork was tedious but it was somebody else's problem, which is what I was paying for. The hard part was telling Daniel. He was nine when we started and ten when we moved, and there is no document for that.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "How did he take it?",
        },
        {
          speaker: "client",
          name: "Marissa R.",
          role: "Client",
          text: "Badly, for about three months. Then we visited in the spring, he met my sister's kids properly for the first time, and he came home and asked whether he could bring his bike. That was the moment I knew we would be fine.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "You were advised to rent rather than buy. You were not happy about that at the time.",
        },
        {
          speaker: "client",
          name: "Marissa R.",
          role: "Client",
          text: "I was annoyed. I thought it was firms being conservative to protect themselves. I had a district picked out. I was ready. And I am now buying in a completely different neighbourhood, because the one I was certain about turns out to be dead after eight in the evening and forty minutes from the school. That advice saved me from a very expensive, very confident mistake.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "Anything you would do differently?",
        },
        {
          speaker: "client",
          name: "Marissa R.",
          role: "Client",
          text: "I would have put my American accountant and my Spanish gestor on a call together in month one instead of month nine. I assumed they would sort it out between them. They did, eventually, but I spent a winter genuinely frightened about being taxed twice, and that fear was completely unnecessary.",
        },
        {
          speaker: "client",
          name: "Daniel",
          role: "Son, 11",
          text: "The football is better here. Also school finishes later, which is worse. It is about even.",
        },
      ],
    },

    results: [
      {
        value: "5 months",
        label: "First consultation to TIE card",
        note: "No request for additional documentation was issued at any stage.",
      },
      {
        value: "€36,080",
        label: "Income threshold met",
        note: "400% IPREM for the applicant, plus 100% for one dependant.",
      },
      {
        value: "2",
        label: "Residence permits granted",
        note: "Mother and son, filed together on a single application.",
      },
      {
        value: "Year 5",
        label: "Path to permanent residence",
        note: "1 + 2 + 2 renewal structure leads to long-term EU residence.",
      },
    ],

    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=1200&auto=format&fit=crop",
        caption: "Valencia — the City of Arts and Sciences.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1558642084-fd07fae5282e?q=80&w=1200&auto=format&fit=crop",
        caption: "The Turia Gardens district, where she rented.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1200&auto=format&fit=crop",
        caption: "Coastal Spain — the alternative shortlist.",
      },
    ],

    faqs: [
      {
        q: "Can I work remotely for a foreign employer on a Non-Lucrative Visa?",
        a: "No. The NLV prohibits work performed while physically in Spain, including remote work for a company outside Spain. That is precisely the gap the Digital Nomad Visa was created to fill. Passive income — dividends, rent, pensions, investment returns — is compatible.",
      },
      {
        q: "What income do I actually need to prove?",
        a: "400% of the IPREM for the principal applicant (€28,880 in 2026) plus 100% of the IPREM for each dependant (€7,200). It must be documented as recurring and verifiable, not as a lump sum sitting in an account.",
      },
      {
        q: "Why order the police check and medical certificate last?",
        a: "Both are valid for 90 days from issue. Applicants who obtain them first frequently find they have expired by the time the rest of the file is ready, and the application is refused on a technicality after months of correct work.",
      },
      {
        q: "Does the Non-Lucrative Visa lead to permanent residence?",
        a: "Yes. The permit runs 1 + 2 + 2 years, and after five years of legal residence you may apply for long-term residence. Spanish citizenship generally requires ten years, reduced to two for nationals of Ibero-American countries, Andorra, the Philippines, Equatorial Guinea and Portugal.",
      },
      {
        q: "Is the Spanish Golden Visa still available?",
        a: "No. Spain discontinued the residence-by-property-investment route for new applicants in April 2025. Holders of existing permits retain their rights, but new applications are not accepted.",
      },
      {
        q: "Will I be taxed twice as a US citizen?",
        a: "Not if the filings are coordinated. The US–Spain double taxation treaty and foreign tax credits prevent double taxation, but they depend on correct sequencing between both returns. Get the US CPA and the Spanish gestor speaking to each other before the first Spanish filing.",
      },
    ],

    related: [
      "dubai-golden-visa-turkish-tech-founders",
      "portugal-golden-visa-fund-route",
      "turkey-citizenship-jordanian-family",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  03 — TÜRKIYE CITIZENSHIP BY INVESTMENT                          */
  /* ---------------------------------------------------------------- */
  {
    slug: "turkey-citizenship-jordanian-family",
    title:
      "Türkiye Citizenship by Investment: Five Passports, One Antalya Portfolio, Four Months",
    program: "Türkiye Citizenship by Investment",
    country: "Türkiye",
    category: "Citizenship",
    excerpt:
      "A Jordanian logistics family needed mobility for three generations and an asset base outside a volatile regional currency. The $400,000 threshold was the easy part. Valuation, the three-year lock-in and a grandmother's residence file were not.",
    image:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2000&auto=format&fit=crop",
    date: "February 26, 2026",
    readTime: "8 min read",
    advisor: "anastasia-akay",
    programHref: "/citizenship/turkey",

    client: {
      alias: "The Al-M. family",
      age: "47 and 44, children aged 16, 12 and 6",
      citizenship: "Jordan",
      household: "Two adults, three children, one dependent parent",
      profession: "Regional logistics and freight forwarding group",
      motivation:
        "Visa-free mobility for the whole family, a hard-asset base outside the regional currency, and a university pathway for a sixteen-year-old two years from application season.",
      initials: "AM",
    },

    keyFacts: [
      { label: "Programme", value: "Citizenship by Investment" },
      { label: "Qualifying Investment", value: "USD 400,000 in real estate" },
      { label: "Total Timeline", value: "4 months" },
      { label: "Citizenships Granted", value: "5 family members" },
    ],

    challenge: {
      intro:
        "The family had made two failed attempts through other intermediaries before reaching us. Both failed for the same reason, and it is the reason most Turkish CBI files fail: the valuation, not the price.",
      points: [
        "Valuation versus purchase price. They had twice agreed purchases at $400,000 where the official SPK-licensed appraisal came in at $362,000 and $378,000. The threshold is measured against the appraisal, not the contract.",
        "A three-year lock-in they had not been told about. The qualifying property cannot be sold for three years, and this is annotated on the title deed itself. Their previous adviser had described it as 'a formality'.",
        "A sixteen-year-old on a deadline. University applications were two years out, and Turkish citizenship materially changes both the options and the fee structure available to him.",
        "A grandmother who does not qualify. Dependent parents are not included in Turkish citizenship by investment. Her file had to be solved separately, on a different legal basis, in parallel.",
      ],
    },

    options: [
      {
        option: "Citizenship by real estate — USD 400,000",
        investment: "USD 400,000 appraised",
        timeline: "3 – 6 months",
        verdict: "chosen",
        note: "Hard asset, rental yield during the lock-in, and the family wanted an Antalya base regardless. Three-year holding period applies.",
      },
      {
        option: "Citizenship by bank deposit — USD 500,000",
        investment: "USD 500,000 for 3 years",
        timeline: "2 – 4 months",
        verdict: "rejected",
        note: "Marginally faster and administratively simpler, but $100,000 more and the capital earns below inflation while locked. No asset at the end.",
      },
      {
        option: "Short-term residence permit first",
        investment: "From €75,000 property",
        timeline: "6 – 10 weeks",
        verdict: "considered",
        note: "Used for the grandmother, who is not eligible as a dependant under the citizenship programme. Renewable and ultimately a path to long-term residence.",
      },
      {
        option: "Caribbean citizenship (Grenada / St Kitts)",
        investment: "From USD 235,000",
        timeline: "4 – 8 months",
        verdict: "rejected",
        note: "Cheaper entry, but no physical asset, no regional presence and no university pathway. Strong on mobility alone — which was not the whole brief.",
      },
    ],

    sections: [
      {
        heading: "Why two previous attempts failed",
        body: `<p>The Turkish citizenship-by-investment programme has a threshold of USD 400,000. Almost every failed application we inherit fails because the applicant believed that meant the purchase price.</p>
<p>It does not. The figure is measured against a valuation report produced by an appraiser licensed by the Capital Markets Board of Türkiye (SPK), and appraisers are — correctly — conservative. A property marketed at $400,000 in a rising market may appraise at $370,000, and the file simply stops. The family had already lost deposits twice on properties that were, in the ordinary commercial sense, worth what they paid.</p>
<blockquote>The threshold is not what you paid. It is what an SPK-licensed appraiser says it is worth — and that number is produced before you commit, not after.</blockquote>
<p>Our sequence inverts the usual one. We commission the valuation on a shortlist before any deposit is placed, we target properties appraising at 10–15% above the threshold to absorb currency movement between appraisal and application, and we treat any property where the appraisal sits within 5% of $400,000 as ineligible on principle.</p>`,
        image:
          "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1600&auto=format&fit=crop",
        imageCaption:
          "Antalya. Three properties were appraised before one deposit was placed.",
      },
      {
        heading: "One threshold, three properties",
        body: `<p>The $400,000 may be met with a single property or a combination, and combining changes the risk profile considerably. Rather than one apartment at the threshold, the family acquired three units in Antalya with a combined appraised value of $455,000 — a two-bedroom in Konyaaltı they use themselves, and two one-bedroom units in Lara held for rental.</p>
<p>Three effects follow. The buffer above the threshold absorbs any appraisal or exchange-rate movement before submission. The rental units generate income across the three-year lock-in rather than sitting idle. And at the end of the holding period, the family can exit partially — selling one unit and keeping the base — instead of facing a single all-or-nothing decision.</p>
<p>The three-year restriction is annotated directly on each title deed. It is a legal encumbrance, not a promise, and any adviser who characterises it as a formality has told you something important about the quality of their advice.</p>`,
      },
      {
        heading: "The grandmother problem",
        body: `<p>Turkish citizenship by investment includes the main applicant, their spouse, and children under 18. It does not include parents, adult children, or siblings — a fact that surfaces late in a distressing number of files, usually after the family has already been told everyone is covered.</p>
<p>The applicant's mother, 71 and living with the family, was accordingly not eligible. Her file was solved on a different legal basis and run in parallel: a short-term residence permit tied to a property purchase, supported by health insurance and proof of means, with renewals leading toward long-term residence.</p>
<p>She holds a residence permit rather than a passport. It was not the outcome the family initially wanted, and we said so plainly in the first meeting rather than discovering it in month three. Every family should establish, at the outset and in writing, exactly which members a programme covers.</p>`,
        image:
          "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1600&auto=format&fit=crop",
        imageCaption:
          "Konyaaltı, Antalya — the family's own residence within the portfolio.",
      },
      {
        heading: "What citizenship changed for a sixteen-year-old",
        body: `<p>The eldest son was the quiet reason for the timeline. At sixteen he was two years from university applications, and his options as a Jordanian national and as a Turkish–Jordanian dual national are materially different.</p>
<p>As a Turkish citizen he applies to Turkish universities on the domestic track rather than as an international student, at domestic fee levels. Turkish citizenship also opens visa-free or visa-on-arrival access to well over 110 destinations, which matters more for a prospective engineering student attending conferences and interviews than most parents anticipate.</p>
<p>One item required advance planning: Turkish male citizens are subject to military service obligations, with deferment available for students and a paid exemption available to citizens resident abroad who meet the conditions. We set this out in writing before the application, because it is a lifelong consequence of the decision and it belongs in the first conversation, not the last.</p>`,
      },
    ],

    expertNotes: [
      {
        author: "anastasia-akay",
        text: "Commission the SPK valuation before you place a deposit — not after. Two-thirds of the failed Turkish files that reach us failed on this single point, and in almost every case the deposit was already non-refundable by the time anyone looked at the appraisal.",
      },
      {
        author: "ozkan-tekce",
        text: "Establish in the very first meeting exactly who a programme includes. Spouse and minor children, yes. Parents and adult children, no. Families arrive assuming the passport covers the household, and correcting that assumption in month three does real damage to people who have already told their relatives.",
      },
    ],

    timeline: [
      {
        phase: "Consultation & family eligibility mapping",
        date: "6 October 2025",
        duration: "1 week",
        cost: "—",
        detail:
          "Five eligible applicants confirmed; the grandmother's separate residence route identified immediately.",
      },
      {
        phase: "Property shortlist & SPK valuations",
        date: "13 October 2025",
        duration: "3 weeks",
        cost: "USD 2,400",
        detail:
          "Five properties appraised before any commitment. Three selected with a combined valuation of $455,000.",
      },
      {
        phase: "Purchase, title deeds & lock-in annotation",
        date: "10 November 2025",
        duration: "2 weeks",
        cost: "USD 18,200",
        detail:
          "Title deed transfer at the Land Registry, three-year non-sale annotation recorded on each deed.",
      },
      {
        phase: "Certificate of Conformity",
        date: "24 November 2025",
        duration: "3 weeks",
        cost: "—",
        detail:
          "Issued by the Ministry of Environment and Urbanisation, confirming the investment satisfies the programme.",
      },
      {
        phase: "Short-term residence permits — 5 applicants",
        date: "15 December 2025",
        duration: "2 weeks",
        cost: "USD 1,750",
        detail:
          "Mandatory intermediate step. Biometrics for all five family members completed in Antalya.",
      },
      {
        phase: "Citizenship application submitted",
        date: "29 December 2025",
        duration: "1 day",
        cost: "USD 3,100",
        detail:
          "Filed with the Directorate General of Civil Registration. Full family on one file.",
      },
      {
        phase: "Government review",
        date: "30 December 2025",
        duration: "7 weeks",
        cost: "—",
        detail:
          "Security and background review across all applicants. No supplementary requests issued.",
      },
      {
        phase: "Citizenship granted & passports issued",
        date: "18 February 2026",
        duration: "2 weeks",
        cost: "USD 620",
        detail:
          "Five Turkish passports issued. Grandmother's residence permit approved the same month.",
      },
    ],
    timelineSummary: {
      totalDuration: "4 months",
      totalCost: "USD 48,570 in fees",
      note: "Excludes the USD 455,000 qualifying property portfolio.",
    },

    costs: [
      {
        item: "Qualifying property portfolio — 3 units, Antalya",
        amount: "USD 455,000",
        category: "Investment",
        note: "Appraised value. Threshold is $400,000; buffer held deliberately.",
      },
      {
        item: "Title deed transfer tax (4%)",
        amount: "USD 18,200",
        category: "Government",
        note: "Payable at the Land Registry on transfer.",
      },
      {
        item: "SPK-licensed valuation reports — 5 properties",
        amount: "USD 2,400",
        category: "Professional",
        note: "Commissioned before any deposit. Two properties were rejected on the report.",
      },
      {
        item: "Citizenship application — 5 applicants",
        amount: "USD 3,100",
        category: "Government",
        note: "Government filing fees, full family on one file.",
      },
      {
        item: "Short-term residence permits — 5 applicants",
        amount: "USD 1,750",
        category: "Government",
        note: "Mandatory intermediate step before the citizenship file.",
      },
      {
        item: "Passport issuance — 5 applicants",
        amount: "USD 620",
        category: "Government",
        note: "Ten-year Turkish passports.",
      },
      {
        item: "TEKCE Visa advisory & legal representation",
        amount: "USD 22,500",
        category: "Professional",
        note: "Includes power of attorney work and the separate residence file.",
      },
      {
        item: "Grandmother's residence file",
        amount: "USD 4,900",
        category: "Professional",
        note: "Separate legal basis, health insurance and means documentation.",
      },
    ],
    costTotal: "USD 48,570 in fees, excluding the USD 455,000 portfolio",

    pullQuote: {
      text: "Two firms told us the price was the number. The third told us the appraisal was the number. That sentence cost us two deposits to learn.",
      attribution: "The applicant, Al-M. family",
    },

    interview: {
      title: "A conversation, three months after the passports",
      intro:
        "Özkan Tekçe met the family at their apartment in Konyaaltı in May 2026. The applicant's wife and their sixteen-year-old son joined for part of the conversation. Edited for length; the family asked that their name not be published.",
      host: "ozkan-tekce",
      recordedAt: "Recorded in Antalya, May 2026",
      lines: [
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "You had two applications fail before you came to us. What did those experiences teach you?",
        },
        {
          speaker: "client",
          name: "The applicant",
          role: "Al-M. family",
          text: "That everyone in this industry sounds the same in the first meeting. Both firms were confident, both had offices, both showed me photographs of beautiful apartments. Neither of them mentioned the valuation until after my deposit had cleared. The second time it happened I assumed the programme itself was a trap.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "What made you try a third time?",
        },
        {
          speaker: "client",
          name: "The applicant",
          role: "Al-M. family",
          text: "My son's age, honestly. He was sixteen. If we did nothing, he would apply to university as a foreign student and the window would close. I gave it one more attempt because of a deadline, not because my confidence had recovered.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "Anastasia tells me the first meeting was difficult.",
        },
        {
          speaker: "client",
          name: "Umm A.",
          role: "Spouse",
          text: "It was difficult because she told us something we did not want to hear. My mother-in-law lives with us. We had been assured twice that she would receive a passport with the rest of us. Anastasia said, in the first hour, that she would not — that parents are not included, and that we would need a separate file for her.",
        },
        {
          speaker: "client",
          name: "The applicant",
          role: "Al-M. family",
          text: "I was angry. I thought she was being negative to protect herself. Then I checked the regulation myself, and she was right, and the other two firms had simply told me what I wanted to hear for eight months.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "How does your mother feel about the outcome?",
        },
        {
          speaker: "client",
          name: "The applicant",
          role: "Al-M. family",
          text: "She has a residence permit and she lives in the same building as her grandchildren, which is what she actually wanted. The passport was my idea, not hers. She told me that quite firmly in February.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "And you — you were the reason for the timeline. What changed for you?",
        },
        {
          speaker: "client",
          name: "Yousef",
          role: "Son, 16",
          text: "The university thing is what my father cares about. For me it was travelling. I went to a robotics competition in Germany in March and I did not apply for a visa, I just went. My friend from Amman could not come. That was the first time it felt real rather than like paperwork my parents were doing.",
        },
        {
          speaker: "host",
          name: "Özkan Tekçe",
          role: "TEKCE COO",
          text: "What would you tell a family considering this?",
        },
        {
          speaker: "client",
          name: "The applicant",
          role: "Al-M. family",
          text: "Ask two questions in the first meeting. Who exactly is included, in writing. And who produces the valuation, and when. If the answers are vague, leave. I paid two deposits to learn those two questions.",
        },
      ],
    },

    results: [
      {
        value: "4 months",
        label: "Consultation to passports",
        note: "After two failed attempts spanning eleven months with other firms.",
      },
      {
        value: "5",
        label: "Citizenships granted",
        note: "Both parents and all three children on one application.",
      },
      {
        value: "110+",
        label: "Visa-free destinations",
        note: "Visa-free or visa-on-arrival access on the Turkish passport.",
      },
      {
        value: "$55,000",
        label: "Buffer above threshold",
        note: "Portfolio appraised at $455,000 against a $400,000 requirement.",
      },
    ],

    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
        caption: "Antalya's old harbour.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1200&auto=format&fit=crop",
        caption: "Konyaaltı — the family's own unit in the portfolio.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1200&auto=format&fit=crop",
        caption: "İstanbul, where the passports were collected.",
      },
    ],

    faqs: [
      {
        q: "Is the $400,000 threshold based on the price I pay?",
        a: "No. It is based on the valuation report produced by an appraiser licensed by the Capital Markets Board (SPK). Purchase price and appraised value routinely differ, and the appraisal governs. Always commission it before placing a deposit.",
      },
      {
        q: "Can I sell the property after receiving citizenship?",
        a: "Not for three years. The restriction is annotated on the title deed itself and is legally binding. Citizenship already granted is not revoked by a later sale, but selling within the period breaches the undertaking recorded on the deed.",
      },
      {
        q: "Can I combine several properties to reach the threshold?",
        a: "Yes, and it is often the better structure. Combining lets you hold a buffer above the threshold, generate rental income during the lock-in, and exit partially at the end rather than facing a single all-or-nothing sale.",
      },
      {
        q: "Who is included in the application?",
        a: "The main applicant, their spouse, and children under 18. Parents, adult children and siblings are not included and must be handled through separate residence or citizenship routes.",
      },
      {
        q: "Do my children have military service obligations?",
        a: "Male Turkish citizens are subject to military service. Deferment is available for students, and a paid exemption is available to citizens resident abroad who meet the statutory conditions. It should be discussed before the application, not after.",
      },
      {
        q: "Do I need to live in Türkiye?",
        a: "No. There is no residence or physical presence requirement, either before or after citizenship is granted. The short-term residence permit obtained during the process is a procedural step, not a relocation obligation.",
      },
    ],

    related: [
      "dubai-golden-visa-turkish-tech-founders",
      "caribbean-citizenship-logistics-entrepreneur",
      "spain-non-lucrative-visa-us-entrepreneur",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  04 — PORTUGAL GOLDEN VISA (FUND ROUTE)                          */
  /* ---------------------------------------------------------------- */
  {
    slug: "portugal-golden-visa-fund-route",
    title:
      "Portugal Golden Visa: Choosing the Fund Route When You Have No Intention of Moving",
    program: "Portugal Golden Visa",
    country: "Portugal",
    category: "Residence",
    excerpt:
      "A pharmaceutical executive in Mumbai wanted an EU option for his family without leaving his job, his city or his elderly parents. The seven-day annual stay requirement was the whole point — and the fund route was the only structure that respected it.",
    image:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=2000&auto=format&fit=crop",
    date: "January 15, 2026",
    readTime: "7 min read",
    advisor: "ihsan-erol",
    programHref: "/residence/portugal",

    client: {
      alias: "Rajiv S.",
      age: "49",
      citizenship: "India",
      household: "Two adults, one daughter (aged 19, in full-time education)",
      profession: "Divisional director, pharmaceutical manufacturing",
      motivation:
        "An EU residency option held in reserve, a currency-diversified investment, and eventual citizenship — all without relocating or interrupting his career.",
      initials: "RS",
    },

    keyFacts: [
      { label: "Programme", value: "Golden Visa — regulated fund route" },
      { label: "Qualifying Investment", value: "€500,000 in a CMVM fund" },
      { label: "Total Timeline", value: "14 months to card" },
      { label: "Residency Granted", value: "3 family members" },
    ],

    challenge: {
      intro:
        "Rajiv did not want to move to Portugal. He wanted the right to move to Portugal, which is a different product and is frequently sold as the same thing.",
      points: [
        "No relocation, now or soon. He intended to keep working in Mumbai for at least eight more years and to remain near his parents. Any programme requiring meaningful physical presence was disqualified.",
        "Real estate was no longer available. The 2023 reform removed property acquisition as a qualifying route, and much of the advice circulating online still assumes it exists.",
        "A nineteen-year-old daughter. Dependent children over 18 are includable, but only where genuine dependency and full-time education can be evidenced — and the evidence must be prepared before submission.",
        "Timeline uncertainty. AIMA processing backlogs made any promise of a fixed date dishonest, and the family needed a realistic range rather than an optimistic one.",
      ],
    },

    options: [
      {
        option: "Regulated investment fund — €500,000",
        investment: "€500,000",
        timeline: "12 – 20 months",
        verdict: "chosen",
        note: "CMVM-regulated, professionally managed, no property management burden, and fully compatible with a seven-day average annual stay.",
      },
      {
        option: "Cultural or artistic donation — €250,000",
        investment: "€250,000",
        timeline: "12 – 20 months",
        verdict: "considered",
        note: "Half the capital, but it is a donation — the money is not returned. Correct for some applicants; he preferred a recoverable position.",
      },
      {
        option: "Job creation — 10 positions",
        investment: "Variable",
        timeline: "12 – 20 months",
        verdict: "rejected",
        note: "Requires operating a real business in Portugal. Incompatible with a full-time executive role in Mumbai.",
      },
      {
        option: "Property acquisition",
        investment: "Formerly €280,000+",
        timeline: "—",
        verdict: "rejected",
        note: "Removed as a qualifying route by the 2023 reform. Still widely and wrongly advertised; listed here because clients ask for it weekly.",
      },
    ],

    sections: [
      {
        heading: "The seven-day programme",
        body: `<p>Portugal's Golden Visa carries the lightest physical presence requirement of any serious European residency programme: an average of seven days per year, usually satisfied as fourteen days across each two-year renewal period. For applicants who intend to relocate, this is a minor detail. For applicants who do not, it is the entire proposition.</p>
<p>Rajiv's brief was explicit. He wanted an EU status his family could activate later — if regulatory conditions in his industry shifted, if his daughter chose to study or work in Europe, if circumstances changed in ways he could not specify. He was buying optionality, and he wanted to be honest about that rather than pretend to a relocation plan he had no intention of executing.</p>
<blockquote>Seven days a year is not a loophole. It is the design. Portugal built a programme for capital and optionality, not for occupancy.</blockquote>
<p>Crucially, those seven days do not make him a Portuguese tax resident. Tax residency turns on 183 days or a habitual residence, neither of which applies. His Indian tax position is unchanged — a point that required careful explanation, because a great deal of online commentary conflates residency permits with tax residency.</p>`,
        image:
          "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1600&auto=format&fit=crop",
        imageCaption:
          "Lisbon. Visited twice in fourteen months — which is the entire presence requirement.",
      },
      {
        heading: "Why a fund rather than a donation",
        body: `<p>With property gone, the practical choice for a passive applicant is between a €500,000 regulated fund and a €250,000 cultural donation. The donation is half the money and is frequently presented as the obvious answer. It is not, and the reason is simple: the donation is spent, while the fund subscription is an investment position that can be redeemed.</p>
<p>We screened eleven CMVM-regulated funds on five criteria: track record beyond a single vintage, a fee structure that does not consume the return, genuine diversification rather than a repackaged property play, a redemption horizon aligned to the citizenship timeline, and a manager with demonstrable Golden Visa compliance experience. Four survived. He subscribed to a diversified growth fund with a six-to-eight year horizon.</p>
<p>Two warnings we give every fund applicant. First, several funds marketed to Golden Visa applicants are property funds in substance, and there is live regulatory risk in holding one. Second, the fund must maintain its qualifying status for the full five years — if the manager loses compliance, your residency file is affected. Manager selection is not a financial decision alone.</p>`,
      },
      {
        heading: "Including an adult child",
        body: `<p>Rajiv's daughter was nineteen and in the second year of a bachelor's degree. Portugal permits dependent children over eighteen to be included where they are unmarried, in full-time education, and financially dependent on the applicant — but each of those three conditions must be evidenced, and the evidence is prepared before submission or not at all.</p>
<p>We assembled university enrolment confirmation with expected completion date, twelve months of bank records showing parental transfers covering tuition and living costs, a declaration of dependency, and confirmation of unmarried status. Filed alongside her parents, she was approved on the same file.</p>
<p>The clock matters here. Had the family waited two years, she would have graduated and dependency would have been considerably harder to establish. Families with children in their late teens should understand that the window narrows every year — this is the single most time-sensitive variable in most European residency files.</p>`,
        image:
          "https://images.unsplash.com/photo-1580996375021-fdc38b0b74e9?q=80&w=1600&auto=format&fit=crop",
        imageCaption:
          "Porto. Under consideration for his daughter's postgraduate study.",
      },
      {
        heading: "Honest timelines, including the bad news",
        body: `<p>AIMA, the Portuguese immigration authority, has carried a substantial backlog since its 2023 restructuring. Any adviser quoting a firm date for a Portuguese Golden Visa card is guessing, and we said so at the first meeting.</p>
<p>What we committed to instead was a range and a sequence: submission within eight weeks of the fund subscription, biometrics when scheduled by AIMA — outside anyone's control — and cards issued twelve to twenty months from submission. The actual outcome was fourteen months, comfortably inside the range and slower than the family had hoped.</p>
<p>One point of real comfort: the five-year clock toward permanent residence and citizenship runs from the date of application, not the date the card is issued. Backlog delays the card. It does not delay the citizenship timeline, which is what the family was actually buying.</p>`,
      },
    ],

    expertNotes: [
      {
        author: "ihsan-erol",
        text: "Property was removed as a Golden Visa route in 2023, and I still have this conversation several times a week. If anyone offers you a Portuguese Golden Visa through an apartment purchase in 2026, that is not a programme detail they have got wrong — it tells you everything about whether they should be handling your file.",
      },
      {
        author: "ozkan-tekce",
        text: "The five-year clock runs from application, not from card issuance. That distinction is worth more than most applicants realise, because it means AIMA's backlog costs you patience rather than years. Anyone selling urgency on the basis of the backlog has the mechanism backwards.",
      },
    ],

    timeline: [
      {
        phase: "Consultation & route selection",
        date: "3 September 2024",
        duration: "2 weeks",
        cost: "—",
        detail:
          "Fund route confirmed over donation. Presence requirement and tax residency position clarified in writing.",
      },
      {
        phase: "NIF, bank account & fund due diligence",
        date: "17 September 2024",
        duration: "6 weeks",
        cost: "€1,900",
        detail:
          "Portuguese tax number and bank account opened remotely. Eleven CMVM funds screened, four shortlisted.",
      },
      {
        phase: "Fund subscription",
        date: "5 November 2024",
        duration: "3 weeks",
        cost: "€500,000",
        detail:
          "Capital transferred, subscription confirmed, qualifying declaration issued by the fund manager.",
      },
      {
        phase: "Dependency evidence — adult daughter",
        date: "12 November 2024",
        duration: "Parallel",
        cost: "—",
        detail:
          "Enrolment confirmation, twelve months of parental transfers, dependency and marital status declarations.",
      },
      {
        phase: "Application submitted to AIMA",
        date: "9 December 2024",
        duration: "1 day",
        cost: "€1,860",
        detail:
          "Three applicants filed together. The five-year clock starts on this date, not on card issuance.",
      },
      {
        phase: "AIMA processing & biometrics",
        date: "14 April 2025",
        duration: "9 months",
        cost: "—",
        detail:
          "Biometrics appointment in Lisbon — the family's first visit. Backlog accounted for the bulk of the wait.",
      },
      {
        phase: "Residence cards issued",
        date: "2 February 2026",
        duration: "3 weeks",
        cost: "€17,400",
        detail:
          "Two-year cards for all three family members. Government issuance fees payable at this stage.",
      },
    ],
    timelineSummary: {
      totalDuration: "14 months from submission",
      totalCost: "€38,660 in fees",
      note: "Excludes the €500,000 fund subscription, which remains an investment position.",
    },

    costs: [
      {
        item: "CMVM-regulated fund subscription",
        amount: "€500,000",
        category: "Investment",
        note: "Recoverable investment position, six-to-eight year horizon. Not a fee.",
      },
      {
        item: "AIMA application fee — 3 applicants",
        amount: "€1,860",
        category: "Government",
        note: "Payable at submission.",
      },
      {
        item: "Residence card issuance — 3 applicants",
        amount: "€17,400",
        category: "Government",
        note: "The principal government cost, payable on approval.",
      },
      {
        item: "TEKCE Visa advisory & legal representation",
        amount: "€14,500",
        category: "Professional",
        note: "Includes fund due diligence and the adult-dependant evidence file.",
      },
      {
        item: "Fund subscription & custodian fees",
        amount: "€3,000",
        category: "Professional",
        note: "One-off subscription cost; annual management fee charged within the fund.",
      },
      {
        item: "NIF, bank account & document legalisation",
        amount: "€1,900",
        category: "Professional",
        note: "Arranged remotely, before any travel to Portugal.",
      },
    ],
    costTotal: "€38,660 in fees, excluding the €500,000 fund subscription",

    pullQuote: {
      text: "I am not moving to Portugal. I am making sure that in ten years, if we want to, it is a decision and not an application.",
      attribution: "Rajiv S.",
    },

    results: [
      {
        value: "7 days",
        label: "Average annual stay required",
        note: "Satisfied as fourteen days per two-year renewal period.",
      },
      {
        value: "3",
        label: "Residence permits granted",
        note: "Including an adult daughter, evidenced as a dependant in education.",
      },
      {
        value: "Year 5",
        label: "Citizenship eligibility",
        note: "Counted from application date, not card issuance.",
      },
      {
        value: "€500,000",
        label: "Capital in a recoverable position",
        note: "A fund subscription rather than a spent donation.",
      },
    ],

    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1200&auto=format&fit=crop",
        caption: "Lisbon — biometrics, and the family's first visit.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1580996375021-fdc38b0b74e9?q=80&w=1200&auto=format&fit=crop",
        caption: "Porto, shortlisted for postgraduate study.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=1200&auto=format&fit=crop",
        caption: "The Algarve — considered, and deferred.",
      },
    ],

    faqs: [
      {
        q: "Can I still get a Portuguese Golden Visa through property?",
        a: "No. Property acquisition was removed as a qualifying route by the 2023 reform. Current routes include regulated investment funds (€500,000), cultural or artistic donations (€250,000), research contributions, and job creation.",
      },
      {
        q: "How many days must I spend in Portugal?",
        a: "An average of seven days per year, typically satisfied as fourteen days across each two-year renewal period. This does not create Portuguese tax residency, which turns on 183 days or a habitual residence.",
      },
      {
        q: "Can my adult child be included?",
        a: "Yes, where they are unmarried, in full-time education and financially dependent on you. All three conditions must be evidenced at submission. The window narrows as they approach graduation, so timing matters.",
      },
      {
        q: "Does the AIMA backlog delay my citizenship eligibility?",
        a: "No. The five-year clock toward permanent residence and citizenship runs from the date of application, not from the date your card is issued. Backlog costs you patience, not years.",
      },
      {
        q: "What happens if the fund loses its qualifying status?",
        a: "Your residency file is affected, which is why manager selection is a compliance decision as well as a financial one. We screen for demonstrable Golden Visa compliance experience and avoid funds that are property vehicles in substance.",
      },
    ],

    related: [
      "spain-non-lucrative-visa-us-entrepreneur",
      "dubai-golden-visa-turkish-tech-founders",
      "caribbean-citizenship-logistics-entrepreneur",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  05 — CARIBBEAN CITIZENSHIP                                      */
  /* ---------------------------------------------------------------- */
  {
    slug: "caribbean-citizenship-logistics-entrepreneur",
    title:
      "Grenada Citizenship: A Second Passport Bought for One Specific Door",
    program: "Grenada Citizenship by Investment",
    country: "Grenada",
    category: "Citizenship",
    excerpt:
      "Most second passports are bought for mobility in general. This one was bought for a single treaty clause — Grenada is the only Caribbean citizenship that unlocks the US E-2 investor visa. The rest of the file followed from that one fact.",
    image:
      "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=2000&auto=format&fit=crop",
    date: "December 8, 2025",
    readTime: "6 min read",
    advisor: "ozkan-tekce",
    programHref: "/citizenship/caribbean",

    client: {
      alias: "Chidi O.",
      age: "52",
      citizenship: "Nigeria",
      household: "Two adults, two children (aged 21 and 17)",
      profession: "Owner, West African logistics and warehousing group",
      motivation:
        "A route to operating and living in the United States without waiting years in the EB-5 queue, plus a passport that removes visa friction from a travel-heavy business.",
      initials: "CO",
    },

    keyFacts: [
      { label: "Programme", value: "Citizenship by Investment — NTF donation" },
      { label: "Qualifying Contribution", value: "USD 235,000" },
      { label: "Total Timeline", value: "6 months" },
      { label: "Citizenships Granted", value: "4 family members" },
    ],

    challenge: {
      intro:
        "Chidi came with a conclusion rather than a question: he wanted to run a US subsidiary and to be able to live there while doing it. Every route he had been shown was either years long or not a route at all.",
      points: [
        "The EB-5 queue. Direct EB-5 investment was affordable but carried multi-year processing for his category, and he needed a working presence within twelve months, not eventually.",
        "Nigeria has no E-2 treaty. The E-2 investor visa is available only to nationals of treaty countries. As a Nigerian citizen he was ineligible, regardless of how much he invested.",
        "Travel friction as a business cost. He was making eleven or twelve international trips a year, each requiring a visa application, and had missed two client meetings in the previous year over processing delays.",
        "A twenty-one-year-old son. Dependent children over 18 are includable in Grenada's programme, but only on evidenced dependency — and the evidence had to be assembled before submission.",
      ],
    },

    options: [
      {
        option: "Grenada CBI — National Transformation Fund",
        investment: "USD 235,000 donation",
        timeline: "4 – 8 months",
        verdict: "chosen",
        note: "The only Caribbean citizenship with a US E-2 treaty. That single feature decided the file; nothing else on the list offers it.",
      },
      {
        option: "Grenada CBI — approved real estate",
        investment: "USD 270,000 + fees",
        timeline: "4 – 8 months",
        verdict: "considered",
        note: "Recoverable after a five-year hold, but resale markets for CBI-approved developments are thin. He preferred the lower total outlay.",
      },
      {
        option: "St Kitts & Nevis CBI",
        investment: "USD 250,000 donation",
        timeline: "4 – 8 months",
        verdict: "rejected",
        note: "Marginally stronger passport on visa-free count, but no E-2 treaty with the United States — which was the entire purpose.",
      },
      {
        option: "US EB-5 direct investment",
        investment: "USD 800,000+",
        timeline: "Multi-year for his category",
        verdict: "rejected",
        note: "A green card rather than a visa, and materially better in the long run. The processing horizon simply did not meet the business need.",
      },
    ],

    sections: [
      {
        heading: "One clause, one country",
        body: `<p>The E-2 treaty investor visa allows a national of a treaty country to enter and live in the United States to direct a business in which they have invested a substantial amount. It is renewable indefinitely, it includes spouse and children under 21, and the spouse may work. It is not a green card, and it does not lead to one — but for an operating business owner it is often the more practical instrument.</p>
<p>Nigeria is not an E-2 treaty country. Grenada is — and it is the only Caribbean citizenship-by-investment programme whose passport carries E-2 eligibility. That single fact eliminated every competing programme from consideration, irrespective of price or visa-free count.</p>
<blockquote>He was not buying a passport. He was buying standing under one specific treaty, and Grenada was the only vendor.</blockquote>
<p>We were explicit about what the structure does not do. E-2 status does not create a path to permanent residence. It requires a real, operating, non-marginal business — not a holding company or a passive property portfolio. And it must be maintained: if the business closes, the status goes with it. Clients who want permanence should pursue EB-5 and accept the queue.</p>`,
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
        imageCaption:
          "Grenada. Neither he nor his family has yet visited — the programme requires no residence.",
      },
      {
        heading: "Donation or real estate",
        body: `<p>Grenada offers two routes: a non-refundable contribution to the National Transformation Fund, or the purchase of approved real estate held for five years. The donation is spent; the property is theoretically recoverable.</p>
<p>The theory deserves scrutiny. Resale markets for CBI-approved Caribbean developments are thin, and the natural buyer for your unit in year five is another CBI applicant — who can usually buy new. We have seen clients hold units for years past the minimum period, and we now advise treating the real estate route as recoverable in principle rather than in practice unless the specific development has a demonstrated resale history.</p>
<p>With a family of four, the NTF contribution of USD 235,000 plus fees came in below the real estate route's total outlay once government, due diligence and processing fees were included. He chose the donation, understanding the money was gone, and preferred that clarity to a recovery he was not confident in.</p>`,
      },
      {
        heading: "The adult son, and a deadline nobody mentions",
        body: `<p>Grenada permits dependent children over eighteen where dependency is evidenced. His son, twenty-one and completing a degree in the United Kingdom, was included on enrolment records, twelve months of parental transfers, and a dependency declaration.</p>
<p>There is a second deadline that catches families out, and it belongs to the E-2 rather than to Grenada. E-2 dependant status covers children under twenty-one. His son will age out. He can convert to a student visa or qualify independently, but he will not remain on his father's E-2 indefinitely — and that consequence was set out in writing at the start, because it is exactly the kind of detail that produces an angry conversation three years later when nobody remembers who said what.</p>
<p>His seventeen-year-old daughter has roughly four years of dependant coverage. That, rather than the citizenship itself, now drives the family's planning.</p>`,
      },
      {
        heading: "What the passport did immediately",
        body: `<p>The E-2 filing came after the passports and is a separate process on its own timeline. The mobility benefit, however, arrived the day the passports did.</p>
<p>Grenada's passport carries visa-free or visa-on-arrival access to well over 140 destinations, including the Schengen Area, the United Kingdom and China — the last being unusual and directly relevant to a logistics business with Chinese suppliers. In his first eleven months as a Grenadian citizen he made fourteen international trips and filed one visa application.</p>
<p>He describes the change as administrative rather than emotional, which is an unusually honest way to put it. He did not acquire a new national identity. He removed a recurring category of friction from a business that travels, and he obtained standing under a treaty he could not otherwise access.</p>`,
      },
    ],

    expertNotes: [
      {
        author: "ozkan-tekce",
        text: "Grenada is the only Caribbean programme with a US E-2 treaty, and that is the sole reason most of our Grenada clients choose it over St Kitts or Dominica. If E-2 access is not part of your objective, you should be comparing the Caribbean programmes on due diligence standards and processing reliability instead — and you may well land somewhere else.",
      },
      {
        author: "anastasia-akay",
        text: "Treat the Caribbean real estate route as recoverable in principle rather than in practice. The resale market is genuinely thin and your likeliest buyer in year five is another applicant who would rather buy new. If the capital must come back on schedule, the donation and a smaller total outlay is often the more honest choice.",
      },
    ],

    timeline: [
      {
        phase: "Consultation & objective definition",
        date: "12 May 2025",
        duration: "2 weeks",
        cost: "—",
        detail:
          "E-2 access identified as the governing requirement. Grenada confirmed as the only qualifying programme.",
      },
      {
        phase: "Source of funds & pre-screening",
        date: "26 May 2025",
        duration: "5 weeks",
        cost: "USD 3,200",
        detail:
          "Group accounts, dividend history and asset origin documented. Independent pre-screen before formal submission.",
      },
      {
        phase: "Dependency evidence — adult son",
        date: "16 June 2025",
        duration: "Parallel",
        cost: "—",
        detail:
          "UK university enrolment, twelve months of parental transfers, dependency declaration.",
      },
      {
        phase: "Application submitted",
        date: "7 July 2025",
        duration: "1 day",
        cost: "USD 11,000",
        detail:
          "Filed through an authorised agent with the Grenada Citizenship by Investment Committee.",
      },
      {
        phase: "Due diligence & background review",
        date: "8 July 2025",
        duration: "13 weeks",
        cost: "USD 20,000",
        detail:
          "Independent international due diligence on all applicants over 16. No supplementary requests issued.",
      },
      {
        phase: "Approval in principle",
        date: "10 October 2025",
        duration: "2 weeks",
        cost: "—",
        detail:
          "Letter issued. Contribution payable within the window specified in the approval.",
      },
      {
        phase: "NTF contribution & oath",
        date: "24 October 2025",
        duration: "3 weeks",
        cost: "USD 235,000",
        detail:
          "Contribution transferred, certificates of naturalisation issued for all four applicants.",
      },
      {
        phase: "Passports issued",
        date: "21 November 2025",
        duration: "3 weeks",
        cost: "USD 2,400",
        detail:
          "Four Grenadian passports. E-2 preparation opened immediately afterwards as a separate file.",
      },
    ],
    timelineSummary: {
      totalDuration: "6 months",
      totalCost: "USD 271,600 all-in",
      note: "The USD 235,000 contribution is non-refundable and is included in this figure.",
    },

    costs: [
      {
        item: "National Transformation Fund contribution",
        amount: "USD 235,000",
        category: "Investment",
        note: "Family of four. Non-refundable — this money does not come back.",
      },
      {
        item: "Government application & processing fees",
        amount: "USD 11,000",
        category: "Government",
        note: "Four applicants, payable at submission.",
      },
      {
        item: "Due diligence fees",
        amount: "USD 20,000",
        category: "Government",
        note: "Independent background checks on every applicant over 16.",
      },
      {
        item: "Passport issuance — 4 applicants",
        amount: "USD 2,400",
        category: "Government",
        note: "Five-year passports, renewable.",
      },
      {
        item: "TEKCE Visa advisory & authorised agent",
        amount: "USD 3,200",
        category: "Professional",
        note: "Source-of-funds file, pre-screening, and agent representation.",
      },
    ],
    costTotal: "USD 271,600 all-in, of which USD 235,000 is non-refundable",

    pullQuote: {
      text: "I did not buy an identity. I bought standing under a treaty my own passport could not reach, and I stopped losing meetings to visa appointments.",
      attribution: "Chidi O.",
    },

    results: [
      {
        value: "6 months",
        label: "Consultation to passports",
        note: "No supplementary information requests during due diligence.",
      },
      {
        value: "140+",
        label: "Visa-free destinations",
        note: "Including Schengen, the UK and China — the last unusual and commercially relevant.",
      },
      {
        value: "E-2",
        label: "US treaty access unlocked",
        note: "Grenada is the only Caribbean CBI programme carrying E-2 eligibility.",
      },
      {
        value: "1",
        label: "Visa applications in 11 months",
        note: "Down from eleven or twelve per year before citizenship.",
      },
    ],

    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
        caption: "Grenada — no residence or visit requirement applies.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=1200&auto=format&fit=crop",
        caption: "The Caribbean programmes, compared on more than price.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=1200&auto=format&fit=crop",
        caption: "The US subsidiary, opened under E-2 in 2026.",
      },
    ],

    faqs: [
      {
        q: "Why Grenada rather than St Kitts or Dominica?",
        a: "Grenada is the only Caribbean citizenship-by-investment programme whose nationals qualify for the US E-2 treaty investor visa. Where E-2 access is the objective, no other Caribbean programme is a substitute at any price.",
      },
      {
        q: "Does the E-2 visa lead to a green card?",
        a: "No. E-2 is a non-immigrant status. It is renewable indefinitely while the qualifying business operates, and the spouse may work, but it does not create a path to permanent residence. Applicants who want permanence should consider EB-5.",
      },
      {
        q: "Is the real estate route better than the donation?",
        a: "Only if the specific development has a demonstrated resale history. Caribbean CBI resale markets are thin and your likely buyer in year five is another applicant who can buy new. Treat recoverability as a claim to verify, not a feature to assume.",
      },
      {
        q: "Do I have to visit or live in Grenada?",
        a: "No. There is no residence, visit or language requirement, either during the application or after citizenship is granted. This client had not visited at the time of publication.",
      },
      {
        q: "Can my adult children be included?",
        a: "Yes, where dependency is evidenced. Note a separate deadline: E-2 dependant status covers children under 21 only, so an adult child included in the citizenship may still age out of the US status.",
      },
    ],

    related: [
      "turkey-citizenship-jordanian-family",
      "portugal-golden-visa-fund-route",
      "dubai-golden-visa-turkish-tech-founders",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);

export const getCaseAdvisor = (study: CaseStudy): TeamMember =>
  getTeamMember(study.advisor);

export const getRelatedCases = (study: CaseStudy): CaseStudy[] =>
  study.related
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is CaseStudy => Boolean(c));

export const caseCategories = [
  "All",
  "Residence",
  "Citizenship",
  "Business",
] as const;
