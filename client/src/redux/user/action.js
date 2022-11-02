import {createActions} from '../utils';
import API, {URLS} from "@service/API";

const {api, axios} = API;
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
