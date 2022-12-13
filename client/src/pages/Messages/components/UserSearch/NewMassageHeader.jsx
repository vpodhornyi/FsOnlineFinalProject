import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import {CustomIconButton, FollowButton} from "@components";
import {BackgroundContext} from "../../../../utils/context";
import {PATH} from "@utils/constants";
import PropTypes from "prop-types";

const NewMessageHeader = ({isGroup, isNext, next}) => {
  const {background} = useContext(BackgroundContext);
  const navigate = useNavigate();

  return (
    <BoxWrapper>
      <Box className='Title'>
        {isGroup ?
          <>
            <Box onClick={() => navigate(PATH.MESSAGES.COMPOSE, {state: {background}})}>
              <CustomIconButton name='ArrowBack'/>
            </Box>
            <Typography variant='h2'>Create a group</Typography>
          </> :
          <>
            <Box onClick={() => navigate(background?.pathname || PATH.ROOT)}>
              <CustomIconButton name='Close'/>
            </Box>
            <Typography variant='h2'>New message</Typography>
        </>}

      </Box>
      <Box onClick={() => next(isGroup)}>
        <FollowButton name='Next' disabled={isNext}/>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  marginBottom: 20,
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
  next: PropTypes.func,
}

export default NewMessageHeader;
