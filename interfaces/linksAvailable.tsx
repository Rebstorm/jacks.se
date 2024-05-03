import { JSX } from "preact/jsx-runtime";
import { GithubIcon } from "../components/github-icon.tsx";

interface Link {
  path?: string;
  href?: string;
  title?: string;
  label: string | JSX.Element;
  isExternal?: boolean;
}

export const linksAvailable = () =>
  Array.of<Link>(
    { path: "/", label: "🏡" },
    { path: "/experiments", label: "🧪" },
    { path: "/blog", label: "📒" },
    {
      href: "https://github.com/Rebstorm",
      label: <GithubIcon />,
      title: 'Github',
      isExternal: true,
    },
    {
      href: "https://fosstodon.org/@sendcookies",
      label: "🦣",
      isExternal: true,
    },
    { href: "https://twitter.com/rebstorm", label: "🐦", isExternal: true }
  );
