import { AppProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
import Footer from "../islands/Footer.tsx";

function getCSSPathPrefix(route: string) {
  // Split the path string by "/"
  const segments = route.split("/");
  // Filter out empty segments and segments that are parameterized (like ":slug")
  const actualSegments = segments.filter(
    (segment) => segment && !segment.startsWith(":")
  );
  // The number of '../' needed is the same as the number of actual segments for nested paths
  return actualSegments.length ? "../".repeat(actualSegments.length) : "./";
}

export default function App({ Component, route, ...rest }: AppProps) {
  // I dont know if Fresh supports plain css right now. But this ensures we get the base css no matter where in the app
  // we are.
  const pathPrefix = getCSSPathPrefix(route);

  return (
    <html lang={"en"}>
      <head>
        <meta charSet="utf-8" />
        <title>🫠</title>
        <meta name="Pauls Dev Page. Add salt for saltiness." />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0" />

        <link rel="preload" href={`${pathPrefix}base.css`} as="style" />

        <link rel="stylesheet" href={`${pathPrefix}base.css`} />
      </head>
      <body>
        <div className={"overflow-hidden"}>
          <svg
            class="wave"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -50 2000 130"
          >
            <path
              fill="var(--background-contrast)"
              d="M0,50 C500,-50 500,150 1000,50 C1500,-50 1500,150 2000,50 V100 H0 Z"
            ></path>
          </svg>
        </div>
        <Header route={route} />
        <div class={"container"}>
          <Component />
        </div>
        <Footer />
      </body>
    </html>
  );
}
