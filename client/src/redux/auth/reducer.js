import {getTokens} from "@utils";
import {ACTIONS} from "./action";

const {accessToken} = getTokens();

const init = {
  authorized: Boolean(accessToken),
  loginName: "",
  loading: false,
  newUser: {
    name: "",
    email: "",
    password: "",
    birthDate: ""
  }
};
export default (state = JSON.parse(JSON.stringify(init)), {payload, type}) => {
  switch (type) {
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
    case String(ACTIONS.isAccountExist.request):
    case String(ACTIONS.createNewUser.request):
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
    case String(ACTIONS.createNewUser.success):
      return {
        ...state,
        loading: false,
        newUser: {
          name: "",
          email: "",
          password: "",
          birthDate: ""
        }
      };
    case String(ACTIONS.createNewUser.fail):
    case String(ACTIONS.disableLoading):
      return {
        ...state,
        loading: false
      };
    case String(ACTIONS.authorize.success):
      return {
        ...init,
        authorized: true,
        loading: false
      };
    case String(ACTIONS.logout.success):
      return {
        ...init,
        authorized: false
      };
    case String(ACTIONS.isAccountExist.fail):
    case String(ACTIONS.authorize.fail):
      return {
        ...state,
        authorized: false
      };
    case String(ACTIONS.resetData):
      state = init;
      return {
        ...state,
        authorized: false,
      };
    default:
      return state;
  }
}
