import Reveal from "./Reveal";

export default function Certifications() {
  const certs = [
    { label: "SOC 2 Type II", desc: "Audited security controls" },
    { label: "HIPAA", desc: "Healthcare-ready · BAA available" },
    { label: "ISO 27001", desc: "Information security management" },
    { label: "99.9% SLA", desc: "Contractual uptime guarantee" },
  ];

  return (
    <section className="border-t border-[color:var(--rule)] px-6 py-16 lg:px-10">
      <Reveal className="mx-auto grid max-w-[88rem] gap-px border-x border-[color:var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
        {certs.map((c, i) => (
          <div
            key={c.label}
            className={`border-y border-[color:var(--rule)] px-6 py-6 ${
              i !== 0 ? "sm:border-l" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <div className="mono text-sm tracking-[0.08em] text-gold">{c.label}</div>
            <div className="mt-2 text-xs text-fg-dim">{c.desc}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
