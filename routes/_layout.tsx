import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { TITLE } from "../constants/meta.ts";

export default function Layout({ Component }: PageProps) {
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
