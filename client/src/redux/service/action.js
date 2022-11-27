import {createActions} from '../utils';

const actions = createActions(
  {
    actions: ['SET_APP_BAR_WIDTH'],
  },
  {
      prefix: "service",
  }
);

export const ACTIONS = {
    ...actions.actions,
}
