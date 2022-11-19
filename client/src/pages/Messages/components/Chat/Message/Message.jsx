import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const styles = ({theme}) => ({
  flexShrink: 1,
  padding: '11px 15px',
  borderRadius: 24,

  '& .MuiTypography-root': {
    wordWrap: 'break-word',
    minWidth: 0,
  }
});

const BoxWrapper = styled(Box)(styles);

const Message = ({left, text}) => {
  return (
    <BoxWrapper className={left ? 'LeftMessage' : 'RightMessage'}>
      <Typography>{text}</Typography>
    </BoxWrapper>);
}

Message.propTypes = {
  left: PropTypes.bool,
  text: PropTypes.string,
}

export default Message;
