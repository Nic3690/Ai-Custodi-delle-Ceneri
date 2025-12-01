import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Navigation } from "./Navigation";
import { ReactNode } from "react";
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
  const currentPage = pageNames[location.pathname] || "PAGE";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Navigation />

        <div className="flex-1 flex flex-col">
          <header className="h-20 border-b border-primary/50 flex items-center px-8 bg-background relative z-10">
            <SidebarTrigger />
            <div className="ml-4">
              <span className="text-sm font-mono" style={{ color: '#ff5657' }}>// {currentPage}</span>
            </div>
          </header>

          <main className={`flex-1 overflow-auto ${location.pathname !== "/" ? "grid-overlay" : ""}`}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
