import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import WorkSection from "@/components/Portfolio";
import ServiceProof from "@/components/Portfolio/ServiceProof";
import InquirySection from "@/components/Inquiry/InquirySection";
import CountUp from "@/components/Common/CountUp";
import JsonLd from "@/components/SEO/JsonLd";
import { pageMetadata } from "@/utils/pageMeta";
import { jsonLdGraph, breadcrumbSchema, portfolioListSchema } from "@/utils/structuredData";
import { portfolioStats } from "@/content/portfolio";

export const metadata = pageMetadata({
  title: "Our work",
  description:
    "Four systems AstraCore has built — an operations platform, a lead-finding service, an earlier learning-platform exploration and this site's inquiry pipeline — with honest status and what each proves.",
  path: "/portfolio",
});

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/portfolio", text: "Our work" },
];

const page = () => (
  <>
    <JsonLd
      data={jsonLdGraph(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our work", path: "/portfolio" },
        ]),
        portfolioListSchema()
      )}
    />
    <HeroSub
      eyebrow="Selected work"
      title="Our work, as it stands"
      description="Four systems we have built, with the status and the limits written down."
      breadcrumbLinks={breadcrumbLinks}
      aside={
        <div className="border-t border-[var(--ac-line)] pt-5">
          <dl className="grid grid-cols-3 gap-4">
            <div>
              <dt className="ac-meta">Projects</dt>
              <dd className="ac-stat mt-1">
                <CountUp value={portfolioStats.total} />
              </dd>
            </div>
            <div>
              <dt className="ac-meta flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-[1px]"
                  style={{ background: "var(--ac-ok)" }}
                />
                Running
              </dt>
              <dd className="ac-stat mt-1" style={{ color: "var(--ac-ok)" }}>
                <CountUp value={portfolioStats.running} />
              </dd>
            </div>
            <div>
              <dt className="ac-meta flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-[1px]"
                  style={{ background: "var(--ac-warn)" }}
                />
                Explored
              </dt>
              <dd className="ac-stat mt-1" style={{ color: "var(--ac-warn)" }}>
                <CountUp value={portfolioStats.explored} />
              </dd>
            </div>
          </dl>
          <p className="ac-small mt-4">
            <CountUp value={portfolioStats.shipped} pad={1} /> items documented across them.
          </p>
        </div>
      }
    />
    <WorkSection />
    <ServiceProof />
    <InquirySection />
  </>
);

export default page;
