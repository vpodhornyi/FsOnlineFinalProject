import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import {getChatsData} from "@redux/chat/selector";

const styles = ({theme}) => ({
  paddingTop: 70,
  paddingBottom: 50,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid rgb(239, 243, 244)',
  marginBottom: 15,

  '&:hover': {
    backgroundColor: '#eff3f4',
    transition: '0.5s',
  }
});

const BoxWrapper = styled(Box)(styles);

const Index = () => {
  const {selectedChat} = useSelector(getChatsData);

  return (
    <Link to='/user_name' style={{textDecoration: 'none', color: '#000000'}}>
      <BoxWrapper>
        <Avatar sx={{width: '5rem', height: '5rem'}} src={selectedChat.avatarImgUrl}/>
        <Typography sx={{fontWeight: 600}}>{selectedChat.title}</Typography>
        <Typography sx={{pb: 2}}>@{selectedChat.userTag}</Typography>
        <Typography>Joined November 2022 · 1 Follower</Typography>
        <Typography>User Tag</Typography>
      </BoxWrapper>
    </Link>
  );
}

export default Index;
