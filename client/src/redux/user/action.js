import {createActions} from '../utils';
import api, {URLS} from "@service/API";

const actions = createActions(
  {
      async: [],
  },
  {
      prefix: "user",
  }
);

export const ACTIONS = {
    ...actions.async,
}
