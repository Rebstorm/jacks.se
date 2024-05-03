import { linksAvailable } from "../../interfaces/linksAvailable.tsx";
import { GithubIcon } from "../../components/github-icon.tsx";

export interface MenuProps {
  route: string;
}

export const Menu = (props: MenuProps) => {
  return (
    <nav class={"nav"}>
      {linksAvailable().map((link, index) =>
        link.isExternal ? (
          <a
            title={link.title}
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ) : (
          <a key={index} href={link.path} f-partial={`${link.path}`}>
            {link.label}
          </a>
        )
      )}
    </nav>
  );
};

export default Menu;
