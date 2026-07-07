import { useEffect, useRef, useState } from "react";

/**
 * Small label that trails the cursor inside the hero. Fades out as soon as the
 * page is scrolled away from the top and does not come back.
 */
export const CursorLabel = ({ text = "scorri per esplorare" }: { text?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!hasMoved) setHasMoved(true);
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
  }, [hasMoved]);

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

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-30 will-change-transform"
      style={{ opacity: visible && hasMoved ? 1 : 0, transition: "opacity 300ms ease" }}
    >
      <span className="block translate-x-4 translate-y-3 whitespace-nowrap font-mono text-[10px] md:text-xs uppercase tracking-widest text-foreground/70">
        [ {text} ]
      </span>
    </div>
  );
};
