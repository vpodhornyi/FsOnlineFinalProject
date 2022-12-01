import React, {useEffect} from "react";
import {useSelector, use} from "react-redux";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import SearchBox from "./SearchBox";
import Box from "@mui/material/Box";
import ChatRoute from "./ChatRoute";
import {getMessageData} from "@redux/message/selector";
import Loading from "@components/Loader/Loading";
import Action from "../Action";
import {PATH} from "../../../../utils/constants";


const ACTION_TITLE = 'Welcome to your inbox!';
const ACTION_DESCRIPTION = ' Drop a line, share Tweets and more with private conversation between you and others on Twitter';
const ACTION_BTN_NAME = 'Write a message';

const Navigation = () => {
  const navigate = useNavigate();
  const {chats, activeId, isChatSelected} = useSelector(getMessageData);
  const isEmpty = !chats.length;

  useEffect(() => {
    isChatSelected && navigate(`${PATH.MESSAGES.ROOT}/${activeId}`)
  }, []);

  return (
    <BoxWrapper>
      {isEmpty ? <Action
        title={ACTION_TITLE}
        description={ACTION_DESCRIPTION}
        btnName={ACTION_BTN_NAME}
        /> :
        <>
          <SearchBox/>
          <Box>{chats.map(chat => {
            return <Box key={chat.key} onClick={() => navigate(`${PATH.MESSAGES.ROOT}/${chat.id}`)}>
              <ChatRoute chat={chat} activeId={activeId}/>
            </Box>
          })}</Box>
        </>
      }
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
});

const BoxWrapper = styled(Box)(styles);

export default Navigation;
