import {PageProps} from "$fresh/server.ts";
import {Head} from "$fresh/runtime.ts";
import {TITLE} from "../../constants/meta.ts";
import {getCSSPathPrefix} from "../../utils/css/pathPrefix.ts";

export default function Layout({ Component, state, ...rest }: PageProps) {
    const pathPrefix = getCSSPathPrefix(rest.url.pathname);
  // do something with state here
  return (
    <>
        <Head>
            <title>CV | {TITLE}</title>
            <link
                rel="preload"
                href={`${pathPrefix}css/cv.css`}
                as="style"
            />
            <link rel="stylesheet" href={`${pathPrefix}css/cv.css`}/>
        </Head>
        <Component/>
    </>
  );
}
