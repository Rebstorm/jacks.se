/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Header from "../islands/Header.tsx";
import Content from "../islands/Content.tsx";
import Footer from "../islands/Footer.tsx";
import { PageProps } from "$fresh/server.ts";

export default function Info(props: PageProps) {
  return (
    <div>
      <Header route={props.route} />
      <div className={tw`p-4 mx-auto max-w-screen-lg`}>
        <Content content={"I am content"}></Content>
      </div>
      <Footer />
    </div>
  );
}
