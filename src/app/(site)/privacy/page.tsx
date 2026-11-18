import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import JsonLd from "@/components/SEO/JsonLd";
import { pageMetadata } from "@/utils/pageMeta";
import { jsonLdGraph, breadcrumbSchema } from "@/utils/structuredData";
import { SITE } from "@/utils/site";
import { PRIVACY_UPDATED, privacySections } from "@/content/privacy";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description:
    "What AstraCore Technologies collects through this website, why, where it is stored, how long it is kept and your rights under the Kenya Data Protection Act, 2019.",
  path: "/privacy",
});

const page = () => (
  <>
    <JsonLd
      data={jsonLdGraph(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy notice", path: "/privacy" },
        ])
      )}
    />
    <HeroSub
      eyebrow="Legal"
      title="Privacy notice"
      description={`How this website handles your personal data. Last updated ${PRIVACY_UPDATED}.`}
      breadcrumbLinks={[
        { href: "/", text: "Home" },
        { href: "/privacy", text: "Privacy notice" },
      ]}
    />
    <section>
      <div className="ac-container grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] gap-12 lg:gap-20">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-28 space-y-2.5">
            {privacySections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="ac-small hover:text-[var(--ac-ink)] transition-colors">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-[var(--ac-max-prose)] space-y-12">
          <p className="ac-lead">
            In short: we use what you send through the inquiry form only to reply to you and,
            if we work together, to manage that work. No tracking, no marketing lists, no
            selling. You can ask us to delete it at any time.
          </p>

          {privacySections.map((s) => (
            <section key={s.id} id={s.id} className="!p-0 scroll-mt-28">
              <h2 className="ac-h3 mb-4">{s.heading}</h2>
              <div className="space-y-4">
                {s.paragraphs?.map((p) => (
                  <p key={p} className="ac-body">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="space-y-2.5">
                    {s.list.map((item) => (
                      <li key={item} className="ac-body flex gap-3">
                        <span className="text-[var(--ac-ink-4)]" aria-hidden="true">
                          —
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.after && <p className="ac-body">{s.after}</p>}
              </div>
            </section>
          ))}

          <section id="contact-us" className="!p-0 scroll-mt-28">
            <h2 className="ac-h3 mb-4">Contact us</h2>
            <address className="ac-body not-italic space-y-1">
              <span className="block">{SITE.name} — data protection contact: Mark, co-founder</span>
              <span className="block">
                Email:{" "}
                <a href={`mailto:${SITE.email}`} className="ac-link normal-case tracking-normal">
                  {SITE.email}
                </a>
              </span>
              <span className="block">Phone: {SITE.telephone}</span>
              <span className="block">
                {SITE.address.street}, {SITE.address.city}, Kenya
              </span>
            </address>
          </section>
        </div>
      </div>
    </section>
  </>
);

export default page;
