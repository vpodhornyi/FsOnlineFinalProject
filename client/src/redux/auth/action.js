import {createActions} from '../utils';
import api, {URLS} from "@service/API";
import {setAuthToken, setTokenType, setHeaderAuthorization, setRefreshToken} from "@utils";
import {openDialog, closeDialog} from "@redux/dialog/action";
import SingInSecondStep from '@pages/Auth/SingIn/SecondStep';

const actions = createActions({
  async: ["IS_ACCOUNT_EXIST", "AUTHORIZE", "LOGOUT", 'GET_AUTH_USER'],
}, {
  prefix: "auth",
});

export const ACTIONS = {
  ...actions.async,
}

export const isAccountExist = (login) => async dispatch => {
  try {
    dispatch(ACTIONS.isAccountExist.request());
    const data = await api.post(URLS.AUTH.IS_ACCOUNT_EXIST, {login})
    dispatch(ACTIONS.isAccountExist.success(data));
    return true;

  } catch (e) {
    return false;
  }
}

export const getAuthUser = () => async (dispatch) => {
  try {
    dispatch(ACTIONS.getAuthUser.request);
    const data = await api.get(URLS.USER.ROOT);
    dispatch(ACTIONS.getAuthUser.success(data));

  } catch (e) {
    dispatch(ACTIONS.getAuthUser.fail(e));
  }
}

export const runSecondLoginStep = (login) => async dispatch => {
  if (await dispatch(isAccountExist(login))) {
    dispatch(openDialog(SingInSecondStep));
  }
}

export const authorize = ({login, password}) => async dispatch => {
  try {
    dispatch(ACTIONS.authorize.request());
    const {type, accessToken, refreshToken} = await api.post(URLS.AUTH.AUTHORIZE, {login, password});
    dispatch(closeDialog());
    setHeaderAuthorization(accessToken, type);
    setAuthToken(accessToken);
    setRefreshToken(refreshToken);
    setTokenType(type);
    dispatch(ACTIONS.authorize.success());

  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.authorize.fail());
    console.log("login error - ", err);
  }
}

export const logout = () => async dispatch => {
  try {
    await api.get(URLS.AUTH.LOGOUT)
    setAuthToken();
    setRefreshToken();
    setHeaderAuthorization();
    dispatch(ACTIONS.logout.success());

  } catch (err) {
    //TODO show error
    //TODO ref success to fail
    dispatch(ACTIONS.logout.success());
    console.log('logout error - ', err);
  }
}
