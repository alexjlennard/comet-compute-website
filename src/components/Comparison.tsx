import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Comparison() {
  const rows = [
    { feature: "Tenancy", comet: "Fully dedicated hardware", others: "Shared, multi-tenant" },
    { feature: "Deployment", comet: "Managed stack or bare metal, your call", others: "One model fits all" },
    { feature: "Pricing", comet: "One fixed monthly number", others: "Metered billing maze" },
    { feature: "Capacity", comet: "Guaranteed, reserved", others: "Waitlists & spot evictions" },
    { feature: "Support", comet: "A named engineer", others: "A ticket queue" },
    { feature: "Egress", comet: "Included", others: "Per-GB tax" },
  ];

  return (
    <section id="why" className="relative border-t border-[color:var(--rule)] px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[72rem]">
        <SectionHeader
          index="06"
          kicker="Why Comet"
          title={
            <>
              Not another
              <br />
              <span className="serif-italic text-gold">hyperscaler.</span>
            </>
          }
          lede="You shouldn't have to fight a neighbor for bandwidth, decode a billing console, or hold your place in a capacity queue just to train a model."
        />

        <Reveal className="mt-20 border border-[color:var(--rule-strong)]">
          {/* header */}
          <div className="grid grid-cols-12 border-b border-[color:var(--rule)] bg-ink-raised/40">
            <div className="col-span-4 px-6 py-4 sm:col-span-4" />
            <div className="col-span-4 border-l border-[color:var(--rule)] px-6 py-4">
              <span className="label text-gold">Comet Compute</span>
            </div>
            <div className="col-span-4 border-l border-[color:var(--rule)] px-6 py-4">
              <span className="label">The big clouds</span>
            </div>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-12 ${
                i !== rows.length - 1 ? "border-b border-[color:var(--rule)]" : ""
              }`}
            >
              <div className="col-span-4 px-6 py-5">
                <span className="mono text-xs text-fg-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-1 text-sm text-fg-dim">{row.feature}</div>
              </div>
              <div className="col-span-4 flex items-center gap-2 border-l border-[color:var(--rule)] bg-gold/[0.025] px-6 py-5">
                <span className="mono text-gold">→</span>
                <span className="text-sm text-fg">{row.comet}</span>
              </div>
              <div className="col-span-4 flex items-center gap-2 border-l border-[color:var(--rule)] px-6 py-5">
                <span className="mono text-fg-faint">×</span>
                <span className="text-sm text-fg-faint line-through decoration-fg-faint/40">
                  {row.others}
                </span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
