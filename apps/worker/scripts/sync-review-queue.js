import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const defaultFile = "data/generated/url-metadata.review-report.json";
const allowedPriorities = new Set(["high", "medium", "low"]);
const allowedStatuses = new Set(["added", "changed", "removed"]);

function parseArgs(argv) {
  const options = {
    file: defaultFile,
    dryRun: true,
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
    }
  }

  return options;
}

async function readJson(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const content = await fs.readFile(absolutePath, "utf8");
  const data = JSON.parse(content);

  if (!data?.summary || !Array.isArray(data.items)) {
    throw new Error(`${filePath} must be a collection review report.`);
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

function queueKey(item) {
  return `collection-change-${item.key || item.slug || item.websiteUrl}`;
}

function titleForItem(item) {
  const name = item.name || item.slug || item.websiteUrl || item.key;
  return `${item.reviewPriority.toUpperCase()} ${item.status}: ${name}`;
}

function notesForItem(item, report) {
  return [
    `Generated from collection comparison at ${report.summary.comparedAt}.`,
    `Status: ${item.status}. Priority: ${item.reviewPriority}.`,
    `Changes: ${item.changes.length}.`,
    "Review source pages before updating public editorial content.",
  ].join("\n");
}

function normalizeItem(item, report) {
  const priority = allowedPriorities.has(item.reviewPriority) ? item.reviewPriority : "low";
  const changeStatus = allowedStatuses.has(item.status) ? item.status : "changed";
  const now = report.summary.comparedAt || new Date().toISOString();

  return {
    title: titleForItem({ ...item, reviewPriority: priority, status: changeStatus }),
    queueKey: queueKey(item),
    itemStatus: "open",
    priority,
    changeStatus,
    toolSlug: item.slug || undefined,
    toolName: item.name || undefined,
    websiteUrl: item.websiteUrl || undefined,
    changes: item.changes,
    reportSummary: report.summary,
    lastSeenAt: now,
    notes: notesForItem({ ...item, reviewPriority: priority, status: changeStatus }, report),
  };
}

async function findByField(client, collection, field, value) {
  if (!value) {
    return null;
  }

  const body = await client.request(`/api/${collection}?filters[${field}][$eq]=${encodeURIComponent(value)}`);
  return body?.data?.[0] || null;
}

async function resolveToolDocumentId(client, slug) {
  const tool = await findByField(client, "tools", "slug", slug);
  return tool?.documentId || null;
}

async function upsertReviewQueueItem(client, item, report) {
  const data = normalizeItem(item, report);
  const existing = await findByField(client, "review-queues", "queueKey", data.queueKey);
  const toolDocumentId = await resolveToolDocumentId(client, item.slug);

  if (toolDocumentId) {
    data.tool = toolDocumentId;
  }

  if (existing?.documentId) {
    const existingStatus = existing.itemStatus || "open";
    if (existingStatus === "resolved" || existingStatus === "ignored") {
      data.itemStatus = "open";
      data.firstSeenAt = existing.firstSeenAt || data.lastSeenAt;
      data.resolvedAt = null;
    }

    await client.request(`/api/review-queues/${existing.documentId}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    });
    return "updated";
  }

  await client.request("/api/review-queues", {
    method: "POST",
    body: JSON.stringify({
      data: {
        ...data,
        firstSeenAt: data.lastSeenAt,
      },
    }),
  });
  return "created";
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const report = await readJson(options.file);
  const actionableItems = report.items.filter((item) => item.reviewPriority !== "none");

  console.log(`Loaded ${report.items.length} report item(s) from ${options.file}.`);
  console.log(`${actionableItems.length} item(s) require review queue sync.`);

  if (options.dryRun) {
    for (const item of actionableItems) {
      const data = normalizeItem(item, report);
      console.log(`[dry-run] ${data.queueKey}: ${data.priority} ${data.changeStatus} with ${data.changes.length} change(s).`);
    }
    console.log("Dry run complete. Re-run with --write and STRAPI_API_TOKEN to write to Strapi.");
    return;
  }

  const token = process.env.STRAPI_API_TOKEN;
  if (!token) {
    throw new Error("STRAPI_API_TOKEN is required when using --write.");
  }

  const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";
  const client = createClient({ baseUrl, token });
  const summary = { created: 0, updated: 0, errors: [] };

  for (const item of actionableItems) {
    try {
      const action = await upsertReviewQueueItem(client, item, report);
      summary[action] += 1;
      console.log(`${action}: ${queueKey(item)}`);
    } catch (error) {
      summary.errors.push({ key: queueKey(item), message: error.message });
      console.error(`failed: ${queueKey(item)}: ${error.message}`);
    }
  }

  console.log(`Review queue sync complete. Created: ${summary.created}. Updated: ${summary.updated}. Errors: ${summary.errors.length}.`);
  if (summary.errors.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
