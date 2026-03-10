import { PageProps } from "fresh";
import { asset, Head } from "fresh/runtime";
import GravityGame from "../../islands/Gravity/GravityGame.tsx";
import { TITLE } from "../../constants/meta.ts";

export default function GravityPage(_props: PageProps) {
  return (
    <>
      <Head>
        <link rel="preload" href={asset("/css/gravity.css")} as="style" />
        <link rel="stylesheet" href={asset("/css/gravity.css")} />
        <title>Obstacle Course | {TITLE}</title>
      </Head>
      <GravityGame />
    </>
  );
}
