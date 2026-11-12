import React from "react";
import Link from "next/link";
import HeroSub from "@/components/SharedComponent/HeroSub";
import HowItWorks from "@/components/Home/HowItWorks";
import JsonLd from "@/components/SEO/JsonLd";
import { pageMetadata } from "@/utils/pageMeta";
import { jsonLdGraph, breadcrumbSchema } from "@/utils/structuredData";
import { PRIMARY_CTA } from "@/content/site-copy";

export const metadata = pageMetadata({
  title: "About",
  description:
    "AstraCore Technologies is a Nairobi software company building websites, portals, operational systems, M-Pesa integrations and workflow automation.",
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
      description="A Nairobi software company that builds practical systems for the way a business actually works."
      breadcrumbLinks={breadcrumbLinks}
    />
    <section>
      <div className="ac-container">
        <div className="max-w-[var(--ac-max-prose)] space-y-6">
          <p className="ac-lead">
            AstraCore Technologies builds business websites and portals, custom operational systems,
            M&#8209;Pesa integrations and workflow automation.
          </p>
          <p className="ac-body">
            We start from the problem rather than the technology: what happens today, where time is
            lost or mistakes creep in, and what would make the work easier. Only then do we propose
            what to build — and we put the scope and cost in writing before any work begins.
          </p>
          <p className="ac-body">
            We are based in Nairobi and work with businesses in Kenya and abroad through the same
            process: you describe the problem, we follow up, and we agree a proposal together.
          </p>
          <div className="pt-4">
            <Link href={PRIMARY_CTA.href} className="ac-btn ac-btn-primary">
              {PRIMARY_CTA.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
    <HowItWorks />
  </>
);

export default page;
