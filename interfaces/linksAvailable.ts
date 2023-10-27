interface Link {
  path?: string;
  href?: string;
  label: string;
  isExternal?: boolean;
}

export const linksAvailable = () =>
  Array.of<Link>(
    { path: "/", label: "🏡" },
    { path: "/experiments", label: "🧪" },
    { path: "/blog", label: "📒" },
    { href: "https://github.com/Rebstorm", label: "github", isExternal: true },
    {
      href: "https://fosstodon.org/@sendcookies",
      label: "🦣",
      isExternal: true,
    },
    { href: "https://twitter.com/rebstorm", label: "🐦", isExternal: true }
  );
