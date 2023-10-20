import { HandlerContext, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "../../../server/post/post.ts";
import { Head } from "$fresh/runtime.ts";
import { CSS, render } from "$gfm";
import {
  META_DESCRIPTION,
  META_TITLE,
  META_TYPE,
  META_URL,
} from "../../../constants/meta.ts";

export default function BlogEntry(props: PageProps<Post>) {
  return (
    <>
      {/* https://fresh.deno.dev/docs/examples/modifying-the-head */}
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <meta property="og:title" content={props.data.title} key={META_TITLE} />
        <meta
          property="og:description"
          content={props.data.snippet}
          key={META_DESCRIPTION}
        />
        <meta property="og:url" content={props.url.href} key={META_URL} />
        <meta property="og:type" content="article" key={META_TYPE} />
      </Head>
      <div
        class={"md"}
        dangerouslySetInnerHTML={{
          __html: render(props.data.content, {}),
        }}
      />
    </>
  );
}

export const handler = {
  async GET(req: Request, ctx: HandlerContext) {
    const posts = await getPost(ctx.params.slug);
    return ctx.render(posts);
  },
};
