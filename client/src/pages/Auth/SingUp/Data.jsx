import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {Typography, TextField, Stack, Box} from "@mui/material";
import {styled} from "@mui/material/styles";

import {Container, ButtonWrapper} from '../components';
import {CustomFabButton} from "../../../components";
import {BackgroundContext} from "../../../utils/context";
import {runSingUpSecondStep} from '@redux/auth/action';


const SingUpFirstStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const onChangeLogin = (e) => {
    setName(() => e.target.value);
  }
  const onChangeEmail = (e) => {
    setEmail(() => e.target.value);
  }
  const onChangeDate = (e) => {
    setBirthDate(() => e.target.value);
  }

  const submit = () => {
    dispatch(runSingUpSecondStep({name, email, birthDate, navigate, background}));
  }

  return (
    <Container sx={{justifyContent: 'space-between', height: '100%'}}>
      <Box>
        <Typography className='StepTitle' variant='h1'>Create your account</Typography>
        <Stack spacing={5}>
          <TextField
            value={name}
            onChange={e => onChangeLogin(e)}
            sx={{width: '100%'}}
            label="Name"
            variant="outlined"/>
          <TextField
            value={email}
            onChange={e => onChangeEmail(e)}
            sx={{width: '100%'}}
            label="Email"
            variant="outlined"/>
          <DateWrapper>
            <Typography className='title' variant='body1'>Date of birth</Typography>
            <Typography className='article' variant='body1'>This will not be shown publicly.
              Confirm your own age, even if this account is for a business, a pet, or something else.
            </Typography>
            <TextField
              value={birthDate}
              onChange={e => onChangeDate(e)}
              label="Birthday"
              type="date"
              sx={{width: '100%'}}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DateWrapper>
        </Stack>
      </Box>
      <ButtonWrapperStyled>
        <CustomFabButton
          className='NextStepBtn'
          disabled={name === '' || email === '' || birthDate === ''}
          onClick={() => submit()}
          name='Next'/>
      </ButtonWrapperStyled>
    </Container>
  );
};

const DateWrapper = styled(Box)(({theme}) => ({
  '& .title': {
    marginBottom: 5,
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightBold
  },

  '& .article': {
    marginBottom: 20,
    fontSize: '0.9rem',
  },
}));

const ButtonWrapperStyled = styled(ButtonWrapper)(({theme}) => ({
  marginBottom: 20,

  '& .MuiFab-root': {
    height: '3rem',
  },

  '& .MuiFab-root.Mui-disabled': {
    backgroundColor: '#878a8c',
  },
}));

export default SingUpFirstStep;

