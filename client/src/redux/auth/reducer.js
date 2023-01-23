import { getTokens } from "@utils";
import { ACTIONS } from "./action";

const { accessToken } = getTokens();

const INIT_STATE = {
  authorized: Boolean(accessToken),
  loginName: "",
  preloader: false,
  loading: false,
  newUser: {
    name: "",
    email: "",
    password: "",
    birthDate: ""
  }
};
export default (state = INIT_STATE, { payload, type }) => {
  switch (type) {
    case String(ACTIONS.preloaderStart):
      return {
        ...state,
        preloader: true
      };
    case String(ACTIONS.preloaderEnd):
      return {
        ...state,
        preloader: false
      };
    case String(ACTIONS.setNewUserData):
      return {
        ...state,
        newUser: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          birthDate: payload.birthDate
        }
      };
    case String(ACTIONS.clearNewUserData):
      return {
        ...state,
        newUser: {
          name: "",
          email: "",
          password: "",
          birthDate: ""
        }
      };
    case String(ACTIONS.isAccountExist.request):
    case String(ACTIONS.authorize.request):
      return {
        ...state,
        loading: true
      };
    case String(ACTIONS.isAccountExist.success):
      return {
        ...state,
        loginName: payload.login
      };
    case String(ACTIONS.disableLoading):
      return {
        ...state,
        loading: false
      };
    case String(ACTIONS.authorize.success):
      return {
        ...INIT_STATE,
        authorized: true,
        loading: false
      };
    case String(ACTIONS.logout.success):
      return {
        ...INIT_STATE,
        authorized: false
      };
    case String(ACTIONS.isAccountExist.fail):
    case String(ACTIONS.authorize.fail):
      return {
        ...state,
        authorized: false
      };
    default:
      return state;
  }
};
