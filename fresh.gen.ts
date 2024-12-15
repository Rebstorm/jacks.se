// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $api_highscore_index from "./routes/api/highscore/index.ts";
import * as $blog_slug_index from "./routes/blog/[slug]/index.tsx";
import * as $blog_layout from "./routes/blog/_layout.tsx";
import * as $blog_index from "./routes/blog/index.tsx";
import * as $cv_layout from "./routes/cv/_layout.tsx";
import * as $cv_g_index from "./routes/cv/g/index.tsx";
import * as $cv_p_index from "./routes/cv/p/index.tsx";
import * as $experiments_layout from "./routes/experiments/_layout.tsx";
import * as $experiments_battery_rush from "./routes/experiments/battery-rush.tsx";
import * as $experiments_flappy from "./routes/experiments/flappy.tsx";
import * as $experiments_index from "./routes/experiments/index.tsx";
import * as $index from "./routes/index.tsx";
import * as $info from "./routes/info.tsx";
import * as $BatteryRush_index from "./islands/BatteryRush/index.tsx";
import * as $Flappy_GameWindowProps from "./islands/Flappy/GameWindowProps.tsx";
import * as $Flappy_components_fun_input from "./islands/Flappy/components/fun-input.tsx";
import * as $Flappy_components_instructions from "./islands/Flappy/components/instructions.tsx";
import * as $Flappy_components_mouse_click_icon from "./islands/Flappy/components/mouse-click-icon.tsx";
import * as $Flappy_components_space_click_icon from "./islands/Flappy/components/space-click-icon.tsx";
import * as $Flappy_components_submit_highscore from "./islands/Flappy/components/submit-highscore.tsx";
import * as $Flappy_logic_collision from "./islands/Flappy/logic/collision.ts";
import * as $Flappy_logic_constants from "./islands/Flappy/logic/constants.ts";
import * as $Flappy_logic_draw from "./islands/Flappy/logic/draw.ts";
import * as $Flappy_logic_obstacles from "./islands/Flappy/logic/obstacles.ts";
import * as $Footer from "./islands/Footer.tsx";
import * as $Header from "./islands/Header.tsx";
import * as $Menu_Menu from "./islands/Menu/Menu.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/api/highscore/index.ts": $api_highscore_index,
    "./routes/blog/[slug]/index.tsx": $blog_slug_index,
    "./routes/blog/_layout.tsx": $blog_layout,
    "./routes/blog/index.tsx": $blog_index,
    "./routes/cv/_layout.tsx": $cv_layout,
    "./routes/cv/g/index.tsx": $cv_g_index,
    "./routes/cv/p/index.tsx": $cv_p_index,
    "./routes/experiments/_layout.tsx": $experiments_layout,
    "./routes/experiments/battery-rush.tsx": $experiments_battery_rush,
    "./routes/experiments/flappy.tsx": $experiments_flappy,
    "./routes/experiments/index.tsx": $experiments_index,
    "./routes/index.tsx": $index,
    "./routes/info.tsx": $info,
  },
  islands: {
    "./islands/BatteryRush/index.tsx": $BatteryRush_index,
    "./islands/Flappy/GameWindowProps.tsx": $Flappy_GameWindowProps,
    "./islands/Flappy/components/fun-input.tsx": $Flappy_components_fun_input,
    "./islands/Flappy/components/instructions.tsx":
      $Flappy_components_instructions,
    "./islands/Flappy/components/mouse-click-icon.tsx":
      $Flappy_components_mouse_click_icon,
    "./islands/Flappy/components/space-click-icon.tsx":
      $Flappy_components_space_click_icon,
    "./islands/Flappy/components/submit-highscore.tsx":
      $Flappy_components_submit_highscore,
    "./islands/Flappy/logic/collision.ts": $Flappy_logic_collision,
    "./islands/Flappy/logic/constants.ts": $Flappy_logic_constants,
    "./islands/Flappy/logic/draw.ts": $Flappy_logic_draw,
    "./islands/Flappy/logic/obstacles.ts": $Flappy_logic_obstacles,
    "./islands/Footer.tsx": $Footer,
    "./islands/Header.tsx": $Header,
    "./islands/Menu/Menu.tsx": $Menu_Menu,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
