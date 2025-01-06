import {HandlerContext, Handlers, PageProps} from "$fresh/server.ts";
import {Paragraph} from "../components/paragraph.tsx";
import {H1} from "../components/h1.tsx";
import {H2} from "../components/h2.tsx";
import {getPosts, Post} from "../server/post/post.ts";
import ConfettiParapgraph from "../islands/ConfettiParagraph/index.tsx";

export default function Home(props: PageProps<Array<Post>>) {
    return (
        <>
            <H1 gradientColor animate>Hello, I'm Paul. I code things.</H1>

            <Paragraph>
                Yes, you read that right.
            </Paragraph>

            <Paragraph>
                I often hang out at the <a href={"https://developer.mozilla.org/en-US/"}>Mozilla Developer Network Documentation</a> 📚,
                browse through <a href={"https://primer.style/"}>Primer</a> 🎨 for design inspiration, or explore <a href={"https://fresh.deno.dev/"}>Fresh</a> 🍋 to build modern web apps in my free time.
            </Paragraph>

            <ConfettiParapgraph>
                I’ve spent the last few years leading developer teams and crafting solutions and refactoring complex problems to simple and maintainable standards.
                <br />
                <span>Oh. And teaching why Rust 🦀 is amazing. </span>
            </ConfettiParapgraph>
            <Paragraph>
            </Paragraph>

            <H2> Latest Blog Articles </H2>
            {props.data.map((availablePosts: Post) => (
                <div>
                    <a href={`blog/${availablePosts.slug}`}>
                        📄 {availablePosts.title}
                    </a>
                </div>
            )).slice(0,5)}
        </>
    );
}


export const handler: Handlers = {
    async GET(_req: Request, ctx: HandlerContext) {
        const resp = await ctx.render(await getPosts({ onlyMetaData: true }));
        return resp;
    },
};