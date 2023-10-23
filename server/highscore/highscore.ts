import { HIGHSCORE_DB_NAME } from "../../constants/kv.ts";

interface HighScore {
  players: Array<HighscoreUser>;
}

export interface HighscoreUser {
  username: string;
  score: number;
}

const kv = await Deno.openKv();

export async function getHighscore() {
  const list = await kv.list({ prefix: [HIGHSCORE_DB_NAME] });
  const players = [];
  for await (const res of list) {
    players.push(res.value as HighscoreUser);
  }
  return players;
}

export async function setHighscore(user: HighscoreUser[]) {}
