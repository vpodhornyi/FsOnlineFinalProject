import axios from "axios"
import {getTokens, setAuthToken, setRefreshToken} from "@utils"

const api = axios.create({
    baseURL: "/api/v0",
})

api.interceptors.response.use(
    (response) => response.data,
    // eslint-disable-next-line func-names
    async function (error) {
        const {refreshToken} = getTokens()
        const originalRequest = error.config

        // eslint-disable-next-line no-underscore-dangle
        if (error.response.status === 401 && !originalRequest._retry) {
            // eslint-disable-next-line no-underscore-dangle
            originalRequest._retry = true

            // eslint-disable-next-line no-return-await
            return await axios
                .get("/api/v0/user/refresh-token", {
                    headers: {
                        "refresh-token": refreshToken,
                    },
                })
                .then(({data}) => {
                    setAuthToken(data.jwt)
                    setRefreshToken(data.refreshToken)
                    originalRequest.headers.Authorization = `Bearer ${data.jwt}`
                    return api(originalRequest)
                })
        }

        return Promise.reject(error)
    }
)

export const URLS = {
    USER: {
        _ROOT: "/user",
        ALL_USER: "/user/all",
        LOG_IN: `/user/log-in`,
        LOG_OUT: `/user/log-out`,
        SIGN_UP: `/user/sign-up`,
        PROFILE: "/user/profile",
    },
    ACCOUNT: {
        _ROOT: "/account",
        TOP_UP: "/account/top-up",
        TRANSFER: "/account/transfer",
        CHANGE_CURRENCY: "/account/change-currency",
        TRANSACTION: "/account/transaction",
    }
}

export default api
