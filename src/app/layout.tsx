import type { Metadata, Viewport } from "next";
import {
  Outfit,
  DM_Sans,
  JetBrains_Mono,
  Pacifico,
} from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundFX from "@/components/BackgroundFX";
import SmoothScroll from "@/components/SmoothScroll";
import profile from "@/data/profile.json";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gspagare.github.io/Portfolio";

const siteName = "Gaurav Pagare | Software Engineer — ML Systems & Infrastructure";
const siteDescription =
  "Software Engineer — ML Systems & Infrastructure. Speech AI, distributed training, MLOps. Building systems that put speech AI into production.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Gaurav Pagare",
  },
  description: siteDescription,
  applicationName: "Gaurav Pagare — Portfolio",
  authors: [{ name: "Gaurav Pagare", url: siteUrl }],
  creator: "Gaurav Pagare",
  keywords: [
    "Gaurav Pagare",
    "Software Engineer",
    "ML Engineer",
    "Speech AI",
    "ASR",
    "Distributed Training",
    "MLOps",
    "Deep Learning",
    "Mumbai",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Gaurav Pagare — Portfolio",
    title: siteName,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/profile.png`,
        width: 1024,
        height: 1024,
        alt: "Gaurav Pagare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [`${siteUrl}/profile.png`],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo/7.png",
    apple: "/logo/7.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gaurav Pagare",
  url: siteUrl,
  image: `${siteUrl}/profile.png`,
  jobTitle: "Software Engineer — ML Systems & Infrastructure",
  email: profile.email,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [profile.socials.github, profile.socials.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${pacifico.variable}`}
    >
      <body>
        <a
          href="#front"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--bg-primary)] focus:text-[var(--text-primary)] focus:border focus:border-[var(--accent-primary)] focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll />
        <ThemeProvider>
          <BackgroundFX />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
