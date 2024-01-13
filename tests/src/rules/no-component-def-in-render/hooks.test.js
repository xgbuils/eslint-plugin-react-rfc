const ERROR_MESSAGE =
  "component NestedComponent is defined in the same scope is rendered";

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
