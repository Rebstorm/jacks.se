import { HandlerContext, PageProps } from "fresh";
import BatteryRush from "../../islands/BatteryRush/index.tsx";
import { asset, Head } from "fresh/runtime";
import {
  getHighscore,
  HighscoreUser,
} from "../../server/highscore/highscore.ts";
import { TITLE } from "../../constants/meta.ts";

export default function Home(props: PageProps<HighscoreUser[]>) {
  return (
    <div className={"center"}>
      <Head>
        <link rel="preload" href={asset("/css/flappy.css")} as="style" />
        <link rel="stylesheet" href={asset("/css/flappy.css")} />

        <link rel="preload" href={asset("/css/battery-rush.css")} as="style" />
        <link rel="stylesheet" href={asset("/css/battery-rush.css")} />

        <title>Battery Rush | {TITLE}</title>
      </Head>
      <BatteryRush />
    </div>
  );
}

export const handler = {
  async GET(ctx: HandlerContext) {
    const highScore = await getHighscore();
    return { data: highScore};
  },
};
