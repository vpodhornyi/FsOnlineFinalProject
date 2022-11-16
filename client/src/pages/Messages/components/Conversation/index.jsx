import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import ChatHeader from "./Header";
import {getMessageData} from "@redux/message/selector";
import Loading from "@components/Loader/Loading";
import ConversationBody from "./ConversationBody";

const Index = () => {
  const BoxWrapper = styled(Box)(styles);
  const {isDetailLoading} = useSelector(getMessageData);

  return (
    <BoxWrapper>
      <ChatHeader/>
      {isDetailLoading ?
        <Box sx={{height: '100%'}}>
          <Loading/>
        </Box>
        : <ConversationBody/>}
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export default Index;
