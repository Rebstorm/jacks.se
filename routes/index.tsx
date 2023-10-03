import { PageProps } from "$fresh/server.ts";
import { Paragraph } from "../components/paragraph.tsx";
import { H1 } from "../components/h1.tsx";

export default function Home(props: PageProps) {
  return (
    <div class={"innerContainer"}>
      <H1>Hello, I'm Paul. I code things.</H1>
      <Paragraph>
        Yes, you read that right. But not just anything - I craft digital
        marvels using TypeScript and Rust, because, you know, who does'’t enjoy
        a bit of type safety and performance efficiency in their life?
      </Paragraph>
      <Paragraph>
        When I’m not not bashing my head against the keyboard (also known as my
        coding environment), you might find me on my bike, or possibly,
        indulging in my slightly sarcastic demeanor, which you’ve probably not
        noticed yet. Welcome to my slice of the internet - enjoy your stay, and
        try not to break anything, I’ve recently refactored.
      </Paragraph>
    </div>
  );
}
