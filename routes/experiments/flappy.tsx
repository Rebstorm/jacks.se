import { HandlerContext, PageProps } from "fresh";
import GameWindow from "../../islands/Flappy/GameWindowProps.tsx";
import { Head } from "fresh/runtime";
import {
  getHighscore,
  HighscoreUser,
} from "../../server/highscore/highscore.ts";
import { TITLE } from "../../constants/meta.ts";

export default function Home(props: PageProps<HighscoreUser[]>) {
  return (
    <>
      <Head>
        <title>Flappy | {TITLE}</title>
      </Head>
      <GameWindow highscores={props.data} />
    </>
  );
}

export const handler = {
  async GET(ctx: HandlerContext) {
    const highScore = await getHighscore();
    return { data: highScore };
  },
};
