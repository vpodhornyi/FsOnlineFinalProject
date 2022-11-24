import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { themeStyles } from "./utils/defaultTheme";

import "./normolize.css";


const reduxStore = store();
const root = createRoot(document.getElementById("root"));

const theme = createTheme(themeStyles);

root.render(
  <Provider store={reduxStore}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
