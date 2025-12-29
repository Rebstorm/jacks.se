import { PageProps } from "fresh";
import { Head } from "fresh/runtime";
import { TITLE } from "../../constants/meta.ts";

export default function Layout({ Component, state }: PageProps) {
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
