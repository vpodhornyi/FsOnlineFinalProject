import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Header from "./Header";
import SearchBox from "./SearchBox";
import Box from "@mui/material/Box";
import ChatRoute from "./ChatRoute";
import {getMessageData} from "@redux/message/selector";
import Loading from "@components/Loader/Loading";
import WelcomeToInbox from "../WelcomeToInbox";

const Index = () => {
  const {isNavigationLoading, chats, activeId} = useSelector(getMessageData);
  const isEmpty = !chats.length;

  return (
    <BoxWrapper>
      <Header/>
      {isNavigationLoading ?
        <Box sx={{height: 'calc(100% - 114px)'}}>
          <Loading/>
        </Box> :
        isEmpty ? <WelcomeToInbox/> :
          <>
            <SearchBox/>
            <Box>{chats.map(chat => <ChatRoute key={chat.id} chat={chat} activeId={activeId}/>)}</Box>
          </>
      }
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  height: '100%',
  width: '100%',
});

const BoxWrapper = styled(Box)(styles);

export default Index;
