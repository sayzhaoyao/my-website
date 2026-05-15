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
  const canonicalUrl = firstMatch(html, [
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i,
    /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i,
    /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:url["'][^>]*>/i,
  ]);

  return {
    title: stripTags(title),
    description: stripTags(description),
    h1: stripTags(h1),
    canonicalUrl: stripTags(canonicalUrl),
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

function assertSafeFetchUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error(`Unsupported URL protocol: ${parsed.protocol}`);
  }

  const hostname = parsed.hostname.toLowerCase();
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".local") ||
    hostname.startsWith("10.") ||
    hostname.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  ) {
    throw new Error(`Refusing to fetch local or private URL: ${url}`);
  }
}

async function fetchHtml(url, timeoutMs) {
  assertSafeFetchUrl(url);

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

    return {
      finalUrl: response.url,
      status: response.status,
      contentType: response.headers.get("content-type") || "",
      lastModified: response.headers.get("last-modified") || "",
      html: await response.text(),
    };
  } finally {
    clearTimeout(timeout);
  }
}

function uniqueStrings(values) {
  return Array.from(new Set(values.filter(Boolean).map((value) => String(value).trim()).filter(Boolean)));
}

async function collectPageSnapshot(pageType, url, timeoutMs) {
  const fetchInfo = await fetchHtml(url, timeoutMs);
  const metadata = extractMetadata(fetchInfo.html);

  return {
    pageType,
    sourceUrl: url,
    finalUrl: fetchInfo.finalUrl || url,
    canonicalUrl: metadata.canonicalUrl || "",
    httpStatus: fetchInfo.status,
    contentType: fetchInfo.contentType,
    lastModified: fetchInfo.lastModified,
    pageTitle: metadata.title,
    pageDescription: metadata.description,
    pageH1: metadata.h1,
  };
}

function createReviewNotes(source, primarySnapshot, relatedSnapshots) {
  const notes = [
    "Review generated metadata before publishing.",
    "Confirm pricing, plan limits, feature claims, and affiliate terms manually.",
  ];

  if (!primarySnapshot.pageDescription) {
    notes.push("No meta description was found; shortDescription may need manual writing.");
  }

  if (!primarySnapshot.pageH1) {
    notes.push("No H1 was found; verify the page is the correct official product page.");
  }

  for (const snapshot of relatedSnapshots) {
    if (snapshot.contentType && !snapshot.contentType.includes("text/html")) {
      notes.push(`Unexpected content type for ${snapshot.pageType}: ${snapshot.contentType}.`);
    }
  }

  if (source.pricingUrl && !relatedSnapshots.some((snapshot) => snapshot.pageType === "pricing")) {
    notes.push("Pricing URL was configured but could not be collected.");
  }

  if (source.changelogUrl && !relatedSnapshots.some((snapshot) => snapshot.pageType === "changelog")) {
    notes.push("Changelog URL was configured but could not be collected.");
  }

  if (source.reviewNotes) {
    notes.push(...uniqueStrings(Array.isArray(source.reviewNotes) ? source.reviewNotes : [source.reviewNotes]));
  }

  return uniqueStrings(notes);
}

