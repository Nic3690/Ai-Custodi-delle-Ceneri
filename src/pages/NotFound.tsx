import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ScanBars } from "@/components/ScanBars";
import { InitCounter } from "@/components/InitCounter";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-full flex items-center justify-center px-5 md:px-8 py-12 relative z-[1]">
      <div className="max-w-xl">
        <div
          className="flex items-center gap-3 mb-5 font-mono text-xs tracking-[0.3em]"
          style={{ color: "#fe4a00" }}
        >
          <span>Errore 404</span>
          <ScanBars />
          <InitCounter />
        </div>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
          Pagina non trovata
        </h1>
        <Link
          to="/"
          className="text-accent hover:opacity-80 transition-colors"
        >
          Torna alla home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
