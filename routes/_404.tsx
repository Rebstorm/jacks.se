import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import { Paragraph } from "../components/paragraph.tsx";
import { getCSSPathPrefix } from "../utils/css/pathPrefix.ts";
import { H2 } from "../components/h2.tsx";

export default function NotFoundPage({ url, ...rest }: PageProps) {
  const pathPrefix = getCSSPathPrefix(url.pathname);

  return (
    <div className={"innerContainer center"}>
      <Head>
        <link rel="preload" href={`${pathPrefix}css/404.css`} as="style" />
        <link rel="stylesheet" href={`${pathPrefix}css/404.css`} />
      </Head>
      <H2 gradientColor>404 not found: {url.pathname}</H2>
    </div>
  );
}
