interface Link {
  path?: string;
  href?: string;
  label: string;
  isExternal?: boolean;
}

export const linksAvailable = () => [
  { path: "/", label: "home" },
  { path: "/info", label: "info" },
  { path: "/blog", label: "blog" },
  { href: "https://github.com/Rebstorm", label: "github", isExternal: true },
  { href: "https://fosstodon.org/@sendcookies", label: "🦣", isExternal: true },
  { href: "https://twitter.com/rebstorm", label: "🐦", isExternal: true },
];
