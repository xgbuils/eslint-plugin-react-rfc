const ERROR_MESSAGE =
  "Do not define component NestedComponent in the same scope is rendered. Move the component definition out of the ParentComponent scope. More info: https://react.dev/learn/your-first-component#nesting-and-organizing-components";

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
