import React from "react";
import Link from "next/link";
import HeroSub from "@/components/SharedComponent/HeroSub";
import SectionHeading from "@/components/SharedComponent/SectionHeading";
import HowItWorks from "@/components/Home/HowItWorks";
import InquirySection from "@/components/Inquiry/InquirySection";
import JsonLd from "@/components/SEO/JsonLd";
import { pageMetadata } from "@/utils/pageMeta";
import { jsonLdGraph, breadcrumbSchema } from "@/utils/structuredData";
import { aboutFacts, principles, toolGroups } from "@/content/site-copy";
import { projectBySlug, STATUS_LABEL } from "@/content/portfolio";
import { services } from "@/content/services";

export const metadata = pageMetadata({
  title: "About",
  description:
    "AstraCore Technologies is a full-service business technology and growth company in Nairobi: marketing, AI and automation, software, websites and managed operations for businesses in Kenya and across Africa.",
  path: "/about",
});

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
];

const NOW = ["astracore-os", "market-intelligence-agent"]
  .map((slug) => projectBySlug(slug)!)
  .filter(Boolean);

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
      eyebrow="About"
      title="AstraCore Technologies"
      description="A full-service business technology and growth company in Nairobi. We build, automate and manage the systems that help businesses operate efficiently and grow."
      breadcrumbLinks={breadcrumbLinks}
      aside={
        <dl className="border-t border-[var(--ac-line)] pt-5">
          {aboutFacts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-baseline justify-between gap-6 border-b border-[var(--ac-line)] py-3 last:border-b-0">
              <dt className="ac-meta">{fact.label}</dt>
              <dd className="text-[13px] text-[var(--ac-ink-2)]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      }
    />

    <section>
      <div className="ac-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-5 lg:col-span-7">
          <p className="ac-lead">
            AstraCore is a full-service business technology and growth company. We build, automate
            and manage the systems that help businesses operate efficiently and grow.
          </p>
          <p className="ac-body">
            Five departments: marketing and growth, AI and business automation, software
            development, website development and management, and managed business operations.
            Amplifyr, our marketing product, supports the marketing department; its development
            remains separate.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {services.map((department) => (
              <li key={department.id}>
                <Link href={`/services/${department.slug}/`} className="ac-link">
                  {department.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="ac-body">
            We start from the problem rather than the technology: what happens today, where time is
            lost or mistakes creep in, and what would make the work easier. Only then do we propose
            what to build or run — and we put the scope and cost in writing before any work begins.
          </p>
          <p className="ac-body">
            AstraCore is a two-founder company. Mark leads engineering, implementation, technical
            operations and company systems; the other co-founder leads marketing, SEO, lead
            generation and commercial growth. The two roles are complementary, not a hierarchy.
          </p>
          <p className="ac-body">
            We are based in Nairobi and work with businesses in Kenya first, then across East
            Africa and the wider African market. The process is the same: you describe the problem,
            we follow up, and we agree a proposal together.
          </p>
          <p className="ac-body">
            The work page shows what we have built and run ourselves, including what is still in
            development or was only explored. We would rather show four honest systems than a wall
            of client logos.
          </p>
          <div className="pt-2">
            <Link href="/portfolio/" className="ac-btn ac-btn-ghost">
              See the work
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="border-t border-[var(--ac-line)] pt-5">
            <h2 className="ac-label">How we work</h2>
            <ol className="mt-4">
              {principles.map((p, i) => (
                <li
                  key={p.title}
                  className="grid grid-cols-[24px_minmax(0,1fr)] gap-3 border-b border-[var(--ac-line)] py-4">
                  <span className="ac-index pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="ac-h4">{p.title}</h3>
                    <p className="ac-small mt-1">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </section>

    <section className="border-t border-[var(--ac-line)]">
      <div className="ac-container">
        <SectionHeading
          eyebrow="Tools"
          title="What we build with"
          description="The stack that appears in the projects, not a wish list."
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {toolGroups.map((group) => (
            <div key={group.label} className="border-t border-[var(--ac-line)] pt-5">
              <h3 className="ac-label">{group.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="ac-tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-[var(--ac-line)]">
      <div className="ac-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <span className="ac-eyebrow">Now</span>
          <h2 className="ac-h2 mt-4">What we run</h2>
          <p className="ac-small mt-5 max-w-xs">
            Two systems we run ourselves: one for company operations, one for finding work.
          </p>
        </div>

        <div className="border-t border-[var(--ac-line)] lg:col-span-8">
          {NOW.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}/`}
              className="group flex items-start justify-between gap-6 border-b border-[var(--ac-line)] py-5 transition-colors hover:bg-[rgba(255,255,255,0.015)]">
              <div>
                <h3 className="ac-h3 transition-colors group-hover:text-[var(--ac-accent)]">
                  {p.name}
                </h3>
                <p className="ac-small mt-1">
                  {p.kind} · {STATUS_LABEL[p.status]}
                </p>
              </div>
              <i
                className="ti ti-arrow-up-right mt-1 shrink-0 text-[16px] text-[var(--ac-ink-4)] transition-colors group-hover:text-[var(--ac-accent)]"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>

    <HowItWorks />
    <InquirySection />
  </>
);

export default page;
