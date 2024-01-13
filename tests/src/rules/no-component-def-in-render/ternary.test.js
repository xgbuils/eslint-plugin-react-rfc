const ERROR_MESSAGE =
  "component NestedComponent is defined in the same scope is rendered";

const valid = [
  {
    description: "create a nested component using ternary",
    code: `
			const ParentComponent = ({success}) => {
				const NestedComponent = success ? SuccessComponent : ErrorComponent;
				return <NestedComponent />;
			}
		`,
    options: [{ allowTernary: true }],
  },
  {
    description: "create a nested component using ternary without options",
    code: `
			const ParentComponent = ({success}) => {
				const NestedComponent = success ? SuccessComponent : ErrorComponent;
				return <NestedComponent />;
			}
		`,
  },
  {
    description: "create a nested component using double ternary",
    code: `
			const ParentComponent = ({success, isValid}) => {
				const NestedComponent = success
					? (isValid ? SuccessValidComponent : SuccessInvalidComponent)
					: (isValid ? ErrorValidComponent : ErrorInvalidComponent);
				return <NestedComponent />;
			}
		`,
  },
];

const invalid = [
  {
    description:
      "create a nested component using ternary is not valid if it is not allowed",
    code: `
			const ParentComponent = ({success}) => {
				const NestedComponent = success ? SuccessComponent : ErrorComponent;
				return <NestedComponent />;
			}
		`,
    errors: [{ message: ERROR_MESSAGE }],
    options: [{ allowTernary: false }],
  },
];

export { valid, invalid };
