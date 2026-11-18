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
    "Request a consultation or ask for a quote from AstraCore Technologies. Tell us what is getting in the way, email info@astracoretech.org or call 0739 045 698.",
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
      eyebrow="Contact"
      title="Request a consultation"
      description="Request a consultation or ask for a quote. Tell us what is getting in the way, in your own words. Mark reads every request and replies on the email or phone number you give."
      breadcrumbLinks={breadcrumbLinks}
      aside={
        <div className="border-t border-[var(--ac-line)] pt-5">
          <p className="ac-label">What happens next</p>
          <ol className="mt-4">
            <li className="grid grid-cols-[24px_minmax(0,1fr)] gap-3 border-b border-[var(--ac-line)] py-3">
              <span className="ac-index pt-0.5">01</span>
              <p className="ac-small">We reply on the email or phone number you give.</p>
            </li>
            <li className="grid grid-cols-[24px_minmax(0,1fr)] gap-3 border-b border-[var(--ac-line)] py-3">
              <span className="ac-index pt-0.5">02</span>
              <p className="ac-small">We ask what we need and arrange a short conversation.</p>
            </li>
            <li className="grid grid-cols-[24px_minmax(0,1fr)] gap-3 py-3">
              <span className="ac-index pt-0.5">03</span>
              <p className="ac-small">If it fits, you get a written proposal to review.</p>
            </li>
          </ol>
        </div>
      }
    />
    <InquirySection />
  </>
);

export default page;
