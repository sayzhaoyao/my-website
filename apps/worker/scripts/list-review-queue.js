import process from "node:process";

const priorityOrder = new Map([
  ["high", 1],
  ["medium", 2],
  ["low", 3],
]);

function parseArgs(argv) {
  const options = {
    status: "open",
    priority: "",
    limit: 20,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--status") {
      options.status = argv[index + 1];
      index += 1;
    } else if (arg === "--priority") {
      options.priority = argv[index + 1];
      index += 1;
    } else if (arg === "--limit") {
      options.limit = Number(argv[index + 1]);
      index += 1;
    }
  }

  return options;
}

function createClient({ baseUrl, token }) {
  async function request(endpoint) {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const text = await response.text();
    const body = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const message = body?.error?.message || response.statusText;
      throw new Error(`GET ${endpoint} failed: ${message}`);
    }

    return body;
  }

  return { request };
}

function valueOf(item, key) {
  return item?.[key] ?? item?.attributes?.[key] ?? "";
}

function buildEndpoint(options) {
  const params = new URLSearchParams();
  params.set("pagination[pageSize]", String(options.limit));

  if (options.status) {
    params.set("filters[itemStatus][$eq]", options.status);
  }

  if (options.priority) {
    params.set("filters[priority][$eq]", options.priority);
  }

  return `/api/review-queues?${params.toString()}`;
}

function sortItems(items) {
  return [...items].sort((a, b) => {
    const priorityA = priorityOrder.get(valueOf(a, "priority")) || 99;
    const priorityB = priorityOrder.get(valueOf(b, "priority")) || 99;
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return String(valueOf(a, "lastSeenAt")).localeCompare(String(valueOf(b, "lastSeenAt")));
  });
}

function printItem(item, index) {
  const title = valueOf(item, "title") || "Untitled review item";
  const status = valueOf(item, "itemStatus") || "unknown";
  const priority = valueOf(item, "priority") || "unknown";
  const websiteUrl = valueOf(item, "websiteUrl");
  const summary = valueOf(item, "changeSummary") || valueOf(item, "notes") || "";
  const shortSummary = summary.split("\n").slice(0, 3).join("\n   ");

  console.log(`${index + 1}. [${priority}/${status}] ${title}`);
  if (websiteUrl) {
    console.log(`   URL: ${websiteUrl}`);
  }
  if (shortSummary) {
    console.log(`   ${shortSummary}`);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const token = process.env.STRAPI_API_TOKEN;

  if (!token) {
    throw new Error("STRAPI_API_TOKEN is required to list review queue items.");
  }

  const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";
  const client = createClient({ baseUrl, token });
  const body = await client.request(buildEndpoint(options));
  const items = sortItems(body?.data || []);

  console.log(`Review queue items: ${items.length}`);

  if (items.length === 0) {
    return;
  }

  items.forEach(printItem);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
