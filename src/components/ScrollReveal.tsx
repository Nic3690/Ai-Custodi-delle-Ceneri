import { useEffect, useRef, useState } from "react";

export function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    opacity: 0,
    transform: "translateY(40px)",
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scrollEl = el.closest("main") || window;
    let rafId: number | null = null;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewportH =
        scrollEl === window
          ? window.innerHeight
          : (scrollEl as HTMLElement).clientHeight;

      const entry = rect.top / viewportH;
      const progress = Math.max(0, Math.min(1, (1 - entry) / 0.5));

      setStyle({
        opacity: progress,
        transform: `translateY(${40 * (1 - progress)}px)`,
      });
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
