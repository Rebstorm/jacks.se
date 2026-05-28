import { ComponentChildren } from "preact";

interface H3Props {
  gradientColor?: boolean;
  noMargin?: boolean;
  children?: ComponentChildren;
}
export const H3 = (props: H3Props) => {
  const classNames = `
  ${props.gradientColor ? "gradient-text" : ""} 
  ${props.noMargin ? "no-margin" : ""}`;

  return <h3 className={classNames}>{props.children}</h3>;
};
