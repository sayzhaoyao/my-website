"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { createStrapi } = require("@strapi/strapi");

async function main() {
  const name = process.argv[2] || "worker-local-full-access";
  const app = await createStrapi().load();
  const apiTokenService = strapi.service("admin::api-token");

  const existing = await strapi.db.query("admin::api-token").findOne({
    where: { name },
  });

  if (existing) {
    await strapi.db.query("admin::api-token").delete({
      where: { id: existing.id },
    });
  }

  const token = await apiTokenService.create({
    name,
    description: "Local worker token for import testing.",
    kind: "content-api",
    type: "full-access",
    lifespan: null,
  });

  const outputDir = path.resolve(process.cwd(), ".tmp");
  const outputPath = path.join(outputDir, "worker-token.txt");
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, token.accessKey);

  console.log(`Created API token: ${name}`);
  console.log(`Token written to ${outputPath}`);
  await app.destroy();
}

main().catch(async (error) => {
  console.error(error);
  if (global.strapi) {
    await global.strapi.destroy();
  }
  process.exitCode = 1;
});
