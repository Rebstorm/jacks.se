import { PageProps } from "$fresh/server.ts";
import { getPost, Post } from "../../../server/post/post.ts";
import { Head } from "$fresh/runtime.ts";
import { CSS, render } from "$gfm";
export default function BlogEntry(props: PageProps & { data: Post }) {
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <div
        class={"md"}
        dangerouslySetInnerHTML={{ __html: render(props.data.content) }}
      />
    </>
  );
}

export const handler: Handlers<Post[]> = {
  async GET(req, ctx) {
    const posts = await getPost(ctx.params.slug);
    return ctx.render(posts);
  },
};
