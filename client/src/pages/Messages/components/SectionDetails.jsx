import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import SelectMessage from "./SelectMessage";
import Conversation from "./Chat";
import {getMessageData} from '@redux/message/selector';
import ConversationInfo from "./ChatInfo";

const SectionDetails = () => {
  const {isChatSelected, isChatInfo} = useSelector(getMessageData);
  const select = () => {
    switch (true) {
      case isChatInfo:
        return <ConversationInfo/>;
      case isChatSelected:
        return <Conversation/>;
      default:
        return <SelectMessage/>;
    }
  }
  return (
    <SectionWrapper>
      {select()}
    </SectionWrapper>);
}

const styles = ({theme}) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'none',
  borderRight: '1px solid #DDDFE2',

  [theme.breakpoints.up('md')]: {
    display: 'block'
  }
});

const SectionWrapper = styled('section')(styles);

export default SectionDetails;
