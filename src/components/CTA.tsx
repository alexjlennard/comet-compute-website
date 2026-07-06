"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions";
import Reveal from "./Reveal";

const initialState: ContactState = { status: "idle" };

export default function CTA() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState
  );

  return (
    <section id="contact" className="relative border-t border-[color:var(--rule)] px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid items-start gap-x-16 gap-y-14 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-baseline gap-4 border-b border-[color:var(--rule)] pb-4">
              <span className="mono text-sm text-gold">08</span>
              <span className="label">Get started</span>
            </div>
            <h2 className="serif mt-10 text-5xl leading-[0.95] sm:text-7xl">
              Done sharing
              <br />
              <span className="serif-italic text-gold">someone else&apos;s</span>
              <br />
              GPUs?
            </h2>
            <p className="measure mt-8 text-lg leading-relaxed text-fg-dim">
              Tell us what you&apos;re building. We&apos;ll scope the cluster, quote a
              fixed monthly number, and commit to a commissioning date in
              writing. Dedicated capacity takes a quarter or more to stand up —
              the difference with us is you&apos;ll know exactly when yours arrives.
            </p>
            <ul className="mt-10 space-y-3 border-t border-[color:var(--rule)] pt-6">
              {[
                "A cluster proposal scoped to your workload",
                "One fixed monthly price — no egress, no metering",
                "A direct line to the engineers who racked it",
              ].map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-sm text-fg-dim">
                  <span className="mono text-gold">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-[color:var(--rule-strong)] bg-ink-raised/40 p-8 lg:p-10">
              {state.status === "success" ? (
                <div className="flex min-h-[400px] flex-col items-start justify-center">
                  <span className="mono text-gold">→ received</span>
                  <h3 className="serif mt-4 text-3xl text-fg">
                    We&apos;ll be in touch.
                  </h3>
                  <p className="mt-3 text-sm text-fg-dim">
                    A solutions engineer reaches out within one business day to
                    scope your workload.
                  </p>
                </div>
              ) : (
                <form className="space-y-5" action={formAction}>
                  <p className="label">Request a proposal</p>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <div className="grid grid-cols-2 gap-5">
                    <Field label="Name" name="name" placeholder="Jane Doe" required />
                    <Field label="Company" name="company" placeholder="Acme AI" required />
                  </div>
                  <Field label="Work email" name="email" type="email" placeholder="jane@acme.ai" required />
                  <div>
                    <label className="label mb-2 block">GPU footprint</label>
                    <select
                      name="gpus"
                      className="w-full border border-[color:var(--rule-strong)] bg-ink px-3.5 py-3 text-sm text-fg outline-none transition-colors focus:border-gold"
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
                    <label className="label mb-2 block">What are you building?</label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Briefly — model, scale, timeline…"
                      className="w-full resize-none border border-[color:var(--rule-strong)] bg-ink px-3.5 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={pending}
                    className="group flex w-full items-center justify-center gap-2.5 bg-gold px-6 py-3.5 text-sm font-semibold text-[#0a0805] transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {pending ? "Sending…" : "Send it"}
                    <span className="mono transition-transform group-hover:translate-x-1">→</span>
                  </button>
                  {state.status === "error" && (
                    <p aria-live="polite" className="text-center text-xs text-red-400">
                      {state.message}
                    </p>
                  )}
                  <p className="mono text-center text-xs text-fg-faint">
                    No commitment. Reply within one business day.
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
      <label className="label mb-2 block">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full border border-[color:var(--rule-strong)] bg-ink px-3.5 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-gold"
      />
    </div>
  );
}
