import { Orbit, Fingerprint, ScrollText, Lock, Aperture, Radio } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import LogoNaq from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Orbit },
  { title: "Bio", url: "/bio", icon: Fingerprint },
  { title: "E-Book", url: "/stories", icon: ScrollText },
  { title: "???", url: "/secret", icon: Lock },
  { title: "Galleria", url: "/gallery", icon: Aperture },
  { title: "Contatti", url: "/contacts", icon: Radio },
];

export function Navigation() {
  const { open, setOpenMobile, isMobile } = useSidebar();
  const { pathname } = useLocation();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className={open ? "w-64" : "w-24"} collapsible="icon">
      <SidebarContent className="bg-background border-r border-primary/30 border-build-right" key={pathname}>
        <div className={`border-b border-primary/30 border-build-bottom flex items-center h-20 ${open ? "px-6 justify-start gap-3" : "justify-center"}`} style={{ animationDelay: "0.1s" }}>
          <img src={LogoNaq} alt="NAQ EVIUS Logo" className={`${open ? "h-8" : "h-6"}`} />
          {open && (
            <h2 className="font-bold text-primary text-xl" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              NAQ EVIUS
            </h2>
          )}
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title} className={`border-b border-primary/30 border-build-bottom ${index === 0 ? "pt-1 pb-2" : "py-2"} ${!open ? "flex justify-center" : ""}`} style={{ animationDelay: `${0.2 + index * 0.1}s` } as React.CSSProperties}>
                  <SidebarMenuButton asChild size="lg">
                    <NavLink
                      to={item.url}
                      end
                      className={`transition-all rounded-none scan-hover !gap-4 ${!open ? "justify-center" : ""}`}
                      activeClassName=""
                      onClick={handleLinkClick}
                    >
                      <item.icon
                        className={`!size-6 ${item.url === "/secret" ? "icon-glitch" : ""}`}
                        style={{ color: '#fe4a00' }}
                      />
                      {open && (
                        <span className="text-foreground menu-glitch-hover font-mono text-base">
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
