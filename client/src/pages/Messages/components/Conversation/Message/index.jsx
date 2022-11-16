import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import MessageBox from "./MessageBox";
import Reaction from "./Reaction";
import Time from "./Time";
import PropTypes from "prop-types";

const Index = ({left = false, text}) => {
  const BoxWrapper = styled(Box)(styles);

  return (
    <BoxWrapper>
      <Box className={left ? 'LeftMessage' : 'RightMessage'}>
        <Box>
          <MessageBox left={left} text={text}/>
        </Box>
        <Reaction/>
        <Time/>
      </Box>
    </BoxWrapper>);
}

Index.propTypes = {
  left: PropTypes.bool,
  text: PropTypes.string,
}

const styles = ({theme}) => ({
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
});

export default Index;
