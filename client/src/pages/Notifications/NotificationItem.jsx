import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {styled} from "@mui/material/styles";
import {Avatar, Typography, Box, Badge} from "@mui/material";
import PropTypes from "prop-types";



const NotificationItem = ({notification}) => {
  const {id} = useParams();

  const handleNotificationClick = () => {

  }


  return (
    <BoxWrapper onClick={() => handleNotificationClick(notification)}>
      <Box
        // className={`ChatRoutWrapperActive`}
        className={`NotReadMessagesExist`}
        >
        <Box sx={{display: 'flex'}}>
          <Avatar sx={{mr: '10px', width: '3.3rem', height: '3.3rem'}} src={notification.userInitiator.avatarImgUrl}/>
          <Box>
            <Box sx={{display: 'flex'}}>
              <Typography sx={{fontWeight: 600}}>{notification.title}</Typography>

              {<Typography variant='body2' sx={{ml: '5px'}}>@{notification.userInitiator.userTag}</Typography>}
            </Box>
          </Box>
        </Box>
        <Badge
          badgeContent={"hi!"}
          color="primary"
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
}

export default NotificationItem;
