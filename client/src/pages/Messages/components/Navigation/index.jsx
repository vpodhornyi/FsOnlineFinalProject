import React, {useEffect} from "react";
import {useSelector, use} from "react-redux";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import SearchBox from "./SearchBox";
import Box from "@mui/material/Box";
import ChatRoute from "./ChatRoute";
import {getMessageData} from "@redux/message/selector";
import Loading from "@components/Loader/Loading";
import WelcomeToInbox from "../WelcomeToInbox";

const Index = () => {
  const navigate = useNavigate();
  const {chats, activeId, isChatSelected} = useSelector(getMessageData);
  const isEmpty = !chats.length;

  useEffect(() => {
    isChatSelected && navigate(`/messages/${activeId}`)
  }, []);

  return (
    <BoxWrapper>
      <>
        <SearchBox/>
        <Box>{chats.map(chat => {
          return <Box key={chat.id} onClick={() => navigate(`/messages/${chat.id}`)}>
            <ChatRoute chat={chat} activeId={activeId}/>
          </Box>
        })}</Box>
      </>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
});

const BoxWrapper = styled(Box)(styles);

export default Index;
