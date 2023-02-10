import {ACTIONS} from "./action";

const init = {
  loading: false,
  foundUsers: [],
  searchValue: '',
}

export default (state = init, {type, payload}) => {
  switch (type) {
    case (String(ACTIONS.setFoundUsers)):
      return {
        ...state,
        foundUsers: payload,
      }
    case (String(ACTIONS.addSearchValue)):
      return {
        ...state,
        searchValue: payload,
      }
    case (String(ACTIONS.clearSearch)):
      return {
        ...state,
        foundUsers: [],
        searchValue: '',
      }
    default:
      return state;
  }
}