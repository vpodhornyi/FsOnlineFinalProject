import {ACTIONS} from "./action";

// sample, need ref
const init = {
  preloader: false,
  authUser: {},
  userTweets: [],
  userLikes: [],
  error: "",
}

export default (state = init, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.getUserLikes.request):
      return {
        ...state,
        preloader: payload
      }
    case String(ACTIONS.getUserLikes.success):
      return {
        ...state,
        preloader: false,
        userLikes: payload
      }
    case String(ACTIONS.getUserLikes.fail):
      return {
        ...state,
        preloader: false,
        error: payload
      }
    case String(ACTIONS.getUserTweets.request):
      return {
        ...state,
        preloader: payload
      }
    case String(ACTIONS.getUserTweets.success):
      return {
        ...state,
        userTweets: payload,
        preloader: false,
      }
    case String(ACTIONS.getUserTweets.fail):
      return {
        ...state,
        preloader: false,
        error: payload
      }
    case String(ACTIONS.getAuthUser.request):
      return {
        ...state,
        preloader: payload
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
