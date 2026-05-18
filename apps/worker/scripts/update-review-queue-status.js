import process from "node:process";

const allowedStatuses = new Set(["open", "in_review", "resolved", "ignored"]);

function parseArgs(argv) {
  const options = {
    queueKey: "",
    status: "",
    note: "",
    dryRun: true,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--queue-key") {
      options.queueKey = argv[index + 1];
      index += 1;
    } else if (arg === "--status") {
      options.status = argv[index + 1];
      index += 1;
    } else if (arg === "--note") {
      options.note = argv[index + 1];
      index += 1;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--write") {
      options.dryRun = false;
    }
  }

  return options;
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

function valueOf(item, key) {
  return item?.[key] ?? item?.attributes?.[key] ?? "";
}

async function findReviewQueueItem(client, queueKey) {
  const params = new URLSearchParams();
  params.set("filters[queueKey][$eq]", queueKey);
  params.set("pagination[pageSize]", "1");
  const body = await client.request(`/api/review-queues?${params.toString()}`);
  return body?.data?.[0] || null;
}

function buildUpdatePayload(item, options) {
  const now = new Date().toISOString();
  const existingNotes = valueOf(item, "notes");
  const appendedNote = options.note ? `\n\nStatus update ${now}: ${options.note}` : "";

  return {
    itemStatus: options.status,
    resolvedAt: ["resolved", "ignored"].includes(options.status) ? now : null,
    notes: `${existingNotes || ""}${appendedNote}`.trim(),
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (!options.queueKey) {
    throw new Error("--queue-key is required.");
  }

  if (!allowedStatuses.has(options.status)) {
    throw new Error(`--status must be one of ${Array.from(allowedStatuses).join(", ")}.`);
  }

  const token = process.env.STRAPI_API_TOKEN;
  if (!token) {
    throw new Error("STRAPI_API_TOKEN is required to update review queue items.");
  }

  const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";
  const client = createClient({ baseUrl, token });
  const item = await findReviewQueueItem(client, options.queueKey);

  if (!item?.documentId) {
    throw new Error(`Review queue item not found: ${options.queueKey}`);
  }

  const payload = buildUpdatePayload(item, options);
  const title = valueOf(item, "title") || options.queueKey;

  if (options.dryRun) {
    console.log(`[dry-run] ${title}`);
    console.log(`Would set itemStatus to ${payload.itemStatus}.`);
    console.log(`Would set resolvedAt to ${payload.resolvedAt || "null"}.`);
    console.log("Re-run with --write to update Strapi.");
    return;
  }

  await client.request(`/api/review-queues/${item.documentId}`, {
    method: "PUT",
    body: JSON.stringify({ data: payload }),
  });

  console.log(`Updated ${title} to ${payload.itemStatus}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
