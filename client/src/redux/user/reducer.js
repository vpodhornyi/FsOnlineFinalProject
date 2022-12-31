import {ACTIONS} from "./action";

// sample, need ref
const INIT_STATE = {
  preloader: false,
  authUser: {},
  error: "",
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.getAuthUser.request):
      return {
        ...state,
        preloader: true
      }
    case String(ACTIONS.getAuthUser.success):
      return {
        ...state,
        authUser: payload,
        preloader: false
      }
    case String(ACTIONS.getAuthUser.fail):
      return {
        ...state,
        preloader: false,
        error: payload
      }
    case String(ACTIONS.updateCountUnreadMessages):
      const {countUnreadAllChatMessages} = payload;
      if (countUnreadAllChatMessages) {
        state.authUser.countUnreadMessages = countUnreadAllChatMessages;
      }
      return {
        ...state,
        preloader: false,
        error: payload
      }
    default:
      return state
  }
}
