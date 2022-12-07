import React, {useContext, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {Box, TextField, Typography} from '@mui/material';

import {CustomFabButton} from "../../../components";
import {BackgroundContext} from "../../../utils/context";
import {isAccountExist} from '@redux/auth/action';
import {Container, ButtonWrapper} from '../components';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);
  const [login, setLogin] = useState('');

  const onChangeLogin = e => {
    setLogin(() => e.target.value);
  }

  return (
    <Container sx={{justifyContent: 'space-between', height: '100%',}}>
      <Box>
        <Typography className='StepTitle' variant='h1'>{'Find your Twitter account'}</Typography>
        <TextField
          className='LoginField'
          onChange={e => onChangeLogin(e)}
          value={login}
          id="email"
          sx={{width: '100%', mt: 2}}
          label="Enter your email or username"
          variant="outlined"/>
      </Box>
      <ButtonWrapper sx={{mb: 3}}>
        <CustomFabButton
          onClick={() => dispatch(isAccountExist({login, navigate, background}))}
          className='NextStepBtn'
          name='Search'/>
      </ButtonWrapper>
    </Container>
  );
};

export default ForgotPassword;
