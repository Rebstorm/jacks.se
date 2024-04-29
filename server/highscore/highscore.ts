import { HandlerContext } from "$fresh/server.ts";
import { HIGHSCORE_DB_NAME } from "../../constants/kv.ts";
import { badwords } from "./censorship/badwords.ts";

export interface HighscoreUser {
  username: string;
  score: number;
  ip?: string;
}

const kv = await Deno.openKv();

export async function getHighscore(): Promise<HighscoreUser[]> {
  const list = await kv.list({ prefix: [HIGHSCORE_DB_NAME] });
  const players = [];
  for await (const res of list) {
    players.push(res.value as HighscoreUser);
  }
  return players;
}

export async function maybeSetHighscore(
  user: HighscoreUser,
  ctx: HandlerContext
): Promise<HighscoreUser[]> {
  const currentHighScores = await getHighscore();

  if (user.username.length > 20) {
    user.username = user.username.substring(0, 17) + "...";
  }

  if (user.username === "") user.username = "Anonymous";

  if (checkForBadWords(user.username)) {
    console.group("--- Bad user ---");
    console.info("Some one tried to use a bad name:", user.username);
    console.info(ctx);
    console.groupEnd();
    return [];
  }

  // If there are less than 10 scores, or if the user's score is higher than the lowest score in the list
  if (
    currentHighScores.length < 10 ||
    user.score > currentHighScores[currentHighScores.length - 1].score
  ) {
    // set their remote addr
    user.ip = `${ctx.remoteAddr.hostname}:${ctx.remoteAddr.port}`;

    // Insert the new user score sorted into the array by score descending
    currentHighScores.push(user);
    currentHighScores.sort((a, b) => b.score - a.score);

    // Keep only the top 10 scores if the length exceeds 10
    if (currentHighScores.length > 10) {
      currentHighScores.length = 10;
    }

    const result = await updateHighScores(currentHighScores);

    // Update the high scores in the database
    return result;
  }

  return [];
}

async function updateHighScores(
  highScores: HighscoreUser[]
): Promise<HighscoreUser[]> {
  // Assuming you can set the entire list (this depends on how your database and kv variable are set up):

  highScores.map(async (highScore, index) => {
    await kv.set([HIGHSCORE_DB_NAME, index], highScore);
  });

  return highScores;
}

const checkForBadWords = (maybeBadWord: string): boolean => {
  // Normalize the input to lowercase
  const normalizedInput = maybeBadWord.toLowerCase();

  // Check if the input contains any of the bad words
  for (const badWord of badwords) {
    if (normalizedInput.includes(badWord.toLowerCase())) {
      return true; // Bad word found
    }
  }

  return false; // No bad words found
};
