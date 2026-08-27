import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Progresswork from "@/components/Home/WorkProgress";
import Testimonial from "@/components/SharedComponent/Testimonial";
import JsonLd from "@/components/SEO/JsonLd";
import { pageMetadata } from "@/utils/pageMeta";
import { jsonLdGraph, breadcrumbSchema } from "@/utils/structuredData";

export const metadata = pageMetadata({
  title: "About",
  description:
    "A Nairobi software company building enterprise systems, mobile apps, ERP platforms and AI automation for organisations across East Africa.",
  path: "/about",
});

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
];

const page = () => (
  <>
    <JsonLd
      data={jsonLdGraph(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])
      )}
    />
    <HeroSub
      title="About AstraCore"
      description="We are Kenya's leading technology company — building enterprise software, mobile apps, and intelligent systems that scale businesses across East Africa."
      breadcrumbLinks={breadcrumbLinks}
    />
    <Progresswork isColorMode={true} />
    <Testimonial />
  </>
);

export default page;
