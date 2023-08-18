import { ComponentChildren } from "preact";

interface H2Props {
  children: ComponentChildren;
}
export const H2 = (props: H2Props) => {
  return <h2>{props.children}</h2>;
};
