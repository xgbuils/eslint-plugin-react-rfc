import { default as rules } from "./rules/index.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");

const PLUGIN_NAME = pkg.name.replace(/^eslint-plugin-/, "");

const createConfigRules = (rules) => {
  return Object.entries(rules).reduce(
    (configRules, [name]) =>
      Object.assign(configRules, {
        [`${PLUGIN_NAME}/${name}`]: "error",
      }),
    {},
  );
};

export default {
  rules,
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: [PLUGIN_NAME],
      rules: createConfigRules(rules),
    },
  },
};
