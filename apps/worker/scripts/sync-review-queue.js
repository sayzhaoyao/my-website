import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const defaultFile = "data/generated/url-metadata.review-report.json";
const allowedPriorities = new Set(["high", "medium", "low"]);
const allowedStatuses = new Set(["added", "changed", "removed"]);
const priorityLabels = {
  high: "高",
  medium: "中",
  low: "低",
};
const statusLabels = {
  added: "新增",
  changed: "变更",
  removed: "移除",
};

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
  const priority = priorityLabels[item.reviewPriority] || item.reviewPriority;
  const status = statusLabels[item.status] || item.status;
  return `${priority}优先级 ${status}: ${name}`;
}

function notesForItem(item, report) {
  const priority = priorityLabels[item.reviewPriority] || item.reviewPriority;
  const status = statusLabels[item.status] || item.status;
  return [
    `由采集对比任务生成，时间：${report.summary.comparedAt}。`,
    `状态：${status}。优先级：${priority}。`,
    `变更数量：${item.changes.length}。`,
    "请先核对官方来源页面，再更新公开页面内容。",
  ].join("\n");
}

function summarizeValue(value) {
  if (!value) {
    return "空";
  }

  const text = String(value).replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157)}...` : text;
}

function changeSummaryForItem(item) {
  if (!Array.isArray(item.changes) || item.changes.length === 0) {
    return "未记录具体字段变更，请打开来源页面人工核对。";
  }

  return item.changes.map((change, index) => {
    const scope = change.scope || "unknown";
    const field = change.field || "field";
    const previous = summarizeValue(change.previous);
    const current = summarizeValue(change.current);
    return `${index + 1}. [${scope}] ${field}: ${previous} -> ${current}`;
  }).join("\n");
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
    changeSummary: changeSummaryForItem(item),
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

async function createImportLog(client, options) {
  const body = await client.request("/api/import-logs", {
    method: "POST",
    body: JSON.stringify({
      data: {
        runStatus: "started",
        startedAt: new Date().toISOString(),
        recordsCreated: 0,
        recordsUpdated: 0,
        notes: `Review queue sync started from ${options.file}.`,
      },
    }),
  });
  return body?.data?.documentId || null;
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
      console.log(`[dry-run] ${data.queueKey}: ${data.title}，${data.changes.length} 处变更。`);
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
  const importLogDocumentId = await createImportLog(client, options);

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
    notes: `Review queue sync finished from ${options.file}. Items in report: ${report.items.length}. Actionable items: ${actionableItems.length}.`,
  });

  console.log(`Review queue sync complete. Created: ${summary.created}. Updated: ${summary.updated}. Errors: ${summary.errors.length}.`);
  if (summary.errors.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
