import React from "react";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const FoundUser = ({user, grabUser}) => {
  return (
    <BoxWrapper onClick={() => grabUser(user)}>
      <Avatar sx={{mr: '10px', width: '2.7rem', height: '2.7rem'}} src={user?.avatarImgUrl}/>
      <Box>
        <Typography fontWeight='fontWeightBold'>{user.name}</Typography>
        <Typography>{'@' + user.userTag}</Typography>
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '10px 20px',
  margin: '2px 0',

  '&:hover': {
    backgroundColor: 'rgb(247, 249, 249)',
  },

  '& .MuiBox-root': {
    display: 'flex',
    flexDirection: 'column',
  }
});

const BoxWrapper = styled(Box)(styles);

FoundUser.propTypes = {
  user: PropTypes.object,
  grabUser: PropTypes.func,
}

export default FoundUser;
