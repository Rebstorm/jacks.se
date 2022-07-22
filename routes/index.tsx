/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Content from "../islands/Content.tsx";
import Footer from "../islands/Footer.tsx";
import Header from "../islands/Header.tsx";
import { PageProps } from "$fresh/server.ts";

const homeContent: string[] = Array.of(
  "Welcome.",
  "I am Paul.",
  "I like the web."
);

export default function Home(props: PageProps) {
  return (
    <div class={tw``}>
      <Header route={props.route} />
      <div class={tw`p-4 mx-auto max-w-screen-lg`}>
        {homeContent.map((item) => (
          <Content content={item}></Content>
        ))}
      </div>
      <Footer />
    </div>
  );
}
