import {createActions} from '../utils';
import api, {URLS} from "@service/API";
import {CHAT_TYPE} from "../../utils/constants";
import {ACTIONS as MESSAGE_ACTION} from './message/action'

const actions = createActions(
  {
    actions: [
      'SET_CHAT_ID', 'RESET_CHAT_ID', 'SET_MESSAGE', 'SET_PAGE_NUMBER', 'SET_LAST_CHAT_ACTION',
      'SET_NEW_CHAT', 'ADD_NEW_CHAT', 'SET_NEW_GROUP', 'ADD_EXIST_CHAT', 'RESET_DATA'
    ],
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

export const subscribeToChats = () => async (dispatch) => {
  const data = await api.get(URLS.CHATS.ALL);
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

export const addNewGroupChat = (chat) => async dispatch => {
  try {
    const usersIds = chat.users.map(u => u.id);
    usersIds.push(chat.authUserId);
    const body = {
      title: chat.title,
      message: chat.message,
      authUserId: chat.authUserId,
      type: CHAT_TYPE.GROUP,
      usersIds,
    }
    const data = await api.post(URLS.CHATS.GROUP, body);
    dispatch(ACTIONS.addNewChat({chatData: data, oldKey: chat.key}));
    return data.id;

  } catch (err) {
    console.log('addNewChat error - ', err);
  }
}

export const getPrivateChatByUsersId = ({authUserId, guestUserId}) => async dispatch => {
  try {
    return await api.get(URLS.CHATS.PRIVATE, {params: {authUserId, guestUserId}});

  } catch (err) {
    console.log('getPrivateChatByUsersId error - ', err);
  }
}

export const chatSubscribes = () => (dispatch, getState) => {
  try {
    const {user: {authUser}} = getState();
    api.client.subscribe(`/queue/chat.user.${authUser.id}`, (data) => {
      const {body} = JSON.parse(data.body);

      switch (body.type) {
        case 'MESSAGE':
          dispatch(ACTIONS.setLastChatAction({actionData: body}));
          dispatch(MESSAGE_ACTION.updateOrAddNewMessage(body));
          break;
        case 'MESSAGE_SEEN':
          dispatch(MESSAGE_ACTION.updateMessageOwnerSeen(body));
          break;
        default:
          console.log('no type');
      }
    });
  } catch (err) {
    console.log('chatSubscribes error - ', err);
  }
}
