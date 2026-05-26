import { useRef, useEffect, useCallback, useState } from "react";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const COOLDOWN_MS = 800;
const WHEEL_THRESHOLD = 30;
const TOUCH_THRESHOLD = 50;

export function useSnapScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  snapPoints: number[],
  onTick: (progress: number) => void,
  config?: { animBase?: number; animRate?: number; freeAfterLast?: boolean }
): number {
  const animBase = config?.animBase ?? 700;
  const animRate = config?.animRate ?? 2000;
  const freeAfterLast = config?.freeAfterLast ?? false;

  const progressRef = useRef(0);
  const currentSnap = useRef(0);
  const isAnimating = useRef(false);
  const animStartTime = useRef(0);
  const animFrom = useRef(0);
  const animTo = useRef(0);
  const cooldownUntil = useRef(0);
  const snapDone = useRef(false);
  const snapPointsRef = useRef(snapPoints);
  snapPointsRef.current = snapPoints;
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;
  const [snapIndex, setSnapIndex] = useState(0);

  const goToSnap = useCallback((index: number) => {
    const points = snapPointsRef.current;
    if (index < 0 || index >= points.length) return;
    if (index === currentSnap.current && !isAnimating.current) return;
    currentSnap.current = index;
    setSnapIndex(index);
    isAnimating.current = true;
    animFrom.current = progressRef.current;
    animTo.current = points[index];
    animStartTime.current = performance.now();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (freeAfterLast && snapDone.current) {
        const main = el.closest("main") as HTMLElement | null;
        if (main && main.scrollTop <= 0 && e.deltaY < 0) {
          snapDone.current = false;
        } else {
          return;
        }
      }

      if (isAnimating.current) { e.preventDefault(); return; }
      if (performance.now() < cooldownUntil.current) { e.preventDefault(); return; }
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) { e.preventDefault(); return; }

      const points = snapPointsRef.current;
      if (e.deltaY > 0 && currentSnap.current >= points.length - 1) {
        if (freeAfterLast) { snapDone.current = true; return; }
        e.preventDefault();
        return;
      }
      if (e.deltaY < 0 && currentSnap.current <= 0) { e.preventDefault(); return; }

      e.preventDefault();
      if (e.deltaY > 0) goToSnap(currentSnap.current + 1);
      else goToSnap(currentSnap.current - 1);
    };

    let touchStartY = 0;
    let touchHandled = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchHandled = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (freeAfterLast && snapDone.current) {
        const main = el.closest("main") as HTMLElement | null;
        const dy = touchStartY - e.touches[0].clientY;
        if (main && main.scrollTop <= 0 && dy < 0) {
          snapDone.current = false;
        } else {
          return;
        }
      }

      if (touchHandled || isAnimating.current) {
        e.preventDefault();
        return;
      }
      if (performance.now() < cooldownUntil.current) {
        e.preventDefault();
        return;
      }
      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) > TOUCH_THRESHOLD) {
        const points = snapPointsRef.current;
        if (dy > 0 && currentSnap.current >= points.length - 1) {
          if (freeAfterLast) { snapDone.current = true; return; }
          return;
        }
        if (dy < 0 && currentSnap.current <= 0) return;
        e.preventDefault();
        touchHandled = true;
        if (dy > 0) goToSnap(currentSnap.current + 1);
        else goToSnap(currentSnap.current - 1);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [goToSnap, containerRef]);

  useEffect(() => {
    let animId: number;
    let running = true;

    const tick = () => {
      if (!running) return;

      if (isAnimating.current) {
        const elapsed = performance.now() - animStartTime.current;
        const distance = Math.abs(animTo.current - animFrom.current);
        const duration = animBase + distance * animRate;
        const t = Math.min(1, elapsed / duration);
        progressRef.current =
          animFrom.current +
          (animTo.current - animFrom.current) * easeInOutCubic(t);

        if (t >= 1) {
          isAnimating.current = false;
          progressRef.current = animTo.current;
          cooldownUntil.current = performance.now() + COOLDOWN_MS;
        }

        const main = document.querySelector("main");
        if (main instanceof HTMLElement) {
          main.dataset.snapProgress = String(progressRef.current);
        }

        onTickRef.current(progressRef.current);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(animId);
      const main = document.querySelector("main");
      if (main instanceof HTMLElement) delete main.dataset.snapProgress;
    };
  }, [animBase, animRate]);

  return snapIndex;
}
