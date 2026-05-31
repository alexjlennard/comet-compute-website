import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { solutions, getSolution } from "@/lib/solutions";

export default function Solutions() {
  // Feature three solutions on the homepage; full set lives on /solutions.
  const featured = ["model-training", "ai-inference", "fine-tuning"]
    .map((slug) => getSolution(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const healthcare = getSolution("healthcare");

  return (
    <section id="solutions" className="relative py-32 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-rose-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-center text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-400">Solutions</p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Tailored for your workload
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#9a9384]">
            Whether you&apos;re training frontier models or serving millions of inference requests, we build the cluster to match.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {featured.map((solution, i) => (
            <Reveal key={solution.slug} delay={i * 100}>
              <Link
                href={`/solutions/${solution.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#100e0a] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/20"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex flex-1 flex-col">
                  <h3 className="text-xl font-semibold group-hover:text-amber-200">{solution.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#9a9384]">
                    {solution.subhead}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {solution.relatedGpus.map((gpu) => (
                      <span
                        key={gpu}
                        className="rounded-full border border-amber-400/10 bg-amber-400/5 px-3 py-1 text-xs text-amber-200/70"
                      >
                        {gpu}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-amber-300">
                    Learn more
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Healthcare spotlight */}
        {healthcare && (
          <Reveal className="mt-12 grid items-center gap-10 overflow-hidden rounded-3xl border border-white/5 bg-[#100e0a] lg:grid-cols-2">
            <div className="relative h-64 w-full overflow-hidden lg:h-full lg:min-h-[380px]">
              <Image
                src={healthcare.image}
                alt="Clinician reviewing AI-assisted medical imaging"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#100e0a]/80 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#100e0a]" />
            </div>
            <div className="p-8 lg:py-12 lg:pr-12">
              <p className="text-sm font-medium uppercase tracking-widest text-rose-400/80">Starting with healthcare</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Private AI compute for clinical environments
              </h3>
              <p className="mt-4 text-[#9a9384]">
                We partner with healthcare organizations to deliver HIPAA-compliant GPU infrastructure
                for medical imaging, oncology research, and clinical decision support — backed by the
                NVIDIA Clara stack and reaching a network of over 50,000 clinics and medical offices.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "HIPAA-compliant, single-tenant deployments",
                  "Business Associate Agreements available",
                  "Optimized for NVIDIA Clara medical imaging",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#cfc8b8]">
                    <svg className="h-5 w-5 flex-shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/solutions/healthcare"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-amber-300 transition-colors hover:text-amber-200"
              >
                Explore healthcare solutions
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </Reveal>
        )}

        <Reveal className="mt-12 text-center">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-7 py-3.5 text-sm font-medium transition-all hover:border-amber-400/30 hover:bg-white/5"
          >
            View all solutions
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
