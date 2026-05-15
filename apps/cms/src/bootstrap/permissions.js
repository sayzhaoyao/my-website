"use strict";

const crypto = require("node:crypto");

const publicReadActions = [
  "api::category.category.find",
  "api::category.category.findOne",
  "api::tool.tool.find",
  "api::tool.tool.findOne",
  "api::best-list.best-list.find",
  "api::best-list.best-list.findOne",
  "api::comparison.comparison.find",
  "api::comparison.comparison.findOne",
  "api::alternative.alternative.find",
  "api::alternative.alternative.findOne",
];

function createDocumentId() {
  return crypto.randomBytes(12).toString("hex");
}

async function ensurePublicReadPermissions(strapi) {
  const knex = strapi.db.connection;
  const publicRole = await knex("up_roles").where({ type: "public" }).first();

  if (!publicRole) {
    strapi.log.warn("[permissions] Public role was not found");
    return;
  }

  for (const action of publicReadActions) {
    let permission = await knex("up_permissions").where({ action }).first();

    if (!permission) {
      const now = new Date();
      const inserted = await knex("up_permissions")
        .insert({
          document_id: createDocumentId(),
          action,
          created_at: now,
          updated_at: now,
          published_at: now,
        })
        .returning(["id", "action"]);

      permission = Array.isArray(inserted) ? inserted[0] : { id: inserted };
    }

    const existingLink = await knex("up_permissions_role_lnk")
      .where({
        permission_id: permission.id,
        role_id: publicRole.id,
      })
      .first();

    if (!existingLink) {
      await knex("up_permissions_role_lnk").insert({
        permission_id: permission.id,
        role_id: publicRole.id,
      });
    }
  }

  strapi.log.info("[permissions] Public read permissions are ready");
}

module.exports = {
  ensurePublicReadPermissions,
};
