/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

const container = `
flex flex-row justify-center
p-12`;

export const Footer = () => {
  const date = new Date();

  return (
    <div class={tw`${container}`}>&copy; {date.getFullYear()} Paul Jacks</div>
  );
};

export default Footer;
