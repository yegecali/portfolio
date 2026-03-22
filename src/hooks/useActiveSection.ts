import { useEffect, useState } from "react";

/**
 * Tracks which section is currently most visible in the viewport
 * using IntersectionObserver.
 */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ratio: Record<string, number> = {};

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          ratio[id] = entry.intersectionRatio;
          const top = Object.entries(ratio).sort((a, b) => b[1] - a[1])[0];
          if (top && top[1] > 0) setActive(top[0]);
        },
        { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
};

export default useActiveSection;
