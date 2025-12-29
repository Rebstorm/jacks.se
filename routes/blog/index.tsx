import { FreshContext, PageProps } from "fresh";
import { getPosts, PaginatedPost, Post } from "../../server/post/post.ts";
import { H1 } from "../../components/h1.tsx";

export default function BlogList(props: PageProps<PaginatedPost>) {
  return (
    <>
      <H1 gradientColor>Blog</H1>
      {props.data?.posts?.map((availablePosts: Post) => (
        <div className={"blog-desc-container"}>
          <a className={"blog-title"} href={`blog/${availablePosts.slug}`}>
            📄 {availablePosts.title}
          </a>
          <p>{availablePosts?.snippet?.toString() || ""}</p>
          <i>Written on: {availablePosts.publishedAt.toDateString()}</i>
        </div>
      ))}
      {/* Pager */}
      <div className="pager">
        {props.data.page > 0 && (
          <a href={`/blog?page=${props.data.page - 1}`} className="pager-link">
            &laquo; Previous
          </a>
        )}

        <span className="pager-info">
          Page {props.data.page + 1} of {props.data.totalPages}
        </span>

        {props.data.page < props.data.totalPages - 1 && (
          <a href={`/blog?page=${props.data.page + 1}`} className="pager-link">
            Next &raquo;
          </a>
        )}
      </div>
    </>
  );
}

export const handler = {
  async GET(ctx: FreshContext) {
    const req = ctx.req;

    // Get page from URL query parameter, default to 0 if not present
    const url = new URL(req.url);
    const pageParam = url.searchParams.get("page");
    const page = pageParam ? parseInt(pageParam) : 0;

    const posts = await getPosts({ onlyMetaData: true, page });
    return { data: posts};
  },
};
