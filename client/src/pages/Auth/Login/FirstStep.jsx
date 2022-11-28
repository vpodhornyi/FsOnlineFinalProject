import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Typography, TextField} from '@mui/material';
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";

import OrLine from '../components/OrLine';
import DontHavAnAccount from '../components/DontHavAnAccount';
import {CustomFabButton} from '../../../components';

const SingInFirstStep = ({background}) => {
  const [login, setLogin] = useState('');
  const dispatch = useDispatch();

  const onChange = (e) => {
    setLogin(() => e.target.value);
  }

  return (
    <BoxWrapper>
      <Typography className='StepTitle' variant='h1'>{"Sign in to Twitter"}</Typography>
      <BtnWrapper>
        <CustomFabButton className='GoogleSingIn' name='Sing in with Google'/>
      </BtnWrapper>
      <OrLine/>
      <TextField
        className='LoginField'
        value={login}
        onChange={e => onChange(e)}
        sx={{width: '100%'}}
        label="Email or username"
        variant="outlined"/>
      <BtnWrapper>
        <CustomFabButton className='NextStepBtn' name='Next'/>
      </BtnWrapper>
      <BtnWrapper>
        <CustomFabButton name='Forgot password?'/>
      </BtnWrapper>
      <Box sx={{mt: 4}}>
        <DontHavAnAccount/>
      </Box>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minWidth: '364px',
  maxWidth: '364px',
  padding: 'o 30px 46px 30px',

  '& .LoginField': {
    margin: '10px 0'
  },
}));
const BtnWrapper = styled(Box)(({theme}) => ({

  '& .MuiFab-root': {
    width: '100%',
    height: 34,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: '1px solid #DDDFE2',
    margin: '10px 0',
    transitionDuration: '0.2s',

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
    },

    '&:hover': {
      backgroundColor: 'rgba(15, 20, 25, 0.1);'
    }
  }

}));

SingInFirstStep.propTypes = {
  background: PropTypes.object,
}

export default SingInFirstStep;
