import {createActions} from '../utils';


const actions = createActions(
  {
    actions: [],
    async: [],
  },
  {
    prefix: "user",
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

