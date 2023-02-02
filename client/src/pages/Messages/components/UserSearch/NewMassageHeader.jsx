import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {CustomIconButton, FollowButton} from "@components";
import {BackgroundContext} from "../../../../utils/context";
import {PATH} from "@utils/constants";

const NewMessageHeader = ({isAdd, isGroup, isNext, next, addPeople}) => {
  const {background} = useContext(BackgroundContext);
  const navigate = useNavigate();

  return (
    <BoxWrapper>
      <Box className='Title'>
        {isGroup ?
          <>
            <Box onClick={() => navigate(PATH.MESSAGES.COMPOSE, {state: {background}})}>
              <CustomIconButton name='ArrowBack' color='text'/>
            </Box>
            <Typography variant='h2'>Create a group</Typography>
          </> :
          <>
            <Box onClick={() => navigate(background?.pathname || PATH.ROOT)}>
              <CustomIconButton name='Close' color='text'/>
            </Box>
            {isAdd ?
              <Typography variant='h2'>Add people</Typography>
              :
              <Typography variant='h2'>New message</Typography>
            }
          </>}
      </Box>
      {isAdd ?
        <Box sx={{mr: 1}} onClick={() => addPeople()}>
          <FollowButton name='Add' disabled={isNext}/>
        </Box>
        :
        <Box sx={{mr: 1}} onClick={() => next(isGroup)}>
          <FollowButton name='Next' disabled={isNext}/>
        </Box>
      }
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 5,
  boxSizing: 'border-box',

  '& > .Title': {
    display: 'flex',
    alignItems: 'center',

    '& > .MuiTypography-root': {
      marginLeft: '15px',
      fontWeight: 600,
      fontSize: '1.5rem'
    }
  },

  '& .NextButtonWrapper .CustomFabButton': {
    backgroundColor: '#aaaaaa !important',
  },

  '& .CustomFabButton': {
    backgroundColor: '#000000',
    color: '#DBE7F0',
    height: '2.2rem',

    '&:hover': {
      backgroundColor: '#000000',
    },
  }
}));

NewMessageHeader.propTypes = {
  isGroup: PropTypes.bool,
  isNext: PropTypes.bool,
  isAdd: PropTypes.bool,
  next: PropTypes.func,
  addPeople: PropTypes.func,
}

export default NewMessageHeader;
