import { LayoutProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getCSSPathPrefix } from "../../utils/css/pathPrefix.ts";

export default function Layout({ Component, state, ...rest }: LayoutProps) {
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
      </Head>
      <Component />
    </>
  );
}
