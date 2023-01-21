import {createActions} from '../../utils';
import api, {URLS} from "@service/API";
import {ACTIONS as CHAT_ACTIONS} from '../action';
import {ACTIONS as USER_ACTIONS} from '../../user/action';

const actions = createActions(
  {
    actions: [
      'SET_MESSAGES', 'ADD_UP_MESSAGES', 'ADD_DOWN_MESSAGES', 'ADD_NEW_MESSAGE', 'UPDATE_OR_ADD_NEW_MESSAGE',
      'RESET_MESSAGES', 'UPDATE_MESSAGE_OWNER_SEEN', 'UPDATE_FOREIGNER_MESSAGE_SEEN', 'RESET_DATA',
      'DELETE_MESSAGE', 'LEAVE_CHAT_NOTIFICATION', 'ADD_USERS_NOTIFICATION', 'SET_PAGE_NUMBER_UP',
      'SET_PAGE_NUMBER_DOWN', 'DELETE_FIRST_MESSAGE'
    ],
  },
  {
    prefix: 'message',
  }
)

export const ACTIONS = {
  ...actions.actions,
}

export const getMessages = ({chatId, pageNumber, pageSize, up = false, down = false}) =>
  async (dispatch) => {
    try {
      const data = await api.get(URLS.CHATS.MESSAGES, {params: {chatId, pageNumber, pageSize}});
      switch (true) {
        case up && down:
          if (data?.messages?.length) {
            await dispatch(ACTIONS.setPageNumberUp(pageNumber));
            await dispatch(ACTIONS.setPageNumberDown(pageNumber));
          }
          await dispatch(ACTIONS.setMessages(data));
          break;
        case up:
          if (data?.messages?.length) {
            await dispatch(ACTIONS.setPageNumberUp(pageNumber));
          }
          await dispatch(ACTIONS.addUpMessages(data));
          break;
        default:
          if (data?.messages?.length) {
            await dispatch(ACTIONS.setPageNumberDown(pageNumber));
          }
          await dispatch(ACTIONS.addDownMessages(data));
      }
      return data;

    } catch (err) {
      console.log('getChats error - ', err);
    }
  }

export const sendMessage = (body) => async (dispatch) => {
  try {
    const data = await api.post(URLS.CHATS.MESSAGES, body);
    dispatch(ACTIONS.updateOrAddNewMessage(data));
    dispatch(CHAT_ACTIONS.setLastChatAction(data));

  } catch (err) {
    console.log('sendMessage error - ', err);
  }
}

export const deleteMessage = (body) => async (dispatch) => {
  try {
    const data = await api.delete(URLS.CHATS.MESSAGES, {data: body});
    dispatch(ACTIONS.deleteMessage(data));
    dispatch(CHAT_ACTIONS.setLastChatAction(data.lastMessage));

  } catch (err) {
    console.log('deleteMessage error - ', err);
  }
}

export const setSeenMessage = ({body}) => async dispatch => {
  try {
    dispatch(ACTIONS.updateForeignerMessageSeen({...body}));
    const data = await api.post(URLS.CHATS.MESSAGES_SEEN, body);
    if (body.countUnreadMessages > 0 ) {
      dispatch(CHAT_ACTIONS.updateCountUnreadMessages(data));
      dispatch(USER_ACTIONS.updateCountUnreadMessages(data));
    }

  } catch (err) {
    console.log('seenMessage error - ', err);
  }
}
