import {createActions} from '../utils';
import api, {URLS} from "../../services/API";
import {ACTIONS as AUTH_ACTIONS} from '../auth/action';
import {ACTIONS as CHAT_ACTIONS} from "../chat/action";
import {ACTIONS as MESSAGE_ACTIONS} from "../chat/message/action";
import {ACTIONS as SNACK_ACTIONS} from "../snack/action";


const actions = createActions(
  {
    actions: ['UPDATE_COUNT_UNREAD_MESSAGES', 'RESET_DATA', 'SET_CUSTOMIZE'],
    async: ['GET_AUTH_USER'],
  },
  {
    prefix: "user",
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const getAuthUser = () => async (dispatch) => {
  try {
    dispatch(ACTIONS.getAuthUser.request());
    const data = await api.get(URLS.USERS.ROOT);
    dispatch(ACTIONS.getAuthUser.success(data));
    return data;

  } catch (e) {
    console.log(e);
    dispatch(ACTIONS.getAuthUser.fail(e));
    dispatch(AUTH_ACTIONS.authorize.fail());
  }
}

export const updateCustomize = body => async (dispatch) => {
  try {
    const data = await api.put(URLS.USERS.CUSTOMIZE, body);
    dispatch(ACTIONS.setCustomize(data));

  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
}

export const authUserSocketSubscribe = () => async (dispatch, getState) => {
  try {
    const {user: {authUser}} = getState();
    authUser?.id && api.client.subscribe(`/queue/user.${authUser.id}`, async (data) => {
      const {body} = JSON.parse(data.body);
      // console.log('stomp body - ', body);
      switch (body?.type) {
        case 'MESSAGE_ADD':
          const {chat} = body;
          if (chat && chat.isPrivate) {
            dispatch(CHAT_ACTIONS.addNewPrivateChat(chat));
          } else {
            dispatch(CHAT_ACTIONS.setLastChatAction(body));
          }
          dispatch(MESSAGE_ACTIONS.updateOrAddNewMessage(body));
          dispatch(ACTIONS.updateCountUnreadMessages(body));
          break;
        case 'MESSAGE_DELETE':
          const {lastMessage} = body;
          dispatch(MESSAGE_ACTIONS.deleteMessage(body));
          dispatch(ACTIONS.updateCountUnreadMessages(lastMessage));
          dispatch(CHAT_ACTIONS.setLastChatAction(lastMessage));
          break;
        case 'MESSAGE_OWNER_SEEN':
          dispatch(MESSAGE_ACTIONS.updateMessageOwnerSeen(body));
          break;
        case 'PRIVATE_CHAT':
          dispatch(CHAT_ACTIONS.addNewPrivateChat(body));
          dispatch(ACTIONS.updateCountUnreadMessages(body.lastMessage));
          break;
        case 'GROUP_CHAT':
          dispatch(CHAT_ACTIONS.addNewGroupChat(body));
          dispatch(ACTIONS.updateCountUnreadMessages(body.lastMessage));
          break;
        case 'ADD_TO_GROUP_CHAT':
          dispatch(CHAT_ACTIONS.addUsersToGroupChat(body));
          dispatch(MESSAGE_ACTIONS.addUsersNotification(body));
          break;
        case 'LEAVE_CHAT':
          dispatch(MESSAGE_ACTIONS.leaveChatNotification(body));
          dispatch(CHAT_ACTIONS.deleteUserFromChat(body));
          break;
        default:
          console.log('no type');
      }
    });
  } catch (err) {
    console.log('chatSubscribes error - ', err);
  }
}
