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