import {PageProps} from "$fresh/server.ts";
import {asset, Head} from "$fresh/runtime.ts";
import {H2} from "../components/h2.tsx";

export default function NotFoundPage({ url, ..._rest }: PageProps) {
  const notFoundLink = url?.pathname.split("/")[1];

  return (
      <div className={"center"}>
          <Head>
              <link rel="preload" href={`${asset('/css/404.css')}`} as="style"/>
              <link rel="stylesheet" href={`${asset('/css/404.css')}`}/>
          </Head>

          <div className="duck-wrap" aria-hidden="true" title="404 duck">
              <svg className="duck" width="160" height="160" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
                   role="img">
                  <title>Comically dumb duck</title>
                  <ellipse cx="100" cy="175" rx="46" ry="10" fill="#000" opacity="0.08"/>

                  <ellipse cx="110" cy="120" rx="60" ry="45" fill="#ffd85a" stroke="#e0a600" stroke-width="4"/>

                  <ellipse cx="125" cy="120" rx="28" ry="18" fill="#ffc93a" stroke="#e0a600" stroke-width="3"/>
                  <path d="M108 120 q16 6 30 0" fill="none" stroke="#e0a600" stroke-width="3" opacity="0.55"/>

                  <path d="M165 120 l28 -10 l-14 20 z" fill="#ffd85a" stroke="#e0a600" stroke-width="4"/>

                  <path d="M88 110 q-18 -10 -12 -28 q6 -18 32 -10" fill="#ffd85a" stroke="#e0a600" stroke-width="4"/>

                  <circle cx="102" cy="70" r="30" fill="#ffd85a" stroke="#e0a600" stroke-width="4"/>

                  <path d="M120 75 q24 2 26 10 q-16 12 -37 6" fill="#ffa24d" stroke="#c86a1b" stroke-width="4"/>
                  <path d="M118 72 q18 -6 26 4" fill="none" stroke="#c86a1b" stroke-width="3"/>

                  <circle cx="92" cy="64" r="7.5" fill="#fff" stroke="#222" stroke-width="3"/>
                  <circle cx="107" cy="60" r="7.5" fill="#fff" stroke="#222" stroke-width="3"/>
                  <circle cx="95" cy="66" r="3.5" fill="#222"/>
                  <circle cx="104" cy="62" r="3.5" fill="#222"/>

                  <path d="M83 54 q9 -8 20 -2" fill="none" stroke="#222" stroke-width="3" opacity="0.7"/>
                  <path d="M100 49 q8 2 14 8" fill="none" stroke="#222" stroke-width="3" opacity="0.6"/>

                  <path d="M97 38 q-4 -10 6 -14 q-2 8 4 12" fill="none" stroke="#e0a600" stroke-width="3"
                        stroke-linecap="round"/>

                  <path d="M82 160 q8 6 18 0" fill="#ff9e3d" stroke="#c86a1b" stroke-width="4"/>
                  <path d="M112 160 q8 6 18 0" fill="#ff9e3d" stroke="#c86a1b" stroke-width="4"/>
              </svg>
          </div>

          <H2 gradientColor>404 not found: {notFoundLink}</H2>
      </div>
  );
}