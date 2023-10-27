import { HandlerContext, Handlers } from "$fresh/server.ts";
import {
  HighscoreUser,
  maybeSetHighscore,
} from "../../../server/highscore/highscore.ts";

export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext) {
    const res: HighscoreUser = await req.json();

    const isNewHighScore = await maybeSetHighscore(res);
    return new Response(JSON.stringify({ isNewhighscore: isNewHighScore }));
  },
};
