import { RuleTester } from "eslint";
import { glob } from "glob";
import * as path from "node:path";
import { formatError, formatErrorSummary, formatSuccess } from "./format.js";
import { createReport } from "./createReport.js";
import plugin from "../../src/index.js";

const selectTestProps = ({ code, errors, options }) => ({
  code,
  errors,
  ...(options && { options }),
});

const createTestGroup = ({ valid, invalid, file, versions, ruleName } = {}) => {
  const errors = [];
  const ruleTesters = {};
  const getRuleTester = (version) =>
    ruleTesters[version] ??
    new RuleTester({
      parserOptions: {
        ecmaVersion: version,
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    });

  const runRuleTest = (type, { version, ruleName }) => {
    return (useCase, index) => {
      const ruleTester = getRuleTester(useCase.version ?? version);
      const cases = {
        valid: [],
        invalid: [],
        [type === "valid" ? "valid" : "invalid"]: [selectTestProps(useCase)],
      };
      try {
        ruleTester.run(ruleName, plugin.rules[ruleName], cases);
      } catch (error) {
        errors.push(
          createReport(error, {
            ...useCase,
            file,
            type,
            index,
          }),
        );
      }
    };
  };

  return {
    run() {
      try {
        versions.forEach((version) => {
          const options = {
            version,
            ruleName,
          };
          valid.forEach(runRuleTest("valid", options));
          invalid.forEach(runRuleTest("invalid", options));
        });
        return errors;
      } catch (error) {
        return [];
      }
    },
  };
};

const createRuleTester = () => {
  return {
    async run() {
      let hasErrors = false;
      const files = await glob("tests/src/rules/**/*.test.js");
      await Promise.all(
        files.map(async (file) => {
          const ruleName = path.dirname(file).split(path.sep).slice(-1)[0];
          const filePath = path.resolve(process.cwd(), file);
          const {
            valid = [],
            invalid = [],
            parsing = [],
            versions = [2015, 2020],
            // eslint-disable-next-line node/no-unsupported-features/es-syntax
          } = await import(filePath);
          const numberOfTests =
            (valid.length + invalid.length) * versions.length;
          const errors = createTestGroup({
            file,
            valid,
            invalid,
            parsing,
            versions,
            ruleName,
          }).run();
          if (errors.length > 0) {
            hasErrors = true;
            console.log(formatErrorSummary({ file, numberOfTests, errors }));
            errors.forEach((error) => {
              console.log(formatError(error));
            });
          } else {
            const summary = formatSuccess({ file, numberOfTests });
            console.log(summary);
          }
        }),
      );
      if (hasErrors) {
        throw "Failed tests";
      }
    },
  };
};

export { createRuleTester };
