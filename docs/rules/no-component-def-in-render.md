# Disallow to define a component in render scope (`react-rfc/no-component-def-in-render`)

💼 This rule is enabled in the ✅ `recommended` [config](https://github.com/xgbuils/eslint-plugin-react-rfc/#shareable-configs).

<!-- end auto-generated rule header -->

## Options

<!-- begin auto-generated rule options list -->

| Name                   | Type    |
| :--------------------- | :------ |
| `allowComponentMap`    | Boolean |
| `allowNullishOperator` | Boolean |
| `allowOrOperator`      | Boolean |
| `allowTernary`         | Boolean |

<!-- end auto-generated rule options list -->

## Examples

### Examples of incorrect code for this default rule:

Nested component:

```JavaScript
/* eslint no-component-def-in-render: "error" */
const ParentComponent = () => {
  const NestedComponent = () => <div>Hi!</div>;
  return <NestedComponent />;
};
```

Nested component defined with a hook:

```JavaScript
/* eslint no-component-def-in-render: "error" */
const ParentComponent = () => {
  const NestedComponent = useCallback(() => <div>Hi!</div>, []);
  return <NestedComponent />;
};
```

Nested component defined with a HOC:

```JavaScript
/* eslint no-component-def-in-render: "error" */
const Component = () => <div>Hi!</div>;

const ParentComponent = () => {
  const NestedComponent = withFantasy(Component);
  return <NestedComponent />;
};
```

Inside a map method:

```JavaScript
/* eslint no-component-def-in-render: "error" */
const ParentComponent = ({ items }) => {
  const NestedComponent = () => <div>Hi!</div>;
  return (
    <div>
      {items.map(({id, name}) => (
        <NestedComponent />
      ))}
    </div>
  );
};
```

### Examples of correct code for this default rule:

Non-nested component:

```JavScript
/* eslint no-component-def-in-render: "error" */
const NonNestedComponent = () => <div>Hi!</div>;

const ParentComponent = () => {
  return <NonNestedComponent />;
};
```

Non-nested component defined with a HOC:

```JavaScript
/* eslint no-component-def-in-render: "error" */
const Component = () => <div>Hi!</div>;
const NonNestedComponent = withFantasy(Component);

const ParentComponent = () => {
  return <NonNestedComponent />;
};
```

Non-nested component in a map method:

```JavaScript
/* map method */
/* eslint no-component-def-in-render: "error" */
const NonNestedComponent = () => <div>Hi!</div>;

const ParentComponent = ({ items }) => {
  return (
    <div>
      {items.map(({id, name}) => (
        <NonNestedComponent />
      ))}
    </div>
  );
};
```

Renamed component in render:

```JavaScript
/* eslint no-component-def-in-render: "error" */
const Component = () => <div>Hi!</div>;

const ParentComponent = ({ items }) => {
  const RenamedComponent = Component;
  return <RenamedComponent />;
}

```

Ternary operator:

```JavaScript
/* eslint no-component-def-in-render: "error" */
const SuccessComponent = () => <div>Hi!</div>;
const FailureComponent = () => <div>Bye!</div>;

const ParentComponent = ({ ok }) => {
  const ValidNestedComponent = ok ? SuccessComponent : FailureComponent;
  return <ValidNestedComponent />;
}

```

Component map:

```JavaScript
/* eslint no-component-def-in-render: "error" */
const SuccessComponent = () => <div>Hi!</div>;
const FailureComponent = () => <div>Bye!</div>;
const componentMap = {
  success: SuccessComponent,
  failure: FailureComponent,
}

const ParentComponent = ({ type }) => {
  const ValidNestedComponent = componentMap[type];
  return <ValidNestedComponent />;
}

```

Nullish operator:

```JavaScript
/* eslint no-component-def-in-render: "error" */
const SuccessComponent = () => <div>Hi!</div>;
const FailureComponent = () => <div>Bye!</div>;
const componentMap = {
  success: SuccessComponent,
  failure: FailureComponent,
}

const ParentComponent = ({ type }) => {
  const ValidNestedComponent = componentMap[type] ?? FailureComponent;
  return <ValidNestedComponent />;
}

```

Or operator:

```JavaScript
/* eslint no-component-def-in-render: "error" */
const SuccessComponent = () => <div>Hi!</div>;
const FailureComponent = () => <div>Bye!</div>;
const componentMap = {
  success: SuccessComponent,
  failure: FailureComponent,
}

const ParentComponent = ({ type }) => {
  const ValidNestedComponent = componentMap[type] || FailureComponent;
  return <ValidNestedComponent />;
}

```

### Examples of incorrect code for this configured rule:

Ternary operator:

```JavaScript
/* eslint no-component-def-in-render: ["error", {
  "allowTernary": false
}] */
const SuccessComponent = () => <div>Hi!</div>;
const FailureComponent = () => <div>Bye!</div>;

const ParentComponent = ({ ok }) => {
  const InvalidNestedComponent = ok ? SuccessComponent : FailureComponent;
  return <InvalidNestedComponent />;
};
```

Component map:

```JavaScript
/* eslint no-component-def-in-render: ["error", {
  "allowComponentMap": false
}] */
const SuccessComponent = () => <div>Hi!</div>;
const FailureComponent = () => <div>Bye!</div>;
const componentMap = {
  success: SuccessComponent,
  failure: FailureComponent,
};

const ParentComponent = ({ type }) => {
  const InvalidNestedComponent = componentMap[type];
  return <InvalidNestedComponent />;
};
```

Nullish operator:

```JavaScript
/* eslint no-component-def-in-render: ["error", {
  "allowNullishOperator": false
}] */
const SuccessComponent = () => <div>Hi!</div>;
const FailureComponent = () => <div>Bye!</div>;
const componentMap = {
  success: SuccessComponent,
  failure: FailureComponent,
}

const ParentComponent = ({ type }) => {
  const InvalidNestedComponent = componentMap[type] ?? FailureComponent;
  return <InvalidNestedComponent />;
};
```

Or operator:

```JavaScript
/* eslint no-component-def-in-render: ["error", {
  "allowOrOperator": false
}] */
const SuccessComponent = () => <div>Hi!</div>;
const FailureComponent = () => <div>Bye!</div>;
const componentMap = {
  success: SuccessComponent,
  failure: FailureComponent,
};

const ParentComponent = ({ type }) => {
  const InvalidNestedComponent = componentMap[type] || FailureComponent;
  return <InvalidNestedComponent />;
};
```
