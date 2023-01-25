import {createActions} from '../utils';
import api, {URLS} from "../../services/API";
import {ACTIONS as AUTH_ACTIONS} from '../auth/action';
import {ACTIONS as CHAT_ACTIONS} from "../chat/action";
import {ACTIONS as MESSAGE_ACTIONS} from "../chat/message/action";


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
