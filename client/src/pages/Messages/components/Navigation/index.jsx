import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Header from "./Header";
import SearchBox from "./SearchBox";
import Box from "@mui/material/Box";
import UserRoute from "./UserRoute";
import {getMessageData} from "@redux/message/selector";
import Loading from "@components/Loader/Loading";
import WelcomeToInbox from "../WelcomeToInbox";

const Index = () => {
  const BoxWrapper = styled(Box)(styles);
  const {isNavigationLoading, conversations, activeId} = useSelector(getMessageData);
  const isEmpty = !conversations.length;

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
            <Box>{conversations.map(user => <UserRoute key={user.id} user={user} activeId={activeId}/>)}</Box>
          </>
      }
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  height: '100%',
  width: '100%',
});

export default Index;
