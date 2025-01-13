import { HandlerContext } from "$fresh/server.ts";
import { getPosts } from "../../../server/post/post.ts";
import {TITLE} from "../../../constants/meta.ts";

export const handler = {
  async GET(_req: Request, _ctx: HandlerContext) {
    // Fetch all posts
    const posts = await getPosts({ onlyMetaData: true });

    // Generate the RSS XML
    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
      <title>${TITLE}</title>
      <link>https://jacks.se</link>
      <description>PJ's blog</description>
      <language>en-us</language>
      ${
        posts
          .map((post) =>
            `
      <item>
        <title>${escapeXML(post.title)}</title>
        <link>https://jacks.se/blog/${post.slug}</link>
        <description>${escapeXML(post.snippet || post.content)}</description>
        <pubDate>${post.publishedAt.toUTCString()}</pubDate>
      </item>
      `.trim()
          )
          .join("\n")
      }
      </channel>
    </rss>`;

    // Return the XML response
    return new Response(rssFeed, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  },
};

// Helper to escape special characters in XML
function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
