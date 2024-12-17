import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import DisableContextMenu from "../components/disableMenu";

const inter = Inter({ subsets: ["latin"] });

// Metadata for SEO
export const metadata = {
  title: "DevoSponsor - Connect Developers with Sponsors",
  description: "DevoSponsor is a platform that connects developers with sponsors, enabling opportunities for growth and innovation.",
  keywords: "DevoSponsor, developer sponsorship, sponsor developers, developer funding, platform for developers",
  openGraph: {
    title: "DevoSponsor - Connect Developers with Sponsors",
    description: "DevoSponsor helps developers connect with sponsors to fund and support their projects.",
    url: "https://devosponsor.live",
    siteName: "DevoSponsor",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevoSponsor Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevoSponsor - Connect Developers with Sponsors",
    description: "A platform that connects developers with sponsors for project funding and support.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        {/* Canonical Link */}
        <link rel="canonical" href="https://devosponsor.live" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <DisableContextMenu />
        <SpeedInsights />
        <Analytics />
        <Navbar />
        <div className="flex-grow min-h-screen mt-16 text-white bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
