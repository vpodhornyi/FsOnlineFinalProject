import {createActions} from '../utils';
import api, {URLS} from "../../services/API";

const actions = createActions(
    {
        actions: [
            'SET_NOTIFICATIONS'
        ],
        async: ['DEACTIVATE_NOTIFICATION', 'DELETE_NOTIFICATION', 'STORE_NOTIFICATION'],
    },
    {
        prefix: 'chats',
    }
);

export const ACTIONS = {
    ...actions.actions,
    ...actions.async,
}

const storeNotification = (notification) => async(dispatch) => {
    try {
        console.log("in api.post -> storeNotification: ")
        notification.id = await api.post(`${URLS.NOTIFICATIONS.POST}`, notification);
        dispatch(ACTIONS.storeNotification.success(notification));
    } catch (err) {
        console.log('storeNotification error - ', err);
        dispatch(ACTIONS.storeNotification.fail());
        return [];
    }
}

const deleteNotification = (id) => async (dispatch) => {
    try {
        console.log("id: ", id)
      await api.delete(`${URLS.NOTIFICATIONS.DELETE}/${id}`);
    } catch (err) {
        console.log('deleteNotification error - ', err);
        dispatch(ACTIONS.deleteNotification.fail());
        return [];
    }
}

const deactivateNotification = () => async (dispatch) => {
    try {
    // возможно здесь мы когда-то изменим notification.isRead=true"
    } catch (err) {
        console.log('deactivateNotification error - ', err);
        dispatch(ACTIONS.deactivateNotification.fail());
        return [];
    }
}

const getNotifications = () => async (dispatch) => {
    try {

    } catch (err) {
        console.log('getNotifications error - ', err);
        dispatch(ACTIONS.getNotifications.fail());
        return [];
    }
}

export default {
    storeNotification,
    deleteNotification,
    deactivateNotification,
    getNotifications,
}
