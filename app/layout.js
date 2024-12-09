import { Inter } from "next/font/google";
import "./globals.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import DisableContextMenu from "../components/disableMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevoSponsor",
  description: "DevoSponsor is a platform that connects developers with sponsors.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <body className={`${inter.className} flex  flex-col min-h-screen`}>
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
