const valid = [
  {
    description: "react app index",
    code: `
    import React from 'react'
    import App from './App.jsx'

    ReactDOM.createRoot(document.getElementById('root')).render(
      <App />
    )
  `,
  },
  {
    version: 2020,
    description: "using spread operator in params",
    code: `
      const ParentComponent = ({ok, ...rest}) => {
        return ok ? <Component data={rest.data} /> : null;
      }
    `,
  },
  {
    version: 2020,
    description: "using spread operator in params",
    code: `
			const ParentComponent = ({prop: [ok, ...rest]}) => {
				return ok ? <Component data={rest[1]} /> : null;
			}
		`,
  },
];

const invalid = [];

export { valid, invalid };
