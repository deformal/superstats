import React from "react";
import { StrictMode } from "react";
import reactDOM from "react-dom";
import App from "./app.js";
import store from "./components/store";
import { Provider } from "react-redux";

reactDOM.render(
  <StrictMode>
    <Provider>
      <App store={store} />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
