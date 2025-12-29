import { PageProps } from "fresh";
import { H1 } from "../components/h1.tsx";
import { Paragraph } from "../components/paragraph.tsx";
import { H2 } from "../components/h2.tsx";

export default function Info(props: PageProps) {
  return (
    <div class={"innerContainer"}>
      <H1 gradientColor>What I do</H1>
      <Paragraph>
        I love the web. Anything even closely related to it captures my
        interest.
      </Paragraph>
      <Paragraph>
        I suggest checking out my current stack over at&nbsp;
        <a target={"_blank"} href={"https://github.com/Rebstorm"}>
          Github
        </a>{" "}
        as naming them all will be tedious and I havent found a better way to
        automate it past using a github profile.
      </Paragraph>

      <H2>Open source</H2>
      <Paragraph>
        Open source holds an important part of my life. I try and contribute
        to&nbsp; as many projects as I can.
      </Paragraph>

      <H2>Hopes and dreams</H2>
      <Paragraph>That rust gets a more widespread appeal. Thats it.</Paragraph>
      <H2>Credits</H2>
      <Paragraph>
        This service here was written in Deno 🦕 using Fresh 🍋. Running in Deno
        Deploy.
      </Paragraph>
    </div>
  );
}
