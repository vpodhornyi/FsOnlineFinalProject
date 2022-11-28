import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getTokens, setAuthToken } from "@utils";
import { API_ACTIONS as AUTH_ACTIONS } from "./auth/action";
import tweetReducer from "./tweet/reducer";
import authReducer from "./auth/reducer";
import dialogReducer from "./dialog/reducer";
import messageReducer from "./message/reducer";
import logoIconReducer from "./business/logoIcon/reducer";
import mainMenuReducer from "./business/menu/mainMenu/reducer";
import userReducer from "./user/reducer";
import modalReducer from "./modal/reducer";

const { applyMiddleware, combineReducers, createStore } = require("redux");

const reducer = combineReducers({
  tweet: tweetReducer,
  auth: authReducer,
  dialog: dialogReducer,
  modal: modalReducer,
  message: messageReducer,
  logoIcon: logoIconReducer,
  mainMenu: mainMenuReducer,
  user: userReducer,
});

export default () => {
  const { accessToken } = getTokens();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (accessToken) {
    setAuthToken(accessToken);
    // store.dispatch(AUTH_ACTIONS.fetchProfile())
  }

  return store;
};
