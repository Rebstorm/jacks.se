import { ComponentChildren } from "preact";

interface H1Props {
  gradientColor?: boolean;
  children?: ComponentChildren;
}
export const H1 = (props: H1Props) => {
  return (
    <h1 className={props.gradientColor ? "gradient-text" : ""}>
      {props.children}
    </h1>
  );
};
