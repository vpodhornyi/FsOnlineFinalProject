import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {getTokens, setHeaderAuthorization} from "@utils";
import {interceptor} from "@service/API";
import {getAuthUser} from "./auth/action";
import {createRoutes} from "../routes";

import serviceReducer from "./service/reducer";
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";
import dialogReducer from "./dialog/reducer";
import messageReducer from "./message/reducer";
import messageSearchReducer from "./message/search/reducer";

const {applyMiddleware, combineReducers, createStore} = require("redux");

const reducer = combineReducers({
  service: serviceReducer,
  auth: authReducer,
  user: userReducer,
  dialog: dialogReducer,
  message: messageReducer,
  messageSearch: messageSearchReducer,
})

export default () => {
  const {accessToken, tokenType} = getTokens();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  // createRoutes(store);
  interceptor(store);

  if (accessToken) {
    setHeaderAuthorization(accessToken, tokenType);
    store.dispatch(getAuthUser());
  }

  return store;
}
