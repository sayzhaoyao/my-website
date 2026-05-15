import { getAlternatives, getBestLists, getCategories, getComparisons, getTools } from "../lib/strapi";

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
    {
      url: `${siteUrl}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/affiliate-disclosure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/best`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/alternatives`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
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
