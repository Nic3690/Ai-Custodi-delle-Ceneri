import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Navigation } from "./Navigation";
import GridOverlay from "./GridOverlay";
import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const pageNames: Record<string, string> = {
  "/": "HOME",
  "/bio": "BIO",
  "/stories": "E-BOOK",
  "/secret": "???",
  "/gallery": "GALLERIA",
  "/contacts": "CONTATTI",
};

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const currentPage =
    pageNames[location.pathname] ||
    (location.pathname.startsWith("/gallery/") ? "GALLERIA" : "PAGE");

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Navigation />

        <div className="flex-1 flex flex-col">
          <header className="h-20 border-b border-primary/50 flex items-center px-4 sm:px-8 bg-background relative z-10">
            <SidebarTrigger />
            <div className="ml-4">
              <span className="text-sm font-mono" style={{ color: '#ff5657' }}>// {currentPage}</span>
            </div>
          </header>

          <main ref={mainRef} className="flex-1 overflow-auto min-h-0">
            {location.pathname !== "/" && <GridOverlay />}
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
