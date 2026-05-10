import { PageProps } from "fresh";
import { Head } from "fresh/runtime";
import { TITLE } from "../../constants/meta.ts";

export default function Layout({ Component, state, ...rest }: PageProps) {
  return (
    <>
      <Head>
        <title>CV | {TITLE}</title>
      </Head>
      <Component />
    </>
  );
}
