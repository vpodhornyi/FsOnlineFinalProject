import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {Typography, Menu, MenuItem, Box} from "@mui/material";
import PropTypes from "prop-types";

import MessageOwnerSeen from "./MessageOwnerSeen";

const Seen = ({message}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {sending, isMessageSeen, messagesSeen, isPrivateChat, isGroupChat} = message;
  const text = sending ? 'Sending...' : isMessageSeen ? 'Seen' : 'Sent';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const groupText = ln => {
    switch (ln) {
      case 0:
        return 'Sent';
      case 1:
        return 'Seen by 1 person';
      default:
        return `Seen by ${ln} people`;
    }
  }

  return (
    <>
      {
        isPrivateChat && <BoxWrapper>
          <Dot/>
          <TypographyWrapper variant='body2'>{text}</TypographyWrapper>
        </BoxWrapper>

      }
      {
        isGroupChat && <BoxWrapper>
          <Dot/>
          <Box>
            <Box onClick={handleClick}>
              <TypographyWrapper variant='body3'>{sending ? text : groupText(messagesSeen.length)}</TypographyWrapper>
            </Box>
            <MenuWrapper
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {
                messagesSeen.map(({user}) => {
                  return <MenuItem key={user.key}>
                    <MessageOwnerSeen user={user}/>
                  </MenuItem>;
                })
              }
            </MenuWrapper>
          </Box>
        </BoxWrapper>
      }
    </>);
}

const MenuWrapper = styled(Menu)(({theme}) => ({
  '& .MuiPaper-root': {
    boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px !important',
    borderRadius: '12px !important',
    backgroundColor: theme.palette.background.main,

    '& .MuiList-root': {
      padding: 0,

      '& .MuiButtonBase-root': {
        padding: '11px 15px',
        borderBottom: `1px solid ${theme.palette.border.main}`,

        '&:last-child': {
          borderBottom: 'none',
        },

        '&:hover': {
          transition: 0.1,
          backgroundColor: theme.palette.background[1],
        },

        '& .MuiTouchRipple-root': {
          display: 'none'
        },
      }
    }
  },
}));
const TypographyWrapper = styled(Typography)(({theme}) => ({
  cursor: 'pointer',

  '&:hover': {
    textDecoration: 'underline',
  },
}));
const Dot = styled('span')(({theme}) => ({
  '&:before': {
    content: '"·"',
    marginLeft: '5px',
    marginRight: '5px',
  }
}));
const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

Seen.propTypes = {
  message: PropTypes.object,
}

Text.propTypes = {
  text: PropTypes.string,
}
export default Seen;
