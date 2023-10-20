import { ComponentChildren } from "preact";

interface H2Props {
  gradientColor?: boolean;
  children?: ComponentChildren;
}
export const H2 = (props: H2Props) => {
  return (
    <h2 className={props.gradientColor ? "gradient-text" : ""}>
      {props.children}
    </h2>
  );
};
