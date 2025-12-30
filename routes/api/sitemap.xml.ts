import { FreshContext } from "fresh";
import { getPosts } from "../../server/post/post.ts";

export const handler = {
  async GET(_ctx: FreshContext) {
    const postsResult = await getPosts({ onlyMetaData: true, all: true });
    const posts = postsResult.posts;

    const baseUrl = "https://jacks.se";

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/cv/g</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/cv/p</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/experiments</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/experiments/battery-rush</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/experiments/flappy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/info</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  ${
      posts.map((post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join("")
    }
</urlset>`.trim();

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  },
};
