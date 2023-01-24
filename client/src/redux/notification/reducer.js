import {ACTIONS} from "./action";

const notifications = [
    {
    notificationType: "LIKE",
    userReceiver: 2,
    userInitiator: 1,
    tweet: null,
    isRead: false
},    {
    notificationType: "QUOTE_TWEET",
    userReceiver: 3,
    userInitiator: 4,
    tweet: null,
    isRead: false
},    {
    notificationType: "REPLY",
    userReceiver: 1,
    userInitiator: 4,
    tweet: null,
    isRead: false
},    {
    notificationType: "RETWEET",
    userReceiver: 6,
    userInitiator: 2,
    tweet: null,
    isRead: false
},
]


export default (state = notifications, {payload, type}) => {
    switch (type) {

        case String(ACTIONS.setNotifications):
            return {
                ...state,
                notifications: [...notifications, payload],
            };

        // case String(ACTIONS.getNotifications):
        //     return {
        //         ...state,
        //     };


    }

}
