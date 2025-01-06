import { HandlerContext, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "../../../server/post/post.ts";
import { Head } from "$fresh/runtime.ts";
import { CSS, render } from "@deno/gfm";
import {
  OG_META_DESCRIPTION,
  META_TITLE,
  META_TYPE,
  META_URL,
  TITLE,
  META_IMAGE,
} from "../../../constants/meta.ts";

// Give TS highlight support.
import "https://esm.sh/prismjs@1.29.0/components/prism-typescript?no-check";
import "https://esm.sh/prismjs@1.29.0/components/prism-rust?no-check";

export default function BlogEntry(props: PageProps<Post>) {
  return (
    <>
      {/* https://fresh.deno.dev/docs/examples/modifying-the-head */}
      <Head>
        <title>
          {props.data.title} | {TITLE}
        </title>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <meta property="og:title" content={props.data.title} key={META_TITLE} />

        <meta
          property="og:description"
          content={props.data.snippet}
          key={OG_META_DESCRIPTION}
        />
        <meta property="og:url" content={props.url.href} key={META_URL} />
        <meta property="og:type" content="article" key={META_TYPE} />
        {props.data.image && (
          <meta
            property="og:image"
            key={META_IMAGE}
            content={`${props.url.origin}/${props.data.image}`}
          />
        )}
      </Head>
      <div
        data-color-mode="auto"
        data-dark-theme="dark"
        data-light-theme={"light"}
        class={"markdown-body md"}
        dangerouslySetInnerHTML={{
          __html: render(props.data.content, {}),
        }}
      />
    </>
  );
}

export const handler = {
  async GET(req: Request, ctx: HandlerContext) {
    const post = await getPost(ctx.params.slug, { onlyMetaData: false });
    return ctx.render(post);
  },
};
