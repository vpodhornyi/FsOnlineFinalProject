import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import MessageBox from "./MessageBox";
import Reaction from "./Reaction";
import Time from "./Time";
import PropTypes from "prop-types";

const Index = ({left = false, message, toggleModal}) => {

  return (
    <BoxWrapper>
      <Box className={left ? 'LeftMessage' : 'RightMessage'}>
        <Box>
          <MessageBox left={left} text={message?.text} toggleModal={toggleModal}/>
        </Box>
        {/*<Reaction/>*/}
        <Time time={message.createdAt}/>
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

Index.propTypes = {
  left: PropTypes.bool,
  message: PropTypes.object,
  toggleModal: PropTypes.func,
}

export default Index;
