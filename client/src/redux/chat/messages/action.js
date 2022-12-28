import {createActions} from '../../utils';
import api, {URLS} from "@service/API";

const actions = createActions(
  {
    actions: ['SET_MESSAGES', 'ADD_PREVIOUS_MESSAGES', 'ADD_NEW_MESSAGE', 'UPDATE_OR_ADD_NEW_MESSAGE',
      'RESET_MESSAGES', 'UPDATE_MESSAGE_SEEN'],
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
    api.client.publish({
      destination: `/app/message`,
      body: JSON.stringify({...data}),
    });
    dispatch(ACTIONS.addNewMessage({message: data}));

  } catch (err) {
    console.log('sendMessage error - ', err);
  }
}

export const setSeenMessage = (data) => async dispatch => {
  try {
    api.client.publish({
      destination: `/app/message/seen`,
      body: JSON.stringify({...data}),
    });
  } catch (err) {
    console.log('seenMessage error - ', err);
  }
}
