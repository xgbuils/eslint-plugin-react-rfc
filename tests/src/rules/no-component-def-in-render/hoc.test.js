const ERROR_MESSAGE =
  "component NestedComponent is defined in the same scope is rendered";

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
