import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getCSSPathPrefix } from "../../utils/css/pathPrefix.ts";
import { TITLE } from "../../constants/meta.ts";
import { H2 } from "../../components/h2.tsx";

export default function Home(props: PageProps) {
  const pathPrefix = getCSSPathPrefix(props.url.pathname);

  let screenSize = "";

  return (
    <>
      <Head>
        <link rel="preload" href={`${pathPrefix}css/grid.css`} as="style" />
        <link rel="stylesheet" href={`${pathPrefix}css/grid.css`} />

        <title> Grid Growth & Minifying | {TITLE}</title>
      </Head>

      <div className={"playground"}>
        <H2 gradientColor>Grid</H2>

        <div
          onClick={() => {
            console.log("licked");
            screenSize = "big";
          }}
        >
          Expand 200px
        </div>
        <div className={`container-restrictive ${screenSize}`}>
          <div className="grid-container-expansive">
            <div className="grid-item-expansive">Static Content (150px) #1</div>
            <div className="grid-item-expansive">Static Content (150px) #2</div>
            <div className="grid-item-expansive">Static Content (150px) #3</div>
            <div className="grid-item-expansive">Static Content (150px) #4</div>
            <div className="grid-item-expansive">Static Content (150px) #5</div>
            <div className="grid-item-expansive">Static Content (150px) #6</div>
            <div className="grid-item-expansive">Static Content (150px) #7</div>
            <div className="grid-item-expansive">Static Content (150px) #8</div>
            <div className="grid-item-expansive">Static Content (150px) #9</div>
            <div className="grid-item-expansive">
              Static Content (150px) #10
            </div>
            <div className="grid-item-expansive">
              Static Content (150px) #11
            </div>
            <div className="grid-item-expansive">
              Static Content (150px) #12
            </div>
            <div className="grid-item-expansive">
              Static Content (150px) #13
            </div>
            <div className="grid-item-expansive">
              Static Content (150px) #14
            </div>
            <div className="grid-item-expansive">
              Static Content (150px) #15
            </div>
            <div className="grid-item-expansive">
              Static Content (150px) #16
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
