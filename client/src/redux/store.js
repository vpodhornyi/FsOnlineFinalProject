import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {getTokens, setHeaderAuthorization} from "@utils";
import {interceptor} from "@service/API";
import {getAuthUser} from "./user/action";

import tweetReducer from "./tweet/reducer";
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";
import dialogReducer from "./dialog/reducer";

import chatReducer from "./chat/reducer";

const {applyMiddleware, combineReducers, createStore} = require("redux");

const reducer = combineReducers({
  chat: chatReducer,
  tweet: tweetReducer,
  auth: authReducer,
  user: userReducer,
  dialog: dialogReducer,
})

export default () => {
  const {accessToken, tokenType} = getTokens();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  interceptor(store);

  if (accessToken) {
    setHeaderAuthorization(accessToken, tokenType);
    store.dispatch(getAuthUser());
  }

  return store;
}
