import {createActions} from '../../utils';
import api, {URLS} from "@service/API";
import {ACTIONS as CHAT_ACTIONS} from '../action';
import {ACTIONS as USER_ACTIONS} from '../../user/action';

const actions = createActions(
  {
    actions: [
      'SET_MESSAGES', 'ADD_PREVIOUS_MESSAGES', 'ADD_NEW_MESSAGE', 'UPDATE_OR_ADD_NEW_MESSAGE',
      'RESET_MESSAGES', 'UPDATE_MESSAGE_OWNER_SEEN', 'UPDATE_FOREIGNER_MESSAGE_SEEN', 'RESET_DATA'
    ],
  },
  {
    prefix: 'message',
  }
)

export const ACTIONS = {
  ...actions.actions,
}

export const getMessages = (id) => async (dispatch, getState) => {
  try {
    const {user: {authUser}} = getState();
    const data = await api.get(URLS.CHATS.MESSAGES, {params: {chatId: id, authUserId: authUser.id}});

    dispatch(ACTIONS.setMessages({messages: data}));

  } catch (err) {
    console.log('getChats error - ', err);
  }
}

export const sendMessage = (data) => async (dispatch) => {
  try {
    api.post(URLS.CHATS.MESSAGES, data);
    dispatch(ACTIONS.addNewMessage(data));

  } catch (err) {
    console.log('sendMessage error - ', err);
  }
}

export const setSeenMessage = ({body}) => async dispatch => {
  try {
    const data = await api.post(URLS.CHATS.MESSAGES_SEEN, body);
    dispatch(ACTIONS.updateForeignerMessageSeen(data));
    dispatch(CHAT_ACTIONS.updateCountUnreadMessages(data));
    dispatch(USER_ACTIONS.updateCountUnreadMessages(data));

  } catch (err) {
    console.log('seenMessage error - ', err);
  }
}
