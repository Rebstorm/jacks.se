import {HandlerContext, PageProps} from "$fresh/server.ts";
import GameWindow from "../../islands/Flappy/GameWindowProps.tsx";
import {asset, Head} from "$fresh/runtime.ts";
import {getHighscore, HighscoreUser,} from "../../server/highscore/highscore.ts";
import {TITLE} from "../../constants/meta.ts";

export default function Home(props: PageProps<HighscoreUser[]>) {

    return (
        <>
            <Head>
                <link rel="preload" href={asset('/css/flappy.css')} as="style"/>
                <link rel="stylesheet" href={asset('/css/flappy.css')}/>

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