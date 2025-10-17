// Load environment variables first for Vercel serverless
require("dotenv").config();

const app = require("../app");

module.exports = app;
