import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Avatar} from "@mui/material";
import {getMessageData} from "@redux/message/selector";

const Header = () => {
  const dispatch = useDispatch();
  const chat = useSelector(getMessageData);

  return (
    <BoxWrapper onClick={() => dispatch(() => console.log('header avatar'))}>
      <Avatar sx={{mr: '10px', width: '2.5rem', height: '2.5rem'}} src={chat.avatarImgUrl}/>
    </BoxWrapper>
  )
}

const BoxWrapper = styled(Box)(({theme}) => ({
  marginRight: 10,

  [theme.breakpoints.up('xs')]: {
    display: 'none'
  },
}));

export default Header;
