import api from "@service/API"

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    localStorage.setItem("auth_token", token)
  } else {
    delete api.defaults.headers.common.Authorization
    localStorage.removeItem("auth_token")
  }
}

export const setRefreshToken = (token) => {
  if (token) {
    localStorage.setItem("refreshToken", token)
  } else {
    localStorage.removeItem("refreshToken")
  }
}

export const getTokens = () => {
  return {
    accessToken: localStorage.getItem("auth_token"),
    refreshToken: localStorage.getItem("refreshToken"),
  }
}
