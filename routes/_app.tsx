import { AppProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Wave from "../components/wave.tsx";
import Footer from "../islands/Footer.tsx";
import FontLink from "../components/fontLink.tsx";

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

        <FontLink />

        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
          />
        </noscript>

        <link rel="preload" href={`${pathPrefix}base.css`} as="style" />

        <link rel="stylesheet" href={`${pathPrefix}base.css`} />
      </head>
      <body>
        <Wave />
        <div f-client-nav className={"portal"}>
          <Header route={route} />
          <div class={"container"}>
            <Partial name="main">
              <Component />
            </Partial>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
