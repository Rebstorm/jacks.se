import { FunctionalComponent } from "preact";
import { FunInput } from "./fun-input.tsx";
import { useState } from "preact/hooks";
import { HighscoreUser } from "../../../server/highscore/highscore.ts";
import { H2 } from "../../../components/h2.tsx";

interface SubmitHighscoreProps {
  score: number;
  onClosed: (newHighScorelist: HighscoreUser[]) => void;
}
export const SubmitHighscore: FunctionalComponent<SubmitHighscoreProps> = (
  props: SubmitHighscoreProps
) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const postHighScoreMaybe = async (user: HighscoreUser) => {
    setError(undefined);
    const response = await fetch("/api/highscore/", {
      method: "POST",
      body: JSON.stringify(user),
    });

    const { isNewHighscore = [] as HighscoreUser[], error } = await response.json();
    
    if (error) {
      setError(error);
      return false;
    }
      
    if (Array.isArray(isNewHighscore) && isNewHighscore.length > 1) {
      props.onClosed(isNewHighscore);
      return true;
    }
    
    return false;
  };

  const classNames = `
  ${close ? "close" : ""}`;

  return (
    <div className={`highscore-window ${classNames}`}>
      <H2>You made the highscore!</H2>
      <FunInput
        label="Your Name"
        onValueChange={(value: string) => setName(value)}
      />
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <button
        disabled={loading}
        className="funButton"
        onClick={async () => {
          setLoading(true);
          const success = await postHighScoreMaybe({ username: name, score: props.score });
          setLoading(false);
          if (success) {
            setClose(true);
          }
        }}
      >
        Submit score
      </button>
    </div>
  );
};