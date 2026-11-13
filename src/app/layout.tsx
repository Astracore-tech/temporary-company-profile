import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { SITE, absoluteUrl } from "@/utils/site";
import {
  jsonLdGraph,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  serviceCatalogSchema,
} from "@/utils/structuredData";

// next/font downloads the font at build time and serves it from this site,
// so visitors' browsers never contact Google.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  // Makes every relative canonical / OG URL below resolve to an absolute one.
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  generator: "Next.js",
  keywords: [
    "software development Kenya",
    "IT company Nairobi",
    "business website Kenya",
    "customer portal development",
    "custom business systems Kenya",
    "M-Pesa integration",
    "M-Pesa STK Push integration",
    "workflow automation Kenya",
    "web development Nairobi",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: absoluteUrl("/"),
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: SITE.ogImageWidth,
        height: SITE.ogImageHeight,
        alt: `${SITE.name} — software built in Nairobi`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.social.twitterHandle,
    creator: SITE.social.twitterHandle,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Icons come from the app/ file conventions (icon.png, apple-icon.png,
  // favicon.ico), all generated from the brand logo. Declaring them here as
  // well would override those and lose Next's content hashing.
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

// Site-wide entity graph. Page-level schemas reference these by @id.
const siteGraph = jsonLdGraph(
  organizationSchema(),
  localBusinessSchema(),
  websiteSchema(),
  serviceCatalogSchema()
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE.language} className={instrument.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
        />
      </head>
      <body>
        <NextTopLoader color="#0b5e57" showSpinner={false} height={2} />
        {/* Public chrome lives in (site)/layout.tsx; the founder inbox has its own. */}
        {children}
      </body>
    </html>
  );
}
