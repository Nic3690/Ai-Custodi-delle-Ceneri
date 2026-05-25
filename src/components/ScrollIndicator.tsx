import { useEffect, useRef, useState } from "react";

const ScrollIndicator = () => {
  const [visible, setVisible] = useState(true);
  const [centerX, setCenterX] = useState<number | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    const updatePosition = () => {
      if (!mounted.current) return;
      const rect = mainEl.getBoundingClientRect();
      setCenterX(rect.left + rect.width / 2);
    };

    const onScroll = () => {
      const scrolled = mainEl.scrollTop;
      setVisible(scrolled < 50);
    };

    updatePosition();
    const resizeObs = new ResizeObserver(updatePosition);
    resizeObs.observe(mainEl);
    mainEl.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mounted.current = false;
      resizeObs.disconnect();
      mainEl.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (centerX === null) return null;

  return (
    <div
      className="fixed z-50 text-muted-foreground transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
        bottom: "2rem",
        left: centerX,
        transform: "translateX(-50%)",
      }}
    >
      <div className="scroll-indicator" />
    </div>
  );
};

export default ScrollIndicator;
