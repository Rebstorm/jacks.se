import { AppProps } from "$fresh/server.ts";
import { Partial, Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Wave from "../components/wave.tsx";
import Footer from "../islands/Footer.tsx";
import FontLink from "../components/font-link.tsx";
import {
  META_IMAGE,
  META_SITE,
  META_TITLE,
  META_TYPE,
} from "../constants/meta.ts";
import { getCSSPathPrefix } from "../utils/css/pathPrefix.ts";

export default function App({ Component, route, ...rest }: AppProps) {
  // I dont know if Fresh supports plain css right now. But this ensures we get the base css no matter where in the app
  // we are.

  const pathPrefix = getCSSPathPrefix(route);

  return (
    <html lang={"en"}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
        <meta property="og:type" content="website" key={META_TYPE} />
        <meta
          property="og:image"
          content={rest.url.href + "meta/meta_me.jpeg"}
          key={META_IMAGE}
        />
        <meta property="og:locale" content="en_US" />

        <meta
          name="description"
          content="PJ's Webpage for Experiments and Blog rants."
        />

        <meta
          property="og:site_name"
          content="Pauls Dev Page. Add salt for saltiness."
          key={META_SITE}
        />

        <FontLink />

        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
          />
        </noscript>

        <link rel="preload" href={`${pathPrefix}css/base.css`} as="style" />
        <link rel="stylesheet" href={`${pathPrefix}css/base.css`} />
      </Head>
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
