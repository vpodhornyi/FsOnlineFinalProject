import {createActions} from '../utils';
import api, {URLS} from "../../services/API";
import {ACTIONS as AUTH_ACTIONS} from '../auth/action';
import {ACTIONS as CHAT_ACTIONS} from "../chat/action";
import {ACTIONS as MESSAGE_ACTIONS} from "../chat/message/action";
import {ACTIONS as SNACK_ACTIONS} from "../snack/action";
import {getNotFollowingUsers} from "../../services/userApi";


const actions = createActions(
    {
        actions: ['UPDATE_COUNT_UNREAD_MESSAGES', 'RESET_DATA', 'SET_CUSTOMIZE',
            'SET_STOMP_SUBSCRIBE_ID', 'UPDATE_USER_CUSTOM_STYLE'],
        async: ['GET_AUTH_USER', "GET_USER_RECOMMENDS", "CLEAR_USER_RECOMMENDS"],
    },
    {
        prefix: "user",
    }
);

export const ACTIONS = {
    ...actions.actions,
    ...actions.async,
}

export const clearUserRecommends = () => async (dispatch) => {
    try {
        dispatch(ACTIONS.clearUserRecommends.success([]));
    }catch (e) {
        dispatch(ACTIONS.clearUserRecommends.fail(e));
    }
}

export const getUserRecommends = (userId, addPageNumber = false) => async (dispatch, getState) => {
    try {
        const {user} = getState();
        const pageNumber = user.recommends.pageNumber;
        const pageSize = user.recommends.pageSize;
        dispatch(ACTIONS.getUserRecommends.request())
        const data = await getNotFollowingUsers(userId, pageNumber, pageSize);
        dispatch(ACTIONS.getUserRecommends.success(data));
        return data;
    } catch (e) {
        dispatch(ACTIONS.getUserRecommends.fail(e))
    }
}

export const getAuthUser = (preloader = false) => async (dispatch) => {
    try {
        dispatch(ACTIONS.getAuthUser.request(preloader));
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
        dispatch(ACTIONS.updateUserCustomStyle(data));

    } catch (err) {
        dispatch(SNACK_ACTIONS.open(err?.response?.data));
    }
}

export const authUserSocketSubscribe = () => async (dispatch, getState) => {
    try {
        const {user: {authUser}} = getState();
        const subData = authUser?.id && api.client.subscribe(`/queue/user.${authUser.id}`, async (data) => {
            const {body} = JSON.parse(data.body);
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
        if (subData?.id) {
            dispatch(ACTIONS.setStompSubscribeId(subData.id));
        }
    } catch (err) {
        console.log('chatSubscribes error - ', err);
    }
}
