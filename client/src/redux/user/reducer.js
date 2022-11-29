import {ACTIONS, createNewUser} from "./action";

// sample, need ref
const INIT_STATE = {
  loginName: '',
  loading: false,
  preloader: false,
  newUser: {
    name: '',
    email: '',
    birthDate: '',
  },
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
  }
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {

    default:
      return state
  }
}
