import NotFound from "@/components/NotFound";
import SiteLayout from "./(site)/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
};

// Lives outside the (site) group, so it borrows the public chrome explicitly.
const ErrorPage = () => (
  <SiteLayout>
    <NotFound />
  </SiteLayout>
);

export default ErrorPage;
