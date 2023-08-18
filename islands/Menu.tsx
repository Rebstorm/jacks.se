const container = `
flex flex-row justify-center
p-0.5 m-0.5`;

const item = `
hover:animate-wiggle
flex flex-row
p-2 m-0.5
transition-all
hover:cursor-pointer hover:underline to-pink-500 hover:blur-lg
`;

export interface MenuProps {
  route: string;
}

export const Menu = (props: MenuProps) => {
  return (
    <nav class={"nav"}>
      <a href={"/"}>home</a>
      <a href={"/info"}>info</a>
      <a href={"/blog"}>blog</a>
      <a target={"_blank"} href={"https://github.com/Rebstorm"}>
        github
      </a>
      <a target={"_blank"} href={"https://fosstodon.org/@sendcookies"}>
        mastodon
      </a>
      <a target={"_blank"} href={"https://twitter.com/rebstorm"}>
        tweets
      </a>
    </nav>
  );
};

export default Menu;
