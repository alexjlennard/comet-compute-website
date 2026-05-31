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
      <section className="relative overflow-hidden px-6 pb-20 pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-amber-500/10 blur-[140px]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <nav className="mb-5 flex items-center gap-2 text-sm text-[#9a9384]">
              <Link href="/solutions" className="transition-colors hover:text-amber-200">
                Solutions
              </Link>
              <span>/</span>
              <span className="text-[#cfc8b8]">{solution.group}</span>
            </nav>
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400">
              {solution.eyebrow}
            </p>
            <h1 className="display-lg mt-3 text-balance text-4xl leading-[1.05] sm:text-5xl">
              {solution.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#b8b1a0]">
              {solution.subhead}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-7 py-3.5 text-sm font-semibold text-[#1a1206] transition-all hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
              >
                Talk to our team
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/#infrastructure"
                className="flex items-center justify-center rounded-xl border border-white/10 px-7 py-3.5 text-sm font-medium transition-all hover:border-white/20 hover:bg-white/5"
              >
                View hardware
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/5 bg-black">
            <Image
              src={solution.image}
              alt={solution.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060504]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="px-6 py-8">
        <div className="mx-auto grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-amber-400/10 bg-amber-400/5 sm:grid-cols-3">
          {solution.stats.map((stat) => (
            <div key={stat.label} className="bg-[#0c0a07] p-6 text-center">
              <div className="display-lg text-3xl text-amber-400">{stat.value}</div>
              <div className="mt-1 text-sm text-[#9a9384]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <h2 className="display-lg text-balance text-3xl sm:text-4xl">
              Built for the way you work
            </h2>
            <p className="mt-4 text-lg text-[#9a9384]">
              Every detail of the stack is tuned for {solution.name}.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {solution.capabilities.map((cap, i) => (
              <Reveal
                key={cap.title}
                delay={(i % 2) * 90}
                className="gradient-border rounded-2xl bg-[#100e0a] p-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9a9384]">{cap.description}</p>
              </Reveal>
            ))}
          </div>

          {/* Related hardware */}
          <Reveal className="mt-12 flex flex-col gap-5 rounded-2xl border border-white/5 bg-[#0c0a07] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-amber-400/70">
                Recommended hardware
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {solution.relatedGpus.map((gpu) => (
                  <span
                    key={gpu}
                    className="rounded-full border border-amber-400/10 bg-amber-400/5 px-3 py-1.5 text-sm text-amber-200/80"
                  >
                    {gpu}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/#infrastructure"
              className="flex flex-shrink-0 items-center gap-2 text-sm font-medium text-amber-300 transition-colors hover:text-amber-200"
            >
              Explore all GPUs
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Other solutions */}
      <section className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="display-lg text-2xl">Explore other solutions</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group rounded-2xl border border-white/5 bg-[#100e0a] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/20"
              >
                <p className="text-xs font-medium uppercase tracking-widest text-amber-400/70">
                  {s.group}
                </p>
                <h3 className="mt-2 text-lg font-semibold group-hover:text-amber-200">{s.name}</h3>
                <p className="mt-2 text-sm leading-snug text-[#9a9384]">{s.menuDescription}</p>
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
