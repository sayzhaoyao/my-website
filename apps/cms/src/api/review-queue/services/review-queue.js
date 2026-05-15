"use strict";

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::review-queue.review-queue");
