import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Badge} from "@mui/material";
import IconByName from "@components/icons/IconByName";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {setSeenMessage} from '@redux/chat/message/action';

const ScrollDownButton = ({chat, visible, getLastPage, pageNumberDown}) => {
  const dispatch = useDispatch();
  const fetch = async () => {
    if (chat) {
      const message = chat.lastMessage;
      const body = {messageId: message.id, chatId: chat.id, countUnreadMessages: message.countUnreadMessages};
      if (message.id !== message.lastSeenChatMessageId) {
        await dispatch(setSeenMessage({body}));
      }

      if (pageNumberDown > 0) {
        await getLastPage(chat.id, 0);
      }
    }
  }

  return visible ? (
    <BoxWrapper className='ScrollDownButton' onClick={fetch}>
      <Badge
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        max={999}
        badgeContent={chat?.lastMessage?.countUnreadMessages}
        color="primary"
      >
        <Box sx={{p: '7px'}}>
          <IconByName color='primary' iconName='ArrowDownwardOutlined'/>
        </Box>
      </Badge>
    </BoxWrapper>) : null;
}

const styles = ({theme}) => ({
  cursor: 'pointer',
  position: 'absolute',
  right: 50,
  top: -55,
  backgroundColor: theme.palette.background.main,
  padding: '0px 10px',
  borderRadius: 24,
  boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 8px, rgb(101 119 134 / 25%) 0px 1px 3px 1px',
  transition: '0.3s',

  '&:hover': {
    backgroundColor: theme.palette.background[1],
  },

  "& .MuiBadge-badge": {
    top: `-5px`,
    left: `17px`,
  }
});

const BoxWrapper = styled(Box)(styles);

ScrollDownButton.propTypes = {
  chat: PropTypes.object,
  visible: PropTypes.bool,
  getLastPage: PropTypes.func,
  pageNumberDown: PropTypes.number,
}

export default ScrollDownButton;
