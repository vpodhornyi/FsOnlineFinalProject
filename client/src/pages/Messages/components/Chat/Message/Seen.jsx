import React from "react";
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";
import PropTypes from "prop-types";

const Seen = ({message}) => {
  const {sending, isMessageSeen, messagesSeen, isPrivateChat, isGroupChat} = message;
  const text = sending ? 'Sending...' : isMessageSeen ? 'Seen' : 'Sent';

  const groupText = ln => {
    switch (ln) {
      case 0:
        return 'Nobody seen';
      case 1:
        return 'Seen by 1 person';
      default:
        return `Seen by ${ln} people`;
    }
  }

  return (
    <>
      {
        isPrivateChat && <TypographyWrapper variant='body2'>{text}</TypographyWrapper>
      }
      {
        isGroupChat &&
        <TypographyWrapper variant='body3'>{groupText(messagesSeen.length)}</TypographyWrapper>
      }
    </>);
}

const TypographyWrapper = styled(Typography)(({theme}) => ({
  cursor: 'pointer',

  '&:before': {
    content: '"·"',
    marginLeft: '5px',
    marginRight: '5px',
  }
}));

Seen.propTypes = {
  message: PropTypes.object,
}

Text.propTypes = {
  text: PropTypes.string,
}
export default Seen;
