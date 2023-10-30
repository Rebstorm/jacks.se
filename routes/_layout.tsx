import { LayoutProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { TITLE } from "../constants/meta.ts";

export default function Layout({ Component }: LayoutProps) {
  // do something with state here
  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <div className={"innerContainer"}>
        <Component />
      </div>
    </>
  );
}
