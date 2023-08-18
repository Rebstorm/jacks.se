import { PageProps } from "$fresh/server.ts";
import { Paragraph } from "../components/paragraph.tsx";
import { H1 } from "../components/h1.tsx";

export default function Home(props: PageProps) {
  return (
    <div class={"innerContainer"}>
      <H1>I am Paul. I am dev.</H1>
      <Paragraph>That's basically it. </Paragraph>
    </div>
  );
}
