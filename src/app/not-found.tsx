import HeroSub from "@/components/SharedComponent/HeroSub";
import NotFound from "@/components/NotFound";
import SiteLayout from "./(site)/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
};

// Lives outside the (site) group, so it borrows the public chrome explicitly.
const ErrorPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "404" },
  ];
  return (
    <SiteLayout>
      <HeroSub
        title="404"
        description="We Can't Seem to Find The Page You're Looking For."
        breadcrumbLinks={breadcrumbLinks}
      />
      <NotFound />
    </SiteLayout>
  );
};

export default ErrorPage;
