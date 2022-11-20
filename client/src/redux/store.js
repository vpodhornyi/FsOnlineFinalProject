import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {getTokens, setHeaderAuthorization} from "@utils";
import {interceptor} from "@service/API";
import {getAuthUser} from "./auth/action";

import authReducer from "./auth/reducer";
import dialogReducer from "./dialog/reducer";
import messageReducer from "./message/reducer";
import messageSearchReducer from "./message/search/reducer";
import logoIconReducer from "./business/logoIcon/reducer";
import mainMenuReducer from "./business/menu/mainMenu/reducer";

const {applyMiddleware, combineReducers, createStore} = require("redux");

const reducer = combineReducers({
  auth: authReducer,
  dialog: dialogReducer,
  message: messageReducer,
  messageSearch: messageSearchReducer,
  logoIcon: logoIconReducer,
  mainMenu: mainMenuReducer,
})

export default () => {
  const {accessToken, tokenType} = getTokens();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  interceptor(store);

  if (accessToken) {
    setHeaderAuthorization(accessToken, tokenType)
    store.dispatch(getAuthUser());
  }

  return store;
}
