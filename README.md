# Employee Directory App

This is a demo of a basic single-page web application that asynchronously fetches paginated data and displays it in tabular form. The data source I used is [the Rick & Morty graphql API](https://rickandmortyapi.com/), mainly because its easy and fun to use. Although, the data is little absurd for a supposed employee directory.

The main purpose is to demonstrate some software design patterns I have been using lately: namely [UI runtime dependency injection](https://en.wikipedia.org/wiki/Dependency_injection), but also experimenting with url as a state store.

## Live Demo

[Click here to see the app in action.](http://employee-directory-demo.s3-website-us-east-1.amazonaws.com/employees)

## Getting Started

### First, [install Node.js](https://nodejs.org). Then...

### `npm install`

Run this command from the base directory of this repository to install all the app's dependencies.

### `npm start`

Runs the app in `development` mode against fully mocked upstream dependencies. That means after initially loading the app, it works offline! Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run preview`

Runs the app in `preview` mode against production dependencies. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Note that this is not a standard create-react-app script.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Toolshed

- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)

## Features!

- **Search for employees by name!** The app searches as you type, so no need to press enter or--heaven forbid--reach for your mouse to click "Search". Worried about perf? Don't be: the text input change handler is [debounced](https://lodash.com/docs/4.17.15#debounce).
- **Async pagination!** We only load the results you ask for. As a bonus we load the first page of results as soon as the app starts.
- **Cached results!** Enjoy re-visiting pages without incurring network costs.
- **url as state store!** Want to bookmark a certain page for later viewing? Or send a set of search results to a friend? Or maybe just reload the page? We got you covered: we store your current search and page values in the url query string.

## Feature TODOS

- **Employee details view.** There is more data lurking behind the API. There could be fleshed-out employee data, avatar image, etc.
- **Location details view.** Same as above.
- **Results sorting.** This is _not_ something the API provides. Would have to [make a PR](https://github.com/afuh/rick-and-morty-api), or roll our own.
- **UX/Styling.** The app is pretty ugly. Not much more to say other than "it needs work".

## Techdebts TODOS
- **Error handling.** This is a whole Jira epic of worms. I need to investigate the API's error schema. I need to design an error schema for the app, error handling logic, and then error UX on top of that.
- **Test adapter.** Right now there is just a light-weight mock runtime in the main test file. For the future it would be nice to have some functions that generate mock test data off of [Partial templates](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype), with sensible default values.
- **Enhanced state management.** Some say there is no React without Redux. This app is doing ok without it so far, but how long will it last?
- **Eject from create-react-app.** Discussed further below.

## A Brief Discussion of Runtime Dependency Injection

Everyone knows that dependency management is hard, so what if I told you that you could push all of your dependencies to the absolute edges of your codebase and then mock them, making it possible for you to develop your core application in ignorant bliss of the brambles and briars of your dependency load--data repositories that hit innumerable upstream services, config data that changes per-environment, loggers that would otherwise choke your test output to death, analytics and metrics dependencies that you don't even know what they are or how they work but you are required by your corporate overlords to take them on as dependencies. Moreover, what if you could develop your web UI features free from the shackles of the internet itself?!

React is particularly suited to this pattern, as it provides an easy means to expose an entire component tree to a [Context object](https://reactjs.org/docs/context.html). We can set the value of this object to a runtime provider that can vary depending on the environment. This is the solution I used in this project, but there is a different (or complimentary) redux-based solution in which you can [add a third custom argument to redux thunk](https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument) and make the runtime available there. And then configure your middleware appropriately for each environment.

Have a look at this repository's `runtime` directory, where the `RuntimeContext` is defined. A convenient [custom hook](https://reactjs.org/docs/hooks-reference.html) is found there as well. Now note two other directories: `adapters-dev` and `adapters-prod`. Each of those directories houses a separate set of dependencies that both conform to the application interfaces found in the `domain` directory. In `dev,` the deps are mocked. In `prod`, its the real deal.

Finally, turn your attention to `src/index.tsx`, where you will find the logic that determines which adapter is used. As the comment in that file notes, this is not the preferred solution for determining which runtime to use. Ideally, this repo would be [managed by lerna](https://github.com/lerna/lerna), and the aforementioned directories would actually be submodule packages. And then we could eject from CRA and add two more submodules: `host-dev` for running the app locally against mock data, and  `host-preview` for running the app  locally against some live prod-like dependencies. And of course we would keep the existing production build process for production deployment. These would all have separate entry points and node scripts, but all would wrap the core `<App/>` component, which itself would be an export from an aptly named  `app` package.

## A Sweet and Subtle Example of the Power of Runtime Dependency Injection

As I mentioned above, the change handler of the app's sole text input is debounced, so that we don't make a network call on every keystroke. I set the debounce value pretty high: `500ms`. It was slowing down some tests, which is not really noticeable when this test suite runs since its so small, but imagine an app with hundreds of unit tests. Those milliseconds add up fast! So I moved the debounce value to the runtime, and set it to `0` in the test environment. Here are some of the results!

BEFORE
- should render empty results message (587 ms)
- should paginate (600 ms)
- should disable pagination with only one page of results (586 ms)


AFTER
- should render empty results message (76 ms)
- should paginate (86 ms)
- should disable pagination with only one page of results (75 ms)
