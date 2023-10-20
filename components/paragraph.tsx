import { ComponentChildren } from "preact";

interface ParagraphProps {
  gradientColor?: boolean;
  children?: ComponentChildren;
}
export const Paragraph = (props: ParagraphProps) => {
  return (
    <p className={props.gradientColor ? "gradient-text" : ""}>
      {props.children}
    </p>
  );
};
