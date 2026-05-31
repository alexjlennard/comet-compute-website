"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function CTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/8 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to leave the cloud behind?
            </h2>
            <p className="mt-4 max-w-xl text-lg text-[#9a9384]">
              Talk to our team about dedicated GPU infrastructure tailored to your AI
              workloads. We&apos;ll scope your requirements and build the cluster to match.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Custom-scoped cluster proposal",
                "Transparent, fixed monthly pricing",
                "Dedicated solutions engineer",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#cfc8b8]">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-amber-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="gradient-border rounded-2xl bg-[#100e0a] p-8">
              {submitted ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/10 text-amber-400">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">Thanks — we&apos;ll be in touch</h3>
                  <p className="mt-2 text-sm text-[#9a9384]">
                    Our team will reach out within one business day to scope your workload.
                  </p>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <h3 className="text-lg font-semibold">Request a cluster proposal</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Name" name="name" placeholder="Jane Doe" required />
                    <Field label="Company" name="company" placeholder="Acme AI" required />
                  </div>
                  <Field label="Work email" name="email" type="email" placeholder="jane@acme.ai" required />
                  <div>
                    <label className="mb-1.5 block text-sm text-[#cfc8b8]">GPU requirement</label>
                    <select
                      name="gpus"
                      className="w-full rounded-lg border border-white/10 bg-[#060504] px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-amber-400/40"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>Select an estimate</option>
                      <option>8–32 GPUs</option>
                      <option>32–128 GPUs</option>
                      <option>128–512 GPUs</option>
                      <option>512+ GPUs</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm text-[#cfc8b8]">What are you building?</label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Briefly describe your workload…"
                      className="w-full resize-none rounded-lg border border-white/10 bg-[#060504] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-[#5f594d] focus:border-amber-400/40"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-semibold text-[#1a1206] transition-all hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
                  >
                    Request Proposal
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <p className="text-center text-xs text-[#9a9384]">
                    No commitment required. We&apos;ll respond within one business day.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-[#cfc8b8]">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-[#060504] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-[#5f594d] focus:border-amber-400/40"
      />
    </div>
  );
}
