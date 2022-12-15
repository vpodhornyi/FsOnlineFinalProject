import React from "react";
import {styled} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import Person from "../ChatInfo/Person";
import ParticipantsHeader from "./ParticipantsHeader";
import {getChatsData} from '@redux/chat/selector';

const Participants = () => {
  const {selectedChat} = useSelector(getChatsData);

  return (
    <BoxWrapper>
      <ParticipantsHeader chat={selectedChat}/>
      {selectedChat?.users?.map(user => {
        return <Person key={user?.key} user={user}/>
      })}
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
}));

Participants.propTypes = {
  users: PropTypes.object,
}
export default Participants;
