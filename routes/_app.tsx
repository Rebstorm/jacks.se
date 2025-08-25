import {PageProps} from "$fresh/server.ts";
import {Head, Partial, asset} from "$fresh/runtime.ts";
import FontLink from "../components/font-link.tsx";
import {META_IMAGE, META_SITE, META_TYPE,} from "../constants/meta.ts";
import Wave from "../components/wave.tsx";
import Header from "../islands/Header.tsx";
import Footer from "../islands/Footer.tsx";

export default function App({ Component, route, ...rest }: PageProps) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
        <meta property="og:type" content="website" key={META_TYPE} />
        <meta
          property="og:image"
          content={rest.url.origin + "/meta/meta_me.jpeg"}
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

        <link rel="preload" href={`${asset('/css/base.css')}`} as="style" />
        <link rel="stylesheet" href={`${asset('/css/base.css')}`} />
      </Head>
      <body>
        <Wave />
        <div f-client-nav className={"portal"}>
          <Header route={route} />
          <section className={"container"}>
            <Partial name="main">
              <Component />
            </Partial>
          </section>
        </div>
        <Footer />
      </body>
    </html>
  );
}