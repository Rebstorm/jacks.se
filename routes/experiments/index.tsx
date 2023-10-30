import { PageProps } from "$fresh/server.ts";
import { H1 } from "../../components/h1.tsx";
import { Paragraph } from "../../components/paragraph.tsx";
import { getCSSPathPrefix } from "../../utils/css/pathPrefix.ts";

export default function Info(props: PageProps) {
  return (
    <>
      <H1 gradientColor>Experiments</H1>
      <Paragraph>
        <div className={"grid"}>
          <div className={"grid-item"}>
            <a href={"./experiments/flappy"}>
              <img width={128} src={"./experiments/flappy/drone.png"} />
            </a>
            <a href={"./experiments/flappy"}>Flappy</a>
          </div>
        </div>
      </Paragraph>
    </>
  );
}
