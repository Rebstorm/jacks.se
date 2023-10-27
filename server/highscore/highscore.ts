import { HIGHSCORE_DB_NAME } from "../../constants/kv.ts";

export interface HighscoreUser {
  username: string;
  score: number;
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
  user: HighscoreUser
): Promise<HighscoreUser[]> {
  const currentHighScores = await getHighscore();

  if (user.username.length > 10) {
    user.username = user.username.substring(0, 7) + "...";
  }

  // If there are less than 10 scores, or if the user's score is higher than the lowest score in the list
  if (
    currentHighScores.length < 10 ||
    user.score > currentHighScores[currentHighScores.length - 1].score
  ) {
    // Insert the new user score sorted into the array by score descending
    currentHighScores.push(user);
    currentHighScores.sort((a, b) => b.score - a.score);

    // Keep only the top 10 scores if the length exceeds 10
    if (currentHighScores.length > 10) {
      currentHighScores.length = 10;
    }

    // Update the high scores in the database
    return await updateHighScores(currentHighScores);
  }

  return [];
}

async function updateHighScores(
  highScores: HighscoreUser[]
): Promise<HighscoreUser[]> {
  // Assuming you can set the entire list (this depends on how your database and kv variable are set up):

  highScores.map(async (highScore, index) => {
    await kv.set([HIGHSCORE_DB_NAME, index + 1], highScore);
  });

  return highScores;
}
