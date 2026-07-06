import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { getSolution } from "@/lib/solutions";

export default function Solutions() {
  const featured = ["model-training", "ai-inference", "fine-tuning"]
    .map((slug) => getSolution(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const healthcare = getSolution("healthcare");

  return (
    <section
      id="solutions"
      className="relative border-t border-[color:var(--rule)] px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[88rem]">
        <SectionHeader
          index="03"
          kicker="Solutions"
          title={
            <>
              Built to fit
              <br />
              <span className="serif-italic text-gold">your</span> workload.
            </>
          }
          lede="Training a frontier model or serving millions of inference requests: the cluster gets built to match, not the other way around."
        />

        <div className="mt-20 grid gap-px border border-[color:var(--rule)] bg-[color:var(--rule)] lg:grid-cols-3">
          {featured.map((solution, i) => (
            <Reveal key={solution.slug} delay={i * 90}>
              <Link
                href={`/solutions/${solution.slug}`}
                className="group flex h-full flex-col bg-ink transition-colors hover:bg-ink-raised"
              >
                <div className="relative h-48 w-full overflow-hidden bg-black">
                  <Image
                    src={solution.image}
                    alt={solution.name}
                    fill
                    className="object-cover opacity-80 grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <span className="mono absolute left-4 top-4 text-xs text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="serif text-2xl text-fg transition-colors group-hover:text-gold-bright">
                    {solution.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-dim">
                    {solution.subhead}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
                    {solution.relatedGpus.map((gpu) => (
                      <span key={gpu} className="mono text-[11px] text-fg-faint">
                        {gpu.replace("NVIDIA ", "")}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold">
                    Read more
                    <span className="mono transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Healthcare spotlight - wide editorial split */}
        {healthcare && (
          <Reveal className="mt-px grid border-x border-b border-[color:var(--rule)] lg:grid-cols-2">
            <div className="relative h-72 w-full overflow-hidden lg:h-auto lg:min-h-[420px]">
              <Image
                src={healthcare.image}
                alt="Clinician reviewing AI-assisted medical imaging"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/90 lg:bg-gradient-to-l lg:from-transparent lg:to-ink" />
            </div>
            <div className="p-10 lg:p-16">
              <span className="label text-gold">Starting with healthcare</span>
              <h3 className="serif mt-5 text-3xl text-fg sm:text-4xl">
                Private AI compute for clinical environments
              </h3>
              <p className="mt-5 leading-relaxed text-fg-dim">
                HIPAA-compliant, single-tenant GPU infrastructure for medical
                imaging, oncology research, and clinical decision support,
                backed by the NVIDIA Clara stack, reaching a network of 50,000+
                clinics and medical offices.
              </p>
              <ul className="mt-8 space-y-3 border-t border-[color:var(--rule)] pt-6">
                {[
                  "HIPAA-compliant, single-tenant deployments",
                  "Business Associate Agreements signed up front",
                  "Tuned for NVIDIA Clara medical imaging",
                ].map((item) => (
                  <li key={item} className="flex items-baseline gap-3 text-sm text-fg-dim">
                    <span className="mono text-gold">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/solutions/healthcare"
                className="link-grow mt-8 inline-flex items-center gap-2 text-sm text-gold"
              >
                Explore healthcare
                <span className="mono">→</span>
              </Link>
            </div>
          </Reveal>
        )}

        <Reveal className="mt-12">
          <Link
            href="/solutions"
            className="link-grow inline-flex items-center gap-2 text-sm text-fg-dim transition-colors hover:text-fg"
          >
            <span className="mono text-gold">$</span> view all solutions
            <span className="mono">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
