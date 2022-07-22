/** @jsx h */
import { h } from "preact";
import Menu from "./Menu.tsx";
import { tw } from "@twind";

const container = `
p-12`;

export interface HeaderProps {
  route: string;
}
export const Header = (props: HeaderProps) => {
  return (
    <div class={tw`${container}`}>
      <Menu route={props.route} />
    </div>
  );
};
export default Header;
