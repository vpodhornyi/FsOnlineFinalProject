import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Box, Typography, TextField} from '@mui/material';
import {authorize} from '@redux/auth/action';

import {CustomFabButton} from "../../../components";
import {BackgroundContext} from "../../../utils/context";
import {Question, Container, ButtonWrapper} from '../components';
import {PATH} from "../../../utils/constants";

const SingInSecondStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);
  const userName = useSelector(state => state.auth.loginName);
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(userName);

  const onChangeLogin = e => {
    setLogin(() => e.target.value);
  }

  const onChangePassword = e => {
    setPassword(() => e.target.value);
  }

  return (
    <Container>
      <Box>
        <Typography className='StepTitle' variant='h1'>{'Enter your password'}</Typography>
        <TextField
          onChange={e => onChangeLogin(e)}
          value={login}
          disabled={userName !== ''}
          id="email"
          sx={{width: '100%', mt: 2, mb: 2}}
          label="Email or username"
          variant="outlined"/>
        <TextField
          onChange={e => onChangePassword(e)}
          value={password}
          id="password"
          sx={{width: '100%', mt: 2, mb: 2}}
          label="Password"
          variant="outlined"/>
      </Box>
      <Box sx={{mb: 3}}>
        <ButtonWrapper>
          <CustomFabButton
            onClick={() => dispatch(authorize({login, password, navigate, background}))}
            className='NextStepBtn'
            name='Log in'/>
        </ButtonWrapper>
        <Question
          to={`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_UP.ROOT}`}
          question={"Don't have an account?"}
          link={'Sign up'}
        />
      </Box>
    </Container>
  );
};

export default SingInSecondStep;

