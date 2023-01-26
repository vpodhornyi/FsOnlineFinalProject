import {createActions} from '../utils';
import api, {URLS} from "@service/API";
import {CHAT_TYPE} from "../../utils/constants";
import {ACTIONS as USER_ACTIONS} from '../user/action';
import {ACTIONS as MESSAGE_ACTIONS} from "./message/action";

const actions = createActions(
  {
    actions: [
      'SET_CHAT_ID', 'RESET_CHAT_ID', 'SET_MESSAGE', 'SET_PAGE_NUMBER', 'SET_LAST_CHAT_ACTION',
      'SET_NEW_CHAT', 'ADD_NEW_PRIVATE_CHAT', 'ADD_NEW_GROUP_CHAT', 'UPDATE_NEW_CHAT', 'DELETE_CHAT',
      'SET_NEW_GROUP', 'ADD_EXIST_CHAT', 'RESET_DATA', 'UPDATE_COUNT_UNREAD_MESSAGES', 'DELETE_USER_FROM_CHAT',
      'ADD_CHAT_IF_NOT_EXIST', 'ADD_USERS_TO_GROUP_CHAT', 'UPDATE_CHAT'
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

export const getChats = () => async (dispatch, getState) => {
  try {
    const {chat: {pageNumber, pageSize}} = getState();
    dispatch(ACTIONS.getChats.request());
    const data = await api.get(URLS.CHATS.ROOT, {params: {pageNumber, pageSize}});
    if (data?.chats.length > 0) {
      dispatch(ACTIONS.setPageNumber({pageNumber: pageNumber + 1}));
    }
    dispatch(ACTIONS.getChats.success(data));

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

export const addNewPrivateChat = (chat, text) => async dispatch => {
  try {
    const body = {
      type: CHAT_TYPE.PRIVATE,
      guestUserId: chat.guestUserId,
      message: text,
      oldKey: chat.key,
    }
    const data = await api.post(URLS.CHATS.PRIVATE, body);
    dispatch(ACTIONS.updateNewChat(data));
    return data.id;

  } catch (err) {
    console.log('addNewChat error - ', err);
  }
}

export const addNewGroupChat = (chat, text) => async dispatch => {
  try {
    const usersIds = chat.users.map(u => u.id);
    const body = {
      title: chat.title,
      message: text,
      type: CHAT_TYPE.GROUP,
      oldKey: chat.key,
      usersIds,
    }
    const data = await api.post(URLS.CHATS.GROUP, body);
    dispatch(ACTIONS.updateNewChat(data));
    return data.id;

  } catch (err) {
    console.log('addNewChat error - ', err);
  }
}

export const leaveChat = body => async (dispatch) => {
  try {
    const data = await api.delete(URLS.CHATS.ROOT, {data: body});
    dispatch(ACTIONS.deleteChat(data));
    dispatch(USER_ACTIONS.updateCountUnreadMessages(data));

  } catch (err) {
    console.log('leavePrivateChat error - ', err);
  }
}

export const getPrivateChatByUsersId = ({guestUserId}) => async dispatch => {
  try {
    return await api.get(URLS.CHATS.PRIVATE, {params: {guestUserId}});

  } catch (err) {
    console.log('getPrivateChatByUsersId error - ', err);
  }
}

export const addPeopleToChat = body => async (dispatch) => {
  try {
    const data = await api.post(URLS.CHATS.ADD_PEOPLE, body);
    dispatch(ACTIONS.addUsersToGroupChat(data));
    dispatch(MESSAGE_ACTIONS.addUsersNotification(data));

  } catch (err) {
    console.log('addPeopleToChat error - ', err);
  }
}

export const editGroupChat = body => async (dispatch) => {
  try {
    const data = await api.put(URLS.CHATS.GROUP, body);
    dispatch(ACTIONS.updateChat(data));

  } catch (err) {
    console.log('editGroupChat error - ', err);
  }
}
