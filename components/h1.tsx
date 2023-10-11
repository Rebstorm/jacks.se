import { ComponentChildren } from "preact";

interface H1Props {
  shouldAnimate?: boolean;
  children?: ComponentChildren;
}
export const H1 = (props: H1Props) => {
  return (
    <h1 className={props.shouldAnimate ? "gradient-text" : ""}>
      {props.children}
    </h1>
  );
};
