import React from "react";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {PATH} from "@utils/constants";


const UserInfo = ({user}) => {
  return (
    <BoxWrapper>
      <Link  to={PATH.userProfile(user.userTag)}>
        <Avatar sx={{width: '3.5rem', height: '3.5rem', mb: 1}} src={user.avatarImgUrl}/>
      </Link>
      <Typography fontWeight='bold' fontSize='1.3rem'>{user.name}</Typography>
      <Typography variant='body2' sx={{pb: 2}}>@{user.userTag}</Typography>
      <Box sx={{display: 'flex'}}>
        <Typography sx={{mr: 2}} variant='body2'><span className='FollowCount'>{4}</span> Following</Typography>
        <Typography variant='body2'><span className='FollowCount'>{1}</span> Follower</Typography>
      </Box>
      {/*<Typography variant='body2'>User Tag</Typography>*/}
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: '5px 15px',
  display: 'flex',
  flexDirection: 'column',

  '& .FollowCount': {
    fontWeight: theme.typography.fontWeightBold
  }
}));

UserInfo.propTypes = {
  user: PropTypes.object,
}
export default UserInfo;
