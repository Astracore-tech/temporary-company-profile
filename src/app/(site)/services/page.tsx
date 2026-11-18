import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Services from "@/components/Home/Services";
import EngagementModels from "@/components/Home/Services/EngagementModels";
import HowItWorks from "@/components/Home/HowItWorks";
import InquirySection from "@/components/Inquiry/InquirySection";
import JsonLd from "@/components/SEO/JsonLd";
import { pageMetadata } from "@/utils/pageMeta";
import {
  jsonLdGraph,
  breadcrumbSchema,
  serviceCatalogSchema,
} from "@/utils/structuredData";
import { services } from "@/content/services";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Five departments — marketing and growth, AI and business automation, software development, website development and management, and managed business operations — built in Kenya for businesses across Africa.",
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
      eyebrow="Services"
      title="Services"
      description="Marketing and growth, AI and automation, software, websites, and managed operations. Each can be a project, a managed service, or both."
      breadcrumbLinks={breadcrumbLinks}
      aside={
        <div className="border-t border-[var(--ac-line)] pt-5">
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="ac-meta">Departments</dt>
              <dd className="ac-stat mt-1" style={{ color: "var(--ac-accent)" }}>
                {String(services.length).padStart(2, "0")}
              </dd>
            </div>
            <div>
              <dt className="ac-meta">First market</dt>
              <dd className="mt-1 text-[13px] text-[var(--ac-ink-2)]">Kenya, then Africa</dd>
            </div>
          </dl>
        </div>
      }
    />
    <Services detailed />
    <EngagementModels />
    <HowItWorks />
    <InquirySection />
  </>
);

export default page;
