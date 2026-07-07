import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Hint shown inside the hero. On desktop it trails the cursor; on mobile (no
 * cursor) it sits static a bit below center. In both cases it fades out as soon
 * as the page is scrolled away from the top and does not come back.
 */
export const CursorLabel = ({ text = "scorri per esplorare" }: { text?: string }) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [overHeader, setOverHeader] = useState(false);

  // Desktop: the label trails the cursor.
  useEffect(() => {
    if (isMobile) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!hasMoved) setHasMoved(true);
      // Hide the hint while the cursor is over the header band so it never
      // overlaps the fixed nav (same z-index).
      setOverHeader(clientY < 72);
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (el) el.style.transform = `translate(${clientX}px, ${clientY}px)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hasMoved, isMobile]);

  // Show only while near the top of the page (the hero); hide once scrolled.
  useEffect(() => {
    const scroller = ref.current?.closest("main");
    if (!scroller) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      setVisible(scroller.scrollTop < vh * 0.4);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const label = (
    <span className="whitespace-nowrap font-mono text-[11px] md:text-xs uppercase tracking-widest text-foreground/70">
      [ {text} ]
    </span>
  );

  // Mobile: no cursor to follow — static, a bit below center.
  if (isMobile) {
    return (
      <div
        ref={ref}
        className="pointer-events-none fixed left-1/2 top-[62%] -translate-x-1/2 z-30 text-center"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms ease" }}
      >
        {label}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-30 will-change-transform"
      style={{ opacity: visible && hasMoved && !overHeader ? 1 : 0, transition: "opacity 300ms ease" }}
    >
      <span className="block translate-x-4 translate-y-3">{label}</span>
    </div>
  );
};
