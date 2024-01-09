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
];

const invalid = [];

export { valid, invalid };
