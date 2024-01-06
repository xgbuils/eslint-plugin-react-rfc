const ERROR_MESSAGE =
  "Do not define component NestedComponent in the same scope is rendered. Move the component definition out of the ParentComponent scope. More info: https://react.dev/learn/your-first-component#nesting-and-organizing-components";

const valid = [
  {
    description: "another unused component is declared in a object prop",
    code: `
	const ParentComponent = () => {
		const { AnotherComponent } = getComponents();
		return <NestedComponent />;
	}
`,
  },
  {
    description:
      "another unused component is declared and renamed from an object prop",
    code: `
	const ParentComponent = () => {
		const { prop: AnotherComponent } = getComponents();
		return <NestedComponent />;
	}
`,
  },
  {
    description: "another quite deep component is declared in object prop",
    code: `
	const ParentComponent = () => {
		const {
			prop: {
				foo: { AnotherComponent }
			}
		} = getComponents();
		return <NestedComponent />;
	}
`,
  },
];

const invalid = [
  {
    description: "nested component is declared in an object prop",
    code: `
		const ParentComponent = () => {
			const { NestedComponent } = getComponents();
			return <NestedComponent />;
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "nested component is declared and renamed from an object prop",
    code: `
		const ParentComponent = () => {
			const { prop: NestedComponent } = getComponents();
			return <NestedComponent />;
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "nested component is declared in an array prop",
    code: `
		const ParentComponent = () => {
			const [ NestedComponent ] = getComponents();
			return <NestedComponent />;
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "quite deep nested component is declared in object prop",
    code: `
		const ParentComponent = () => {
			const { 
				prop: {
					foo: { NestedComponent }
				}
			} = getComponents();
			return <NestedComponent />;
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "quite deep nested component is declared in array prop",
    code: `
		const ParentComponent = () => {
			const { 
        prop: {
          foo: [ NestedComponent ]
        }
      } = getComponents();
			return <NestedComponent />;
		}
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
];

const versions = [2015];

export { valid, invalid, versions };
