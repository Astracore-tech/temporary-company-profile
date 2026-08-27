import React from "react";
import Portfolio from "@/components/portfolio/PortfolioList";
import HeroSub from "@/components/SharedComponent/HeroSub";
import JsonLd from "@/components/SEO/JsonLd";
import { pageMetadata } from "@/utils/pageMeta";
import { jsonLdGraph, breadcrumbSchema } from "@/utils/structuredData";

export const metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Selected AstraCore work — mobile apps, web platforms, ERP and POS systems, automation and brand identity delivered for clients across Kenya and East Africa.",
  path: "/portfolio",
});

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/portfolio", text: "Portfolio" },
];

const PortfolioListPage = () => (
  <>
    <JsonLd
      data={jsonLdGraph(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ])
      )}
    />
    <HeroSub
      title="Our Portfolio"
      description="A curated showcase of the enterprise systems, mobile apps, web platforms and creative work we've delivered across Kenya and beyond."
      breadcrumbLinks={breadcrumbLinks}
    />
    <Portfolio />
  </>
);

export default PortfolioListPage;
