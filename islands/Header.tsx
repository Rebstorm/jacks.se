/** @jsx h */
import { h } from "preact";
import Menu from "./Menu.tsx";
import { tw } from "@twind";

const container = `
p-12`;

export const Header = () => {
  return (
    <div class={tw`${container}`}>
      <Menu />
    </div>
  );
};
export default Header;
