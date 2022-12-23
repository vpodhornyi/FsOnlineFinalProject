import {createActions} from '../utils';
import api, {URLS} from "@service/API";
import {CHAT_TYPE} from "../../utils/constants";

const actions = createActions(
  {
    actions: ['SET_CHAT_ID', 'RESET_CHAT_ID', 'SET_MESSAGE', 'SET_PAGE_NUMBER', 'SET_LAST_CHAT_ACTION',
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

    /*  api.client.onConnect = () => {
        console.log('kuku');
        data.forEach(ch => {
          console.log(ch);
          api.client.subscribe(`/topic/chat.${ch.id}`, (data) => {
            console.log('ws - ');
            console.log(data);
            console.log();
            const {body} = JSON.parse(data.body);
            dispatch(ACTIONS.setLastChatAction({actionData: body}))
          });
        })
      }*/

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

    // const data = await api.post(URLS.CHATS.MESSAGES, body);
    // dispatch(ACTIONS.setLastChatAction({actionData: data}))
    // return data;

    api.client.publish({
      destination: `/app/chat`,
      body: JSON.stringify(body),
      // headers: { priority: '9' },
    });
    return {};

  } catch (err) {
    console.log('sendMessage error - ', err);
    return {};
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
  const {user: {authUser}} = getState();
  authUser?.chatsIds?.forEach(id => {
    console.log(id);
    api.client.subscribe(`/topic/chat.${id}`, (data) => {
      console.log('ws - ');
      console.log(data);
      console.log();
      const {body} = JSON.parse(data.body);
      dispatch(ACTIONS.setLastChatAction({actionData: body}))
    });
  })

}
