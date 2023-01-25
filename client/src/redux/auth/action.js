import api, {URLS} from "@service/API";
import {createActions} from '../utils';
import {setAuthToken, setTokenType, setHeaderAuthorization, setRefreshToken} from "@utils";
import {PATH} from "../../utils/constants";
import {getAuthUser, ACTIONS as USER_ACTIONS} from '../user/action';
import {ACTIONS as CHAT_ACTIONS} from '../chat/action';
import {ACTIONS as SNACK_ACTIONS} from '../snack/action';
import {ACTIONS as MESSAGE_ACTIONS} from '../chat/message/action';

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
    dispatch(SNACK_ACTIONS.open(e?.response?.data));
    dispatch(ACTIONS.isAccountExist.fail());
    return false;
}
}

export const createNewUser = ({name, email, birthDate}) => async dispatch => {
  try {
    dispatch(ACTIONS.createNewUser.request());
    const data = await api.post(URLS.AUTH.CREATE_NEW_USER, {name, email, birthDate})
    dispatch(ACTIONS.createNewUser.success(data));

  } catch (e) {
    dispatch(SNACK_ACTIONS.open(e?.response?.data));
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

export const authorize = ({login, password, navigate}) => async dispatch => {
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

  } catch (e) {
    setTimeout(() => {
      dispatch(ACTIONS.disableLoading());
      dispatch(ACTIONS.authorize.fail());
    }, 300)
    dispatch(SNACK_ACTIONS.open(e?.response?.data));
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

  } catch (e) {
    dispatch(ACTIONS.logout.fail());
    dispatch(SNACK_ACTIONS.open(e?.response?.data));

  } finally {
    dispatch(CHAT_ACTIONS.resetData());
    dispatch(MESSAGE_ACTIONS.resetData());
    dispatch(USER_ACTIONS.resetData());
  }
}
