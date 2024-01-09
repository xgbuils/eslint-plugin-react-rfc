# eslint-plugin-react-rfc

experimental React specific linting rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-react-rfc`:

```sh
npm install eslint-plugin-react-rfc --save-dev
```

## Usage

Add `react-rfc` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["react-rfc"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "react-rfc/rule-name": 2
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

💼 [Configurations](https://github.com/xgbuils/eslint-plugin-react-rfc/#shareable-configs) enabled in.\
✅ Set in the `recommended` [configuration](https://github.com/xgbuils/eslint-plugin-react-rfc/#shareable-configs).

| Name                                                                   | Description                                    | 💼 |
| :--------------------------------------------------------------------- | :--------------------------------------------- | :- |
| [no-component-def-in-render](docs/rules/no-component-def-in-render.md) | disallow to define a component in render scope | ✅  |

<!-- end auto-generated rules list -->

## Shareable configs
