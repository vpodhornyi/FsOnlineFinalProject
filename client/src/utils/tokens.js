import api from "@service/API";

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const TOKEN_TYPE = 'tokenType';

export const setHeaderAuthorization = (token, type) => {
  if (token) {
    api.defaults.headers.common.Authorization = `${type} ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token)
  } else {
    localStorage.removeItem(ACCESS_TOKEN)
  }
}

export const setRefreshToken = (token) => {
  if (token) {
    localStorage.setItem(REFRESH_TOKEN, token)
  } else {
    localStorage.removeItem(REFRESH_TOKEN)
  }
}

export const setTokenType = (type) => {
  if (type) {
    localStorage.setItem(TOKEN_TYPE, type)
  } else {
    localStorage.removeItem(TOKEN_TYPE)
  }
}

export const getTokens = () => {
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN),
    refreshToken: localStorage.getItem(REFRESH_TOKEN),
    tokenType: localStorage.getItem(TOKEN_TYPE),
  }
}

export const deleteTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(TOKEN_TYPE);
}
