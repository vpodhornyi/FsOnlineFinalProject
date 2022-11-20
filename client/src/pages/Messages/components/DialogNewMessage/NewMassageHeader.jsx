import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Chip, Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import CustomFabButton from "@components/buttons/CustomFabButton";
import {closeDialog} from "@redux/dialog/action";
import {getMessageSearchData} from '@redux/message/search/selector';

const Index = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();
  const {isEmptyGrabbedUsers} = useSelector(getMessageSearchData);

  return (
    <BoxWrapper>
      <Box className='Title'>
        <Box onClick={() => dispatch(closeDialog())}>
          <CustomIconButton name='Close'/>
        </Box>
        <Typography variant='h2'>New message</Typography>
      </Box>
      <Box className={isEmptyGrabbedUsers && 'NextButtonWrapper'}>
        <CustomFabButton name='Next' disabled={isEmptyGrabbedUsers}/>
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
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

});

export default Index;
