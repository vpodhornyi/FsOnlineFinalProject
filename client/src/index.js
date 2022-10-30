import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "@containers/AppContainer";
import store from "../src/redux/store";
import { BrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth";
import "normalize.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { defaultTheme } from "@utils/defaultTheme";
const reduxStore = store();
const root = createRoot(document.getElementById("root"));
const theme = createTheme(defaultTheme);
root.render(
  <Provider store={reduxStore}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
