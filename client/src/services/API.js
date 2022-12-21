import axios from "axios";
import {Client, Message} from "@stomp/stompjs"
import {ACTIONS} from '@redux/auth/action';
import {getTokens, setTokenType, setAuthToken, setHeaderAuthorization, deleteTokens} from "@utils";

const BASE_URL = process.env.REACT_APP_API_VERSION;

const api = axios.create({
  baseURL: BASE_URL,
});

const client = new Client({
  brokerURL: 'ws://localhost:61613/ws',
  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});
client.onConnect = function (frame) {
  // Do something, all subscribes must be done is this callback
  // This is needed because this will be executed after a (re)connect
};

client.onStompError = function (frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

client.activate();
api.client = client;

export const interceptor = store => {
  api.interceptors.request.use(conf => {
    // you can do something before send it.
    return conf;
  });

  api.interceptors.response.use(res => res.data, async error => {
    const originalRequest = error?.config;

    if (error?.response?.status === 403 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const {refreshToken} = getTokens();
      const {data: {type, accessToken}} = await axios.post(`${BASE_URL}/auth/access`, {refreshToken});

      if (accessToken === null) {
        store.dispatch(ACTIONS.authorize.fail());
        deleteTokens();

      } else {
        setHeaderAuthorization(accessToken, type);
        setAuthToken(accessToken);
        setTokenType(type);
        originalRequest.headers.Authorization = `${type} ${accessToken}`;

        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  });
}


export const URLS = {
  AUTH: {
    IS_ACCOUNT_EXIST: `/auth/account`,
    AUTHORIZE: `/auth/login`,
    LOGOUT: `/auth/logout`,
  },
  USERS: {
    ROOT: "/users",
    SEARCH: '/users/search'
  },
  TWEET: {
    _ROOT: "/tweets/",
    CREATE_TWEET: "/tweets/create",
  },
  CHATS: {
    ROOT: '/chats',
    MESSAGES: '/chats/messages',
    PRIVATE: '/chats/private',
    GROUP: '/chats/group',
  }
};

export default api;
