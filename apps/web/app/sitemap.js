import { getAlternatives, getBestLists, getCategories, getComparisons, getTools } from "../lib/strapi";

const staticPages = [
  { path: "/about", changeFrequency: "monthly", priority: 0.4 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.3 },
  { path: "/editorial-policy", changeFrequency: "monthly", priority: 0.4 },
  { path: "/affiliate-disclosure", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.25 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.25 },
  { path: "/feed.xml", changeFrequency: "daily", priority: 0.2 },
  { path: "/best", changeFrequency: "weekly", priority: 0.8 },
  { path: "/categories", changeFrequency: "weekly", priority: 0.8 },
  { path: "/compare", changeFrequency: "weekly", priority: 0.8 },
  { path: "/alternatives", changeFrequency: "weekly", priority: 0.75 },
];

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [categories, tools, bestLists, comparisons, alternatives] = await Promise.all([
    getCategories(),
    getTools(),
    getBestLists(),
    getComparisons(),
    getAlternatives(),
  ]);

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...categories.map((category) => ({
      url: `${siteUrl}/categories/${category.slug}`,
      lastModified: category.updatedAt ? new Date(category.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...tools.map((tool) => ({
      url: `${siteUrl}/tools/${tool.slug}`,
      lastModified: tool.updatedAt ? new Date(tool.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...bestLists.map((list) => ({
      url: `${siteUrl}/best/${list.slug}`,
      lastModified: list.updatedAt ? new Date(list.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    })),
    ...comparisons.map((comparison) => ({
      url: `${siteUrl}/compare/${comparison.slug}`,
      lastModified: comparison.updatedAt ? new Date(comparison.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    })),
    ...alternatives.map((alternative) => ({
      url: `${siteUrl}/alternatives/${alternative.slug}`,
      lastModified: alternative.updatedAt ? new Date(alternative.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
