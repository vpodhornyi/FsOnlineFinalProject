import React, {useEffect} from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import { useInView } from 'react-intersection-observer';

import MessageBox from "./MessageBox";
import Reaction from "./Reaction";
import Time from "./Time";

const Message = ({left = false, message, toggleModal}) => {
  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: true,
  });

  useEffect(() => {
    message?.messageSeen?.seen === false && console.log('send - ', message.id);
  }, [inView])

  return (
    <BoxWrapper>
      <Box className={left ? 'LeftMessage' : 'RightMessage'}>
        {/*{inView && (message?.messageSeen?.seen === false) &&  'Seen'}*/}
        <Box ref={ref}>
          <MessageBox left={left} text={message?.text} toggleModal={toggleModal}/>
        </Box>
        {/*<Reaction/>*/}
        <Time left={left} message={message}/>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '& > .MuiBox-root': {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingBottom: 20,
    alignItems: 'end',
  },

  '& > .MuiBox-root > .MuiBox-root': {
    display: 'flex',

    '&:hover .Actions': {
      opacity: 1
    }
  },

  '& > .RightMessage > .MuiBox-root': {
    justifyContent: 'flex-end',
  },

  '& > .LeftMessage > .MuiBox-root': {
    justifyContent: 'flex-start',
    width: '100%'
  },
  '& > .LeftMessage > .MuiBox-root > .MuiBox-root': {
    justifyContent: 'flex-start',
  },
}));

Message.propTypes = {
  left: PropTypes.bool,
  message: PropTypes.object,
  toggleModal: PropTypes.func,
}

export default Message;
