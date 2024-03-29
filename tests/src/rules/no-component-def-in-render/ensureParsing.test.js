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
    description: "react app index",
    code: `
    import React from 'react'
    const App = () => <div>App!</div>;

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
  {
    version: 2020,
    description: "using spread operator in variable declaration",
    code: `
      const ParentComponent = (props) => {
        const {ok, ...rest} = props;
        return ok ? <Component data={rest.data} /> : null;
      }
    `,
  },
  {
    version: 2020,
    description: "using spread operator in variable declaration",
    code: `
      const ParentComponent = ({prop}) => {
        const [ok, ...rest] = prop;
        return ok ? <Component data={rest[1]} /> : null;
      }
    `,
  },
  {
    version: 2020,
    description: "using spread element in variable init value",
    code: `
      const ParentComponent = (props) => {
        const { type, ok } = {
          type,
          ...props.config,
        };
        return ok ? <Component type={type} /> : null;
      }
    `,
  },
  {
    version: 2020,
    description: "using spread element in variable init value",
    code: `
      const ParentComponent = (props) => {
        const [type, ok] = [
          type,
          ...props.config,
        ];
        return ok ? <Component type={type} /> : null;
      }
    `,
  },
];

const invalid = [];

export { valid, invalid };
