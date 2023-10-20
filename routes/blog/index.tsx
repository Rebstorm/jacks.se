import { HandlerContext, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "../../server/post/post.ts";
import { H1 } from "../../components/h1.tsx";

export default function BlogList(props: PageProps<Post[]>) {
  return (
    <div class={"innerContainer"}>
      <H1 shouldAnimate>Blog entries</H1>

      {props.data.map((availablePosts: Post) => (
        <div className={"blog-desc-container"}>
          <a className={"blog-title"} href={`blog/${availablePosts.slug}`}>
            📄 {availablePosts.title}
          </a>
          <p>{availablePosts?.snippet?.toString() || ""}</p>
          <i>Written on: {availablePosts.publishedAt.toDateString()}</i>
        </div>
      ))}
    </div>
  );
}

export const handler = {
  async GET(_req: Request, ctx: HandlerContext) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};
