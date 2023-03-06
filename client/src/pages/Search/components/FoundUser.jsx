import React from "react";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const FoundUser = ({user, onClick}) => {
  return (
      <BoxWrapper onClick={onClick}>
        <Box className={'Selectable'}>
          <Avatar sx={{mr: '10px', width: '2.7rem', height: '2.7rem'}} src={user?.avatarImgUrl}/>
          <Box>
            <Typography fontWeight='fontWeightBold'>{user.name}</Typography>
            <Typography>{'@' + user.userTag}</Typography>
          </Box>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '& > .MuiBox-root': {
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    alignItems: 'center',

    padding: '10px 20px',
    margin: '2px 0',

    '& .MuiBox-root': {
      display: 'flex',
      flexDirection: 'column',
    }
  },
  '& > .Selectable': {
    background: theme.palette.background.main,
    cursor: 'pointer',

    '&:hover': {
      cursor: "pointer",
      transition: "0.5s",
      backgroundColor: theme.palette.input.background
    },
  },


}));

FoundUser.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func,
}

export default FoundUser;
