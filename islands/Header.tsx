import Menu from "./Menu/Menu.tsx";

const container = `
p-12`;

export interface HeaderProps {
  route: string;
}
export const Header = (props: HeaderProps) => {
  return <Menu route={props.route} />;
};
export default Header;
