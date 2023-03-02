import React from 'react';
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
            // dispatch(NOTIFICATION_ACTIONS.unckeckNotification(notificationId));  //TODO раскомметировать для смены цвета статуса кликнутого уведомления
            dispatch(NOTIFICATION_ACTIONS.dismissNotification(notificationId)); //TODO раскомметировать для мгновенного удаления кликнутого уведомления с экрана
        }

    }


    const notificationElements = notifications.map((notification, ind) => {
        const who = `${notification.userInitiator?.userTag ? notification.userInitiator.userTag : ""}`;
        const whom = `${notification.userReceiver?.userTag ? notification.userReceiver.userTag : ""}`;
        let action;

            switch (notification.notificationType) {
                case "LIKE":
                    action = " liked tweet of ";
                    notification.title = `${who}${action}${whom}`;
                    break;
                case "QUOTE_TWEET":
                    action = " quoted tweet of ";
                    notification.title = `${who}${action}${whom}`;
                    break;
                case "REPLY":
                    action = " replied tweet of ";
                    notification.title = `${who}${action}${whom}`;
                    break;
                case "RETWEET":
                    action = " retweeted ";
                    notification.title = `${who}${action}${whom}`;
                    break;
                    case "NEW_TWEET":
                        action = " posted new tweet";
                        notification.title = `${who}${action}`;
                    break;
                    case "TWEET_UPDATE":
                        action = " updated his tweet";
                        notification.title = `${who}${action}`;
                    break;
                case "LOGGED_IN":
                        action = " logged in";
                        notification.title = `${who}${action}`;
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