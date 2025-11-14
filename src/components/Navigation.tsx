import { Home, User, BookOpen, Lock, Image, Mail } from "lucide-react";
import { NavLink } from "@/components/NavLink";
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
  { title: "Home", url: "/", icon: Home },
  { title: "Bio", url: "/bio", icon: User },
  { title: "Stories", url: "/stories", icon: BookOpen },
  { title: "???", url: "/secret", icon: Lock },
  { title: "Gallery", url: "/gallery", icon: Image },
  { title: "Contacts", url: "/contacts", icon: Mail },
];

export function Navigation() {
  const { open } = useSidebar();

  return (
    <Sidebar className={open ? "w-64" : "w-16"} collapsible="icon">
      <SidebarContent className="bg-darker-bg border-r border-primary/30">
        <div className="p-4 border-b border-primary/30">
          <h2 className={`font-bold neon-text font-mono transition-all ${open ? "text-lg" : "text-xs"}`}>
            {open ? "NAQ EVIUS" : "NE"}
          </h2>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={`hover:bg-primary/10 transition-all ${
                        item.url === "/secret" ? "glitch" : ""
                      }`}
                      activeClassName="bg-primary/20 text-primary font-medium cyber-glow"
                      data-text={item.url === "/secret" ? "???" : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      {open && (
                        <span className={item.url === "/secret" ? "font-mono" : ""}>
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
