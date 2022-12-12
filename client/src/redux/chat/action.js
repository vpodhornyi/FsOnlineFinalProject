import {createActions} from '../utils';
import api, {URLS} from "@service/API";
import {CHAT_TYPE} from "../../utils/constants";

const actions = createActions(
  {
    actions: ['SET_CHAT_ID', 'RESET_CHAT_ID', 'SET_MESSAGE', 'SET_PAGE_NUMBER',
      'SET_NEW_CHAT', 'ADD_NEW_CHAT', 'SET_NEW_GROUP', 'ADD_EXIST_CHAT', 'RESET_DATA'],
    async: ['GET_CHATS', 'SEND_MESSAGE'],
  },
  {
    prefix: 'chats',
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const getChats = (params) => async dispatch => {
  try {
    dispatch(ACTIONS.getChats.request());
    const data = await api.get(URLS.CHATS.ROOT, {params});
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

export const addNewPrivateChat = (chat) => async dispatch => {
  try {
    const body = {
      type: CHAT_TYPE.PRIVATE,
      authUserId: chat.authUserId,
      guestUserId: chat.guestUserId,
      message: chat.message
    }
    const data = await api.post(URLS.CHATS.PRIVATE, body);
    dispatch(ACTIONS.addNewChat({chatData: data, oldKey: chat.key}));
    return data.id;

  } catch (err) {
    console.log('addNewChat error - ', err);
  }
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
    const {user: {authUser}} = getState();
    const body = {chatId, text, userId: authUser?.id};
    return await api.post(URLS.CHATS.MESSAGES, body);

  } catch (err) {
    console.log('sendMessage error - ', err);
    return {};
  }
}

export const getPrivateChatByUsersId = ({authUserId, guestUserId}) => async dispatch => {
  try {
    return await api.get(URLS.CHATS.PRIVATE, {params: {authUserId, guestUserId}});

  } catch (err) {
    console.log('getPrivetChatByUsersId error - ', err);
  }
}
