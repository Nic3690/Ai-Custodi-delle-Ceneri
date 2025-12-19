import { Orbit, Fingerprint, ScrollText, Lock, Aperture, Radio } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import LogoNaq from "@/assets/Logo_Naq.png";
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

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className={open ? "w-64" : "w-24"} collapsible="icon">
      <SidebarContent className="bg-background border-r border-primary/30">
        <div className={`border-b border-primary/30 flex items-center h-20 ${open ? "px-6 justify-start gap-3" : "justify-center"}`}>
          <img src={LogoNaq} alt="NAQ EVIUS Logo" className={`${open ? "h-8" : "h-6"}`} />
          {open && (
            <h2 className="font-bold text-primary text-2xl" style={{ fontFamily: "'Equinox', sans-serif" }}>
              NAQ EVIUS
            </h2>
          )}
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={`border-b border-primary/30 py-4 ${!open ? "flex justify-center" : ""}`}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={`transition-all rounded-none scan-hover ${!open ? "justify-center" : ""}`}
                      activeClassName=""
                      onClick={handleLinkClick}
                    >
                      <item.icon
                        className={`h-5 w-5 ${item.url === "/secret" ? "icon-glitch" : ""}`}
                        style={{ color: '#ff5657' }}
                      />
                      {open && (
                        <span className="text-foreground menu-glitch-hover font-mono">
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
