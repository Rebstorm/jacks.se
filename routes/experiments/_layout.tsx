import {PageProps} from "$fresh/server.ts";
import {Head, asset} from "$fresh/runtime.ts";
import {TITLE} from "../../constants/meta.ts";

export default function Layout({ Component, state, ...rest }: PageProps) {

  return (
    <>
      <Head>
        <link
          rel="preload"
          href={asset('/css/experiments.css')}
          as="style"
        />
        <link rel="stylesheet" href={asset('/css/experiments.css')} />
        <title> Experiments | {TITLE}</title>
      </Head>
      <Component />
    </>
  );
}