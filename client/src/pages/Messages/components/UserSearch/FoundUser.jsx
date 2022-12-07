import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const FoundUser = ({user, grabUser}) => {
  return (
    <BoxWrapper onClick={() => grabUser(user)}>
      <Avatar sx={{mr: '10px', width: '2.5rem', height: '2.5rem'}} src={user?.avatarImgUrl}/>
      <Box>
        <Typography sx={{fontWeight: 600}}>{user.name}</Typography>
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
