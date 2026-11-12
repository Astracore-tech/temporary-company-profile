import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import InquirySection from "@/components/Inquiry/InquirySection";
import JsonLd from "@/components/SEO/JsonLd";
import { pageMetadata } from "@/utils/pageMeta";
import {
  jsonLdGraph,
  breadcrumbSchema,
  localBusinessSchema,
} from "@/utils/structuredData";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell AstraCore Technologies what you want to build or fix. Send a short inquiry, email info@astracoretech.org or call 0739 045 698.",
  path: "/contact",
});

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/contact", text: "Contact" },
];

const page = () => (
  <>
    <JsonLd
      data={jsonLdGraph(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
        localBusinessSchema()
      )}
    />
    <HeroSub
      title="Contact Us"
      description="Describe the problem in your own words. The founder reads every inquiry and replies on the email or phone number you give."
      breadcrumbLinks={breadcrumbLinks}
    />
    <InquirySection />
  </>
);

export default page;
