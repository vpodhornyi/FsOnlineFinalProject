import React from "react";
import {styled} from "@mui/material/styles";
import {Avatar, Badge, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";


const NotificationItem = ({notification, handleNotificationClick}) => {

    return (
        <BoxWrapper onClick={handleNotificationClick}>
            <Box data-name={`${notification.id}`}
                className={`NotReadMessagesExist`}
            >
                <Box sx={{display: 'flex'}}>
                    <Avatar sx={{mr: '10px', width: '3.3rem', height: '3.3rem'}} src={notification?.userInitiator?.avatarImgUrl ?  notification.userInitiator.avatarImgUrl : ""}/>
                    <Box>
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{fontWeight: 600}}>{notification.title}</Typography>

                            {<Typography variant='body2' sx={{ml: '5px'}}>@{notification.userInitiator.userTag}</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Badge
                    badgeContent={notification.isRead? "dismissed" :  "new"}
                    color={notification.isRead? "error" : "primary"}
                    max={99}
                >
                </Badge>
            </Box>
        </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
    position: 'relative',
    marginBottom: 2,

    '& .ChatRoutWrapperActive': {
        backgroundColor: 'rgb(239, 243, 244)',
        borderRight: `2px ${theme.palette.primary.main} solid`,
    },

    '& > .NotReadMessagesExist': {
        backgroundColor: 'rgb(247, 249, 249)'
    },

    '& > .MuiBox-root': {
        position: 'relative',
        padding: '14px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: 'rgb(247, 249, 249)'
        },

        '& .MoreIcon': {
            opacity: 0,
            position: 'absolute',
            top: '5px',
            right: '5px',
            zIndex: 1000,
        },

        '&:hover  .MoreIcon': {
            opacity: 1,
        }
    }
}));

NotificationItem.propTypes = {
    notification: PropTypes.object,
    toggleModal: PropTypes.func,
    handleNotificationClick: PropTypes.func,
}

export default NotificationItem;
