import {ACTIONS} from "./action";

// sample, need ref
const init = {
  preloader: false,
  authUser: {},
  error: "",
  customize: {
    fontSize: 14,
    color: 'yellow',
    background: 'default'
  }
}

export default (state = init, {payload, type}) => {
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
    case String(ACTIONS.setCustomize):

      return {
        ...state,
        customize: {...state.customize, ...payload}
      }
    case String(ACTIONS.updateCountUnreadMessages):
      const {countUnreadAllChatMessages} = payload;
      if (countUnreadAllChatMessages || countUnreadAllChatMessages === 0) {
        state.authUser.countUnreadMessages = countUnreadAllChatMessages;
      }
      return {
        ...state,
        preloader: false,
        error: payload
      }
    case String(ACTIONS.resetData):
      state = init;
      return {
        ...state,
      };
    default:
      return state
  }
}
