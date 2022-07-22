/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Menu } from "../islands/Menu.tsx";
import Content from "../islands/Content.tsx";
import Footer from "../islands/Footer.tsx";
import Header from "../islands/Header.tsx";

export default function Home() {
  return (
    <div class={tw``}>
      <Header />
      <div class={tw`p-4 mx-auto max-w-screen-lg`}>
        <Menu />
        <Content content={"I am content"}></Content>
      </div>
      <Footer />
    </div>
  );
}
