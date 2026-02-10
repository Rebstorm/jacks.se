import { PageProps } from "fresh";
import { asset, Head } from "fresh/runtime";
import { TITLE } from "../../constants/meta.ts";

export default function Layout({ Component, state, ...rest }: PageProps) {
  return (
    <>
      <Head>
        <title>CV | {TITLE}</title>
        <link
          rel="preload"
          href={asset("/css/cv.css")}
          as="style"
        />
        <link rel="stylesheet" href={asset("/css/cv.css")} />
      </Head>
      <Component />
    </>
  );
}
