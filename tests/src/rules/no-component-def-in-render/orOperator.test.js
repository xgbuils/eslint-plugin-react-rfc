const ERROR_MESSAGE =
  "component NestedComponent is defined in the same scope is rendered";

const valid = [
  {
    description:
      "using component map and OR operator to define a default component is valid by default",
    code: `
		const ParentComponent = ({type}) => {
			const NestedComponent = componentMap[type] || DefaultComponent;
			return <NestedComponent />;
		}
	`,
  },
  {
    description:
      "using component map and OR operator to define a default component is valid when allowed",
    code: `
		const ParentComponent = ({type}) => {
			const NestedComponent = componentMap[type] || DefaultComponent;
			return <NestedComponent />;
		}
	`,
    options: [
      {
        allowComponentMap: true,
        allowOrOperator: true,
      },
    ],
  },
  {
    description:
      "using component map, ternary operator and OR operator to define a default component is valid by default",
    code: `
		const ParentComponent = ({type, success}) => {
			const NestedComponent = (success
        ? componentMap[type]
        : otherComponentMap[type])
        || DefaultComponent;
			return <NestedComponent />;
		}
	`,
  },
  {
    description:
      "using component map, ternary operator and OR operator to define a default component is valid when allowed",
    code: `
		const ParentComponent = ({type, success}) => {
			const NestedComponent = (success
        ? componentMap[type]
        : otherComponentMap[type])
        || DefaultComponent;
			return <NestedComponent />;
		}
	`,
    options: [
      { allowComponentMap: true, allowTernary: true, allowOrOperator: true },
    ],
  },
];

const invalid = [
  {
    description:
      "using component map and OR operator with null default component is valid when allowed",
    code: `
		const ParentComponent = ({type}) => {
			const NestedComponent = componentMap[type] || null;
			return <NestedComponent />;
		}
	`,
    options: [{ allowComponentMap: true, allowOrOperator: true }],
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "using component map and OR operator to define a default component is valid when allowed",
    code: `
		const ParentComponent = ({type}) => {
			const NestedComponent = componentMap[type] || DefaultComponent;
			return <NestedComponent />;
		}
	`,
    options: [{ allowComponentMap: true, allowOrOperator: false }],
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "using component map, ternary operator and OR operator to define a default component is valid when allowed",
    code: `
		const ParentComponent = ({type, success}) => {
			const NestedComponent = (success
        ? componentMap[type]
        : otherComponentMap[type])
        || DefaultComponent;
			return <NestedComponent />;
		}
	`,
    options: [
      { allowComponentMap: true, allowTernary: true, allowOrOperator: false },
    ],
    errors: [{ message: ERROR_MESSAGE }],
  },
];

export { valid, invalid };
