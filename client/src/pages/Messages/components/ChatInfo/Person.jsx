import React from "react";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {FollowButton} from "@components";

const Person = ({user}) => {

  return ( user &&
    <BoxWrapper>
      <Box sx={{display: 'flex'}}>
        <Avatar sx={{mr: 2, width: '3.3rem', height: '3.3rem'}} src={user.avatarImgUrl}/>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Typography fontWeight='fontWeightBold'>{user.name}</Typography>
          <Typography variant='body2'>@{user.userTag}</Typography>
        </Box>
      </Box>
      <FollowButton name='Follow'/>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  padding: '11px 15px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
  transition: '0.2s',

  '&:hover': {
    backgroundColor: theme.palette.background[1],
  }
}));

Person.propTypes = {
  user: PropTypes.object,
}
export default Person;
