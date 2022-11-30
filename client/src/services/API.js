import {ACTIONS} from '@redux/auth/action';
import axios from "axios";
import {getTokens, setTokenType, setAuthToken, setHeaderAuthorization, deleteTokens} from "@utils";

const BASE_URL = "/api/v0";

const api = axios.create({
  baseURL: BASE_URL,
});

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
    GET_TWEETS: "/tweets",
  },
};

export default api;
