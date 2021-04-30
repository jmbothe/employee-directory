import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Runtime } from "./runtime/Runtime";
import RuntimeContext from "./runtime/RuntimeContext";

let runtime: Runtime;

// This is a CRA-bound hack for creating the appropriate runtime per env.
// TODO: Eject from CRA and create dev/prod entry points (not gonna happen in 8 hours).
if (process.env.NODE_ENV === "production" || process.env.REACT_APP_PREVIEW_MODE) {
  const createProdRuntime = require("./adapter-prod/createProdRuntime").default;

  runtime = createProdRuntime();
} else {
  const createDevRuntime = require("./adapter-dev/createDevRuntime").default;

  runtime = createDevRuntime();
}

ReactDOM.render(
  <React.StrictMode>
    <RuntimeContext.Provider value={runtime}>
      <App />
    </RuntimeContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
