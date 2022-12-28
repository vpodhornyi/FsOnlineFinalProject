import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Box, Typography, TextField} from '@mui/material';

import {OrLine, Question, Container, ButtonWrapper} from '../components';
import {CustomFabButton} from '../../../components';
import {BackgroundContext} from "../../../utils/context";
import {PATH} from "../../../utils/constants";
import {runLoginSecondStep} from '@redux/auth/action';

const Login = () => {
  const [login, setLogin] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {background} = useContext(BackgroundContext);

  const onChange = (e) => {
    setLogin(() => e.target.value);
  }

  return (
    <Container>
      <Typography className='StepTitle' variant='h1'>{"Sign in to Twitter"}</Typography>
      <ButtonWrapper>
        <CustomFabButton className='GoogleSingIn' name='Sing in with Google'/>
      </ButtonWrapper>
      <OrLine/>
      <TextField
        value={login}
        onChange={e => onChange(e)}
        sx={{width: '100%', mt: 2, mb: 2}}
        label="Email or username"
        variant="outlined"/>
      <ButtonWrapper>
        <CustomFabButton
          onClick={() => dispatch(runLoginSecondStep({login, navigate, background}))}
          className='NextStepBtn'
          name='Next'/>
      </ButtonWrapper>
      <ButtonWrapper>
        <CustomFabButton
          onClick={() => navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.FORGOT_PASSWORD}`, {state: {background}})}
          name='Forgot password?'/>
      </ButtonWrapper>
      <Box sx={{mt: 4}}>
        <Question
          to={`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_UP.ROOT}`}
          question={"Don't have an account?"}
          link={'Sign up'}
        />
      </Box>
    </Container>
  );
}

export default Login;
