import { FunctionalComponent, h } from "preact";
import { FunInput } from "./fun-input.tsx";
import { useState } from "preact/hooks";
import { H3 } from "../../../components/h3.tsx";

interface SubmitHighscoreProps {
  score: number;
}
export const SubmitHighscore: FunctionalComponent = (
  props: SubmitHighscoreProps
) => {
  const [name, setName] = useState("");

  return (
    <div className={""}>
      <hr />
      <H3>You made the highscore!</H3>
      <FunInput onValueChange={(value: string) => setName(value)} />
      <div
        className={"funButton"}
        onClick={() => console.log(name, props.score)}
      >
        Submit score
      </div>
      <hr />
    </div>
  );
};
