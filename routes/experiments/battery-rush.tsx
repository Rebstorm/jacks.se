import {HandlerContext, PageProps} from "$fresh/server.ts";
import BatteryRush from "../../islands/BatteryRush/index.tsx";
import {asset, Head} from "$fresh/runtime.ts";
import {getHighscore, HighscoreUser,} from "../../server/highscore/highscore.ts";
import {TITLE} from "../../constants/meta.ts";

export default function Home(props: PageProps<HighscoreUser[]>) {

    return (
        <div className={'center'}>
            <Head>
                <link rel="preload" href={asset('/css/flappy.css')} as="style"/>
                <link rel="stylesheet" href={asset('/css/flappy.css')}/>

                <link rel="preload" href={asset('/css/battery-rush.css')} as="style"/>
                <link rel="stylesheet" href={asset('/css/battery-rush.css')}/>

                <title>Battery Rush | {TITLE}</title>
            </Head>
            <BatteryRush />
        </div>
    );
}

export const handler = {
    async GET(_req: Request, ctx: HandlerContext) {
        const highScore = await getHighscore();
        return ctx.render(highScore);
    },
};