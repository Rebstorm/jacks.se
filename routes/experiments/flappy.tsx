import { PageProps } from "$fresh/server.ts";
import GameWindow from "../../islands/flappy/GameWindow.tsx";
import { Head } from "$fresh/runtime.ts";
import { getCSSPathPrefix } from "../../utils/css/pathPrefix.ts";

export default function Home(props: PageProps) {
  const pathPrefix = getCSSPathPrefix(props.url.pathname);

  return (
    <>
      <Head>
        <link rel="preload" href={`${pathPrefix}css/flappy.css`} as="style" />
        <link rel="stylesheet" href={`${pathPrefix}css/flappy.css`} />
      </Head>
      <GameWindow />
    </>
  );
}
