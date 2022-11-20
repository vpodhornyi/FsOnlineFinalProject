import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getTokens, setAuthToken } from "@utils";
import {getAuthUser} from "./auth/action";

import authReducer from "./auth/reducer";
import dialogReducer from "./dialog/reducer";
import messageReducer from "./message/reducer";

const { applyMiddleware, combineReducers, createStore } = require("redux");

const reducer = combineReducers({
  auth: authReducer,
  dialog: dialogReducer,
  message: messageReducer,
})

export default () => {
  const { accessToken } = getTokens();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (accessToken) {
    setAuthToken(accessToken)
    // store.dispatch(getAuthUser());
  }

  return store;
}
