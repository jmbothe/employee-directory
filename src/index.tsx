import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Runtime } from "./domain/Runtime";
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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RuntimeContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
