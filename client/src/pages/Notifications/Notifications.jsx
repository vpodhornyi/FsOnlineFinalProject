import React, {useEffect} from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader} from "../../components";
import NotificationItem from "./NotificationItem";
import {useDispatch, useSelector} from "react-redux";
import notifSel from '@redux/notification/selector';
import SelectNotification from "./SelectNotification";
import {styled} from "@mui/material/styles";
import ACTIONS_Cust, {ACTIONS as NOTIFICATION_ACTIONS} from "@redux/notification/action";

const Notifications = () => {

    const notifications = useSelector(notifSel.notifications);
    const dispatch = useDispatch();
    if (!notifications || notifications.length === 0) return;


    const handleNotificationClick = (e) => {
        const element = e.target.closest('div[data-name]');
        const notificationId = element?.getAttribute("data-name");
        if ( !isNaN(notificationId) ) {
            dispatch(ACTIONS_Cust.deactivateNotification(notificationId));
            dispatch(ACTIONS_Cust.deleteNotification(notificationId));
            dispatch(NOTIFICATION_ACTIONS.dismissNotification(notificationId));
        } else {
            console.log("notificationId: ", notificationId);
        }

    }


    const notificationElements = notifications.map((notification, ind) => {
            switch (notification.notificationType) {
                case "LIKE":
                    notification.title = `Your tweet liked by: ${notification.userInitiator.userTag}`;
                    break;
                case "QUOTE_TWEET":
                    notification.title = `Your tweet quoted by: ${notification.userInitiator.userTag}`;
                    break;
                case "REPLY":
                    notification.title = `Your tweet replied by: ${notification.userInitiator.userTag}`;
                    break;
                case "RETWEET":
                    notification.title = `Your tweet retweeted by: ${notification.userInitiator.userTag}`;
                    break;
                case "LEAVE_CHAT":
                    notification.title = `You left one of your chats: ${notification.userInitiator.userTag}`;
                    break;
                case "LOGGED_IN":
                    notification.title = `You logged!: ${notification.userReceiver.userTag}`;
                    break;
                default:
            }

            return <NotificationItem key={ind} notification={notification} handleNotificationClick={handleNotificationClick}/>
        }
    );

    return (
        <ColumnWrapper>
            <PrimaryColumn>
                <StyledStickyHeader>
                    Your Notifications
                </StyledStickyHeader>
                {notificationElements}
            </PrimaryColumn>

            <SitebarColumn>
                <SelectNotification/>
            </SitebarColumn>
        </ColumnWrapper>
    );
};

export default Notifications;

const StyledStickyHeader = styled(StickyHeader)(({theme}) => ({
    padding: '10px 14px',
    height: '50px',
    display: 'flex',

    fontSize: '1.3rem',
    fontWeight: theme.typography.fontWeightBold,
}));