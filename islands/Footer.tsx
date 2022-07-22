/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

const container = `
flex flex-row justify-center
p-12`;

export const Footer = () => {
  return <div class={tw`${container}`}>I am footer</div>;
};

export default Footer;
