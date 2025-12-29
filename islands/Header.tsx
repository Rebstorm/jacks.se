import Menu from "./Menu/Menu.tsx";

export interface HeaderProps {
  route: string;
}
export const Header = (props: HeaderProps) => {
  return <Menu route={props.route} />;
};
export default Header;
