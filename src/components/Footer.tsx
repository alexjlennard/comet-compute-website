import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center" aria-label="Comet Compute home">
              <Image
                src="/assets/comet-compute-logo.svg"
                alt="Comet Compute"
                width={150}
                height={38}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#9a9384]">
              Dedicated GPU infrastructure for companies building AI at scale.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/#platform" className="text-sm text-[#9a9384] hover:text-white transition-colors">Dedicated Servers</Link></li>
              <li><Link href="/#infrastructure" className="text-sm text-[#9a9384] hover:text-white transition-colors">GPU Hardware</Link></li>
              <li><Link href="/solutions" className="text-sm text-[#9a9384] hover:text-white transition-colors">Solutions</Link></li>
              <li><Link href="#" className="text-sm text-[#9a9384] hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/#about" className="text-sm text-[#9a9384] hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="text-sm text-[#9a9384] hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/#contact" className="text-sm text-[#9a9384] hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-sm text-[#9a9384] hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="#" className="text-sm text-[#9a9384] hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-[#9a9384] hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-[#9a9384] hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-[#9a9384]">
            &copy; {new Date().getFullYear()} Comet Compute, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-[#9a9384] transition-colors hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
            <Link href="#" className="text-[#9a9384] transition-colors hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
