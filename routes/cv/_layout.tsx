import {PageProps} from "$fresh/server.ts";
import {Head, asset} from "$fresh/runtime.ts";
import {TITLE} from "../../constants/meta.ts";

export default function Layout({ Component, state, ...rest }: PageProps) {
  return (
    <>
        <Head>
            <title>CV | {TITLE}</title>
            <link
                rel="preload"
                href={asset('cv.css')}
                as="style"
            />
            <link rel="stylesheet" href={asset('cv.css')}/>
        </Head>
        <Component/>
    </>
  );
}