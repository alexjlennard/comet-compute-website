"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { solutionsByGroup } from "@/lib/solutions";

const navigation = [
  { name: "Platform", href: "/#platform" },
  { name: "Hardware", href: "/#infrastructure" },
  { name: "Managed", href: "/#managed" },
  { name: "Why Comet", href: "/#why" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const groups = solutionsByGroup();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || solutionsOpen
          ? "border-b border-[color:var(--rule)] bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[88rem] items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Comet Compute home"
          onClick={() => {
            if (window.location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Image
            src="/assets/comet-compute-logo.svg"
            alt="Comet Compute"
            width={140}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {/* Solutions menu */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <Link
              href="/solutions"
              className={`mono text-xs uppercase tracking-[0.12em] transition-colors ${
                solutionsOpen ? "text-fg" : "text-fg-dim hover:text-fg"
              }`}
            >
              Solutions
            </Link>

            <div
              className={`absolute left-1/2 top-full -translate-x-1/2 pt-5 transition-all duration-200 ${
                solutionsOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0"
              }`}
            >
              <div className="w-[600px] border border-[color:var(--rule-strong)] bg-ink-raised shadow-2xl shadow-black/60">
                <div className="grid grid-cols-2">
                  {(["Use Case", "Industry"] as const).map((groupName, gi) => (
                    <div
                      key={groupName}
                      className={`p-6 ${gi === 0 ? "border-r border-[color:var(--rule)]" : ""}`}
                    >
                      <p className="label mb-4">{groupName}</p>
                      <ul className="space-y-4">
                        {groups[groupName].map((s, i) => (
                          <li key={s.slug}>
                            <Link
                              href={`/solutions/${s.slug}`}
                              className="group flex gap-3"
                            >
                              <span className="mono text-xs text-gold/70">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span>
                                <span className="block text-sm text-fg transition-colors group-hover:text-gold-bright">
                                  {s.name}
                                </span>
                                <span className="mt-0.5 block text-xs leading-snug text-fg-faint">
                                  {s.menuDescription}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link
                  href="/solutions"
                  className="flex items-center justify-between border-t border-[color:var(--rule)] px-6 py-4 text-sm text-fg-dim transition-colors hover:text-fg"
                >
                  All solutions
                  <span className="mono text-gold">→</span>
                </Link>
              </div>
            </div>
          </div>

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="mono text-xs uppercase tracking-[0.12em] text-fg-dim transition-colors hover:text-fg"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/#contact"
            className="text-sm text-fg-dim transition-colors hover:text-fg"
          >
            Contact
          </Link>
          <Link
            href="/#contact"
            className="bg-gold px-4 py-2 text-sm font-semibold text-[#0a0805] transition-colors hover:bg-gold-bright"
          >
            Spec a cluster
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="mono text-sm text-fg">{mobileOpen ? "✕" : "☰"}</span>
        </button>
      </nav>

      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-[color:var(--rule)] bg-ink/97 backdrop-blur-md md:hidden">
          <div className="space-y-1 px-6 py-5">
            <button
              className="flex w-full items-center justify-between py-2 text-sm text-fg"
              onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
            >
              Solutions
              <span className="mono text-gold">{mobileSolutionsOpen ? "−" : "+"}</span>
            </button>
            {mobileSolutionsOpen && (
              <div className="space-y-3 border-l border-[color:var(--rule)] pb-2 pl-4">
                {(["Use Case", "Industry"] as const).map((groupName) => (
                  <div key={groupName}>
                    <p className="label py-1">{groupName}</p>
                    {groups[groupName].map((s) => (
                      <Link
                        key={s.slug}
                        href={`/solutions/${s.slug}`}
                        className="block py-1.5 text-sm text-fg-dim transition-colors hover:text-fg"
                        onClick={() => setMobileOpen(false)}
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-sm text-fg-dim transition-colors hover:text-fg"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Link
                href="/#contact"
                className="border border-[color:var(--rule-strong)] px-4 py-2.5 text-center text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/#contact"
                className="bg-gold px-4 py-2.5 text-center text-sm font-semibold text-[#0a0805]"
                onClick={() => setMobileOpen(false)}
              >
                Spec a cluster
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
