# Natwest-Frontend-Code-Test

React application to fetch and display stub payments data.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the projects' dependencies.

### `npm start`

- Starts the Stub API on http://localhost:9001/api

- Runs the app in the development mode.\
  Open [http://localhost:9000](http://localhost:9000) to view it in your browser.

  The page will reload when you make changes.

## Additional Comments

### Best Practices Implemented

(Some of these are somewhat undermined by the scale of the app).

- Component-centric file structure. Files related to a specific component should be kept under a single folder.
- Decomposition of large components into small components (PaymentsTable.jsx). Ensures that components perform a singular function - its generally easier to manage, test, reuse and create a new small components.
- Appropriate, concise & descriptive naming and caps-casing of components, variables, app-level constants, props and state.
- React functional components.
- Destructuring props.
- Dynamic rendering with the `&&` operator.
- Wrapping the rendered output in a fragment, rather than div tags - satisfies React and avoids adding an additional node onto the DOM.
- try-catch blocks.
- ES6 features (let/const, arrow functions, Async Await etc).

### Scope for further work

- Props validation and default props with `.propTypes` & `.defaultProps`.
- Unit and component testing with Jest & RTL.
- Review whether I've been too defensive with nullsafe accessors - some may be redundant/duplicated.
- Ensure to always use unique keys across the app. Not every array item in the app has a unique id, so I could've (and should've) used an external library like uuidv4 for generating unique ids (see [array].`map` functions in PaymentsTable.jsx).
- In app.jsx, the isLoading & isInitialLoad state values are so closely tied that they could likely be combined/consolidated into one value.
- Split the PaymentTable into 3 seperate components for testability - PaymentsTable, PaymentsTableHeader & PaymentsTableBody.

### Other considerations/nice-to-haves

- Dockerising the application.
- Implementing a build & test pipeline into the PR process.
- Environment variables for handling multiple possible API hostnames/endpoints.
- Configure ESLint to catch linting errors during development.
