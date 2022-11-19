import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Avatar} from "@mui/material";
import {getCurrentChat} from "@redux/message/selector";

const Header = () => {
  const dispatch = useDispatch();
  const currentChat = useSelector(getCurrentChat);

  return (
    <BoxWrapper onClick={() => dispatch(() => console.log('header avatar'))}>
      <Avatar sx={{mr: '10px', width: '2.5rem', height: '2.5rem'}} src={currentChat.avatarImgUrl}/>
    </BoxWrapper>
  )
}

const styles = ({theme}) => ({
  marginRight: 10,

  [theme.breakpoints.up('xs')]: {
    display: 'none'
  },
});

const BoxWrapper = styled(Box)(styles);

export default Header;
