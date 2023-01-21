import api, {URLS} from "@service/API";
import {createActions} from '../utils';
import {setAuthToken, setTokenType, setHeaderAuthorization, setRefreshToken} from "@utils";
import {PATH} from "../../utils/constants";
import {getAuthUser} from '../user/action';
import {ACTIONS as CHAT_ACTIONS} from '../chat/action';
import {ACTIONS as MESSAGE_ACTIONS} from '../chat/message/action';
import {setAuthToken, setHeaderAuthorization, setRefreshToken} from "@utils";
import {openDialog, closeDialog} from "@redux/dialog/action";
import SingInSecondStep from '@pages/Auth/SingIn/SecondStep';
import {getUserById, getUsers} from "../../services/userApi";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";
export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";

const actions = createActions({
  actions: ['DISABLE_LOADING', 'SET_NEW_USER_DATA', 'CLEAR_NEW_USER_DATA', 'PRELOADER_START', 'PRELOADER_END'],
  async: ["IS_ACCOUNT_EXIST", "AUTHORIZE", 'CREATE_NEW_USER', "LOGOUT"],
}, {
  prefix: "auth",
});

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

const disableLoading = (dispatch) => {
  setTimeout(() => {
    dispatch(ACTIONS.disableLoading());
  }, 300)
}

export const isAccountExist = (login) => async dispatch => {
    try {
        dispatch(ACTIONS.isAccountExist.request());
        const data = await api.post(URLS.AUTH.IS_ACCOUNT_EXIST, {login})
        dispatch(ACTIONS.isAccountExist.success(data));

        return true;

    } catch (e) {
        console.log(e);
        dispatch(ACTIONS.isAccountExist.fail());
        return false;
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({type: GET_USERS_REQUEST});
        const res = await getUsers();
        dispatch({type: GET_USERS_SUCCESS, payload: res});
    } catch (e) {
        dispatch({
            type: GET_USERS_ERROR,
            payload: `failed to get all users. ` + String(e),
        });
    }
}


export const getAuthUser = (id) => async (dispatch) => {
    try {
        dispatch({type: GET_USER_REQUEST});
        const res = await getUserById(id);
        dispatch({ type: GET_USER_SUCCESS, payload: res});
    }catch (e) {
        dispatch({
            type: GET_USER_ERROR,
            payload: `Failed to get auth user. ` + String(e),
        });
    }
}

export const logout = ({navigate}) => async dispatch => {
    try {
        await api.get(URLS.AUTH.LOGOUT)
        setAuthToken();
        setRefreshToken();
        setHeaderAuthorization();
        dispatch(ACTIONS.logout.success());
        navigate(PATH.ROOT);

    } catch (err) {
        //TODO show error
        //TODO ref success to fail
        dispatch(ACTIONS.logout.success());
        console.log('logout error - ', err);

    } finally {
        dispatch(CHAT_ACTIONS.resetData());
        dispatch(MESSAGE_ACTIONS.resetData());
    }
}

export const createNewUser = ({name, email, birthDate}) => async dispatch => {
    try {
        dispatch(ACTIONS.createNewUser.request());
        const data = await api.post(URLS.AUTH.CREATE_NEW_USER, {name, email, birthDate})
        dispatch(ACTIONS.createNewUser.success(data));

    } catch (e) {
        dispatch(ACTIONS.createNewUser.fail());
    }
}

export const runLoginSecondStep = ({login, navigate, background}) => async dispatch => {

    if (await dispatch(isAccountExist(login))) {
        navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.PASSWORD}`, {state: {background}});
    }
    disableLoading(dispatch);
}

export const runSingUpSecondStep = ({name, email, birthDate, navigate, background}) => async dispatch => {
  if (!await dispatch(isAccountExist(email))) {
    dispatch(ACTIONS.setNewUserData({name, email, birthDate}));
    navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_UP.CREATE_ACCOUNT}`, {state: {background}});
    disableLoading(dispatch);
  }
}

export const authorize = ({login, password, navigate, background}) => async dispatch => {
  try {
    dispatch(ACTIONS.authorize.request());
    const {type, accessToken, refreshToken} = await api.post(URLS.AUTH.AUTHORIZE, {login, password});
    setHeaderAuthorization(accessToken, type);
    setAuthToken(accessToken);
    setRefreshToken(refreshToken);
    setTokenType(type);
    dispatch(ACTIONS.authorize.success());
    dispatch(getAuthUser());
    navigate(`${PATH.HOME}`);

  } catch (err) {
    //TODO show error
    setTimeout(() => {
      dispatch(ACTIONS.disableLoading());
      dispatch(ACTIONS.authorize.fail());
    }, 300)
    console.log("login error - ", err);
  }
}

export const logout = ({navigate}) => async dispatch => {
  try {
    await api.get(URLS.AUTH.LOGOUT)
    setAuthToken();
    setRefreshToken();
    setHeaderAuthorization();
    dispatch(ACTIONS.logout.success());
    navigate(PATH.ROOT);

  } catch (err) {
    //TODO show error
    //TODO ref success to fail
    dispatch(ACTIONS.logout.success());
    console.log('logout error - ', err);

  } finally {
    dispatch(CHAT_ACTIONS.resetData());
    dispatch(MESSAGE_ACTIONS.resetData());
  }
}
