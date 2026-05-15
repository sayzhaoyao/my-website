import { getAlternatives, getBestLists, getCategories, getComparisons, getTools } from "../../lib/strapi";
import { getSiteUrl } from "../../lib/site";

function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function itemXml(item) {
  return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid>${escapeXml(item.url)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.updatedAt || Date.now()).toUTCString()}</pubDate>
    </item>`;
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const [categories, tools, bestLists, comparisons, alternatives] = await Promise.all([
    getCategories(),
    getTools(),
    getBestLists(),
    getComparisons(),
    getAlternatives(),
  ]);

  const staticItems = [
    {
      title: "Commerce Toolbase",
      url: siteUrl,
      description: "E-commerce software reviews, comparisons, rankings, and alternatives.",
      updatedAt: new Date(),
    },
    {
      title: "E-commerce software categories",
      url: `${siteUrl}/categories`,
      description: "Browse e-commerce software by workflow category.",
      updatedAt: new Date(),
    },
    {
      title: "Best e-commerce tools",
      url: `${siteUrl}/best`,
      description: "Ranked buying guides for e-commerce software decisions.",
      updatedAt: new Date(),
    },
    {
      title: "Commerce Toolbase review methodology",
      url: `${siteUrl}/methodology`,
      description: "How Commerce Toolbase scores e-commerce software and verifies source-aware review claims.",
      updatedAt: new Date(),
    },
  ];

  const items = [
    ...staticItems,
    ...categories.map((category) => ({
      title: category.name,
      url: `${siteUrl}/categories/${category.slug}`,
      description: category.seoDescription || category.intro,
      updatedAt: category.updatedAt,
    })),
    ...bestLists.map((list) => ({
      title: list.title,
      url: `${siteUrl}/best/${list.slug}`,
      description: list.seoDescription || list.intro,
      updatedAt: list.updatedAt,
    })),
    ...comparisons.map((comparison) => ({
      title: comparison.title,
      url: `${siteUrl}/compare/${comparison.slug}`,
      description: comparison.seoDescription || comparison.summary,
      updatedAt: comparison.updatedAt,
    })),
    ...alternatives.map((alternative) => ({
      title: alternative.title,
      url: `${siteUrl}/alternatives/${alternative.slug}`,
      description: alternative.seoDescription || alternative.intro,
      updatedAt: alternative.updatedAt,
    })),
    ...tools.map((tool) => ({
      title: `${tool.name} review`,
      url: `${siteUrl}/tools/${tool.slug}`,
      description: tool.seoDescription || tool.shortDescription,
      updatedAt: tool.updatedAt,
    })),
  ].sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Commerce Toolbase</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>Source-aware e-commerce software reviews, comparisons, rankings, and alternatives.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items.map(itemXml).join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
