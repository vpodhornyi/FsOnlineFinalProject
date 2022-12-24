import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import Action from "./Action/Action";
import MessageTextBox from "./MessageTextBox";
import PropTypes from "prop-types";

const styles = ({theme}) => ({
  cursor: 'pointer',
  width: '87.5%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',

  '& > .LeftMessage': {
    borderBottomLeftRadius: 4,
    backgroundColor: '#eff3f4',
  },

  '& > .RightMessage': {
    borderBottomRightRadius: 4,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
});

const BoxWrapper = styled(Box)(styles);

const MessageBox = ({left, text, toggleModal}) => {

  return (
    <BoxWrapper>
      {left ? (<>
        <MessageTextBox left={left} text={text}/>
        <Action toggleModal={toggleModal}/>
      </>) : (<>
        <Action toggleModal={toggleModal}/>
        <MessageTextBox text={text}/>
      </>)}
    </BoxWrapper>);
}

MessageBox.propTypes = {
  left: PropTypes.bool,
  text: PropTypes.string,
  toggleModal: PropTypes.func,
}

export default MessageBox;
