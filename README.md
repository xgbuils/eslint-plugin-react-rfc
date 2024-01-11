# eslint-plugin-react-rfc

Experimental React specific linting rules

## Motivation


[eslint-plugin-react][eslint-plugin-react] has a consolidated bunch of React linting rules. However it's difficult to have an space for proves of concept. This package collects a set of experimental rules that intents to be moved to `eslint-plugin-react` once get madurity.

## Installation

```sh
npm install eslint-plugin-react-rfc --save-dev
```

## Configuration (legacy: `.eslintrc*`)

Add `react-rfc` to the plugins section of your `.eslintrc*` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["react-rfc"]
}
```

Use our preset to get reasonable defaults:

```json
"extends": [
  "plugin:react-rfc/recommended"
],
```

## Rules

<!-- begin auto-generated rules list -->

💼 [Configurations](https://github.com/xgbuils/eslint-plugin-react-rfc/#shareable-configs) enabled in.\
✅ Set in the `recommended` [configuration](https://github.com/xgbuils/eslint-plugin-react-rfc/#shareable-configs).

| Name                                                                   | Description                                    | 💼 |
| :--------------------------------------------------------------------- | :--------------------------------------------- | :- |
| [no-component-def-in-render](docs/rules/no-component-def-in-render.md) | disallow to define a component in render scope | ✅  |

<!-- end auto-generated rules list -->

[eslint-plugin-react]: https://github.com/jsx-eslint/eslint-plugin-react
