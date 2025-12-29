import { FreshContext } from "fresh";
import {
  HighscoreResponse,
  HighscoreUser,
  maybeSetHighscore,
} from "../../../server/highscore/highscore.ts";
import { Handlers } from "fresh/compat";

export const handler: Handlers = {
  async POST(_ctx: FreshContext) {
    const req = ctx.req;
    const res: HighscoreUser = await req.json();

    const response = await maybeSetHighscore(res, _ctx);
    return new Response(JSON.stringify({
      isNewHighscore: response.highscores,
      error: response.error,
    }));
  },
};
