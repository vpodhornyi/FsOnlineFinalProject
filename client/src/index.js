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

const reduxStore = store();
const root = createRoot(document.getElementById("root"));
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      // left container dissapears when < 500
      md: 988,
      // right container dissapears when < 988
      lg: 1077,
      // messages icon tab dissapears from bottom right side when <  1077
      xl: 1265,
      // left container becomes compressed when < 1265
    },
  },
});
root.render(
  <Provider store={reduxStore}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
