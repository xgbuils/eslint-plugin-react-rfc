const ERROR_MESSAGE =
  "component NestedComponent is defined in the same scope is rendered";

const valid = [
  {
    description: "iife uses a NestedComponent such that is not defined before",
    code: `
		const ParentComponent = ({list}) => {
			return (() => <NestedComponent />)();
		};
	`,
  },
];

const invalid = [
  {
    description: "iife uses a NestedComponent such that is defined in the iife",
    code: `
		const ParentComponent = ({list}) => {
			return (() => {
        const NestedComponent = () => <div />;
        return <NestedComponent />;
      })();
		};
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "iife uses a NestedComponent such that is defined in ParentComponent",
    code: `
		const ParentComponent = ({list}) => {
      const NestedComponent = () => <div />;
			return (() => {
        return <NestedComponent />;
      })();
		};
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
];

export { valid, invalid };
