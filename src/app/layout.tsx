import type { Metadata } from "next";
import { Instrument_Serif, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Comet Compute — Dedicated GPU infrastructure for AI",
  description:
    "Single-tenant NVIDIA clusters. No noisy neighbors, no metered surprises, no procurement theater. Managed Kubernetes and Slurm, tuned before you log in.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
