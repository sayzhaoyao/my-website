import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const defaultInput = "data/url-sources.sample.json";
const defaultOutput = "data/generated/url-metadata.tools.json";

function parseArgs(argv) {
  const options = {
    input: defaultInput,
    output: defaultOutput,
    categorySlug: "",
    timeoutMs: 12000,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      options.input = argv[index + 1];
      index += 1;
    } else if (arg === "--output") {
      options.output = argv[index + 1];
      index += 1;
    } else if (arg === "--category-slug") {
      options.categorySlug = argv[index + 1];
      index += 1;
    } else if (arg === "--timeout-ms") {
      options.timeoutMs = Number(argv[index + 1]);
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

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value) {
  return decodeHtml(String(value || "").replace(/<[^>]*>/g, " "));
}

function firstMatch(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return decodeHtml(match[1]);
    }
  }
  return "";
}

function extractMetadata(html) {
  const title = firstMatch(html, [
    /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["'][^>]*>/i,
    /<title[^>]*>([\s\S]*?)<\/title>/i,
  ]);

  const description = firstMatch(html, [
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["'][^>]*>/i,
    /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["'][^>]*>/i,
  ]);

  const h1 = firstMatch(html, [/<h1[^>]*>([\s\S]*?)<\/h1>/i]);

  return {
    title: stripTags(title),
    description: stripTags(description),
    h1: stripTags(h1),
  };
}

async function readJson(filePath) {
  const content = await fs.readFile(path.resolve(process.cwd(), filePath), "utf8");
  const data = JSON.parse(content);
  if (!Array.isArray(data)) {
    throw new Error("URL source file must contain an array.");
  }
  return data;
}

async function fetchHtml(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      headers: {
        "Accept": "text/html,application/xhtml+xml",
        "User-Agent": "CommerceToolbaseBot/0.1 (+local development)",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function toToolRecord(source, metadata, options) {
  const name = source.name || metadata.h1 || metadata.title;
  const cleanName = String(name || "").trim();
  const description = source.shortDescription || metadata.description || metadata.h1 || metadata.title;
  const categorySlugs = source.categorySlugs || (options.categorySlug ? [options.categorySlug] : []);

  return {
    name: cleanName,
    slug: source.slug || slugify(cleanName),
    editorialStatus: source.editorialStatus || "review",
    websiteUrl: source.url,
    shortDescription: String(description || "Imported tool metadata pending editorial review.").slice(0, 500),
    longDescription: source.longDescription || metadata.description || "",
    pricingModel: source.pricingModel || "unknown",
    freePlanAvailable: Boolean(source.freePlanAvailable),
    keyFeatures: source.keyFeatures || [],
    pros: source.pros || [],
    cons: source.cons || [],
    bestFor: source.bestFor || [],
    decisionSummary: source.decisionSummary || "Imported from public page metadata. Review before publishing.",
    recommendedFor: source.recommendedFor || [],
    notRecommendedFor: source.notRecommendedFor || [],
    sourceUrls: [source.url],
    categorySlugs,
    seoTitle: source.seoTitle || metadata.title || cleanName,
    seoDescription: source.seoDescription || metadata.description || description,
  };
}

async function writeJson(filePath, data) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const sources = await readJson(options.input);
  const records = [];
  const failures = [];

  for (const source of sources) {
    if (!source.url) {
      failures.push({ name: source.name || "unknown", error: "url is required" });
      continue;
    }

    try {
      const html = await fetchHtml(source.url, options.timeoutMs);
      const metadata = extractMetadata(html);
      records.push(toToolRecord(source, metadata, options));
      console.log(`collected: ${source.name || source.url}`);
    } catch (error) {
      failures.push({ name: source.name || source.url, error: error.message });
      console.warn(`failed: ${source.name || source.url}: ${error.message}`);
    }
  }

  await writeJson(options.output, records);
  console.log(`Wrote ${records.length} record(s) to ${options.output}.`);

  if (failures.length > 0) {
    console.warn(`Failures: ${failures.length}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
