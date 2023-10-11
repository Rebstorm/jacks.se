import { ComponentChildren } from "preact";

interface ParagraphProps {
  children?: ComponentChildren;
}
export const Paragraph = (props: ParagraphProps) => {
  return <p>{props.children}</p>;
};
