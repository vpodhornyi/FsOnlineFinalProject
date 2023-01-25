import {ACTIONS} from "./action";

const initNotifications = [
    {
    notificationType: "LIKE",
    userReceiver:  {id:2, userTag: "Joshuah"},
    userInitiator: {id:2, userTag: "Stevy"},
    tweet: null,
    isRead: false
},    {
    notificationType: "QUOTE_TWEET",
    userReceiver: {id:3, userTag: "Joshuah"},
    userInitiator: {id:4, userTag: "Naval"},
    tweet: null,
    isRead: false
},    {
    notificationType: "REPLY",
    userReceiver:  {id:1, userTag: "Joshuah"},
    userInitiator:  {id:4, userTag: "Laden"},
    tweet: null,
    isRead: false
},    {
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
