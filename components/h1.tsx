import { ComponentChildren } from "preact";

interface H1Props {
  children: ComponentChildren;
}
export const H1 = (props: H1Props) => {
  return <h1>{props.children}</h1>;
};
