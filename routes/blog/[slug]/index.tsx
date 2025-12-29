import { HandlerContext, PageProps } from "fresh";
import { getPost, Post } from "../../../server/post/post.ts";
import { Head } from "fresh/runtime";
import { CSS, render } from "@deno/gfm";
import {
  META_IMAGE,
  META_TITLE,
  META_TYPE,
  META_URL,
  OG_META_DESCRIPTION,
  TITLE,
} from "../../../constants/meta.ts";

// Give TS highlight support.
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-rust";

export default function BlogEntry(props: PageProps<Post>) {
  return (
    <>
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
  async GET(ctx: HandlerContext) {
    const post = await getPost(ctx.params.slug, { onlyMetaData: false });
    return { data: post};
  },
};
