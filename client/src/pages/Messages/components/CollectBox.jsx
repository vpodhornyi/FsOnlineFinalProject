import React from "react";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import ChatInfo from "./ChatInfo";
import Navigation from './Navigation';
import {getMessageData} from '@redux/message/selector';
import {useSelector} from "react-redux";

const styles = ({theme}) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  borderLeft: '1px solid rgb(239, 243, 244)',
  borderRight: '1px solid rgb(239, 243, 244)',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  }
});

const BoxWrapper = styled(Box)(styles);

const CollectBox = () => {
  const {isChatInfo} = useSelector(getMessageData);
  const select = () => {
    switch (true) {
      case isChatInfo:
        return <ChatInfo/>;
      // case isChatSelected:
      //   return <Chat/>;
      default:
        return <Navigation/>;
    }
  }

  return (
    <BoxWrapper>
      {select()}
    </BoxWrapper>);
}

export default CollectBox;
