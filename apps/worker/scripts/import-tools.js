import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const allowedPricingModels = new Set(["free", "freemium", "paid", "custom", "unknown"]);
const allowedStatuses = new Set(["draft", "review", "published", "archived"]);
const scoreFields = [
  "easeOfUseScore",
  "pricingValueScore",
  "integrationScore",
  "automationDepthScore",
  "seoUsefulnessScore",
  "supportQualityScore",
];
const requiredReviewFields = [
  "longDescription",
  "decisionSummary",
  "affiliateDisclosure",
  "seoTitle",
  "seoDescription",
];
const requiredArrayFields = [
  "keyFeatures",
  "pros",
  "cons",
  "bestFor",
  "recommendedFor",
  "notRecommendedFor",
  "sourceUrls",
  "categorySlugs",
];

function parseArgs(argv) {
  const options = {
    file: "data/tools.sample.json",
    dryRun: true,
    publish: false,
    sourceName: "Local JSON Import",
    sourceUrl: "",
    sourceType: "manual_submission",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--file") {
      options.file = argv[index + 1];
      index += 1;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--write") {
      options.dryRun = false;
    } else if (arg === "--publish") {
      options.publish = true;
    } else if (arg === "--source-name") {
      options.sourceName = argv[index + 1];
      index += 1;
    } else if (arg === "--source-url") {
      options.sourceUrl = argv[index + 1];
      index += 1;
    } else if (arg === "--source-type") {
      options.sourceType = argv[index + 1];
      index += 1;
    }
  }

  return options;
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function assertArray(value, field, errors) {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value)) {
    errors.push(`${field} must be an array.`);
    return [];
  }

  return value.filter(Boolean).map(String);
}

function normalizeTool(input) {
  const errors = [];
  const name = String(input.name || "").trim();
  const slug = slugify(input.slug || name);
  const pricingModel = input.pricingModel || "unknown";
  const editorialStatus = input.editorialStatus || "review";

  if (!name) {
    errors.push("name is required.");
  }

  if (!slug) {
    errors.push("slug is required.");
  }

  if (!input.shortDescription) {
    errors.push("shortDescription is required.");
  }

  for (const field of requiredReviewFields) {
    if (!String(input[field] || "").trim()) {
      errors.push(`${field} is required for review-ready imports.`);
    }
  }

  if (!allowedPricingModels.has(pricingModel)) {
    errors.push(`pricingModel must be one of: ${Array.from(allowedPricingModels).join(", ")}.`);
  }

  if (!allowedStatuses.has(editorialStatus)) {
    errors.push(`editorialStatus must be one of: ${Array.from(allowedStatuses).join(", ")}.`);
  }

  for (const field of scoreFields) {
    if (input[field] === undefined || input[field] === null || input[field] === "") {
      continue;
    }

    const value = Number(input[field]);
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      errors.push(`${field} must be an integer from 1 to 5.`);
    }
  }

  for (const field of requiredArrayFields) {
    if (!Array.isArray(input[field]) || input[field].filter(Boolean).length === 0) {
      errors.push(`${field} must contain at least one value for review-ready imports.`);
    }
  }

  const data = {
    name,
    slug,
    editorialStatus,
    websiteUrl: input.websiteUrl || undefined,
    affiliateUrl: input.affiliateUrl || undefined,
    affiliateDisclosure: input.affiliateDisclosure || undefined,
    shortDescription: String(input.shortDescription || "").trim(),
    longDescription: input.longDescription || undefined,
    pricingModel,
    startingPrice: input.startingPrice ?? undefined,
    freePlanAvailable: Boolean(input.freePlanAvailable),
    keyFeatures: assertArray(input.keyFeatures, "keyFeatures", errors),
    pros: assertArray(input.pros, "pros", errors),
    cons: assertArray(input.cons, "cons", errors),
    bestFor: assertArray(input.bestFor, "bestFor", errors),
    decisionSummary: input.decisionSummary || undefined,
    recommendedFor: assertArray(input.recommendedFor, "recommendedFor", errors),
    notRecommendedFor: assertArray(input.notRecommendedFor, "notRecommendedFor", errors),
    sourceUrls: assertArray(input.sourceUrls, "sourceUrls", errors),
    lastImportedAt: new Date().toISOString(),
    seoTitle: input.seoTitle || undefined,
    seoDescription: input.seoDescription || undefined,
  };

  for (const field of scoreFields) {
    if (input[field] !== undefined && input[field] !== null && input[field] !== "") {
      data[field] = Number(input[field]);
    }
  }

  return {
    data,
    categorySlugs: assertArray(input.categorySlugs, "categorySlugs", errors).map(slugify),
    collection: input._collection || null,
    errors,
  };
}

