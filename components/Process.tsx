"use client";

import React from "react";

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We assess your global mobility goals, family requirements, and financial profile to recommend the most optimal and secure pathway.",
  },
  {
    number: "02",
    title: "Document Preparation",
    description: "Our legal team meticulously handles all complex paperwork, notarizations, translations, and due diligence requirements on your behalf.",
  },
  {
    number: "03",
    title: "Application Submission",
    description: "We securely submit your finalized dossier to the respective government authorities and act as your sole legal representative.",
  },
  {
    number: "04",
    title: "Passport Delivery",
    description: "Upon successful government approval, your residence permits or citizenship documents are delivered to you, ready for your new global lifestyle.",
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
        <div className="mb-3 md:mb-12 max-w-2xl">
          <h2 className="text-[2.5rem] md:text-5xl font-serif text-black mb-3 leading-tight">
            An end-to-end legal process
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl font-light leading-relaxed">
            From the first consultation to the moment you receive your new documents, we ensure a discreet, efficient, and flawlessly executed experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connecting Line (Desktop) */}
              <div className="hidden lg:block absolute top-[1.65rem] left-0 right-0 w-full h-[1px] bg-neutral-200 -z-10 group-last:hidden" />

              <div className="flex flex-col">
                <div className="mb-8">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-neutral-200 bg-white text-black font-serif text-xl relative z-10 transition-colors duration-500 group-hover:border-black group-hover:bg-neutral-50">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-medium text-black mb-4">
                  {step.title}
                </h3>

                <p className="text-neutral-500 leading-[1.7] text-[15px] font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
