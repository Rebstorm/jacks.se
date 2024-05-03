import {PageProps} from "$fresh/server.ts";
import {Head} from "$fresh/runtime.ts";
import {getCSSPathPrefix} from "../../utils/css/pathPrefix.ts";
import {TITLE} from "../../constants/meta.ts";

export default function Layout({ Component, state, ...rest }: PageProps) {
  const pathPrefix = getCSSPathPrefix(rest.url.pathname);

  return (
    <>
      <Head>
        <link
          rel="preload"
          href={`${pathPrefix}css/experiments.css`}
          as="style"
        />
        <link rel="stylesheet" href={`${pathPrefix}css/experiments.css`} />
        <title> Experiments | {TITLE}</title>
      </Head>
      <Component />
    </>
  );
}
