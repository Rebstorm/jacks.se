import { HandlerContext, PageProps } from "fresh";
import { Paragraph } from "@/components/paragraph.tsx";
import { H1 } from "@/components/h1.tsx";
import { H2 } from "@/components/h2.tsx";
import { getPosts, PaginatedPost, Post } from "../server/post/post.ts";
import ConfettiParapgraph from "@/islands/ConfettiParagraph/index.tsx";
import { define } from "../utils.ts";

export default define.page(function Home(props: PageProps<PaginatedPost>) {
  return (
    <>
      <H1 gradientColor animate>Hello, I'm Paul. I code things.</H1>

      <Paragraph>
        A software dev with over 10+ years in a wide field of domains. Now
        available for <a href={"mailto:paul@paul.wiki"}>projects.</a>
      </Paragraph>

      <ConfettiParapgraph>
        I’ve spent the last few years leading developer teams, crafting
        solutions and refactoring complex problems to simple and maintainable
        standards.
        <br />
      </ConfettiParapgraph>

      <Paragraph>
        I often hang out at the{" "}
        <a href={"https://developer.mozilla.org/en-US/"}>
          Mozilla Developer Network Documentation
        </a>
        📚, browse through <a href={"https://primer.style/"}>Primer</a>{" "}
        🎨 for design inspiration, or explore{" "}
        <a href={"https://fresh.deno.dev/"}>Fresh</a>{" "}
        🍋 to build modern web apps in my free time.
      </Paragraph>

      <Paragraph>
      </Paragraph>

      <H2>Latest Blog Articles</H2>
      {props.data.posts.map((availablePosts: Post) => (
        <div>
          <a href={`blog/${availablePosts.slug}`}>
            📄 {availablePosts.title}
          </a>
        </div>
      ))}
    </>
  );
});


export const handler: Handlers = {
    async GET(ctx: HandlerContext) {

        const posts = await getPosts({ onlyMetaData: true });
        return { data: posts}
    },
};
