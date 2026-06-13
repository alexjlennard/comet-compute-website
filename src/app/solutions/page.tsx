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

      <section className="relative border-b border-[color:var(--rule)] px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-[88rem]">
          <span className="label text-gold">Solutions</span>
          <h1 className="serif mt-8 max-w-4xl text-[3rem] leading-[0.95] sm:text-7xl">
            Infrastructure tailored
            <br />
            to your <span className="serif-italic text-gold">workload.</span>
          </h1>
          <p className="measure mt-8 text-lg leading-relaxed text-fg-dim">
            Training frontier models, serving inference at scale, or running
            clinical AI — we build the dedicated cluster to match.
          </p>
        </div>
      </section>

      {(["Use Case", "Industry"] as const).map((groupName) => (
        <section key={groupName} className="border-b border-[color:var(--rule)] px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-[88rem]">
            <div className="flex items-baseline gap-4 border-b border-[color:var(--rule)] pb-4">
              <span className="label">By {groupName}</span>
            </div>
            <div className="mt-10 grid gap-px border border-[color:var(--rule)] bg-[color:var(--rule)] md:grid-cols-2 lg:grid-cols-3">
              {groups[groupName].map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 80}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="group flex h-full flex-col bg-ink transition-colors hover:bg-ink-raised"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-black">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        className="object-cover opacity-80 grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                      <span className="mono absolute left-4 top-4 text-xs text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="serif text-2xl text-fg transition-colors group-hover:text-gold-bright">
                        {s.name}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-dim">
                        {s.menuDescription}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold">
                        Read more
                        <span className="mono transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTA />
      <Footer />
    </>
  );
}
