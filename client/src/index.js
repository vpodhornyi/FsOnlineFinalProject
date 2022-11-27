import React from "react";
import store from "../src/redux/store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "@containers/AppContainer";
import { BrowserRouter } from "react-router-dom";

import "normalize.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { defaultTheme } from "@utils/defaultTheme";

import "./normolize.css";
import MainContainer from "./components/MainContainer";

const reduxStore = store();
const root = createRoot(document.getElementById("root"));
const theme = createTheme(defaultTheme);
root.render(
  <Provider store={reduxStore}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MainContainer />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
