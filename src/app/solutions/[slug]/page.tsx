import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { solutions, getSolution } from "@/lib/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return { title: "Solution not found | Comet Compute" };
  return {
    title: `${solution.name} | Comet Compute`,
    description: solution.seo,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const others = solutions.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative border-b border-[color:var(--rule)] px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto grid max-w-[88rem] items-center gap-x-14 gap-y-12 lg:grid-cols-2">
          <div>
            <nav className="mb-6 flex items-center gap-2 text-sm text-fg-faint">
              <Link href="/solutions" className="link-grow transition-colors hover:text-fg">
                Solutions
              </Link>
              <span className="mono">/</span>
              <span className="text-fg-dim">{solution.group}</span>
            </nav>
            <span className="label text-gold">{solution.eyebrow}</span>
            <h1 className="serif mt-6 text-balance text-[2.75rem] leading-[0.95] sm:text-6xl">
              {solution.headline}
            </h1>
            <p className="measure mt-6 text-lg leading-relaxed text-fg-dim">
              {solution.subhead}
            </p>
            <div className="mt-10 flex flex-col gap-x-8 gap-y-4 sm:flex-row sm:items-center">
              <Link
                href="/#contact"
                className="group inline-flex items-center justify-center gap-2.5 bg-gold px-7 py-3.5 text-sm font-semibold text-[#0a0805] transition-colors hover:bg-gold-bright"
              >
                Talk to our team
                <span className="mono transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/#infrastructure"
                className="link-grow inline-flex items-center gap-2 self-start text-sm text-fg-dim transition-colors hover:text-fg sm:self-auto"
              >
                <span className="mono text-gold">$</span> view hardware
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[color:var(--rule-strong)] bg-black">
            <Image
              src={solution.image}
              alt={solution.name}
              fill
              priority
              className="object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-[color:var(--rule)] px-6 lg:px-10">
        <div className="mx-auto grid max-w-[88rem] sm:grid-cols-3">
          {solution.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 ${i !== 0 ? "sm:border-l sm:border-[color:var(--rule)] sm:pl-8" : ""}`}
            >
              <div className="serif text-4xl text-gold sm:text-5xl">{stat.value}</div>
              <div className="mono mt-2 text-xs uppercase tracking-[0.12em] text-fg-faint">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[88rem]">
          <Reveal>
            <div className="flex items-baseline gap-4 border-b border-[color:var(--rule)] pb-4">
              <span className="label">Capabilities</span>
            </div>
            <h2 className="serif mt-8 max-w-2xl text-balance text-4xl sm:text-5xl">
              Built for the way you work
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px border-t border-[color:var(--rule)] sm:grid-cols-2">
            {solution.capabilities.map((cap, i) => (
              <Reveal
                key={cap.title}
                delay={(i % 2) * 80}
                className={`p-8 lg:p-10 ${
                  i % 2 !== 0 ? "sm:border-l sm:border-[color:var(--rule)]" : ""
                } ${i >= 2 ? "border-t border-[color:var(--rule)]" : ""}`}
              >
                <span className="mono text-xs text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif mt-5 text-2xl text-fg">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-dim">{cap.description}</p>
              </Reveal>
            ))}
          </div>

          {/* Related hardware */}
          <Reveal className="mt-px flex flex-col gap-5 border border-[color:var(--rule-strong)] p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <div>
              <span className="label">Recommended hardware</span>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                {solution.relatedGpus.map((gpu) => (
                  <span key={gpu} className="mono text-sm text-gold">
                    {gpu.replace("NVIDIA ", "")}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/#infrastructure"
              className="link-grow inline-flex flex-shrink-0 items-center gap-2 text-sm text-gold"
            >
              All GPUs
              <span className="mono">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Other solutions */}
      <section className="border-t border-[color:var(--rule)] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[88rem]">
          <h2 className="serif text-3xl">Other solutions</h2>
          <div className="mt-10 grid gap-px border-t border-[color:var(--rule)] lg:grid-cols-3">
            {others.map((s, i) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className={`group p-8 transition-colors hover:bg-ink-raised ${
                  i !== 0 ? "border-t border-[color:var(--rule)] lg:border-l lg:border-t-0" : ""
                }`}
              >
                <span className="label text-gold">{s.group}</span>
                <h3 className="serif mt-3 text-2xl text-fg transition-colors group-hover:text-gold-bright">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm leading-snug text-fg-dim">{s.menuDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </>
  );
}
