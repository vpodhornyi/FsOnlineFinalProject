import {ACTIONS} from "./action";

const init = {
    notifications: []
};
const initNotifications_ = [
/*    {
        id: 1,
        notificationType: "LIKE",
        userReceiver: {id: 2, userTag: "Joshuah"},
        userInitiator: {id: 2, userTag: "Stevy"},
        tweet: null,
        isRead: false
    }, {
        id: 2,
        notificationType: "QUOTE_TWEET",
        userReceiver: {id: 3, userTag: "Joshuah"},
        userInitiator: {id: 4, userTag: "Naval"},
        tweet: null,
        isRead: false
    }, {
        id: 3,
        notificationType: "REPLY",
        userReceiver: {id: 1, userTag: "Joshuah"},
        userInitiator: {id: 4, userTag: "Laden"},
        tweet: null,
        isRead: false
    }, {
        id: 4,
        notificationType: "RETWEET",
        userReceiver: {id: 6, userTag: "Joshuah"},
        userInitiator: {id: 2, userTag: "Ben"},
        tweet: null,
        isRead: false
    },*/
]


export default (state = init, {payload, type}) => {
    switch (type) {
        case String(ACTIONS.unckeckNotification): {
            const updatedNotifications = state.notifications.map(notification => {
                if (Number(notification.id) === Number(payload)){
                    notification.isRead = true;
                }
                return notification
            });
            return {
                ...state,
                notifications: updatedNotifications
            }
        }

        case String(ACTIONS.dismissNotification): {
            const updatedNotifications = state.notifications.filter(notification => Number(notification.id) !== Number(payload));
            return {
                ...state,
                notifications: updatedNotifications
            }
        }

        case String(ACTIONS.storeNotification.success):
            return {
                ...state,
                notifications: [...state.notifications, payload],
            };


        case String(ACTIONS.setNotifications):
            return {
                ...state,
                notifications: payload,
            };

        default:
            return state;
    }

}
