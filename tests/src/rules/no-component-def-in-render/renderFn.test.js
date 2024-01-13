const ERROR_MESSAGE =
  "component NestedComponent is defined in the same scope is rendered";

const valid = [
  {
    description: "render arrow function",
    code: `
		const parentFunction = () => {
			return <NestedComponent />;
		}
	`,
  },
  {
    description: "render named function",
    code: `
		function parentFunction() {
			return <NestedComponent />;
		}
	`,
  },
  {
    description: "class method",
    code: `
	  class ParentComponent {
			parentFunction() {
				return <NestedComponent />;
			}
		}
	`,
  },
  {
    description: "class render method",
    code: `
	  class ParentComponent {
	 		render() {
				return <NestedComponent />;
			}
		}
	`,
  },
];

const invalid = [
  {
    description:
      "render arrow function that declares and renders the component",
    code: `
		const parentFunction = () => {
			const NestedComponent = () => <Component />;
			return <NestedComponent />;
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "render named function that declares and renders the component",
    code: `
		function parentFunction() {
			const NestedComponent = () => <Component />;
			return <NestedComponent />;
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "class method that declares and renders the component",
    code: `
	  class ParentComponent {
			parentFunction() {
				const NestedComponent = () => <Component />;
				return <NestedComponent />;
			}
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "class render method that declares and renders the component",
    code: `
	  class ParentComponent {
			render() {
				const NestedComponent = () => <Component />;
				return <NestedComponent />;
			}
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
];

export { valid, invalid };
