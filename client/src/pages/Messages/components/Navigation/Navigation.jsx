import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {getMessageData} from "@redux/message/selector";
import Box from "@mui/material/Box";

import {ActionWelcome} from "../.";
import SearchBox from "./SearchBox";
import ChatsList from "./ChatsList";

const Navigation = () => {
  const {chats} = useSelector(getMessageData);
  const isEmpty = !chats.length;

  return (
    <BoxWrapper>
{/*      {isEmpty ? <ActionWelcome/> :
        <>
          <SearchBox/>
          <ChatsList/>
        </>
      }*/}
      <SearchBox/>
      <ChatsList/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
});

const BoxWrapper = styled(Box)(styles);

export default Navigation;
