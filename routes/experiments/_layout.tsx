import { PageProps } from "fresh";
import { asset, Head } from "fresh/runtime";
import { TITLE } from "../../constants/meta.ts";

export default function Layout({ Component, state, ...rest }: PageProps) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href={asset("/css/experiments.css")}
          as="style"
        />
        <link rel="stylesheet" href={asset("/css/experiments.css")} />
        <title key={TITLE}>Experiments | {TITLE}</title>
      </Head>
      <Component />
    </>
  );
}
