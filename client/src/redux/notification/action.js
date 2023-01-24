import {createActions} from '../utils';
import {CHAT_TYPE} from "../../utils/constants";
import {ACTIONS as NOTIFICATION_ACTIONS} from './action';


const actions = createActions(
  {
    actions: [
      'GET_NOTIFICATIONS', 'SET_NOTIFICATION'
    ],
    async: [''],
  },
  {
    prefix: 'chats',
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const getNotifications = () => async (dispatch) => {
  try {


  } catch (err) {
    console.log('getNotifications error - ', err);
    dispatch(ACTIONS.getNotifications.fail());
    return [];
  }
}

