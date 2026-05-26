import { useEffect, useRef, useState } from "react";

interface ScrollIndicatorProps {
  visible?: boolean;
}

const ScrollIndicator = ({ visible: visibleProp }: ScrollIndicatorProps) => {
  const [scrollVisible, setScrollVisible] = useState(true);
  const [centerX, setCenterX] = useState<number | null>(null);
  const mounted = useRef(true);
  const controlled = visibleProp !== undefined;

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
      if (controlled) return;
      setScrollVisible(mainEl.scrollTop < 50);
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
  }, [controlled]);

  if (centerX === null) return null;

  const isVisible = controlled ? visibleProp : scrollVisible;

  return (
    <div
      className="fixed z-50 text-muted-foreground transition-opacity duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: "none",
        bottom: "max(2rem, env(safe-area-inset-bottom, 0px) + 1rem)",
        left: centerX,
        transform: "translateX(-50%)",
      }}
    >
      <div className="scroll-indicator" />
    </div>
  );
};

export default ScrollIndicator;
