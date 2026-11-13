import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

/** Public site chrome — header and footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:bg-[var(--ac-accent)] focus:text-[var(--ac-on-accent)] focus:font-semibold focus:text-sm focus:rounded-md"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
