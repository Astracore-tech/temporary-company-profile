import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Services from "@/components/Home/Services";
import HowItWorks from "@/components/Home/HowItWorks";
import InquirySection from "@/components/Inquiry/InquirySection";
import JsonLd from "@/components/SEO/JsonLd";
import { pageMetadata } from "@/utils/pageMeta";
import {
  jsonLdGraph,
  breadcrumbSchema,
  serviceCatalogSchema,
} from "@/utils/structuredData";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Business websites and portals, custom operational systems, M-Pesa integration and workflow automation — built in Nairobi for businesses in Kenya and abroad.",
  path: "/services",
});

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/services", text: "Services" },
];

const page = () => (
  <>
    <JsonLd
      data={jsonLdGraph(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
        serviceCatalogSchema()
      )}
    />
    <HeroSub
      title="What We Build"
      description="Four kinds of work, each aimed at a problem you can describe in plain words. If yours doesn't fit neatly, tell us anyway."
      breadcrumbLinks={breadcrumbLinks}
    />
    <Services detailed />
    <HowItWorks />
    <InquirySection />
  </>
);

export default page;
