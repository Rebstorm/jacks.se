import { linksAvailable } from "./linksAvailable.ts";

export interface MenuProps {
  route: string;
}

export const Menu = (props: MenuProps) => {
  return (
    <nav class={"nav"}>
      {linksAvailable().map((link, index) =>
        link.isExternal ? (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ) : (
          <a
            key={index}
            href={link.path}
            f-partial={`${link.path}`}
            /* className={props.route === link.path ? "active" : ""} */
          >
            {link.label}
          </a>
        )
      )}
    </nav>
  );
};

export default Menu;
