const ERROR_MESSAGE =
  "Do not define component NestedComponent in the same scope is rendered. Move the component definition out of the ParentComponent scope. More info: https://react.dev/learn/your-first-component#nesting-and-organizing-components";

const valid = [
  {
    description: "HOC with arrow functions",
    code: `
		const withHappiness = (Component) => (props) => (
			<Happy>
				<Component {...props} />
			</Happy>
		);
	`,
  },
  {
    description: "HOC with inner anonymous function expression",
    code: `
		const withHappiness = (Component) => function(props) {
			return (
				<Happy>
					<Component {...props} />
				</Happy>
			)
		};
	`,
  },
  {
    description: "HOC with inner named function expression",
    code: `
		const withHappiness = (Component) => function innerFunction(props) {
			return (
				<Happy>
					<Component {...props} />
				</Happy>
			)
		};
	`,
  },
  {
    code: `
		const NestedComponent = withHappiness(SadNestedComponent);
		const ParentComponent = () => {
			return <NestedComponent />;
		}
	`,
  },
];

const invalid = [
  {
    description: "Nested component using a HOC",
    code: `
		const ParentComponent = () => {
			const NestedComponent = withHappiness(SadNestedComponent);
			return <NestedComponent />;
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
];

export { valid, invalid };
