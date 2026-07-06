import type { Metadata } from "next";
import { Instrument_Serif, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const REB2B_SNIPPET = `!function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("QO92DHLEKRN7");`;

// Display — high-contrast editorial serif. Used only for the largest moments.
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

// Body / UI — humanist grotesque.
const sans = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Data / labels / terminal.
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Comet Compute — Dedicated GPU infrastructure for AI",
    template: "%s — Comet Compute",
  },
  description:
    "Single-tenant NVIDIA clusters, delivered as a managed Kubernetes and Slurm platform or straight bare metal with root. No shared silicon, no metered surprises.",
  openGraph: {
    siteName: "Comet Compute",
    type: "website",
    title: "Comet Compute — Dedicated GPU infrastructure for AI",
    description:
      "Single-tenant NVIDIA clusters, delivered as a managed Kubernetes and Slurm platform or straight bare metal with root. No shared silicon, no metered surprises.",
  },
  icons: {
    icon: "/assets/comet-logo.png",
    apple: "/assets/comet-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: REB2B_SNIPPET }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
