import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {Client} from "@stomp/stompjs";

import api from "@service/API";
import {getTokens, setHeaderAuthorization} from "@utils";
import {interceptor} from "@service/API";
import {ACTIONS, authUserSocketSubscribe, getAuthUser, getUserRecommends} from "./user/action";
import {setFontSize, setBackgroundColor} from "@utils/theme";

import tweetReducer from "./tweet/reducer";
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";
import dialogReducer from "./dialog/reducer";
import snackReducer from "./snack/reducer";
import searchReducer from "./search/reducer";

import chatReducer from "./chat/reducer";
import messagesReducer from "./chat/message/reducer";

const {applyMiddleware, combineReducers, createStore} = require("redux");

const reducer = combineReducers({
    chat: chatReducer,
    message: messagesReducer,
    tweet: tweetReducer,
    auth: authReducer,
    user: userReducer,
    dialog: dialogReducer,
    snack: snackReducer,
    search: searchReducer,
})

export const stompClient = (onConnect) => {
    const client = new Client({
        brokerURL: process.env.REACT_APP_API_BROKER_URL, connectHeaders: {
            login: 'user', passcode: 'password',
        }, debug: function (str) {
        }, reconnectDelay: 5000, onConnect,
    });

    client.activate();
    return client;
}

export default () => {
    const {accessToken, tokenType} = getTokens();
    const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
    interceptor(store);

    if (accessToken) {
        setHeaderAuthorization(accessToken, tokenType);
        store.dispatch(getAuthUser())
            .then((user) => {
                setFontSize(user?.customStyle.fontSize || 14);
                setBackgroundColor(user?.customStyle.background);
                store.dispatch(ACTIONS.setCustomize(user?.customStyle));
                api.client = stompClient(() => {
                    store.dispatch(authUserSocketSubscribe());
                });
            })
    }
    return store;
}
