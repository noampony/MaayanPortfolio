import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@/lib/content/loaders";
import { sansFont, monoFont } from "./fonts";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { ResumeViewerProvider } from "@/components/providers/ResumeViewerProvider";
import { FloatingCard } from "@/components/business-card/FloatingCard";
import { StructuredData } from "@/components/seo/StructuredData";
import { homepageUrl, siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  // Resolves the file-convention OG/Twitter images (app/opengraph-image.png,
  // app/twitter-image.png) to absolute URLs so link unfurlers (WhatsApp,
  // Notion, Slack, etc.) can fetch them.
  metadataBase: new URL(siteUrl),
  title: "Shani Penkar | Lead Full Stack Developer",
  description:
    "Shani Penkar is a Lead Full Stack Developer building web applications with Node.js, Next.js, React, TypeScript, and MSSQL, and managing the full development lifecycle.",
  openGraph: {
    title: "Shani Penkar | Lead Full Stack Developer",
    description:
      "Shani Penkar is a Lead Full Stack Developer building web applications with Node.js, Next.js, React, TypeScript, and MSSQL, and managing the full development lifecycle.",
    type: "website",
    url: homepageUrl,
    siteName: "Shani Penkar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shani Penkar | Lead Full Stack Developer",
    description:
      "Shani Penkar is a Lead Full Stack Developer building web applications with Node.js, Next.js, React, TypeScript, and MSSQL, and managing the full development lifecycle.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable}`}>
      <body className="flex min-h-screen flex-col">
        <StructuredData />
        {/* First focusable element: lets keyboard users bypass the header (spec §20.6). */}
        <SkipLink />
        <ResumeViewerProvider>
          <Navbar />
          <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <ScrollToTopButton />
          <FloatingCard />
        </ResumeViewerProvider>
        <Analytics />
      </body>
    </html>
  );
}
