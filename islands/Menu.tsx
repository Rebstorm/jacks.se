/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

const container = `
flex flex-row justify-center
animate-bounce
hover:cursor-pointer
rounded border-solid border-1 border-sky50 
shadow-2xl 
p-0.5 m-0.5`;

const item = `
p-0.5 m-0.5
`;

export const Menu = () => {
  return (
    <div class={tw`${container}`}>
      <div class={tw`${item}`}>
        <a href={"info"}>Info</a>
      </div>
      <div class={tw`${item}`}>Tech</div>
      <div class={tw`${item}`}>Stack</div>
    </div>
  );
};

export default Menu;
