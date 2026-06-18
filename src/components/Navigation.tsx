import { NavLink } from "@/components/NavLink";

const items = [
  { title: "Home", url: "/" },
  { title: "Bio", url: "/bio" },
  { title: "E-Book", url: "/stories" },
  { title: "???", url: "/secret" },
  { title: "Galleria", url: "/gallery" },
  { title: "Contatti", url: "/contacts" },
];

export function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <>
      {items.map((item) => (
        <NavLink
          key={item.url}
          to={item.url}
          end={item.url === "/"}
          onClick={onNavigate}
          className={
            className ??
            "text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          }
          activeClassName="!text-foreground"
        >
          {item.title}
        </NavLink>
      ))}
    </>
  );
}