async function readJson(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const content = await fs.readFile(absolutePath, "utf8");
  const data = JSON.parse(content);

  if (!Array.isArray(data)) {
    throw new Error("Import file must contain an array of tool records.");
  }

  return data;
}

function createClient({ baseUrl, token }) {
  async function request(endpoint, options = {}) {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });

    const text = await response.text();
    const body = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const message = body?.error?.message || response.statusText;
      throw new Error(`${options.method || "GET"} ${endpoint} failed: ${message}`);
    }

    return body;
  }

  return { request };
}

async function findDocumentBySlug(client, collection, slug) {
  const query = `/api/${collection}?filters[slug][$eq]=${encodeURIComponent(slug)}&status=draft`;
  const body = await client.request(query);
  return body?.data?.[0] || null;
}

async function findFirstByField(client, collection, field, value) {
  if (!value) {
    return null;
  }

  const query = `/api/${collection}?filters[${field}][$eq]=${encodeURIComponent(value)}&status=draft`;
  const body = await client.request(query);
  return body?.data?.[0] || null;
}

async function upsertSource(client, options) {
  const sourceUrl = options.sourceUrl || `file://${options.file}`;
  const existing = await findFirstByField(client, "sources", "url", sourceUrl);
  const payload = {
    data: {
      name: options.sourceName,
      sourceType: options.sourceType,
      url: sourceUrl,
      permissionNotes: "Local worker import source. Review before using automated publishing.",
      fetchFrequency: "manual",
      lastCheckedAt: new Date().toISOString(),
      status: "active",
    },
  };

  if (existing?.documentId) {
    await client.request(`/api/sources/${existing.documentId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return existing.documentId;
  }

  const body = await client.request("/api/sources", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return body?.data?.documentId;
}

async function createImportLog(client, options, sourceDocumentId) {
  const payload = {
    data: {
      runStatus: "started",
      startedAt: new Date().toISOString(),
      recordsCreated: 0,
      recordsUpdated: 0,
      notes: `Import started from ${options.file}.`,
      ...(sourceDocumentId ? { source: sourceDocumentId } : {}),
    },
  };

  const body = await client.request("/api/import-logs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return body?.data?.documentId;
}

async function updateImportLog(client, documentId, data) {
  if (!documentId) {
    return;
  }

  await client.request(`/api/import-logs/${documentId}`, {
    method: "PUT",
    body: JSON.stringify({ data }),
  });
}

async function resolveCategories(client, categorySlugs) {
  const categories = [];
  const missing = [];

  for (const slug of categorySlugs) {
    const category = await findDocumentBySlug(client, "categories", slug);
    if (category?.documentId) {
      categories.push(category.documentId);
    } else {
      missing.push(slug);
    }
  }

  return { categories, missing };
}

async function findExistingTool(client, tool) {
  const bySlug = await findDocumentBySlug(client, "tools", tool.data.slug);
  if (bySlug) {
    return { record: bySlug, matchedBy: "slug" };
  }

  const byWebsiteUrl = await findFirstByField(client, "tools", "websiteUrl", tool.data.websiteUrl);
  if (byWebsiteUrl) {
    return { record: byWebsiteUrl, matchedBy: "websiteUrl" };
  }

  return { record: null, matchedBy: null };
}

async function upsertTool(client, tool, publish) {
  const existing = await findExistingTool(client, tool);
  const payload = {
    data: tool.data,
  };

  if (tool.categoryDocumentIds.length > 0) {
    payload.data.categories = tool.categoryDocumentIds;
  }

  if (tool.sourceDocumentId) {
    payload.data.sources = [tool.sourceDocumentId];
  }

  if (existing.record?.documentId) {
    await client.request(`/api/tools/${existing.record.documentId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return { action: "updated", matchedBy: existing.matchedBy };
  }

  await client.request(`/api/tools${publish ? "?status=published" : ""}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return { action: "created", matchedBy: null };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";
  const token = process.env.STRAPI_API_TOKEN;
  const rawRecords = await readJson(options.file);
  const normalized = rawRecords.map(normalizeTool);
  const invalid = normalized
    .map((record, index) => ({ index, record }))
    .filter((item) => item.record.errors.length > 0);

  if (invalid.length > 0) {
    for (const item of invalid) {
      console.error(`Record ${item.index + 1} is invalid:`);
      for (const error of item.record.errors) {
        console.error(`- ${error}`);
      }
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Loaded ${normalized.length} tool record(s) from ${options.file}.`);

  if (options.dryRun) {
    for (const record of normalized) {
      const reviewLabel = record.collection?.reviewRequired ? "review required" : "manual review recommended";
      console.log(`[dry-run] ${record.data.slug}: ready for import as ${record.data.editorialStatus} (${reviewLabel}).`);
      if (record.collection?.sourceUrl) {
        console.log(`  source: ${record.collection.sourceUrl}`);
      }
      if (record.collection?.lastModified) {
        console.log(`  source last-modified: ${record.collection.lastModified}`);
      }
      if (Array.isArray(record.collection?.relatedPages) && record.collection.relatedPages.length > 0) {
        for (const page of record.collection.relatedPages) {
          const lastModified = page.lastModified ? `, last-modified: ${page.lastModified}` : "";
          console.log(`  ${page.pageType}: ${page.finalUrl || page.sourceUrl}${lastModified}`);
        }
      }
      if (Array.isArray(record.collection?.reviewNotes) && record.collection.reviewNotes.length > 0) {
        for (const note of record.collection.reviewNotes.slice(0, 4)) {
          console.log(`  review note: ${note}`);
        }
      }
      if (Array.isArray(record.collection?.skippedFields) && record.collection.skippedFields.length > 0) {
        console.log(`  skipped fields: ${record.collection.skippedFields.join(", ")}`);
      }
    }
    console.log(`[dry-run] source: ${options.sourceName} (${options.sourceUrl || `file://${options.file}`})`);
    console.log("Dry run complete. Re-run with --write and STRAPI_API_TOKEN to write to Strapi.");
    return;
  }

  if (!token) {
    throw new Error("STRAPI_API_TOKEN is required when using --write.");
  }

  const client = createClient({ baseUrl, token });
  const summary = { created: 0, updated: 0, missingCategories: new Set(), errors: [] };
  let importLogDocumentId = null;

  const sourceDocumentId = await upsertSource(client, options);
  importLogDocumentId = await createImportLog(client, options, sourceDocumentId);

  for (const record of normalized) {
    try {
      const { categories, missing } = await resolveCategories(client, record.categorySlugs);
      for (const slug of missing) {
        summary.missingCategories.add(slug);
      }

      const result = await upsertTool(
        client,
        { ...record, categoryDocumentIds: categories, sourceDocumentId },
        options.publish,
      );
      summary[result.action] += 1;
      console.log(`${result.action}: ${record.data.slug}${result.matchedBy ? ` (matched by ${result.matchedBy})` : ""}`);
    } catch (error) {
      summary.errors.push({ slug: record.data.slug, message: error.message });
      console.error(`failed: ${record.data.slug}: ${error.message}`);
    }
  }

  if (summary.missingCategories.size > 0) {
    console.warn(`Missing categories: ${Array.from(summary.missingCategories).join(", ")}`);
  }

  const runStatus = summary.errors.length > 0
    ? summary.created > 0 || summary.updated > 0
      ? "partial_success"
      : "failed"
    : "success";

  await updateImportLog(client, importLogDocumentId, {
    runStatus,
    finishedAt: new Date().toISOString(),
    recordsCreated: summary.created,
    recordsUpdated: summary.updated,
    errors: summary.errors,
    notes: `Import finished from ${options.file}. Missing categories: ${Array.from(summary.missingCategories).join(", ") || "none"}.`,
  });

  console.log(`Import complete. Created: ${summary.created}. Updated: ${summary.updated}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
