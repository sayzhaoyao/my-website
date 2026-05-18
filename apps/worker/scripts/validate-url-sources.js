import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const defaultFile = "data/url-sources.sample.json";
const allowedPricingModels = new Set(["free", "freemium", "paid", "custom", "unknown"]);
const arrayFields = [
  "categorySlugs",
  "sourceUrls",
  "keyFeatures",
  "pros",
  "cons",
  "bestFor",
  "recommendedFor",
  "notRecommendedFor",
  "reviewNotes",
];
const stringFields = [
  "name",
  "slug",
  "url",
  "pricingUrl",
  "changelogUrl",
  "affiliateUrl",
  "affiliateDisclosure",
  "pricingModel",
  "shortDescription",
  "longDescription",
  "decisionSummary",
  "seoTitle",
  "seoDescription",
];

function parseArgs(argv) {
  const options = { file: defaultFile };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--file") {
      options.file = argv[index + 1];
      index += 1;
    }
  }

  return options;
}

async function readJson(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const content = await fs.readFile(absolutePath, "utf8");
  return JSON.parse(content);
}

function isPublicHttpUrl(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return false;
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return false;
  }

  const hostname = parsed.hostname.toLowerCase();
  return !(
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".local") ||
    hostname.startsWith("10.") ||
    hostname.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  );
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim());
}

function recordLabel(record, index) {
  return record?.name || record?.url || `record ${index + 1}`;
}

function validateRecord(record, index, seen) {
  const errors = [];
  const label = recordLabel(record, index);

  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return [`${label}: record must be an object.`];
  }

  if (!record.name || typeof record.name !== "string") {
    errors.push(`${label}: name is required.`);
  }

  if (!record.url || typeof record.url !== "string" || !isPublicHttpUrl(record.url)) {
    errors.push(`${label}: url must be a public http(s) URL.`);
  }

  for (const field of ["pricingUrl", "changelogUrl", "affiliateUrl"]) {
    if (record[field] !== undefined && (!record[field] || typeof record[field] !== "string" || !isPublicHttpUrl(record[field]))) {
      errors.push(`${label}: ${field} must be a public http(s) URL when provided.`);
    }
  }

  for (const field of stringFields) {
    if (record[field] !== undefined && typeof record[field] !== "string") {
      errors.push(`${label}: ${field} must be a string.`);
    }
  }

  for (const field of arrayFields) {
    if (record[field] !== undefined && !isStringArray(record[field])) {
      errors.push(`${label}: ${field} must be an array of non-empty strings.`);
    }
  }

  if (record.pricingModel !== undefined && !allowedPricingModels.has(record.pricingModel)) {
    errors.push(`${label}: pricingModel must be one of ${Array.from(allowedPricingModels).join(", ")}.`);
  }

  if (record.freePlanAvailable !== undefined && typeof record.freePlanAvailable !== "boolean") {
    errors.push(`${label}: freePlanAvailable must be a boolean.`);
  }

  for (const key of ["name", "slug", "url"]) {
    if (!record[key]) {
      continue;
    }
    const value = String(record[key]).toLowerCase();
    const seenKey = `${key}:${value}`;
    if (seen.has(seenKey)) {
      errors.push(`${label}: duplicate ${key} '${record[key]}'.`);
    }
    seen.add(seenKey);
  }

  return errors;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const data = await readJson(options.file);

  if (!Array.isArray(data)) {
    throw new Error(`${options.file} must contain an array.`);
  }

  const seen = new Set();
  const errors = data.flatMap((record, index) => validateRecord(record, index, seen));

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`[fail] ${error}`);
    }
    throw new Error(`URL source validation failed with ${errors.length} error(s).`);
  }

  console.log(`Validated ${data.length} URL source record(s) from ${options.file}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