function toToolRecord(source, primarySnapshot, relatedSnapshots, options) {
  const name = source.name || primarySnapshot.pageH1 || primarySnapshot.pageTitle;
  const cleanName = String(name || "").trim();
  const description = source.shortDescription || primarySnapshot.pageDescription || primarySnapshot.pageH1 || primarySnapshot.pageTitle;
  const categorySlugs = source.categorySlugs || (options.categorySlug ? [options.categorySlug] : []);
  const fetchedAt = new Date().toISOString();
  const canonicalOrFinalUrl = primarySnapshot.canonicalUrl || primarySnapshot.finalUrl || source.url;
  const sourceUrls = uniqueStrings([
    source.url,
    canonicalOrFinalUrl,
    ...(source.sourceUrls || []),
    ...(source.pricingUrl ? [source.pricingUrl] : []),
    ...(source.changelogUrl ? [source.changelogUrl] : []),
  ]);

  return {
    name: cleanName,
    slug: source.slug || slugify(cleanName),
    editorialStatus: source.editorialStatus || "review",
    websiteUrl: source.url,
    affiliateUrl: source.affiliateUrl || undefined,
    affiliateDisclosure: source.affiliateDisclosure || undefined,
    shortDescription: String(description || "Imported tool metadata pending editorial review.").slice(0, 500),
    longDescription: source.longDescription || primarySnapshot.pageDescription || "",
    pricingModel: source.pricingModel || "unknown",
    startingPrice: source.startingPrice,
    freePlanAvailable: Boolean(source.freePlanAvailable),
    keyFeatures: source.keyFeatures || [],
    pros: source.pros || [],
    cons: source.cons || [],
    bestFor: source.bestFor || [],
    decisionSummary: source.decisionSummary || "Imported from public page metadata. Review before publishing.",
    recommendedFor: source.recommendedFor || [],
    notRecommendedFor: source.notRecommendedFor || [],
    sourceUrls,
    categorySlugs,
    seoTitle: source.seoTitle || primarySnapshot.pageTitle || cleanName,
    seoDescription: source.seoDescription || primarySnapshot.pageDescription || description,
    _collection: {
      collector: "url-metadata",
      collectedAt: fetchedAt,
      sourceUrl: source.url,
      finalUrl: primarySnapshot.finalUrl || source.url,
      canonicalUrl: primarySnapshot.canonicalUrl || "",
      httpStatus: primarySnapshot.httpStatus,
      contentType: primarySnapshot.contentType,
      lastModified: primarySnapshot.lastModified,
      pageTitle: primarySnapshot.pageTitle,
      pageDescription: primarySnapshot.pageDescription,
      pageH1: primarySnapshot.pageH1,
      relatedPages: relatedSnapshots.filter((snapshot) => snapshot.pageType !== "main"),
      reviewRequired: true,
      reviewNotes: createReviewNotes(source, primarySnapshot, relatedSnapshots),
      skippedFields: [
        "pricing details",
        "feature claims",
        "scores",
        "pros and cons",
        "affiliate status",
      ],
    },
  };
}

async function collectSource(source, options) {
  const snapshots = [];
  const pageFailures = [];
  const pages = [
    { pageType: "main", url: source.url },
    ...(source.pricingUrl ? [{ pageType: "pricing", url: source.pricingUrl }] : []),
    ...(source.changelogUrl ? [{ pageType: "changelog", url: source.changelogUrl }] : []),
  ];

  for (const page of pages) {
    try {
      snapshots.push(await collectPageSnapshot(page.pageType, page.url, options.timeoutMs));
    } catch (error) {
      pageFailures.push({
        name: source.name || source.url,
        pageType: page.pageType,
        url: page.url,
        collectedAt: new Date().toISOString(),
        error: error.message,
      });
    }
  }

  const primarySnapshot = snapshots.find((snapshot) => snapshot.pageType === "main");
  if (!primarySnapshot) {
    const mainFailure = pageFailures.find((failure) => failure.pageType === "main");
    throw new Error(mainFailure?.error || "main URL could not be collected");
  }

  return {
    record: toToolRecord(source, primarySnapshot, snapshots, options),
    failures: pageFailures,
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
      const result = await collectSource(source, options);
      records.push(result.record);
      failures.push(...result.failures);
      console.log(`collected: ${source.name || source.url}`);
    } catch (error) {
      failures.push({
        name: source.name || source.url,
        url: source.url,
        collectedAt: new Date().toISOString(),
        error: error.message,
      });
      console.warn(`failed: ${source.name || source.url}: ${error.message}`);
    }
  }

  await writeJson(options.output, records);
  console.log(`Wrote ${records.length} record(s) to ${options.output}.`);

  if (failures.length > 0) {
    const failureOutput = options.output.replace(/\.json$/i, ".failures.json");
    await writeJson(failureOutput, failures);
    console.warn(`Failure details written to ${failureOutput}.`);
    console.warn(`Failures: ${failures.length}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
