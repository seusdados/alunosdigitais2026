"use client";

import { useState } from "react";

import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/site-button";
import { submitContactLead, type ContactFormState } from "@/lib/actions/contact";
import type { ContactFormData } from "@/types/content";

const INITIAL_STATE: ContactFormState = { status: "idle" };

/**
 * ContactForm — bloco de captação. Usa Server Action em lib/actions/contact.ts.
 *
 * Esta fase NÃO persiste no banco: a action apenas valida e registra em log.
 * Persistência em `public.leads` fica pendente do relatório de convergência
 * LMS (docs/analise-convergencia-lms.md). Quando desbloquear, troca-se só
 * o miolo da action, sem tocar no componente.
 */
export function ContactFormBlock({ data }: { data: ContactFormData }) {
  const { eyebrow, title, subtitle, submitLabel = "Enviar mensagem" } = data;
  const [state, setState] = useState<ContactFormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(formData: FormData) {
    setSubmitting(true);
    const result = await submitContactLead(INITIAL_STATE, formData);
    setState(result);
    setSubmitting(false);
  }

  const fieldErrors: Partial<Record<string, string>> =
    state.status === "error" ? (state.fieldErrors ?? {}) : {};

  return (
    <section id="formulario" className="bg-site-white">
      <Container className="py-16 md:py-[80px]">
        <div className="grid gap-10 md:grid-cols-[2fr_3fr] md:items-start md:gap-16">
          <div className="space-y-3">
            {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
            <SectionHeading subtitle={subtitle}>{title}</SectionHeading>
          </div>

          <form action={onSubmit} className="rounded-card bg-sand p-6 md:p-9" noValidate>
            {state.status === "success" ? (
              <div
                role="status"
                className="rounded-card border border-teal-400/40 bg-teal-100/40 p-5"
              >
                <p className="font-display text-[16px] font-semibold text-teal-600">
                  Mensagem enviada
                </p>
                <p className="mt-1 font-body text-[13.5px] leading-[1.6] text-site-text-mid">
                  Obrigado pelo interesse. Um especialista vai entrar em contato em até 2 dias
                  úteis.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nome" name="fullName" error={fieldErrors.fullName} required />
                <Field
                  label="E-mail corporativo"
                  name="email"
                  type="email"
                  autoComplete="email"
                  error={fieldErrors.email}
                  required
                />
                <Field
                  label="Telefone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  error={fieldErrors.phone}
                />
                <Field
                  label="Instituição / Escola"
                  name="organizationName"
                  error={fieldErrors.organizationName}
                />
                <Field label="Cargo" name="jobTitle" error={fieldErrors.jobTitle} />
                <Field label="Cidade / UF" name="city" error={fieldErrors.city} />

                <div className="md:col-span-2">
                  <Textarea
                    label="Como podemos ajudar?"
                    name="message"
                    error={fieldErrors.message}
                    rows={4}
                  />
                </div>

                {state.status === "error" && state.error ? (
                  <p
                    role="alert"
                    className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-[13px] text-red-700 md:col-span-2"
                  >
                    {state.error}
                  </p>
                ) : null}

                <div className="flex flex-col-reverse items-stretch gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
                  <p className="font-body text-[11.5px] leading-[1.5] text-site-text-light">
                    Ao enviar, você concorda com nossa{" "}
                    <a href="/politica-de-privacidade" className="underline">
                      Política de Privacidade
                    </a>
                    .
                  </p>
                  <SiteButton type="submit" variant="primary" disabled={submitting}>
                    {submitting ? "Enviando…" : submitLabel}
                  </SiteButton>
                </div>
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-[12.5px] font-medium text-site-text-mid">
        {label}
        {required ? <span className="ml-0.5 text-teal-500">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        className="h-11 rounded-btn border border-[#E8E8E8] bg-white px-3.5 font-body text-[14px] text-site-text outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10"
      />
      {error ? (
        <span role="alert" className="font-body text-[11.5px] text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Textarea({
  label,
  name,
  error,
  rows,
}: {
  label: string;
  name: string;
  error?: string;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-[12.5px] font-medium text-site-text-mid">{label}</span>
      <textarea
        name={name}
        rows={rows ?? 4}
        aria-invalid={error ? "true" : undefined}
        className="rounded-btn border border-[#E8E8E8] bg-white px-3.5 py-3 font-body text-[14px] text-site-text outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10"
      />
      {error ? (
        <span role="alert" className="font-body text-[11.5px] text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}
