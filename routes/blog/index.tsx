import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "../../server/post/post.ts";
import { H1 } from "../../components/h1.tsx";

export default function BlogList(props: PageProps & { data: Array<Post> }) {
  return (
    <div class={"innerContainer"}>
      <H1>Blog entries</H1>

      {props.data.map((availablePosts) => (
        <div>
          📄 <a href={`blog/${availablePosts.slug}`}>{availablePosts.title}</a>
          <p>{availablePosts.snippet.toString()}</p>
          <i>Written on: {availablePosts.publishedAt.toDateString()}</i>
        </div>
      ))}
    </div>
  );
}

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};
