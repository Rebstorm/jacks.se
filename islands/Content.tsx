/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export interface Content {
  content: string;
}

const container = `
text-3xl 
flex flex-row justify-center
p-0.5 m-0.5`;

export const Content = (props: Content) => {
  return <div class={tw`${container}`}> {props.content} </div>;
};

export default Content;
