import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";

export const config: Configuration = {
  darkMode: "class",
  mode: "silent",

  theme: {
    extend: {
      fontFamily: {
        sans: "'Patrick Hand', sans-serif",
      },
    },
  },
  preflight: {
    // Import external stylesheet
    "@import": `url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap'')`,
    // Declare font face
    "@font-face": [
      {
        fontFamily: "Patrick Hand",
        fontWeight: "400",
        src: "url(https://fonts.gstatic.com/s/patrickhand/v19/LDI1apSQOAYtSuYWp8ZhfYe8XsLL.woff2) format('woff2');",
      },
    ],
  },
};
if (IS_BROWSER) setup(config);
