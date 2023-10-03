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
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href={`${pathPrefix}base.css`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;700&display=swap"
          rel="stylesheet"
        />
        <title>jacks.se</title>
      </head>
      <body>
        <Header route={route} />
        <div class={"container"}>
          <Component />
        </div>
        <Footer />
      </body>
    </html>
  );
}
