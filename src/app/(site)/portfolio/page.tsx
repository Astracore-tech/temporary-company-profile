import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import WorkSection from "@/components/Portfolio";
import InquirySection from "@/components/Inquiry/InquirySection";
import JsonLd from "@/components/SEO/JsonLd";
import { pageMetadata } from "@/utils/pageMeta";
import { jsonLdGraph, breadcrumbSchema, portfolioListSchema } from "@/utils/structuredData";

export const metadata = pageMetadata({
  title: "Our Work",
  description:
    "Systems AstraCore Technologies has built and runs: an internal operations platform, an always-on lead-finding service, a learning platform in development, and this site's inquiry pipeline.",
  path: "/portfolio",
});

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/portfolio", text: "Our Work" },
];

const page = () => (
  <>
    <JsonLd
      data={jsonLdGraph(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/portfolio" },
        ]),
        portfolioListSchema()
      )}
    />
    <HeroSub
      title="Our Work"
      description="What we have built so far, described as it really stands — including what is still in progress."
      breadcrumbLinks={breadcrumbLinks}
    />
    <WorkSection />
    <InquirySection />
  </>
);

export default page;
