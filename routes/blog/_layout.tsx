import { LayoutProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { TITLE } from "../../constants/meta.ts";

export default function Layout({ Component, state }: LayoutProps) {
  // do something with state here
  return (
    <>
      <Head>
        <title>Blog | {TITLE}</title>
      </Head>
      <Component />
    </>
  );
}
