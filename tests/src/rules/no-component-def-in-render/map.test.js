const ERROR_MESSAGE =
  "Do not define component NestedComponent in the same scope is rendered. Move the component definition out of the ParentComponent scope. More info: https://react.dev/learn/your-first-component#nesting-and-organizing-components";

const valid = [
  {
    description:
      "map arrow function callback without component definition inside",
    code: `
		const ParentComponent = ({list}) => {
			return (
				<div>
					{list.map((item) => {
						return <NestedComponent {...item} />
					})}
				</div>
			)
		};
	`,
  },
  {
    description:
      "map anonymous function callback without component definition inside",
    code: `
		const ParentComponent = ({list}) => {
			return (
				<div>
					{list.map(function(item) {
						return <NestedComponent {...item} />
					})}
				</div>
			)
		};
	`,
  },
  {
    description:
      "map named function callback without component definition inside",
    code: `
		const ParentComponent = ({list}) => {
			return (
				<div>
					{list.map(function innerFunction(item) {
						return <NestedComponent {...item} />
					})}
				</div>
			)
		};
	`,
  },
];

const invalid = [
  {
    description: "map arrow function callback with component definition inside",
    code: `
		const ParentComponent = ({list}) => {
			return (
				<div>
					{list.map((item) => {
						const NestedComponent = () => <div/>;
						return <NestedComponent {...item} />
					})}
				</div>
			)
		};
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "map anonymous function callback with component definition inside",
    code: `
		const ParentComponent = ({list}) => {
			return (
				<div>
					{list.map(function(item) {
						const NestedComponent = () => <div/>;
						return <NestedComponent {...item} />
					})}
				</div>
			)
		};
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description: "map named function callback with component definition inside",
    code: `
			const ParentComponent = ({list}) => {
				return (
					<div>
						{list.map(function innerFunction(item) {
							const NestedComponent = () => <div/>;
							return <NestedComponent {...item} />
						})}
					</div>
				)
			};
		`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "map arrow function callback and component definition in component that calls map",
    code: `
		const ParentComponent = ({list}) => {
			const NestedComponent = () => <div/>;
			return (
				<div>
					{list.map((item) => {
						return <NestedComponent {...item} />
					})}
				</div>
			)
		};
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "map anonymous function callback and component definition in component that calls map",
    code: `
		const ParentComponent = ({list}) => {
			const NestedComponent = () => <div/>;
			return (
				<div>
					{list.map(function(item) {
						return <NestedComponent {...item} />
					})}
				</div>
			)
		};
	`,
    errors: [{ message: ERROR_MESSAGE }],
  },
  {
    description:
      "map named function callback and component definition in component that calls map",
    code: `
			const ParentComponent = ({list}) => {
				const NestedComponent = () => <div/>;
				return (
					<div>
						{list.map(function innerFunction(item) {
							return <NestedComponent {...item} />
						})}
					</div>
				)
			};
		`,
    errors: [{ message: ERROR_MESSAGE }],
  },
];

export { valid, invalid };
