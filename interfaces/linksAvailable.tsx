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
    { path: "/", label: "🏡", title: "Home" },
    { path: "/blog", label: "📒", title: "Blog" },
    { path: "/experiments", label: "🧪", title: "Experiments" },
    {
      href: "https://github.com/Rebstorm",
      label: <GithubIcon />,
      title: "Github",
      isExternal: true,
    },
    {
      href: "https://fosstodon.org/@sendcookies",
      label: "🦣",
      title: "Mastodon",
      isExternal: true,
    },
  );