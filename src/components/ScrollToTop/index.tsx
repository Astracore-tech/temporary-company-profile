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
    <div className="fixed bottom-8 right-8 z-999">
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="back-to-top flex h-10 w-10 items-center justify-center bg-[var(--ac-surface-2)] text-[var(--ac-ink)] border border-[var(--ac-line-strong)] transition duration-300 ease-in-out hover:bg-[var(--ac-accent)] hover:text-[var(--ac-on-accent)] hover:border-[var(--ac-accent)] cursor-pointer"
        >
          <span className="mt-[2px] h-2.5 w-2.5 rotate-45 border-l-2 border-t-2 border-current"></span>
        </button>
      )}
    </div>
  );
}

