import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Navigation } from "./Navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Navigation />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-primary/50 flex items-center px-4 bg-darker-bg/30 backdrop-blur cyber-glow">
            <SidebarTrigger className="cyber-glow glitch-hover" />
            <div className="ml-4">
              <span className="text-sm font-mono text-primary animate-flicker">// SYSTEM_ACTIVE</span>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          
          {/* Scan line effect */}
          <div className="scan-line" />
        </div>
      </div>
    </SidebarProvider>
  );
};
