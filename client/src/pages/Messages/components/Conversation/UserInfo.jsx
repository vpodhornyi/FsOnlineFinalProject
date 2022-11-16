import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import {getMessageData} from "@redux/message/selector";

const Index = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();
  const {user} = useSelector(getMessageData);

  return (
    <Link to='/user_name' style={{textDecoration: 'none'}}>
      <BoxWrapper>
        <Avatar sx={{width: '5rem', height: '5rem'}} src={user.avatarImgUrl}/>
        <Typography sx={{fontWeight: 600}}>{user.name}</Typography>
        <Typography sx={{pb: 2}}>{user.userTag}</Typography>
        <Typography>Joined November 2022 · 1 Follower</Typography>
        <Typography>User Tag</Typography>
      </BoxWrapper>
    </Link>
  );
}

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

export default Index;
