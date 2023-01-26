import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { createTheme } from "@mui/material/styles";
import { themeStyles } from "./utils/defaultTheme";

import "./normolize.css";

const reduxStore = store();
const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={reduxStore}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
  </Provider>
);
