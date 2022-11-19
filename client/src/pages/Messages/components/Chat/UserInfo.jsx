import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import {getCurrentChat} from "@redux/message/selector";

const styles = ({theme}) => ({
  paddingTop: 70,
  paddingBottom: 50,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid #DDDFE2',
  marginBottom: 15,

  '&:hover': {
    backgroundColor: '#eff3f4',
    transition: '0.5s',
  }
});

const BoxWrapper = styled(Box)(styles);

const Index = () => {
  const currentChat = useSelector(getCurrentChat);

  return (
    <Link to='/user_name' style={{textDecoration: 'none'}}>
      <BoxWrapper>
        <Avatar sx={{width: '5rem', height: '5rem'}} src={currentChat.avatarImgUrl}/>
        <Typography sx={{fontWeight: 600}}>{currentChat.name}</Typography>
        <Typography sx={{pb: 2}}>{currentChat.userTag}</Typography>
        <Typography>Joined November 2022 · 1 Follower</Typography>
        <Typography>User Tag</Typography>
      </BoxWrapper>
    </Link>
  );
}

export default Index;
