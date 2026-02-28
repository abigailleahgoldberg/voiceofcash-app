import type { Metadata } from "next";
import "./globals.css";

const BASE = "https://thevoiceofcash.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "The Voice of Cash | AI Implementation Partner — Las Vegas",
    template: "%s | The Voice of Cash",
  },
  description: "Las Vegas AI implementation partner. We design, build, and deploy custom AI agents and automation systems that actually work — then stay to make sure they keep working.",
  keywords: ["AI implementation Las Vegas", "AI automation Las Vegas", "AI agents Las Vegas", "business automation Nevada", "Cash Colligan", "AI consultant Las Vegas", "autonomous business systems", "workflow automation Las Vegas"],
  authors: [{ name: "Cash Colligan", url: BASE }],
  creator: "Cash Colligan",
  publisher: "The Voice of Cash",
  openGraph: {
    title: "The Voice of Cash | AI Implementation Partner — Las Vegas",
    description: "We build real AI systems for Las Vegas businesses — agents, automations, and revenue systems that run without you. Book a free consultation.",
    url: BASE,
    siteName: "The Voice of Cash",
    type: "website",
    locale: "en_US",
    images: [{ url: "https://thevoiceofcash.com/og-image.png", width: 1200, height: 630, alt: "The Voice of Cash — AI Implementation Partner Las Vegas" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@thevoiceofcash",
    creator: "@thevoiceofcash",
    title: "The Voice of Cash | AI That Actually Works — Las Vegas",
    description: "Real AI agents. Real automation. Real results — for Las Vegas businesses ready to stop guessing and start scaling.",
    images: ["https://thevoiceofcash.com/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: BASE },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
