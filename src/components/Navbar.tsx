"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { solutionsByGroup } from "@/lib/solutions";

const navigation = [
  { name: "Platform", href: "/#platform" },
  { name: "Managed", href: "/#managed" },
  { name: "Infrastructure", href: "/#infrastructure" },
  { name: "About", href: "/#about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const groups = solutionsByGroup();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || solutionsOpen
          ? "border-b border-amber-400/10 bg-[#060504]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Comet Compute home"
          onClick={() => {
            // If already on the homepage, navigating to "/" won't reset scroll, so do it manually.
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
            className="h-9 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {/* Solutions mega-menu */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <Link
              href="/solutions"
              className={`flex items-center gap-1 text-sm transition-colors ${
                solutionsOpen ? "text-white" : "text-[#9a9384] hover:text-white"
              }`}
            >
              Solutions
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {/* Dropdown panel */}
            <div
              className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-200 ${
                solutionsOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0"
              }`}
            >
              <div className="w-[640px] overflow-hidden rounded-2xl border border-amber-400/10 bg-[#0c0a07] shadow-2xl shadow-black/50">
                <div className="grid grid-cols-2 gap-px bg-white/5">
                  {(["Use Case", "Industry"] as const).map((groupName) => (
                    <div key={groupName} className="bg-[#0c0a07] p-5">
                      <p className="mb-3 px-3 text-xs font-medium uppercase tracking-widest text-amber-400/70">
                        By {groupName}
                      </p>
                      <ul className="space-y-1">
                        {groups[groupName].map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/solutions/${s.slug}`}
                              className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                            >
                              <div className="text-sm font-medium text-white group-hover:text-amber-200">
                                {s.name}
                              </div>
                              <div className="mt-0.5 text-xs leading-snug text-[#9a9384]">
                                {s.menuDescription}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link
                  href="/solutions"
                  className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-6 py-3.5 text-sm text-[#cfc8b8] transition-colors hover:bg-white/5 hover:text-white"
                >
                  View all solutions
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-[#9a9384] transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/#contact"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm transition-all hover:border-white/20 hover:bg-white/5"
          >
            Contact Sales
          </Link>
          <Link
            href="/#contact"
            className="rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-sm font-semibold text-[#1a1206] transition-all hover:from-amber-300 hover:to-amber-400"
          >
            Get Started
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-white/5 bg-[#060504]/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-6 py-4">
            {/* Mobile solutions accordion */}
            <button
              className="flex w-full items-center justify-between py-2 text-sm text-[#cfc8b8]"
              onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
            >
              Solutions
              <svg
                className={`h-4 w-4 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileSolutionsOpen && (
              <div className="space-y-3 border-l border-white/10 pb-2 pl-3">
                {(["Use Case", "Industry"] as const).map((groupName) => (
                  <div key={groupName}>
                    <p className="py-1 text-xs font-medium uppercase tracking-widest text-amber-400/70">
                      By {groupName}
                    </p>
                    {groups[groupName].map((s) => (
                      <Link
                        key={s.slug}
                        href={`/solutions/${s.slug}`}
                        className="block py-1.5 text-sm text-[#9a9384] transition-colors hover:text-white"
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
                className="block py-2 text-sm text-[#9a9384] transition-colors hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Link
                href="/#contact"
                className="rounded-lg border border-white/10 px-4 py-2 text-center text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Contact Sales
              </Link>
              <Link
                href="/#contact"
                className="rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-center text-sm font-semibold text-[#1a1206]"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
