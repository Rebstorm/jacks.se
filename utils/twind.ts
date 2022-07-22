import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";

export const config: Configuration = {
  darkMode: "class",
  mode: "silent",

  theme: {
    extend: {
      fontFamily: {
        sans: "'Patrick Hand SC', sans-serif",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  /* This messes with the SSR - TODO: Fix.
  preflight: {
    // Import external stylesheet
    "@import": `url('https://fonts.googleapis.com/css2?family=Patrick+Hand+SC&display=swap'')`,
    // Declare font face
    "@font-face": [
      {
        fontFamily: "Patrick Hand SC",
        fontWeight: "400",
        src: "url(https://fonts.gstatic.com/s/patrickhandsc/v13/0nkwC9f7MfsBiWcLtY65AWDK873ljiK7.woff2) format('woff2');",
      },
    ],
  },
   */
};
if (IS_BROWSER) setup(config);
