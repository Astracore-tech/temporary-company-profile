import React from "react";
import BlogList from "@/components/Blog/BlogList";
import HeroSub from "@/components/SharedComponent/HeroSub";
import JsonLd from "@/components/SEO/JsonLd";
import { pageMetadata } from "@/utils/pageMeta";
import { jsonLdGraph, breadcrumbSchema } from "@/utils/structuredData";
import { SITE, absoluteUrl } from "@/utils/site";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Engineering notes, product thinking and digital growth insights from the AstraCore team in Nairobi — software, AI and systems for East African business.",
  path: "/blog",
});

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/blog", text: "Blog" },
];

const BlogPage = () => (
  <>
    <JsonLd
      data={jsonLdGraph(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]),
        {
          "@type": "Blog",
          "@id": absoluteUrl("/blog/#blog"),
          name: `${SITE.shortName} Journal`,
          url: absoluteUrl("/blog"),
          inLanguage: SITE.language,
          publisher: { "@id": absoluteUrl("/#organization") },
        }
      )}
    />
    <HeroSub
      title="Blog & Insights"
      description="Tech trends, product updates and expert insights from the AstraCore team — helping you stay ahead in a rapidly evolving digital world."
      breadcrumbLinks={breadcrumbLinks}
    />
    <BlogList />
  </>
);

export default BlogPage;
