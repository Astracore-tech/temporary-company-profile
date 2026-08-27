import React from "react";
import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import HeroSub from "@/components/SharedComponent/HeroSub";
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
    "Talk to AstraCore Technologies. Offices in Kilimani, Nairobi and Nyali, Mombasa — call 0739 045 698 or email info@astracoretech.org to scope your project.",
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
      description="Have a project in mind? We'd love to hear from you. Reach out and let's build something great together."
      breadcrumbLinks={breadcrumbLinks}
    />
    <ContactInfo />
    <ContactForm />
    <Location />
  </>
);

export default page;
