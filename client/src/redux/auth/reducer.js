import { getTokens } from "@utils";
import { ACTIONS } from "./action";

const { accessToken } = getTokens();

const INIT_STATE = {
  // authorized: Boolean(accessToken),
  authorized: true,
  loading: false,
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
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case String(ACTIONS.login.request):
    case String(ACTIONS.signup.request):
    case String(ACTIONS.profile.request):
    case String(ACTIONS.topup.request):
    case String(ACTIONS.transfer.request):
    case String(ACTIONS.createaccount.request):
    case String(ACTIONS.changecurrency.request):
      return {
        ...state,
        loading: true,
      }
    case String(ACTIONS.login.success):
    case String(ACTIONS.signup.success):
    case String(ACTIONS.profile.success):
      return {
        ...state,
        authorized: true,
        loading: false,
        user: action.payload,
      }
    case String(ACTIONS.login.fail):
    case String(ACTIONS.signup.fail):
    case String(ACTIONS.profile.fail):
      return {
        ...state,
        authorized: false,
        loading: false,
      }
    case String(ACTIONS.logout):
      return {
        ...INIT_STATE,
        authorized: false,
      }

    case String(ACTIONS.transfer.success):
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          accounts:  action.payload
        }
      }
    case String(ACTIONS.topup.success):
    case String(ACTIONS.changecurrency.success):
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          accounts: state.user.accounts.map(ac=>{
            if(action.payload.number===ac.number){
              return action.payload;
            }
            return  ac;
          })
        }
      }
    case String(ACTIONS.createaccount.success):
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          accounts: state.user.accounts.concat(action.payload)
        }
      }
    case String(ACTIONS.topup.fail):
    case String(ACTIONS.transfer.fail):
    case String(ACTIONS.createaccount.fail):
    case String(ACTIONS.changecurrency.fail):
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
