import { useLayoutEffect, useRef, useState } from "react";

export const useElementWidth = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState<number>(0);
  const rafId = useRef<number>(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Medición inicial síncrona
    const initial = el.getBoundingClientRect().width;
    if (initial > 0) setWidth(initial);

    const ro = new ResizeObserver((entries) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setWidth(entries[0]?.contentRect.width ?? 0);
      });
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
    };
  }, []);

  return [ref, width] as const;
}
