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

export async function getPost(slug: string): Promise<Post | undefined> {
  try {
    const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
    const { attrs, body }: { attrs: Attributes; body: string } = extract(text);
    return {
      slug,
      title: attrs.title,
      publishedAt: new Date(attrs.published_at),
      content: body,
      snippet: attrs.snippet,
      image: attrs.image,
    };
  } catch (e) {
    return undefined;
  }
}

export async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises: Array<Promise<Post | undefined>> = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = (await Promise.all(promises)).filter(Boolean) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}
