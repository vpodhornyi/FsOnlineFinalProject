import {createActions} from '../utils';


const actions = createActions(
    {
      actions: ['OPEN', 'CLOSE'],
    },
    {
      prefix: "snack",
    }
);

export const ACTIONS = {
  ...actions.actions,
}
