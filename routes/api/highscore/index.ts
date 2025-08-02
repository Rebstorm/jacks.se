import { FreshContext, Handlers } from "$fresh/server.ts";
import {
  HighscoreUser,
  HighscoreResponse,
  maybeSetHighscore,
} from "../../../server/highscore/highscore.ts";

export const handler: Handlers = {
  async POST(req: Request, _ctx: FreshContext) {
    const res: HighscoreUser = await req.json();

    const response = await maybeSetHighscore(res, _ctx);
    return new Response(JSON.stringify({ 
      isNewHighscore: response.highscores,
      error: response.error
    }));
  },
};