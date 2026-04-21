"use client";

import { useState } from "react";

import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import type { FAQAccordionData } from "@/types/content";

export function FAQAccordion({ data }: { data: FAQAccordionData }) {
  const { eyebrow, title, entries } = data;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-sand px-8 py-14 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 max-w-2xl space-y-3">
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
          <SectionHeading>{title}</SectionHeading>
        </div>

        <ul className="divide-y divide-[#E8E8E8] overflow-hidden rounded-card border border-[#E8E8E8] bg-white">
          {entries.map((entry, idx) => {
            const isOpen = open === idx;
            return (
              <li key={idx}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-start justify-between gap-6 p-5 text-left transition-colors hover:bg-sand/50 md:p-6"
                >
                  <span className="font-display text-[15px] font-semibold leading-snug text-site-text md:text-[16px]">
                    {entry.question}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E8E8E8] text-site-text-light transition-transform",
                      isOpen && "rotate-45 border-teal-400 text-teal-500",
                    )}
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                {isOpen ? (
                  <div className="px-5 pb-6 pt-0 md:px-6">
                    <p className="font-body text-[14px] leading-[1.7] text-site-text-mid">
                      {entry.answer}
                    </p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
