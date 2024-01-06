import chalk from "chalk";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const diff = require("diff");
const { red, green } = chalk;

const logSymbol = {
  success: "✔",
  warning: "⚠",
  error: "✖",
};

const isNotEmptyLine = ({ line }) => line.trim().length > 0;

const formatCode = (code) => {
  const rawLines = code
    .replace(/\t/gm, "  ")
    .split("\n")
    .map((line, index) => ({ line, row: index + 1 }));
  const startIndex = rawLines.findIndex(isNotEmptyLine);
  const endIndex = rawLines.findLastIndex(isNotEmptyLine);
  const lines = rawLines.slice(startIndex, endIndex + 1);

  const spacing = lines.reduce((spacing, { line }) => {
    if (/^\s*$/.test(line)) {
      return spacing;
    }
    const [spaces] = /^\s*/.exec(line);
    return Math.min(spacing ?? Infinity, spaces.length);
  }, null);
  const padding = `${lines[lines.length - 1].row}`.length;
  return lines
    .map(
      ({ line, row }) =>
        "#" + `${row}`.padEnd(padding + 2) + line.slice(spacing),
    )
    .join("\n");
};

const formatEslintConfigOptions = (options) => {
  return options
    ? "eslint config options:\n" + JSON.stringify(options, null, 2)
    : "";
};

const formatEqualStringErrorMessage = (report) => {
  const { error } = report;
  const textDiff = diff.diffChars(error.expected, error.actual);
  const actual = textDiff
    .filter(({ removed }) => !removed)
    .map(({ value, added }) => (added ? green(value) : value))
    .join("");
  const expected = textDiff
    .filter(({ added }) => !added)
    .map(({ value, removed }) => (removed ? red(value) : value))
    .join("");
  return (
    `${report.message}:\n` +
    `${ADD_SYMBOL} ${green("actual")} ${REMOVE_SYMBOL} ${red("expected")}\n` +
    `${ADD_SYMBOL} ${actual} \n` +
    `${REMOVE_SYMBOL} ${expected} \n`
  );
};

const formatParsingError = (report) => {
  const { error } = report;
  return "[PARSING_ERROR]: " + error.message + "\n\n";
};

const ADD_SYMBOL = green("+");
const REMOVE_SYMBOL = red("-");

const formatErrorMessage = (report) => {
  if (report.errorType === "ParsingError") {
    return formatParsingError(report);
  }
  if (
    report.error.code === "ERR_ASSERTION" &&
    typeof report.error.actual === "string"
  ) {
    return formatEqualStringErrorMessage(report);
  }
  return (
    report.message +
    ":\n" +
    (report.errors ?? []).map(({ ruleId, line, column, message }) => {
      return JSON.stringify(
        {
          ruleId,
          line,
          column,
          message,
        },
        null,
        2,
      );
    })
  );
};

export const formatError = (report) => {
  return [
    `${report.type} #${report.index + 1} test failed.`,
    formatCode(report.code),
    formatEslintConfigOptions(report.options),
    formatErrorMessage(report),
  ]
    .filter((section) => section.length > 0)
    .join("\n\n");
};

const pluralTests = (num) => (num === 1 ? "test" : "tests");

export const formatErrorSummary = ({ numberOfTests, file, errors }) => {
  return (
    chalk.red(logSymbol.error) +
    ` ${file}: ${chalk.red(errors.length)} of ${numberOfTests} ` +
    pluralTests(numberOfTests) +
    " failed"
  );
};

export const formatSuccess = ({ numberOfTests, file }) => {
  return (
    chalk.green(logSymbol.success) +
    ` ${file}: ${chalk.green(numberOfTests)} ` +
    pluralTests(numberOfTests) +
    " passed"
  );
};
