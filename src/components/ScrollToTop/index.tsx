'use client'
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="back-to-top flex h-10 w-10 cursor-pointer items-center justify-center rounded-[2px] border border-[var(--ac-line-strong)] bg-[var(--ac-surface-2)] text-[var(--ac-ink-2)] transition-colors duration-150 hover:bg-[var(--ac-surface-3)] hover:text-[var(--ac-ink)]"
        >
          <span className="mt-[2px] h-2.5 w-2.5 rotate-45 border-l-2 border-t-2 border-current"></span>
        </button>
      )}
    </div>
  );
}

