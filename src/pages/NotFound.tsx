import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-full flex items-center justify-center px-6 md:px-10 lg:px-16 py-20 relative z-[1]">
      <div className="max-w-xl">
        <p
          className="font-mono text-xs tracking-[0.3em] mb-5"
          style={{ color: "#fe4a00" }}
        >
          Errore 404
        </p>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
          Pagina non trovata
        </h1>
        <Link
          to="/"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Torna alla home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
