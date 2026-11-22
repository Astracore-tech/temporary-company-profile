import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { SITE, absoluteUrl } from "@/utils/site";
import {
  jsonLdGraph,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  serviceCatalogSchema,
} from "@/utils/structuredData";

const searchVerification: NonNullable<Metadata["verification"]> = {
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : {}),
  ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
    : {}),
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-syne",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
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
    "business technology Kenya",
    "marketing agency Nairobi",
    "digital marketing Kenya",
    "AI automation Kenya",
    "business process automation Nairobi",
    "WhatsApp automation Kenya",
    "software development Kenya",
    "custom business software Nairobi",
    "website development Kenya",
    "technical SEO Kenya",
    "managed business operations",
    "M-Pesa reconciliation",
    "M-Pesa STK Push integration",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  category: "technology",
  appleWebApp: {
    capable: true,
    title: SITE.shortName,
    statusBarStyle: "black-translucent",
  },
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
        alt: `${SITE.name} — business technology and growth in Nairobi`,
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
  ...(Object.keys(searchVerification).length
    ? { verification: searchVerification }
    : {}),
  // Icons come from the app/ file conventions (icon.png, apple-icon.png,
  // favicon.ico), all generated from the brand logo. Declaring them here as
  // well would override those and lose Next's content hashing.
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0e",
  colorScheme: "dark",
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
    <html
      lang={SITE.language}
      className={`${inter.variable} ${syne.variable} ${plexMono.variable}`}
      suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
        />
      </head>
      <body className={inter.className}>
        <NextTopLoader color="#7EA6FF" showSpinner={false} />
        {/* Public chrome lives in (site)/layout.tsx; the founder inbox has its own. */}
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
