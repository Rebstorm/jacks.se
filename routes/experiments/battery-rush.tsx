import {HandlerContext, PageProps} from "$fresh/server.ts";
import BatteryRush from "../../islands/BatteryRush/index.tsx";
import {Head} from "$fresh/runtime.ts";
import {getCSSPathPrefix} from "../../utils/css/pathPrefix.ts";
import {
    getHighscore,
    HighscoreUser,
} from "../../server/highscore/highscore.ts";
import {TITLE} from "../../constants/meta.ts";

export default function Home(props: PageProps<HighscoreUser[]>) {
    const pathPrefix = getCSSPathPrefix(props.url.pathname);

    return (
        <div className={'center'}>
            <Head>
                <link rel="preload" href={`${pathPrefix}css/flappy.css`} as="style"/>
                <link rel="stylesheet" href={`${pathPrefix}css/flappy.css`}/>

                <link rel="preload" href={`${pathPrefix}css/battery-rush.css`} as="style"/>
                <link rel="stylesheet" href={`${pathPrefix}css/battery-rush.css`}/>

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
