import HeroSub from "@/components/SharedComponent/HeroSub";
import NotFound from "@/components/NotFound";
import SiteLayout from "./(site)/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
};

// Lives outside the (site) group, so it borrows the public chrome explicitly.
const ErrorPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/404", text: "Page not found" },
  ];
  return (
    <SiteLayout>
      <HeroSub
        eyebrow="404"
        title="Page not found"
        description="That address does not match a page on this site."
        breadcrumbLinks={breadcrumbLinks}
      />
      <NotFound />
    </SiteLayout>
  );
};

export default ErrorPage;
