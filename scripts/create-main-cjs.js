import fs from "node:fs/promises";

const content = "module.exports = require('.').default;";

fs.writeFile("lib/main.js", content, "utf-8");
