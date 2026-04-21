"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { FAQAccordionData } from "@/types/content";

export function FAQAccordion({ data }: { data: FAQAccordionData }) {
  const { eyebrow, title, entries } = data;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-sand px-8 py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 max-w-2xl space-y-4">
          {eyebrow ? (
            <p className="font-body text-[13px] font-medium uppercase tracking-[0.14em] text-teal-500">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-[36px] font-bold leading-[1.08] tracking-[-0.03em] text-site-text lg:text-[44px]">
            {title}
          </h2>
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
                  className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-sand/50 md:px-7"
                >
                  <span className="font-display text-[16px] font-semibold leading-[1.35] text-site-text">
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
                  <div className="px-6 pb-6 pt-0 md:px-7">
                    <p className="font-body text-[15px] leading-[1.75] text-site-text-mid">
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
