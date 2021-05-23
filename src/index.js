import React from "react";
import reactDOM from "react-dom";
import App from "./app.js";
import store from "./components/store";

reactDOM.render(<App store={store} />, document.getElementById("root"));
