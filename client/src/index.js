import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "@containers/AppContainer";
import store from "../src/redux/store";
import { BrowserRouter } from "react-router-dom";
import "./normolize.css";

const reduxStore = store();
const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
