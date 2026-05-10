import { HandlerContext, PageProps } from "fresh";
import BatteryRush from "../../islands/BatteryRush/index.tsx";
import { Head } from "fresh/runtime";
import {
  getHighscore,
  HighscoreUser,
} from "../../server/highscore/highscore.ts";
import { TITLE } from "../../constants/meta.ts";

export default function Home(props: PageProps<HighscoreUser[]>) {
  return (
    <div className={"center"}>
      <Head>
        <title>Battery Rush | {TITLE}</title>
      </Head>
      <BatteryRush />
    </div>
  );
}

export const handler = {
  async GET(ctx: HandlerContext) {
    const highScore = await getHighscore();
    return { data: highScore };
  },
};
