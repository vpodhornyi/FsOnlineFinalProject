import {createActions} from "../utils";

const actions = createActions(
    {
      actions: ['SET_FOUND_USERS', 'CLEAR_SEARCH', 'ADD_SEARCH_VALUE']
    },
    {
      prefix: 'search',
    }
);
export const ACTIONS = {
  ...actions.actions,
}

// export const setFoundUsers = () => async (dispatch) => {
//   dispatch(ACTIONS.setFoundUsers.request);
// }
// import {createAction} from "redux-actions";
//
// export const SET_FOUND_USERS = 'SET_FOUND_USERS'
//
// export const setFoundUsers = createAction(SET_FOUND_USERS);