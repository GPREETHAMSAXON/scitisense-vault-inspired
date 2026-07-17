import { useEffect, useState } from "react";

/**
 * Returns a display string that searches through nearby digits before
 * settling on the real target number. Three phases:
 *   0–20%  : digits close to target (±30%) — looks like searching
 *   20–75% : rapid count-up with light jitter
 *   75–100%: smooth final settle
 */
export function useScrambleCount(
  target:   number,
  inView:   boolean,
  noMotion: boolean,
  duration  = 2000,
): string {
  const [display, setDisplay] = useState<string>(noMotion ? String(target) : "0");

  useEffect(() => {
    if (noMotion) { setDisplay(String(target)); return; }
    if (!inView)  { setDisplay("0");            return; }

    const startMs = performance.now();
    const lo  = Math.max(0, Math.floor(target * 0.7));
    const hi  = Math.ceil(target * 1.3);
    const rng = hi - lo || 1;

    const id = setInterval(() => {
      const p = Math.min((performance.now() - startMs) / duration, 1);

      if (p >= 1) {
        setDisplay(String(target));
        clearInterval(id);
        return;
      }

      if (p < 0.2) {
        // Phase 1 — digits close to target (±30%), looks like searching
        setDisplay(String(lo + Math.floor(Math.random() * rng)));
      } else if (p < 0.75) {
        // Phase 2 — count-up with occasional jitter
        const p2      = (p - 0.2) / 0.55;
        const current = Math.round((1 - Math.pow(2, -8 * p2)) * target);
        const jitter  = Math.random() < 0.2
          ? Math.floor(Math.random() * Math.max(2, target * 0.06))
          : 0;
        setDisplay(String(Math.min(target, current + jitter)));
      } else {
        // Phase 3 — smooth final landing (25% of duration)
        const p3  = (p - 0.75) / 0.25;
        const val = Math.round(target * 0.88 + p3 * target * 0.12);
        setDisplay(String(Math.min(target, val)));
      }
    }, 80);

    return () => clearInterval(id);
  }, [inView, target, duration, noMotion]);

  return display;
}
