import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader} from "../../components";
import NotificationItem from "./NotificationItem";
import {useSelector} from "react-redux";
import notifSel from '@redux/notification/selector';

const Notifications = () => {

    const {notifications} = useSelector(notifSel.notifications);

    // notifications[0].avatarImgUrl = "https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg";
    // notifications[0].userTag = "musk";

    const notificationElements = notifications.map((notification, ind)=> {
        switch (notification.Type) {
            case "LIKE":
                notification.title = `Your tweet liked by: ${notifications.userInitiator}`;
                break;
            case "QUOTE_TWEET":
                notification.title = `Your tweet quoted by: ${notifications.userInitiator}`;
                break;
            case "REPLY":
                notification.title = `Your tweet replied by: ${notifications.userInitiator}`;
                break;
            case "RETWEET":
                notification.title = `Your tweet retweeted by: ${notifications.userInitiator}`;
                break;
            case "LEAVE_CHAT":
                notification.title = `You left one of your chats: ${notifications.userInitiator.id}`;
                break;
                case "LOGGED_IN":
                notification.title = `You logged!: ${notifications.userInitiator.id}`;
                break;
            default:
        }
        notification.avatarImgUrl = notifications.userInitiator.avatarImgUrl;
        notification.userTag = notifications.userInitiator.userTag;

          return  <NotificationItem key={ind} notification={notification}/>
        }
    );





    return (
        <ColumnWrapper>
            <PrimaryColumn>
                <StickyHeader>
                    HEADER Notifications primary column
                </StickyHeader>
                BODY Notifications primary column
                {notificationElements}
            </PrimaryColumn>

            <SitebarColumn>
                <StickyHeader>
                    HEADER Notifications sitebar column
                </StickyHeader>
                BODY Notifications sitebar column
            </SitebarColumn>
        </ColumnWrapper>
    );
};

export default Notifications;
