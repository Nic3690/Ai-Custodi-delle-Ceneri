import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { HomeNav } from "./HomeNav";
import GridOverlay from "./GridOverlay";
import { useSeo } from "@/hooks/useSeo";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const isHome = location.pathname === "/";

  useSeo();

  // Smooth scrolling (Lenis) on the main scroller — the scroll-driven
  // animations read main.scrollTop, so they follow the smoothed scroll.
  useEffect(() => {
    const wrapper = mainRef.current;
    if (!wrapper) return;
    // Smooth scroll only on devices with a fine pointer (desktop/mouse).
    // On touch devices native scrolling is smoother and Lenis can cause jank.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const lenis = new Lenis({
      wrapper,
      content: wrapper,
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    let raf = 0;
    let lastHeight = wrapper.scrollHeight;
    const loop = (time: number) => {
      // Keep Lenis' scroll limit in sync with the real content height.
      // We use the same element as wrapper AND content, so Lenis' internal
      // ResizeObserver (which watches the wrapper's *box* size) never fires
      // when the inner content grows — e.g. lazy <img> finishing to load.
      // If we don't re-measure, the cached limit stays stale and scrolling
      // silently locks up until a reload. Reading scrollHeight is cheap when
      // nothing changed (no reflow), so this is safe every frame.
      const height = wrapper.scrollHeight;
      if (height !== lastHeight) {
        lastHeight = height;
        lenis.resize();
      }
      try {
        lenis.raf(time);
      } catch {
        // A single bad frame must never kill the loop — otherwise Lenis keeps
        // swallowing wheel events (preventDefault) while no longer scrolling,
        // which would freeze the page until reload.
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    mainRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <main ref={mainRef} className="flex-1 overflow-auto min-h-0 relative">
        {!isHome &&
          location.pathname !== "/stories" &&
          location.pathname !== "/bio" &&
          location.pathname !== "/contacts" &&
          location.pathname !== "/secret" &&
          !location.pathname.startsWith("/gallery") && <GridOverlay />}
        {children}
      </main>

      {/* Subtle fade behind the top menu so scrolling content doesn't clash */}
      {!isHome && (
        <div className="pointer-events-none fixed top-0 inset-x-0 h-20 z-20 bg-gradient-to-b from-background to-transparent" />
      )}

      {/* Fade at the bottom (below the HUD, above content) so the bottom bar
          and coordinates stay legible while content fades behind them */}
      <div className="pointer-events-none fixed bottom-0 inset-x-0 h-32 z-10 bg-gradient-to-t from-background via-background/90 to-transparent" />

      <HomeNav />
    </div>
  );
};
