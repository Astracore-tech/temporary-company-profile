import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Aoscompo from "@/utils/aos";

/** Public site chrome — header, footer and scroll effects. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:bg-[var(--ac-accent)] focus:text-[var(--ac-on-accent)] focus:font-bold focus:text-sm"
      >
        Skip to content
      </a>
      <Aoscompo>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
      </Aoscompo>
      <ScrollToTop />
    </>
  );
}
