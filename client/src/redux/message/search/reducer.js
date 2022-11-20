import {ACTIONS} from "./action";

const INIT_STATE = {
  text: '',
  searchUserLoading: false,
  foundUsers: [],
  grabbedUsers: [],
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setSearchText):
      return {
        ...state,
        text: payload?.text,
      };
    case String(ACTIONS.resetSearchText):
      return {
        ...state,
        text: '',
      };
    case String(ACTIONS.resetFoundUsers):
      return {
        ...state,
        foundUsers: [],
        text: '',
      };
    case String(ACTIONS.grabUser):
      const {user} = payload;
      if (!state.grabbedUsers.find(v => v.id === user.id)) {
        state.grabbedUsers.push(user);
      }
      return {
        ...state,
        text: '',
        foundUsers: [],
      };
    case String(ACTIONS.searchUser.request):
      return {
        ...state,
        searchUserLoading: true,
      };
    case String(ACTIONS.searchUser.success):
      return {
        ...state,
        foundUsers: payload,
        searchUserLoading: false,
      };
    case String(ACTIONS.searchUser.fail):
      return {
        ...state,
        searchUserLoading: false,
      };
    default:
      return state;
  }
}
