import {createActions} from '../utils'
import api, {URLS} from "@service/API"
import {catchError, getTokens, setAuthToken, setRefreshToken} from "../../utils";

const actions = createActions(
    {
        actions: ["LOGOUT"],
        async: ["LOGIN", "SIGNUP", "PROFILE", "TOPUP", "CREATEACCOUNT", "TRANSFER", "CHANGECURRENCY"],
    },
    {
        prefix: "auth",
    }
)

export const ACTIONS = {
    ...actions.actions,
    ...actions.async,
}

const logOut = () => (dispatch) => {
    api.get(URLS.USER.LOG_OUT)
        .then(()=>{
            // successToastMessage("Successfully logged out!")
        })
    setAuthToken()
    setRefreshToken()
    dispatch(ACTIONS.logout())
}

const logIn = (values) => (dispatch) => {
    dispatch(ACTIONS.login.request())

    api
        .post(URLS.USER.LOG_IN, values)
        .then((data) => {
            // successToastMessage("Successfully logged in!")
            setAuthToken(data.jwt)
            setRefreshToken(data.refreshToken)
            dispatch(ACTIONS.login.success(data.user))
        })
        .catch((err) => {
            catchError(err)
            dispatch(ACTIONS.login.fail())
        })
}

const signUp = (values) => (dispatch) => {
    dispatch(ACTIONS.signup.request())

    api
        .post(URLS.USER.SIGN_UP, values)
        .then((data) => {
            // successToastMessage("Successfully signed up!")
            setAuthToken(data.jwt)
            setRefreshToken(data.refreshToken)
            dispatch(ACTIONS.signup.success(data.user))
        })
        .catch((err) => {
            catchError(err)
            dispatch(ACTIONS.signup.fail())
        })
}

const topUp = (values) => (dispatch) => {
    dispatch(ACTIONS.topup.request())

    api
        .put(URLS.ACCOUNT.TOP_UP, values)
        .then((data) => {
            // successToastMessage("Successfully top up!")
            dispatch(ACTIONS.topup.success(data))
        })
        .catch((err) => {
            catchError(err)
            dispatch(ACTIONS.topup.fail())
        })
}

const changecurrency = (values) => (dispatch) => {
    dispatch(ACTIONS.changecurrency.request())

    api
        .put(URLS.ACCOUNT.CHANGE_CURRENCY, values)
        .then((data) => {
            // successToastMessage("Successfully change currency!")
            dispatch(ACTIONS.changecurrency.success(data))
        })
        .catch((err) => {
            catchError(err)
            dispatch(ACTIONS.changecurrency.fail())
        })
}

const createAccount = (values) => (dispatch) => {
    dispatch(ACTIONS.createaccount.request())

    api
        .post(URLS.ACCOUNT._ROOT, values)
        .then((data) => {
            // successToastMessage("Successfully create account!")
            dispatch(ACTIONS.createaccount.success(data))
        })
        .catch((err) => {
            catchError(err)
            dispatch(ACTIONS.createaccount.fail())
        })
}

const fetchProfile = () => (dispatch) => {
    const {accessToken} = getTokens()
    dispatch(ACTIONS.profile.request())

    api
        .get(URLS.USER.PROFILE, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((data) => {
            // successToastMessage("Welcome back!")
            dispatch(ACTIONS.login.success(data))
        })
        .catch((err) => {
            catchError(err)
            dispatch(performLogout())
        })
}

export const API_ACTIONS = {
    logIn,
    signUp,
    logOut,
    fetchProfile,
    createAccount,
    topUp,
    changecurrency
}
