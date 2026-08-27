import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Progresswork from "@/components/Home/WorkProgress";
import Services from "@/components/Home/Services";
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
    "Web development, Android & iOS apps, POS and ERP systems, e-commerce, AI bots and brand design — engineered in Nairobi for enterprises across Kenya and East Africa.",
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
      title="Our Services"
      description="From blazing-fast websites to intelligent AI bots — we engineer technology that moves your business forward across Kenya and East Africa."
      breadcrumbLinks={breadcrumbLinks}
    />
    <Services />
    <Progresswork />
  </>
);

export default page;
