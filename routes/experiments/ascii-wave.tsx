import { Head } from "fresh/runtime";
import { H1 } from "@/components/h1.tsx";
import { Paragraph } from "@/components/paragraph.tsx";
import AsciiWave from "@/islands/AsciiWave/index.tsx";
import { TITLE } from "../../constants/meta.ts";

export default function AsciiWavePage() {
  return (
    <>
      <Head>
        <title>ASCII Wave | {TITLE}</title>
      </Head>
      <AsciiWave />
      <H1 animate gradientColor>ASCII Wave</H1>
      <Paragraph>
        The site wave, but made of characters 🌊. Hover over it and it bulges
        away from your cursor. No canvas, no WebGL, just a{" "}
        <code>&lt;pre&gt;</code> getting its text replaced 30 times a second.
      </Paragraph>
    </>
  );
}
