import { useEffect } from "react";

export function useScrollReveal(selector = ".reveal-on-scroll", threshold = 0.15) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // Optional: stop observing once revealed
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [selector, threshold]);
}
