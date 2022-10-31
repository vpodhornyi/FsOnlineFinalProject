import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getTokens, setAuthToken } from "@utils";
import { API_ACTIONS as AUTH_ACTIONS } from "./auth/action";

import authReducer from "./auth/reducer";
import dialogReducer from "./dialog/reducer";
import logoIconReducer from "./business/logoIcon/reducer";
import mainMenuReducer from "./business/menu/mainMenu/reducer";

const { applyMiddleware, combineReducers, createStore } = require("redux");

const reducer = combineReducers({
  auth: authReducer,
  dialog: dialogReducer,
  logoIcon: logoIconReducer,
  mainMenu: mainMenuReducer,
})

export default () => {
  const { accessToken } = getTokens();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (accessToken) {
    setAuthToken(accessToken)
    store.dispatch(AUTH_ACTIONS.fetchProfile())
  }

  return store;
}
