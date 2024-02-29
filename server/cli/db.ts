// 1. Set an the env key in your CLI.
// 2. start open kv.
// 3. Do the shit you need to.

import { HIGHSCORE_DB_NAME } from "../../constants/kv.ts";
import { HighscoreUser } from "../highscore/highscore.ts";

const kv = await Deno.openKv(
  "https://api.deno.com/databases/96006ea1-79ab-49f2-a9c3-a7bcbea56c30/connect"
);

// List highscore
const list = await kv.list({ prefix: [HIGHSCORE_DB_NAME] });
const users: HighscoreUser[] = [];
for await (const res of list) {
  users.push(res.value as HighscoreUser);
}

// Delete.
/*
users.map(async (user, index) => {
  if (user.username.toLocaleLowerCase().indexOf("cap") > -1) {
    //await kv.delete([HIGHSCORE_DB_NAME, index + 1]);
    console.log("deleted", user);
  }
});

/*
// modify
user.map(async (user, index) => {
  if (user.username.length > 10) {
    user.username = user.username.substring(0, 7) + "...";
  }
  await kv.set([HIGHSCORE_DB_NAME, index + 1], user);
});
*/

/*
// RESET SCRIPTS.
await kv.set([HIGHSCORE_DB_NAME, 3], {
  username: "-",
  score: 0,
  ip: "modifed by master",
} as HighscoreUser);

// Reset the entire board.
Array(10).map((value, index) => {
  await kv.set([HIGHSCORE_DB_NAME, index], {
    username: "-",
    score: 0,
    ip: "modifed by master",
  } as HighscoreUser);
})
*/
