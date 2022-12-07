import {createActions} from '../../utils';
import api, {URLS} from "@service/API";

const actions = createActions(
  {
    actions: ['RESET_MESSAGES'],
    async: ['SEND_MESSAGE'],
  },
  {
    prefix: 'messages',
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const getMessages = (id) => async dispatch => {
  try {
    return await api.get(URLS.CHATS.MESSAGES, {params: {chatId: id}});

  } catch (err) {
    console.log('getChats error - ', err);
    return [];
  }
}

export const sendMessage = ({chatId, text}) => async (dispatch, getState) => {
  try {
    const {user: {user}} = getState()
    dispatch(ACTIONS.sendMessage.request());
    const data = await api.post(URLS.CHATS.MESSAGES, {chatId, text, userId: user?.id});
    dispatch(ACTIONS.sendMessage.success({newMessage: data}));

  } catch (err) {
    console.log('sendMessage error - ', err);
    dispatch(ACTIONS.sendMessage.fail());
  }
}
