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

// Because I am a lazy butt. Please type this.
interface Attributes {
  [key: string]: string;
}

interface PostDataOptions {
  /**
   * @description Do not get the content, only the meta data, front matter, basically.
   */
  onlyMetaData?: boolean;
}

export async function getPost(slug: string, { onlyMetaData = null }: PostDataOptions): Promise<Post | undefined> {
  try {
    const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
    const { attrs, body }: { attrs: Attributes; body: string } = extract(text);
    return {
      slug,
      title: attrs.title,
      publishedAt: new Date(attrs.published_at),
      content: onlyMetaData !== null ? body : null,
      snippet: attrs.snippet,
      image: attrs.image,
    };
  } catch (e) {
    return undefined;
  }
}

export async function getPosts(options?: PostDataOptions): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises: Array<Promise<Post | undefined>> = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug, options));
  }
  const posts = (await Promise.all(promises)).filter(Boolean) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}
