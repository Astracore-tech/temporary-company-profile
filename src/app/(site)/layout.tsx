import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";

/** Public site chrome — header, footer and scroll-to-top. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[var(--ac-button)] focus:text-[#0b0d11] focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <Header />
      <div id="main-content">{children}</div>
      <Footer />
      <ScrollToTop />
    </>
  );
}
