const ERROR_MESSAGE =
  "Do not define component NestedComponent in the same scope is rendered. Move the component definition out of the ParentComponent scope. More info: https://react.dev/learn/your-first-component#nesting-and-organizing-components";

const valid = [];

const invalid = [
  {
    description: "Nested component using useMemo",
    code: `
		const ParentComponent = () => {
			const NestedComponent = useMemo(() => () => <Component />, []);
			return <NestedComponent />;
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "Nested component using useCallback",
    code: `
		const ParentComponent = () => {
			const NestedComponent = useCallback(() => <Component />, []);
			return <NestedComponent />;
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
];

export { valid, invalid };
