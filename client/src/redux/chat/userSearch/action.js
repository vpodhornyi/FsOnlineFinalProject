import {createActions} from '../../utils';
import api, {URLS} from "@service/API";

const actions = createActions(
  {
    actions: [

    ],
    async: [],
  },
  {
    prefix: 'userSearch',
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}
