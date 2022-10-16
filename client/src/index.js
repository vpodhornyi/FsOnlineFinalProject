import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App from "@containers/AppContainer";
import store from '../src/redux/store';
import {HashRouter as Router} from "react-router-dom";
import Auth from "./pages/Auth";
import 'normalize.css';


const reduxStore = store()

ReactDOM.render(
  <Provider store={reduxStore}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById("root")
)
