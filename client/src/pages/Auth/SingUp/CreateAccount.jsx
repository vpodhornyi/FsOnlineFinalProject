import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, ButtonWrapper} from '../components';
import {Stack, Typography} from "@mui/material";
import {CustomFabButton} from "../../../components";
import {styled} from "@mui/material/styles";
import {useState} from "react";
import {PATH} from "../../../utils/constants";
import {createNewUser} from "../../../redux/auth/action";


const SingUpSecondStep = () => {
  const dispatch = useDispatch();
  const {
    name: savedName,
    email: savedEmail,
    birthDate: savedBirthDate
  } = useSelector(state => state.auth.newUser);
  const [name, setName] = useState(savedName);
  const [email, setEmail] = useState(savedEmail);
  const [birthDate, setBirthDate] = useState(savedBirthDate);

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
    dispatch(ACTIONS.createNewUser({name, email, birthDate}));
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
        </Stack>
      </Box>
      <Box>
        <Typography sx={{fontSize: '0.8rem', mb: 2}}>
          By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Others will
          be able to find you by email or phone number when provided · Privacy Options
        </Typography>
        <ButtonWrapperStyled>
          <CustomFabButton
            className='NextStepBtn'
            disabled={false}
            onClick={() => submit()}
            name='Sing up'/>
        </ButtonWrapperStyled>
      </Box>
    </Container>
  );
};

const ButtonWrapperStyled = styled(ButtonWrapper)(({theme}) => ({
  marginBottom: 20,

  '& .MuiFab-root': {
    height: '3rem',
    backgroundColor: `${theme.palette.primary.main} !important`,

    '&:hover': {
      backgroundColor: 'rgb(26, 140, 216) !important'
    }
  },
}));

export default SingUpSecondStep;
