import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { H1 } from "../../components/h1.tsx";
import { Paragraph } from "../../components/paragraph.tsx";
import { getCSSPathPrefix } from "../../utils/css/pathPrefix.ts";

export default function Info(props: PageProps) {
  const pathPrefix = getCSSPathPrefix(props.url.pathname);

  return (
    <>
      <Head>
        <link
          rel="preload"
          href={`${pathPrefix}css/experiments.css`}
          as="style"
        />
        <link rel="stylesheet" href={`${pathPrefix}css/experiments.css`} />
      </Head>
      <div class={"innerContainer"}>
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
      </div>
    </>
  );
}
