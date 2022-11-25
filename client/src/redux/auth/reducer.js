import {getTokens} from "@utils";
import {ACTIONS} from "./action";

const {accessToken} = getTokens();

const INIT_STATE = {
  // authorized: Boolean(accessToken),
  authorized: true,
  loading: false,
  routes: [],
  menu: [],
  user: {
    isBlocked: false,
    isAdmin: false,
    id: 1,
    name: "Bob",
    userTag: "bob1234",
    email: "abc@gmail.com",
    password: "1111",
    birthDate: null,
    bio: null,
    location: null,
    avatarImgUrl: "http://res.cloudinary.com/dz8sgyn3r/image/upload/v1668538981/bof2vd1yymddc4tc2nrv.jpg",
    headerImgUrl: "http://res.cloudinary.com/dz8sgyn3r/image/upload/v1668538979/rgamxtlantrufkow7f90.jpg",
    followers: [
      2,
      4
    ],
    followings: [
      2,
      4
    ],
    tweets: [
      1
    ]
  },
  error: "",
}
export default (state = INIT_STATE, {payload, type}) => {

  switch (type) {
    case String(ACTIONS.setRoutes):
      return {
        ...state,
        routes: payload.routes,
      }
    case String(ACTIONS.setMenu):
      return {
        ...state,
        menu: payload.menu,
      }
    case String(ACTIONS.getAuthUser.request):
      return {
        ...state,
        loading: true
      }
    case String(ACTIONS.getAuthUser.success):
      return {
        ...state,
        user: payload,
        loading: false
      }
    case String(ACTIONS.getAuthUser.fail):
      return {
        ...state,
        loading: false,
        error: payload
      }
    case String(ACTIONS.isAccountExist.request):
    case String(ACTIONS.authorize.request):
      return {
        ...state,
        loading: true,
      }
    case String(ACTIONS.isAccountExist.success):
      return {
        ...state,
        loginName: payload.login,
        loading: false,
      }
    case String(ACTIONS.authorize.success):
      return {
        ...INIT_STATE,
        authorized: true,
        loading: false,
      }
    case String(ACTIONS.logout.success):
      return {
        ...INIT_STATE,
        authorized: false,
      }
    case String(ACTIONS.isAccountExist.fail):
    case String(ACTIONS.authorize.fail):
      return {
        ...state,
        loading: false,
        authorized: false,
      }
    default:
      return state
  }
}
