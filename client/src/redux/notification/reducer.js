import {ACTIONS} from "./action";

const initNotifications = [
    {
        id: 1,
    notificationType: "LIKE",
    userReceiver:  {id:2, userTag: "Joshuah"},
    userInitiator: {id:2, userTag: "Stevy"},
    tweet: null,
    isRead: false
},    {
    id: 2,
    notificationType: "QUOTE_TWEET",
    userReceiver: {id:3, userTag: "Joshuah"},
    userInitiator: {id:4, userTag: "Naval"},
    tweet: null,
    isRead: false
},    {
    id: 3,
    notificationType: "REPLY",
    userReceiver:  {id:1, userTag: "Joshuah"},
    userInitiator:  {id:4, userTag: "Laden"},
    tweet: null,
    isRead: false
},    {
    id: 4,
    notificationType: "RETWEET",
    userReceiver:  {id:6, userTag: "Joshuah"},
    userInitiator:  {id:2, userTag: "Ben"},
    tweet: null,
    isRead: false
},
]


export default (state = {notifications: initNotifications}, {payload, type}) => {
    switch (type) {

        case String(ACTIONS.setNotifications):
            return {
                ...state,
                notifications: [...state.notifications, payload],
            };

        default:
            return state;
    }

}
