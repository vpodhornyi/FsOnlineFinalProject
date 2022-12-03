import {createActions} from '../utils';
import api, {URLS} from "@service/API";

const actions = createActions(
  {
    actions: [
      'SET_ACTIVE_ID', 'RESET_ACTIVE_ID', 'SET_CHAT',
      'LOADING_START', 'LOADING_END', 'DETAIL_LOADING', 'SEND_MESSAGE', 'SET_NEW_MESSAGE'
    ],
    async: ['GET_CONVERSATION', 'SEARCH_USER', 'GET_MESSAGES'],
  },
  {
    prefix: 'message',
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}


export const getChats = (id) => async dispatch => {
  try {
    dispatch(ACTIONS.loadingStart());
    const data = api.get(URLS.CHATS.ROOT, {params: {userId: id}})
    dispatch(ACTIONS.loadingEnd());

    return data;

  } catch (err) {
    console.log('getChats error - ', err);
    dispatch(ACTIONS.loadingEnd());
    return [];
  }
}

export const getMessages = (id) => async dispatch => {
  try {
    dispatch(ACTIONS.getMessages.request());
    const data = await api.get(URLS.CHATS.MESSAGES, {params: {chatId: id}})
    dispatch(ACTIONS.getMessages.success({messages: data}));

    return data;

  } catch (err) {
    console.log('getChats error - ', err);
    // dispatch(ACTIONS.loadingEnd());
    return [];
  }
}

export const sendMessage = ({chatId, text}) => async (dispatch, getState) => {
  try {
    const {user: {user}} = getState()
    console.log(chatId);
    console.log(text);
    console.log(user.id);
    const data = await api.post(URLS.CHATS.MESSAGES, {chatId, text, userId: user?.id})
    console.log(data);
  } catch (err) {
    console.log('sendMessage error - ', err);
  }
}

export const getConversation = ({id}) => async dispatch => {
  try {
    dispatch(ACTIONS.setActiveId({id}));
    dispatch(ACTIONS.detailLoading());
    // await api.get()
    setTimeout(() => {
      dispatch(ACTIONS.detailLoading());
    }, 500)

  } catch (err) {
    console.log('getConversation error - ', err);
  }
}
