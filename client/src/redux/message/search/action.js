import {createActions} from '../../utils';
import api, {URLS} from "@service/API";

const actions = createActions(
  {
    actions: [
      'SET_SEARCH_TEXT', 'RESET_SEARCH_TEXT',
      'RESET_SEARCH_USERS', 'GRAB_USER', 'DELETE_GRABBED_USER'
    ],
    async: ['SEARCH_USER'],
  },
  {
    prefix: 'messageSearch',
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const searchUser = ({text}) => async dispatch => {
  try {
    if (text.trim() === '') {
      dispatch(ACTIONS.searchUser.success([]));
    } else {
      dispatch(ACTIONS.searchUser.request());
      const data = await api.get(URLS.USERS.SEARCH, {params: {text}});
      dispatch(ACTIONS.searchUser.success(data));
    }

  } catch (err) {
    console.log('searchUser error - ', err);
    dispatch(ACTIONS.searchUser.fail());
  }
}
