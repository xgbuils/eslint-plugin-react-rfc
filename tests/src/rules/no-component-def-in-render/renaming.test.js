const ERROR_MESSAGE =
  "component NestedComponent is defined in the same scope is rendered";

const valid = [
  {
    description: "nested component assign",
    code: `
			const ParentComponent = () => {
				const NestedComponent = AnotherComponent;
				return <NestedComponent />;
			}
		`,
  },
  {
    description: "multiple nested component assign",
    code: `
			const ParentComponent = () => {
				const SecondComponent = FirstComponent;
				const ThirdComponent = SecondComponent;
				const NestedComponent = ThirdComponent;

				return <NestedComponent />;
			}
		`,
  },
  {
    description: "multiple nested component assign in different scopes",
    code: `
			const ParentComponent = () => {
				const SecondComponent = FirstComponent;
				if (SecondComponent) {
					const ThirdComponent = SecondComponent;
					if (ThirdComponent) {
						const NestedComponent = ThirdComponent;
						return <NestedComponent />;
					}
				}
				return <FirstComponent />;
			}
		`,
  },
  {
    description: "simple object destructuring renaming",
    code: `
			const ParentComponent = () => {
				const { AnotherComponent: NestedComponent } = { AnotherComponent };

				return <NestedComponent />;
			}
		`,
  },
  {
    description: "simple object destructuring renaming",
    code: `
			const ParentComponent = () => {
				const { NestedComponent } = { NestedComponent: AnotherComponent };

				return <NestedComponent />;
			}
		`,
  },
  {
    description: "simple array destructuring renaming",
    code: `
			const ParentComponent = () => {
				const [NestedComponent] = [AnotherComponent];

				return <NestedComponent />;
			}
		`,
  },
  {
    description: "array, then object destructuring",
    code: `
			const ParentComponent = () => {
				const [{ NestedComponent }] = [{ NestedComponent: AnotherComponent }];

				return <NestedComponent />;
			}
		`,
  },
  {
    description: "object, then array destructuring",
    code: `
			const ParentComponent = () => {
				const { foo: [, NestedComponent] } = { foo: [FirsComponent, SecondComponent] };

				return <NestedComponent />;
			}
		`,
  },
];

const invalid = [
  {
    description:
      "multiple nested component assign that finishes with nested definition",
    code: `
			const ParentComponent = () => {
				const FirstComponent = () => <div />;
				const SecondComponent = FirstComponent;
				const ThirdComponent = SecondComponent;
				const NestedComponent = ThirdComponent;

				return <NestedComponent />;
			}
		`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "simple object destructuring definition",
    code: `
			const ParentComponent = () => {
				const { NestedComponent } = { NestedComponent: () => <div/> };

				return <NestedComponent />;
			}
		`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "simple array destructuring definition",
    code: `
			const ParentComponent = () => {
				const [NestedComponent] = [() => <div/>];

				return <NestedComponent />;
			}
		`,
    errors: [{ message: ERROR_MESSAGE }],
  },
];

const versions = [2015];

export { valid, invalid, versions };
