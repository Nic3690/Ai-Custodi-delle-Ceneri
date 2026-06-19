import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { HomeNav } from "./HomeNav";
import GridOverlay from "./GridOverlay";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const isHome = location.pathname === "/";

  // Smooth scrolling (Lenis) on the main scroller — the scroll-driven
  // animations read main.scrollTop, so they follow the smoothed scroll.
  useEffect(() => {
    const wrapper = mainRef.current;
    if (!wrapper) return;
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
    const loop = (time: number) => {
      lenis.raf(time);
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
