import { ComponentChildren } from "preact";

interface H2Props {
  gradientColor?: boolean;
  noMargin?: boolean;
  children?: ComponentChildren;
}
export const H2 = (props: H2Props) => {
  const classNames = `
  ${props.gradientColor ? "gradient-text" : ""} 
  ${props.noMargin ? "no-margin" : ""}`;

  return <h2 className={classNames}>{props.children}</h2>;
};
