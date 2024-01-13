const ERROR_MESSAGE =
  "component NestedComponent is defined in the same scope is rendered";

const valid = [
  {
    description:
      "using component map and nullish operator to define a default component is valid by default",
    code: `
		const ParentComponent = ({type}) => {
			const NestedComponent = componentMap[type] ?? DefaultComponent;
			return <NestedComponent />;
		}
	`,
  },
  {
    description:
      "using component map and nullish operator to define a default component is valid when allowed",
    code: `
		const ParentComponent = ({type}) => {
			const NestedComponent = componentMap[type] ?? DefaultComponent;
			return <NestedComponent />;
		}
	`,
    options: [
      {
        allowComponentMap: true,
        allowNullishOperator: true,
      },
    ],
  },
  {
    description:
      "using component map, ternary operator and nullish operator to define a default component is valid by default",
    code: `
		const ParentComponent = ({type, success}) => {
			const NestedComponent = (success
        ? componentMap[type]
        : otherComponentMap[type])
        ?? DefaultComponent;
			return <NestedComponent />;
		}
	`,
    options: [
      {
        allowComponentMap: true,
        allowTernary: true,
        allowNullishOperator: true,
      },
    ],
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "using component map, ternary operator and nullish operator to define a default component is valid by default",
    code: `
		const ParentComponent = ({type, success}) => {
			const NestedComponent = (success
        ? componentMap[type]
        : otherComponentMap[type])
        ?? DefaultComponent;
			return <NestedComponent />;
		}
	`,
  },
];

const invalid = [
  {
    description:
      "using component map and nullish operator with null default component is always invalid",
    code: `
		const ParentComponent = ({type}) => {
			const NestedComponent = componentMap[type] ?? null;
			return <NestedComponent />;
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "using component map and nullish operator with null default component is always invalid",
    code: `
		const ParentComponent = ({type}) => {
			const NestedComponent = componentMap[type] ?? null;
			return <NestedComponent />;
		}
	`,
    options: [{ allowComponentMap: true, allowNullishOperator: true }],
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "using component map and nullish operator to define a default component is valid when allowed",
    code: `
		const ParentComponent = ({type}) => {
			const NestedComponent = componentMap[type] ?? DefaultComponent;
			return <NestedComponent />;
		}
	`,
    options: [{ allowComponentMap: true, allowNullishOperator: false }],
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "using component map, ternary operator and nullish operator to define a default component is invalid when nullish operator is not allowed",
    code: `
		const ParentComponent = ({type, success}) => {
			const NestedComponent = (success
        ? componentMap[type]
        : otherComponentMap[type])
        ?? DefaultComponent;
			return <NestedComponent />;
		}
	`,
    options: [
      {
        allowComponentMap: true,
        allowTernary: true,
        allowNullishOperator: false,
      },
    ],
    errors: [{ message: ERROR_MESSAGE }],
  },
];

const versions = [2020];

export { valid, invalid, versions };
