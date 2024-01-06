const ERROR_MESSAGE =
  "Do not define component NestedComponent in the same scope is rendered. Move the component definition out of the ParentComponent scope. More info: https://react.dev/learn/your-first-component#nesting-and-organizing-components";

const valid = [];

const invalid = [
  {
    description: "component in params definition is not valid",
    code: `
			const ParentComponent = ({NestedComponent}) => {
				return <NestedComponent />;
			}
		`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "aliased component in params definition is not valid",
    code: `
			const ParentComponent = ({ParamComponent: NestedComponent}) => {
				return <NestedComponent />;
			}
		`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "component in complex param structure definition is not valid",
    code: `
			const ParentComponent = ({array: [NestedComponent]}) => {
				return <NestedComponent />;
			}
		`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "renamed variable component in params definition is not valid",
    code: `
			const ParentComponent = ({ParamComponent}) => {
				const NestedComponent = ParamComponent
				return <NestedComponent />;
			}
		`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "renamed component inside condition in params definition is not valid",
    code: `
			const ParentComponent = ({ok, ParamComponent}) => {
				const RenamedComponent = ParamComponent;
				if (ok) {
					const NestedComponent = RenamedComponent
					return <NestedComponent />;
				}
				return null;
			}
		`,
    errors: [{ message: ERROR_MESSAGE }],
  },
];

export { valid, invalid };
