import { PageProps } from "$fresh/server.ts";
import { H1 } from "../../components/h1.tsx";
import { Paragraph } from "../../components/paragraph.tsx";
import { H2 } from "../../components/h2.tsx";

export default function Info(props: PageProps) {
  return (
    <div class={"innerContainer"}>
      <H1 gradientColor>Experiments</H1>
      <Paragraph>
        <a href={"./experiments/flappy"}>Flappy</a>
      </Paragraph>
    </div>
  );
}
