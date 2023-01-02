import React from "react";
import {styled} from "@mui/material/styles";
import {Typography, Box} from "@mui/material";
import PropTypes from "prop-types";

const Seen = ({message}) => {
  const {sending, isMessageSeen, messagesSeen, isPrivateChat, isGroupChat} = message;
  const text = sending ? 'Sending...' : isMessageSeen ? 'Seen' : 'Sent';

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
          <TypographyWrapper variant='body3'>{sending ? text : groupText(messagesSeen.length)}</TypographyWrapper>
        </BoxWrapper>
      }
    </>);
}

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
