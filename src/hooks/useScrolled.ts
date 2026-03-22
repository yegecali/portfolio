import { useEffect, useState } from "react";

/**
 * Returns true when the page has been scrolled past the given threshold (px).
 */
const useScrolled = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
};

export default useScrolled;
