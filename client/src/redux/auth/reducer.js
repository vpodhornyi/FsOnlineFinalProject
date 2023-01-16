import {
    ACTIONS,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_ERROR,
} from "./action";
import {getTokens} from "@utils";

const {accessToken} = getTokens();

const INIT_STATE = {
    // authorized: Boolean(accessToken),
    authorized: true,
    loading: false,
    user: {
        isBlocked: false,
        isAdmin: false,
        id: 1,
        name: "Bob",
        userTag: "bob1234",
        email: "abc@gmail.com",
        password: "1111",
        birthDate: null,
        bio: null,
        location: null,
        avatarImgUrl: "",
        headerImgUrl: "",
        followers: [],
        followings: [],
        tweets: [
            1
        ]
    },
    error: "",
    users: []
}
export default (state = INIT_STATE, {payload, type}) => {
    switch (type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_USER_SUCCESS:
            return {...state, user: payload, loading: false}
        case GET_USER_ERROR:
            return {...state, loading: false, error: payload}
        case GET_USERS_REQUEST:
            return {...state, loading: true}
        case GET_USERS_SUCCESS:
            return {...state, users: payload, loading: false}
        case GET_USERS_ERROR:
            return {...state, loading: false, error: payload}
        case String(ACTIONS.isAccountExist.request):
        case String(ACTIONS.authorize.request):
            return {
                ...state,
                loading: true,
            }
        case String(ACTIONS.isAccountExist.success):
            return {
                ...state,
                loginName: payload.login,
                loading: false,
            }
        case String(ACTIONS.authorize.success):
            return {
                ...INIT_STATE,
                authorized: true,
                loading: false,
            }
        case String(ACTIONS.logout.success):
            return {
                ...INIT_STATE,
                authorized: false,
            }
        case String(ACTIONS.isAccountExist.fail):
        case String(ACTIONS.authorize.fail):
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
