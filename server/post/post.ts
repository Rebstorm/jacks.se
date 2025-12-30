import { extract } from "$std/front_matter/any.ts";
import { join } from "$std/path/mod.ts";

export interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  snippet?: string;
  image?: string;
}

export interface PaginatedPost {
  posts: Post[];
  totalPages: number;
  page: number;
}

// Because I am a lazy butt. Please type this.
interface Attributes {
  [key: string]: string;
}

interface PostDataOptions {
  /**
   * @description Which page to get.
   */
  page?: number;
  /**
   * @description Do not get the content, only the meta data, front matter, basically.
   */
  onlyMetaData?: boolean;
  /**
   * @description Get all posts without pagination.
   */
  all?: boolean;
}

export async function getPost(
  slug: string,
  { onlyMetaData = undefined }: PostDataOptions,
): Promise<Post | undefined> {
  try {
    const text = await Deno.readTextFile(join("./static/posts", `${slug}.md`));
    const { attrs, body }: { attrs: Attributes; body: string } = extract(text);
    return {
      slug,
      title: attrs.title,
      publishedAt: new Date(attrs.published_at),
      content: onlyMetaData !== undefined ? body : "",
      snippet: attrs.snippet,
      image: attrs.image,
    };
  } catch (e) {
    return undefined;
  }
}

const PAGE_SIZE = 5;
export async function getPosts(
  options?: PostDataOptions,
): Promise<PaginatedPost> {
  const files = Deno.readDir("./static/posts");
  const promises: Array<Promise<Post | undefined>> = [];

  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug, options || {}));
  }
  const posts = (await Promise.all(promises)).filter(Boolean) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  if (options?.all) {
    return {
      posts,
      totalPages: 1,
      page: 0,
    };
  }

  // Default to page 0 if not specified
  const page = options?.page ?? 0;

  // Get posts for the requested page
  const startIndex = page * PAGE_SIZE;
  const paginatedPosts = posts.slice(startIndex, startIndex + PAGE_SIZE);

  return {
    posts: paginatedPosts,
    totalPages,
    page,
  };
}
