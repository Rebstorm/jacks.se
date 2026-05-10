import { PageProps } from "fresh";
import { Head } from "fresh/runtime";
import GravityGame from "../../islands/Gravity/GravityGame.tsx";
import { TITLE } from "../../constants/meta.ts";

export default function GravityPage(_props: PageProps) {
  return (
    <>
      <Head>
        <title>Obstacle Course | {TITLE}</title>
      </Head>
      <GravityGame />
    </>
  );
}
