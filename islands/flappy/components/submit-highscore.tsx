import { FunctionalComponent, h } from "preact";
import { FunInput } from "./fun-input.tsx";
import { useState } from "preact/hooks";
import { H3 } from "../../../components/h3.tsx";
import { HighscoreUser } from "../../../server/highscore/highscore.ts";
import { H2 } from "../../../components/h2.tsx";

interface SubmitHighscoreProps {
  score: number;
  onClosed: (newHighScorelist: HighscoreUser[]) => void;
}
export const SubmitHighscore: FunctionalComponent = (
  props: SubmitHighscoreProps
) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);

  const postHighScoreMaybe = async (user: HighscoreUser) => {
    const response = await fetch("/api/highscore/", {
      method: "POST",
      body: JSON.stringify(user),
    });

    const { isNewhighscore = [] as HighscoreUser[] } = await response.json();

    if (Array.isArray(isNewhighscore) && isNewhighscore.length > 1) {
      console.log("should update the highscore list.");
      props.onClosed(isNewhighscore);
    }
  };

  const classNames = `
  ${close ? "close" : ""}`;

  return (
    <div className={`highscore-window ${classNames}`}>
      <H2>You made the highscore!</H2>
      <FunInput
        label={"Your Name"}
        onValueChange={(value: string) => setName(value)}
      />
      <button
        disabled={loading}
        className={"funButton"}
        onClick={async () => {
          setLoading(true);
          await postHighScoreMaybe({ username: name, score: props.score });
          setLoading(false);
          setClose(true);
        }}
      >
        Submit score
      </button>
    </div>
  );
};
