const STRAPI_URL = process.env.STRAPI_INTERNAL_URL || "http://localhost:1337";

async function fetchFromStrapi(path) {
  const url = `${STRAPI_URL}${path}`;
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${url}`);
  }

  return response.json();
}

export async function getCategories() {
  const payload = await fetchFromStrapi("/api/categories?sort=name:asc&pagination[pageSize]=100");
  return payload.data || [];
}

export async function getTools() {
  const payload = await fetchFromStrapi("/api/tools?sort=name:asc&pagination[pageSize]=100&populate=categories");
  return payload.data || [];
}

export async function getToolBySlug(slug) {
  const payload = await fetchFromStrapi(
    `/api/tools?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[0]=categories&populate[1]=sources`
  );
  return payload.data?.[0] || null;
}

export async function getCategoryBySlug(slug) {
  const payload = await fetchFromStrapi(`/api/categories?filters[slug][$eq]=${encodeURIComponent(slug)}`);
  return payload.data?.[0] || null;
}

export async function getToolsByCategorySlug(slug) {
  const payload = await fetchFromStrapi(
    `/api/tools?filters[categories][slug][$eq]=${encodeURIComponent(slug)}&sort=name:asc&pagination[pageSize]=100&populate=categories`
  );
  return payload.data || [];
}

export async function getBestLists() {
  const payload = await fetchFromStrapi("/api/best-lists?sort=title:asc&pagination[pageSize]=100&populate=*");
  return payload.data || [];
}

export async function getBestListBySlug(slug) {
  const payload = await fetchFromStrapi(`/api/best-lists?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
  return payload.data?.[0] || null;
}

export async function getComparisons() {
  const payload = await fetchFromStrapi("/api/comparisons?sort=title:asc&pagination[pageSize]=100&populate=*");
  return payload.data || [];
}

export async function getComparisonBySlug(slug) {
  const payload = await fetchFromStrapi(`/api/comparisons?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
  return payload.data?.[0] || null;
}

export async function getAlternatives() {
  const payload = await fetchFromStrapi("/api/alternatives?sort=title:asc&pagination[pageSize]=100&populate=*");
  return payload.data || [];
}

export async function getAlternativeBySlug(slug) {
  const payload = await fetchFromStrapi(`/api/alternatives?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
  return payload.data?.[0] || null;
}

export function listField(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

export function formatPricing(tool) {
  const model = tool.pricingModel || "unknown";
  if (tool.startingPrice) {
    return `${model} from $${tool.startingPrice}`;
  }
  return model.replace("_", " ");
}

export const scoreLabels = [
  ["Ease of use", "easeOfUseScore"],
  ["Pricing value", "pricingValueScore"],
  ["Integrations", "integrationScore"],
  ["Automation", "automationDepthScore"],
  ["SEO usefulness", "seoUsefulnessScore"],
  ["Support quality", "supportQualityScore"],
];

export function getScoreItems(tool) {
  return scoreLabels
    .map(([label, key]) => ({ label, key, value: Number(tool?.[key] || 0) }))
    .filter((item) => item.value > 0);
}

export function getAverageScore(tool) {
  const scores = getScoreItems(tool).map((item) => item.value);
  if (!scores.length) {
    return null;
  }

  const total = scores.reduce((sum, score) => sum + score, 0);
  return Number((total / scores.length).toFixed(1));
}
