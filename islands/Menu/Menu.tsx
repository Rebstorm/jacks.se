import { useState } from "preact/hooks";
import { linksAvailable } from "../../interfaces/linksAvailable.tsx";

export interface MenuProps {
  route: string;
}

export const Menu = (props: MenuProps) => {
  const [pathname, setPathname] = useState(
    typeof window !== "undefined" ? window.location.pathname : props.route,
  );

  return (
    <nav class="nav">
      <div class="nav-inner">
        {linksAvailable().map((link, index) => {
          const isActive = !link.isExternal && link.path !== undefined && (
            link.path === "/"
              ? pathname === "/"
              : pathname.startsWith(link.path)
          );
          return (
            <a
              key={index}
              title={link.title}
              href={link.isExternal ? link.href : link.path}
              class={isActive ? "active" : ""}
              onClick={!link.isExternal && link.path
                ? () => setPathname(link.path!)
                : undefined}
              {...(link.isExternal
                ? {
                  "aria-label": link?.title,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
                : {
                  "f-partial": `${link.path}`,
                })}
            >
              {link.label}
              <span>{link.title}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Menu;
