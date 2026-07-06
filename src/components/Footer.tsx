import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    title: "Platform",
    links: [
      { name: "Dedicated servers", href: "/#platform" },
      { name: "GPU hardware", href: "/#infrastructure" },
      { name: "Managed stack", href: "/#managed" },
      { name: "Solutions", href: "/solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/#why" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "/#contact" },
      { name: "Blog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Security", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--rule)] px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-10">
            <Link href="/" className="flex items-center" aria-label="Comet Compute home">
              <Image
                src="/assets/comet-compute-logo.svg"
                alt="Comet Compute"
                width={150}
                height={38}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-dim">
              Dedicated GPU infrastructure for teams who&apos;d rather own the
              machine than rent a slice of one.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="label">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      className="link-grow text-sm text-fg-dim transition-colors hover:text-fg"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[color:var(--rule)] pt-8 sm:flex-row sm:items-center">
          <p className="mono text-xs text-fg-faint">
            © {new Date().getFullYear()} Comet Compute, Inc.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-fg-faint transition-colors hover:text-fg" aria-label="LinkedIn">
              <span className="mono text-xs uppercase tracking-[0.14em]">LinkedIn</span>
            </Link>
            <Link href="#" className="text-fg-faint transition-colors hover:text-fg" aria-label="X">
              <span className="mono text-xs uppercase tracking-[0.14em]">X / Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
