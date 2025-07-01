import { linksAvailable } from "../../interfaces/linksAvailable.tsx";
import { GithubIcon } from "../../components/github-icon.tsx";

export interface MenuProps {
  route: string;
}

export const Menu = (props: MenuProps) => {
  return (
    <nav class="nav">
      {linksAvailable().map((link, index) => (
        <a
          key={index}
          title={link.title}
          href={link.isExternal ? link.href : link.path}
          {...(link.isExternal ? {
            "aria-label": link?.title,
            target: "_blank",
            rel: "noopener noreferrer"
          } : {
            "f-partial": `${link.path}`
          })}
        >
          {link.label}
          <span>{link.title}</span>
        </a>
      ))}
    </nav>
  );
};

export default Menu;