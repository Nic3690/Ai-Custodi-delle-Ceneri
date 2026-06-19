import { Link } from "react-router-dom";
import { NavLinks } from "./Navigation";
import LogoNaq from "@/assets/logo.png";

/** Home-only chrome: menu items spread across the top, logo centered at the bottom. */
export const HomeNav = () => (
  <>
    {/* Menu items — spread edge to edge across the top */}
    <nav className="pointer-events-none fixed top-4 md:top-5 inset-x-0 z-30 flex justify-between px-5 md:px-8">
      <NavLinks
        className="home-nav-link pointer-events-auto font-mono text-[10px] md:text-xs tracking-widest text-foreground/70 hover:text-foreground transition-colors"
        activeClassName=""
      />
    </nav>

    {/* Logo — centered at the bottom */}
    <Link
      to="/"
      className="hidden md:block pointer-events-auto fixed bottom-4 left-1/2 -translate-x-1/2 z-30"
      aria-label="NAQ EVIUS"
    >
      <div
        aria-hidden="true"
        className="h-6 w-6 md:h-7 md:w-7"
        style={{
          backgroundColor: "#f2faef",
          WebkitMaskImage: `url(${LogoNaq})`,
          maskImage: `url(${LogoNaq})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </Link>
  </>
);
