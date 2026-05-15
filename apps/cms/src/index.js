"use strict";

const { seedSampleData } = require("./bootstrap/seed");
const { ensurePublicReadPermissions } = require("./bootstrap/permissions");

module.exports = {
  register() {},
  async bootstrap({ strapi }) {
    await ensurePublicReadPermissions(strapi);

    if (process.env.SEED_SAMPLE_DATA === "true") {
      await seedSampleData(strapi);
    }
  },
};
