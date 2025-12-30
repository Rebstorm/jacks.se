import { FreshContext } from "fresh";
import { getPosts } from "../../server/post/post.ts";
import { TITLE } from "../../constants/meta.ts";

export const handler = {
  async GET(_ctx: FreshContext) {
    const postsResult = await getPosts({ onlyMetaData: true, all: true });
    const posts = postsResult.posts;

    const baseUrl = "https://jacks.se";

    const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${
      posts.map((post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXML(TITLE)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${post.publishedAt.toISOString()}</news:publication_date>
      <news:title>${escapeXML(post.title)}</news:title>
    </news:news>
  </url>`).join("")
    }
</urlset>`.trim();

    return new Response(newsSitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  },
};

function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
