import {ACTIONS} from "./action";

// sample, need ref
const INIT_STATE = {
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
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.logout.success):
      return {
        ...INIT_STATE,
        authorized: false,
      }
    default:
      return state
  }
}
