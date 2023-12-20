import { H1 } from "../../../components/h1.tsx";
import { H2 } from "../../../components/h2.tsx";
import { Paragraph } from "../../../components/paragraph.tsx";
import { MouseClickIcon } from "./mouse-click-icon.tsx";
import { SpaceClickIcon } from "./space-click-icon.tsx";

export const Instructions = () => {
  return (
    <div className={"instruction-window"}>
      <div className={"instruction-headline"}>
        <H1 gradientColor animate>
          Flappy
        </H1>
      </div>
      <img className={"move"} width={128} src={"./flappy/drone.png"} />

      <div className={"instructions"}>
        <div className={"instruction"}>
          <MouseClickIcon />
          <div className={"instruction-text"}>Use your mouse to play.</div>
        </div>
        <div className={"instruction"}>
          <SpaceClickIcon />
          <div className={"instruction-text"}>Or press space.</div>
        </div>
      </div>
    </div>
  );
};
