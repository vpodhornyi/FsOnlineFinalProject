import {createActions} from '../utils';
import api, {URLS} from "@service/API";

const actions = createActions(
  {
    actions: ['SET_CHAT_ID', 'RESET_CHAT_ID', 'SET_NEW_TEXT',
      'SET_NEW_CHAT', 'SET_NEW_GROUP'],
    async: ['GET_CHATS'],
  },
  {
    prefix: 'chats',
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const getChats = (id) => async dispatch => {
  try {
    dispatch(ACTIONS.getChats.request());
    const data = await api.get(URLS.CHATS.ROOT, {params: {userId: id}});
    dispatch(ACTIONS.getChats.success({chats: data}));

    return data;

  } catch (err) {
    console.log('getChats error - ', err);
    dispatch(ACTIONS.getChats.fail());
    return [];
  }
}

export const searchUser = ({text}) => async dispatch => {
  try {
    return await api.get(URLS.USERS.SEARCH, {params: {text}});

  } catch (err) {
    console.log('searchUser error - ', err);
    return [];
  }
}

export const addNewChat = ({text}) => async dispatch => {
  try {
    return await api.get(URLS.USERS.SEARCH, {params: {text}});

  } catch (err) {
    console.log('addNewChat error - ', err);
  }
}
