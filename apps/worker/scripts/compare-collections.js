import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const defaultPrevious = "data/generated/url-metadata.previous.json";
const defaultCurrent = "data/generated/url-metadata.tools.json";
const defaultOutput = "data/generated/url-metadata.review-report.json";

const topLevelFields = [
  ["seoTitle", "SEO title"],
  ["seoDescription", "SEO description"],
  ["shortDescription", "Short description"],
];

const collectionFields = [
  ["finalUrl", "Final URL"],
  ["canonicalUrl", "Canonical URL"],
  ["lastModified", "Last-Modified"],
  ["pageTitle", "Page title"],
  ["pageDescription", "Page description"],
  ["pageH1", "Page H1"],
];

function parseArgs(argv) {
  const options = {
    previous: defaultPrevious,
    current: defaultCurrent,
    output: defaultOutput,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--previous") {
      options.previous = argv[index + 1];
      index += 1;
    } else if (arg === "--current") {
      options.current = argv[index + 1];
      index += 1;
    } else if (arg === "--output") {
      options.output = argv[index + 1];
      index += 1;
    }
  }

  return options;
}

async function readJson(filePath) {
  const content = await fs.readFile(path.resolve(process.cwd(), filePath), "utf8");
  const data = JSON.parse(content);
  if (!Array.isArray(data)) {
    throw new Error(`${filePath} must contain an array.`);
  }
  return data;
}

async function writeJson(filePath, data) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function keyForRecord(record) {
  return record.slug || record.websiteUrl || record.name;
}

function valueOf(object, key) {
  const value = object?.[key];
  if (value === undefined || value === null) {
    return "";
  }
  return String(value);
}

function compareField(changes, scope, label, previous, current, key) {
  const previousValue = valueOf(previous, key);
  const currentValue = valueOf(current, key);

  if (previousValue !== currentValue) {
    changes.push({
      scope,
      field: label,
      previous: previousValue,
      current: currentValue,
    });
  }
}

function relatedPageMap(record) {
  const pages = record?._collection?.relatedPages || [];
  return new Map(pages.map((page) => [page.pageType, page]));
}

function compareRelatedPages(changes, previousRecord, currentRecord) {
  const previousPages = relatedPageMap(previousRecord);
  const currentPages = relatedPageMap(currentRecord);
  const pageTypes = Array.from(new Set([...previousPages.keys(), ...currentPages.keys()])).sort();

  for (const pageType of pageTypes) {
    const previousPage = previousPages.get(pageType);
    const currentPage = currentPages.get(pageType);

    if (!previousPage) {
      changes.push({
        scope: pageType,
        field: "Page snapshot",
        previous: "",
        current: currentPage?.finalUrl || currentPage?.sourceUrl || "",
      });
      continue;
    }

    if (!currentPage) {
      changes.push({
        scope: pageType,
        field: "Page snapshot",
        previous: previousPage?.finalUrl || previousPage?.sourceUrl || "",
        current: "",
      });
      continue;
    }

    for (const [key, label] of collectionFields) {
      compareField(changes, pageType, label, previousPage, currentPage, key);
    }
  }
}

function reviewPriority(changes) {
  if (changes.some((change) => change.field === "Canonical URL" || change.field === "Final URL")) {
    return "high";
  }

  if (changes.some((change) => change.scope === "pricing" || change.scope === "changelog")) {
    return "medium";
  }

  if (changes.length > 0) {
    return "low";
  }

  return "none";
}

function compareRecord(previousRecord, currentRecord) {
  const changes = [];

  for (const [key, label] of topLevelFields) {
    compareField(changes, "tool", label, previousRecord, currentRecord, key);
  }

  for (const [key, label] of collectionFields) {
    compareField(changes, "main", label, previousRecord?._collection, currentRecord?._collection, key);
  }

  compareRelatedPages(changes, previousRecord, currentRecord);

  return {
    key: keyForRecord(currentRecord || previousRecord),
    name: currentRecord?.name || previousRecord?.name || "",
    slug: currentRecord?.slug || previousRecord?.slug || "",
    websiteUrl: currentRecord?.websiteUrl || previousRecord?.websiteUrl || "",
    status: currentRecord && previousRecord ? "changed" : currentRecord ? "added" : "removed",
    reviewPriority: reviewPriority(changes),
    changes,
  };
}

function buildReport(previousRecords, currentRecords, options) {
  const previousByKey = new Map(previousRecords.map((record) => [keyForRecord(record), record]));
  const currentByKey = new Map(currentRecords.map((record) => [keyForRecord(record), record]));
  const keys = Array.from(new Set([...previousByKey.keys(), ...currentByKey.keys()])).sort();
  const items = [];

  for (const key of keys) {
    const previousRecord = previousByKey.get(key);
    const currentRecord = currentByKey.get(key);
    const item = compareRecord(previousRecord, currentRecord);

    if (item.status !== "changed" || item.changes.length > 0) {
      items.push(item);
    }
  }

  const summary = {
    comparedAt: new Date().toISOString(),
    previousFile: options.previous,
    currentFile: options.current,
    totalPrevious: previousRecords.length,
    totalCurrent: currentRecords.length,
    added: items.filter((item) => item.status === "added").length,
    removed: items.filter((item) => item.status === "removed").length,
    changed: items.filter((item) => item.status === "changed").length,
    highPriority: items.filter((item) => item.reviewPriority === "high").length,
    mediumPriority: items.filter((item) => item.reviewPriority === "medium").length,
    lowPriority: items.filter((item) => item.reviewPriority === "low").length,
  };

  return { summary, items };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const [previousRecords, currentRecords] = await Promise.all([
    readJson(options.previous),
    readJson(options.current),
  ]);
  const report = buildReport(previousRecords, currentRecords, options);

  await writeJson(options.output, report);
  console.log(`Compared ${previousRecords.length} previous record(s) with ${currentRecords.length} current record(s).`);
  console.log(`Changes: ${report.summary.changed}. Added: ${report.summary.added}. Removed: ${report.summary.removed}.`);
  console.log(`Review priority: high ${report.summary.highPriority}, medium ${report.summary.mediumPriority}, low ${report.summary.lowPriority}.`);
  console.log(`Wrote review report to ${options.output}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
