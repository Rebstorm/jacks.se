/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

const container = `
flex flex-row justify-center
p-0.5 m-0.5`;

const item = `
hover:animate-wiggle
flex flex-row
p-2 m-0.5
transition-all
hover:cursor-pointer hover:underline to-pink-500 hover:blur-lg
`;

export interface MenuProps {
  route: string;
}
export const Menu = (props: MenuProps) => {
  const navigatedToInfo = props.route === "/info";

  return (
    <div class={tw`${container}`}>
      <div class={tw`${item}`}>
        {!navigatedToInfo ? (
          <a href={"info"}>
            <img
              src={"info.png"}
              height={64}
              width={64}
              alt={"Information"}
            ></img>
          </a>
        ) : (
          <a href={".."}>
            <img
              src={"left-arrow.png"}
              height={64}
              width={64}
              alt={"Go back"}
            ></img>
          </a>
        )}
      </div>
      <div class={tw`${item}`}>
        <a target={"_blank"} href={"https://github.com/Rebstorm"}>
          <img
            src={"github.png"}
            height={64}
            width={64}
            alt={"Github Logo"}
          ></img>
        </a>
      </div>
      <div className={tw`${item}`}>
        <a target={"_blank"} href={"https://twitter.com/rebstorm"}>
          <img
            src={"twitter.png"}
            height={64}
            width={64}
            alt={"Twitter Logo"}
          ></img>
        </a>
      </div>
    </div>
  );
};

export default Menu;
