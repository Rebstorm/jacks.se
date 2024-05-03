import {HandlerContext, PageProps} from "$fresh/server.ts";
import GameWindow from "../../islands/flappy/GameWindowProps.tsx";
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
        <>
            <Head>
                <link rel="preload" href={`${pathPrefix}css/flappy.css`} as="style"/>
                <link rel="stylesheet" href={`${pathPrefix}css/flappy.css`}/>

                <title>Flappy | {TITLE}</title>
            </Head>
            <GameWindow highscores={props.data}/>
        </>
    );
}

export const handler = {
    async GET(_req: Request, ctx: HandlerContext) {
        const highScore = await getHighscore();
        return ctx.render(highScore);
    },
};
