import { PageProps } from "$fresh/server.ts";
import GameWindow from "../../islands/flappy/GameWindow.tsx";

export default function Home(props: PageProps) {
  return (
    <>
      <GameWindow />
    </>
  );
}
