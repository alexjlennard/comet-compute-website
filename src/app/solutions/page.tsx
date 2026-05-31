import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { solutionsByGroup } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Solutions | Comet Compute",
  description:
    "Dedicated GPU infrastructure tailored to your workload — from model training and inference to healthcare, enterprise, and startups.",
};

export default function SolutionsIndex() {
  const groups = solutionsByGroup();

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-16 pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-amber-500/10 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-400">Solutions</p>
          <h1 className="display-lg mt-3 text-balance text-4xl leading-[1.05] sm:text-5xl">
            Infrastructure tailored to your workload
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#b8b1a0]">
            Whether you&apos;re training frontier models, serving inference at scale, or running
            clinical AI, we build the dedicated cluster to match.
          </p>
        </div>
      </section>

      {(["Use Case", "Industry"] as const).map((groupName) => (
        <section key={groupName} className="px-6 py-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="text-sm font-medium uppercase tracking-widest text-amber-400/70">
                By {groupName}
              </h2>
            </Reveal>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groups[groupName].map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 90}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#100e0a] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/20"
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-black">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#100e0a] to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold group-hover:text-amber-200">{s.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9a9384]">
                        {s.menuDescription}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-amber-300">
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
          </div>
        </section>
      ))}

      <div className="mt-12">
        <CTA />
      </div>
      <Footer />
    </>
  );
}
