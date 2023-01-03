import {createActions} from '../utils';
import api, {URLS} from "../../services/API";
import {ACTIONS as AUTH_ACTIONS} from '../auth/action';
import {ACTIONS as CHAT_ACTIONS} from "../chat/action";
import {ACTIONS as MESSAGE_ACTIONS} from "../chat/message/action";


const actions = createActions(
  {
    actions: ['UPDATE_COUNT_UNREAD_MESSAGES'],
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

  } catch (e) {
    console.log(e);
    dispatch(ACTIONS.getAuthUser.fail(e));
    dispatch(AUTH_ACTIONS.authorize.fail());
  }
}

export const authUserSocketSubscribe = () => (dispatch, getState) => {
  try {
    const {user: {authUser}} = getState();
    api.client.subscribe(`/queue/user.${authUser.id}`, (data) => {
      const {body} = JSON.parse(data.body);

      switch (body.type) {
        case 'MESSAGE_ADD':
          dispatch(MESSAGE_ACTIONS.updateOrAddNewMessage(body));
          dispatch(CHAT_ACTIONS.setLastChatAction(body));
          dispatch(ACTIONS.updateCountUnreadMessages(body));
          break;
        case 'MESSAGE_DELETE':
          dispatch(MESSAGE_ACTIONS.deleteMessage(body));
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
        default:
          console.log('no type');
      }
    });
  } catch (err) {
    console.log('chatSubscribes error - ', err);
  }
}
