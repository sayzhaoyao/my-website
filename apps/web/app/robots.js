import { getSiteUrl } from "../lib/site";

export default function robots() {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/feed.xml`],
  };
}
