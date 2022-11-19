import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import ChatHeader from "./Header";
import {getMessageData} from "@redux/message/selector";
import Loading from "@components/Loader/Loading";
import ChatBody from "./ChatBody";


const Index = () => {
  const {isDetailLoading} = useSelector(getMessageData);

  return (
    <BoxWrapper>
      <ChatHeader/>
      {isDetailLoading ?
        <Box sx={{height: '100%'}}>
          <Loading/>
        </Box>
        : <ChatBody/>}
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const BoxWrapper = styled(Box)(styles);

export default Index;
