import { HandlerContext, PageProps } from "fresh";
import { Paragraph } from "@/components/paragraph.tsx";
import { H1 } from "@/components/h1.tsx";
import { H2 } from "@/components/h2.tsx";
import { getPosts, PaginatedPost, Post } from "../server/post/post.ts";
import ConfettiParapgraph from "@/islands/ConfettiParagraph/index.tsx";
import CtaButton from "@/islands/CtaButton/index.tsx";
import { define } from "../utils.ts";

export default define.page(function Home(props: PageProps<PaginatedPost>) {
  return (
    <>
      <H1 gradientColor animate>Hi, I’m Paul Jacks.</H1>

      <p class="tagline">Senior engineer · Team lead · Available for hire</p>

      <Paragraph>
        10+ years building web software across a wide range of domains. I
        specialize in leading developer teams, architecting maintainable
        systems, and shipping product that actually lasts.
      </Paragraph>

      <ConfettiParapgraph>
        Most recently I’ve been heads-down on team leadership: mentoring
        engineers, driving technical decisions, and making sure complexity
        doesn’t compound over time.
      </ConfettiParapgraph>

      <div class="cta-section">
        <CtaButton />
      </div>

      <H2>Latest Blog Articles</H2>
      {props.data.posts.map((post: Post) => (
        <div class="blog-list-item">
          <a class="blog-title" href={`blog/${post.slug}`}>
            {post.title}
          </a>
          <div class="blog-meta">
            <time>
              {post.publishedAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          {post.snippet && <p class="blog-snippet">{post.snippet}</p>}
        </div>
      ))}
    </>
  );
});

export const handler: Handlers = {
  async GET(ctx: HandlerContext) {
    const posts = await getPosts({ onlyMetaData: true });
    return { data: posts };
  },
};
