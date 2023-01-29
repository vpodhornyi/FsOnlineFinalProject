import axios from "axios";
import {Client} from "@stomp/stompjs";
import {ACTIONS} from '@redux/auth/action';
import {getTokens, setTokenType, setAuthToken, setHeaderAuthorization, deleteTokens} from "@utils";

const BASE_URL = process.env.REACT_APP_API_VERSION;
const api = axios.create({
  baseURL: BASE_URL
});

export const interceptor = store => {
  api.interceptors.request.use(conf => {
    // you can do something before send it.
    return conf;
  });

  api.interceptors.response.use(
    res => res.data,
    async error => {
      const originalRequest = error?.config;

      if (error?.response?.status === 403 && !originalRequest?._retry) {
        originalRequest._retry = true;
        const { refreshToken } = getTokens();
        const {
          data: { type, accessToken }
        } = await axios.post(`${BASE_URL}/auth/access`, { refreshToken });

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
    }
  );
};

export const URLS = {
  AUTH: {
    IS_ACCOUNT_EXIST: `/auth/account`,
    AUTHORIZE: `/auth/login`,
    LOGOUT: `/auth/logout`,
    CREATE_NEW_USER: `/auth/signup`
  },
  USERS: {
    ROOT: "/users",
    SEARCH: "/users/search",
    CUSTOMIZE: "/users/customize"
  },
  TWEET: {
    _ROOT: "/tweets/",
    CREATE_TWEET: "/tweets/create",
    CHANGE_ACTIONS: "/tweets/change_actions",
    BOOKMARKS: "/tweets/bookmarks",
  },
  CHATS: {
    ROOT: '/chats',
    ALL: '/chats/all',
    MESSAGES: '/chats/messages',
    MESSAGES_SEEN: '/chats/messages/seen',
    PRIVATE: '/chats/private',
    GROUP: '/chats/group',
    ADD_PEOPLE: '/chats/add-users',
  },
  CLOUD: {
    IMAGE: "/cloud/image",
    IMAGES: "/cloud/images"
  }
};

export default api;
