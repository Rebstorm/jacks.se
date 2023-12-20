import { PageProps } from "$fresh/server.ts";
import { H1 } from "../../components/h1.tsx";

export default function Info(props: PageProps) {
  return (
    <>
      <H1 animate gradientColor>
        Experiments
      </H1>

      <div className={"grid"}>
        <div className={"grid-item"}>
          <a href={"./experiments/flappy"}>
            <img width={128} src={"./experiments/flappy/drone.png"} />
          </a>
          <a href={"./experiments/flappy"}>Flappy</a>
        </div>
      </div>
    </>
  );
}
