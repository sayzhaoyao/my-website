export const siteName = "Commerce Toolbase";
export const defaultDescription = "A curated directory of AI and software tools for e-commerce sellers.";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function sitePath(path = "") {
  const siteUrl = getSiteUrl();
  if (!path) {
    return siteUrl;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
