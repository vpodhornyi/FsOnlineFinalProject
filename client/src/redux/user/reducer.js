import {ACTIONS} from "./action";

// sample, need ref
const INIT_STATE = {
  preloader: false,
  user: {
    createdBy: null,
    createdAt: null,
    updatedBy: null,
    updatedAt: null,
    id: 2,
    name: "Jon",
    userTag: "jon1932",
    email: "xyz@email.com",
    password: "2222",
    birthDate: null,
    bio: null,
    location: null,
    avatarImgUrl: null,
    headerImgUrl: null,
    tweets: [],
    chats: []
  },
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
        user: payload,
        preloader: false
      }
    case String(ACTIONS.getAuthUser.fail):
      return {
        ...state,
        preloader: false,
        error: payload
      }
    default:
      return state
  }
}
