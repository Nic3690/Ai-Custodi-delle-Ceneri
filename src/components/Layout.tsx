import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NavLinks } from "./Navigation";
import GridOverlay from "./GridOverlay";
import LogoNaq from "@/assets/logo.png";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <header className="shrink-0 h-16 md:h-20 flex items-center justify-between px-6 md:px-10 lg:px-16 border-b border-border/40 relative z-30">
        <Link to="/" className="flex items-center gap-3">
          <img src={LogoNaq} alt="NAQ EVIUS" className="h-6 md:h-7 w-auto" />
          <span className="text-sm md:text-base tracking-[0.25em] uppercase font-mono">
            NAQ EVIUS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          <NavLinks />
        </nav>

        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 inset-x-0 bottom-0 z-20 bg-background flex flex-col items-center justify-center gap-8">
          <NavLinks
            onNavigate={() => setMenuOpen(false)}
            className="text-2xl tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          />
        </div>
      )}

      <main ref={mainRef} className="flex-1 overflow-auto min-h-0 relative">
        {location.pathname !== "/" && <GridOverlay />}
        {children}
      </main>
    </div>
  );
};
