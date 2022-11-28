import api, {URLS} from "@service/API";
import {createActions} from '../utils';
import {setAuthToken, setTokenType, setHeaderAuthorization, setRefreshToken} from "@utils";
import {PATH} from "../../utils/constants";

const actions = createActions({
  actions: ['DISABLE_LOADING'],
  async: ["IS_ACCOUNT_EXIST", "AUTHORIZE", "LOGOUT", 'GET_AUTH_USER'],
}, {
  prefix: "auth",
});

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const isAccountExist = ({login, navigate, background}) => async dispatch => {
  try {
    dispatch(ACTIONS.isAccountExist.request());
    const data = await api.post(URLS.AUTH.IS_ACCOUNT_EXIST, {login})
    dispatch(ACTIONS.isAccountExist.success(data));

    setTimeout(() => {
      dispatch(ACTIONS.disableLoading());
    }, 300)

    navigate(`${PATH.SING_IN.ROOT}/${PATH.SING_IN.SECOND_STEP}`, {state: {background}});

  } catch (e) {
    dispatch(ACTIONS.isAccountExist.fail());
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

export const authorize = ({login, password, navigate, background}) => async dispatch => {
  try {
    dispatch(ACTIONS.authorize.request());
    const {type, accessToken, refreshToken} = await api.post(URLS.AUTH.AUTHORIZE, {login, password});
    setHeaderAuthorization(accessToken, type);
    setAuthToken(accessToken);
    setRefreshToken(refreshToken);
    setTokenType(type);
    dispatch(ACTIONS.authorize.success());
    navigate(`${PATH.HOME}`, {state: {background}});

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
    navigate(`${PATH.ROOT}`);

  } catch (err) {
    //TODO show error
    //TODO ref success to fail
    dispatch(ACTIONS.logout.success());
    console.log('logout error - ', err);
  }
}
