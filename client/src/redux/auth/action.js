import {createActions} from '../utils';
import API, {URLS} from "@service/API";
import {setAuthToken, setHeaderAuthorization, setRefreshToken} from "@utils";
import {openDialog, closeDialog} from "@redux/dialog/action";
import SingInSecondStep from '@pages/Auth/SingIn/SecondStep';

const {api, axios} = API;
const actions = createActions(
  {
    async: ["IS_ACCOUNT_EXIST", "AUTHORIZE", "LOGOUT"],
  },
  {
    prefix: "auth",
  }
);

export const ACTIONS = {
  ...actions.async,
}

export const isAccountExist = (login) => async dispatch => {
  try {
    dispatch(ACTIONS.isAccountExist.request());
    const {data} = await axios.post(URLS.AUTH.IS_ACCOUNT_EXIST, {login})
    dispatch(ACTIONS.isAccountExist.success(data));
    return true;

  } catch (err) {
    dispatch(ACTIONS.isAccountExist.fail());
    console.log('isAccountExist error - ', err.response.data);
    return false;
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
    const {data: {type, accessToken, refreshToken}} = await axios.post(URLS.AUTH.AUTHORIZE, {login, password});
    dispatch(closeDialog());
    setHeaderAuthorization(accessToken, type);
    setAuthToken(accessToken);
    setRefreshToken(refreshToken);
    dispatch(ACTIONS.authorize.success());

  } catch (err) {
    dispatch(ACTIONS.authorize.fail());
    console.log("login error - ", err.response.data)
  }
}

export const logout = () => async dispatch => {
  try {
    await api.get(URLS.AUTH.LOGOUT)
    setAuthToken();
    setRefreshToken();
    dispatch(ACTIONS.logout.success());

  } catch (err) {
    console.log('logout error - ', err.response.data);
  }
}
