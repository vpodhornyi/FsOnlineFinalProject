import React from "react";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import ConversationInfo from "./ConversationInfo";
import Conversation from "./Conversation";
import Navigation from './Navigation';
import {getMessageData} from '@redux/message/selector';
import {useSelector} from "react-redux";

const CollectBox = () => {
  const BoxWrapper = styled(Box)(styles);
  const {isChatSelected, isChatInfo} = useSelector(getMessageData);
  const select = () => {
    switch (true) {
      case isChatInfo:
        return <ConversationInfo/>;
      case isChatSelected:
        return <Conversation/>;
      default:
        return <Navigation/>;
    }
  }

  return (
    <BoxWrapper>
      {select()}
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  borderLeft: '1px solid #DDDFE2',
  borderRight: '1px solid #DDDFE2',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  }
});

export default CollectBox;
